"use client";

import React, { useState, useEffect } from "react";
import { TypeAnimation } from "react-type-animation";
import styles from "./Banner.module.scss";

const Banner = () => {
  const [showAWC, setShowAWC] = useState(false);
  const [applyShake, setApplyShake] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // ✅ Detect Mobile Device
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    // ✅ Control Animation Timing
    if (!isMobile) {
      const timer = setTimeout(() => {
        setShowAWC(true);
        setApplyShake(true);

        // Stop shake effect after animation
        setTimeout(() => setApplyShake(false), 800);
      }, 5000);

      return () => clearTimeout(timer);
    } else {
      setShowAWC(true);
    }
  }, [isMobile]);

  return (
    <header className={styles.banner} data-testid="banner">
      <div className={styles.bannerContainer}>
        <div
          className={`${styles.bannerContent} ${applyShake ? styles.shake : ""}`}
          data-testid="banner-content"
          onMouseEnter={() => setApplyShake(true)}
          onAnimationEnd={() => setApplyShake(false)}
        >
          {/* ✅ Show AWC Instantly on Mobile */}
          {showAWC && <span className={styles.awcText}>AWC</span>}

          {/* ✅ Desktop Animation for "Streamlining Success" */}
          {!isMobile && !showAWC && (
            <TypeAnimation
              sequence={["Streamlining Success, One Workflow at a Time", 2500]}
              speed={45}
              style={{ fontSize: "2rem", textAlign: "center" }}
              className={styles.streamliningText}
              repeat={0}
            />
          )}
        </div>

        {/* ✅ Subtitle Appears Below AWC */}
        {showAWC && <p className={styles.bannerSubtitle}>Designer . Developer . DevOps Engineer</p>}
      </div>
    </header>
  );
};

export default Banner;
