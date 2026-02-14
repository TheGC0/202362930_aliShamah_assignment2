import type { Metadata } from "next";

import { ProjectsClient } from "@/components/projects-client";
import { SectionHeader } from "@/components/ui/section-header";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore Ali Shamah's full-stack, mobile, and AI/ML case studies with architecture details and implementation notes.",
};

export default function ProjectsPage() {
  return (
    <div className="space-y-10 pb-8">
      <SectionHeader
        eyebrow="Portfolio"
        title="Projects and case studies"
        description="Filter by domain and search quickly across full-stack, mobile, dashboard, and AI/ML work."
      />
      <ProjectsClient initialProjects={projects} />
    </div>
  );
}
