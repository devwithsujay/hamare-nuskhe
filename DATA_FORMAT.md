# Data Format & Schema Specification
## हमारे नुस्खे / Hamare Nuskhe

---

## 1. JSON Schema Structure

Each remedy is represented by a strictly typed JSON object validated against [`src/data/schema.ts`](file:///c:/Users/sujay/Downloads/GDH/hamare-nuskhe/src/data/schema.ts).

### Example JSON Entry:
```json
{
  "id": "rem-chukku-kaapi",
  "slug": "chukku-kaapi",
  "titleEn": "Chukku Kaapi (Dry Ginger Herbal Brew)",
  "titleNative": "ചുക്കുകാപ്പി",
  "nativeScript": "Malayalam",
  "transliteration": "Chukku Kaappi",
  "alternateNames": ["Dry Ginger Coffee", "Sukku Malli Coffee"],
  "stateOrUT": "Kerala",
  "region": "South",
  "communityOrTradition": "Kerala household kitchens",
  "originConfidence": "DOCUMENTED",
  "remedyType": "FOOD_OR_DRINK",
  "category": "Respiratory",
  "tradition": "FOLK",
  "traditionalUses": [
    "traditionally taken for cold-weather chills",
    "traditional comforting warm brew for stuffy seasonal nose"
  ],
  "botanicals": [
    {
      "commonName": "Dry ginger",
      "scientificName": "Zingiber officinale",
      "plantPart": "rhizome",
      "nameVerifiedAgainst": "AYUSH_PHARMACOPOEIA"
    },
    {
      "commonName": "Black pepper",
      "scientificName": "Piper nigrum",
      "plantPart": "fruit",
      "nameVerifiedAgainst": "AYUSH_PHARMACOPOEIA"
    }
  ],
  "ingredients": [
    { "name": "Dried ginger powder (chukku)", "amountValue": 1, "amountUnit": "tsp", "notes": "coarsely crushed" },
    { "name": "Whole black peppercorns", "amountValue": 6, "amountUnit": "piece", "notes": "cracked" },
    { "name": "Water", "amountValue": 350, "amountUnit": "ml", "notes": null }
  ],
  "baseServings": 1,
  "steps": [
    "Lightly crush the dry ginger and black peppercorns in an iron or stone mortar.",
    "Bring 350 ml of water to a boil in a heavy-bottomed pot.",
    "Simmer on low flame for 5 to 7 minutes.",
    "Strain through a fine strainer and sip while steaming warm."
  ],
  "prepTimeMinutes": 10,
  "storage": "Consume immediately while warm; do not store or refrigerate.",
  "traditionalUsage": {
    "typicalAdultAmount": "1 small cup (approx. 100-120 ml)",
    "typicalFrequency": "Once or twice daily during seasonal changes",
    "traditionalTiming": "Early morning or late evening",
    "maxDurationDays": 4,
    "childUsePermitted": false
  },
  "ayurvedicAttributes": {
    "virya": "USHNA",
    "doshaEffect": ["Pacifies Vata and Kapha", "Stimulates Jatharagni"],
    "source": "Recorded in Kerala folk ethnobotany manuals"
  },
  "safety": {
    "riskLevel": "LOW",
    "avoidInPregnancy": "UNKNOWN",
    "avoidInBreastfeeding": false,
    "avoidUnderAge": 5,
    "avoidInConditions": ["BLEEDING_DISORDER", "UPCOMING_SURGERY", "ULCER_OR_GERD"],
    "drugInteractionClasses": ["ANTICOAGULANT"],
    "allergens": [],
    "containsAlcohol": false,
    "topicalPatchTestRequired": false,
    "redFlagSymptoms": ["persistent high fever", "breathing distress"],
    "stopAndSeeDoctorIf": ["fever does not subside within 48 hours"]
  },
  "sources": [
    {
      "type": "AYUSH_PUBLICATION",
      "citation": "CCRAS: Traditional Dietary Practices of Kerala, 2018",
      "url": null,
      "pageOrSection": "pp. 82-84"
    }
  ],
  "evidenceNote": "Ethnobotanical documentation records centuries of domestic use across Malabar and Travancore.",
  "folkloreNote": "Traditional Chukku Kaapi is caffeine-free and made without coffee beans.",
  "verificationStatus": "EXPERT_REVIEWED",
  "reviewedBy": "Dr. K. Narayanan, BAMS",
  "reviewedAt": "2026-08-14T10:00:00Z",
  "needsExpertReview": false,
  "contributedBy": "EDITORIAL",
  "createdAt": "2026-01-10T08:00:00Z",
  "updatedAt": "2026-08-14T10:00:00Z"
}
```

---

## 2. CSV Column Mapping & Export Standard

All CSV exports include a **UTF-8 Byte Order Mark (`\uFEFF`)** at index 0 so Microsoft Excel and Apple Numbers render Devanagari, Tamil, and Malayalam scripts without encoding corruption.

| Column Header | Format / Representation |
| :--- | :--- |
| `ID` | Unique CUID string |
| `Slug` | ASCII kebab-case identifier |
| `Title (English)` | Primary English title |
| `Title (Native Script)` | Rendered in authentic script |
| `State / UT` | One of 36 standard states/UTs |
| `Region` | North, South, East, West, Central, Northeast, Pan-India |
| `Category` | Standard category |
| `Tradition` | FOLK, AYURVEDA, SIDDHA, UNANI, LOCAL_MIXED |
| `Remedy Type` | FOOD_OR_DRINK, TOPICAL, STEAM_OR_FOMENTATION, DIETARY_PRACTICE, OTHER |
| `Traditional Uses` | Array items joined with ` \| ` |
| `Botanicals` | `Common (Scientific)` items joined with ` \| ` |
| `Ingredients` | `Name (Amount Unit)` items joined with ` \| ` |
| `Prep Time (min)` | Integer duration |
| `Safety Risk Level` | LOW, MODERATE, HIGH |
| `Avoid Under Age` | Integer minimum age in years or empty |
| `Avoid In Pregnancy` | `true`, `false`, or `UNKNOWN` |
| `Drug Interactions` | Array of drug classes joined with ` \| ` |
| `Allergens` | Potential food allergens joined with ` \| ` |
| `Sources` | Bibliographic citations |
| `Verification Status` | DRAFT, AUTO_CHECKED, EXPERT_REVIEWED |
