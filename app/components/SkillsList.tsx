import { skills } from "@/content/skills";
import TechList from "./TechList";

export default function SkillsList() {
  return (
    <dl className="divide-y divide-line border-y border-line">
      {skills.map((group) => (
        <div key={group.title} className="grid gap-3 py-6 sm:grid-cols-[11rem_1fr] sm:gap-6">
          <dt>
            <p className="font-medium text-fg">{group.title}</p>
            {group.description && <p className="mt-1 text-sm text-pretty text-subtle">{group.description}</p>}
          </dt>
          <dd>
            <TechList items={group.skills} label={group.title} />
          </dd>
        </div>
      ))}
    </dl>
  );
}
