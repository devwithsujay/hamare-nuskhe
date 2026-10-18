# Design System & Editorial Philosophy
## हमारे नुस्खे / Hamare Nuskhe

---

## 1. Aesthetic Rationale: The Printed Field Guide

Most modern web applications look like software marketing landing pages—decorated with neon gradients, floating colored orbs, rounded cards with heavy drop shadows, and synthetic emoji bullets.

**हमारे नुस्खे** intentionally rejects that aesthetic. It is styled like a **printed ethnobotanical field guide or an editorial food-and-plants journal**, designed by someone who cares deeply about typography, legibility, and cultural memory.

---

## 2. Design Tokens

| Token | Hex Value | Role in UI |
| :--- | :--- | :--- |
| **Parchment** | `#FDFBF7` | Primary canvas background in light mode |
| **Paper** | `#F5F0E6` | Margin notes column, card backgrounds, stamps |
| **Rule** | `#E7DEC8` | Hairline (1px) borders and dotted leader lines |
| **Ink** | `#1C1917` | High-contrast headlines and body text |
| **Sepia** | `#44403C` | Secondary notes, breadcrumbs, metadata |
| **Terracotta** | `#9C4129` | Editorial accents, drop-caps, active focus states |
| **Turmeric** | `#D97706` | Warm highlights and active concern chips |
| **Sage** | `#2D5A27` | Verified badges and botanical markers |
| **Caution Amber**| `#B45309` | Warning banner text and caution borders |
| **Deep Red** | `#9B1C1C` | High-risk medical alerts and infant botulism warnings |

### Warm Dark Mode (&quot;Lamp Light&quot;)
Rather than an unnatural stark `#000000` pitch black, dark mode uses warm charcoal tones (`#181715` canvas, `#22201D` paper, `#36332E` rules, `#F5F0E6` ink) resembling late-night reading under warm tungsten lamp light.

---

## 3. Typographic Scale

- **Headlines:** Playfair Display (editorial serif)
- **UI & Body:** Inter (17-18px body, 1.65 line-height, ~62 characters per line)
- **Native Indic Scripts:** Noto Sans / Serif across 11 Indian writing systems, rendered slightly larger than Latin subtitles so regional characters remain legible and uncompressed.
- **Folklore Drop-Cap:** 3.2rem serif initial letter in terracotta.
- **Index Leader Lines:** Dotted baseline connections between remedy titles and page metadata.

---

## 4. The Hard Bans List

To ensure the archive never looks synthetic or generic, the following patterns are **permanently forbidden**:
1. **NO gradients, glows, glassmorphism, blur effects, or neon highlights.**
2. **NO floating orbs, animated blobs, particle canvases, or decorative sparkles.**
3. **NO emojis used as bullet points or navigation icons.**
4. **NO uniform grids of identical rounded-2xl cards with heavy drop shadows.**
5. **NO marketing slogans (&quot;Unlock the secrets of Ayurveda&quot;, &quot;Discover the power of nature&quot;).**
6. **NO stock photography or AI-generated botanical images.**
