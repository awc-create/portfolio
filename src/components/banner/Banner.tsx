"use client";

import React, { useState, useEffect } from "react";
import { TypeAnimation } from "react-type-animation";
import styles from "./Banner.module.scss";

const Banner = () => {
  const [showStaticText, setShowStaticText] = useState(false);
  const [applyShake, setApplyShake] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowStaticText(true);
      setApplyShake(true);

      // Stop shaking after a short duration
      setTimeout(() => setApplyShake(false), 800);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.banner} data-testid="banner">
      {/* ✅ Wraps AWC & Subtitle together */}
      <div className={styles.bannerContainer}>
        <div
          className={`${styles.bannerContent} ${applyShake ? styles.shake : ""}`}
          data-testid="banner-content"
          onMouseEnter={() => setApplyShake(true)}
          onAnimationEnd={() => setApplyShake(false)}
        >
          {showStaticText ? (
             <span className={styles.staticText}>AWC</span> 
          ) : (
            <TypeAnimation
              sequence={["Streamlining Success, One Workflow at a Time", 2500]}
              speed={45}
              style={{ fontSize: "2rem", textAlign: "left" }}
              repeat={0}
            />
          )}
        </div>

        {/* ✅ Subtitle is now properly below AWC */}
        {showStaticText && (
          <p className={styles.bannerSubtitle}>Designer . Developer . DevOps Engineer</p>
        )}
      </div>
    </div>
  );
};

export default Banner;
