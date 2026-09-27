"use client";

/**
 * Pauses and resumes the site's continuous motion (the painting and the
 * horizon). The choice is saved and restored before paint by the script in
 * layout.tsx; the label swaps via CSS on data-motion, so server and client
 * markup always match. Hidden when the visitor prefers reduced motion.
 */
export default function MotionToggle({ className = "" }: { className?: string }) {
  const toggle = () => {
    const root = document.documentElement;
    const paused = root.dataset.motion === "paused";
    if (paused) delete root.dataset.motion;
    else root.dataset.motion = "paused";
    try {
      localStorage.setItem("motion", paused ? "running" : "paused");
    } catch {}
  };

  return (
    <button type="button" onClick={toggle} className={`motion-toggle cursor-pointer ${className}`}>
      <span className="motion-label-pause">Pause</span>
      <span className="motion-label-play">Play</span>
      <span className="sr-only"> animation</span>
    </button>
  );
}
