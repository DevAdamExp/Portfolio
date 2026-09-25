import type { IconType } from "react-icons";
import {
  SiDapr,
  SiDjango,
  SiDocker,
  SiFastapi,
  SiFlydotio,
  SiFramer,
  SiGit,
  SiGithubactions,
  SiGooglemaps,
  SiJavascript,
  SiLangchain,
  SiMongodb,
  SiNextdotjs,
  SiNginx,
  SiNodedotjs,
  SiOpenai,
  SiPostgresql,
  SiPython,
  SiReact,
  SiRedis,
  SiResend,
  SiStripe,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiZapier,
} from "react-icons/si";

/**
 * Logos for technologies, keyed by display name.
 *
 * To add one:
 *  - If it exists in Simple Icons (https://react-icons.github.io/react-icons/icons/si/),
 *    import it above and add `"Name": { icon: SiName }`.
 *  - Otherwise drop a monochrome SVG in /public/logos/tech/ and add
 *    `"Name": { logo: "/logos/tech/name.svg" }`.
 * Names without an entry render with a neutral initial instead.
 */
const registry: Record<string, { icon?: IconType; logo?: string }> = {
  Python: { icon: SiPython },
  TypeScript: { icon: SiTypescript },
  JavaScript: { icon: SiJavascript },
  "Next.js": { icon: SiNextdotjs },
  React: { icon: SiReact },
  "Tailwind CSS": { icon: SiTailwindcss },
  "Framer Motion": { icon: SiFramer },
  FastAPI: { icon: SiFastapi },
  Django: { icon: SiDjango },
  "Node.js": { icon: SiNodedotjs },
  PostgreSQL: { icon: SiPostgresql },
  MongoDB: { icon: SiMongodb },
  Redis: { icon: SiRedis },
  OpenAI: { icon: SiOpenai },
  "OpenAI Agents SDK": { icon: SiOpenai },
  LangChain: { icon: SiLangchain },
  LangGraph: { icon: SiLangchain },
  Docker: { icon: SiDocker },
  Nginx: { icon: SiNginx },
  Dapr: { icon: SiDapr },
  "GitHub Actions": { icon: SiGithubactions },
  Vercel: { icon: SiVercel },
  "Fly.io": { icon: SiFlydotio },
  Git: { icon: SiGit },
  Stripe: { icon: SiStripe },
  Resend: { icon: SiResend },
  Zapier: { icon: SiZapier },
  "Google Maps": { icon: SiGooglemaps },
};

const normalise = (name: string) => name.toLowerCase().replace(/[^a-z0-9]/g, "");
const lookup = new Map(Object.entries(registry).map(([name, entry]) => [normalise(name), entry]));

export function TechIcon({ name, className = "size-3.5" }: { name: string; className?: string }) {
  const entry = lookup.get(normalise(name));

  if (entry?.icon) {
    const Icon = entry.icon;
    return <Icon aria-hidden className={`shrink-0 ${className}`} />;
  }

  if (entry?.logo) {
    // eslint-disable-next-line @next/next/no-img-element -- tiny static SVG, no optimisation needed
    return <img src={entry.logo} alt="" aria-hidden className={`shrink-0 dark:invert ${className}`} />;
  }

  return (
    <span
      aria-hidden
      className={`inline-grid shrink-0 place-items-center rounded-[3px] border border-line-strong text-[9px] font-semibold leading-none ${className}`}
    >
      {name.charAt(0)}
    </span>
  );
}
