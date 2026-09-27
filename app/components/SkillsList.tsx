import { skills } from "@/content/skills";
import TechList from "./TechList";

export default function SkillsList() {
  return (
    <dl className="grid gap-x-[var(--gap)] gap-y-12 md:grid-cols-2">
      {skills.map((group) => (
        <div key={group.title} className="reveal min-w-0 border-t border-line pt-6">
          <dt>
            <p className="font-serif text-[1.375rem] font-medium leading-tight tracking-[-0.01em] text-fg">{group.title}</p>
            {group.description && <p className="mt-2 text-small text-subtle">{group.description}</p>}
          </dt>
          <dd className="mt-5">
            <TechList items={group.skills} label={group.title} />
          </dd>
        </div>
      ))}
    </dl>
  );
}
