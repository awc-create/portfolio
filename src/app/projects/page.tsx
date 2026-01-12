"use client";

import React from "react";
import Slider from "@/components/slider/Slider";
import styles from "./Projects.module.scss";
import type { ProjectSlide } from "./types"; // ✅ single source

const slides: ProjectSlide[] = [
  {
    title: "Prince Foods (UK)",
    image: "/images/prince-food-site.png",
    siteLink: "https://www.prince-foods.com",
    techStack: ["Wix", "SEO"],
    tags: ["Wix", "SEO"],
    description:
      "Online grocery brand serving South Asian products across the UK & Ireland, built for SEO-led discovery and growth.",
    review:
      "Adaptive Workflow Consultancy significantly boosted our visibility and traffic.",
    badges: ["SEO-focused"],
    complexity: "Low",
    platform: "Wix",
    industry: "E-commerce / Food",
  },

  {
    title: "The Dream Teacher",
    image: "/images/the-dream-teacher-site.png",
    siteLink: "https://www.thedreamteacher.co.uk",
    techStack: ["Squarespace"],
    tags: ["Squarespace"],
    description:
      "A calm, trust-led site for a UK sleep consultant—built to explain services clearly and drive enquiries.",
    review:
      "Attention to detail and design transformed my website.",
    badges: ["Client-managed"],
    complexity: "Low",
    platform: "Squarespace",
    industry: "Health / Coaching",
  },

  {
    title: "Dr Code Ezenna",
    image: "/images/websites/drcode.png",
    siteLink: "https://drcodezenna.com/",
    techStack: ["Next.js", "Prisma", "NextAuth", "Resend", "UploadThing"],
    tags: ["Next.js", "Admin", "Blog"],
    description:
      "A portfolio and blogging platform for a PhD lecturer—built for blog writing, academic content, and an upcoming book release. The visual style reflects her roots in reporting and long-form storytelling.",
    badges: ["Admin-managed", "Database-backed", "Resend emails"],
    complexity: "High",
    platform: "Next.js",
    industry: "Education / Academia",
  },

  {
    title: "Travel With SHEGO",
    image: "/images/websites/shegotravels.png",
    siteLink: "https://travelwithshego.com/",
    techStack: ["Next.js", "Prisma", "Stripe", "Resend", "Framer Motion"],
    tags: ["Next.js", "Stripe", "Charity"],
    description:
      "Travel storytelling meets charity, raising funds via Stripe to support and rebuild the community of Baraawe.",
    badges: ["Stripe-enabled", "Admin-managed", "Resend emails"],
    complexity: "High",
    platform: "Next.js",
    industry: "Charity / Media",
    objectFit: "cover",
    objectPosition: "center",
  },

  {
    title: "Nocturna",
    image: "/images/websites/nocturna.png",
    siteLink: "https://nocturnaagency.com/",
    techStack: ["Next.js", "Framer Motion", "Google Email", "UploadThing"],
    tags: ["Next.js", "Music", "Brand"],
    description:
      "DJ and music consulting brand site for hospitality venues—focused on promotion, enquiries, and bookings.",
    badges: ["Google email", "No database"],
    complexity: "Medium",
    platform: "Next.js",
    industry: "Entertainment / Hospitality",
  },

  {
    title: "MADA FM LTD",
    image: "/images/websites/madafmltd.png",
    siteLink: "https://madafmltd.co.uk",
    techStack: ["Next.js", "Framer Motion", "Contact forms"],
    tags: ["Next.js", "Services", "UK"],
    description:
      "24/7 UK contractor website for electrical, cooling, and security services—optimised for rapid contact and London callouts.",
    badges: ["No database", "No admin panel"],
    complexity: "Medium",
    platform: "Next.js",
    industry: "Construction / Services",
  },
];

// ✅ Sort: Complexity → Platform → Industry
const complexityRank: Record<NonNullable<ProjectSlide["complexity"]>, number> = {
  Low: 1,
  Medium: 2,
  High: 3,
};

const sortedSlides = [...slides].sort((a, b) => {
  const aC = a.complexity ?? "Low";
  const bC = b.complexity ?? "Low";

  return (
    complexityRank[bC] - complexityRank[aC] ||
    (a.platform ?? "").localeCompare(b.platform ?? "") ||
    (a.industry ?? "").localeCompare(b.industry ?? "")
  );
});

const Projects = () => {
  return (
    <div className={styles.sliderWrapper}>
      <div className={styles.sliderContainer}>
        <Slider slides={sortedSlides} />
      </div>
    </div>
  );
};

export default Projects;
