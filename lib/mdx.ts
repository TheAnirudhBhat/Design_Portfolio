import fs from "fs";
import path from "path";
import matter from "gray-matter";

const projectsDir = path.join(process.cwd(), "content/projects");

export interface ProjectFrontmatter {
  title: string;
  subtitle: string;
  metric: string;
  metricLabel: string;
  role: string;
  timeline: string;
  company: string;
  tags: string[];
  coverImage: string;
}

export interface Project {
  slug: string;
  frontmatter: ProjectFrontmatter;
  content: string;
}

export function getAllProjectSlugs(): string[] {
  if (!fs.existsSync(projectsDir)) return [];
  return fs
    .readdirSync(projectsDir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getProjectBySlug(slug: string): Project | null {
  const filePath = path.join(projectsDir, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    slug,
    frontmatter: data as ProjectFrontmatter,
    content,
  };
}

export function getAllProjects(): Project[] {
  return getAllProjectSlugs()
    .map(getProjectBySlug)
    .filter((p): p is Project => p !== null);
}
