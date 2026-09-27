import type { CSSProperties } from "react";
import { site } from "@/content/site";
import { HERO, heroLayers } from "@/lib/art";
import MotionToggle from "../MotionToggle";

/**
 * "Groove No. 1" — the live painting beside the home page headline. Five wave
 * bands drift at their own pace under a velvet-red sun that rises once on
 * load. Each part is its own layer moved only with CSS transforms, so it
 * costs almost nothing to run. `still` renders the same composition without
 * motion (used on the 404 page).
 */
export default function GrooveArt({
  still = false,
  title = site.art.title,
  caption = site.art.caption,
}: {
  still?: boolean;
  title?: string;
  caption?: string;
}) {
  const { width, height, sun } = HERO;

  return (
    <figure>
      <div className="art-frame">
        <div className={`art ${still ? "" : "motion"}`} role="img" aria-label={site.art.label}>
          {/* The sun rises from behind the waves once, on load, then drifts slowly. */}
          <div className="art-sun-rise">
            <div className="art-sun">
              <svg viewBox={`0 0 ${width} ${height}`} aria-hidden>
                <circle className="fill-sun" cx={sun.cx} cy={sun.cy} r={sun.r} />
              </svg>
            </div>
          </div>
          {heroLayers.map((layer, i) => (
            <div
              key={i}
              className="art-bob"
              style={
                {
                  top: `${layer.top}%`,
                  height: `${layer.height}%`,
                  "--bob": `${layer.bob}s`,
                  "--bob-y": `${layer.bobY}%`,
                } as CSSProperties
              }
            >
              <div
                className="art-band"
                style={
                  {
                    width: `${layer.width}%`,
                    "--drift": `${layer.drift}s`,
                    "--from": `${layer.from}%`,
                    "--to": `${layer.to}%`,
                  } as CSSProperties
                }
              >
                <svg viewBox={`0 0 ${layer.viewWidth} ${layer.viewHeight}`} preserveAspectRatio="none" aria-hidden>
                  <path className={`fill-b${i + 1}`} d={layer.fill} />
                  <path className="art-line" d={layer.crest} />
                </svg>
              </div>
            </div>
          ))}
          <div className="art-grain" />
        </div>
      </div>
      <figcaption className="art-caption">
        <span className="art-caption-title">{title}</span>, {site.art.year} <span aria-hidden>—</span> {caption}
        {!still && (
          <>
            {" "}
            <MotionToggle className="link text-muted" />
          </>
        )}
      </figcaption>
    </figure>
  );
}
