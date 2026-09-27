/**
 * Geometry for the site's art: the live hero painting, the horizon strip on
 * the contact band and the generative project covers. Pure functions, run at
 * build time; the components in app/components/art render the results as
 * static SVG and CSS animates them.
 */

const round = (n: number) => Math.round(n * 10) / 10;

interface Wave {
  /** Width the wave must cover, in SVG units. */
  width: number;
  /** Distance between two crests. */
  period: number;
  /** Height of a crest above the base line. */
  amp: number;
  /** Vertical centre of the wave. */
  base: number;
  /** 0–1, shifts the wave horizontally by a fraction of its period. */
  phase?: number;
  /** Where the filled shape closes at the bottom. */
  bottom: number;
}

/**
 * A periodic wave, y = base + amp·cos(2π(x/period + phase)), drawn as cubic
 * Béziers between extrema (handles at 0.18·period look like a true sine),
 * filled down to `bottom`. Because the period is exact, a layer that is
 * `width + period` wide and slides by one period loops seamlessly.
 */
function wavePath({ width, period, amp, base, phase = 0, bottom }: Wave) {
  const handle = 0.18 * period;
  const first = Math.floor(2 * phase) - 1;
  const xAt = (k: number) => (k / 2 - phase) * period;
  const yAt = (k: number) => base + (k % 2 === 0 ? amp : -amp);

  let k = first;
  let x = xAt(k);
  let y = yAt(k);
  let d = `M${round(x)} ${round(y)}`;
  while (x < width) {
    const nx = xAt(k + 1);
    const ny = yAt(k + 1);
    d += `C${round(x + handle)} ${round(y)} ${round(nx - handle)} ${round(ny)} ${round(nx)} ${round(ny)}`;
    k++;
    x = nx;
    y = ny;
  }
  return { crest: d, fill: `${d}L${round(x)} ${bottom}L${round(xAt(first))} ${bottom}Z` };
}

/* ───────────────────────────────────────────────────────────────────────────
   Hero painting — "Groove No. 1", a 4:5 canvas of 1000 × 1250 units
   ─────────────────────────────────────────────────────────────────────────── */

export const HERO = { width: 1000, height: 1250, sun: { cx: 640, cy: 440, r: 220 } };

/**
 * Five bands, back to front. Front bands are shorter, faster and choppier,
 * which reads as depth; alternating directions make the slow "groove". Drift
 * and bob periods don't share factors, so the piece effectively never repeats.
 */
const HERO_BANDS = [
  { base: 640, amp: 62, period: 1100, phase: 0.0, drift: 110, dir: -1, bob: 17 },
  { base: 760, amp: 56, period: 900, phase: 0.35, drift: 84, dir: 1, bob: 19 },
  { base: 880, amp: 50, period: 760, phase: 0.15, drift: 66, dir: -1, bob: 23 },
  { base: 1000, amp: 44, period: 640, phase: 0.6, drift: 52, dir: 1, bob: 29 },
  { base: 1120, amp: 38, period: 540, phase: 0.3, drift: 44, dir: -1, bob: 13 },
] as const;

interface BandLayer {
  /** Layer box, as percentages of the canvas. */
  top: number;
  height: number;
  width: number;
  /** SVG viewBox size of the layer. */
  viewWidth: number;
  viewHeight: number;
  fill: string;
  crest: string;
  /** CSS animation values. */
  drift: number;
  from: number;
  to: number;
  bob: number;
  bobY: number;
}

/**
 * Each band is its own layer, cropped to the band's height and one period
 * wider than the canvas, so CSS can slide it by exactly one period.
 */
function bandLayers(
  bands: ReadonlyArray<{ base: number; amp: number; period: number; phase: number; drift: number; dir: number; bob: number }>,
  canvas: { width: number; height: number },
): BandLayer[] {
  // Layers run past the bottom edge so the gentle bob never opens a gap there.
  const overshoot = canvas.height * 0.06;
  return bands.map((band) => {
    const top = Math.max(0, band.base - band.amp - 8);
    const viewWidth = canvas.width + band.period;
    const viewHeight = canvas.height + overshoot - top;
    const { fill, crest } = wavePath({
      width: viewWidth,
      period: band.period,
      amp: band.amp,
      base: band.base - top,
      phase: band.phase,
      bottom: viewHeight,
    });
    const shift = (band.period / viewWidth) * 100;
    return {
      top: (top / canvas.height) * 100,
      height: (viewHeight / canvas.height) * 100,
      width: (viewWidth / canvas.width) * 100,
      viewWidth,
      viewHeight,
      fill,
      crest,
      drift: band.drift,
      from: band.dir < 0 ? 0 : -shift,
      to: band.dir < 0 ? -shift : 0,
      bob: band.bob,
      bobY: ((band.amp * 0.22) / viewHeight) * 100,
    };
  });
}

export const heroLayers = bandLayers(HERO_BANDS, HERO);

/** The painting as one still frame (full-canvas paths), for places that can't animate, like the social preview image. */
export const heroStill = HERO_BANDS.map((band) =>
  wavePath({ width: HERO.width, period: band.period, amp: band.amp, base: band.base, phase: band.phase, bottom: HERO.height }),
);

/* ───────────────────────────────────────────────────────────────────────────
   Horizon — the wavy shoreline at the bottom of the contact band
   ─────────────────────────────────────────────────────────────────────────── */

const HORIZON = { width: 1600, height: 220 };

export const horizonLayers = bandLayers(
  [
    { base: 70, amp: 28, period: 900, phase: 0.1, drift: 90, dir: -1, bob: 21 },
    { base: 120, amp: 24, period: 700, phase: 0.55, drift: 70, dir: 1, bob: 17 },
    { base: 170, amp: 20, period: 560, phase: 0.3, drift: 55, dir: -1, bob: 13 },
  ],
  HORIZON,
);

/* ───────────────────────────────────────────────────────────────────────────
   Project covers — the same slug always paints the same picture
   ─────────────────────────────────────────────────────────────────────────── */

const COVER_SCHEMES = ["paper", "navy", "wine", "ink"] as const;
export type CoverScheme = (typeof COVER_SCHEMES)[number];

/** FNV-1a, 32-bit. */
function hash(text: string) {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** Small seeded PRNG returning numbers in [0, 1). */
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export const COVER = { width: 1600, height: 1000 };

type CoverArt =
  | {
      motif: "horizon";
      scheme: CoverScheme;
      sun: { cx: number; cy: number; r: number };
      bands: { fill: string; crest: string }[];
    }
  | {
      motif: "signal";
      scheme: CoverScheme;
      center: { cx: number; cy: number };
      radii: number[];
    };

/**
 * "Horizon" for products and client work: one wave band per step in the
 * system's architecture, under a sun. "Signal" for AI agents: concentric
 * arcs rising from below the frame, like sound leaving a speaker.
 *
 * Keep the order of `rand()` calls fixed — changing it repaints every cover.
 * Add new draws at the end.
 */
export function coverArt({
  slug,
  steps,
  motif,
  scheme,
}: {
  slug: string;
  steps: number;
  motif: "horizon" | "signal";
  scheme?: CoverScheme;
}): CoverArt {
  const seed = hash(slug);
  const rand = mulberry32(seed);
  const between = (min: number, max: number) => min + rand() * (max - min);
  const resolved = scheme ?? COVER_SCHEMES[seed % COVER_SCHEMES.length];
  const { width: W, height: H } = COVER;

  if (motif === "signal") {
    const cx = Math.round(between(0.22, 0.4) * W);
    const cy = Math.round(between(1.0, 1.08) * H);
    const count = steps + 1;
    const rMax = between(0.95, 1.1) * H;
    const rMin = between(120, 170);
    const step = (rMax - rMin) / count;
    const radii = Array.from({ length: count + 1 }, (_, i) => Math.round(rMax - i * step));
    return { motif, scheme: resolved, center: { cx, cy }, radii };
  }

  const sun = {
    cx: Math.round(between(0.25, 0.75) * W),
    cy: Math.round(between(0.22, 0.4) * H),
    r: Math.round(between(130, 200)),
  };
  const top = between(0.42, 0.52) * H;
  const gap = (H - top) / (steps + 0.4);
  const bands = Array.from({ length: steps }, (_, i) => {
    const amp = between(22, 48);
    const period = between(700, 1500);
    const phase = rand();
    return wavePath({ width: W + 200, period, amp, base: top + i * gap, phase, bottom: H });
  });
  return { motif, scheme: resolved, sun, bands };
}
