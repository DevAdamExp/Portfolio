import type { YearMonth } from "@/content/types";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function parse(value: YearMonth) {
  const [year, month] = value.split("-").map(Number);
  return { year, month };
}

export function formatMonth(value: YearMonth) {
  const { year, month } = parse(value);
  return `${MONTHS[month - 1]} ${year}`;
}

/** "May 2026 – Present", "Jul – Nov 2025", "Aug 2024 – Jun 2025". */
export function formatPeriod(start: YearMonth, end?: YearMonth) {
  if (!end) return `${formatMonth(start)} – Present`;
  const s = parse(start);
  const e = parse(end);
  if (s.year === e.year) return `${MONTHS[s.month - 1]} – ${MONTHS[e.month - 1]} ${e.year}`;
  return `${formatMonth(start)} – ${formatMonth(end)}`;
}

export function initials(name: string) {
  return name
    .split(/[\s-]+/)
    .filter((word) => /^[A-Za-z]/.test(word) && word.toLowerCase() !== "the")
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");
}

export function hostname(url: string) {
  return new URL(url).hostname.replace(/^www\./, "");
}
