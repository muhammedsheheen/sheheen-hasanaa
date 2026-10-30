# AGENTS.md

## What this is
A tiny Netlify project (no framework, no build step) that gives the wedding invitation at
https://sheheen-hasana.netlify.app/ a custom WhatsApp / social share thumbnail. The source code of
the invitation site itself is NOT in this repo.

## Architecture
- `netlify.toml` — publishes `public/` and proxies everything else (`/*`, status 200) to the
  invitation site. Static files in `public/` shadow the proxy.
- `netlify/edge-functions/share-thumbnail.ts` — runs on HTML responses, strips existing
  `og:image*` / `twitter:image*` meta tags and injects ones pointing at
  `/share/wedding-invitation-thumbnail.jpg` (absolute URL built from the request origin).
  Asset paths are excluded so they stream straight through.
- `public/share/wedding-invitation-thumbnail.jpg` — 1200×630 progressive JPG (keep under ~300 KB;
  WhatsApp ignores large preview images).
- `design/` — editable SVG source and the reference image the design was based on.

## Conventions / decisions
- Thumbnail styling follows the live site: ivory paper, gold-foil gradient text, Amiri for the
  Bismillah, Pinyon Script for names, Cormorant Garamond for body text. Digits use Cormorant
  Infant because Cormorant Garamond's old-style "11" reads like "II" and librsvg ignores
  `font-feature-settings`.
- Event details on the thumbnail: "Wedding Invitation", Muhammed Sheheen & Hazana Asharaf,
  Sunday, 29 November 2026 · 11:00 AM, Chaithanya Convention Centre, Cherpulassery.
- Re-render with `rsvg-convert` + ImageMagick (see README). Don't use AI image generation for
  this — it garbles text.
