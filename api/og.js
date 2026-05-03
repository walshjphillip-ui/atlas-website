const { Resvg } = require("@resvg/resvg-js");

// Cache font across warm invocations
let _fontBuffer = null;

async function getFont() {
  if (_fontBuffer) return _fontBuffer;
  // Request Google Fonts with old UA to get TTF (not woff2)
  const css = await fetch("https://fonts.googleapis.com/css?family=Inter:wght@700;900", {
    headers: { "User-Agent": "Mozilla/4.0 (compatible; MSIE 5.0; Windows 95)" },
  }).then((r) => r.text());
  // Extract first font URL from CSS
  const url = css.match(/url\(([^)]+)\)/)?.[1];
  if (!url) throw new Error("Could not parse font URL");
  const buf = await fetch(url).then((r) => r.arrayBuffer());
  _fontBuffer = Buffer.from(buf);
  return _fontBuffer;
}

module.exports = async (req, res) => {
  try {
    const font = await getFont();

    const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs>
    <style>
      @font-face {
        font-family: 'Inter';
        font-weight: 700;
        src: url('data:font/truetype;base64,PLACEHOLDER');
      }
    </style>
    <radialGradient id="glow" cx="50%" cy="25%" r="65%">
      <stop offset="0%" stop-color="#6366f1" stop-opacity="0.28"/>
      <stop offset="100%" stop-color="#08080f" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="1200" height="630" fill="#08080f"/>
  <rect width="1200" height="630" fill="url(#glow)"/>

  <rect x="90" y="178" width="5" height="188" rx="3" fill="#6366f1" opacity="0.8"/>

  <text x="115" y="220" font-family="Inter, Arial, sans-serif" font-size="20" font-weight="700" fill="#818cf8" letter-spacing="8">ATLAS</text>
  <text x="115" y="298" font-family="Inter, Arial, sans-serif" font-size="60" font-weight="700" fill="#f0f0f8">The AI built for students</text>
  <text x="115" y="368" font-family="Inter, Arial, sans-serif" font-size="60" font-weight="700" fill="#818cf8">who follow the market.</text>
  <text x="115" y="428" font-family="Inter, Arial, sans-serif" font-size="22" fill="#6b7280">Morning brief  ·  Live markets  ·  Internship outreach  ·  Cover letters</text>

  <rect x="115" y="464" width="335" height="46" rx="23" fill="#6366f1" fill-opacity="0.12" stroke="#6366f1" stroke-opacity="0.4" stroke-width="1"/>
  <text x="282" y="493" font-family="Inter, Arial, sans-serif" font-size="17" font-weight="700" fill="#818cf8" text-anchor="middle">Free beta  ·  useatlasai.org</text>
</svg>`;

    const resvg = new Resvg(svg, {
      fitTo: { mode: "width", value: 1200 },
      font: {
        loadSystemFonts: false,
        fontBuffers: [font],
        defaultFontFamily: "Inter",
      },
    });

    const png = resvg.render().asPng();
    res.setHeader("Content-Type", "image/png");
    res.setHeader("Cache-Control", "public, max-age=3600");
    res.send(Buffer.from(png));
  } catch (e) {
    console.error("[og]", e.message);
    res.status(500).send("Error: " + e.message);
  }
};
