import { ImageResponse } from "@vercel/og";

export const config = { runtime: "edge" };

export default function handler() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#08080f",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px 90px",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        {/* Background glow */}
        <div
          style={{
            position: "absolute",
            top: "-80px",
            left: "40%",
            width: "700px",
            height: "500px",
            background:
              "radial-gradient(ellipse, rgba(99,102,241,0.22) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* ATLAS wordmark */}
        <div
          style={{
            fontSize: "22px",
            fontWeight: "800",
            color: "#818cf8",
            letterSpacing: "0.22em",
            marginBottom: "36px",
            display: "flex",
          }}
        >
          ATLAS
        </div>

        {/* Main headline */}
        <div
          style={{
            fontSize: "62px",
            fontWeight: "900",
            color: "#f0f0f8",
            lineHeight: "1.08",
            letterSpacing: "-0.03em",
            maxWidth: "950px",
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          The AI built for students&nbsp;
          <span style={{ color: "#818cf8" }}>who follow the market.</span>
        </div>

        {/* Subtitle */}
        <div
          style={{
            marginTop: "28px",
            fontSize: "24px",
            color: "#6b7280",
            maxWidth: "780px",
            display: "flex",
          }}
        >
          Morning brief · Live markets · Internship outreach · Cover letters
        </div>

        {/* Bottom badge */}
        <div
          style={{
            marginTop: "52px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            background: "rgba(99,102,241,0.12)",
            border: "1px solid rgba(99,102,241,0.35)",
            borderRadius: "99px",
            padding: "10px 28px",
            color: "#818cf8",
            fontSize: "18px",
            fontWeight: "600",
          }}
        >
          📈 Free · useatlasai.org
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
