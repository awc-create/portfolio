"use client";

import React, { useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import styles from "./Slider.module.scss";
import ProjectModal from "@/app/projects/ProjectModal";
import { FaArrowRight } from "react-icons/fa";

interface Slide {
  image: string;
  siteLink: string;
  techStack: string;
  description: string;
  review: string;
}

const Slider = ({ slides }: { slides: Slide[] }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [modalIndex, setModalIndex] = useState<number | null>(null);

  const handleNext = () => {
    if (emblaApi) emblaApi.scrollNext();
  };

  const handleModalNext = () => {
    if (modalIndex !== null) {
      setModalIndex((prev) => (prev! + 1) % slides.length);
    }
  };

  const handleModalPrev = () => {
    if (modalIndex !== null) {
      setModalIndex((prev) => (prev! - 1 + slides.length) % slides.length);
    }
  };

  return (
    <>
      <div className={styles.sliderWrapper}>
        <div className={styles.sliderContainer} ref={emblaRef}>
          <div className={styles.emblaContainer}>
            {slides.map((slide, index) => (
              <div key={index} className={styles.emblaSlide}>
                <div
                  className={styles.imageCard}
                  onClick={() => setModalIndex(index)}
                >
                  <Image
                    src={slide.image}
                    alt="Project"
                    width={500}
                    height={300}
                    className={styles.image}
                  />
                  <div className={styles.hoverOverlay}>
                    <span>Find out more →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.arrowWrapper}>
          <button className={styles.arrowHint} onClick={handleNext}>
            <FaArrowRight className={styles.arrowIcon} />
          </button>
        </div>
      </div>

      {modalIndex !== null && (
        <ProjectModal
          slides={slides}
          currentIndex={modalIndex}
          onClose={() => setModalIndex(null)}
          onNext={handleModalNext}
          onPrev={handleModalPrev}
        />
      )}
    </>
  );
};

export default Slider;
