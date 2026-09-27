import type { Metadata } from "next";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import ProjectPlates from "../../components/ProjectPlates";
import Section from "../../components/Section";

export const metadata: Metadata = {
  title: site.projectsPage.title,
  description: site.projectsPage.metaDescription,
};

export default function ProjectsPage() {
  const agents = projects.filter((p) => p.kind === "AI agent");
  const products = projects.filter((p) => p.kind !== "AI agent");

  return (
    <div className="container-page pt-[clamp(2.5rem,1rem+3.5vw,4.5rem)]">
      <header className="max-w-[52rem]">
        <p className="eyebrow fade-in">{projects.length} projects</p>
        <h1 className="display-page fade-in mt-4" style={{ "--i": 1 } as React.CSSProperties}>
          {site.projectsPage.title}
        </h1>
        <p className="lead fade-in mt-6 max-w-[40rem]" style={{ "--i": 2 } as React.CSSProperties}>
          {site.projectsPage.intro}
        </p>
      </header>

      <Section id="products" title={site.projectsPage.products} className="mt-[clamp(3.5rem,2rem+5vw,6rem)]">
        <ProjectPlates items={products} />
      </Section>

      <Section id="agents" title={site.projectsPage.agents} description={site.projectsPage.agentsDescription}>
        <ProjectPlates items={agents} />
      </Section>
    </div>
  );
}
