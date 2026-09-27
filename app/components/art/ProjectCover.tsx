import type { CSSProperties } from "react";
import type { Project } from "@/content/types";
import { COVER, coverArt } from "@/lib/art";

/**
 * A generative painting for a project, drawn from its slug so it never
 * changes between builds. Products and client work get "Horizon" (one wave
 * band per step in the architecture); AI agents get "Signal" (arcs rising
 * like sound). It is decoration, never a stand-in for a screenshot.
 */
export default function ProjectCover({ project }: { project: Project }) {
  const art = coverArt({
    slug: project.slug,
    steps: project.architecture?.length ?? 4,
    motif: project.kind === "AI agent" ? "signal" : "horizon",
    scheme: project.cover?.scheme,
  });
  const { width, height } = COVER;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio={art.motif === "signal" ? "xMidYMax slice" : "xMidYMid slice"}
      className={`cover cover-${art.scheme}`}
      aria-hidden
    >
      <rect className="c-ground" width={width} height={height} />
      {art.motif === "horizon" ? (
        <>
          <circle className="c-sun" cx={art.sun.cx} cy={art.sun.cy} r={art.sun.r} />
          {art.bands.map((band, i) => (
            <g key={i} className={i === art.bands.length - 1 ? "c-front" : undefined}>
              <path className={`c-${i % 5}`} d={band.fill} />
              <path className="c-line" d={band.crest} />
            </g>
          ))}
        </>
      ) : (
        <g
          className="c-arcs"
          style={{ "--cx": `${art.center.cx}px`, "--cy": `${art.center.cy}px` } as CSSProperties}
        >
          {art.radii.map((r, i) => {
            const last = i === art.radii.length - 1;
            return (
              <g key={r}>
                <circle className={last ? "c-sun" : `c-${i % 5}`} cx={art.center.cx} cy={art.center.cy} r={r} />
                {!last && <circle className="c-line" cx={art.center.cx} cy={art.center.cy} r={r} />}
              </g>
            );
          })}
        </g>
      )}
    </svg>
  );
}
