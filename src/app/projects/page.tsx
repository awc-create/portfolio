"use client";

import React from "react";
import Slider from "@/components/slider/Slider";
import styles from "./Projects.module.scss";
import Image from "next/image";

const slides = [
  {
    logo: "/images/logo-prince.png",
    logoLink: "https://www.prince-foods.com",
    description:
      "Adaptive Workflow Consultancy, led by Adnan, has revolutionized our online presence. Their top-notch website design and SEO expertise have significantly boosted our visibility and traffic.",
  },
  {
    logo: "/images/logo-dream.png",
    logoLink: "https://www.thedreamteacher.co.uk",
    description:
      "Working with Adnan was an absolute pleasure. His attention to detail, quick response time, and exceptional eye for design transformed my website into something truly brilliant.",
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
