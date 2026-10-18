import fs from "fs";
import path from "path";
import { Remedy, RemedySchema } from "@/data/schema";
import {
  RemedyRepository,
  RemedyFilterParams,
  RemedyListResult,
  RemedyFacets,
} from "./types";

let globalCache: Remedy[] | null = null;
let globalExplorerCache: Remedy[] | null = null;
let globalMtime: number = 0;
let globalFacets: RemedyFacets | null = null;
let globalSlugMap: Map<string, Remedy> = new Map();

export class JsonFileRepository implements RemedyRepository {
  private readonly dataPath: string;

  constructor(customPath?: string) {
    if (customPath) {
      this.dataPath = customPath;
    } else {
      this.dataPath = path.resolve(process.cwd(), "data/remedies.json");
    }
  }

  private loadRemedies(): Remedy[] {
    try {
      const filePath = this.dataPath;
      if (!fs.existsSync(filePath)) {
        console.warn(`[JsonFileRepository] Remedies file not found at ${filePath}. Returning empty array.`);
        globalCache = [];
        globalExplorerCache = [];
        globalFacets = {
          states: {},
          regions: {},
          categories: {},
          remedyTypes: {},
          traditionalUses: {},
          totalCount: 0,
        };
        return [];
      }

      const stat = fs.statSync(filePath);
      if (globalCache && stat.mtimeMs === globalMtime) {
        return globalCache;
      }

      const fileContent = fs.readFileSync(filePath, "utf-8");
      const raw = JSON.parse(fileContent);

      if (!Array.isArray(raw)) {
        console.warn("[JsonFileRepository] File does not contain an array.");
        globalCache = [];
        return [];
      }

      // Validate each entry with fallback on error
      const validRemedies: Remedy[] = [];
      const slugMap = new Map<string, Remedy>();
      const states: Record<string, number> = {};
      const regions: Record<string, number> = {};
      const categories: Record<string, number> = {};
      const remedyTypes: Record<string, number> = {};
      const traditionalUses: Record<string, number> = {};

      for (const item of raw) {
        const parsed = RemedySchema.safeParse(item);
        if (parsed.success) {
          const r = parsed.data;
          validRemedies.push(r);
          slugMap.set(r.slug.toLowerCase().trim(), r);

          states[r.stateOrUT] = (states[r.stateOrUT] || 0) + 1;
          regions[r.region] = (regions[r.region] || 0) + 1;
          categories[r.category] = (categories[r.category] || 0) + 1;
          remedyTypes[r.remedyType] = (remedyTypes[r.remedyType] || 0) + 1;

          for (const use of r.traditionalUses) {
            traditionalUses[use] = (traditionalUses[use] || 0) + 1;
          }
        } else {
          console.warn(`[JsonFileRepository] Skipping invalid remedy "${item.slug || item.id}":`, parsed.error.issues);
        }
      }

      globalCache = validRemedies;
      globalMtime = stat.mtimeMs;
      globalSlugMap = slugMap;
      globalFacets = {
        states,
        regions,
        categories,
        remedyTypes,
        traditionalUses,
        totalCount: validRemedies.length,
      };

      // Lightweight projection for explorer page (strips heavy unused narrative text fields)
      globalExplorerCache = validRemedies.map((r) => ({
        ...r,
        steps: [],
        sources: [],
        evidenceNote: "",
        folkloreNote: null,
        uncertaintyNotes: null,
      }));

      return validRemedies;
    } catch (err) {
      console.error("[JsonFileRepository] Error loading remedies:", err);
      return [];
    }
  }

  async all(): Promise<Remedy[]> {
    return this.loadRemedies();
  }

  async forExplorer(): Promise<Remedy[]> {
    this.loadRemedies();
    return globalExplorerCache || [];
  }

  async getBySlug(slug: string): Promise<Remedy | null> {
    this.loadRemedies();
    const cleanSlug = slug.toLowerCase().trim();
    return globalSlugMap.get(cleanSlug) || null;
  }

  async list(params: RemedyFilterParams = {}): Promise<RemedyListResult> {
    const allRemedies = this.loadRemedies();
    let filtered = [...allRemedies];

    // 1. Text Search query
    if (params.q && params.q.trim().length > 0) {
      const q = params.q.toLowerCase().trim();
      filtered = filtered.filter((r) => {
        const titleEnMatch = r.titleEn.toLowerCase().includes(q);
        const titleNatMatch = r.titleNative ? r.titleNative.includes(q) : false;
        const translitMatch = r.transliteration ? r.transliteration.toLowerCase().includes(q) : false;
        const altMatch = r.alternateNames.some((a) => a.toLowerCase().includes(q));
        const usesMatch = r.traditionalUses.some((u) => u.toLowerCase().includes(q));
        const botanicalsMatch = r.botanicals.some(
          (b) =>
            b.commonName.toLowerCase().includes(q) ||
            (b.scientificName ? b.scientificName.toLowerCase().includes(q) : false)
        );
        const stateMatch = r.stateOrUT.toLowerCase().includes(q);
        const communityMatch = r.communityOrTradition ? r.communityOrTradition.toLowerCase().includes(q) : false;

        return (
          titleEnMatch ||
          titleNatMatch ||
          translitMatch ||
          altMatch ||
          usesMatch ||
          botanicalsMatch ||
          stateMatch ||
          communityMatch
        );
      });
    }

    // 2. State/UT filter
    if (params.state) {
      const s = params.state.toLowerCase();
      filtered = filtered.filter((r) => r.stateOrUT.toLowerCase() === s);
    }

    // 3. Region filter
    if (params.region) {
      const reg = params.region.toLowerCase();
      filtered = filtered.filter((r) => r.region.toLowerCase() === reg);
    }

    // 4. Category filter
    if (params.category) {
      const cat = params.category.toLowerCase();
      filtered = filtered.filter((r) => r.category.toLowerCase() === cat);
    }

    // 5. Remedy Type filter
    if (params.remedyType) {
      const rt = params.remedyType.toUpperCase();
      filtered = filtered.filter((r) => r.remedyType === rt);
    }

    // 6. Ailment (traditional use) filter
    if (params.ailment) {
      const ail = params.ailment.toLowerCase();
      filtered = filtered.filter((r) =>
        r.traditionalUses.some((u) => u.toLowerCase().includes(ail))
      );
    }

    // 7. Virya filter
    if (params.virya) {
      const v = params.virya.toUpperCase();
      filtered = filtered.filter((r) => r.ayurvedicAttributes?.virya === v);
    }

    // 8. Max Prep Time
    if (params.maxPrep !== undefined && params.maxPrep > 0) {
      filtered = filtered.filter((r) => r.prepTimeMinutes !== null && r.prepTimeMinutes <= params.maxPrep!);
    }

    // 9. Reviewed Only filter
    if (params.reviewedOnly) {
      filtered = filtered.filter((r) => r.verificationStatus === "EXPERT_REVIEWED");
    }

    // Default Sorting: Reviewed first, then alphabetical by English title
    filtered.sort((a, b) => {
      if (a.verificationStatus === "EXPERT_REVIEWED" && b.verificationStatus !== "EXPERT_REVIEWED") {
        return -1;
      }
      if (b.verificationStatus === "EXPERT_REVIEWED" && a.verificationStatus !== "EXPERT_REVIEWED") {
        return 1;
      }
      return a.titleEn.localeCompare(b.titleEn);
    });

    // Pagination
    const total = filtered.length;
    const page = Math.max(1, params.page || 1);
    const limit = Math.min(50, Math.max(1, params.limit || 20));
    const startIndex = (page - 1) * limit;
    const paginated = filtered.slice(startIndex, startIndex + limit);

    return {
      remedies: paginated,
      total,
      page,
      limit,
    };
  }

  async facets(): Promise<RemedyFacets> {
    this.loadRemedies();
    return (
      globalFacets || {
        states: {},
        regions: {},
        categories: {},
        remedyTypes: {},
        traditionalUses: {},
        totalCount: 0,
      }
    );
  }
}
