// perks0934-site — teaser gate wrapper around the self-contained design artifact.
//
// The design ships as one offline-ready index.html (a .dc.html runtime bundle).
// Teaser mode is a real prop in that bundle (`teaser`, default true): when on,
// only the hero renders and the dark-mode toggle is hidden. We keep the artifact
// byte-for-byte and flip the flag server-side so the full site can be lit up
// later with a config change instead of a rebuild.
//
// Resolution order for "show the full site":
//   1. ?full=1  (any non-empty, non-"0"/"false" value) — per-request override
//   2. env.TEASER === "false" — the public default
// Otherwise: teaser (hero only).

const TEASER_DEFAULT_TRUE = "&quot;default&quot;:true"; // the (unique) teaser prop default in data-props
const TEASER_DEFAULT_FALSE = "&quot;default&quot;:false";
const TEASER_FALLBACK_TRUE = "this.props.teaser ?? true"; // appears twice (showRest, ctrlDisplay)
const TEASER_FALLBACK_FALSE = "this.props.teaser ?? false";

function wantsFull(url, env) {
  const p = url.searchParams.get("full");
  if (p !== null && p !== "0" && p !== "false") return true;
  return (env.TEASER ?? "true") === "false";
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Only the HTML document is gated; everything else (og-image, favicon,
    // future /img and video assets) is served straight from ASSETS.
    if (url.pathname !== "/" && url.pathname !== "/index.html") {
      return env.ASSETS.fetch(request);
    }

    const res = await env.ASSETS.fetch(new URL("/index.html", url));
    let html = await res.text();

    if (wantsFull(url, env)) {
      html = html
        .replace(TEASER_DEFAULT_TRUE, TEASER_DEFAULT_FALSE)
        .split(TEASER_FALLBACK_TRUE)
        .join(TEASER_FALLBACK_FALSE);
    }

    return new Response(html, {
      headers: {
        "content-type": "text/html; charset=utf-8",
        // Keep the gate responsive to config/param changes; artifact is small.
        "cache-control": "no-store",
      },
    });
  },
};
