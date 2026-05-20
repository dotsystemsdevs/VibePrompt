import { ImageResponse } from "next/og";

export const alt = "vibeprompt vs. the vibe coding tools — Replit, Lovable, Bolt, Cursor, Claude Code";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#09090b",
          padding: "72px 80px",
          fontFamily: "ui-monospace, monospace",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ width: "40px", height: "40px", borderRadius: "50%", backgroundColor: "#2563EB" }} />
          <span style={{ color: "#ffffff", fontSize: "22px", fontWeight: "700", letterSpacing: "-0.03em" }}>
            vibeprompt / vs-tools
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ display: "flex", flexDirection: "column", color: "#ffffff", fontSize: "70px", fontWeight: "800", lineHeight: "1.0", letterSpacing: "-0.04em" }}>
            <span>vibeprompt vs.</span>
            <span style={{ color: "#2563EB" }}>the tools.</span>
          </div>
          <div style={{ display: "flex", color: "#71717a", fontSize: "24px", fontWeight: "400" }}>
            Replit, Lovable, Bolt, Cursor, Claude Code, v0 — honest comparison.
          </div>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {["Claude Code", "Cursor", "Replit", "Lovable", "Bolt.new", "v0.dev", "Aider"].map((tool) => (
            <div
              key={tool}
              style={{
                display: "flex",
                alignItems: "center",
                border: "1px solid #27272a",
                padding: "7px 14px",
                color: "#a1a1aa",
                fontSize: "13px",
                letterSpacing: "0.04em",
              }}
            >
              {tool}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
