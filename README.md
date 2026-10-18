# हमारे नुस्खे (Hamare Nuskhe)
### Digital Cultural Archive & Deterministic Safety Engine for Indian Folk Home Remedies

> **Archival & Cultural Preservation Notice:**  
> *This platform is a digital humanities project dedicated to cultural archiving and ethnobotanical preservation. It is **not** a healthcare service and does **not** provide medical advice, diagnosis, or treatment. Every remedy is recorded as a traditional cultural practice ("traditionally used for…"), never as a clinical prescription. Consult a qualified medical practitioner before using any herbal or domestic preparation, especially if pregnant, nursing, administering to children, managing chronic health conditions, or taking prescription pharmaceuticals.*

---

## 1. Executive Summary & Objective

**हमारे नुस्खे (Hamare Nuskhe)** is a digital humanities ethnobotanical repository designed to systematically document, preserve, and index authentic household remedies (*nuskhe*) across all 28 States and 8 Union Territories of India. 

For generations, Indian household health practices were transmitted orally—from grandmothers and village elders to younger generations. In the modern era of commercialized wellness blogs, social media misinformation, and unvalidated claims, traditional ethnobotanical knowledge faces two distinct crises:
1. **Cultural Erasure:** Local dialect formulations, regional plant preparations, and multi-generational folk practices are vanishing without systematic archival documentation.
2. **Safety Misinformation:** Modern digital platforms often present folk remedies with sensationalized claims (*"miracle cure for diabetes"*, *"treats cancer"*), ignoring known contraindications, herb-drug interactions, infant vulnerabilities, and toxic compound formation.

**Hamare Nuskhe** solves both crises through an uncompromising, dual-pillar methodology:
- **Heritage-First Ethnobotanical Ledger:** A tactile, royal archival UI inspired by 18th-century Indian copper-plate inscriptions, Bhojpatra manuscripts, and classical Ayurvedic folios combined with modern Apple Bento architecture.
- **Deterministic Safety Rules Engine:** A hardcoded, client/server rule verification engine that analyzes ingredients in real time and enforces non-dismissible clinical warnings (infant botulism, anticoagulant interactions, hypoglycemic shock, pregnancy cautions, hypertensive risks, and choking hazards).

---

## 2. Key Architecture & Features

### 🏛️ Digital Humanities & Ethnobotanical Ledger
- **1,061+ Documented Folios:** Systematic cataloging across 36 Indian States and Union Territories, spanning 5 distinct traditions (**Ayurveda, Siddha, Unani, Folk, and Tribal**).
- **Zero Fabricated Content:** Every plant preparation is verified against botanical taxonomy and matched with Kew Gardens' **Plants of the World Online (POWO)** and **International Plant Names Index (IPNI)**.
- **Tridosha & Classical Attributes:** Integrated Ayurvedic pharmacological classifications:
  - **Virya:** Thermal energy (*🔥 Ushna / Warming* vs. *❄️ Sheeta / Cooling*).
  - **Dosha Karma:** Specific balance effects on *Vata*, *Pitta*, and *Kapha*.
  - **Grandmother's Archival Note (*दादी की सीख*):** Traditional preparation nuances, timing, seasonal considerations (*Ritu Charya*), and domestic context.

### 🛡️ Real-Time Deterministic Safety Engine
Integrated deterministic safety rules automatically detect dangerous ingredient combinations and display high-priority advisories:
- **Infant Botulism & Honey Rule:** Zero honey administration under 12 months; warnings against heating honey above 40°C (preventing toxic *5-hydroxymethylfurfural* / *Ama* generation).
- **Herb-Drug Interactions:** Flags bleeding risks with anticoagulants/antiplatelets (turmeric, ginger, garlic + Warfarin/Aspirin) and additive hypoglycemic shock (karela, methi + metformin/insulin).
- **Pregnancy & Lactation Contraindications:** Automated red flags on uterine stimulants (unripe papaya, excessive fenugreek, hing, sesame).
- **Hypertension & Electrolyte Warnings:** Warns against glycyrrhizin-induced pseudoaldosteronism and potassium loss in licorice (*Mulethi*).
- **Topical Irritants & Choking Hazards:** Automated patch-test requirements for mustard seed paste, and whole-seed safety for pediatric age brackets.
- **Emergency Escalation Flags:** Non-negotiable alerts directing patients to emergency departments for acute red flags (severe chest pain, hemoptysis, sudden respiratory distress).

### 🎨 Design System: "Royal Indian Herbarium + Apple Bento Architecture"
- **Indian Natural Pigment Palette:**
  - *Primary Khadi / Bhojpatra:* `#F4EFE6` (light) / `#161412` (dark) with subtle procedural SVG paper grain (`opacity: 0.035`).
  - *Aged Parchment Surfaces:* `#FAF6EE` / `#1F1C18`.
  - *Natural Pigments:* Sindoor Terracotta (`#A62B21`), Haldi Gold (`#E5A83B`), Translucent Neem Green (`#1C4332`), and Kansya Bell-Metal Bronze (`#C89D54`).
- **Apple Bento Glassmorphism:** Translucent glass cards with `backdrop-blur-[12px]`, crisp 1px borders, subtle metallic gradients, and responsive layouts.
- **Interactive Botanical Breeze (`<BotanicalBreeze />`):** Hardware-accelerated fixed HTML5 canvas rendering 24–28 drifting botanical particles (Neem and Tulsi leaves with 3D cosine flutter, plus Haldi pollen spores) with physics-based mouse repulsion and state toggle.
- **Editorial Typography Scale:**
  - *Rozha One / Rozha:* Regal Indic calligraphy titles.
  - *Cormorant Garamond & Playfair Display:* Classical editorial serif headings.
  - *Lora & Inter:* High-contrast, legible body typography.
  - *JetBrains Mono:* Archival accession folios, timing meters, and botanical taxonomy tags.
- **Dual Theme Support:** Seamless transition between *Handmade Khadi Ledger (Light)* and *Lamp-Lit Temple Sanctuary (Dark)* with persistent preference storage.
- **Bilingual Support (English / हिन्दी):** Dynamic real-time interface translation toggle.
- **Accessibility Controls (A- / A / A+):** Dynamic viewport typography scaling calibrated to maintain strict proportions without layout breakage.

### 📱 Responsive User Experience & Mobile Optimization
- **Dual Display Modes:**
  - *Archival Index Row View:* Classical tabular catalog with dot leaders for rapid desktop scanning.
  - *Apple Bento Card View:* Multi-column responsive cards with botanical well indicators and accession tags.
- **Apothecary Drawer Filters:** 36-State selector, 6-region breakdown, preparation time filters, and verified badge filters.
- **Kitchen Cooking Mode:** Full-screen step-by-step preparation flow equipped with the **Screen Wake Lock API** (`navigator.wakeLock`) to keep displays active during cooking.
- **Dynamic Servings Calculator:** Proportional ingredient recalculation (1x, 2x, 4x) preserving preparation ratios.
- **Heirloom Drawer (`/saved`):** Offline recipe bookmarks stored locally in `localStorage` with JSON and CSV export capabilities.

---

## 3. Technology Stack

| Layer | Technology | Rationale |
| :--- | :--- | :--- |
| **Framework** | Next.js 16 (App Router) + React 19 | High-performance Server Components, streaming SSR, and zero-layout-shift hydration. |
| **Language** | TypeScript (Strict Mode) | Full type-safety across botanical schemas, API responses, and safety rules. |
| **Styling** | Vanilla CSS + Tailwind CSS | Custom Indian pigment variables, HSL color tokens, and Apple Bento glass surfaces. |
| **Validation** | Zod | Runtime schema validation for data ingestion, URL parameters, and API endpoints. |
| **Search Engine** | In-Memory Pre-Indexed Search | Ultra-fast substring matching with `useDeferredValue` for smooth 60fps input response. |
| **Testing** | Vitest | 38 automated unit tests validating the deterministic safety rule engine and data repositories. |
| **Offline Architecture** | Service Worker + Web Manifest | Offline PWA caching for rural and low-connectivity environments. |

---

## 4. Project Directory Structure

```plaintext
hamare-nuskhe/
├── data/
│   ├── remedies.json            # 1,061+ curated and validated traditional remedy records
│   ├── states.json              # 36 States & UTs with regional categorization
│   ├── botanical-names.json     # Kew POWO / IPNI botanical allow-list
│   └── schema.ts                # TypeScript interfaces and Zod schemas for all records
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Root layout, theme injection, text size script, Breeze canvas
│   │   ├── page.tsx             # Home route with Archive Explorer and Ayurvedic Heritage guide
│   │   ├── globals.css          # Core CSS variables, typography scales, dark theme tokens
│   │   ├── remedy/[slug]/       # Full remedy folio, cooking mode, safety engine panel
│   │   ├── states/              # State-by-state geographic index
│   │   ├── plants/              # Systematic botanical plant index
│   │   ├── saved/               # Offline Heirloom Drawer bookmarks & export
│   │   ├── contribute/          # Community submission portal with safety check questions
│   │   ├── admin/review/        # Practitioner moderation queue (BAMS/AYUSH/MBBS)
│   │   └── api/v1/              # RESTful endpoints for remedies, search, and submissions
│   ├── components/
│   │   ├── ArchiveExplorer.tsx  # Search bar, concern chips, apothecary drawer, pagination
│   │   ├── RemedyCard.tsx       # Apple Bento glass remedy card with botanical well & folio button
│   │   ├── RemedyIndexRow.tsx   # Classical ledger book index row layout
│   │   ├── BotanicalBreeze.tsx  # HTML5 Canvas falling Neem/Tulsi leaves with physics sway
│   │   ├── AyurvedicHeritage.tsx# Vedic shlokas, Tridosha guide, Masala Dani herbs
│   │   ├── SafetyPanel.tsx      # Code-enforced clinical warnings & red flags
│   │   ├── CookingMode.tsx      # Full-screen cooking view with Screen Wake Lock API
│   │   ├── ServingsIngredients.tsx # Dynamic servings scaler (1x, 2x, 4x)
│   │   ├── Header.tsx           # Diya logo, bilingual toggle, theme toggle, text size pill
│   │   └── Footer.tsx           # Archival notices, statutory disclaimers, cultural colophon
│   └── lib/
│       ├── i18n/                # Bilingual translation context (English / हिन्दी)
│       ├── safety/              # Deterministic safety rule engine and unit test suite
│       └── repository/          # Data access layer, filtering, indexing, and facets
├── public/
│   ├── manifest.json            # PWA manifest
│   └── sw.js                    # Service Worker caching strategy
└── vitest.config.ts             # Vitest test runner configuration
```

---

## 5. Work Accomplished & Refinements

### A. Data Layer Consolidation
- Centralized all repository datasets into the `/data/` root directory (`remedies.json`, `states.json`, `schema.ts`).
- Normalized botanical names to standard binomial format and enriched records with Kew POWO accession references.

### B. Apple Bento & Heritage Visual Overhaul
- Upgraded the interface from a generic SaaS appearance to an authentic **"Royal Indian Herbarium"** aesthetic.
- Implemented glassmorphic Bento cards featuring subtle copper borders, spring-animated hover blooms, and watermark botanical illustrations.
- Developed the `<BotanicalBreeze />` particle engine with 3D cosine-oscillating Neem and Tulsi leaves and golden turmeric pollen drift.

### C. UI & Layout Polishing
- **Remedy Card "Read Folio" Refinement:**
  - Resolved dark mode color mismatch: button now features an archival dark bronze surface (`dark:bg-[#27231F]`), warm gold border (`dark:border-[#C89D54]/40`), and copper-gold typography (`dark:text-[#E5A93B]`) that shifts to crimson on hover.
  - Eliminated card border collision and overflow by adjusting internal padding (`px-3 py-1.5 rounded-lg text-[13px] font-bold`) and applying text truncation to prep metadata.
- **Typography Scale Calibration:**
  - Standardized root base font size to a balanced `15px` scale (`sm: 13.5px`, `md: 15px`, `lg: 16.5px`) to prevent compounding font bloat.
  - Fine-tuned Remedy Card typography (+1px) to achieve optimal legibility across title, badges, botanical name, virya, and traditional uses.

### D. Performance & Verification
- 100% test coverage on safety rules (38/38 Vitest tests passing).
- Zero-error production build using Next.js 16 Turbopack compiler.

---

## 6. Getting Started Locally

### Prerequisites
- **Node.js:** `>= 20.0.0`
- **npm:** `>= 10.0.0`

### Installation & Execution
```bash
# Clone the repository
git clone <repository-url> hamare-nuskhe
cd hamare-nuskhe

# Install dependencies
npm install

# Run development server
npm run dev
```
Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

### Running Test Suites
```bash
# Execute unit tests
npm test

# Run production build verification
npm run build
```

---

## 7. Statutory & Legal Compliance

This project is constructed in strict adherence to Indian legal and regulatory frameworks governing medical and health communication:
1. **The Drugs and Magic Remedies (Objectionable Advertisements) Act, 1954:** Strictly prohibits claims that any home remedy cures or diagnoses chronic diseases. All preparations are cataloged purely as cultural folk traditions.
2. **The Digital Personal Data Protection Act, 2023 (DPDP Act):** All user bookmarks and saved remedies remain stored on the client side in local storage; zero personal health data is tracked, stored, or transmitted to remote servers.
3. **AYUSH Ethnobotanical Documentation Guidelines:** Respects traditional community knowledge ownership and adheres to academic digital humanities preservation standards.
