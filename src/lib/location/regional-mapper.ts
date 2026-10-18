/**
 * Regional Language & Location Mapping for Hamare Nuskhe
 * Maps geographical coordinates or state names to authentic Indic languages and scripts.
 * Runs 100% client-side with zero telemetry / DPDP Act compliant.
 */

export interface RegionalLanguageInfo {
  state: string;
  region: 'North' | 'South' | 'East' | 'West' | 'Central' | 'Northeast';
  language: string;
  nativeName: string;
  script: string;
  greeting: string;
  code: string;
  sampleUsePrompt: string;
}

// Bounding boxes / Centroids for Indian States
interface StateGeoBox {
  state: string;
  latMin: number;
  latMax: number;
  lonMin: number;
  lonMax: number;
  centerLat: number;
  centerLon: number;
}

const STATE_GEO_DATA: StateGeoBox[] = [
  { state: "Punjab", latMin: 29.5, latMax: 32.5, lonMin: 73.8, lonMax: 76.9, centerLat: 31.1, centerLon: 75.3 },
  { state: "Tamil Nadu", latMin: 8.0, latMax: 13.5, lonMin: 76.2, lonMax: 80.3, centerLat: 11.1, centerLon: 78.6 },
  { state: "Kerala", latMin: 8.2, latMax: 12.8, lonMin: 74.8, lonMax: 77.4, centerLat: 10.8, centerLon: 76.2 },
  { state: "Karnataka", latMin: 11.5, latMax: 18.5, lonMin: 74.0, lonMax: 78.6, centerLat: 15.3, centerLon: 75.7 },
  { state: "Maharashtra", latMin: 15.6, latMax: 22.0, lonMin: 72.6, lonMax: 80.9, centerLat: 19.7, centerLon: 75.7 },
  { state: "Gujarat", latMin: 20.1, latMax: 24.7, lonMin: 68.1, lonMax: 74.5, centerLat: 22.2, centerLon: 71.1 },
  { state: "West Bengal", latMin: 21.5, latMax: 27.2, lonMin: 85.8, lonMax: 89.9, centerLat: 22.9, centerLon: 87.8 },
  { state: "Odisha", latMin: 17.8, latMax: 22.6, lonMin: 81.4, lonMax: 87.5, centerLat: 20.9, centerLon: 85.0 },
  { state: "Andhra Pradesh", latMin: 12.6, latMax: 19.1, lonMin: 76.7, lonMax: 84.8, centerLat: 15.9, centerLon: 79.7 },
  { state: "Telangana", latMin: 15.8, latMax: 19.9, lonMin: 77.2, lonMax: 81.8, centerLat: 17.8, centerLon: 79.1 },
  { state: "Assam", latMin: 24.1, latMax: 28.0, lonMin: 89.7, lonMax: 96.0, centerLat: 26.2, centerLon: 92.9 },
  { state: "Rajasthan", latMin: 23.0, latMax: 30.2, lonMin: 69.5, lonMax: 78.3, centerLat: 27.0, centerLon: 74.2 },
  { state: "Uttar Pradesh", latMin: 23.9, latMax: 30.4, lonMin: 77.1, lonMax: 84.6, centerLat: 26.8, centerLon: 80.9 },
  { state: "Bihar", latMin: 24.3, latMax: 27.5, lonMin: 83.3, lonMax: 88.3, centerLat: 25.6, centerLon: 85.3 },
  { state: "Madhya Pradesh", latMin: 21.3, latMax: 26.9, lonMin: 74.0, lonMax: 82.8, centerLat: 23.5, centerLon: 77.4 },
  { state: "Himachal Pradesh", latMin: 30.4, latMax: 33.2, lonMin: 75.8, lonMax: 79.0, centerLat: 31.8, centerLon: 77.1 },
  { state: "Jammu & Kashmir", latMin: 32.3, latMax: 37.1, lonMin: 73.4, lonMax: 80.3, centerLat: 33.7, centerLon: 74.8 },
  { state: "Goa", latMin: 14.9, latMax: 15.8, lonMin: 73.6, lonMax: 74.3, centerLat: 15.3, centerLon: 74.1 },
  { state: "Haryana", latMin: 27.6, latMax: 30.9, lonMin: 74.5, lonMax: 77.6, centerLat: 29.0, centerLon: 76.0 },
  { state: "Delhi", latMin: 28.4, latMax: 28.9, lonMin: 76.8, lonMax: 77.3, centerLat: 28.7, centerLon: 77.1 }
];

export const REGIONAL_LANGUAGES: Record<string, RegionalLanguageInfo> = {
  "Punjab": {
    state: "Punjab",
    region: "North",
    language: "Punjabi",
    nativeName: "ਪੰਜਾਬੀ",
    script: "Gurmukhi",
    greeting: "ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ",
    code: "pa",
    sampleUsePrompt: "ਪੰਜਾਬ ਦੇ ਘਰੇਲੂ ਨੁਸਖੇ ਦੇਖੋ"
  },
  "Tamil Nadu": {
    state: "Tamil Nadu",
    region: "South",
    language: "Tamil",
    nativeName: "தமிழ்",
    script: "Tamil",
    greeting: "வணக்கம்",
    code: "ta",
    sampleUsePrompt: "பாரம்பரிய நாட்டு மருத்துவக் குறிப்புகள்"
  },
  "Kerala": {
    state: "Kerala",
    region: "South",
    language: "Malayalam",
    nativeName: "മലയാളം",
    script: "Malayalam",
    greeting: "നമസ്കാരം",
    code: "ml",
    sampleUsePrompt: "കേരളീയ പരമ്പരാഗത ഒറ്റമൂലികൾ"
  },
  "Karnataka": {
    state: "Karnataka",
    region: "South",
    language: "Kannada",
    nativeName: "ಕನ್ನಡ",
    script: "Kannada",
    greeting: "ನಮಸ್ಕಾರ",
    code: "kn",
    sampleUsePrompt: "ಕರ್ನಾಟಕದ ನಾಟಿ ಮನೆಮದ್ದುಗಳು"
  },
  "Maharashtra": {
    state: "Maharashtra",
    region: "West",
    language: "Marathi",
    nativeName: "मराठी",
    script: "Devanagari",
    greeting: "नमस्कार",
    code: "mr",
    sampleUsePrompt: "महाराष्ट्रातील पारंपरिक घरगुती उपाय"
  },
  "Gujarat": {
    state: "Gujarat",
    region: "West",
    language: "Gujarati",
    nativeName: "ગુજરાતી",
    script: "Gujarati",
    greeting: "નમસ્તે",
    code: "gu",
    sampleUsePrompt: "ગુજરાતના પરંપરાગત ઘરેલું ઉપચાર"
  },
  "West Bengal": {
    state: "West Bengal",
    region: "East",
    language: "Bengali",
    nativeName: "বাংলা",
    script: "Bengali",
    greeting: "নমস্কার",
    code: "bn",
    sampleUsePrompt: "বাংলার ঐতিহ্যবাহী ঘরোয়া টোটকা"
  },
  "Odisha": {
    state: "Odisha",
    region: "East",
    language: "Odia",
    nativeName: "ଓଡ଼ିଆ",
    script: "Odia",
    greeting: "ନମସ୍କାର",
    code: "or",
    sampleUsePrompt: "ଓଡ଼ିଶାର ପାରମ୍ପରିକ ଘରୋଇ ଉପଚାର"
  },
  "Andhra Pradesh": {
    state: "Andhra Pradesh",
    region: "South",
    language: "Telugu",
    nativeName: "తెలుగు",
    script: "Telugu",
    greeting: "నమస్కారం",
    code: "te",
    sampleUsePrompt: "ఆంధ్ర ఇంటి చిట్కాలు"
  },
  "Telangana": {
    state: "Telangana",
    region: "South",
    language: "Telugu",
    nativeName: "తెలుగు",
    script: "Telugu",
    greeting: "నమస్కారం",
    code: "te",
    sampleUsePrompt: "తెలంగాణ సంప్రదాయ గృహ చిట్కాలు"
  },
  "Assam": {
    state: "Assam",
    region: "Northeast",
    language: "Assamese",
    nativeName: "অসমীয়া",
    script: "Assamese",
    greeting: "নমস্কাৰ",
    code: "as",
    sampleUsePrompt: "অসমৰ পৰম্পৰাগত বনৌষধি আৰু দিহা"
  },
  "Rajasthan": {
    state: "Rajasthan",
    region: "North",
    language: "Hindi",
    nativeName: "हिन्दी / मारवाड़ी",
    script: "Devanagari",
    greeting: "खम्मा घणी",
    code: "hi",
    sampleUsePrompt: "राजस्थान के परम्परागत देशी नुस्खे"
  },
  "Uttar Pradesh": {
    state: "Uttar Pradesh",
    region: "North",
    language: "Hindi",
    nativeName: "हिन्दी",
    script: "Devanagari",
    greeting: "नमस्ते",
    code: "hi",
    sampleUsePrompt: "उत्तर भारत के दादी-नानी के नुस्खे"
  },
  "Bihar": {
    state: "Bihar",
    region: "East",
    language: "Hindi",
    nativeName: "हिन्दी / मैथिली",
    script: "Devanagari",
    greeting: "प्रणाम",
    code: "hi",
    sampleUsePrompt: "पारम्परिक घरेलू उपचार"
  },
  "Madhya Pradesh": {
    state: "Madhya Pradesh",
    region: "Central",
    language: "Hindi",
    nativeName: "हिन्दी",
    script: "Devanagari",
    greeting: "नमस्ते",
    code: "hi",
    sampleUsePrompt: "मध्य भारत के आयुर्वेदिक घरेलू उपचार"
  },
  "Himachal Pradesh": {
    state: "Himachal Pradesh",
    region: "North",
    language: "Hindi",
    nativeName: "हिन्दी / पहाड़ी",
    script: "Devanagari",
    greeting: "नमस्ते",
    code: "hi",
    sampleUsePrompt: "हिमाचली पारंपरिक पहाड़ी नुस्खे"
  },
  "Jammu & Kashmir": {
    state: "Jammu & Kashmir",
    region: "North",
    language: "Kashmiri / Hindi",
    nativeName: "कॉशुर / हिन्दी",
    script: "Devanagari",
    greeting: "सलाम / नमस्ते",
    code: "hi",
    sampleUsePrompt: "पारंपरिक कश्मीरी हर्बल चाय व नुस्खे"
  }
};

// Default fallback for Pan-India or unmapped regions
const DEFAULT_FALLBACK: RegionalLanguageInfo = {
  state: "Pan-India",
  region: "North",
  language: "Hindi",
  nativeName: "हिन्दी",
  script: "Devanagari",
  greeting: "नमस्ते",
  code: "hi",
  sampleUsePrompt: "भारत के कोने-कोने से घरेलू नुस्खे"
};

/**
 * Calculates Euclidean distance between two coordinate pairs
 */
function getDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const dLat = lat1 - lat2;
  const dLon = lon1 - lon2;
  return Math.sqrt(dLat * dLat + dLon * dLon);
}

/**
 * Matches coordinates (latitude, longitude) to the nearest Indian State
 */
export function detectRegionFromCoords(latitude: number, longitude: number): RegionalLanguageInfo {
  // First check if coordinates fall inside any state bounding box
  for (const box of STATE_GEO_DATA) {
    if (
      latitude >= box.latMin &&
      latitude <= box.latMax &&
      longitude >= box.lonMin &&
      longitude <= box.lonMax
    ) {
      if (REGIONAL_LANGUAGES[box.state]) {
        return REGIONAL_LANGUAGES[box.state];
      }
    }
  }

  // If outside bounding boxes (e.g. edge or border district), find the closest center
  let closestState = "Pan-India";
  let minDistance = Infinity;

  for (const box of STATE_GEO_DATA) {
    const dist = getDistance(latitude, longitude, box.centerLat, box.centerLon);
    if (dist < minDistance) {
      minDistance = dist;
      closestState = box.state;
    }
  }

  // If reasonably close to India (within ~15 degrees)
  if (minDistance < 15 && REGIONAL_LANGUAGES[closestState]) {
    return REGIONAL_LANGUAGES[closestState];
  }

  return DEFAULT_FALLBACK;
}

/**
 * Returns regional language info given a state name
 */
export function getRegionInfo(stateName: string): RegionalLanguageInfo {
  return REGIONAL_LANGUAGES[stateName] || DEFAULT_FALLBACK;
}

/**
 * Finds regional language info from free-text region/city names (e.g. from IP lookups)
 */
export function findRegionByName(name: string): RegionalLanguageInfo | null {
  if (!name) return null;
  const lower = name.toLowerCase().trim();

  // Direct match on states
  for (const [state, info] of Object.entries(REGIONAL_LANGUAGES)) {
    if (lower.includes(state.toLowerCase()) || state.toLowerCase().includes(lower)) {
      return info;
    }
  }

  // Major Indian cities to state mapping
  const cityStateMap: Record<string, string> = {
    bengaluru: "Karnataka",
    bangalore: "Karnataka",
    hubballi: "Karnataka",
    hubli: "Karnataka",
    mysuru: "Karnataka",
    mysore: "Karnataka",
    mangalore: "Karnataka",
    mangaluru: "Karnataka",
    chennai: "Tamil Nadu",
    coimbatore: "Tamil Nadu",
    madurai: "Tamil Nadu",
    mumbai: "Maharashtra",
    pune: "Maharashtra",
    nagpur: "Maharashtra",
    hyderabad: "Telangana",
    kolkata: "West Bengal",
    calcutta: "West Bengal",
    ahmedabad: "Gujarat",
    surat: "Gujarat",
    vadodara: "Gujarat",
    jaipur: "Rajasthan",
    jodhpur: "Rajasthan",
    lucknow: "Uttar Pradesh",
    kanpur: "Uttar Pradesh",
    varanasi: "Uttar Pradesh",
    amritsar: "Punjab",
    ludhiana: "Punjab",
    chandigarh: "Punjab",
    kochi: "Kerala",
    cochin: "Kerala",
    thiruvananthapuram: "Kerala",
    trivandrum: "Kerala",
    bhubaneswar: "Odisha",
    cuttack: "Odisha",
    patna: "Bihar",
    guwahati: "Assam",
    shimla: "Himachal Pradesh",
    srinagar: "Jammu & Kashmir",
    delhi: "Delhi",
    panaji: "Goa",
  };

  for (const [city, state] of Object.entries(cityStateMap)) {
    if (lower.includes(city)) {
      return REGIONAL_LANGUAGES[state] || null;
    }
  }

  return null;
}
