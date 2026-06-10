import { apiGet } from "@/lib/api";
import type { ApiResponse, PaginatedResponse, Project, ProjectListItem } from "@/types";

const PROJECTS_TAG = "projects";

/**
 * Fetch paginated projects list.
 */
export async function getProjects(page = 1, perPage = 12): Promise<PaginatedResponse<ProjectListItem>> {
  const res = await apiGet<PaginatedResponse<ProjectListItem>>(
    `/projects?page=${page}&per_page=${perPage}`,
    {
      tags: [PROJECTS_TAG],
      revalidate: 3600,
    },
  );
  return res;
}

/**
 * Fetch featured projects for the home page.
 */
export async function getFeaturedProjects(): Promise<ProjectListItem[]> {
  const res = await apiGet<ApiResponse<ProjectListItem[]>>("/projects/featured", {
    tags: [PROJECTS_TAG, "projects-featured"],
    revalidate: 3600,
  });
  return res.data;
}

/**
 * Fetch a single project by ID.
 */
export async function getProjectById(id: number): Promise<Project> {
  const res = await apiGet<ApiResponse<Project>>(`/projects/${id}`, {
    tags: [PROJECTS_TAG, `project-${id}`],
    revalidate: 3600,
  });
  return res.data;
}

/**
 * Fetch all project IDs — used by generateStaticParams.
 */
export async function getAllProjectIds(): Promise<number[]> {
  const res = await getProjects(1, 500); // generous limit for static generation
  return res.data.map((p) => p.id);
}
