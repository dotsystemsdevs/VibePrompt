import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "vibeprompt fixes — field-tested problems with tactical answers";
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
            vibeprompt / fixes
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ color: "#ffffff", fontSize: "76px", fontWeight: "800", lineHeight: "1.0", letterSpacing: "-0.04em" }}>
            What goes wrong
            <br />
            <span style={{ color: "#2563EB" }}>(and how to fix it).</span>
          </div>
          <div style={{ color: "#71717a", fontSize: "24px", fontWeight: "400" }}>
            Field-tested problems indie builders hit, with the tactical answer for each.
          </div>
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          {["Build", "Ship", "Grow", "Earn", "Stay"].map((cat) => (
            <div
              key={cat}
              style={{
                display: "flex",
                alignItems: "center",
                border: "1px solid #27272a",
                padding: "8px 18px",
                color: "#a1a1aa",
                fontSize: "14px",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              {cat}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
