"use client";

import { useId, type CSSProperties } from "react";

/**
 * The living wordmark: one set of inflated shapes that reads "code" and "adam.".
 *
 *   c + stem      → a      (stem rises)
 *   o + tall stem → d      (stem rises)
 *   d − ascender  → a      (ascender sinks)
 *   e             → m      (e sinks, m rises)
 *
 * Geometry: stroke 26, bowls r 26 (centre line) on y 72, baseline 111,
 * x-height 33, letters 2 apart. A soft "goo" filter melts the joins so the
 * letters read as one inflated shape. Every change grows from or sinks into
 * the baseline, letter by letter. Loads as "code", settles as "adam.";
 * hover flips back to "code". Reduced motion: it reads "adam.".
 */
const order = (i: number) => ({ "--o": i }) as CSSProperties;

export default function Wordmark({ className = "h-9 w-auto" }: { className?: string }) {
  const goo = `goo-${useId().replace(/:/g, "")}`;
  return (
    <svg viewBox="-4 -18 380 138" aria-hidden className={`wm ${className}`}>
      <defs>
        <filter id={goo} x="-10%" y="-20%" width="120%" height="140%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2.6" result="b" />
          <feColorMatrix in="b" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 24 -10" />
        </filter>
      </defs>
      <g filter={`url(#${goo})`} fill="none" stroke="var(--ink)" strokeWidth="26" strokeLinecap="round">
        {/* 1 · c → a */}
        <g transform="rotate(-3 45 72)">
          <path d="M57.4 53.6A26 26 0 1 0 57.4 90.4" />
          <path className="wm-rise" style={order(0)} d="M65 98V46" />
        </g>
        {/* 2 · o → d */}
        <g transform="rotate(2 125 72)">
          <circle cx="119" cy="72" r="26" />
          <path className="wm-rise" style={order(1)} d="M145 98V0" />
        </g>
        {/* 3 · d → a */}
        <g transform="rotate(-2 205 72)">
          <circle cx="199" cy="72" r="26" />
          <path className="wm-drop" style={order(2)} d="M225 98V0" />
        </g>
        {/* 4 · e → m */}
        <g transform="rotate(3 289 72)">
          <g className="wm-sink" style={order(3)}>
            <path d="M319 70A30 30 0 1 0 312 92" />
            <path d="M259 67h60" strokeWidth="10" strokeLinecap="butt" />
          </g>
          <path className="wm-rise" style={order(3)} d="M253 98V64a18 18 0 0 1 36 0v34M289 64a18 18 0 0 1 36 0v34" />
        </g>
      </g>
      <circle className="wm-dot" style={order(4)} cx="357" cy="98" r="13" fill="var(--marigold)" />
    </svg>
  );
}
