import { NextResponse } from "next/server";
import { getBrandSiteOverview } from "@/lib/brand-site/server";

export async function GET() {
  try {
    const overview = await getBrandSiteOverview();
    return NextResponse.json({ ok: true, overview });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown brand-site metrics error";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
