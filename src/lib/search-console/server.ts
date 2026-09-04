import "server-only";

import { getServerEnv } from "@/lib/env";

type SearchConsoleConfig = {
  siteUrl: string;
} & (
  | {
      authType: "service-account";
      clientEmail: string;
      privateKey: string;
      quotaProjectId?: string;
    }
  | {
      authType: "oauth";
      clientId: string;
      clientSecret: string;
      refreshToken: string;
      quotaProjectId?: string;
    }
);

export type SearchConsoleSnapshot = {
  configured: boolean;
  siteUrl: string | null;
  startDate: string;
  endDate: string;
  clicks: number | null;
  impressions: number | null;
  averagePosition: number | null;
  ctr: number | null;
};

const scope = "https://www.googleapis.com/auth/webmasters.readonly";

function base64UrlEncode(value: string | ArrayBuffer) {
  const buffer = typeof value === "string" ? Buffer.from(value) : Buffer.from(value);

  return buffer
    .toString("base64")
    .replaceAll("+", "-")
    .replaceAll("/", "_")
    .replaceAll("=", "");
}

function normalizePrivateKey(privateKey: string) {
  return privateKey.replaceAll("\\n", "\n");
}

function dateDaysAgo(daysAgo: number) {
  const date = new Date();
  date.setUTCDate(date.getUTCDate() - daysAgo);

  return date.toISOString().slice(0, 10);
}

function getSearchConsoleConfig(): SearchConsoleConfig | null {
  const env = getServerEnv();

  if (!env.googleSearchConsoleSiteUrl) {
    return null;
  }

  if (env.googleSearchConsoleClientEmail && env.googleSearchConsolePrivateKey) {
    return {
      authType: "service-account",
      clientEmail: env.googleSearchConsoleClientEmail,
      privateKey: normalizePrivateKey(env.googleSearchConsolePrivateKey),
      quotaProjectId: env.googleSearchConsoleQuotaProjectId,
      siteUrl: env.googleSearchConsoleSiteUrl,
    };
  }

  if (
    env.googleSearchConsoleClientId &&
    env.googleSearchConsoleClientSecret &&
    env.googleSearchConsoleRefreshToken
  ) {
    return {
      authType: "oauth",
      clientId: env.googleSearchConsoleClientId,
      clientSecret: env.googleSearchConsoleClientSecret,
      refreshToken: env.googleSearchConsoleRefreshToken,
      quotaProjectId: env.googleSearchConsoleQuotaProjectId,
      siteUrl: env.googleSearchConsoleSiteUrl,
    };
  }

  return null;
}

function emptySnapshot(days: number, siteUrl: string | null = null): SearchConsoleSnapshot {
  return {
    configured: Boolean(siteUrl),
    siteUrl,
    startDate: dateDaysAgo(days + 2),
    endDate: dateDaysAgo(2),
    clicks: null,
    impressions: null,
    averagePosition: null,
    ctr: null,
  };
}

async function importPrivateKey(privateKey: string) {
  return crypto.subtle.importKey(
    "pkcs8",
    Buffer.from(
      privateKey
        .replace("-----BEGIN PRIVATE KEY-----", "")
        .replace("-----END PRIVATE KEY-----", "")
        .replace(/\s/g, ""),
      "base64",
    ),
    {
      name: "RSASSA-PKCS1-v1_5",
      hash: "SHA-256",
    },
    false,
    ["sign"],
  );
}

async function createJwt(config: Extract<SearchConsoleConfig, { authType: "service-account" }>) {
  const now = Math.floor(Date.now() / 1000);
  const header = base64UrlEncode(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claims = base64UrlEncode(
    JSON.stringify({
      iss: config.clientEmail,
      scope,
      aud: "https://oauth2.googleapis.com/token",
      exp: now + 3600,
      iat: now,
    }),
  );
  const unsignedToken = `${header}.${claims}`;
  const key = await importPrivateKey(config.privateKey);
  const signature = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    key,
    Buffer.from(unsignedToken),
  );

  return `${unsignedToken}.${base64UrlEncode(signature)}`;
}

async function getServiceAccountAccessToken(
  config: Extract<SearchConsoleConfig, { authType: "service-account" }>,
) {
  const assertion = await createJwt(config);
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
  });

  if (!response.ok) {
    throw new Error(`Search Console token request failed: ${response.status}`);
  }

  const payload = (await response.json()) as { access_token?: string };

  if (!payload.access_token) {
    throw new Error("Search Console token response did not include an access token.");
  }

  return payload.access_token;
}

async function getOauthAccessToken(config: Extract<SearchConsoleConfig, { authType: "oauth" }>) {
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: config.clientId,
      client_secret: config.clientSecret,
      refresh_token: config.refreshToken,
      grant_type: "refresh_token",
    }),
  });

  if (!response.ok) {
    throw new Error(`Search Console OAuth token request failed: ${response.status}`);
  }

  const payload = (await response.json()) as { access_token?: string };

  if (!payload.access_token) {
    throw new Error("Search Console OAuth token response did not include an access token.");
  }

  return payload.access_token;
}

async function getAccessToken(config: SearchConsoleConfig) {
  if (config.authType === "service-account") {
    return getServiceAccountAccessToken(config);
  }

  return getOauthAccessToken(config);
}

export async function getSearchConsoleSnapshot(days = 28): Promise<SearchConsoleSnapshot> {
  const config = getSearchConsoleConfig();

  if (!config) {
    return emptySnapshot(days);
  }

  const accessToken = await getAccessToken(config);
  const startDate = dateDaysAgo(days + 2);
  const endDate = dateDaysAgo(2);
  const response = await fetch(
    `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(
      config.siteUrl,
    )}/searchAnalytics/query`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        ...(config.quotaProjectId ? { "X-Goog-User-Project": config.quotaProjectId } : {}),
      },
      body: JSON.stringify({
        startDate,
        endDate,
        rowLimit: 1,
      }),
      next: { revalidate: 3600 },
    },
  );

  if (!response.ok) {
    throw new Error(`Search Console query failed: ${response.status}`);
  }

  const payload = (await response.json()) as {
    rows?: Array<{
      clicks?: number;
      impressions?: number;
      position?: number;
      ctr?: number;
    }>;
  };
  const row = payload.rows?.[0];

  return {
    configured: true,
    siteUrl: config.siteUrl,
    startDate,
    endDate,
    clicks: row?.clicks ?? 0,
    impressions: row?.impressions ?? 0,
    averagePosition: row?.position ?? null,
    ctr: row?.ctr ?? null,
  };
}

export function isSearchConsoleConfigured() {
  return Boolean(getSearchConsoleConfig());
}
