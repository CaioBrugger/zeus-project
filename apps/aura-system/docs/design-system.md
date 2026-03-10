# Aura AI Developer Design System Extraction

Source audited:
- `https://ai-developer.aura.build/`
- downloaded HTML: `aura-site-inline.html`
- downloaded CSS bundle: `aura-site.css`
- downloaded JS bundle: `aura-site.js`

## Extraction Summary

This system is a clean AI SaaS landing page built on a tokenized Tailwind-style foundation with a restrained monochrome base and a blue action layer.

Core signals extracted from the source:

- typography defaults to `Inter`
- neutral grayscale foundation via HSL tokens
- primary accent around `#2563eb` / `#3b82f6`
- radius baseline of `0.5rem`
- strong use of subtle layered shadows
- sticky blurred navigation
- premium CTA treatment with animated conic-gradient border
- airy landing-page layout with large containers and generous spacing
- section pattern: hero, logos/proof, features, workflow, pricing, testimonials, footer

## Atomic Design Mapping

### Atoms

- tokens
- headings
- paragraphs
- tags
- primary and secondary buttons
- shiny CTA
- cards
- dividers

### Molecules

- navigation brand cluster
- metric card
- feature card
- workflow step
- pricing card
- testimonial card
- token card

### Organisms

- sticky navigation
- hero block
- metrics grid
- feature grid
- workflow band
- pricing section
- testimonials section
- token gallery
- guideline matrix
- footer

### Templates

- AI SaaS landing page template
- design system documentation page

## Token Guidelines

### Color

- neutrals are the base system; use them for surfaces, text, borders, and hierarchy
- blue is the primary action color; keep it concentrated in CTAs, highlights, links, charts, and active states
- do not overuse saturated accents outside action moments
- use white and near-white cards to preserve the product-demo feel

### Typography

- `Inter` is the operational sans for body and interface
- display sizes use the same family with stronger negative tracking
- serif is optional for editorial emphasis only, not as default body style
- mono is reserved for tokens, code, and technical snippets

### Spacing

- the system feels premium because of breathing room; default to `16, 24, 32, 48, 64px` rhythm
- section spacing should feel generous and calm
- cards should have internal padding between `20px` and `24px`

### Radius

- base radius: `8px`
- medium radius: `12px`
- large radius: `16px`
- extra large cards: `24px`
- pill buttons and badges use full rounded values

### Shadows

- use multi-layered, low-opacity shadows
- prefer soft elevation instead of hard dark drops
- primary CTA can combine outer elevation with subtle inset highlight

### Motion

- transitions should use eased, premium movement
- default hover behavior is slight lift or emphasis, not aggressive scale
- spotlight animations and conic borders are reserved for hero CTAs and not repeated everywhere

### Borders

- borders are present almost everywhere but remain quiet
- default border opacity should stay light
- featured cards can intensify border color with a subtle accent tint

## Reuse Notes

This extraction recreates the logic and feel of the source site, not a byte-for-byte clone.
Use this system for:

- AI SaaS landing pages
- product launches
- pricing pages
- design system seeds for new products
- React/Next implementation starting points

## Deliverables Included

### Static system

- `styles/tokens.css`
- `styles/atoms.css`
- `styles/molecules.css`
- `styles/organisms.css`
- `index.html`

### Component snippets

- `components/nav.html`
- `components/hero.html`
- `components/button.html`
- `components/card-feature.html`
- `components/card-pricing.html`
- `components/card-testimonial.html`

### Token exports

- `tokens.json`
- `tailwind.tokens.js`

### React kit

- `react/components/AuraButton.tsx`
- `react/components/AuraFeatureCard.tsx`
- `react/components/AuraPricingCard.tsx`
- `react/components/AuraHero.tsx`
- `react/app.page.tsx`
- pricing pages
- solution overview pages
- technical marketing pages with high clarity
