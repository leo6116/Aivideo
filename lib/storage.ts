import type { StoryboardProject } from "@/lib/types";

const STORAGE_KEY = "sceneforge:projects";

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

function readAll(): StoryboardProject[] {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as StoryboardProject[]) : [];
  } catch {
    return [];
  }
}

function writeAll(projects: StoryboardProject[]): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  } catch {
    // localStorage unavailable (private mode, quota, etc.) — fail silently.
  }
}

export const projectRepository = {
  list(): StoryboardProject[] {
    return readAll().sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  },
  get(id: string): StoryboardProject | undefined {
    return readAll().find((p) => p.id === id);
  },
  save(project: StoryboardProject): void {
    const all = readAll();
    const idx = all.findIndex((p) => p.id === project.id);
    if (idx >= 0) {
      all[idx] = project;
    } else {
      all.push(project);
    }
    writeAll(all);
  },
  remove(id: string): void {
    writeAll(readAll().filter((p) => p.id !== id));
  },
};
