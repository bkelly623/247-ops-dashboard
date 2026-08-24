import "server-only";
import { getServerEnv } from "@/lib/env";

const POSTFAST_BASE_URL = "https://api.postfa.st";

type PostFastRequestOptions = {
  method?: "GET" | "POST" | "PATCH" | "DELETE";
  body?: unknown;
};

export type PostFastAccount = {
  id: string;
  platform?: string;
  username?: string;
  name?: string;
};

export type PostFastPost = {
  id: string;
  status?: string;
  platforms?: string[];
  scheduledAt?: string;
  publishedAt?: string;
  url?: string;
};

function getPostFastApiKey() {
  const apiKey = getServerEnv().postfastApiKey;

  if (!apiKey) {
    throw new Error("POSTFAST_API_KEY is required for PostFast actions.");
  }

  return apiKey;
}

async function postfastFetch<T>(
  path: string,
  options: PostFastRequestOptions = {},
): Promise<T> {
  const response = await fetch(`${POSTFAST_BASE_URL}${path}`, {
    method: options.method ?? "GET",
    headers: {
      "Content-Type": "application/json",
      "pf-api-key": getPostFastApiKey(),
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
    cache: "no-store",
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(
      `PostFast request failed: ${response.status} ${response.statusText} ${errorBody}`,
    );
  }

  return response.json() as Promise<T>;
}

export const postfast = {
  listAccounts() {
    return postfastFetch<PostFastAccount[]>("/social-media/my-social-accounts");
  },
  searchPosts(query: Record<string, string | number | boolean | undefined> = {}) {
    const params = new URLSearchParams();

    for (const [key, value] of Object.entries(query)) {
      if (value !== undefined) {
        params.set(key, String(value));
      }
    }

    const suffix = params.size ? `?${params.toString()}` : "";

    return postfastFetch<PostFastPost[]>(`/social-posts${suffix}`);
  },
  createPost(payload: unknown) {
    return postfastFetch<PostFastPost>("/social-posts", {
      method: "POST",
      body: payload,
    });
  },
  getUploadUrls(payload: unknown) {
    return postfastFetch<unknown>("/file/get-signed-upload-urls", {
      method: "POST",
      body: payload,
    });
  },
  getAnalytics(query: Record<string, string | number | boolean | undefined> = {}) {
    const params = new URLSearchParams();

    for (const [key, value] of Object.entries(query)) {
      if (value !== undefined) {
        params.set(key, String(value));
      }
    }

    const suffix = params.size ? `?${params.toString()}` : "";

    return postfastFetch<unknown>(`/social-posts/analytics${suffix}`);
  },
};
