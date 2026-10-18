import { describe, it, expect } from "vitest";
import { JsonFileRepository } from "./json-file-repository";
import path from "path";

describe("JsonFileRepository", () => {
  const repo = new JsonFileRepository(path.resolve(__dirname, "../../../data/remedies.json"));

  it("loads all remedies from data/remedies.json", async () => {
    const list = await repo.all();
    expect(list.length).toBeGreaterThanOrEqual(10);
  });

  it("retrieves a remedy by slug", async () => {
    const remedy = await repo.getBySlug("chukku-kappi-dry-ginger-coffee");
    expect(remedy).not.toBeNull();
    expect(remedy?.titleEn).toContain("Chukku");
    expect(remedy?.stateOrUT).toBe("Kerala");
    expect(remedy?.verificationStatus).toBe("EXPERT_REVIEWED");
  });

  it("filters remedies by region", async () => {
    const result = await repo.list({ region: "South" });
    expect(result.total).toBeGreaterThan(0);
    expect(result.remedies.every((r) => r.region === "South")).toBe(true);
  });

  it("searches remedies by English or native keyword", async () => {
    const result = await repo.list({ q: "haldi" });
    expect(result.total).toBeGreaterThan(0);
    expect(result.remedies.some((r) => r.slug.includes("haldi"))).toBe(true);
  });

  it("calculates facets accurately", async () => {
    const facets = await repo.facets();
    expect(facets.totalCount).toBeGreaterThanOrEqual(10);
    expect(facets.states["Kerala"]).toBeGreaterThanOrEqual(2);
    expect(facets.regions["South"]).toBeGreaterThanOrEqual(4);
    expect(facets.categories["Respiratory"]).toBeGreaterThanOrEqual(2);
  });
});
