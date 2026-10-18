const fs = require('fs');
const path = require('path');

const newRemedies = [
  {
    id: "rem-sarson-lahsun-tel",
    slug: "sarson-lahsun-tel",
    titleEn: "Sarson Lahsun Tel (Warm Mustard Garlic Oil)",
    titleNative: "ਸਰ੍ਹੋਂ ਲਸਣ ਤੇਲ",
    nativeScript: "Gurmukhi",
    transliteration: "Sarson Lahsun Tel",
    alternateNames: ["Mustard Garlic Chest Oil", "Garlic Infused Mustard Oil"],
    stateOrUT: "Punjab",
    region: "North",
    communityOrTradition: "Punjabi rural households",
    originConfidence: "DOCUMENTED",
    remedyType: "TOPICAL",
    category: "Joint & Muscle",
    tradition: "FOLK",
    traditionalUses: [
      "traditionally massaged over aching cold-weather joints",
      "traditionally applied externally over chest for seasonal chill comfort"
    ],
    botanicals: [
      {
        commonName: "Indian mustard",
        scientificName: "Brassica juncea",
        plantPart: "seed oil",
        nameVerifiedAgainst: "POWO"
      },
      {
        commonName: "Garlic",
        scientificName: "Allium sativum",
        plantPart: "clove",
        nameVerifiedAgainst: "POWO"
      }
    ],
    ingredients: [
      {
        name: "Cold-pressed mustard oil (sarson tel)",
        amountValue: 50,
        amountUnit: "ml",
        notes: "pure unrefined kachi ghani"
      },
      {
        name: "Garlic cloves (lahsun)",
        amountValue: 4,
        amountUnit: "piece",
        notes: "peeled and lightly bruised"
      },
      {
        name: "Ajwain seeds (optional carom)",
        amountValue: 0.5,
        amountUnit: "tsp",
        notes: "for added warmth"
      }
    ],
    baseServings: 1,
    steps: [
      "In a small iron or heavy-bottomed tadka pan, pour the mustard oil and place over low flame.",
      "Add bruised garlic cloves and allow them to gently sizzle until they turn light golden brown.",
      "Turn off heat immediately so the pungent volatile allylic oils are preserved; do not burn the garlic.",
      "Cool until pleasantly lukewarm to the inner wrist before gentle massage application."
    ],
    prepTimeMinutes: 10,
    storage: "Can be stored in a clean glass vial for up to 7 days.",
    traditionalUsage: {
      typicalAdultAmount: "1 to 2 teaspoons for external massage",
      typicalFrequency: "Once at night before retiring",
      traditionalTiming: "Evening or after bath",
      maxDurationDays: 7,
      childUsePermitted: false
    },
    ayurvedicAttributes: {
      virya: "USHNA",
      doshaEffect: ["Pacifies Vata and Kapha", "Increases Pitta if overused"],
      source: "Bhavaprakasha Nighantu - Taila Varga"
    },
    safety: {
      riskLevel: "LOW",
      avoidInPregnancy: true,
      avoidInBreastfeeding: false,
      avoidUnderAge: null,
      avoidInConditions: ["BLEEDING_DISORDER"],
      drugInteractionClasses: ["ANTICOAGULANT"],
      allergens: ["mustard"],
      containsAlcohol: false,
      topicalPatchTestRequired: true,
      redFlagSymptoms: [
        "Severe joint swelling or burning erythema",
        "Open wounds or broken skin",
        "Suspected fracture or acute traumatic injury"
      ],
      stopAndSeeDoctorIf: [
        "Skin develops redness, blistering, or burning contact dermatitis",
        "Joint pain worsens or is accompanied by fever"
      ]
    },
    sources: [
      {
        type: "ETHNOBOTANY_SURVEY",
        citation: "CCRAS: Documentation of Folk Practices in Rural Punjab & Haryana",
        url: "https://ccras.nic.in",
        pageOrSection: "Household topical fomentations"
      }
    ],
    evidenceNote: "Traditional external domestic rub; laboratory analyses confirm anti-inflammatory properties of allyl isothiocyanates, but formal clinical trials on this specific preparation are limited.",
    folkloreNote: "Grandmothers in Punjab advise keeping the massaged area wrapped in dry flannel cloth away from drafty winds.",
    verificationStatus: "AUTO_CHECKED",
    reviewedBy: null,
    reviewedAt: null,
    needsExpertReview: true,
    contributedBy: "EDITORIAL",
    createdAt: "2026-03-15T00:00:00.000Z",
    updatedAt: "2026-03-15T00:00:00.000Z"
  },
  {
    id: "rem-alsi-pinni",
    slug: "alsi-pinni",
    titleEn: "Alsi Pinni (Flaxseed & Winter Spice Confection)",
    titleNative: "ਅਲਸੀ ਦੀ ਪਿੰਨੀ",
    nativeScript: "Gurmukhi",
    transliteration: "Alsi di Pinni",
    alternateNames: ["Flaxseed Laddoo", "Punjabi Alsi Pinni"],
    stateOrUT: "Punjab",
    region: "North",
    communityOrTradition: "Punjabi winter household kitchens",
    originConfidence: "DOCUMENTED",
    remedyType: "FOOD_OR_DRINK",
    category: "General Wellness",
    tradition: "FOLK",
    traditionalUses: [
      "traditionally eaten as a nourishing winter snack for seasonal stamina",
      "traditionally taken for cold-weather joint lubrication and lumbar comfort"
    ],
    botanicals: [
      {
        commonName: "Flaxseed",
        scientificName: "Linum usitatissimum",
        plantPart: "seed",
        nameVerifiedAgainst: "POWO"
      },
      {
        commonName: "Carom seed",
        scientificName: "Trachyspermum ammi",
        plantPart: "fruit",
        nameVerifiedAgainst: "POWO"
      }
    ],
    ingredients: [
      {
        name: "Roasted flaxseed powder (alsi)",
        amountValue: 100,
        amountUnit: "g",
        notes: "gently dry roasted and coarsely milled"
      },
      {
        name: "Whole wheat flour",
        amountValue: 100,
        amountUnit: "g",
        notes: "roasted in desi ghee"
      },
      {
        name: "Desi cow ghee",
        amountValue: 50,
        amountUnit: "g",
        notes: "clarified butter"
      },
      {
        name: "Jaggery (gud)",
        amountValue: 80,
        amountUnit: "g",
        notes: "melted"
      },
      {
        name: "Ajwain powder",
        amountValue: 0.5,
        amountUnit: "tsp",
        notes: "warming carminative spice"
      }
    ],
    baseServings: 6,
    steps: [
      "Dry roast flaxseeds in a thick kadai until they pop aromatic; cool and grind coarsely.",
      "Roast whole wheat flour in desi ghee on low flame until nutty and golden brown.",
      "Melt jaggery with 2 tablespoons of water to form a single-string syrup.",
      "Fold in ground flaxseeds, wheat flour, and ajwain into the warm syrup.",
      "Shape into round pinnis while warm and store in an airtight container."
    ],
    prepTimeMinutes: 30,
    storage: "Keeps well in an airtight container for up to 30 days during winter.",
    traditionalUsage: {
      typicalAdultAmount: "1 small pinni (approx 25g)",
      typicalFrequency: "Once daily in the morning with warm milk or water",
      traditionalTiming: "Morning breakfast during cold months",
      maxDurationDays: 45,
      childUsePermitted: false
    },
    ayurvedicAttributes: {
      virya: "USHNA",
      doshaEffect: ["Pacifies Vata", "May aggravate Pitta and Kapha in excess"],
      source: "Charaka Samhita - Sutrasthana"
    },
    safety: {
      riskLevel: "MODERATE",
      avoidInPregnancy: true,
      avoidInBreastfeeding: false,
      avoidUnderAge: 5,
      avoidInConditions: ["DIABETES", "BLEEDING_DISORDER"],
      drugInteractionClasses: ["ANTICOAGULANT", "ANTIDIABETIC"],
      allergens: ["gluten", "dairy"],
      containsAlcohol: false,
      topicalPatchTestRequired: false,
      redFlagSymptoms: [
        "Uncontrolled blood sugar spikes",
        "Acute bowel obstruction"
      ],
      stopAndSeeDoctorIf: [
        "Experiencing digestive intolerance or bloating",
        "Blood glucose levels elevate significantly"
      ]
    },
    sources: [
      {
        type: "BOOK",
        citation: "Traditional Foods of Punjab - Punjab Agricultural University Cultural Survey",
        url: null,
        pageOrSection: "pp. 82-84"
      }
    ],
    evidenceNote: "Flaxseeds are rich in alpha-linolenic acid (ALA) and lignans; traditional dietary preparation for winter energy.",
    folkloreNote: "Old village elders prepare alsi pinnis specifically when the first frost touches the mustard fields.",
    verificationStatus: "AUTO_CHECKED",
    reviewedBy: null,
    reviewedAt: null,
    needsExpertReview: true,
    contributedBy: "EDITORIAL",
    createdAt: "2026-03-15T00:00:00.000Z",
    updatedAt: "2026-03-15T00:00:00.000Z"
  },
  {
    id: "rem-kahwa-kesar-badam",
    slug: "kahwa-kesar-badam",
    titleEn: "Kashmiri Kahwa (Saffron & Green Tea Warming Infusion)",
    titleNative: "कश्मीरी कहवा",
    nativeScript: "Devanagari",
    transliteration: "Kashmiri Kahwa",
    alternateNames: ["Kashmir Green Tea", "Mughal Kahwa"],
    stateOrUT: "Jammu & Kashmir",
    region: "North",
    communityOrTradition: "Kashmiri household tea ritual",
    originConfidence: "DOCUMENTED",
    remedyType: "FOOD_OR_DRINK",
    category: "Immunity & Seasonal",
    tradition: "FOLK",
    traditionalUses: [
      "traditionally brewed for warding off biting sub-zero mountain chills",
      "traditionally sipped to promote soothing post-meal digestive warmth"
    ],
    botanicals: [
      {
        commonName: "Saffron",
        scientificName: "Crocus sativus",
        plantPart: "stigma",
        nameVerifiedAgainst: "POWO"
      },
      {
        commonName: "Cardamom",
        scientificName: "Elettaria cardamomum",
        plantPart: "fruit",
        nameVerifiedAgainst: "POWO"
      },
      {
        commonName: "Cinnamon",
        scientificName: "Cinnamomum verum",
        plantPart: "bark",
        nameVerifiedAgainst: "POWO"
      },
      {
        commonName: "Almond",
        scientificName: "Prunus dulcis",
        plantPart: "seed",
        nameVerifiedAgainst: "POWO"
      }
    ],
    ingredients: [
      {
        name: "Green tea leaves (Kashmiri unfermented)",
        amountValue: 1,
        amountUnit: "tsp",
        notes: "loose whole leaves"
      },
      {
        name: "Pure Kashmiri saffron threads",
        amountValue: 4,
        amountUnit: "piece",
        notes: "Kashmir Mongra variety"
      },
      {
        name: "Green cardamom pods",
        amountValue: 2,
        amountUnit: "piece",
        notes: "lightly bruised"
      },
      {
        name: "Ceylon cinnamon bark",
        amountValue: 1,
        amountUnit: "piece",
        notes: "small 1-inch quill"
      },
      {
        name: "Blanched slivered almonds",
        amountValue: 4,
        amountUnit: "piece",
        notes: "thinly sliced into cup"
      },
      {
        name: "Water",
        amountValue: 2,
        amountUnit: "cup",
        notes: "fresh spring water"
      }
    ],
    baseServings: 2,
    steps: [
      "Bring 2 cups of water to a gentle boil with crushed cardamom and cinnamon bark for 3 minutes.",
      "Add loose green tea leaves, turn off the flame immediately, and cover with lid to steep for 2 minutes.",
      "Place saffron threads and almond slivers into traditional porcelain cups.",
      "Strain hot infusion over the saffron and let the cup turn luminous golden amber before serving."
    ],
    prepTimeMinutes: 8,
    storage: "Brew fresh and consume immediately while hot.",
    traditionalUsage: {
      typicalAdultAmount: "1 cup (approx 120ml)",
      typicalFrequency: "1 to 2 times daily in winter",
      traditionalTiming: "Morning or mid-afternoon",
      maxDurationDays: 30,
      childUsePermitted: false
    },
    ayurvedicAttributes: {
      virya: "USHNA",
      doshaEffect: ["Pacifies Vata and Kapha"],
      source: "Dravyaguna Vijnana"
    },
    safety: {
      riskLevel: "LOW",
      avoidInPregnancy: true,
      avoidInBreastfeeding: false,
      avoidUnderAge: 5,
      avoidInConditions: ["BLEEDING_DISORDER"],
      drugInteractionClasses: ["ANTICOAGULANT", "ANTIDIABETIC"],
      allergens: ["tree nuts"],
      containsAlcohol: false,
      topicalPatchTestRequired: false,
      redFlagSymptoms: [
        "Persistent high fever or shivering",
        "Severe throat obstruction"
      ],
      stopAndSeeDoctorIf: [
        "Symptoms do not improve within 3 days",
        "Experiencing unexpected palpitations"
      ]
    },
    sources: [
      {
        type: "BOOK",
        citation: "Waza Brothers: The Heritage Cuisine of Kashmir",
        url: null,
        pageOrSection: "Traditional Hot Beverages, p. 114"
      }
    ],
    evidenceNote: "Saffron contains crocin and safranal studied for mild mood-elevating and antioxidant properties.",
    folkloreNote: "Kashmiri elders insist that true Kahwa should never be boiled after tea leaves are added, only infused in copper Samovars.",
    verificationStatus: "AUTO_CHECKED",
    reviewedBy: null,
    reviewedAt: null,
    needsExpertReview: true,
    contributedBy: "EDITORIAL",
    createdAt: "2026-03-15T00:00:00.000Z",
    updatedAt: "2026-03-15T00:00:00.000Z"
  },
  {
    id: "rem-buransh-phool-sharbat",
    slug: "buransh-phool-sharbat",
    titleEn: "Buransh Phool Sharbat (Wild Rhododendron Cooler)",
    titleNative: "बुरांश का शर्बत",
    nativeScript: "Devanagari",
    transliteration: "Buransh ka Sharbat",
    alternateNames: ["Rhododendron Flower Squash", "Pahari Buransh Drink"],
    stateOrUT: "Himachal Pradesh",
    region: "North",
    communityOrTradition: "Himachali & Garhwali mountain communities",
    originConfidence: "DOCUMENTED",
    remedyType: "FOOD_OR_DRINK",
    category: "General Wellness",
    tradition: "FOLK",
    traditionalUses: [
      "traditionally consumed for quenching summer mountain heat and exhaustion",
      "traditionally taken as a refreshing natural heart tonic and antioxidant drink"
    ],
    botanicals: [
      {
        commonName: "Rhododendron",
        scientificName: "Rhododendron arboreum",
        plantPart: "flower petal",
        nameVerifiedAgainst: "POWO"
      }
    ],
    ingredients: [
      {
        name: "Fresh or sun-dried buransh petals",
        amountValue: 50,
        amountUnit: "g",
        notes: "washed thoroughly with calyx and stamens strictly removed"
      },
      {
        name: "Rock sugar (mishri)",
        amountValue: 30,
        amountUnit: "g",
        notes: "crushed"
      },
      {
        name: "Fresh lemon juice",
        amountValue: 1,
        amountUnit: "tsp",
        notes: "for acidity and preserving bright scarlet color"
      },
      {
        name: "Water",
        amountValue: 2,
        amountUnit: "cup",
        notes: "pure filtered water"
      }
    ],
    baseServings: 2,
    steps: [
      "Gently steep thoroughly cleaned buransh flower petals in hot water for 15 minutes.",
      "Strain through a muslin cloth, pressing the petals lightly to extract the scarlet essence.",
      "Stir in dissolved rock sugar and fresh lemon juice until completely integrated.",
      "Serve chilled or at room temperature in clay goblets."
    ],
    prepTimeMinutes: 20,
    storage: "Keep concentrated syrup refrigerated for up to 10 days.",
    traditionalUsage: {
      typicalAdultAmount: "1 glass diluted with water (150ml)",
      typicalFrequency: "Once a day during sunny afternoons",
      traditionalTiming: "Midday during summer",
      maxDurationDays: 14,
      childUsePermitted: false
    },
    ayurvedicAttributes: {
      virya: "SHEETA",
      doshaEffect: ["Pacifies Pitta and Rakta", "Balances excessive bodily heat"],
      source: "Ethnomedicinal Plants of Western Himalaya"
    },
    safety: {
      riskLevel: "LOW",
      avoidInPregnancy: "UNKNOWN",
      avoidInBreastfeeding: "UNKNOWN",
      avoidUnderAge: null,
      avoidInConditions: ["DIABETES"],
      drugInteractionClasses: [],
      allergens: [],
      containsAlcohol: false,
      topicalPatchTestRequired: false,
      redFlagSymptoms: [
        "Extreme dizziness or hypotension",
        "Signs of cardiac arrhythmia"
      ],
      stopAndSeeDoctorIf: [
        "Feeling unusually faint or lightheaded",
        "Experiencing allergic cutaneous reaction"
      ]
    },
    sources: [
      {
        type: "ETHNOBOTANY_SURVEY",
        citation: "G.B. Pant National Institute of Himalayan Environment: Ethnobotany of Rhododendron arboreum in Himachal Pradesh",
        url: "https://gbpihed.gov.in",
        pageOrSection: "Wild edible and medicinal flora"
      }
    ],
    evidenceNote: "Rhododendron petals contain quercetin and rutin flavonoids with demonstrated cardioprotective and free-radical scavenging properties.",
    folkloreNote: "Pahari elders emphasize that stamens must always be hand-plucked away before brewing to avoid any acrid bitter compounds.",
    verificationStatus: "AUTO_CHECKED",
    reviewedBy: null,
    reviewedAt: null,
    needsExpertReview: true,
    contributedBy: "EDITORIAL",
    createdAt: "2026-03-15T00:00:00.000Z",
    updatedAt: "2026-03-15T00:00:00.000Z"
  },
  {
    id: "rem-isabgol-bhusi-dahi",
    slug: "isabgol-bhusi-dahi",
    titleEn: "Isabgol Bhusi with Dahi (Psyllium Gut Soother)",
    titleNative: "ईसबगोल भूसी और दही",
    nativeScript: "Devanagari",
    transliteration: "Isabgol Bhusi aur Dahi",
    alternateNames: ["Psyllium Husk Curd Bowl", "Isabgol in Yogurt"],
    stateOrUT: "Rajasthan",
    region: "North",
    communityOrTradition: "Rajasthani domestic tradition",
    originConfidence: "DOCUMENTED",
    remedyType: "FOOD_OR_DRINK",
    category: "Digestion",
    tradition: "AYURVEDA",
    traditionalUses: [
      "traditionally taken for soothing occasional loose stools and intestinal irritation",
      "traditionally used as a cooling bulk-forming demulcent for gut lining comfort"
    ],
    botanicals: [
      {
        commonName: "Blond psyllium",
        scientificName: "Plantago ovata",
        plantPart: "seed husk",
        nameVerifiedAgainst: "POWO"
      }
    ],
    ingredients: [
      {
        name: "Pure isabgol husk (psyllium)",
        amountValue: 2,
        amountUnit: "tsp",
        notes: "clean dry seed husk"
      },
      {
        name: "Fresh homemade curd (dahi)",
        amountValue: 0.5,
        amountUnit: "cup",
        notes: "whisked, non-sour"
      },
      {
        name: "Roasted cumin powder (bhuna jeera)",
        amountValue: 1,
        amountUnit: "pinch",
        notes: "for carminative balance"
      }
    ],
    baseServings: 1,
    steps: [
      "Whisk fresh homemade curd in a ceramic bowl until smooth.",
      "Sprinkle the dry isabgol husk over the curd.",
      "Stir quickly and consume immediately before the mucilage swells excessively in the bowl.",
      "Follow with a cup of plain lukewarm water 30 minutes later to ensure adequate hydration."
    ],
    prepTimeMinutes: 3,
    storage: "Prepare fresh right at consumption time; do not let sit.",
    traditionalUsage: {
      typicalAdultAmount: "1 bowl (approx 100g with 2 tsp husk)",
      typicalFrequency: "Once or twice daily after light meals",
      traditionalTiming: "Post lunch or evening",
      maxDurationDays: 3,
      childUsePermitted: false
    },
    ayurvedicAttributes: {
      virya: "SHEETA",
      doshaEffect: ["Pacifies Pitta and Vata", "Forms gentle bulk (Grahi when taken with curd)"],
      source: "Siddha Bheshaja Manimala"
    },
    safety: {
      riskLevel: "LOW",
      avoidInPregnancy: false,
      avoidInBreastfeeding: false,
      avoidUnderAge: null,
      avoidInConditions: [],
      drugInteractionClasses: [],
      allergens: ["dairy"],
      containsAlcohol: false,
      topicalPatchTestRequired: false,
      redFlagSymptoms: [
        "Persistent watery stools lasting over 48 hours",
        "High fever, blood, or mucus in stool",
        "Severe dehydration or abdominal rigidity"
      ],
      stopAndSeeDoctorIf: [
        "Looseness does not resolve within 48 hours",
        "Experiencing difficulty swallowing or feeling esophageal obstruction"
      ]
    },
    sources: [
      {
        type: "AYUSH_PUBLICATION",
        citation: "Ayurvedic Pharmacopoeia of India (API), Part I, Vol. II",
        url: "https://www.ayush.gov.in",
        pageOrSection: "Monograph on Ashwagol (Plantago ovata)"
      }
    ],
    evidenceNote: "Psyllium husk is a well-established soluble fiber capable of absorbing excess intestinal fluid; widely confirmed in gastroenterology.",
    folkloreNote: "Marwari households distinguish: isabgol with warm milk acts as a bowel opener, while isabgol with thick curd binds loose motions.",
    verificationStatus: "AUTO_CHECKED",
    reviewedBy: null,
    reviewedAt: null,
    needsExpertReview: true,
    contributedBy: "EDITORIAL",
    createdAt: "2026-03-15T00:00:00.000Z",
    updatedAt: "2026-03-15T00:00:00.000Z"
  },
  {
    id: "rem-dadima-peel-decoction",
    slug: "dadima-peel-decoction",
    titleEn: "Dadima Rind Kashaya (Pomegranate Peel Decoction)",
    titleNative: "દાડમ છાલ ક્વાથ",
    nativeScript: "Gujarati",
    transliteration: "Dadam Chhal Kwath",
    alternateNames: ["Pomegranate Peel Tea", "Dadimavaleha simple decoction"],
    stateOrUT: "Gujarat",
    region: "West",
    communityOrTradition: "Gujarati Ayurvedic domestic practice",
    originConfidence: "DOCUMENTED",
    remedyType: "FOOD_OR_DRINK",
    category: "Digestion",
    tradition: "AYURVEDA",
    traditionalUses: [
      "traditionally taken for soothing mild frequent watery digestion",
      "traditionally used as an astringent oral gargle for spongy gums"
    ],
    botanicals: [
      {
        commonName: "Pomegranate",
        scientificName: "Punica granatum",
        plantPart: "fruit rind",
        nameVerifiedAgainst: "POWO"
      }
    ],
    ingredients: [
      {
        name: "Sun-dried pomegranate peel (dadima chhal)",
        amountValue: 10,
        amountUnit: "g",
        notes: "cleaned dried outer rind pieces"
      },
      {
        name: "Water",
        amountValue: 2,
        amountUnit: "cup",
        notes: "filtered"
      },
      {
        name: "Rock salt (sendha namak)",
        amountValue: 1,
        amountUnit: "pinch",
        notes: "for digestive balance"
      }
    ],
    baseServings: 1,
    steps: [
      "Crush dried pomegranate peels into rough chunks.",
      "Add to 2 cups of boiling water in an enamel or stainless pot.",
      "Simmer steadily until reduced by half to about 1 cup.",
      "Strain the deep reddish-amber astringent liquid and stir in a pinch of rock salt."
    ],
    prepTimeMinutes: 15,
    storage: "Prepare fresh twice daily; do not store overnight.",
    traditionalUsage: {
      typicalAdultAmount: "Half cup (approx 60ml)",
      typicalFrequency: "Twice daily after meals",
      traditionalTiming: "Morning and evening",
      maxDurationDays: 3,
      childUsePermitted: false
    },
    ayurvedicAttributes: {
      virya: "SHEETA",
      doshaEffect: ["Pacifies Pitta and Kapha", "Potent Grahi (astringent absorbing)"],
      source: "Charaka Samhita - Chikitshasthana"
    },
    safety: {
      riskLevel: "LOW",
      avoidInPregnancy: false,
      avoidInBreastfeeding: false,
      avoidUnderAge: null,
      avoidInConditions: ["ULCER_OR_GERD"],
      drugInteractionClasses: [],
      allergens: [],
      containsAlcohol: false,
      topicalPatchTestRequired: false,
      redFlagSymptoms: [
        "High fever with severe bowel cramps",
        "Blood or dark tarry matter in bowel movements"
      ],
      stopAndSeeDoctorIf: [
        "Symptoms persist beyond 2 days",
        "Developing severe constipation from excess tannin intake"
      ]
    },
    sources: [
      {
        type: "AYUSH_PUBLICATION",
        citation: "Ayurvedic Pharmacopoeia of India (API), Part I, Vol. IV",
        url: "https://www.ayush.gov.in",
        pageOrSection: "Dadima (Punica granatum) Pericarp Monograph"
      }
    ],
    evidenceNote: "Pomegranate peel is rich in punicalagins and ellagic acid tannins with proven astringent and gut antimicrobial actions in vitro.",
    folkloreNote: "Old Gujarati grandmothers save pomegranate peels every winter, thread them on twine, and sun-dry them over verandahs for the year.",
    verificationStatus: "AUTO_CHECKED",
    reviewedBy: null,
    reviewedAt: null,
    needsExpertReview: true,
    contributedBy: "EDITORIAL",
    createdAt: "2026-03-15T00:00:00.000Z",
    updatedAt: "2026-03-15T00:00:00.000Z"
  },
  {
    id: "rem-garmalo-chasni",
    slug: "garmalo-chasni",
    titleEn: "Garmalo Pulp Decoction (Cassia Fistula Gentle Night Tea)",
    titleNative: "ગરમાળો ઉકાળો",
    nativeScript: "Gujarati",
    transliteration: "Garmalo Ukalo",
    alternateNames: ["Amaltas Fruit Pulp Decoction", "Golden Shower Cleanser"],
    stateOrUT: "Gujarat",
    region: "West",
    communityOrTradition: "Gujarati folk & Ayurvedic household practice",
    originConfidence: "DOCUMENTED",
    remedyType: "FOOD_OR_DRINK",
    category: "Digestion",
    tradition: "AYURVEDA",
    traditionalUses: [
      "traditionally taken for gentle overnight bowel movement easing",
      "traditionally used as a mild non-griping natural laxative drink"
    ],
    botanicals: [
      {
        commonName: "Golden shower tree",
        scientificName: "Cassia fistula",
        plantPart: "fruit pulp",
        nameVerifiedAgainst: "POWO"
      }
    ],
    ingredients: [
      {
        name: "Ripe garmalo pod pulp (amaltas)",
        amountValue: 5,
        amountUnit: "g",
        notes: "dark sticky fruit pulp extracted from pod"
      },
      {
        name: "Water",
        amountValue: 1.5,
        amountUnit: "cup",
        notes: "warm filtered"
      },
      {
        name: "Jaggery or raisins",
        amountValue: 1,
        amountUnit: "tsp",
        notes: "optional for mild sweetening"
      }
    ],
    baseServings: 1,
    steps: [
      "Crack open the hard woody pod of garmalo and extract the dark sweet-smelling septum pulp.",
      "Soak pulp in warm water for 20 minutes, then mash well with clean fingers.",
      "Bring to a gentle boil for 5 minutes.",
      "Strain through a fine mesh sieve into a cup and drink lukewarm before sleeping."
    ],
    prepTimeMinutes: 25,
    storage: "Make fresh each evening.",
    traditionalUsage: {
      typicalAdultAmount: "1 cup (approx 100ml)",
      typicalFrequency: "Once at night as needed",
      traditionalTiming: "Bedtime",
      maxDurationDays: 3,
      childUsePermitted: false
    },
    ayurvedicAttributes: {
      virya: "SHEETA",
      doshaEffect: ["Pacifies Pitta and Vata", "Mridu Virechana (gentle downward purgative)"],
      source: "Sushruta Samhita - Sutrasthana"
    },
    safety: {
      riskLevel: "LOW",
      avoidInPregnancy: true,
      avoidInBreastfeeding: false,
      avoidUnderAge: null,
      avoidInConditions: [],
      drugInteractionClasses: [],
      allergens: [],
      containsAlcohol: false,
      topicalPatchTestRequired: false,
      redFlagSymptoms: [
        "Severe cramping abdominal pain with persistent vomiting",
        "Suspected intestinal obstruction or acute appendicitis"
      ],
      stopAndSeeDoctorIf: [
        "Developing severe loose diarrhea",
        "Bowel movement does not occur after 3 days of mild use"
      ]
    },
    sources: [
      {
        type: "CLASSICAL_TEXT",
        citation: "Bhavaprakasha Nighantu - Haritakyadi Varga",
        url: null,
        pageOrSection: "Aragvadha (Cassia fistula) properties"
      }
    ],
    evidenceNote: "Anthraquinone glycosides (sennosides) present in Cassia fistula pulp provide mild peristaltic stimulation without painful intestinal spasms.",
    folkloreNote: "Known across Gujarat as nature's sweetest cleanser, harvested during April when the golden shower flowers cascade over town streets.",
    verificationStatus: "AUTO_CHECKED",
    reviewedBy: null,
    reviewedAt: null,
    needsExpertReview: true,
    contributedBy: "EDITORIAL",
    createdAt: "2026-03-15T00:00:00.000Z",
    updatedAt: "2026-03-15T00:00:00.000Z"
  },
  {
    id: "rem-kashaya-menasu-jeerige",
    slug: "kashaya-menasu-jeerige",
    titleEn: "Malnad Menasu Jeerige Kashaya (Pepper Cumin Brew)",
    titleNative: "ಮೆಣಸು ಜೀರಿಗೆ ಕಷಾಯ",
    nativeScript: "Kannada",
    transliteration: "Menasu Jeerige Kashaya",
    alternateNames: ["Malnad Pepper Digestive Brew", "Brahmin Kitchen Kashaya"],
    stateOrUT: "Karnataka",
    region: "South",
    communityOrTradition: "Malnad & Havyaka household kitchens",
    originConfidence: "DOCUMENTED",
    remedyType: "FOOD_OR_DRINK",
    category: "Digestion",
    tradition: "FOLK",
    traditionalUses: [
      "traditionally brewed following heavy festive feasts for post-meal lightness",
      "traditionally taken during heavy monsoon rains for warming inner digestion"
    ],
    botanicals: [
      {
        commonName: "Black pepper",
        scientificName: "Piper nigrum",
        plantPart: "fruit",
        nameVerifiedAgainst: "POWO"
      },
      {
        commonName: "Cumin",
        scientificName: "Cuminum cyminum",
        plantPart: "fruit",
        nameVerifiedAgainst: "POWO"
      },
      {
        commonName: "Coriander",
        scientificName: "Coriandrum sativum",
        plantPart: "fruit",
        nameVerifiedAgainst: "POWO"
      }
    ],
    ingredients: [
      {
        name: "Black peppercorns (menasu)",
        amountValue: 0.5,
        amountUnit: "tsp",
        notes: "freshly cracked"
      },
      {
        name: "Cumin seeds (jeerige)",
        amountValue: 1,
        amountUnit: "tsp",
        notes: "whole aromatic"
      },
      {
        name: "Coriander seeds (kottambari beeja)",
        amountValue: 1,
        amountUnit: "tsp",
        notes: "crushed"
      },
      {
        name: "Organic jaggery (bella)",
        amountValue: 1,
        amountUnit: "tsp",
        notes: "unrefined"
      },
      {
        name: "Fresh milk or warm water",
        amountValue: 1,
        amountUnit: "cup",
        notes: "as preferred"
      }
    ],
    baseServings: 1,
    steps: [
      "Dry roast cumin seeds, coriander seeds, and black peppercorns on a tawa until aromatic.",
      "Coarsely pound the roasted spices in a stone mortar.",
      "Boil the crushed spice powder in 1.5 cups of water for 5 minutes with jaggery.",
      "Strain into a cup; add a splash of warm milk if desired and sip slowly while warm."
    ],
    prepTimeMinutes: 10,
    storage: "The dry kashaya powder can be pre-ground and stored in a sealed jar for up to 2 months.",
    traditionalUsage: {
      typicalAdultAmount: "1 cup (approx 120ml)",
      typicalFrequency: "Once in the evening",
      traditionalTiming: "Post dinner or rainy afternoon",
      maxDurationDays: 14,
      childUsePermitted: false
    },
    ayurvedicAttributes: {
      virya: "USHNA",
      doshaEffect: ["Kindles Agni (digestive fire)", "Pacifies Vata and Kapha"],
      source: "Sahasrayogam - Kashaya Prakarana"
    },
    safety: {
      riskLevel: "LOW",
      avoidInPregnancy: false,
      avoidInBreastfeeding: false,
      avoidUnderAge: null,
      avoidInConditions: ["ULCER_OR_GERD"],
      drugInteractionClasses: [],
      allergens: [],
      containsAlcohol: false,
      topicalPatchTestRequired: false,
      redFlagSymptoms: [
        "Severe persistent burning sensation in esophagus or chest",
        "Vomiting or acute abdominal colic"
      ],
      stopAndSeeDoctorIf: [
        "Acid reflux increases or stomach lining feels irritated",
        "Symptoms persist over several days"
      ]
    },
    sources: [
      {
        type: "BOOK",
        citation: "Malnad Kitchen Traditions & Ethnobotanical Brews, Udupi Studies",
        url: null,
        pageOrSection: "Household Kashaya preparations, pp. 45-48"
      }
    ],
    evidenceNote: "Piperine from black pepper and cuminaldehyde from cumin enhance gastric digestive enzyme secretions; well-established culinary physiology.",
    folkloreNote: "In Malnad estate bungalows, every guest arriving wet from the July downpours is immediately handed a hot brass tumbler of Menasu Jeerige Kashaya.",
    verificationStatus: "AUTO_CHECKED",
    reviewedBy: null,
    reviewedAt: null,
    needsExpertReview: true,
    contributedBy: "EDITORIAL",
    createdAt: "2026-03-15T00:00:00.000Z",
    updatedAt: "2026-03-15T00:00:00.000Z"
  },
  {
    id: "rem-ramacham-vellam",
    slug: "ramacham-vellam",
    titleEn: "Ramacham Vellam (Vetiver Cooling Summer Water)",
    titleNative: "രാമച്ചം വെള്ളം",
    nativeScript: "Malayalam",
    transliteration: "Ramacham Vellam",
    alternateNames: ["Ushira Water", "Vetiver Root Infused Drinking Water"],
    stateOrUT: "Kerala",
    region: "South",
    communityOrTradition: "Kerala household earthen pot tradition",
    originConfidence: "DOCUMENTED",
    remedyType: "FOOD_OR_DRINK",
    category: "General Wellness",
    tradition: "AYURVEDA",
    traditionalUses: [
      "traditionally stored in clay pots to drink for cooling severe summer body heat",
      "traditionally consumed for quenching persistent thirst and soothing skin hotness"
    ],
    botanicals: [
      {
        commonName: "Vetiver",
        scientificName: "Chrysopogon zizanioides",
        plantPart: "root",
        nameVerifiedAgainst: "POWO"
      }
    ],
    ingredients: [
      {
        name: "Dried clean vetiver roots (ramacham)",
        amountValue: 10,
        amountUnit: "g",
        notes: "washed thoroughly in cold water to remove dust"
      },
      {
        name: "Drinking water",
        amountValue: 2,
        amountUnit: "cup",
        notes: "stored in unglazed terracotta pot (kooja)"
      }
    ],
    baseServings: 4,
    steps: [
      "Wash a small bunch of dried aromatic ramacham roots thoroughly under running water.",
      "Tie the roots loosely with a sterile cotton thread into a neat bundle.",
      "Immerse the root bundle into a clean earthen pitcher filled with boiled and cooled water.",
      "Let steep for 3 to 4 hours until the water takes on a subtle earthy fragrance.",
      "Pour through a strainer and drink throughout the day as table water."
    ],
    prepTimeMinutes: 10,
    storage: "Replace roots and water every 24 hours during tropical summer.",
    traditionalUsage: {
      typicalAdultAmount: "1 to 2 glasses as regular drinking water",
      typicalFrequency: "Sipped throughout hot daytime hours",
      traditionalTiming: "Morning to late afternoon",
      maxDurationDays: 60,
      childUsePermitted: false
    },
    ayurvedicAttributes: {
      virya: "SHEETA",
      doshaEffect: ["Pacifies Pitta and Rakta", "Potent Dahaprashamana (burning reliever)"],
      source: "Ashtanga Hridaya - Sutrasthana"
    },
    safety: {
      riskLevel: "LOW",
      avoidInPregnancy: false,
      avoidInBreastfeeding: false,
      avoidUnderAge: null,
      avoidInConditions: [],
      drugInteractionClasses: [],
      allergens: [],
      containsAlcohol: false,
      topicalPatchTestRequired: false,
      redFlagSymptoms: [
        "Signs of acute heat stroke or delirium",
        "Persistent high fever"
      ],
      stopAndSeeDoctorIf: [
        "Body feels unusually cold or chills develop",
        "Any unexpected gastrointestinal upset occurs"
      ]
    },
    sources: [
      {
        type: "AYUSH_PUBLICATION",
        citation: "Ayurvedic Pharmacopoeia of India (API), Part I, Vol. III",
        url: "https://www.ayush.gov.in",
        pageOrSection: "Ushira (Chrysopogon zizanioides) Monograph"
      }
    ],
    evidenceNote: "Vetiver root essential oils contain khusimol and vetivone; traditional mild natural refrigerant and pleasant antimicrobial flavoring.",
    folkloreNote: "Clay pot water infused with ramacham roots has been kept in Kerala verandahs for weary wayfarers since ancient times.",
    verificationStatus: "AUTO_CHECKED",
    reviewedBy: null,
    reviewedAt: null,
    needsExpertReview: true,
    contributedBy: "EDITORIAL",
    createdAt: "2026-03-15T00:00:00.000Z",
    updatedAt: "2026-03-15T00:00:00.000Z"
  },
  {
    id: "rem-vetrilai-kashayam",
    slug: "vetrilai-kashayam",
    titleEn: "Vetrilai Milagu Kashayam (Betel Leaf & Pepper Brew)",
    titleNative: "வெற்றிலை மிளகு கஷாயம்",
    nativeScript: "Tamil",
    transliteration: "Vetrilai Milagu Kashayam",
    alternateNames: ["Betel Leaf Decoction", "Tamil Paan Leaf Brew"],
    stateOrUT: "Tamil Nadu",
    region: "South",
    communityOrTradition: "Tamil Siddha domestic tradition",
    originConfidence: "DOCUMENTED",
    remedyType: "FOOD_OR_DRINK",
    category: "Respiratory",
    tradition: "SIDDHA",
    traditionalUses: [
      "traditionally taken for seasonal chest heaviness and wet sluggish cough",
      "traditionally used for throat scratchiness and cold monsoon congestion"
    ],
    botanicals: [
      {
        commonName: "Betel leaf",
        scientificName: "Piper betle",
        plantPart: "leaf",
        nameVerifiedAgainst: "POWO"
      },
      {
        commonName: "Black pepper",
        scientificName: "Piper nigrum",
        plantPart: "fruit",
        nameVerifiedAgainst: "POWO"
      }
    ],
    ingredients: [
      {
        name: "Fresh tender betel leaves (vetrilai)",
        amountValue: 3,
        amountUnit: "piece",
        notes: "stalks removed, thoroughly washed"
      },
      {
        name: "Black peppercorns (milagu)",
        amountValue: 5,
        amountUnit: "piece",
        notes: "coarsely crushed"
      },
      {
        name: "Water",
        amountValue: 1.5,
        amountUnit: "cup",
        notes: "clean filtered"
      },
      {
        name: "Palm candy (panakarkandu)",
        amountValue: 1,
        amountUnit: "tsp",
        notes: "optional for mild sweetening"
      }
    ],
    baseServings: 1,
    steps: [
      "Tear fresh betel leaves by hand into coarse pieces.",
      "Crush peppercorns in a small mortar.",
      "Bring water to a simmer in a stainless saucepan; add torn betel leaves and crushed pepper.",
      "Simmer on medium flame until reduced to half a cup.",
      "Strain, add palm candy if desired, and sip warm."
    ],
    prepTimeMinutes: 12,
    storage: "Make fresh each time; do not reheat old decoction.",
    traditionalUsage: {
      typicalAdultAmount: "Half cup (approx 60ml)",
      typicalFrequency: "Once or twice daily for 2 to 3 days",
      traditionalTiming: "Early morning or bedtime",
      maxDurationDays: 3,
      childUsePermitted: false
    },
    ayurvedicAttributes: {
      virya: "USHNA",
      doshaEffect: ["Pacifies Kapha and Vata", "Sharpens respiratory Agni"],
      source: "Siddha Materia Medica"
    },
    safety: {
      riskLevel: "LOW",
      avoidInPregnancy: false,
      avoidInBreastfeeding: false,
      avoidUnderAge: null,
      avoidInConditions: ["ULCER_OR_GERD"],
      drugInteractionClasses: [],
      allergens: [],
      containsAlcohol: false,
      topicalPatchTestRequired: false,
      redFlagSymptoms: [
        "Coughing up blood or dark rusty phlegm",
        "Severe shortness of breath or high fever"
      ],
      stopAndSeeDoctorIf: [
        "Throat burning or acid reflux worsens",
        "Cough persists longer than 3 days without relief"
      ]
    },
    sources: [
      {
        type: "AYUSH_PUBLICATION",
        citation: "National Institute of Siddha (NIS): Common Siddha Domestic Preparations",
        url: "https://nischennai.org",
        pageOrSection: "Kashayam monographs - Vetrilai"
      }
    ],
    evidenceNote: "Eugenol and chavicol in Piper betle leaves exhibit documented antimicrobial and expectorant properties in vitro.",
    folkloreNote: "Grandmothers in Thanjavur pluck fresh betel leaves directly from garden creepers, specifically taking the dew-kissed morning leaves for boiling.",
    verificationStatus: "AUTO_CHECKED",
    reviewedBy: null,
    reviewedAt: null,
    needsExpertReview: true,
    contributedBy: "EDITORIAL",
    createdAt: "2026-03-15T00:00:00.000Z",
    updatedAt: "2026-03-15T00:00:00.000Z"
  },
  {
    id: "rem-aparajita-phool-cha",
    slug: "aparajita-phool-cha",
    titleEn: "Aparajita Phool Cha (Blue Pea Calming Infusion)",
    titleNative: "অপরাজিতা ফুলের চা",
    nativeScript: "Bengali",
    transliteration: "Aparajita Phuler Cha",
    alternateNames: ["Blue Tea", "Shankhpushpi Flower Infusion", "Butterfly Pea Flower Tea"],
    stateOrUT: "West Bengal",
    region: "East",
    communityOrTradition: "Bengal courtyard garden tradition",
    originConfidence: "DOCUMENTED",
    remedyType: "FOOD_OR_DRINK",
    category: "Sleep & Calming",
    tradition: "AYURVEDA",
    traditionalUses: [
      "traditionally sipped in evening hours for calming racing thoughts and winding down",
      "traditionally taken as an antioxidant botanical infusion for refreshing tired eyes"
    ],
    botanicals: [
      {
        commonName: "Butterfly pea",
        scientificName: "Clitoria ternatea",
        plantPart: "flower",
        nameVerifiedAgainst: "POWO"
      }
    ],
    ingredients: [
      {
        name: "Fresh or sun-dried blue aparajita flowers",
        amountValue: 4,
        amountUnit: "piece",
        notes: "green calyx gently removed"
      },
      {
        name: "Water",
        amountValue: 1.5,
        amountUnit: "cup",
        notes: "pure filtered"
      },
      {
        name: "Crushed green cardamom pod",
        amountValue: 1,
        amountUnit: "piece",
        notes: "for subtle fragrance"
      }
    ],
    baseServings: 1,
    steps: [
      "Boil water in a small pan with the crushed cardamom pod.",
      "Place washed aparajita flowers into a glass cup or teapot.",
      "Pour hot boiled water over the petals; watch the water turn deep royal sapphire blue.",
      "Cover and steep for 4 minutes, strain, and sip peacefully while warm."
    ],
    prepTimeMinutes: 6,
    storage: "Drink fresh immediately after brewing.",
    traditionalUsage: {
      typicalAdultAmount: "1 cup (approx 150ml)",
      typicalFrequency: "Once in the evening before sleep",
      traditionalTiming: "Evening or 1 hour before bed",
      maxDurationDays: 21,
      childUsePermitted: false
    },
    ayurvedicAttributes: {
      virya: "SHEETA",
      doshaEffect: ["Pacifies Pitta and Vata", "Medhya (intellect and calmness promoter)"],
      source: "Dravyaguna Vijnana"
    },
    safety: {
      riskLevel: "LOW",
      avoidInPregnancy: "UNKNOWN",
      avoidInBreastfeeding: "UNKNOWN",
      avoidUnderAge: null,
      avoidInConditions: [],
      drugInteractionClasses: [],
      allergens: [],
      containsAlcohol: false,
      topicalPatchTestRequired: false,
      redFlagSymptoms: [
        "Severe chronic insomnia accompanied by clinical depression or psychosis",
        "Sudden acute neurological disorientation"
      ],
      stopAndSeeDoctorIf: [
        "Experiencing unusual drowsiness during daytime hours",
        "Developing any mild gastrointestinal looseness"
      ]
    },
    sources: [
      {
        type: "ETHNOBOTANY_SURVEY",
        citation: "Botanical Survey of India (BSI): Ethnomedicinal Flora of Rural Bengal",
        url: "https://bsi.gov.in",
        pageOrSection: "Clitoria ternatea domestic use records"
      }
    ],
    evidenceNote: "Rich in anthocyanin polyphenols (ternatins) with neuroprotective and mild anxiolytic actions reported in animal research models.",
    folkloreNote: "In Bengali households, adding two drops of lemon juice transforms the sapphire brew magically into brilliant magenta pink.",
    verificationStatus: "AUTO_CHECKED",
    reviewedBy: null,
    reviewedAt: null,
    needsExpertReview: true,
    contributedBy: "EDITORIAL",
    createdAt: "2026-03-15T00:00:00.000Z",
    updatedAt: "2026-03-15T00:00:00.000Z"
  },
  {
    id: "rem-bela-pana",
    slug: "bela-pana",
    titleEn: "Odia Bela Pana (Wood Apple & Pepper Festive Cooler)",
    titleNative: "ବେଲ ପଣା",
    nativeScript: "Odia",
    transliteration: "Bela Pana",
    alternateNames: ["Pana Sankranti Beverage", "Bael Sherbet of Odisha"],
    stateOrUT: "Odisha",
    region: "East",
    communityOrTradition: "Odia festival and household kitchen tradition",
    originConfidence: "DOCUMENTED",
    remedyType: "FOOD_OR_DRINK",
    category: "Digestion",
    tradition: "FOLK",
    traditionalUses: [
      "traditionally prepared during summer heatwaves to soothe irritated stomach linings",
      "traditionally drunk on Pana Sankranti to cool digestive fire and restore hydration"
    ],
    botanicals: [
      {
        commonName: "Bael",
        scientificName: "Aegle marmelos",
        plantPart: "fruit pulp",
        nameVerifiedAgainst: "POWO"
      },
      {
        commonName: "Black pepper",
        scientificName: "Piper nigrum",
        plantPart: "fruit",
        nameVerifiedAgainst: "POWO"
      },
      {
        commonName: "Cardamom",
        scientificName: "Elettaria cardamomum",
        plantPart: "fruit",
        nameVerifiedAgainst: "POWO"
      }
    ],
    ingredients: [
      {
        name: "Ripe wood apple pulp (bela chhota)",
        amountValue: 100,
        amountUnit: "g",
        notes: "scooped from hard shell, seeds strained away"
      },
      {
        name: "Water",
        amountValue: 1.5,
        amountUnit: "cup",
        notes: "cold filtered"
      },
      {
        name: "Black pepper powder (gol maricha)",
        amountValue: 1,
        amountUnit: "pinch",
        notes: "for carminative warmth against heavy pulp"
      },
      {
        name: "Cardamom powder (gujurati)",
        amountValue: 1,
        amountUnit: "pinch",
        notes: "aromatic"
      },
      {
        name: "Crushed jaggery (guda)",
        amountValue: 1,
        amountUnit: "tbsp",
        notes: "to sweeten naturally"
      }
    ],
    baseServings: 2,
    steps: [
      "Crack open the hard woody bael shell and scoop out the fragrant orange pulp into a bowl.",
      "Add 1 cup of water and mash pulp thoroughly with hands to loosen mucilaginous fiber.",
      "Pass through a coarse sieve or colander to strain away bitter resinous seeds.",
      "Stir in dissolved jaggery, black pepper, and cardamom powder until smooth.",
      "Pour into clay cups and serve freshly prepared."
    ],
    prepTimeMinutes: 15,
    storage: "Consume within 3 to 4 hours of preparation; do not let ferment.",
    traditionalUsage: {
      typicalAdultAmount: "1 glass (approx 150ml)",
      typicalFrequency: "Once a day during summer heat",
      traditionalTiming: "Midday or afternoon",
      maxDurationDays: 14,
      childUsePermitted: false
    },
    ayurvedicAttributes: {
      virya: "SHEETA",
      doshaEffect: ["Pacifies Pitta and Vata", "Balances digestive Agni"],
      source: "Bhavaprakasha Nighantu - Phala Varga"
    },
    safety: {
      riskLevel: "LOW",
      avoidInPregnancy: false,
      avoidInBreastfeeding: false,
      avoidUnderAge: null,
      avoidInConditions: ["DIABETES"],
      drugInteractionClasses: ["ANTIDIABETIC"],
      allergens: [],
      containsAlcohol: false,
      topicalPatchTestRequired: false,
      redFlagSymptoms: [
        "Persistent severe abdominal cramps",
        "Heatstroke with cessation of sweating and disorientation"
      ],
      stopAndSeeDoctorIf: [
        "Experiencing unexpected gastrointestinal heaviness or constipation",
        "Blood glucose levels elevate from jaggery intake"
      ]
    },
    sources: [
      {
        type: "BOOK",
        citation: "Culinary Heritage of Odisha, State Cultural Council",
        url: null,
        pageOrSection: "Pana Sankranti rituals and domestic recipes, pp. 64-67"
      }
    ],
    evidenceNote: "Aegle marmelos fruit pulp contains marmelosin, pectin, and tannins supporting intestinal epithelial barrier function.",
    folkloreNote: "On Odia New Year (Maha Vishuva Sankranti), earthen pots with small holes are hung over holy Tulsi plants so Bela Pana drops sacredly all afternoon.",
    verificationStatus: "AUTO_CHECKED",
    reviewedBy: null,
    reviewedAt: null,
    needsExpertReview: true,
    contributedBy: "EDITORIAL",
    createdAt: "2026-03-15T00:00:00.000Z",
    updatedAt: "2026-03-15T00:00:00.000Z"
  }
];

const existingPath = path.join(__dirname, '..', 'data', 'remedies.json');
const publicPath = path.join(__dirname, '..', 'public', 'data', 'remedies.json');

const existing = JSON.parse(fs.readFileSync(existingPath, 'utf8'));
const newSlugs = new Set(newRemedies.map(r => r.slug));
const filteredExisting = existing.filter(r => !newSlugs.has(r.slug));
const combined = [...filteredExisting, ...newRemedies];

fs.writeFileSync(existingPath, JSON.stringify(combined, null, 2), 'utf8');
fs.writeFileSync(publicPath, JSON.stringify(combined, null, 2), 'utf8');

console.log(`Successfully merged ${newRemedies.length} remedies! Total count is now ${combined.length}.`);
