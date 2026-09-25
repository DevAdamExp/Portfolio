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
        <h1 className="text-2xl font-medium tracking-tight text-fg md:text-[1.75rem]">Projects</h1>
        <p className="mt-3 max-w-[36rem] text-muted">
          Products and client platforms I have built end to end, and the AI agents I have designed for real
          business workflows. Each one has a short write-up of the problem, what I built and the stack.
        </p>
      </header>

      <Section title="Products & platforms" className="!mt-14">
        <ProjectList items={products} />
      </Section>

      <Section title="AI agents">
        <ProjectList items={agents} />
      </Section>
    </>
  );
}
