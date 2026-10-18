import { NextRequest, NextResponse } from "next/server";
import { remedyRepo, RemedyFilterParams } from "@/lib/repository";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const params: RemedyFilterParams = {
      q: searchParams.get("q") || undefined,
      state: searchParams.get("state") || undefined,
      region: searchParams.get("region") || undefined,
      category: searchParams.get("category") || undefined,
      remedyType: searchParams.get("remedyType") || undefined,
      ailment: searchParams.get("ailment") || undefined,
      virya: searchParams.get("virya") || undefined,
      maxPrep: searchParams.get("maxPrep")
        ? parseInt(searchParams.get("maxPrep")!, 10)
        : undefined,
      reviewedOnly: searchParams.get("verification") === "EXPERT_REVIEWED",
      page: searchParams.get("page")
        ? parseInt(searchParams.get("page")!, 10)
        : 1,
      limit: searchParams.get("limit")
        ? Math.min(2000, parseInt(searchParams.get("limit")!, 10))
        : 20,
    };

    const result = await remedyRepo.list(params);
    const facets = await remedyRepo.facets();

    return NextResponse.json(
      {
        _meta: {
          site: "हमारे नुस्खे / Hamare Nuskhe",
          disclaimer:
            "Recorded for cultural archiving. Not medical advice. Never replace professional medical consultation.",
          generatedAt: new Date().toISOString(),
        },
        ...result,
        facets,
      },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      }
    );
  } catch (error) {
    console.error("API error in GET /api/v1/remedies:", error);
    return NextResponse.json(
      { error: "Internal server error fetching remedies" },
      { status: 500 }
    );
  }
}
