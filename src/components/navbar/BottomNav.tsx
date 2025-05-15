"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import useNavigation from "@/hooks/use-navigation";
import { Icon } from "@iconify/react";
import styles from "./BottomNav.module.scss";

const BottomNav: React.FC = () => {
  const { isHomeActive, isProjectsActive, isAboutActive, isBookingActive } = useNavigation();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const detectDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains("dark-mode"));
    };
    detectDarkMode();
    window.addEventListener("storage", detectDarkMode);
    return () => window.removeEventListener("storage", detectDarkMode);
  }, []);

  const getProjectIcon = () => isDarkMode ? "/images/project-dark.png" : "/images/project-light.png";
  const getAboutIcon = () => isDarkMode ? "/images/about-dark.png" : "/images/about-light.png";
  const getBookNowIcon = () => isDarkMode ? "/images/booknow-dark.png" : "/images/booknow-light.png";

  return (
    <div className={styles.bottomNav}>
      <div className={styles.bottomNavContent}>
        <Link href="/" className={`${styles.navItem} ${isHomeActive ? styles.active : ""}`}>
          <Icon icon={isHomeActive ? "mingcute:home-5-fill" : "mingcute:home-5-line"} width={28} height={28} />
        </Link>

        <Link href="/projects" className={`${styles.navItem} ${isProjectsActive ? styles.active : ""}`}>
          <Image src={getProjectIcon()} alt="Projects Icon" width={28} height={28} priority />
        </Link>

        <Link href="/about" className={`${styles.navItem} ${isAboutActive ? styles.active : ""}`}>
          <Image src={getAboutIcon()} alt="About Icon" width={28} height={28} priority />
        </Link>

        <Link href="/book-now" className={`${styles.navItem} ${isBookingActive ? styles.active : ""}`}>
          <Image src={getBookNowIcon()} alt="Book Now Icon" width={28} height={28} priority />
        </Link>
      </div>
    </div>
  );
};

export default BottomNav;
