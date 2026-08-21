# Luxury Gold & Obsidian Styling with Full-Website Dynamic Background Animation

Transform the ASIRI Event Management website to match the exact luxury aesthetic shown in the reference image—featuring royal gold typography, crown crest, ornate filigree dividers, the cursive "*Your Event, Our Passion*" tagline, and an interactive full-page background animation system with luminous golden silk waves, shimmering starlight particles, and volumetric lighting.

## User Review Required

> [!IMPORTANT]
> The reference design introduces a dedicated navigation flow (`Home`, `About Us`, `Services`, `Gallery`, `Testimonials`, `Contact Us`) with a top-right solid gold pill button (`Plan Your Event`) and a central hero section featuring the royal crown emblem, metallic gold "ASIRI EVENT MANAGEMENT" title, ornate filigree divider, and cursive "*Your Event, Our Passion*" tagline.
>
> We will add the newly featured **About Us** and **Testimonials** sections while maintaining all existing interactive tools (Custom Event Studio, Live Production Schedule, Budget Estimator, and Staff Operations Cockpit).

---

## Key Features & Visual Design

1. **Full-Website Dynamic Background Canvas Animation (`luxury-bg-canvas`)**:
   - **Golden Silk Waves / Luminous Ribbons**: Layered harmonic bezier sine curves drifting smoothly across the viewport with golden gradient fills and translucent edge glows.
   - **Twinkling Starlight & Bokeh Particles**: Multilayered particle engine with sparkling 4-point stars, golden ember dust, and soft bokeh orbs that drift and twinkle in real time.
   - **Top Volumetric Godray Spotlight**: Subtle ambient golden spotlight shining downward from the top center.
   - **Mouse Interaction**: Gentle particle parallax and interactive golden ripple glow following user cursor movement.
   - **High Performance**: Hardware-accelerated 60 FPS HTML5 Canvas with DPI/Retina scaling, throttled resize handling, and low CPU overhead.

2. **Hero Section Matching the Reference Image**:
   - **Royal Crown & Filigree Crest**: Ornate golden crown and vintage Victorian filigree motif atop the brand title.
   - **Metallic Gold Brand Typography**: Grand "ASIRI" with multi-stop gold foil gradient, 3D reflection, and warm spotlight glow.
   - **Tracked Subtitle**: "EVENT MANAGEMENT" with wide letter-spacing.
   - **Ornate Divider**: Vintage filigree flourish with horizontal gold rules and diamond accents.
   - **Script Tagline**: "*Your Event, Our Passion*" in flowing cursive script (`Great Vibes` / `Playfair Display`).
   - **CTA Button**: `[ 📅 PLAN YOUR EVENT ]` glass button with glowing gold border and shine hover effect.
   - **Mouse Scroll Indicator**: Animated mouse outline with rolling wheel dot, "SCROLL DOWN" tracking text, and down chevron.

3. **Complete Navigation Header**:
   - Left: Royal Brand Logo with Crown, "ASIRI" gold serif, and "EVENT MANAGEMENT" subtext.
   - Center: `Home`, `About Us`, `Services`, `Gallery`, `Testimonials`, `Contact Us`.
   - Right: Solid gold pill button `Plan Your Event` and discrete Staff Hub switch.

4. **New & Enhanced Luxury Sections**:
   - **About Us**: The story of ASIRI, heritage of royal Indian celebrations, and bespoke concierge philosophy.
   - **Testimonials & Client Praise**: Verified reviews and royal couples/corporate feedback with golden star ratings.
   - **Enhanced Gallery**: High-resolution showcase of grand weddings, cinematic shoots, and custom celebrations.
   - **Refined Styling across All Components**: Gold foil borders, glassmorphism cards, glowing badges, and inputs.

---

## Proposed Changes

### Core Structure & HTML

#### [MODIFY] [index.html](file:///d:/Asiri%20Website/index.html)
- Add Google Fonts for `Cinzel`, `Cinzel Decorative`, `Great Vibes`, and `Playfair Display`.
- Insert `<canvas id="luxury-bg-canvas">` at the root of the document for full-screen dynamic animations.
- Update header navigation bar with the exact links: `Home`, `About Us`, `Services`, `Gallery`, `Testimonials`, `Contact Us`, plus the solid gold pill button `Plan Your Event`.
- Update hero section to match the image structure: Crown crest, metallic gold "ASIRI", "EVENT MANAGEMENT", ornate filigree divider, cursive "*Your Event, Our Passion*", CTA button, and animated scroll-down mouse indicator.
- Add `<section id="about">` and `<section id="testimonials">` to provide a complete experience for the navigation links.
- Link all sections smoothly to the navigation items.

---

### Styling & Design System

#### [MODIFY] [styles.css](file:///d:/Asiri%20Website/styles.css)
- Add CSS rules for:
  - Gold metallic gradients (`--gold-metallic-gradient`, `--gold-foil-text`).
  - Royal crown and filigree vector ornaments.
  - Ornate horizontal dividers with central flourish.
  - Cursive tagline typography (`font-family: 'Great Vibes', cursive`).
  - Hero `[ 📅 PLAN YOUR EVENT ]` glowing glass button with hover shimmer.
  - Animated mouse scroll-down indicator with rolling wheel keyframes and pulsing chevron.
  - Full-page canvas container styling.
  - Section headers with gold filigree flourishes and metallic gradient headings.

---

### Logic & Canvas Background Engine

#### [MODIFY] [script.js](file:///d:/Asiri%20Website/script.js)
- Implement `initLuxuryBackgroundAnimation()`:
  - Fullscreen canvas setup with high DPI support.
  - Layered golden silk wave rendering using bezier curves with animated phase offsets.
  - Twinkling starlight particle system with variable alpha, sizes, star flare rendering, and gentle drift physics.
  - Golden bokeh particle rendering with soft radial gradients.
  - Interactive cursor parallax & glow tracking.
  - Smooth animation loop using `requestAnimationFrame`.
- Update navigation active state tracking on scroll (IntersectionObserver / scroll spy for `Home`, `About Us`, `Services`, `Gallery`, `Testimonials`, `Contact Us`).
- Ensure all interactive modals, custom event builder, budget calculator, and staff operations dashboard continue to work seamlessly.

---

## Verification Plan

### Automated / Syntax Verification
- Validate HTML, CSS, and JS for syntax errors and correct file references.

### Interactive Browser Verification (via Browser Subagent)
- Open the application in the browser:
  - Verify the hero section matches the reference image: crown crest, "ASIRI", "EVENT MANAGEMENT", ornate divider, "*Your Event, Our Passion*", `[ 📅 PLAN YOUR EVENT ]` button, and scroll down indicator.
  - Verify the dynamic background animation displays luminous golden silk waves, twinkling starlight particles, and smooth mouse interaction across the full website.
  - Verify smooth navigation across `Home`, `About Us`, `Services`, `Gallery`, `Testimonials`, `Contact Us`.
  - Test the `Plan Your Event` buttons, Custom Builder, Budget Calculator, and Staff Hub switch to ensure complete functionality.
