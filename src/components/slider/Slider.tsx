"use client";

import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { type EmblaOptionsType } from "embla-carousel";
import { motion } from "framer-motion";
import styles from "./Slider.module.scss";
import ProjectModal from "@/app/projects/ProjectModal";
import { FaArrowRight } from "react-icons/fa";
import type { ProjectSlide } from "@/app/projects/types";

const OPTIONS: EmblaOptionsType = {
  loop: true,
  align: "center",
  containScroll: "trimSnaps",
  duration: 50,        // smooth glide
  dragFree: false,
  skipSnaps: false,
  inViewThreshold: 0.6,
  dragThreshold: 5,
};

const Slider = ({ slides }: { slides: ProjectSlide[] }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS);
  const [selected, setSelected] = useState(0);
  const [modalIndex, setModalIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!emblaApi) return;
    let raf = 0;
    const onSelect = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setSelected(emblaApi.selectedScrollSnap());
      });
    };
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      cancelAnimationFrame(raf);
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  const handleNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const goTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);

  const handleModalNext = () => {
    if (modalIndex !== null) setModalIndex(p => (p! + 1) % slides.length);
  };
  const handleModalPrev = () => {
    if (modalIndex !== null) setModalIndex(p => (p! - 1 + slides.length) % slides.length);
  };

  return (
    <>
      <motion.div
        className={styles.sliderWrapper}
        initial={{ opacity: 0, scale: 0.985 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        {/* ⬆️ Counter sits OUTSIDE the Embla viewport */}
        <div className={styles.counterRow} aria-live="polite">
          <span className={styles.counterBadge}>
            {selected + 1} / {slides.length}
          </span>
        </div>

        {/* Embla viewport */}
        <div className={styles.sliderContainer} ref={emblaRef}>
          <div className={styles.emblaContainer}>
            {slides.map((slide, index) => (
              <div key={index} className={styles.emblaSlide}>
                <motion.button
                  className={styles.imageCard}
                  onClick={() => setModalIndex(index)}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  aria-label={`Open ${slide.title ?? `project ${index + 1}`}`}
                >
                  <Image
                    src={slide.image}
                    alt={slide.title ?? "Project"}
                    width={500}
                    height={300}
                    className={styles.image}
                  />
                  <div className={styles.hoverOverlay}>
                    <span>Find out more →</span>
                  </div>
                </motion.button>
              </div>
            ))}
          </div>
        </div>

        {/* next arrow */}
        <div className={styles.controlsRow}>
          <motion.button
            className={styles.arrowHint}
            onClick={handleNext}
            aria-label="Next project"
            whileHover={{ x: 4, scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            transition={{ duration: 0.15 }}
          >
            <FaArrowRight className={styles.arrowIcon} />
          </motion.button>
        </div>

        {/* thumbnails (images only) */}
        <motion.div
          className={styles.thumbStrip}
          role="tablist"
          aria-label="Project thumbnails"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.3 }}
        >
          {slides.map((s, i) => {
            const isActive = i === selected;
            return (
              <motion.button
                key={i}
                role="tab"
                aria-selected={isActive}
                aria-label={`View project ${i + 1}`}
                className={`${styles.thumbOnly} ${isActive ? styles.thumbActive : ""}`}
                onClick={() => goTo(i)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                transition={{ duration: 0.12 }}
              >
                <Image
                  src={s.image}
                  alt=""
                  width={84}
                  height={56}
                  className={styles.thumbImgOnly}
                />
              </motion.button>
            );
          })}
        </motion.div>
      </motion.div>

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
