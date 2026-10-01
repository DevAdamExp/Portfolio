/**
 * The MA_ mark: M flows into A in one stroke, ending in a marigold cursor.
 * Same geometry as app/icon.svg (the favicon), so the two always match.
 */
export default function Logo({ className = "size-10", blink = false }: { className?: string; blink?: boolean }) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden className={className}>
      <rect width="100" height="100" rx="24" fill="var(--ink)" />
      <path
        d="M18 69V32l16 21 16-21v37l16-37 16 37M58.5 56h15"
        fill="none"
        stroke="var(--paper)"
        strokeWidth="8.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="73" y="76" width="12" height="5" rx="2.5" fill="var(--marigold)" className={blink ? "cursor-blink" : undefined} />
    </svg>
  );
}
