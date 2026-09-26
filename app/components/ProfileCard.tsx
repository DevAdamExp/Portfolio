import { experience } from "@/content/experience";
import { profile } from "@/content/profile";

const tone = {
  keyword: "text-violet-600 dark:text-violet-300",
  name: "text-sky-600 dark:text-sky-300",
  key: "text-fg",
  string: "text-emerald-700 dark:text-emerald-300",
  punct: "text-subtle",
};

type Token = [keyof typeof tone, string];

function str(value: string): Token[] {
  return [["string", `"${value}"`]];
}

/** The profile rendered as a small TypeScript object, built from content/profile.ts. */
export default function ProfileCard() {
  const current = experience.find((job) => !job.end);

  const field = (key: string, value: Token[]): Token[][] => [[["key", `  ${key}`], ["punct", ": "], ...value, ["punct", ","]]];
  const list = (key: string, values: string[]): Token[][] => [
    [["key", `  ${key}`], ["punct", ": ["]],
    ...values.map((v): Token[] => [["punct", "    "], ...str(v), ["punct", ","]]),
    [["punct", "  ],"]],
  ];

  const lines: Token[][] = [
    [["keyword", "export const "], ["name", "engineer"], ["punct", " = {"]],
    ...field("name", str(profile.name)),
    ...field("role", str(profile.title)),
    ...(current ? field("company", str(current.company)) : []),
    ...field("location", str(profile.location)),
    ...list("focus", profile.focus),
    ...list("stack", profile.coreStack),
    [["punct", "};"]],
  ];

  return (
    <figure className="card overflow-hidden" aria-label={`${profile.name}, ${profile.title}`}>
      <div className="flex items-center gap-2 border-b border-line bg-surface-2 px-4 py-3">
        <span className="size-2.5 rounded-full bg-[#ff5f57]" aria-hidden />
        <span className="size-2.5 rounded-full bg-[#febc2e]" aria-hidden />
        <span className="size-2.5 rounded-full bg-[#28c840]" aria-hidden />
        <span className="ml-2 font-mono text-xs text-subtle">engineer.ts</span>
      </div>
      <pre className="py-4 font-mono text-xs leading-6 sm:text-[13px]">
        <code>
          {lines.map((tokens, i) => (
            <span key={i} className="flex">
              <span aria-hidden className="w-9 shrink-0 select-none pr-3 text-right text-subtle/60 sm:w-10 sm:pr-4">
                {i + 1}
              </span>
              <span className="min-w-0 whitespace-pre-wrap break-words pr-4">
                {tokens.map(([kind, text], j) => (
                  <span key={j} className={tone[kind]}>
                    {text}
                  </span>
                ))}
              </span>
            </span>
          ))}
        </code>
      </pre>
    </figure>
  );
}
