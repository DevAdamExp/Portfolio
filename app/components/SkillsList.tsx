import { FiCpu, FiLayout, FiServer, FiTool } from "react-icons/fi";
import { skills } from "@/content/skills";
import TechList from "./TechList";

const icons = [FiCpu, FiServer, FiLayout, FiTool];

export default function SkillsList() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {skills.map((group, i) => {
        const Icon = icons[i % icons.length];
        return (
          <article key={group.title} className="card p-5 sm:p-6">
            <div className="flex items-start gap-4">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-accent/25 bg-accent-soft text-accent">
                <Icon className="size-[18px]" aria-hidden />
              </span>
              <div>
                <h3 className="font-semibold tracking-tight text-fg">{group.title}</h3>
                {group.description && <p className="mt-1 text-sm text-pretty text-muted">{group.description}</p>}
              </div>
            </div>
            <div className="mt-5">
              <TechList items={group.skills} label={group.title} />
            </div>
          </article>
        );
      })}
    </div>
  );
}
