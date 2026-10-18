import { Remedy } from "@/data/schema";

export interface RemedyFilterParams {
  q?: string;
  state?: string;
  region?: string;
  category?: string;
  remedyType?: string;
  ailment?: string;
  virya?: string;
  maxPrep?: number;
  reviewedOnly?: boolean;
  page?: number;
  limit?: number;
}

export interface RemedyFacets {
  states: Record<string, number>;
  regions: Record<string, number>;
  categories: Record<string, number>;
  remedyTypes: Record<string, number>;
  traditionalUses: Record<string, number>;
  totalCount: number;
}

export interface RemedyListResult {
  remedies: Remedy[];
  total: number;
  page: number;
  limit: number;
}

export interface RemedyRepository {
  list(params?: RemedyFilterParams): Promise<RemedyListResult>;
  getBySlug(slug: string): Promise<Remedy | null>;
  facets(): Promise<RemedyFacets>;
  all(): Promise<Remedy[]>;
  forExplorer(): Promise<Remedy[]>;
}
