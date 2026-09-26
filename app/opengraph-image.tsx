import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";

export const alt = `${profile.name} — ${profile.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const { headline, headlineAccent } = profile;
  const at = headlineAccent ? headline.indexOf(headlineAccent) : -1;
  const parts =
    headlineAccent && at !== -1
      ? [headline.slice(0, at).trim(), headlineAccent, headline.slice(at + headlineAccent.length).trim()]
      : [headline, "", ""];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(16,185,129,0.22), #09090b 70%)",
          color: "#ededef",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "#ededef",
              color: "#09090b",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
              fontWeight: 700,
            }}
          >
            MA
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 30, fontWeight: 600 }}>{profile.name}</div>
            <div style={{ fontSize: 22, color: "#a1a1aa" }}>{profile.title}</div>
          </div>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", fontSize: 76, fontWeight: 700, letterSpacing: -3, lineHeight: 1.05 }}>
          <span>{parts[0]}</span>
          {parts[1] && <span style={{ color: "#34d399", margin: "0 20px" }}>{parts[1]}</span>}
          <span>{parts[2]}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 24, color: "#85858f" }}>
          <div style={{ width: 10, height: 10, borderRadius: 10, background: "#34d399" }} />
          {[profile.location, ...profile.coreStack].join(" · ")}
        </div>
      </div>
    ),
    size,
  );
}
