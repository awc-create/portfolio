"use client";

import React, { useEffect, useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { Icon } from "@iconify/react";
import ClockSpinner from "@/components/icons/ClockSpinner";
import styles from "./Banner.module.scss";

/* ===============================================
   🎚️ Unified Animation Speed Control
   =============================================== */
// 0.8 = faster, 1.0 = default, 1.3 = slower/cinematic
const ANIMATION_SPEED = 1.0;

// Base times (seconds)
const TYPE_DURATION = 2.5 * ANIMATION_SPEED; // “Streamlining Success …” total typing time
const AWC_DURATION  = 0.6  * ANIMATION_SPEED; // AWC fade/scale time
// Subtitle sweep and underline should span typing → AWC end
const SWEEP_SECONDS = TYPE_DURATION + AWC_DURATION;

const Banner = () => {
  const [showAWC, setShowAWC] = useState(false);
  const [applyShake, setApplyShake] = useState(false);
  const [ukTime, setUkTime] = useState("");
  const [userTime, setUserTime] = useState("");

  const reduceMotion = useReducedMotion();
  const easeOut = [0.25, 1, 0.5, 1] as const;

  /* Clocks (top-right) */
  useEffect(() => {
    const update = () => {
      const now = new Date();
      const uk = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Europe/London",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).format(now);
      const local = new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).format(now);
      setUkTime(uk);
      setUserTime(local);
    };
    update();
    const id = setInterval(update, 10_000);
    return () => clearInterval(id);
  }, []);

  /* Small rise-in for the banner text block */
  const rise: Variants = reduceMotion
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 14 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.55 * ANIMATION_SPEED, ease: easeOut },
        },
      };

  /* When typing completes, reveal AWC */
  const handleTypingDone = () => {
    setShowAWC(true);
    if (!reduceMotion) {
      setTimeout(() => {
        setApplyShake(true);
        setTimeout(() => setApplyShake(false), 700 * ANIMATION_SPEED);
      }, 250 * ANIMATION_SPEED);
    }
  };

  return (
    <header className={styles.banner} role="banner">
      {/* clocks */}
      <motion.div
        className={styles.iconBox}
        initial={{ opacity: 0, y: -10 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: { duration: 0.6 * ANIMATION_SPEED, ease: easeOut },
        }}
      >
        <div className={styles.iconRow}>
          {ukTime !== userTime && (
            <div className={styles.iconGroup}>
              <ClockSpinner color="var(--foreground)" size={24} />
              <span className={styles.timeText}>{ukTime} — UK Time (My Time)</span>
            </div>
          )}
          <div className={styles.iconGroup}>
            <Icon icon="nrk:globe" width={24} height={24} />
            <span className={styles.timeText}>
              {userTime}
              {ukTime !== userTime && " — Your Time"}
            </span>
          </div>
        </div>
      </motion.div>

      {/* main banner content */}
      <div className={styles.bannerContainer}>
        {/* ===== MOBILE-ONLY: simple static version (no animations) ===== */}
        <div className={styles.mobileOnly}>
          <span className={styles.mobileBrand}>AWC</span>
          <p className={styles.mobileSubtitle}>
            Designer . Developer . DevOps Engineer
          </p>
        </div>

        {/* ===== DESKTOP (unchanged): typing → AWC + subtitle sweep ===== */}
        <motion.div
          className={`${styles.bannerContent} ${applyShake ? styles.shake : ""}`}
          variants={rise}
          initial="hidden"
          animate="show"
          onAnimationEnd={() => setApplyShake(false)}
        >
          {/* 1) Typing, then 2) AWC */}
          {!showAWC ? (
            <TypeAnimation
              sequence={[
                "Streamlining Success, One Workflow at a Time",
                TYPE_DURATION * 1000, // ms
                () => handleTypingDone(),
              ]}
              // If you want typing rate to scale too, use: speed={Math.max(10, 45 / ANIMATION_SPEED)}
              speed={45}
              className={styles.streamliningText}
              repeat={0}
              cursor={false}
            />
          ) : (
            <motion.span
              className={styles.awcText}
              initial={reduceMotion ? false : { opacity: 0, scale: 0.98 }}
              animate={reduceMotion ? {} : { opacity: 1, scale: 1 }}
              transition={{ duration: AWC_DURATION, ease: easeOut }}
            >
              AWC
            </motion.span>
          )}
        </motion.div>

        {/* subtitle — two-layer reveal + matching underline */}
        <motion.p
          className={`${styles.bannerSubtitle} ${styles.roleLineSmooth}`}
          aria-label="Roles"
        >
          {/* base muted layer */}
          <span className={styles.roleBase}>
            Designer · Developer · DevOps Engineer
          </span>

          {/* bright layer revealed by width (letter-by-letter feel) */}
          <span
            className={`${styles.roleReveal} ${styles.roleRevealPlay}`}
            style={{ animationDuration: `${SWEEP_SECONDS}s` } as React.CSSProperties}
          >
            Designer · Developer · DevOps Engineer
          </span>

          {/* underline element (sync duration with reveal) */}
          <span
            className={`${styles.underline} ${styles.underlineRun}`}
            style={{ animationDuration: `${SWEEP_SECONDS}s` } as React.CSSProperties}
            aria-hidden
          />
        </motion.p>
      </div>
    </header>
  );
};

export default Banner;
