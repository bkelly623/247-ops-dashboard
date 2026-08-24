type PublicEnv = {
  supabaseUrl: string;
  supabasePublishableKey: string;
};

type ServerEnv = PublicEnv & {
  supabaseSecretKey?: string;
  supabaseProjectRef?: string;
  postfastApiKey?: string;
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
    postfastApiKey: process.env.POSTFAST_API_KEY,
  };
}
