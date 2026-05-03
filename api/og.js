const sharp = require("sharp");

module.exports = async (req, res) => {
  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs>
    <radialGradient id="glow" cx="50%" cy="25%" r="65%">
      <stop offset="0%" stop-color="#6366f1" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#08080f" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="1200" height="630" fill="#08080f"/>
  <rect width="1200" height="630" fill="url(#glow)"/>

  <rect x="90" y="178" width="5" height="192" rx="3" fill="#6366f1" opacity="0.9"/>

  <text x="115" y="220" font-family="DejaVu Sans, Liberation Sans, Arial, sans-serif" font-size="20" font-weight="bold" fill="#818cf8" letter-spacing="8">ATLAS</text>
  <text x="115" y="298" font-family="DejaVu Sans, Liberation Sans, Arial, sans-serif" font-size="58" font-weight="bold" fill="#f0f0f8">The AI built for students</text>
  <text x="115" y="366" font-family="DejaVu Sans, Liberation Sans, Arial, sans-serif" font-size="58" font-weight="bold" fill="#818cf8">who follow the market.</text>
  <text x="115" y="426" font-family="DejaVu Sans, Liberation Sans, Arial, sans-serif" font-size="21" fill="#6b7280">Morning brief  ·  Live markets  ·  Internship outreach  ·  Cover letters</text>

  <rect x="115" y="462" width="335" height="46" rx="23" fill="#6366f1" fill-opacity="0.12" stroke="#6366f1" stroke-opacity="0.4" stroke-width="1"/>
  <text x="282" y="491" font-family="DejaVu Sans, Liberation Sans, Arial, sans-serif" font-size="17" font-weight="bold" fill="#818cf8" text-anchor="middle">Free beta · useatlasai.org</text>
</svg>`;

  try {
    const png = await sharp(Buffer.from(svg)).png().toBuffer();
    res.setHeader("Content-Type", "image/png");
    res.setHeader("Cache-Control", "public, max-age=3600");
    res.send(png);
  } catch (e) {
    console.error("[og]", e.message);
    res.status(500).send("Error: " + e.message);
  }
};
