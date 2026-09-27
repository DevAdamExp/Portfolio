import { skills } from "@/content/skills";
import TechList from "./TechList";

export default function SkillsList() {
  return (
    <dl className="grid gap-x-10 gap-y-10 md:grid-cols-2">
      {skills.map((group) => (
        <div key={group.title} className="reveal min-w-0">
          <dt>
            <p className="font-semibold tracking-[-0.01em] text-fg">{group.title}</p>
            {group.description && <p className="mt-1 text-small text-subtle">{group.description}</p>}
          </dt>
          <dd className="mt-4">
            <TechList items={group.skills} label={group.title} />
          </dd>
        </div>
      ))}
    </dl>
  );
}
