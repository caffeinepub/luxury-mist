# Luxury Mist

## Current State
A fine dining restaurant app (previously "The Golden Bistro") with hero, menu, about, reservations, and footer sections. The palette is warm black/cream/gold. Restaurant name is "The Golden Bistro".

## Requested Changes (Diff)

### Add
- Nothing structurally new

### Modify
- Rename restaurant from "The Golden Bistro" / "Golden Bistro" to "Luxury Mist" everywhere (nav logo, footer, page title, about section, contact quote, email fallback, etc.)
- Replace the entire color palette from warm gold/black to a greenery and mountain mist theme: deep forest green, sage green, mist grey-green, soft fog/off-white, with a mossy green accent replacing gold
- Update all hardcoded oklch color values in every component to use the new palette tokens
- Update index.css CSS variables to the new green/mist OKLCH palette
- Update tailwind.config.js shadow tokens (replace gold shadow with moss/green shadow)
- Hero images and about interior images have already been regenerated with greenery/mountain mist visuals

### Remove
- All gold/warm references in copy and colors

## Implementation Plan
1. Update index.css: replace all gold/warm palette OKLCH values with forest green, sage, mist tones
2. Update tailwind.config.js: replace shadow-gold with shadow-moss
3. Update Navigation.tsx: rename "Golden Bistro" → "Luxury Mist", replace gold color refs with green accent tokens
4. Update HeroSection.tsx: rename tagline context, replace gold color refs, update bottom fade to match new background
5. Update MenuSection.tsx: replace all gold color refs with green accent
6. Update AboutSection.tsx: rename "The Golden Bistro" → "Luxury Mist", replace gold color refs
7. Update ReservationsSection.tsx: replace all gold color refs, update email fallback address
8. Update Footer.tsx: rename "Golden Bistro" → "Luxury Mist", replace gold color refs
9. Update App.tsx: replace hardcoded toast style colors
