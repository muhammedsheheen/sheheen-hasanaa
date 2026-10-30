# Wedding Invitation Share Thumbnail

Custom link-preview thumbnail for the wedding invitation of **Muhammed Sheheen & Hazana Asharaf**
(Sunday, 29 November 2026 · Chaithanya Convention Centre, Cherpulassery).

The original invitation lives at https://sheheen-hasana.netlify.app/. This project:

- hosts the new 1200×630 thumbnail at `/share/wedding-invitation-thumbnail.jpg`, and
- serves the live invitation site through a proxy, with a Netlify Edge Function that points the
  page's Open Graph / Twitter image tags at the new thumbnail, so sharing this project's URL on
  WhatsApp shows the new preview.

## Key pieces

- `public/share/wedding-invitation-thumbnail.jpg` — the thumbnail served to WhatsApp and other apps
- `design/wedding-invitation-thumbnail.svg` — editable source for the thumbnail
- `design/reference-thumbnail.jpeg` — the original design it was based on
- `netlify/edge-functions/share-thumbnail.ts` — rewrites the preview image tags
- `netlify.toml` — proxy to the invitation site

## Using the thumbnail on the original site

Replace the `og:image` tag in the invitation site's `<head>` with:

```html
<meta property="og:image" content="https://website-thumbnail-update.netlify.app/share/wedding-invitation-thumbnail.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
```

(Or copy the JPG into that site's `public/` folder and reference it there.)

## Editing the thumbnail

The SVG uses Amiri, Cormorant Garamond, Cormorant Infant (digits) and Pinyon Script from Google Fonts.
Install those fonts, then:

```bash
rsvg-convert -w 1200 -h 630 design/wedding-invitation-thumbnail.svg -o /tmp/og.png
convert /tmp/og.png -strip -interlace Plane -quality 90 public/share/wedding-invitation-thumbnail.jpg
```

## Running locally

```bash
netlify dev --port 8889
```

WhatsApp caches previews per URL; if an old preview appears, share the link with a query string
(e.g. `?v=2`) to force a fresh one.
