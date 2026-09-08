import { NextRequest, NextResponse } from "next/server";
import { getSearchConsolePerformance } from "@/lib/search-console/server";

function requestedDays(request: NextRequest) {
  const rawDays = Number(request.nextUrl.searchParams.get("days") ?? 28);

  if (!Number.isFinite(rawDays)) {
    return 28;
  }

  return Math.min(Math.max(Math.trunc(rawDays), 7), 90);
}

export async function GET(request: NextRequest) {
  try {
    const performance = await getSearchConsolePerformance(requestedDays(request));

    return NextResponse.json(performance);
  } catch (error) {
    return NextResponse.json(
      {
        configured: true,
        error: error instanceof Error ? error.message : "Search Console performance request failed.",
      },
      { status: 502 },
    );
  }
}
