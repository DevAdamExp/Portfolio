import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";

export const alt = `${profile.name} — ${profile.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// The "velvet night" palette from globals.css.
const bg = "#0b0e15";
const fg = "#f2f1ee";
const muted = "#c6c7cf";
const subtle = "#9a9caa";

export default function OpengraphImage() {
  const [lead, clause] = profile.headline.split(" — ");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: bg,
          color: fg,
          borderTop: "12px solid #7b1e34",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ fontSize: 60, fontWeight: 600, letterSpacing: -2 }}>{profile.name}</div>
          <div style={{ fontSize: 30, color: muted }}>{profile.title}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 38, lineHeight: 1.25, maxWidth: 980 }}>
          <span>{lead}</span>
          {clause && <span style={{ color: subtle }}>— {clause}</span>}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 24, color: subtle }}>
          <div style={{ width: 10, height: 10, borderRadius: 10, background: "#6ccb9a" }} />
          {profile.location}
        </div>
      </div>
    ),
    size,
  );
}
