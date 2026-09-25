import { skills } from "@/content/skills";
import TechList from "./TechList";

export default function SkillsList() {
  return (
    <dl className="grid gap-6">
      {skills.map((group) => (
        <div key={group.title} className="grid gap-2.5 sm:grid-cols-[9rem_1fr] sm:gap-4">
          <dt className="pt-1 text-sm text-muted">{group.title}</dt>
          <dd>
            <TechList items={group.skills} label={group.title} />
          </dd>
        </div>
      ))}
    </dl>
  );
}
