"use client";

import React, { useState, useEffect } from "react";
import { TypeAnimation } from "react-type-animation";
import styles from "./Banner.module.scss";

const Banner = () => {
  const [showStaticText, setShowStaticText] = useState(false);
  const [applyShake, setApplyShake] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // ✅ Check if it's a mobile device
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    // ✅ Only delay "AWC" for Desktop
    if (!isMobile) {
      const timer = setTimeout(() => {
        setShowStaticText(true);
        setApplyShake(true);

        // Stop shaking after a short duration
        setTimeout(() => setApplyShake(false), 800);
      }, 5000);

      return () => clearTimeout(timer);
    } else {
      // ✅ On Mobile: Show AWC instantly
      setShowStaticText(true);
    }
  }, [isMobile]);

  return (
    <div className={styles.banner} data-testid="banner">
      <div className={styles.bannerContainer}>
        <div
          className={`${styles.bannerContent} ${applyShake ? styles.shake : ""}`}
          data-testid="banner-content"
          onMouseEnter={() => setApplyShake(true)}
          onAnimationEnd={() => setApplyShake(false)}
        >
          {/* ✅ On Mobile: Show AWC instantly */}
          {showStaticText && <span className={styles.staticText}>AWC</span>}

          {/* ✅ Show "Streamlining Success" only on Desktop */}
          {!isMobile && !showStaticText && (
            <TypeAnimation
              sequence={["Streamlining Success, One Workflow at a Time", 2500]}
              speed={45}
              style={{ fontSize: "2rem", textAlign: "left" }}
              className={styles.streamliningText}
              repeat={0}
            />
          )}
        </div>

        {/* ✅ Subtitle appears immediately on Mobile & after AWC on Desktop */}
        {showStaticText && (
          <p className={styles.bannerSubtitle}>Designer . Developer . DevOps Engineer</p>
        )}
      </div>
    </div>
  );
};

export default Banner;
