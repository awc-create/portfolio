"use client";

import React from "react";
import Slider from "@/components/slider/Slider";
import styles from "./Projects.module.scss";

const slides = [
  {
    image: "/images/prince-food-site.png",
    siteLink: "https://www.prince-foods.com",
    techStack: "Wix + Custom Styling",
    description:
      "Prince Foods evolved from a wholesale business into a vibrant online grocery brand—serving authentic South Asian flavours to homes across the UK & Ireland. Built with Wix, the site is optimised for easy navigation, responsive design, and SEO-driven product discovery.",
    review: "Adaptive Workflow Consultancy, led by Adnan, has revolutionized our online presence. Their top-notch website design and SEO expertise have significantly boosted our visibility and traffic.’",
  },
  {
    image: "/images/the-dream-teacher-site.png",
    siteLink: "https://www.thedreamteacher.co.uk",
    techStack: "Squarespace",
    description:
      "The Dream Teacher is a Squarespace-built platform created for a UK-based sleep consultant supporting parents of young children. With a strong personal story and a background in education, mediation, and caregiving, the site provides a warm and credible online presence for families seeking sleep solutions. It showcases her mission, tailored services, and heartfelt approach to helping parents reclaim peace and rest through personalised, gentle sleep strategies.",
    review: "Working with Adnan was an absolute pleasure. His attention to detail, quick response time, and exceptional eye for design transformed my website into something truly brilliant.’",
  },
];

const Projects = () => {
  return (
    <div className={styles.sliderWrapper}>
      <div className={styles.sliderContainer}>
        <Slider slides={slides} />
      </div>
    </div>
  );
};

export default Projects;
