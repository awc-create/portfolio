"use client";

import React, { useEffect, useState, useCallback, useMemo, useRef } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { type EmblaOptionsType } from "embla-carousel";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./Slider.module.scss";
import ProjectModal from "@/app/projects/ProjectModal";
import { FaArrowRight } from "react-icons/fa";
import type { ProjectSlide } from "@/app/projects/types";

const OPTIONS: EmblaOptionsType = {
  loop: true,
  align: "center",
  containScroll: "trimSnaps",
  duration: 50,
  dragFree: false,
  skipSnaps: false,
  inViewThreshold: 0.6,
  dragThreshold: 5,
};

const pillVariants = {
  initial: { opacity: 0, y: -8, scale: 0.985 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -6, scale: 0.99 },
};

const Slider = ({ slides }: { slides: ProjectSlide[] }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS);
  const [selected, setSelected] = useState(0);
  const [modalIndex, setModalIndex] = useState<number | null>(null);

  // ✅ HUD pill auto-hide
  const [hudVisible, setHudVisible] = useState(true);
  const hideTimer = useRef<number | null>(null);

  const clearHideTimer = () => {
    if (hideTimer.current) {
      window.clearTimeout(hideTimer.current);
      hideTimer.current = null;
    }
  };

  const scheduleAutoHide = useCallback(() => {
    clearHideTimer();
    hideTimer.current = window.setTimeout(() => {
      setHudVisible(false);
    }, 2000);
  }, []);

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
    if (modalIndex !== null) setModalIndex((p) => ((p ?? 0) + 1) % slides.length);
  };
  const handleModalPrev = () => {
    if (modalIndex !== null)
      setModalIndex((p) => ((p ?? 0) - 1 + slides.length) % slides.length);
  };

  const activeSlide = useMemo(() => slides[selected], [slides, selected]);
  const activeTitle = activeSlide?.title ?? "";

  // ✅ On slide change: show HUD, then hide after 2s
  useEffect(() => {
    setHudVisible(true);
    scheduleAutoHide();
    return () => clearHideTimer();
  }, [selected, scheduleAutoHide]);

  // ✅ If user hovers/focuses slider: show HUD
  const showHud = () => {
    setHudVisible(true);
    scheduleAutoHide();
  };
  const hideHudSoon = () => {
    scheduleAutoHide();
  };

  // ✅ Keyboard hint (only on non-touch feel)
  const [showKeyHint, setShowKeyHint] = useState(true);
  useEffect(() => {
    const t = window.setTimeout(() => setShowKeyHint(false), 3500);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <>
      <motion.div
        className={styles.sliderWrapper}
        initial={{ opacity: 0, scale: 0.985 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        onMouseEnter={showHud}
        onMouseLeave={hideHudSoon}
        onFocusCapture={showHud}
        onBlurCapture={hideHudSoon}
      >
        {/* ✅ HUD (title + counter) — auto-hides */}
        <div className={styles.hudRow} aria-live="polite">
          <AnimatePresence mode="wait">
            {hudVisible && (
              <motion.div
                key={`pill-${selected}`}
                className={styles.hudPill}
                variants={pillVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className={styles.hudTitle}>{activeTitle}</span>
                <span className={styles.hudDot} aria-hidden>
                  ·
                </span>
                <span className={styles.hudIndex}>
                  {selected + 1} / {slides.length}
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ✅ Keyboard hint (appears briefly, also comes back when HUD is shown) */}
          <AnimatePresence>
            {hudVisible && showKeyHint && (
              <motion.div
                className={styles.keyHint}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                Use <span aria-hidden>←</span>
                <span className={styles.srOnly}>left arrow</span> /{" "}
                <span aria-hidden>→</span>
                <span className={styles.srOnly}>right arrow</span> keys
              </motion.div>
            )}
          </AnimatePresence>
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
                    fill
                    sizes="(max-width: 480px) 92vw, (max-width: 768px) 320px, 420px"
                    className={styles.image}
                    priority={index === selected}
                  />

                  {/* ✅ Tags overlay (bottom-right) only for the active slide */}
                  {index === selected && slide.tags?.length ? (
                    <div className={styles.tagsOverlay} aria-label="Project tags">
                      <ul className={styles.tagsList}>
                        {slide.tags.slice(0, 4).map((t) => (
                          <li key={t} className={styles.tag}>
                            {t}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

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

        {/* thumbnails */}
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
                aria-label={`View ${s.title ?? `project ${i + 1}`}`}
                className={`${styles.thumbOnly} ${isActive ? styles.thumbActive : ""}`}
                onClick={() => goTo(i)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                transition={{ duration: 0.12 }}
                title={s.title}
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
