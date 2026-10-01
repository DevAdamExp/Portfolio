import type { ComponentType, CSSProperties, SVGProps } from "react";
import {
  SiAnthropic,
  SiDapr,
  SiElevenlabs,
  SiExpo,
  SiFirebase,
  SiGooglecloud,
  SiGooglegemini,
  SiJest,
  SiPydantic,
  SiPytest,
  SiSqlalchemy,
  SiTwilio,
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
import { SiCrewai, SiLanggraph, SiLivekit, SiModelcontextprotocol } from "./brand-icons";

type Icon = ComponentType<SVGProps<SVGSVGElement>>;

interface TechEntry {
  icon?: Icon;
  /** SVG in /public/logos/tech/, for tools without a Simple Icons logo. */
  logo?: string;
  /** Brand colour. Leave out for black-and-white brands; they follow the text colour. */
  color?: string;
  /** Lighter variant for dark mode when the brand colour is too dark to see. */
  darkColor?: string;
}

/**
 * Logos and brand colours for technologies, keyed by display name.
 *
 * To add one:
 *  - If it exists in Simple Icons (https://react-icons.github.io/react-icons/icons/si/),
 *    import it above and add `"Name": { icon: SiName, color: "#hex" }`.
 *  - Otherwise drop an SVG in /public/logos/tech/ and add `"Name": { logo: "/logos/tech/name.svg" }`.
 * Names without an entry render as a neutral letter tile.
 */
const registry: Record<string, TechEntry> = {
  Python: { icon: SiPython, color: "#3776AB", darkColor: "#5A9FD4" },
  TypeScript: { icon: SiTypescript, color: "#3178C6", darkColor: "#4B8FE0" },
  JavaScript: { icon: SiJavascript, color: "#D4B400", darkColor: "#F7DF1E" },
  "Next.js": { icon: SiNextdotjs },
  React: { icon: SiReact, color: "#087EA4", darkColor: "#61DAFB" },
  "Tailwind CSS": { icon: SiTailwindcss, color: "#06B6D4" },
  "Framer Motion": { icon: SiFramer, color: "#0055FF", darkColor: "#4D88FF" },
  FastAPI: { icon: SiFastapi, color: "#009688", darkColor: "#1DB9A9" },
  Django: { icon: SiDjango, color: "#0C4B33", darkColor: "#44B78B" },
  "Node.js": { icon: SiNodedotjs, color: "#5FA04E" },
  PostgreSQL: { icon: SiPostgresql, color: "#4169E1", darkColor: "#6F8FF0" },
  MongoDB: { icon: SiMongodb, color: "#47A248" },
  Redis: { icon: SiRedis, color: "#DC382D", darkColor: "#FF5A4E" },
  OpenAI: { icon: SiOpenai },
  "OpenAI Agents SDK": { icon: SiOpenai },
  LangChain: { icon: SiLangchain, color: "#1C3C3C", darkColor: "#7FC8FF" },
  LangGraph: { icon: SiLanggraph, color: "#1C3C3C", darkColor: "#7FC8FF" },
  CrewAI: { icon: SiCrewai, color: "#FF5A50" },
  MCP: { icon: SiModelcontextprotocol },
  LiveKit: { icon: SiLivekit },
  Docker: { icon: SiDocker, color: "#2496ED" },
  Nginx: { icon: SiNginx, color: "#009639", darkColor: "#1FB954" },
  Dapr: { icon: SiDapr, color: "#0D2192", darkColor: "#7B8CFF" },
  "GitHub Actions": { icon: SiGithubactions, color: "#2088FF" },
  Vercel: { icon: SiVercel },
  "Fly.io": { icon: SiFlydotio, color: "#7B3BE2", darkColor: "#A77BF3" },
  Git: { icon: SiGit, color: "#F05032" },
  Stripe: { icon: SiStripe, color: "#635BFF", darkColor: "#8A84FF" },
  Resend: { icon: SiResend },
  Zapier: { icon: SiZapier, color: "#FF4F00" },
  "Google Maps": { icon: SiGooglemaps, color: "#4285F4" },
  "React Native": { icon: SiReact, color: "#087EA4", darkColor: "#61DAFB" },
  Expo: { icon: SiExpo },
  Firebase: { icon: SiFirebase, color: "#DD2C00" },
  SQLAlchemy: { icon: SiSqlalchemy, color: "#D71F00" },
  Pydantic: { icon: SiPydantic, color: "#E92063" },
  Claude: { icon: SiAnthropic, color: "#D97757" },
  Gemini: { icon: SiGooglegemini, color: "#8E75B2" },
  OpenRouter: { logo: "/logos/tech/openrouter.png" },
  Vapi: { logo: "/logos/tech/vapi.svg" },
  Twilio: { icon: SiTwilio, color: "#F22F46" },
  ElevenLabs: { icon: SiElevenlabs },
  "Google Cloud": { icon: SiGooglecloud, color: "#4285F4" },
  GCP: { icon: SiGooglecloud, color: "#4285F4" },
  Playwright: { logo: "/logos/tech/playwright.svg" },
  pytest: { icon: SiPytest, color: "#0A9EDC" },
  Jest: { icon: SiJest, color: "#C21325" },
};

const normalise = (name: string) => name.toLowerCase().replace(/[^a-z0-9]/g, "");
const lookup = new Map(Object.entries(registry).map(([name, entry]) => [normalise(name), entry]));

export function TechIcon({ name, className = "size-4" }: { name: string; className?: string }) {
  const entry = lookup.get(normalise(name));

  if (entry?.icon) {
    const Icon = entry.icon;
    const style = entry.color
      ? ({ "--brand": entry.color, "--brand-dark": entry.darkColor ?? entry.color } as CSSProperties)
      : undefined;
    return (
      <Icon
        aria-hidden
        style={style}
        className={`shrink-0 ${entry.color ? "text-[var(--brand)] dark:text-[var(--brand-dark)]" : "text-fg"} ${className}`}
      />
    );
  }

  if (entry?.logo) {
    // eslint-disable-next-line @next/next/no-img-element -- tiny static SVG, no optimisation needed
    return <img src={entry.logo} alt="" aria-hidden className={`shrink-0 ${className}`} />;
  }

  return (
    <span
      aria-hidden
      className={`inline-grid shrink-0 place-items-center rounded-[4px] bg-fg text-[0.6rem] font-bold leading-none text-bg ${className}`}
    >
      {name.charAt(0).toUpperCase()}
    </span>
  );
}
