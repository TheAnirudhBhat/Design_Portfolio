import { notFound } from "next/navigation";
import { getAllProjectSlugs, getProjectBySlug } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import CaseStudyLayout from "@/components/work/CaseStudyLayout";

export async function generateStaticParams() {
  const slugs = getAllProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <CaseStudyLayout
      title={project.frontmatter.title}
      subtitle={project.frontmatter.subtitle}
      role={project.frontmatter.role}
      company={project.frontmatter.company}
      timeline={project.frontmatter.timeline}
      metric={project.frontmatter.metric}
      tags={project.frontmatter.tags}
    >
      <MDXRemote source={project.content} />
    </CaseStudyLayout>
  );
}
