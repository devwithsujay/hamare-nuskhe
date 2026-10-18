/**
 * Comprehensive Translation Dictionary for Hamare Nuskhe
 * Supports English (en), Hindi (hi), and authentic Indic regional scripts.
 */

export type SupportedLang = "en" | "hi" | "kn" | "ta" | "pa" | "mr" | "gu" | "bn";

export interface TranslationDict {
  // Header & Brand
  brandName: string;
  brandSubtitle: string;
  ethnobotanicalSubtitle: string;
  motto: string;
  navArchive: string;
  navStates: string;
  navPlants: string;
  navSaved: string;
  navContribute: string;
  navAbout: string;
  textSizeSmall: string;
  textSizeMedium: string;
  textSizeLarge: string;

  // Search & Explorer
  searchPlaceholder: string;
  concernsTitle: string;
  filterState: string;
  allStates: string;
  filterRegion: string;
  allRegions: string;
  filterCategory: string;
  allCategories: string;
  filterType: string;
  allTypes: string;
  filterPrepTime: string;
  anyTime: string;
  under10Min: string;
  under20Min: string;
  under30Min: string;
  filterReviewedOnly: string;
  filteredBy: string;
  showingResults: string;
  resetFilters: string;
  exportDrawer: string;
  viewIndexList: string;
  viewCards: string;
  noResultsTitle: string;
  noResultsDesc: string;
  clearFiltersBtn: string;
  readFolioBtn: string;
  reviewedBadge: string;
  unreviewedBadge: string;

  // Concerns Chips
  concernCough: string;
  concernAcidity: string;
  concernThroat: string;
  concernBloating: string;
  concernDigestion: string;
  concernPostpartum: string;
  concernChills: string;

  // Heritage Guide
  heritageTitle: string;
  shlokaCaption: string;
  tabDoshas: string;
  tabKitchenHerbs: string;
  tabElementsSeasons: string;

  // Categories
  catRespiratory: string;
  catDigestion: string;
  catImmunity: string;
  catJointMuscle: string;
  catSkinHair: string;
  catPostpartum: string;
  catSleepCalming: string;
  catOralThroat: string;
  catGeneralWellness: string;

  // Hero Intro
  heroBadge: string;
  heroSubbadge: string;
  heroTitle: string;
  heroDesc: string;
  heroFoliosStat: string;
  heroStatesStat: string;
  heroNoticeTitle: string;

  // Footer
  footerPrayer: string;
  footerPrayerMeaning: string;
  footerArchiveDesc: string;
  footerDisclaimerTitle: string;
  footerDisclaimerBody: string;
  footerRights: string;
}

export const TRANSLATIONS: Record<SupportedLang, TranslationDict> = {
  en: {
    brandName: "हमारे नुस्खे / Hamare Nuskhe",
    brandSubtitle: "Home remedies from across India",
    ethnobotanicalSubtitle: "Ethnobotanical Heritage & Domestic Remedies Archive",
    motto: "आयुर्वेदोऽमृतानाम् • Ayurveda is the science of immortality",
    navArchive: "Archive",
    navStates: "States",
    navPlants: "Plants",
    navSaved: "Saved",
    navContribute: "Contribute",
    navAbout: "About & Safety",
    textSizeSmall: "A−",
    textSizeMedium: "A",
    textSizeLarge: "A+",

    searchPlaceholder: "Search remedies by name, herb, botanical binomial, or ailment...",
    concernsTitle: "Traditional Uses & Concerns:",
    filterState: "State / UT",
    allStates: "All 36 States/UTs",
    filterRegion: "Region",
    allRegions: "All Regions",
    filterCategory: "Category",
    allCategories: "All Categories",
    filterType: "Preparation Type",
    allTypes: "All Types",
    filterPrepTime: "Max Preparation Time",
    anyTime: "Any time",
    under10Min: "Under 10 mins",
    under20Min: "Under 20 mins",
    under30Min: "Under 30 mins",
    filterReviewedOnly: "Reviewed only",
    filteredBy: "Filtered by",
    showingResults: "Showing {count} of {total} documented remedies",
    resetFilters: "Reset filters",
    exportDrawer: "Export",
    viewIndexList: "Index list view",
    viewCards: "Cards view",
    noResultsTitle: "Nothing under that name or filter yet.",
    noResultsDesc: "Try searching by botanical common name (such as Ginger, Tulsi, or Cumin), a specific state, or a spelling in Hindi or regional script.",
    clearFiltersBtn: "Clear filters and view all remedies",
    readFolioBtn: "Read folio",
    reviewedBadge: "Expert Reviewed",
    unreviewedBadge: "Unreviewed Archive Entry",

    concernCough: "Cough & Cold (कफ-वात)",
    concernAcidity: "Acidity & Heat (पित्त शामक)",
    concernThroat: "Sore Throat (कण्ठ्य)",
    concernBloating: "Gas & Bloating (वात अनुलोमन)",
    concernDigestion: "Digestion Comfort (दीपन-पाचन)",
    concernPostpartum: "Postpartum Care (सूतिका परिचर्या)",
    concernChills: "Seasonal Chills (ऋतु संधि)",

    heritageTitle: "Traditional Ayurvedic Heritage & Philosophy",
    shlokaCaption: "The Fundamental Objective of Ayurveda — Charaka Samhita, Sutrasthana 30.26",
    tabDoshas: "त्रिदोष दर्शन (The 3 Doshas)",
    tabKitchenHerbs: "मसाला दानी (7 Sacred Kitchen Herbs)",
    tabElementsSeasons: "पंचमहाभूत एवं ऋतुचर्या (Elements & Seasons)",

    catRespiratory: "Respiratory",
    catDigestion: "Digestion",
    catImmunity: "Immunity & Seasonal",
    catJointMuscle: "Joint & Muscle",
    catSkinHair: "Skin & Hair",
    catPostpartum: "Postpartum & Women",
    catSleepCalming: "Sleep & Calming",
    catOralThroat: "Oral & Throat",
    catGeneralWellness: "General Wellness",

    heroBadge: "पारम्परिक ज्ञान कोश • CULTURAL HERITAGE REGISTRY",
    heroSubbadge: "Rooted in 5,000 Years of Indian Ethnobotany",
    heroTitle: "Traditional Remedies from Indian Households",
    heroDesc: "An open cultural archive documenting domestic remedies (nuskhe) passed down through generations across India's 36 States and Union Territories. Sourced from grandmother lore, state ethnobotanical surveys, and classical literature (Charaka, Sushruta, and AYUSH pharmacopoeias), each recipe preserves native plant identities alongside rigorous deterministic safety guidelines.",
    heroFoliosStat: "Documented Folios",
    heroStatesStat: "36 States & UTs",
    heroNoticeTitle: "Cultural Archival Notice:",

    footerPrayer: "॥ सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः । सर्वे भद्राणि पश्यन्तु मा कश्चिद्दुःखभाग्भवेत् ॥",
    footerPrayerMeaning: "May all beings be happy. May all beings be free from illness. May all see what is auspicious. May no one suffer.",
    footerArchiveDesc: "An open cultural-memory ethnobotanical archive dedicated to recording traditional domestic remedies from every household across India's 28 states and 8 Union Territories.",
    footerDisclaimerTitle: "Archival & Safety Notice",
    footerDisclaimerBody: "This is a traditional practice recorded for cultural archiving. It is not medical advice. Consult a qualified doctor before use, especially if you are pregnant, breastfeeding, elderly, have a medical condition, or take any medicine. Never use for infants.",
    footerRights: "हमारे नुस्खे (Hamare Nuskhe) • Public Cultural Heritage Archive"
  },

  hi: {
    brandName: "हमारे नुस्खे",
    brandSubtitle: "भारत के कोने-कोने से पारम्परिक घरेलू उपचार",
    ethnobotanicalSubtitle: "लोक वानस्पतिक धरोहर एवं पारम्परिक घरेलू चिकित्सा अभिलेखागार",
    motto: "आयुर्वेदोऽमृतानाम् • आयुर्वेद अमृत्व का विज्ञान है",
    navArchive: "संग्रह",
    navStates: "राज्य व क्षेत्र",
    navPlants: "पादप निर्देशिका",
    navSaved: "सहेजे गए नुस्खे",
    navContribute: "नुस्खा जोड़ें",
    navAbout: "सुरक्षा व परिचय",
    textSizeSmall: "अ−",
    textSizeMedium: "अ",
    textSizeLarge: "अ+",

    searchPlaceholder: "नाम, जड़ी-बूटी, वानस्पतिक नाम या लक्षण द्वारा नुस्खे खोजें...",
    concernsTitle: "पारम्परिक घरेलू उपयोग व स्वास्थ्य चिंताएं:",
    filterState: "राज्य / संघ राज्य",
    allStates: "सभी ३६ राज्य व संघ क्षेत्र",
    filterRegion: "भौगोलिक क्षेत्र",
    allRegions: "सभी क्षेत्र",
    filterCategory: "रोग श्रेणी",
    allCategories: "सभी श्रेणियां",
    filterType: "निर्माण विधि",
    allTypes: "सभी प्रकार",
    filterPrepTime: "अधिकतम तैयारी समय",
    anyTime: "कोई भी समय",
    under10Min: "१० मिनट से कम",
    under20Min: "२० मिनट से कम",
    under30Min: "३० मिनट से कम",
    filterReviewedOnly: "केवल विशेषज्ञ द्वारा समीक्षित",
    filteredBy: "चयनित राज्य:",
    showingResults: "कुल {total} में से {count} प्रलेखित नुस्खे प्रदर्शित",
    resetFilters: "फ़िल्टर हटाएं",
    exportDrawer: "निर्यात करें",
    viewIndexList: "सूचीबद्ध सूची",
    viewCards: "कार्ड दृश्य",
    noResultsTitle: "इस नाम या फ़िल्टर के अंतर्गत कोई नुस्खा नहीं मिला।",
    noResultsDesc: "कृपया वानस्पतिक सामान्य नाम (जैसे अदरक, तुलसी, या जीरा), किसी विशेष राज्य, या देवनागरी में खोजें।",
    clearFiltersBtn: "सभी फ़िल्टर हटाएं और सम्पूर्ण संग्रह देखें",
    readFolioBtn: "नुस्खा पढ़ें",
    reviewedBadge: "विशेषज्ञ समीक्षित",
    unreviewedBadge: "अभिलेखीय प्रविष्टि (समीक्षा प्रतीक्षित)",

    concernCough: "खांसी व जुकाम (कफ-वात)",
    concernAcidity: "अम्लपित्त व जलन (पित्त शामक)",
    concernThroat: "गले की खराश (कण्ठ्य)",
    concernBloating: "पेट की गैस व अफारा (वात अनुलोमन)",
    concernDigestion: "पाचन व अग्नि दीपन (दीपन-पाचन)",
    concernPostpartum: "सूतिका परिचर्या (प्रसूति उपरांत)",
    concernChills: "मौसमी सर्दी व कंपकंपी (ऋतु संधि)",

    heritageTitle: "आयुर्वेदिक सांस्कृतिक धरोहर एवं सिद्धान्त",
    shlokaCaption: "आयुर्वेद का मौलिक प्रयोजन — चरक संहिता, सूत्रस्थान ३०.२६",
    tabDoshas: "त्रिदोष दर्शन (वात, पित्त, कफ)",
    tabKitchenHerbs: "मसाला दानी (७ दिव्य पाक जड़ी-बूटियां)",
    tabElementsSeasons: "पंचमहाभूत एवं ऋतुचर्या (ऋतु परिवर्तन)",

    catRespiratory: "श्वसन संस्थान (खांसी-जुकाम)",
    catDigestion: "पाचन संस्थान (उदर स्वास्थ्य)",
    catImmunity: "प्रतिरोधक क्षमता व मौसमी",
    catJointMuscle: "संधि व मांसपेशी (जोड़ों का दर्द)",
    catSkinHair: "त्वचा एवं केश स्वास्थ्य",
    catPostpartum: "सूतिका व मातृ स्वास्थ्य",
    catSleepCalming: "निद्रा व मानसिक शांति",
    catOralThroat: "मुख एवं कण्ठ रोग",
    catGeneralWellness: "सामान्य स्वास्थ्य संवर्धन",

    heroBadge: "पारम्परिक ज्ञान कोश • सांस्कृतिक धरोहर अभिलेखागार",
    heroSubbadge: "५००० वर्ष पुरानी भारतीय वनौषधि एवं आयुर्वेद परम्परा",
    heroTitle: "भारतीय परिवारों के पारम्परिक घरेलू उपचार व नुस्खे",
    heroDesc: "भारत के ३६ राज्यों और संघ क्षेत्रों में पीढ़ियों से दादी-नानी द्वारा संजोए गए पारम्परिक घरेलू नुस्खों का खुला सांस्कृतिक अभिलेखागार। चरक संहिता, सुश्रुत संहिता और क्षेत्रीय लोक ज्ञान पर आधारित प्रत्येक नुस्खा पादप पहचान और कड़े सुरक्षा मानकों को सहेजता है।",
    heroFoliosStat: "अभिलिखित नुस्खे",
    heroStatesStat: "३६ राज्य व संघ क्षेत्र",
    heroNoticeTitle: "सांस्कृतिक अभिलेखीय सूचना:",

    footerPrayer: "॥ सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः । सर्वे भद्राणि पश्यन्तु मा कश्चिद्दुःखभाग्भवेत् ॥",
    footerPrayerMeaning: "सब सुखी हों, सब निरोगी हों, सब मंगलमय घटनाओं के साक्षी बनें और किसी को भी दुःख का भागी न बनना पड़े।",
    footerArchiveDesc: "भारत के २८ राज्यों और ८ केंद्रशासित प्रदेशों की रसोई एवं लोक ज्ञान से संकलित घरेलू नुस्खों का खुला सांस्कृतिक अभिलेखागार।",
    footerDisclaimerTitle: "अभिलेखीय व सुरक्षा सूचना",
    footerDisclaimerBody: "यह पारम्परिक घरेलू पद्धतियों का सांस्कृतिक अभिलेखागार है, डॉक्टरी परामर्श नहीं। किसी भी उपयोग से पूर्व योग्य चिकित्सक से सलाह लें, विशेषकर गर्भावस्था, स्तनपान, वृद्धजनों, किसी पुरानी बीमारी या नियमित दवाओं के सेवन की स्थिति में। शिशुओं के लिए कदापि उपयोग न करें।",
    footerRights: "हमारे नुस्खे (Hamare Nuskhe) • सार्वजनिक सांस्कृतिक धरोहर अभिलेखागार"
  },

  kn: {
    brandName: "ನಮ್ಮ ನುಸ್ಖೆಗಳು / Hamare Nuskhe",
    brandSubtitle: "ಭಾರತದ ಮೂಲೆ ಮೂಲೆಗಳಿಂದ ಸಾಂಪ್ರದಾಯಿಕ ಮನೆಮದ್ದುಗಳು",
    ethnobotanicalSubtitle: "ಸಾಂಪ್ರದಾಯಿಕ ಗಿಡಮೂಲಿಕೆ ಮತ್ತು ಮನೆಮದ್ದುಗಳ ದಾಖಲೆ",
    motto: "ಆಯುರ್ವೇದೋಽಮೃತಾನಾಮ್ • ಆಯುರ್ವೇದವು ಅಮೃತತ್ವದ ವಿಜ್ಞಾನ",
    navArchive: "ಸಂಗ್ರಹ",
    navStates: "ರಾಜ್ಯಗಳು",
    navPlants: "ಸಸ್ಯಗಳು",
    navSaved: "ಉಳಿಸಿದವು",
    navContribute: "ಕೊಡುಗೆ ನೀಡಿ",
    navAbout: "ಸುರಕ್ಷತೆ ಮತ್ತು ಮಾಹಿತಿ",
    textSizeSmall: "A−",
    textSizeMedium: "A",
    textSizeLarge: "A+",

    searchPlaceholder: "ಹೆಸರು, ಗಿಡಮೂಲಿಕೆ ಅಥವಾ ಕಾಯಿಲೆಯ ಮೂಲಕ ಮನೆಮದ್ದು ಹುಡುಕಿ...",
    concernsTitle: "ಸಾಂಪ್ರದಾಯಿಕ ಮನೆಮದ್ದು ಉಪಯೋಗಗಳು:",
    filterState: "ರಾಜ್ಯ / ಕೇಂದ್ರಾಡಳಿತ ಪ್ರದೇಶ",
    allStates: "ಎಲ್ಲಾ ೩೬ ರಾಜ್ಯಗಳು",
    filterRegion: "ಪ್ರದೇಶ",
    allRegions: "ಎಲ್ಲಾ ಪ್ರದೇಶಗಳು",
    filterCategory: "ವರ್ಗ",
    allCategories: "ಎಲ್ಲಾ ವರ್ಗಗಳು",
    filterType: "ಸಿದ್ಧತೆ ವಿಧಾನ",
    allTypes: "ಎಲ್ಲಾ ಪ್ರಕಾರಗಳು",
    filterPrepTime: "ಸಿದ್ಧತಾ ಸಮಯ",
    anyTime: "ಯಾವುದೇ ಸಮಯ",
    under10Min: "೧೦ ನಿಮಿಷದೊಳಗೆ",
    under20Min: "೨೦ ನಿಮಿಷದೊಳಗೆ",
    under30Min: "೩೦ ನಿಮಿಷದೊಳಗೆ",
    filterReviewedOnly: "ಪರಿಶೀಲಿಸಿದವು ಮಾತ್ರ",
    filteredBy: "ಆಯ್ಕೆ ಮಾಡಿದ ರಾಜ್ಯ:",
    showingResults: "{total} ರಲ್ಲಿ {count} ಮನೆಮದ್ದುಗಳು ಪ್ರದರ್ಶನಗೊಂಡಿವೆ",
    resetFilters: "ಫಿಲ್ಟರ್ ಮರುಹೊಂದಿಸಿ",
    exportDrawer: "ರಫ್ತು ಮಾಡಿ",
    viewIndexList: "ಸೂಚಿ ಪಟ್ಟಿ",
    viewCards: "ಕಾರ್ಡ್ ವೀಕ್ಷಣೆ",
    noResultsTitle: "ಈ ಹೆಸರಿನಲ್ಲಿ ಯಾವುದೇ ಮನೆಮದ್ದು ಕಂಡುಬಂದಿಲ್ಲ.",
    noResultsDesc: "ಶುಂಠಿ, ತುಳಸಿ, ಜೀರಿಗೆ ಅಥವಾ ಸ್ಥಳೀಯ ಸಸ್ಯಗಳ ಹೆಸರಿನ ಮೂಲಕ ಹುಡುಕಿ ನೋಡಿ.",
    clearFiltersBtn: "ಎಲ್ಲಾ ಫಿಲ್ಟರ್‌ಗಳನ್ನು ತೆಗೆದುಹಾಕಿ ಸಂಪೂರ್ಣ ಸಂಗ್ರಹ ನೋಡಿ",
    readFolioBtn: "ವಿವರ ನೋಡಿ",
    reviewedBadge: "ಪರಿಶೀಲಿಸಲಾಗಿದೆ",
    unreviewedBadge: "ಪರಿಶೀಲಿಸದ ನಮೂದು",

    concernCough: "ಕೆಮ್ಮು ಮತ್ತು ಶೀತ (ಕಫ-ವಾತ)",
    concernAcidity: "ಎದೆಯುರಿ ಮತ್ತು ಪಿತ್ತ (ಪಿತ್ತ ಶಾಮಕ)",
    concernThroat: "ಗಂಟಲು ನೋವು (ಕಂಠ್ಯ)",
    concernBloating: "ಹೊಟ್ಟೆ ಉಬ್ಬರ ಮತ್ತು ಗ್ಯಾಸ್ (ವಾತಾನುಲೋಮನ)",
    concernDigestion: "ಜೀರ್ಣಕ್ರಿಯೆ (ದೀಪನ-ಪಾಚನ)",
    concernPostpartum: "ಬಾಣಂತನ ಆರೈಕೆ (ಸೂತಿಕಾ ಪರಿಚರ್ಯ)",
    concernChills: "ಶೀತ ಮತ್ತು ಚಳಿ",

    heritageTitle: "ಸಾಂಪ್ರದಾಯಿಕ ಆಯುರ್ವೇದ ತತ್ವ ಮತ್ತು ದರ್ಶನ",
    shlokaCaption: "ಆಯುರ್ವೇದದ ಮೂಲಭೂತ ಉದ್ದೇಶ — ಚರಕ ಸಂಹಿತಾ, ಸೂತ್ರಸ್ಥಾನ ೩೦.೨೬",
    tabDoshas: "ತ್ರಿದೋಷ ದರ್ಶನ (ವಾತ, ಪಿತ್ತ, ಕಫ)",
    tabKitchenHerbs: "ಮಸಾಲೆ ಡಬ್ಬಿ (೭ ಪವಿತ್ರ ಅಡುಗೆಮನೆ ಗಿಡಮೂಲಿಕೆಗಳು)",
    tabElementsSeasons: "ಪಂಚಮಹಾಭೂತ ಮತ್ತು ಋತುಚರ್ಯ",

    catRespiratory: "ಉಸಿರಾಟ ವ್ಯವಸ್ಥೆ (ಕೆಮ್ಮು-ಶೀತ)",
    catDigestion: "ಜೀರ್ಣಾಂಗ ವ್ಯವಸ್ಥೆ",
    catImmunity: "ರೋಗನಿರೋಧಕ ಶಕ್ತಿ",
    catJointMuscle: "ಕೀಲು ಮತ್ತು ಸ್ನಾಯು ನೋವು",
    catSkinHair: "ಚರ್ಮ ಮತ್ತು ಕೂದಲು",
    catPostpartum: "ಬಾಣಂತನ ಮತ್ತು ಮಹಿಳಾ ಆರೋಗ್ಯ",
    catSleepCalming: "ನಿದ್ರೆ ಮತ್ತು ಮನಃಶಾಂತಿ",
    catOralThroat: "ಬಾಯಿ ಮತ್ತು ಗಂಟಲು",
    catGeneralWellness: "ಸಾಮಾನ್ಯ ಆರೋಗ್ಯ",

    heroBadge: "ಪಾರಂಪರಿಕ ಜ್ಞಾನ ಕೋಶ • ಸಾಂಸ್ಕೃತಿಕ ಪರಂಪರೆಯ ದಾಖಲೆ",
    heroSubbadge: "೫೦೦೦ ವರ್ಷಗಳ ಭಾರತೀಯ ಸಸ್ಯ ಮತ್ತು ಆಯುರ್ವೇದ ಪರಂಪರೆ",
    heroTitle: "ಭಾರತೀಯ ಮನೆಗಳ ಸಾಂಪ್ರದಾಯಿಕ ಮನೆಮದ್ದುಗಳು",
    heroDesc: "ಭಾರತದ ೩೬ ರಾಜ್ಯಗಳು ಮತ್ತು ಕೇಂದ್ರಾಡಳಿತ ಪ್ರದೇಶಗಳಲ್ಲಿ ತಲೆಮಾರುಗಳಿಂದ ಬಂದ ಸಾಂಪ್ರದಾಯಿಕ ಮನೆಮದ್ದುಗಳ ಮುಕ್ತ ಸಾಂಸ್ಕೃತಿಕ ದಾಖಲೆ. ಪ್ರತಿಯೊಂದು ವಿಧಾನವೂ ಸ್ಥಳೀಯ ಸಸ್ಯಗಳ ಶುದ್ಧತೆ ಮತ್ತು ಸುರಕ್ಷತಾ ಮಾರ್ಗಸೂಚಿಗಳನ್ನು ಒಳಗೊಂಡಿದೆ.",
    heroFoliosStat: "ದಾಖಲಿತ ನುಸ್ಖೆಗಳು",
    heroStatesStat: "೩೬ ರಾಜ್ಯಗಳು & UTs",
    heroNoticeTitle: "ಸಾಂಸ್ಕೃತಿಕ ದಾಖಲೆ ಸೂಚನೆ:",

    footerPrayer: "॥ ಸರ್ವೇ ಭವಂತು ಸುಖಿನಃ ಸರ್ವೇ ಸಂತು ನಿರಾಮಯಾಃ । ಸರ್ವೇ ಭದ್ರಾಣಿ ಪಶ್ಯಂತು ಮಾ ಕಶ್ಚಿತ್ ದುಃಖಭಾಗ್ಭವೇತ್ ॥",
    footerPrayerMeaning: "ಎಲ್ಲರೂ ಸುಖವಾಗಿರಲಿ, ಎಲ್ಲರೂ ರೋಗಮುಕ್ತರಾಗಿರಲಿ, ಎಲ್ಲರಿಗೂ ಮಂಗಳವಾಗಲಿ, ಯಾರೂ ದುಃಖಕ್ಕೆ ಗುರಿಯಾಗದಿರಲಿ.",
    footerArchiveDesc: "ಭಾರತದ ೨೮ ರಾಜ್ಯಗಳು ಮತ್ತು ೮ ಕೇಂದ್ರಾಡಳಿತ ಪ್ರದೇಶಗಳ ಸಾಂಪ್ರದಾಯಿಕ ಮನೆಮದ್ದುಗಳ ಮುಕ್ತ ಸಾಂಸ್ಕೃತಿಕ ದಾಖಲೆ.",
    footerDisclaimerTitle: "ಆರೋಗ್ಯ ಮತ್ತು ಸುರಕ್ಷತಾ ಸೂಚನೆ",
    footerDisclaimerBody: "ಇದು ಸಾಂಸ್ಕೃತಿಕ ದಾಖಲೀಕರಣಕ್ಕಾಗಿ ನೀಡಲಾದ ಮನೆಮದ್ದುಗಳ ವಿವರವಾಗಿದೆ, ವೈದ್ಯಕೀಯ ಸಲಹೆಯಲ್ಲ. ಗರ್ಭಿಣಿಯರು, ಹಾಲುಣಿಸುವ ತಾಯಂದಿರು ಅಥವಾ ಔಷಧಿ ಸೇವಿಸುತ್ತಿರುವವರು ವೈದ್ಯರನ್ನು ಸಂಪರ್ಕಿಸಿ. ಶಿಶುಗಳಿಗೆ ಬಳಸಬೇಡಿ.",
    footerRights: "ನಮ್ಮ ನುಸ್ಖೆಗಳು (Hamare Nuskhe) • ಸಾರ್ವಜನಿಕ ಸಾಂಸ್ಕೃತಿಕ ಪರಂಪರೆ"
  },

  ta: {
    brandName: "எங்கள் நாட்டு மருந்துகள் / Hamare Nuskhe",
    brandSubtitle: "இந்தியா முழுவதிலும் உள்ள பாரம்பரிய வீட்டு வைத்தியங்கள்",
    ethnobotanicalSubtitle: "பாரம்பரிய சித்த & நாட்டு மருத்துவக் குறிப்புகள்",
    motto: "ஆயுர்வேதோऽமிருதானாம் • பாரம்பரிய மருத்துவ அறிவியல்",
    navArchive: "தொகுப்பு",
    navStates: "மாநிலங்கள்",
    navPlants: "மூலிகைகள்",
    navSaved: "சேமித்தவை",
    navContribute: "சேர்க்கவும்",
    navAbout: "பாதுகாப்பு & தகவல்",
    textSizeSmall: "A−",
    textSizeMedium: "A",
    textSizeLarge: "A+",

    searchPlaceholder: "பெயர், மூலிகை அல்லது உடல்நலக் குறைபாடு மூலம் தேடவும்...",
    concernsTitle: "பாரம்பரிய நாட்டு மருத்துவ பயன்கள்:",
    filterState: "மாநிலம்",
    allStates: "அனைத்து 36 மாநிலங்கள்",
    filterRegion: "மண்டலம்",
    allRegions: "அனைத்து மண்டலங்கள்",
    filterCategory: "பிரிவு",
    allCategories: "அனைத்து பிரிவுகள்",
    filterType: "செய்முறை வகை",
    allTypes: "அனைத்து வகைகள்",
    filterPrepTime: "தயாரிப்பு நேரம்",
    anyTime: "எந்த நேரமும்",
    under10Min: "10 நிமிடங்களுக்குள்",
    under20Min: "20 நிமிடங்களுக்குள்",
    under30Min: "30 நிமிடங்களுக்குள்",
    filterReviewedOnly: "சரிபார்க்கப்பட்டவை மட்டும்",
    filteredBy: "தேர்ந்தெடுத்த மாநிலம்:",
    showingResults: "{total} இல் {count} நாட்டு மருந்துகள் உள்ளன",
    resetFilters: "அனைத்தையும் நீக்கு",
    exportDrawer: "ஏற்றுமதி",
    viewIndexList: "பட்டியல் காட்சி",
    viewCards: "அட்டை காட்சி",
    noResultsTitle: "இந்த பெயரில் எந்த குறிப்பும் கிடைக்கவில்லை.",
    noResultsDesc: "இஞ்சி, துளசி, மிளகு போன்ற பொதுவான பெயர்கள் அல்லது மூலிகை பெயர்களைக் கொண்டு தேடவும்.",
    clearFiltersBtn: "அனைத்து வடிகட்டிகளையும் நீக்கி முழுப் பட்டியலையும் காண்க",
    readFolioBtn: "விவரம் பார்க்க",
    reviewedBadge: "மருத்துவர் சரிபார்த்தது",
    unreviewedBadge: "ஆவணப் பதிவு",

    concernCough: "இருமல் & சளி (கபம்)",
    concernAcidity: "அசிடிட்டி & பித்தம்",
    concernThroat: "தொண்டை வலி & கரகரப்பு",
    concernBloating: "வயிற்று உப்புசம் & வாயு",
    concernDigestion: "செரிமானம் (அக்னி)",
    concernPostpartum: "பிரசவத்திற்குப் பிந்தைய பராமரிப்பு",
    concernChills: "பருவகால குளிர் & காய்ச்சல்",

    heritageTitle: "பாரம்பரிய சித்த & ஆயுர்வேத மரபு",
    shlokaCaption: "பாரம்பரிய வாழ்வியல் தத்துவம்",
    tabDoshas: "முக்குற்ற தத்துவம் (வாதம், பித்தம், கபம்)",
    tabKitchenHerbs: "அஞ்சறைப் பெட்டி (7 புனித சமையலறை மூலிகைகள்)",
    tabElementsSeasons: "பஞ்சபூதங்கள் & பருவக்கால வாழ்வியல்",

    catRespiratory: "சுவாச மண்டலம் (இருமல், சளி)",
    catDigestion: "செரிமான மண்டலம்",
    catImmunity: "நோய் எதிர்ப்புச் சக்தி",
    catJointMuscle: "மூட்டு & தசை வலி",
    catSkinHair: "தோல் & முடி பராமரிப்பு",
    catPostpartum: "தாய் & சேய் நலம்",
    catSleepCalming: "ஆழ்ந்த உறக்கம் & அமைதி",
    catOralThroat: "வாய் & தொண்டை நலம்",
    catGeneralWellness: "பொதுவான உடல் நலம்",

    heroBadge: "பாரம்பரிய அறிவு களஞ்சியம் • பண்பாட்டு மரபு ஆவணம்",
    heroSubbadge: "5000 ஆண்டு கால இந்திய சித்த & மூலிகை மரபு",
    heroTitle: "இந்திய வீடுகளின் பாரம்பரிய பாட்டி வைத்தியங்கள்",
    heroDesc: "இந்தியாவின் 36 மாநிலங்கள் மற்றும் யூனியன் பிரதேசங்களில் தலைமுறை தலைமுறையாகப் பின்பற்றப்படும் வீட்டு மருத்துவக் குறிப்புகளின் திறந்தவெளி ஆவணம்.",
    heroFoliosStat: "பதிவான குறிப்புகள்",
    heroStatesStat: "36 மாநிலங்கள் & UTs",
    heroNoticeTitle: "பண்பாட்டு ஆவண அறிவிப்பு:",

    footerPrayer: "॥ சர்வே பவந்து சுகினஃ சர்வே சந்து நிராமயாஃ ॥",
    footerPrayerMeaning: "அனைத்து உயிர்களும் இன்புற்று வாழ்க, யாவரும் நோயின்றி வாழ்க.",
    footerArchiveDesc: "இந்தியாவின் 28 மாநிலங்கள் மற்றும் 8 யூனியன் பிரதேசங்களின் பாரம்பரிய வீட்டு மருத்துவக் குறிப்புகள்.",
    footerDisclaimerTitle: "பாதுகாப்பு & மறுப்பு அறிவிப்பு",
    footerDisclaimerBody: "இது பாரம்பரிய பண்பாட்டு ஆவணக் களஞ்சியம் மட்டுமே, மருத்துவ ஆலோசனை அல்ல. தீவிர நோய்களுக்குத் தகுந்த மருத்துவரை அணுகவும். பச்சிளம் குழந்தைகளுக்குத் தேன் அல்லது கடுமையான மருந்துகளைத் தரவேண்டாம்.",
    footerRights: "Hamare Nuskhe • மக்கள் மரபு மருத்துவ ஆவணம்"
  },

  // Fallbacks for other regional codes mirror English with Indic greetings
  pa: { ...({} as TranslationDict) },
  mr: { ...({} as TranslationDict) },
  gu: { ...({} as TranslationDict) },
  bn: { ...({} as TranslationDict) }
};

// Fill in other regional languages with fallback to Hindi/English where not yet localized
TRANSLATIONS.pa = { ...TRANSLATIONS.hi, brandName: "ਸਾਡੇ ਨੁਸਖ਼ੇ / Hamare Nuskhe", navArchive: "ਸੰਗ੍ਰਹਿ", navStates: "ਰਾਜ", navPlants: "ਬੂਟੇ", navSaved: "ਸੰਭਾਲੇ ਗਏ", navContribute: "ਨੁਸਖ਼ਾ ਜੋੜੋ", navAbout: "ਜਾਣਕਾਰੀ" };
TRANSLATIONS.mr = { ...TRANSLATIONS.hi, brandName: "आमचे घरगुती उपाय / Hamare Nuskhe", navArchive: "संग्रह", navStates: "राज्ये", navPlants: "वनस्पती", navSaved: "जतन केलेले", navContribute: "उपाय नोंदवा", navAbout: "माहिती व सुरक्षा" };
TRANSLATIONS.gu = { ...TRANSLATIONS.hi, brandName: "અમારા ઘરેલું ઉપચાર / Hamare Nuskhe", navArchive: "સંગ્રહ", navStates: "રાજ્યો", navPlants: "વનસ્પતિ", navSaved: "સાચવેલા", navContribute: "ઉપચાર ઉમેરો", navAbout: "માહિતી" };
TRANSLATIONS.bn = { ...TRANSLATIONS.hi, brandName: "আমাদের ঘরোয়া টোটকা / Hamare Nuskhe", navArchive: "সংগ্রহ", navStates: "রাজ্য", navPlants: "ভেষজ", navSaved: "সংরক্ষিত", navContribute: "যুক্ত করুন", navAbout: "তথ্য" };
