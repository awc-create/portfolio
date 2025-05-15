"use client";

import React from "react";
import styles from "./ProjectModal.module.scss";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";

interface Slide {
  image: string;
  siteLink: string;
  techStack: string;
  description: string;
  review: string;
}

interface ProjectModalProps {
  slides: Slide[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({
  slides,
  currentIndex,
  onClose,
  onNext,
}) => {
  const slide = slides[currentIndex];
  const siteName = slide.siteLink.includes("prince") ? "Prince Foods" : "The Dream Teacher";

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <a
          href={slide.siteLink}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.imageCard}
          aria-label={`Visit ${siteName} Website`}
          title={`Visit ${siteName} Website`}
        >
          <Image
            src={slide.image}
            alt={`${siteName} Website preview`}
            width={500}
            height={300}
            className={styles.image}
            priority
          />
          <div className={styles.hoverOverlay}>
            <span>Go to site →</span>
          </div>
        </a>

        <div className={styles.details}>
          <p className={styles.tech}><strong>Built With:</strong> {slide.techStack}</p>
          <p className={styles.desc}>{slide.description}</p>
          <p className={styles.review}><em>{slide.review}</em></p>
        </div>

        <button
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Close project details"
          title="Close"
        >
          ×
        </button>

        {/* Mobile-Only Bottom Arrow */}
        <button
          className={styles.mobileNextArrow}
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          aria-label="Next Project"
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default ProjectModal;
