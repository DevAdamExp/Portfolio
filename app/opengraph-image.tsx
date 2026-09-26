import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";

export const alt = `${profile.name} — ${profile.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background: "#0b0b0c",
          color: "#ececee",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ fontSize: 64, fontWeight: 600, letterSpacing: -2 }}>{profile.name}</div>
          <div style={{ fontSize: 32, color: "#a1a1aa" }}>{profile.title}</div>
        </div>
        <div style={{ fontSize: 30, lineHeight: 1.4, color: "#ececee", maxWidth: 940 }}>{profile.headline}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 24, color: "#85858f" }}>
          <div style={{ width: 10, height: 10, borderRadius: 10, background: "#34d399" }} />
          {profile.location}
        </div>
      </div>
    ),
    size,
  );
}
