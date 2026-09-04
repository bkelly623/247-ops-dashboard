type PublicEnv = {
  supabaseUrl: string;
  supabasePublishableKey: string;
};

type ServerEnv = PublicEnv & {
  supabaseSecretKey?: string;
  supabaseProjectRef?: string;
  commandCenterEventsSecret?: string;
  postfastApiKey?: string;
  googleSearchConsoleClientEmail?: string;
  googleSearchConsolePrivateKey?: string;
  googleSearchConsoleClientId?: string;
  googleSearchConsoleClientSecret?: string;
  googleSearchConsoleRefreshToken?: string;
  googleSearchConsoleQuotaProjectId?: string;
  googleSearchConsoleSiteUrl?: string;
};

function required(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export function getPublicEnv(): PublicEnv {
  return {
    supabaseUrl: required("NEXT_PUBLIC_SUPABASE_URL"),
    supabasePublishableKey: required("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY"),
  };
}

export function getServerEnv(): ServerEnv {
  return {
    ...getPublicEnv(),
    supabaseSecretKey: process.env.SUPABASE_SECRET_KEY,
    supabaseProjectRef: process.env.SUPABASE_PROJECT_REF,
    commandCenterEventsSecret: process.env.COMMAND_CENTER_EVENTS_SECRET,
    postfastApiKey: process.env.POSTFAST_API_KEY,
    googleSearchConsoleClientEmail: process.env.GOOGLE_SEARCH_CONSOLE_CLIENT_EMAIL,
    googleSearchConsolePrivateKey: process.env.GOOGLE_SEARCH_CONSOLE_PRIVATE_KEY,
    googleSearchConsoleClientId: process.env.GOOGLE_SEARCH_CONSOLE_CLIENT_ID,
    googleSearchConsoleClientSecret: process.env.GOOGLE_SEARCH_CONSOLE_CLIENT_SECRET,
    googleSearchConsoleRefreshToken: process.env.GOOGLE_SEARCH_CONSOLE_REFRESH_TOKEN,
    googleSearchConsoleQuotaProjectId: process.env.GOOGLE_SEARCH_CONSOLE_QUOTA_PROJECT_ID,
    googleSearchConsoleSiteUrl: process.env.GSC_SITE_URL,
  };
}
