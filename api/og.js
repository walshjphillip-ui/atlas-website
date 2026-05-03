const { Resvg } = require("@resvg/resvg-js");

module.exports = async (req, res) => {
  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs>
    <radialGradient id="glow" cx="50%" cy="25%" r="65%">
      <stop offset="0%" stop-color="#6366f1" stop-opacity="0.28"/>
      <stop offset="100%" stop-color="#08080f" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="#08080f"/>
  <rect width="1200" height="630" fill="url(#glow)"/>

  <!-- Left accent bar -->
  <rect x="90" y="180" width="5" height="180" rx="3" fill="#6366f1" opacity="0.7"/>

  <!-- ATLAS wordmark -->
  <text x="115" y="222" font-family="Arial Black, Arial, sans-serif" font-size="22" font-weight="900" fill="#818cf8" letter-spacing="10">ATLAS</text>

  <!-- Main headline line 1 -->
  <text x="115" y="302" font-family="Arial Black, Arial, sans-serif" font-size="58" font-weight="900" fill="#f0f0f8">The AI built for students</text>

  <!-- Main headline line 2 (accent color) -->
  <text x="115" y="368" font-family="Arial Black, Arial, sans-serif" font-size="58" font-weight="900" fill="#818cf8">who follow the market.</text>

  <!-- Subtitle -->
  <text x="115" y="430" font-family="Arial, sans-serif" font-size="22" fill="#6b7280">Morning brief  ·  Live markets  ·  Internship outreach  ·  Cover letters</text>

  <!-- Badge background -->
  <rect x="115" y="468" width="340" height="46" rx="23" fill="#6366f1" fill-opacity="0.12" stroke="#6366f1" stroke-opacity="0.35" stroke-width="1"/>
  <!-- Badge text -->
  <text x="285" y="497" font-family="Arial, sans-serif" font-size="17" font-weight="700" fill="#818cf8" text-anchor="middle">Free beta  ·  useatlasai.org</text>
</svg>`;

  try {
    const resvg = new Resvg(svg, { fitTo: { mode: "width", value: 1200 } });
    const png = resvg.render().asPng();
    res.setHeader("Content-Type", "image/png");
    res.setHeader("Cache-Control", "public, max-age=3600");
    res.send(Buffer.from(png));
  } catch (e) {
    res.status(500).send("Image generation failed: " + e.message);
  }
};
