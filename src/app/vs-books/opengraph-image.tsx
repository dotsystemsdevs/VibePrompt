import { ImageResponse } from "next/og";

export const alt = "vibeprompt vs. the vibe coding books — free, web-native, continuously updated";
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
            vibeprompt / vs-books
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ color: "#ffffff", fontSize: "72px", fontWeight: "800", lineHeight: "1.0", letterSpacing: "-0.04em" }}>
            vibeprompt vs.
            <br />
            <span style={{ color: "#2563EB" }}>the vibe coding books.</span>
          </div>
          <div style={{ color: "#71717a", fontSize: "24px", fontWeight: "400" }}>
            How the free web-native option compares to Gene Kim & Yegge and Smykowski.
          </div>
        </div>

        <div style={{ display: "flex", gap: "12px" }}>
          {["Free", "Open source", "Updated weekly", "Web-native", "Indie-focused"].map((tag) => (
            <div
              key={tag}
              style={{
                display: "flex",
                alignItems: "center",
                border: "1px solid #27272a",
                padding: "8px 14px",
                color: "#a1a1aa",
                fontSize: "13px",
                letterSpacing: "0.05em",
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
