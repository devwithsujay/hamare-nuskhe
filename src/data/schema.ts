import { z } from "zod";

export const STATES_AND_UTS = [
  // 28 States
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  // 8 Union Territories
  "Andaman & Nicobar Islands",
  "Chandigarh",
  "Dadra & Nagar Haveli and Daman & Diu",
  "Delhi",
  "Jammu & Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
] as const;

export type StateOrUT = (typeof STATES_AND_UTS)[number];

export const REGIONS = [
  "North",
  "South",
  "East",
  "West",
  "Central",
  "Northeast",
  "Pan-India",
] as const;
export type Region = (typeof REGIONS)[number];

export const NATIVE_SCRIPTS = [
  "Devanagari",
  "Kannada",
  "Tamil",
  "Telugu",
  "Malayalam",
  "Bengali",
  "Gujarati",
  "Gurmukhi",
  "Odia",
  "Assamese",
  "Urdu",
  "Other",
] as const;
export type NativeScript = (typeof NATIVE_SCRIPTS)[number];

export const REMEDY_TYPES = [
  "FOOD_OR_DRINK",
  "TOPICAL",
  "STEAM_OR_FOMENTATION",
  "DIETARY_PRACTICE",
  "OTHER",
] as const;
export type RemedyType = (typeof REMEDY_TYPES)[number];

export const CATEGORIES = [
  "Respiratory",
  "Digestion",
  "Immunity & Seasonal",
  "Joint & Muscle",
  "Skin & Hair",
  "Postpartum & Women",
  "Sleep & Calming",
  "Oral & Throat",
  "General Wellness",
] as const;
export type Category = (typeof CATEGORIES)[number];

export const TRADITIONS = [
  "FOLK",
  "AYURVEDA",
  "SIDDHA",
  "UNANI",
  "LOCAL_MIXED",
] as const;
export type Tradition = (typeof TRADITIONS)[number];

export const CONDITIONS = [
  "DIABETES",
  "HYPERTENSION",
  "HYPOTENSION",
  "BLEEDING_DISORDER",
  "KIDNEY_DISEASE",
  "LIVER_DISEASE",
  "THYROID_DISORDER",
  "GALLSTONES",
  "ULCER_OR_GERD",
  "AUTOIMMUNE",
  "UPCOMING_SURGERY",
  "EPILEPSY",
] as const;
export type Condition = (typeof CONDITIONS)[number];

export const DRUG_INTERACTION_CLASSES = [
  "ANTICOAGULANT",
  "ANTIPLATELET",
  "ANTIDIABETIC",
  "ANTIHYPERTENSIVE",
  "THYROID_MED",
  "IMMUNOSUPPRESSANT",
  "SEDATIVE",
  "LITHIUM",
  "OTHER",
] as const;
export type DrugInteractionClass = (typeof DRUG_INTERACTION_CLASSES)[number];

export const BotanicalSchema = z.object({
  commonName: z.string().min(1, "Common name required"),
  scientificName: z.string().nullable(),
  plantPart: z.string().nullable(),
  nameVerifiedAgainst: z.enum([
    "POWO",
    "IPNI",
    "AYUSH_PHARMACOPOEIA",
    "NONE",
  ]),
});
export type Botanical = z.infer<typeof BotanicalSchema>;

export const IngredientSchema = z.object({
  name: z.string().min(1, "Ingredient name required"),
  amountValue: z.number().nullable(),
  amountUnit: z
    .enum(["g", "ml", "tsp", "tbsp", "cup", "piece", "pinch", "to_taste", "spoon"])
    .nullable(),
  notes: z.string().nullable(),
});
export type Ingredient = z.infer<typeof IngredientSchema>;

export const TraditionalUsageSchema = z.object({
  typicalAdultAmount: z.string().nullable(),
  typicalFrequency: z.string().nullable(),
  traditionalTiming: z.string().nullable(),
  maxDurationDays: z.number().nullable(),
  childUsePermitted: z.literal(false).optional().default(false),
});
export type TraditionalUsage = z.infer<typeof TraditionalUsageSchema>;

export const AyurvedicAttributesSchema = z
  .object({
    virya: z.enum(["USHNA", "SHEETA", "SAMA"]).nullable(),
    doshaEffect: z.array(z.string()),
    source: z.string().nullable().optional(),
    rasa: z.array(z.string()).optional(),
    guna: z.array(z.string()).optional(),
    vipaka: z.string().nullable().optional(),
  })
  .nullable();
export type AyurvedicAttributes = z.infer<typeof AyurvedicAttributesSchema>;

export const SafetySchema = z.object({
  riskLevel: z.enum(["LOW", "MODERATE", "HIGH"]),
  avoidInPregnancy: z.union([z.boolean(), z.literal("UNKNOWN")]),
  avoidInBreastfeeding: z.union([z.boolean(), z.literal("UNKNOWN")]),
  avoidUnderAge: z.number().nullable(),
  avoidInConditions: z.array(z.enum(CONDITIONS)),
  drugInteractionClasses: z.array(z.enum(DRUG_INTERACTION_CLASSES)),
  allergens: z.array(z.string()),
  containsAlcohol: z.boolean(),
  topicalPatchTestRequired: z.boolean(),
  redFlagSymptoms: z.array(z.string()),
  stopAndSeeDoctorIf: z.array(z.string()),
  warningsRendered: z.array(z.string()).optional(),
});
export type Safety = z.infer<typeof SafetySchema>;

export const SourceSchema = z.object({
  type: z.enum([
    "AYUSH_PUBLICATION",
    "CLASSICAL_TEXT",
    "PEER_REVIEWED",
    "ETHNOBOTANY_SURVEY",
    "BOOK",
    "ORAL_INTERVIEW",
    "WEBSITE",
  ]),
  citation: z.string().min(3, "Citation must be documented"),
  url: z.string().url().nullable().or(z.literal("")).or(z.null()),
  pageOrSection: z.string().nullable(),
});
export type Source = z.infer<typeof SourceSchema>;

export const RemedySchema = z.object({
  id: z.string(),
  slug: z.string().regex(/^[a-z0-9-]+$/, "Slug must be lowercase alphanumeric with hyphens"),
  titleEn: z.string().min(2, "English title required"),
  titleNative: z.string().nullable(),
  nativeScript: z.enum(NATIVE_SCRIPTS).nullable(),
  transliteration: z.string().nullable(),
  alternateNames: z.array(z.string()),

  // Geography & provenance
  stateOrUT: z.enum(STATES_AND_UTS),
  region: z.enum(REGIONS),
  communityOrTradition: z.string().nullable(),
  originConfidence: z.enum([
    "DOCUMENTED",
    "WIDELY_REPORTED",
    "ORAL_TRADITION",
    "UNCERTAIN",
  ]),

  // Classification
  remedyType: z.enum(REMEDY_TYPES),
  category: z.enum(CATEGORIES),
  tradition: z.enum(TRADITIONS),
  traditionalUses: z.array(z.string()).min(1, "At least one traditional use required"),

  // Botanicals
  botanicals: z.array(BotanicalSchema),

  // Preparation
  ingredients: z.array(IngredientSchema).min(1, "At least one ingredient required"),
  baseServings: z.number().positive().default(1),
  steps: z.array(z.string()).min(1, "At least one preparation step required"),
  prepTimeMinutes: z.number().positive().nullable(),
  storage: z.string().nullable(),

  // Traditional use
  traditionalUsage: TraditionalUsageSchema,
  ayurvedicAttributes: AyurvedicAttributesSchema,

  // Safety
  safety: SafetySchema,

  // Sources & Evidence (Min 1 real source)
  sources: z.array(SourceSchema).min(1, "Every remedy must have at least one documented source"),
  evidenceNote: z.string().min(1, "Evidence note required"),
  folkloreNote: z.string().nullable(),
  uncertaintyNotes: z.string().nullable().optional(),

  // Review & Moderation
  verificationStatus: z.enum([
    "DRAFT",
    "AUTO_CHECKED",
    "EXPERT_REVIEWED",
    "REJECTED",
  ]),
  reviewedBy: z.string().nullable().optional().default(null),
  reviewedAt: z.string().nullable().optional().default(null),
  needsExpertReview: z.boolean().default(true),
  contributedBy: z.enum(["EDITORIAL", "COMMUNITY"]).default("EDITORIAL"),
  createdAt: z.string().optional().default("2026-10-17T00:00:00.000Z"),
  updatedAt: z.string().optional().default("2026-10-17T00:00:00.000Z"),
});

export type Remedy = z.infer<typeof RemedySchema>;
