/**
 * The "adam." wordmark. The two a's carry < and > in their counters, so the
 * word quietly wraps the d in a tag: a<d>a. The marigold full stop closes it.
 * (The favicon is the extruded M in app/icon.svg.)
 */
export default function Wordmark({ className = "h-7 w-auto", animate = false }: { className?: string; animate?: boolean }) {
  const ink = "var(--ink)";
  const paper = "var(--paper)";
  const draw = animate ? "wm-chevron" : undefined;
  return (
    <svg viewBox="4 8 322 100" aria-hidden className={className}>
      <circle cx="40" cy="73" r="28" fill={ink} />
      <rect x="52" y="45" width="17" height="56" rx="8.5" fill={ink} />
      <path d="M49 61L35 73l14 12" pathLength={100} fill="none" stroke={paper} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" className={draw} />
      <circle cx="111" cy="73" r="28" fill={ink} />
      <rect x="123" y="12" width="17" height="89" rx="8.5" fill={ink} />
      <circle cx="110" cy="73" r="10" fill={paper} />
      <circle cx="182" cy="73" r="28" fill={ink} />
      <rect x="194" y="45" width="17" height="56" rx="8.5" fill={ink} />
      <path d="M175 61l14 12-14 12" pathLength={100} fill="none" stroke={paper} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" className={draw} />
      <path d="M232 101V70a17 17 0 0 1 34 0v31M266 70a17 17 0 0 1 34 0v31" fill="none" stroke={ink} strokeWidth="17" strokeLinecap="round" />
      <circle cx="318" cy="93" r="9" fill="var(--marigold)" className={animate ? "wm-dot" : undefined} />
    </svg>
  );
}
