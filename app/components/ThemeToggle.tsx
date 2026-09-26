"use client";

import { FiMoon, FiSun } from "react-icons/fi";

/** Icons swap via CSS on data-theme, so server and client markup always match. */
export default function ThemeToggle() {
  const toggle = () => {
    const root = document.documentElement;
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle colour theme"
      className="grid size-8 place-items-center rounded-md text-muted transition-colors hover:bg-surface-hover hover:text-fg"
    >
      <FiSun className="hidden size-4 dark:block" aria-hidden />
      <FiMoon className="size-4 dark:hidden" aria-hidden />
    </button>
  );
}
