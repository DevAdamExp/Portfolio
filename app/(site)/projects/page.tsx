import type { Metadata } from "next";
import { projects } from "@/content/projects";
import ProjectList from "../../components/ProjectList";
import Section from "../../components/Section";

export const metadata: Metadata = {
  title: "Projects",
  description: "Web platforms, AI products and voice agents I have designed and built.",
};

export default function ProjectsPage() {
  const agents = projects.filter((p) => p.kind === "AI agent");
  const products = projects.filter((p) => p.kind !== "AI agent");

  return (
    <>
      <header className="fade-in">
        <h1 className="text-[1.75rem] font-semibold tracking-[-0.02em] text-fg md:text-[2rem]">Projects</h1>
        <p className="mt-3 text-pretty text-muted">
          Products and client platforms I have built end to end, and the AI agents I have designed for real business
          workflows. Each one has a write-up of the problem, how the system fits together, what I built and the stack.
        </p>
      </header>

      <Section title="Products & platforms" className="!mt-14">
        <ProjectList items={products} />
      </Section>

      <Section title="AI & voice agents" description="Agents that talk to customers and act on business systems through tools.">
        <ProjectList items={agents} />
      </Section>
    </>
  );
}
