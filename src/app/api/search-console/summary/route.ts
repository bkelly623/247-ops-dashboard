import { NextResponse } from "next/server";
import { getSearchConsoleSnapshot } from "@/lib/search-console/server";

export async function GET() {
  try {
    const snapshot = await getSearchConsoleSnapshot();

    return NextResponse.json(snapshot);
  } catch (error) {
    return NextResponse.json(
      {
        configured: true,
        error: error instanceof Error ? error.message : "Search Console request failed.",
      },
      { status: 502 },
    );
  }
}
