import type { CSSProperties } from "react";
import { horizonLayers } from "@/lib/art";

/**
 * The slow, wavy shoreline along the bottom of the contact band: navy, deep
 * maroon, then the page colour itself, so the band melts into the page.
 */
export default function Horizon() {
  return (
    <div className="horizon motion" aria-hidden>
      {horizonLayers.map((layer, i) => (
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
            <svg viewBox={`0 0 ${layer.viewWidth} ${layer.viewHeight}`} preserveAspectRatio="none">
              <path className={`fill-h${i + 1}`} d={layer.fill} />
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
}

