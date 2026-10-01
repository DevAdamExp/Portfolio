"use client";

import { FiMoon, FiSun } from "react-icons/fi";

/**
 * Switches between the paper (light) and night (dark) notebook. The choice is
 * saved; until then the site follows the system setting. Where the browser
 * supports view transitions, the new theme spreads out from the button.
 * Both icons are rendered and CSS shows the right one, so server and client
 * markup always match.
 */
export default function ThemeToggle() {
  const toggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const root = document.documentElement;
    const isDark =
      root.dataset.theme === "dark" ||
      (!root.dataset.theme && matchMedia("(prefers-color-scheme: dark)").matches);
    const next = isDark ? "light" : "dark";
    const apply = () => {
      root.dataset.theme = next;
      try {
        localStorage.setItem("theme", next);
      } catch {}
    };

    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const doc = document as Document & { startViewTransition?: (cb: () => void) => unknown };
    if (!doc.startViewTransition || reduce) return apply();

    const r = e.currentTarget.getBoundingClientRect();
    const x = r.left + r.width / 2;
    const y = r.top + r.height / 2;
    root.style.setProperty("--theme-x", `${x}px`);
    root.style.setProperty("--theme-y", `${y}px`);
    root.style.setProperty("--theme-r", `${Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))}px`);
    root.dataset.themeSwitching = "";
    const t = doc.startViewTransition(apply) as { finished?: Promise<void> };
    t.finished?.finally(() => delete root.dataset.themeSwitching);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Switch light or dark theme"
      className="theme-toggle grid size-11 shrink-0 place-items-center rounded-full border-[1.5px] border-ink bg-surface transition-transform duration-300 ease-[var(--ease-spring)] hover:-rotate-12"
    >
      <FiMoon className="icon-moon size-[18px]" aria-hidden />
      <FiSun className="icon-sun size-[18px]" aria-hidden />
    </button>
  );
}
