import { NextRequest, NextResponse } from "next/server";
import { remedyRepo } from "@/lib/repository";
import { deriveWarnings } from "@/lib/safety/rules";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const remedy = await remedyRepo.getBySlug(slug);

    if (!remedy) {
      return NextResponse.json(
        { error: `Remedy with slug '${slug}' not found` },
        { status: 404 }
      );
    }

    const warnings = deriveWarnings(remedy);

    return NextResponse.json({
      _meta: {
        site: "हमारे नुस्खे / Hamare Nuskhe",
        disclaimer:
          "Recorded for cultural archiving. Not medical advice. Never replace professional medical consultation.",
        generatedAt: new Date().toISOString(),
      },
      remedy,
      derivedWarnings: warnings,
    });
  } catch (error) {
    console.error("API error in GET /api/v1/remedies/[slug]:", error);
    return NextResponse.json(
      { error: "Internal server error fetching remedy" },
      { status: 500 }
    );
  }
}
