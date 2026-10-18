# Deterministic Safety Rules Specification
## हमारे नुस्खे / Hamare Nuskhe

Safety in Hamare Nuskhe is **enforced in code**, not left to editorial discretion. The rules engine (`src/lib/safety/rules.ts`) runs:
1. At seed time (`npm run validate-data`)
2. On community submissions (`/contribute`)
3. At runtime rendering (`deriveWarnings(remedy)`)

---

## 1. Safety Rules Table

| Trigger Ingredient / Condition | Mandatory Enforcement in Code | Severity | Non-Collapsible? |
| :--- | :--- | :--- | :--- |
| **Honey** (`honey`, `madhu`, `shahad`) | `avoidUnderAge >= 1`, Allergen: `honey`, Infant Botulism Red Banner | **DANGER** | **YES** |
| **Turmeric / Ginger / Garlic** (medicinal quantities) | `ANTICOAGULANT` interaction class; pre-surgery note (stop 2 weeks before) | **CAUTION** | **YES** |
| **Fenugreek, Ajwain, Raw Papaya, Aloe, Hing** | `avoidInPregnancy = true` or `'UNKNOWN'` with visible pregnancy caution | **DANGER** / **CAUTION** | **YES** |
| **Bitter Gourd (Karela), Jamun Seed, Neem, Gudmar** | `ANTIDIABETIC` interaction class; Hypoglycemia alert | **DANGER** | **YES** |
| **Licorice (Mulethi / Yashtimadhu)** | `HYPERTENSION` in `avoidInConditions`; limited duration | **CAUTION** | **NO** |
| **Chilli, Black Pepper, Raw Ginger** | `ULCER_OR_GERD` in `avoidInConditions` | **CAUTION** | **NO** |
| **Whole Nuts & Hard Seeds** | Choking hazard warning; `avoidUnderAge >= 5` | **DANGER** | **YES** |
| **Any Topical Application** (`remedyType === 'TOPICAL'`) | `topicalPatchTestRequired = true`; 24-hr patch test banner | **CAUTION** | **YES** |
| **Fermented / Alcohol Preparations** | `containsAlcohol = true`; `avoidUnderAge >= 18`; `avoidInPregnancy = true` | **DANGER** | **YES** |
| **Red Flag Ailments** (Fever, Chest Pain, Dyspnea, Jaundice) | `riskLevel = 'HIGH'`; Immediate medical attention banner | **DANGER** | **YES** |

---

## 2. Scientific Rationale

### 1. Honey & Infant Botulism (Clostridium botulinum)
Infants under 12 months lack the mature intestinal flora and gastric acidity to suppress germination of *Clostridium botulinum* endospores often naturally present in unpasteurized or raw honey. This can cause severe neuroparalytic infant botulism. **Every recipe containing honey must display this red banner.**

### 2. Anticoagulant Herbs & Pre-Surgery Risk
High-dose curcumin (from *Curcuma longa*), gingerols (*Zingiber officinale*), and allicin (*Allium sativum*) inhibit platelet aggregation and prolong bleeding time. When combined with warfarin, aspirin, or clopidogrel, bleeding risk increases significantly. Users must be advised to stop 2 weeks prior to elective surgery.

### 3. Emmenagogues & Uterine Stimulants in Pregnancy
Fenugreek (*Trigonella foenum-graecum*), ajwain (*Trachyspermum ammi*), raw papaya latex (papain), and concentrated asafoetida (*Ferula foetida*) have documented oxytocic or emmenagogic activity that can stimulate uterine contractions.

---

## 3. How to Add a New Safety Rule

1. Open [`src/lib/safety/rules.ts`](file:///c:/Users/sujay/Downloads/GDH/hamare-nuskhe/src/lib/safety/rules.ts).
2. Add the trigger condition to `validateSafetyRules(remedy)` to fail seed builds if required contraindications are missing.
3. Add the derived warning object in `deriveWarnings(remedy)`. Specify `collapsible: false` for severe interactions.
4. Add corresponding positive and negative unit tests to [`src/lib/safety/rules.test.ts`](file:///c:/Users/sujay/Downloads/GDH/hamare-nuskhe/src/lib/safety/rules.test.ts).
5. Run `npm test` to ensure all tests pass.
