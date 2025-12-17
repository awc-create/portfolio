// src/app/projects/types.ts
export type ProjectSlide = {
  title: string;
  image: string;
  siteLink?: string;
  techStack: string[] | string;
  description: string;
  review?: string;

  badges?: string[];
  complexity?: "Low" | "Medium" | "High";
  platform?: "Wix" | "Squarespace" | "Next.js";
  industry?: string;

  // ✅ NEW: per-image fit controls (only used when needed)
  objectFit?: "cover" | "contain";
  objectPosition?: string; // e.g. "center", "center top"
  tags?: string[];
};
