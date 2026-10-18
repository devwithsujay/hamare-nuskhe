import { RemedyRepository } from "./types";
import { JsonFileRepository } from "./json-file-repository";

// Singleton instance of the repository
export const remedyRepo: RemedyRepository = new JsonFileRepository();

export * from "./types";
export * from "./json-file-repository";
