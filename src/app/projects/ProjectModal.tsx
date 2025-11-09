"use client";

import React, { useEffect, useMemo, useRef, useCallback } from "react";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
import styles from "./ProjectModal.module.scss";
import type { ProjectSlide } from "./types";   // ✅ use the unified type

interface ProjectModalProps {
  slides: ProjectSlide[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

const ProjectModal: React.FC<ProjectModalProps> = ({
  slides,
  currentIndex,
  onClose,
  onNext,
  onPrev,
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const startX = useRef<number | null>(null);

  const slide = slides[currentIndex];
  const titleId = useMemo(() => `project-title-${currentIndex}`, [currentIndex]);

  // Lock background scroll / restore on unmount
  useEffect(() => {
    const { style } = document.documentElement;
    const prev = style.overflow;
    style.overflow = "hidden";
    return () => {
      style.overflow = prev;
    };
  }, []);

  // Focus trap + ESC / arrows
  useEffect(() => {
    const node = dialogRef.current;
    if (!node) return;

    // initial focus to close button or first focusable
    const first =
      (node.querySelector(FOCUSABLE) as HTMLElement) ?? (node as HTMLElement);
    first?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        onNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        onPrev();
      } else if (e.key === "Tab") {
        // trap focus
        const focusables = Array.from(
          node.querySelectorAll<HTMLElement>(FOCUSABLE),
        );
        if (focusables.length === 0) return;
        const firstEl = focusables[0];
        const lastEl = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        } else if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    };

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose, onNext, onPrev]);

  // Basic swipe (mobile)
  const onPointerDown = useCallback((e: React.PointerEvent) => {
    startX.current = e.clientX;
  }, []);
  const onPointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (startX.current == null) return;
      const delta = e.clientX - startX.current;
      startX.current = null;
      if (Math.abs(delta) < 40) return; // ignore tiny swipes
      if (delta < 0) onNext();
      else onPrev();
    },
    [onNext, onPrev],
  );

  // Normalize techStack to array
  const techs = Array.isArray(slide.techStack)
    ? slide.techStack
    : String(slide.techStack).split(",").map((s) => s.trim());

  return (
    <div
      className={styles.overlay}
      onClick={onClose}
      aria-hidden={false}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <div
        ref={dialogRef}
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
      >
        {/* Close */}
        <button
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Close project details"
          title="Close"
        >
          ×
        </button>

        {/* Image / link */}
        <a
          href={slide.siteLink}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.imageCard}
          aria-label={`Open ${slide.title}`}
          title={`Open ${slide.title}`}
        >
          <Image
            src={slide.image}
            alt={`${slide.title} website preview`}
            fill
            sizes="(max-width: 600px) 92vw, 680px"
            className={styles.image}
            priority
          />
          <div className={styles.hoverOverlay}>
            <span>Visit site →</span>
          </div>
        </a>

        {/* Content */}
        <div className={styles.details}>
          <h2 id={titleId} className={styles.title}>
            {slide.title}
          </h2>

          <ul className={styles.chips} aria-label="Tech stack">
            {techs.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>

          <p className={styles.desc}>{slide.description}</p>

          {slide.review && (
            <p className={styles.review}>
              <em>{slide.review}</em>
            </p>
          )}

          <div className={styles.ctaRow}>
            <a
              href={slide.siteLink}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.primaryBtn}
            >
              Visit website
            </a>
            <button className={styles.secondaryBtn} onClick={onNext}>
              Next project
              <FaArrowRight aria-hidden />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
