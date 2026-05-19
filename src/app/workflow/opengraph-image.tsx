import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "vibeprompt workflow — 9-step interactive build loop from idea to shipped";
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
            vibeprompt / workflow
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ color: "#ffffff", fontSize: "72px", fontWeight: "800", lineHeight: "1.0", letterSpacing: "-0.04em" }}>
            From idea to shipped,
            <br />
            <span style={{ color: "#2563EB" }}>in 9 steps.</span>
          </div>
          <div style={{ color: "#71717a", fontSize: "24px", fontWeight: "400" }}>
            Interactive checklist. Progress saves locally. Pick up where you left off.
          </div>
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          {["Environment", "Research", "PRD", "Stack", "Context", "Build", "Quality", "Ship", "Iterate"].map((step, i) => (
            <div
              key={step}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                border: "1px solid #27272a",
                padding: "6px 12px",
                color: "#52525b",
                fontSize: "11px",
                letterSpacing: "0.05em",
              }}
            >
              <span style={{ color: "#3f3f46", fontFamily: "monospace" }}>0{i}</span>
              <span>{step}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
