import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllProjectSlugs, getProjectBySlug } from "@/lib/mdx";
import CaseStudyLayout from "@/components/work/CaseStudyLayout";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return {
    title: `${project.frontmatter.title} — DaW4ve`,
    description: project.frontmatter.subtitle,
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <CaseStudyLayout frontmatter={project.frontmatter}>
      <MDXRemote source={project.content} />
    </CaseStudyLayout>
  );
}
