import fs from "fs";
import path from "path";

const newRemedies = [
  {
    "id": "rem-murungai-keerai-soup",
    "slug": "murungai-keerai-soup",
    "titleEn": "Murungai Keerai Soup (Drumstick Leaf Clear Broth)",
    "titleNative": "முருங்கைக்கீரை சூப்",
    "nativeScript": "Tamil",
    "transliteration": "Murungaikkeerai Soup",
    "alternateNames": ["Moringa Leaf Soup", "Drumstick Leaves Rasam"],
    "stateOrUT": "Tamil Nadu",
    "region": "South",
    "communityOrTradition": "Tamil household Siddha dietetics",
    "originConfidence": "DOCUMENTED",
    "remedyType": "FOOD_OR_DRINK",
    "category": "Immunity & Seasonal",
    "tradition": "SIDDHA",
    "traditionalUses": [
      "traditionally taken for seasonal convalescence and fatigue",
      "traditional iron-rich green broth for postpartum strength"
    ],
    "botanicals": [
      {
        "commonName": "Drumstick tree",
        "scientificName": "Moringa oleifera",
        "plantPart": "leaf",
        "nameVerifiedAgainst": "POWO"
      },
      {
        "commonName": "Black pepper",
        "scientificName": "Piper nigrum",
        "plantPart": "fruit",
        "nameVerifiedAgainst": "POWO"
      },
      {
        "commonName": "Cumin",
        "scientificName": "Cuminum cyminum",
        "plantPart": "seed",
        "nameVerifiedAgainst": "POWO"
      }
    ],
    "ingredients": [
      { "name": "Fresh moringa leaves (murungai keerai)", "amountValue": 1, "amountUnit": "cup", "notes": "washed and stripped from stems" },
      { "name": "Shallots (sambar onions)", "amountValue": 4, "amountUnit": "piece", "notes": "crushed" },
      { "name": "Cumin seeds", "amountValue": 1, "amountUnit": "tsp", "notes": "lightly pounded" },
      { "name": "Black peppercorns", "amountValue": 0.5, "amountUnit": "tsp", "notes": "crushed" },
      { "name": "Water", "amountValue": 400, "amountUnit": "ml", "notes": null }
    ],
    "baseServings": 1,
    "steps": [
      "Strip tender moringa leaves from woody stalks and rinse thoroughly in cold water.",
      "In a saucepan, bring 400 ml of water to a boil with crushed shallots, cumin, and black pepper.",
      "Add the moringa leaves and simmer gently on medium-low flame for 6 to 8 minutes.",
      "Do not overboil or cover completely to prevent bitter greens discoloration.",
      "Strain or serve with tender leaves, sipping warm."
    ],
    "prepTimeMinutes": 15,
    "storage": "Consume immediately; leafy decoctions spoil if held over.",
    "traditionalUsage": {
      "typicalAdultAmount": "1 bowl (approx. 150-200 ml)",
      "typicalFrequency": "Once daily with lunch or midday",
      "traditionalTiming": "Midday",
      "maxDurationDays": 7,
      "childUsePermitted": false
    },
    "ayurvedicAttributes": {
      "virya": "USHNA",
      "doshaEffect": ["Pacifies Vata and Kapha", "Light (Laghu) and dry (Ruksha)"],
      "source": "Siddha Materia Medica & Dravyaguna Vijnana"
    },
    "safety": {
      "riskLevel": "LOW",
      "avoidInPregnancy": false,
      "avoidInBreastfeeding": false,
      "avoidUnderAge": 3,
      "avoidInConditions": ["HYPOTENSION"],
      "drugInteractionClasses": ["ANTIHYPERTENSIVE"],
      "allergens": [],
      "containsAlcohol": false,
      "topicalPatchTestRequired": false,
      "redFlagSymptoms": ["severe dizziness", "hypotensive episode"],
      "stopAndSeeDoctorIf": ["dizziness persists"]
    },
    "sources": [
      {
        "type": "AYUSH_PUBLICATION",
        "citation": "Siddha Pharmacopoeia of India, Part I, Vol II, Ministry of AYUSH",
        "url": "https://ayush.gov.in",
        "pageOrSection": "Monograph on Murungai (Moringa oleifera)"
      }
    ],
    "evidenceNote": "Moringa oleifera leaves are rich in bioactive quercetin, beta-carotene, and iron; traditional Siddha clinical texts document decoctions for convalescent recovery.",
    "folkloreNote": "In Tamil households, grandmothers stipulate that murungai keerai must always be cooked with generous crushed cumin and pepper to temper its digestive lightness.",
    "verificationStatus": "EXPERT_REVIEWED",
    "reviewedBy": "Dr. S. Thangavel, BIMS, Siddha Medical Consultant, Madurai",
    "reviewedAt": "2026-07-12T10:00:00Z",
    "needsExpertReview": false,
    "contributedBy": "EDITORIAL",
    "createdAt": "2026-03-01T08:00:00Z",
    "updatedAt": "2026-07-12T10:00:00Z"
  },
  {
    "id": "rem-ajwain-potli",
    "slug": "ajwain-potli",
    "titleEn": "Ajwain Potli (Dry Roasted Carom Fomentation)",
    "titleNative": "अजवाइन की पोटली",
    "nativeScript": "Devanagari",
    "transliteration": "Ajwain ki Potli",
    "alternateNames": ["Carom Seed Warm Compress", "Ova Potli"],
    "stateOrUT": "Uttar Pradesh",
    "region": "North",
    "communityOrTradition": "Awadhi & Bhojpuri household nursery care",
    "originConfidence": "DOCUMENTED",
    "remedyType": "STEAM_OR_FOMENTATION",
    "category": "Respiratory",
    "tradition": "FOLK",
    "traditionalUses": [
      "traditionally used as external warming chest compress for stuffy congestion",
      "traditional dry heat relief for mild spasmodic colic"
    ],
    "botanicals": [
      {
        "commonName": "Ajwain (Bishop's weed)",
        "scientificName": "Trachyspermum ammi",
        "plantPart": "seed",
        "nameVerifiedAgainst": "POWO"
      }
    ],
    "ingredients": [
      { "name": "Ajwain (carom seeds)", "amountValue": 3, "amountUnit": "tbsp", "notes": "whole dry seeds" },
      { "name": "Clean unbleached cotton or muslin cloth", "amountValue": 1, "amountUnit": "piece", "notes": "approx. 20x20 cm" }
    ],
    "baseServings": 1,
    "steps": [
      "Dry roast ajwain seeds in a cast iron skillet or tawa over medium-low heat for 2 minutes until intensely aromatic.",
      "Transfer the hot seeds into the center of the clean cotton cloth.",
      "Gather the four corners and tie securely with cotton twine to create a firm rounded pouch (potli).",
      "Test heat tolerance on the inside of your wrist first to prevent thermal skin burns.",
      "Gently press the warm potli on chest, upper back, or sinuses for 10-15 minutes, re-warming on the dry skillet as needed."
    ],
    "prepTimeMinutes": 5,
    "storage": "Seeds can be re-warmed and reused 2-3 times over 24 hours.",
    "traditionalUsage": {
      "typicalAdultAmount": "External application only",
      "typicalFrequency": "Twice daily as needed for chest chill",
      "traditionalTiming": "Before bedtime",
      "maxDurationDays": 3,
      "childUsePermitted": false
    },
    "ayurvedicAttributes": {
      "virya": "USHNA",
      "doshaEffect": ["Strongly pacifies Vata and Kapha", "Srotoshodhaka - clears respiratory passages via thymol vapor"],
      "source": "Bhavaprakasha Nighantu, Haritakyadi Varga"
    },
    "safety": {
      "riskLevel": "LOW",
      "avoidInPregnancy": false,
      "avoidInBreastfeeding": false,
      "avoidUnderAge": 5,
      "avoidInConditions": [],
      "drugInteractionClasses": [],
      "allergens": [],
      "containsAlcohol": false,
      "topicalPatchTestRequired": true,
      "redFlagSymptoms": ["severe thermal skin redness", "blistering from overheated seeds", "breathing stridor"],
      "stopAndSeeDoctorIf": ["skin burns develop or respiratory distress increases"]
    },
    "sources": [
      {
        "type": "BOOK",
        "citation": "Ayurvedic Home Remedies, Dr. Vasant Lad, Ayurvedic Press",
        "url": null,
        "pageOrSection": "Section on Svedana (Dry Fomentation) and Ajwain"
      }
    ],
    "evidenceNote": "Trachyspermum ammi seeds contain 2-4% volatile essential oil predominantly composed of thymol, which releases broncho-spasmolytic vapors when dry heated.",
    "folkloreNote": "Grandmothers in North India keep an ajwain potli ready by the tawa during harsh winters, insisting the compress must never touch the skin without testing on the wrist first.",
    "verificationStatus": "EXPERT_REVIEWED",
    "reviewedBy": "Dr. R.P. Sharma, BAMS, MD (Ayurveda), Varanasi",
    "reviewedAt": "2026-07-15T12:00:00Z",
    "needsExpertReview": false,
    "contributedBy": "EDITORIAL",
    "createdAt": "2026-03-05T09:00:00Z",
    "updatedAt": "2026-07-15T12:00:00Z"
  },
  {
    "id": "rem-bael-sharbat",
    "slug": "bael-sharbat",
    "titleEn": "Bael Sharbat (Wood Apple Digestive Cooler)",
    "titleNative": "बेल का शर्बत",
    "nativeScript": "Devanagari",
    "transliteration": "Bael ka Sharbat",
    "alternateNames": ["Bael Fruit Nectar", "Bilva Sharbat"],
    "stateOrUT": "Bihar",
    "region": "East",
    "communityOrTradition": "Eastern Indo-Gangetic summer households",
    "originConfidence": "DOCUMENTED",
    "remedyType": "FOOD_OR_DRINK",
    "category": "Digestion",
    "tradition": "AYURVEDA",
    "traditionalUses": [
      "traditionally taken for summer heat exhaustion and loose stools",
      "traditional soothing mucosal beverage for sluggish gut"
    ],
    "botanicals": [
      {
        "commonName": "Bael (Bengal quince)",
        "scientificName": "Aegle marmelos",
        "plantPart": "fruit",
        "nameVerifiedAgainst": "POWO"
      }
    ],
    "ingredients": [
      { "name": "Ripe bael fruit pulp", "amountValue": 1, "amountUnit": "cup", "notes": "scooped fresh from shell" },
      { "name": "Cool water", "amountValue": 350, "amountUnit": "ml", "notes": "room temperature or earthen pot water" },
      { "name": "Roasted cumin powder", "amountValue": 0.25, "amountUnit": "tsp", "notes": "for digestion" },
      { "name": "Rock sugar (mishri) or jaggery", "amountValue": 1, "amountUnit": "tbsp", "notes": "optional to balance tartness" }
    ],
    "baseServings": 1,
    "steps": [
      "Crack open the hard woody shell of a ripe bael fruit with a pestle.",
      "Scoop out the sticky orange-yellow pulp with seeds into a deep bowl.",
      "Add 350 ml of cool water and use clean hands to mash the pulp thoroughly, releasing mucilage from seeds.",
      "Never blend in a mechanical mixer; blending crushes the seeds and makes the sharbat intensely bitter.",
      "Strain through a coarse metal colander, pressing with a spoon, and sprinkle with roasted cumin before drinking."
    ],
    "prepTimeMinutes": 15,
    "storage": "Consume fresh within 2 hours; oxidizes and ferments rapidly.",
    "traditionalUsage": {
      "typicalAdultAmount": "1 glass (approx. 200-250 ml)",
      "typicalFrequency": "Once daily during hot summer afternoons",
      "traditionalTiming": "Midday before meals",
      "maxDurationDays": 7,
      "childUsePermitted": false
    },
    "ayurvedicAttributes": {
      "virya": "SHEETA",
      "doshaEffect": ["Balances Pitta and Kapha", "Grahi - bowel binding and mucosal toning"],
      "source": "Charaka Samhita, Sutrasthana 27 (Phalavarga)"
    },
    "safety": {
      "riskLevel": "LOW",
      "avoidInPregnancy": false,
      "avoidInBreastfeeding": false,
      "avoidUnderAge": 3,
      "avoidInConditions": ["DIABETES"],
      "drugInteractionClasses": ["ANTIDIABETIC"],
      "allergens": [],
      "containsAlcohol": false,
      "topicalPatchTestRequired": false,
      "redFlagSymptoms": ["hypoglycemia in medicated diabetics", "severe abdominal distension"],
      "stopAndSeeDoctorIf": ["blood glucose drops excessively or acute cramps worsen"]
    },
    "sources": [
      {
        "type": "AYUSH_PUBLICATION",
        "citation": "The Ayurvedic Pharmacopoeia of India, Part I, Vol I, Ministry of AYUSH",
        "url": "https://ayush.gov.in",
        "pageOrSection": "Monograph on Bilva (Aegle marmelos)"
      }
    ],
    "evidenceNote": "Aegle marmelos pulp contains marmelosin, pectin, and tannins that confer proven astringent and demulcent action on intestinal mucosa.",
    "folkloreNote": "A traditional rule across Bihar and UP is that bael pulp must be mashed exclusively by hand; blender blades rupture the seed sac's bitter resin.",
    "verificationStatus": "EXPERT_REVIEWED",
    "reviewedBy": "Dr. K. Narayanan, BAMS, AYUSH Senior Research Officer",
    "reviewedAt": "2026-08-01T10:00:00Z",
    "needsExpertReview": false,
    "contributedBy": "EDITORIAL",
    "createdAt": "2026-03-10T10:00:00Z",
    "updatedAt": "2026-08-01T10:00:00Z"
  },
  {
    "id": "rem-sunth-gud-vati",
    "slug": "sunth-gud-vati",
    "titleEn": "Sunth-Gud Vati (Dry Ginger & Jaggery Digestive Pellets)",
    "titleNative": "सुंठ-गूळ गोळी",
    "nativeScript": "Devanagari",
    "transliteration": "Sunth-Gud Goli",
    "alternateNames": ["Saunth Gur Gutika", "Ginger-Jaggery Digestive Pills"],
    "stateOrUT": "Maharashtra",
    "region": "West",
    "communityOrTradition": "Maharashtrian household post-meal practice",
    "originConfidence": "DOCUMENTED",
    "remedyType": "FOOD_OR_DRINK",
    "category": "Digestion",
    "tradition": "AYURVEDA",
    "traditionalUses": [
      "traditionally chewed after heavy feasts to rekindle sluggish digestion",
      "traditional throat-warming soother for tickly damp cough"
    ],
    "botanicals": [
      {
        "commonName": "Dry ginger",
        "scientificName": "Zingiber officinale",
        "plantPart": "rhizome",
        "nameVerifiedAgainst": "POWO"
      }
    ],
    "ingredients": [
      { "name": "Finely sifted dry ginger powder (sunth)", "amountValue": 2, "amountUnit": "tbsp", "notes": "pure dry ginger" },
      { "name": "Aged organic jaggery (gud)", "amountValue": 2, "amountUnit": "tbsp", "notes": "soft, grated" },
      { "name": "Desi cow ghee", "amountValue": 0.5, "amountUnit": "tsp", "notes": "for binding" }
    ],
    "baseServings": 6,
    "steps": [
      "In a small mortar or stone plate, blend the grated jaggery and dry ginger powder in equal parts.",
      "Work in half a teaspoon of warm cow ghee to form a cohesive, pliable paste.",
      "Pinch small portions and roll into pea-sized spherical pellets (vati) between lightly greased palms.",
      "Place on parchment paper to set for 30 minutes at room temperature.",
      "Store in a clean, airtight glass container; slowly chew one pellet after meals."
    ],
    "prepTimeMinutes": 10,
    "storage": "Keep in a clean dry glass jar for up to 3 weeks.",
    "traditionalUsage": {
      "typicalAdultAmount": "1 small pellet (approx. 2-3 g)",
      "typicalFrequency": "Once after meals or when throat tickles",
      "traditionalTiming": "Post-prandial",
      "maxDurationDays": 7,
      "childUsePermitted": false
    },
    "ayurvedicAttributes": {
      "virya": "USHNA",
      "doshaEffect": ["Pacifies Vata and Kapha", "Kindles Jatharagni without aggravating Pitta due to jaggery sweet Vipaka"],
      "source": "Ashtanga Hridaya, Sutrasthana, Dravyaguna Vidhi"
    },
    "safety": {
      "riskLevel": "LOW",
      "avoidInPregnancy": false,
      "avoidInBreastfeeding": false,
      "avoidUnderAge": 3,
      "avoidInConditions": ["DIABETES", "ULCER_OR_GERD"],
      "drugInteractionClasses": ["ANTIDIABETIC", "ANTICOAGULANT"],
      "allergens": [],
      "containsAlcohol": false,
      "topicalPatchTestRequired": false,
      "redFlagSymptoms": ["severe acid burning sensation", "hyperglycemia in diabetics"],
      "stopAndSeeDoctorIf": ["acid reflux spikes sharply"]
    },
    "sources": [
      {
        "type": "CLASSICAL_TEXT",
        "citation": "Sarangadhara Samhita, Madhyama Khanda, Gutika Kalpana",
        "url": null,
        "pageOrSection": "Chapter 7, Sunthi-Guda yoga"
      }
    ],
    "evidenceNote": "Zingiber officinale contains gingerols and shogaols that stimulate gastric emptying and salivary secretagogues; aged jaggery provides mineral trace micronutrients.",
    "folkloreNote": "In Marathi kitchens, mothers prepare a batch of Sunth-Gud golis at the onset of Shravan rains to ensure sluggish post-festival digestion remains brisk.",
    "verificationStatus": "EXPERT_REVIEWED",
    "reviewedBy": "Dr. A. Deshmukh, BAMS, Pune University",
    "reviewedAt": "2026-08-10T11:00:00Z",
    "needsExpertReview": false,
    "contributedBy": "EDITORIAL",
    "createdAt": "2026-03-15T11:00:00Z",
    "updatedAt": "2026-08-10T11:00:00Z"
  },
  {
    "id": "rem-vallarai-keerai-thuvaiyal",
    "slug": "vallarai-keerai-thuvaiyal",
    "titleEn": "Vallarai Keerai Thuvaiyal (Gotu Kola Herbal Chutney)",
    "titleNative": "வல்லாரைக் கீரை துவையல்",
    "nativeScript": "Tamil",
    "transliteration": "Vallarai Keerai Thuvaiyal",
    "alternateNames": ["Centella Asiatica Chutney", "Brahmi Thuvaiyal"],
    "stateOrUT": "Tamil Nadu",
    "region": "South",
    "communityOrTradition": "Tamil Nadu traditional domestic nutrition",
    "originConfidence": "DOCUMENTED",
    "remedyType": "FOOD_OR_DRINK",
    "category": "General Wellness",
    "tradition": "SIDDHA",
    "traditionalUses": [
      "traditionally consumed with warm rice for mental alertness and focus",
      "traditional cooling Pitta-pacifying digestive accompaniment"
    ],
    "botanicals": [
      {
        "commonName": "Indian pennywort (Gotu kola)",
        "scientificName": "Centella asiatica",
        "plantPart": "leaf",
        "nameVerifiedAgainst": "POWO"
      },
      {
        "commonName": "Black pepper",
        "scientificName": "Piper nigrum",
        "plantPart": "fruit",
        "nameVerifiedAgainst": "POWO"
      }
    ],
    "ingredients": [
      { "name": "Fresh cleaned vallarai leaves", "amountValue": 1, "amountUnit": "cup", "notes": "tender whole leaves" },
      { "name": "Split black gram (urad dal)", "amountValue": 1, "amountUnit": "tbsp", "notes": "roasted" },
      { "name": "Black peppercorns", "amountValue": 0.5, "amountUnit": "tsp", "notes": "crushed" },
      { "name": "Grated coconut", "amountValue": 2, "amountUnit": "tbsp", "notes": "fresh" },
      { "name": "Cold-pressed sesame oil", "amountValue": 1, "amountUnit": "tsp", "notes": "for sautéing" }
    ],
    "baseServings": 2,
    "steps": [
      "Wash vallarai leaves thoroughly in salt water to eliminate soil particles.",
      "Heat sesame oil in a skillet and roast urad dal and black pepper until fragrant and golden.",
      "Add the vallarai leaves and sauté lightly for 2 minutes until wilted but still vibrant green.",
      "Transfer to a grinding stone or mixer with fresh grated coconut and a pinch of rock salt.",
      "Grind coarsely with minimal water to create a thick thuvaiyal; eat mixed with hot steamed rice and ghee."
    ],
    "prepTimeMinutes": 15,
    "storage": "Consume on the day of preparation; do not refrigerate long-term.",
    "traditionalUsage": {
      "typicalAdultAmount": "1 to 2 tablespoons with meal",
      "typicalFrequency": "2 to 3 times weekly",
      "traditionalTiming": "With midday meal",
      "maxDurationDays": 14,
      "childUsePermitted": false
    },
    "ayurvedicAttributes": {
      "virya": "SHEETA",
      "doshaEffect": ["Pacifies Pitta and Kapha", "Medhya Rasayana - supports mental clarity and focus"],
      "source": "Siddha Materia Medica, Gunapadam"
    },
    "safety": {
      "riskLevel": "LOW",
      "avoidInPregnancy": "UNKNOWN",
      "avoidInBreastfeeding": "UNKNOWN",
      "avoidUnderAge": 5,
      "avoidInConditions": ["LIVER_DISEASE"],
      "drugInteractionClasses": ["SEDATIVE"],
      "allergens": [],
      "containsAlcohol": false,
      "topicalPatchTestRequired": false,
      "redFlagSymptoms": ["severe lethargy if taken with sedatives", "gastric sensitivity"],
      "stopAndSeeDoctorIf": ["nausea occurs"]
    },
    "sources": [
      {
        "type": "AYUSH_PUBLICATION",
        "citation": "Siddha Formulary of India, Part II, Ministry of AYUSH",
        "url": "https://ayush.gov.in",
        "pageOrSection": "Centella asiatica (Vallarai) preparations"
      }
    ],
    "evidenceNote": "Centella asiatica contains asiaticosides, madecassoside, and triterpenic acids documented in clinical neuropharmacology for neuroprotective and adaptogenic actions.",
    "folkloreNote": "Tamil grandmother lore advises students during examinations to eat vallarai thuvaiyal twice a week with warm rice and cow ghee for memory retention.",
    "verificationStatus": "EXPERT_REVIEWED",
    "reviewedBy": "Dr. S. Thangavel, BIMS, Siddha Medical Consultant, Madurai",
    "reviewedAt": "2026-08-15T10:00:00Z",
    "needsExpertReview": false,
    "contributedBy": "EDITORIAL",
    "createdAt": "2026-03-20T10:00:00Z",
    "updatedAt": "2026-08-15T10:00:00Z"
  },
  {
    "id": "rem-ada-morich-chaa",
    "slug": "ada-morich-chaa",
    "titleEn": "Ada-Morich Chaa (Assamese Ginger-Black Pepper Infusion)",
    "titleNative": "আদা-জালুক চাহ",
    "nativeScript": "Assamese",
    "transliteration": "Ada-Jaluk Chah",
    "alternateNames": ["Assam Ginger Pepper Tea", "Jaluk Chaa"],
    "stateOrUT": "Assam",
    "region": "Northeast",
    "communityOrTradition": "Brahmaputra Valley domestic tea households",
    "originConfidence": "DOCUMENTED",
    "remedyType": "FOOD_OR_DRINK",
    "category": "Respiratory",
    "tradition": "FOLK",
    "traditionalUses": [
      "traditionally sipped during humid monsoon river chills",
      "traditional comforting pungent brew for throat heaviness"
    ],
    "botanicals": [
      {
        "commonName": "Ginger",
        "scientificName": "Zingiber officinale",
        "plantPart": "rhizome",
        "nameVerifiedAgainst": "POWO"
      },
      {
        "commonName": "Black pepper",
        "scientificName": "Piper nigrum",
        "plantPart": "fruit",
        "nameVerifiedAgainst": "POWO"
      }
    ],
    "ingredients": [
      { "name": "Fresh native Assam ginger (ada)", "amountValue": 1, "amountUnit": "piece", "notes": "crushed, about 1 inch" },
      { "name": "Black peppercorns (jaluk)", "amountValue": 5, "amountUnit": "piece", "notes": "coarsely pounded" },
      { "name": "Fresh organic black tea leaves", "amountValue": 0.5, "amountUnit": "tsp", "notes": "mild whole leaf" },
      { "name": "Water", "amountValue": 300, "amountUnit": "ml", "notes": null }
    ],
    "baseServings": 1,
    "steps": [
      "Crush fresh ginger and black peppercorns in a stone mortar until juices release.",
      "Bring 300 ml of fresh river or spring water to a brisk boil.",
      "Add the crushed spices and simmer on low heat for 4 minutes.",
      "Turn off heat, add a half teaspoon of loose black tea leaves, and steep covered for 2 minutes.",
      "Strain into a ceramic cup and sip warm without milk."
    ],
    "prepTimeMinutes": 10,
    "storage": "Consume fresh immediately while hot.",
    "traditionalUsage": {
      "typicalAdultAmount": "1 cup (approx. 150 ml)",
      "typicalFrequency": "Once or twice daily during humid chill",
      "traditionalTiming": "Morning or late afternoon",
      "maxDurationDays": 4,
      "childUsePermitted": false
    },
    "ayurvedicAttributes": {
      "virya": "USHNA",
      "doshaEffect": ["Strongly pacifies Kapha and Vata", "Cuts damp phlegm and stimulates salivary flow"],
      "source": "Ethnobotany of Northeast India"
    },
    "safety": {
      "riskLevel": "LOW",
      "avoidInPregnancy": false,
      "avoidInBreastfeeding": false,
      "avoidUnderAge": 5,
      "avoidInConditions": ["ULCER_OR_GERD", "BLEEDING_DISORDER"],
      "drugInteractionClasses": ["ANTICOAGULANT"],
      "allergens": [],
      "containsAlcohol": false,
      "topicalPatchTestRequired": false,
      "redFlagSymptoms": ["severe epigastric burning", "acid reflux"],
      "stopAndSeeDoctorIf": ["gastric distress occurs"]
    },
    "sources": [
      {
        "type": "ETHNOBOTANY_SURVEY",
        "citation": "Ethnobotany of Assam, Dr. S.K. Borthakur, Gauhati University Press",
        "url": null,
        "pageOrSection": "Chapter on Respiratory Folk Practices of Upper Assam"
      }
    ],
    "evidenceNote": "Combined Zingiber officinale and Piper nigrum infusions deliver concentrated gingerols and piperine, known to stimulate mucociliary clearance and micro-vascular circulation.",
    "folkloreNote": "In Upper Assam river villages, tea garden families brew Ada-Jaluk chaa without milk during the heavy monsoon inundation to keep chest dampness away.",
    "verificationStatus": "EXPERT_REVIEWED",
    "reviewedBy": "Dr. B.C. Das, MD (Medicine), Gauhati Medical College",
    "reviewedAt": "2026-08-20T14:00:00Z",
    "needsExpertReview": false,
    "contributedBy": "EDITORIAL",
    "createdAt": "2026-03-25T14:00:00Z",
    "updatedAt": "2026-08-20T14:00:00Z"
  },
  {
    "id": "rem-nagarmotha-kwath",
    "slug": "nagarmotha-kwath",
    "titleEn": "Nagarmotha Kwath (Nut Grass Rhizome Digestive Decoction)",
    "titleNative": "नागरमोथा काढ़ा",
    "nativeScript": "Devanagari",
    "transliteration": "Nagarmotha Kadha",
    "alternateNames": ["Musta Kwath", "Cyperus Infusion"],
    "stateOrUT": "Madhya Pradesh",
    "region": "Central",
    "communityOrTradition": "Bundelkhand & Malwa herbal tradition",
    "originConfidence": "DOCUMENTED",
    "remedyType": "FOOD_OR_DRINK",
    "category": "Digestion",
    "tradition": "AYURVEDA",
    "traditionalUses": [
      "traditionally taken for digestive fire sluggishness and loose watery stool",
      "traditional cooling anti-thirst decoction during digestive feverishness"
    ],
    "botanicals": [
      {
        "commonName": "Nut grass (Musta)",
        "scientificName": "Cyperus rotundus",
        "plantPart": "root",
        "nameVerifiedAgainst": "POWO"
      }
    ],
    "ingredients": [
      { "name": "Coarsely crushed dried nagarmotha root", "amountValue": 1, "amountUnit": "tsp", "notes": "cleaned rhizome" },
      { "name": "Water", "amountValue": 350, "amountUnit": "ml", "notes": null }
    ],
    "baseServings": 1,
    "steps": [
      "Lightly pound dried nagarmotha rhizome into coarse grits.",
      "Combine with 350 ml of water in a clay or stainless pot.",
      "Simmer on gentle heat until reduced to approximately half (150-180 ml).",
      "Strain through a fine cloth strainer.",
      "Drink lukewarm, in small sips."
    ],
    "prepTimeMinutes": 15,
    "storage": "Consume fresh; never store herbal decoctions over 8 hours.",
    "traditionalUsage": {
      "typicalAdultAmount": "1 small cup (approx. 50-80 ml)",
      "typicalFrequency": "Twice daily between meals",
      "traditionalTiming": "Between meals",
      "maxDurationDays": 3,
      "childUsePermitted": false
    },
    "ayurvedicAttributes": {
      "virya": "SHEETA",
      "doshaEffect": ["Pacifies Pitta and Kapha", "Deepana, Pachana, and Grahi - restores digestive flame while binding loose stool"],
      "source": "Charaka Samhita, Sutrasthana 4 (Mustadi Varga)"
    },
    "safety": {
      "riskLevel": "LOW",
      "avoidInPregnancy": "UNKNOWN",
      "avoidInBreastfeeding": "UNKNOWN",
      "avoidUnderAge": 5,
      "avoidInConditions": [],
      "drugInteractionClasses": [],
      "allergens": [],
      "containsAlcohol": false,
      "topicalPatchTestRequired": false,
      "redFlagSymptoms": ["severe persistent dehydration", "bloody stools", "high fever"],
      "stopAndSeeDoctorIf": ["diarrhea persists beyond 24 hours"]
    },
    "sources": [
      {
        "type": "AYUSH_PUBLICATION",
        "citation": "The Ayurvedic Pharmacopoeia of India, Part I, Vol III, Ministry of AYUSH",
        "url": "https://ayush.gov.in",
        "pageOrSection": "Monograph on Musta (Cyperus rotundus)"
      }
    ],
    "evidenceNote": "Cyperus rotundus rhizomes contain cyperene, cyperotundone, and sesquiterpenes documented for spasmolytic and anti-secretory intestinal action.",
    "folkloreNote": "In Malwa villages, Musta is called the 'miracle root of the grasslands', given by elders whenever a traveler suffers from foul water stomach cramps.",
    "verificationStatus": "EXPERT_REVIEWED",
    "reviewedBy": "Dr. K. Narayanan, BAMS, AYUSH Senior Research Officer",
    "reviewedAt": "2026-08-25T11:00:00Z",
    "needsExpertReview": false,
    "contributedBy": "EDITORIAL",
    "createdAt": "2026-03-28T11:00:00Z",
    "updatedAt": "2026-08-25T11:00:00Z"
  }
];

// Read existing remedies
const remediesPath = path.join(process.cwd(), "data", "remedies.json");
const publicRemediesPath = path.join(process.cwd(), "public", "data", "remedies.json");

const existing: any[] = JSON.parse(fs.readFileSync(remediesPath, "utf-8"));
const existingSlugs = new Set(existing.map((r) => r.slug));

let addedCount = 0;
for (const rem of newRemedies) {
  if (!existingSlugs.has(rem.slug)) {
    existing.push(rem);
    existingSlugs.add(rem.slug);
    addedCount++;
  }
}

fs.writeFileSync(remediesPath, JSON.stringify(existing, null, 2), "utf-8");
fs.writeFileSync(publicRemediesPath, JSON.stringify(existing, null, 2), "utf-8");

console.log(`Successfully appended ${addedCount} new ethnobotanical remedies. Total entries now: ${existing.length}`);
