import type { Config, Context } from "@netlify/edge-functions";

const THUMBNAIL_PATH = "/share/wedding-invitation-thumbnail.jpg";

// Swaps the invitation's link-preview image (WhatsApp, Facebook, X, etc.)
// for the custom wedding invitation thumbnail.
export default async (request: Request, context: Context) => {
  const response = await context.next();
  const type = response.headers.get("content-type") ?? "";
  if (!type.includes("text/html")) return response;

  const image = new URL(THUMBNAIL_PATH, request.url).href;
  const tags = [
    `<meta property="og:image" content="${image}">`,
    `<meta property="og:image:secure_url" content="${image}">`,
    `<meta property="og:image:type" content="image/jpeg">`,
    `<meta property="og:image:width" content="1200">`,
    `<meta property="og:image:height" content="630">`,
    `<meta property="og:image:alt" content="Wedding invitation of Muhammed Sheheen and Hazana Asharaf, Sunday 29 November 2026 at Chaithanya Convention Centre, Cherpulassery">`,
    `<meta name="twitter:image" content="${image}">`,
  ].join("");

  const html = (await response.text())
    .replace(/<meta\s+(?:property|name)="(?:og:image[^"]*|twitter:image[^"]*)"[^>]*>\s*/gi, "")
    .replace(/<head([^>]*)>/i, `<head$1>${tags}`);

  const headers = new Headers(response.headers);
  headers.delete("content-length");
  headers.delete("content-encoding");
  return new Response(html, { status: response.status, headers });
};

export const config: Config = {
  path: "/*",
  excludedPath: ["/share/*", "/assets/*", "/fonts/*", "/images/*", "/.netlify/*"],
};
