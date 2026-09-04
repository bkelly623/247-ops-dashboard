import { NextResponse } from "next/server";
import { getServerEnv } from "@/lib/env";
import { isSearchConsoleConfigured } from "@/lib/search-console/server";

export async function GET() {
  const env = getServerEnv();

  return NextResponse.json({
    supabase: {
      configured: Boolean(
        env.supabaseUrl &&
          env.supabasePublishableKey &&
          env.supabaseSecretKey &&
          env.supabaseProjectRef,
      ),
      projectRef: env.supabaseProjectRef ?? null,
    },
    postfast: {
      configured: Boolean(env.postfastApiKey),
    },
    searchConsole: {
      configured: isSearchConsoleConfigured(),
      siteUrl: env.googleSearchConsoleSiteUrl ?? null,
    },
    brandSite: {
      configured: Boolean(env.commandCenterEventsSecret),
    },
    retention: {
      heavyAssetTtlDays: 3,
      keepOverrideEnabled: true,
    },
  });
}
