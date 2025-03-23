"use client";

import React, { useState, useEffect } from "react";
import { TypeAnimation } from "react-type-animation";
import { Icon } from "@iconify/react";
import ClockSpinner from "@/components/icons/ClockSpinner";
import styles from "./Banner.module.scss";


const Banner = () => {
  const [showAWC, setShowAWC] = useState(false);
  const [applyShake, setApplyShake] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [ukTime, setUkTime] = useState("");
  const [userTime, setUserTime] = useState("");

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (!isMobile) {
      const timer = setTimeout(() => {
        setShowAWC(true);
        setApplyShake(true);
        setTimeout(() => setApplyShake(false), 800);
      }, 5000);
      return () => clearTimeout(timer);
    } else {
      setShowAWC(true);
    }
  }, [isMobile]);

  useEffect(() => {
    const updateTime = () => {
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

    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className={styles.banner}>
      <div className={styles.iconBox}>
        <div className={styles.iconRow}>
          <div className={styles.iconGroup}>
            <ClockSpinner color="var(--foreground)" size={24} />
            <span className={styles.timeText}>{ukTime} — UK Time (My Time)</span>
          </div>
          <div className={styles.iconGroup}>
          <Icon
            icon="nrk:globe"
            width={24}
            height={24}
            className={styles.globeIcon}
          />
            <span className={styles.timeText}>{userTime} — Your Time</span>
          </div>
        </div>
      </div>

      <div className={styles.bannerContainer}>
        <div
          className={`${styles.bannerContent} ${applyShake ? styles.shake : ""}`}
          onMouseEnter={() => setApplyShake(true)}
          onAnimationEnd={() => setApplyShake(false)}
        >
          {showAWC && <span className={styles.awcText}>AWC</span>}

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
        {showAWC && <p className={styles.bannerSubtitle}>Designer . Developer . DevOps Engineer</p>}
      </div>
    </header>
  );
};

export default Banner;
