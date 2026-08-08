---
name: Arctic Precision
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#3a3939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#bcc9cd'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#869397'
  outline-variant: '#3c494c'
  surface-tint: '#4cd7f4'
  primary: '#57e0fd'
  on-primary: '#00363f'
  primary-container: '#2ec4e0'
  on-primary-container: '#004d5a'
  inverse-primary: '#006879'
  secondary: '#ffed66'
  on-secondary: '#373100'
  secondary-container: '#e5d100'
  on-secondary-container: '#625900'
  tertiary: '#cfcfd0'
  on-tertiary: '#2f3131'
  tertiary-container: '#b3b4b4'
  on-tertiary-container: '#444646'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#a8edff'
  primary-fixed-dim: '#4cd7f4'
  on-primary-fixed: '#001f26'
  on-primary-fixed-variant: '#004e5b'
  secondary-fixed: '#fae527'
  secondary-fixed-dim: '#dcc800'
  on-secondary-fixed: '#201c00'
  on-secondary-fixed-variant: '#4f4700'
  tertiary-fixed: '#e2e2e2'
  tertiary-fixed-dim: '#c6c6c7'
  on-tertiary-fixed: '#1a1c1c'
  on-tertiary-fixed-variant: '#454747'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
typography:
  display-lg:
    fontFamily: Montserrat
    fontSize: 48px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Montserrat
    fontSize: 32px
    fontWeight: '800'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Montserrat
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-mono:
    fontFamily: Space Mono
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.2'
    letterSpacing: 0.05em
  button-text:
    fontFamily: Montserrat
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 8px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
  container-max: 1440px
---

## Brand & Style
The design system for this brand focuses on a premium industrial-tech aesthetic, blending the cold precision of high-end refrigeration with the sophisticated service of professional catering. The personality is authoritative, technical, and ultra-reliable.

The design style utilizes **Glassmorphism** and **Corporate Modern** influences. High-contrast surfaces are paired with translucent overlays and deep, ambient shadows to create a sense of mechanical depth. The UI should feel like a high-end control panel: tactile, responsive, and impeccably organized. The target audience is B2B professionals who value efficiency and durable quality.

## Colors
This design system defaults to **Dark Mode** to emphasize a "Premium Industrial" feel, using deep charcoal and black to allow the cyan and yellow accents to pop like illuminated displays.

- **Primary (Cyan/Turquoise):** Used for primary actions, technical highlights, and active states. Represents "cold" and "precision."
- **Secondary (Bright Yellow):** Used sparingly for high-attention call-outs, warnings, or "In Stock" indicators.
- **Neutrals:** A range of deep charcols (#121212, #1A1A1A) for surface layering, with crisp white for maximum legibility.
- **Glass Accents:** Use primary colors at 10-15% opacity with high backdrop blur for overlays and floating containers.

## Typography
Typography is treated as a structural element. 
- **Montserrat** (substituted for Poppins for a slightly sharper industrial edge) provides the geometric confidence required for headings.
- **Inter** ensures that dense product specifications and descriptions remain readable at any scale.
- **Space Mono** is used exclusively for "data points"—serial numbers, pricing, dimensions, and technical specs—to evoke a sense of engineering and precision.

## Layout & Spacing
The layout follows a **Fixed Grid** model for desktop to maintain a controlled, high-end editorial feel, switching to a fluid 4-column grid for mobile.

- **Desktop:** 12-column grid with 24px gutters. Large 64px outer margins to provide generous whitespace (breathability).
- **Modular Sections:** Content should be grouped in distinct card-based modules or sections separated by consistent 80px-120px vertical stacks to emphasize hierarchy.
- **Rhythm:** Use an 8px base unit for all padding and internal margins to ensure a tight, engineered alignment.

## Elevation & Depth
Depth is created through a "Stacking" logic rather than simple shadows.

1.  **Level 0 (Base):** Deep Black (#0A0A0A).
2.  **Level 1 (Cards):** Charcoal (#161616) with a 1px low-opacity Cyan border.
3.  **Level 2 (Modals/Overlays):** Glassmorphism effect. Background: Primary color at 5% opacity, Backdrop Blur: 12px, Border: 1px White at 10% opacity.
4.  **Shadows:** Use "Deep Frost" shadows—large 40px blur, 0% spread, and 30% opacity using a dark navy or charcoal tint rather than pure black.

## Shapes
The shape language is **Soft (0.25rem)**. While the brand is industrial, pure sharp corners are avoided to maintain a "high-end consumer electronics" feel. 

- **Primary Buttons:** Subtle 4px radius.
- **Status Badges:** Fully pill-shaped to contrast against the rigid structural elements.
- **Inputs:** Square corners with a very slight 2px rounding to look like machined metal components.

## Components

### Buttons
- **Primary:** Solid Cyan (#2EC4E0) with Black text. No gradient. High-contrast hover (shifts to White).
- **Secondary:** Ghost style. 1px Cyan border, Transparent background, Cyan text.
- **Ghost:** No border. White text. Yellow underline or icon accent on hover.

### Badges & Status
- **Stock Status:** Space Mono text. Green for "In Stock," Yellow for "Limited," Red for "Out of Stock." Small circular dot indicator.
- **Categories:** Dark grey background, subtle Cyan top-border.

### Form Inputs
- **Style:** Floating labels that shrink and move to the top border on focus.
- **Focus State:** 1px Cyan border with a soft Cyan outer glow (glow spread 4px).
- **Monospaced Data:** Use Space Mono for numeric inputs (dimensions, quantity).

### Cards (Product/Category)
- **Visuals:** Use a 1px border (#FFFFFF 10%) to define the edge against the dark background. 
- **Interaction:** On hover, the border color shifts to Cyan and the "Deep Frost" shadow intensity increases.
- **Product Images:** Should be isolated on transparent or neutral grey backgrounds for a "catalog" look.

### Navigation
- **Header:** Glassmorphic blur background. Top-aligned thin Cyan line (2px) to denote the "top" of the machine.
- **Active State:** Cyan underline with a small "snowflake" icon or dot indicator.