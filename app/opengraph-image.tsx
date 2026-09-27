import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";
import { HERO, heroStill } from "@/lib/art";

export const alt = `${profile.name} — ${profile.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// The "velvet night" palette and the painting's dark colours, from globals.css.
const ink = "#0e1119";
const paper = "#f4efe7";
const muted = "#cfc8be";
const subtle = "#a39c94";
const rose = "#eba3b1";
const bands = ["#3a4e80", "#7a2236", "#22345e", "#4e1222", "#07090f"];

/** Newsreader as TTF from Google Fonts (Satori can't read woff2). Falls back to the default font offline. */
async function newsreader(weight: number, italic = false) {
  try {
    const css = await fetch(
      `https://fonts.googleapis.com/css2?family=Newsreader:ital,wght@${italic ? 1 : 0},${weight}&display=swap`,
    ).then((res) => res.text());
    const url = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
    return url ? await fetch(url).then((res) => res.arrayBuffer()) : null;
  } catch {
    return null;
  }
}

export default async function OpengraphImage() {
  const [regular, italic] = await Promise.all([newsreader(500), newsreader(400, true)]);
  const fonts = [
    regular && { name: "Newsreader", data: regular, weight: 500 as const, style: "normal" as const },
    italic && { name: "Newsreader", data: italic, weight: 400 as const, style: "italic" as const },
  ].filter((font) => !!font);
  const serif = fonts.length ? "Newsreader" : undefined;
  const [lead, clause] = profile.headline.split(" — ");

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: ink, color: paper, padding: 64, gap: 56 }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ fontFamily: serif, fontSize: 72, fontWeight: 500, letterSpacing: -2, lineHeight: 1 }}>
              {profile.name}
            </div>
            <div style={{ fontSize: 28, color: muted }}>{profile.title}</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", fontFamily: serif, fontSize: 36, lineHeight: 1.2 }}>
            <span>{lead}</span>
            {clause && <span style={{ fontStyle: "italic", color: rose }}>{clause}</span>}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 22, color: subtle }}>
            <div style={{ width: 10, height: 10, borderRadius: 10, background: "#6ccb9a" }} />
            {profile.location}
          </div>
        </div>
        <div style={{ display: "flex", padding: 12, background: "#151a25", border: "1px solid rgba(244,239,231,0.2)" }}>
          <svg width={386} height={478} viewBox={`0 0 ${HERO.width} ${HERO.height}`} preserveAspectRatio="xMidYMid slice">
            <rect width={HERO.width} height={HERO.height} fill="#121a2e" />
            <circle cx={HERO.sun.cx} cy={HERO.sun.cy} r={HERO.sun.r} fill="#c8435b" />
            {heroStill.map((band, i) => (
              <g key={i}>
                <path d={band.fill} fill={bands[i]} />
                <path d={band.crest} fill="none" stroke="rgba(244,239,231,0.38)" strokeWidth={3} />
              </g>
            ))}
          </svg>
        </div>
      </div>
    ),
    { ...size, fonts: fonts.length ? fonts : undefined },
  );
}
