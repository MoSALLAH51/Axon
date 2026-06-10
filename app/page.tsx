// app/page.tsx
import HomePageClient from "@/components/sections/HomePageClient";
import type { ServiceListItem, ProjectListItem } from "@/types";

async function getServices(): Promise<ServiceListItem[] | null> {
  try {
    // استبدل هذا بـ fetch الحقيقي الخاص بك
    // const res = await fetch(`${process.env.API_URL}/services`, { next: { revalidate: 3600 } });
    // if (!res.ok) return null;
    // return res.json();
    return null;
  } catch {
    return null;
  }
}

async function getProjects(): Promise<ProjectListItem[] | null> {
  try {
    // استبدل هذا بـ fetch الحقيقي الخاص بك
    // const res = await fetch(`${process.env.API_URL}/projects`, { next: { revalidate: 3600 } });
    // if (!res.ok) return null;
    // return res.json();
    return null;
  } catch {
    return null;
  }
}

export default async function Page() {
  const [services, projects] = await Promise.all([
    getServices(),
    getProjects(),
  ]);

  return <HomePageClient services={services} projects={projects} />;
}