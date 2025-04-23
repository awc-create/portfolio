"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./Tabs.module.scss";
import { FaUser, FaCode, FaLaptopCode, FaBook, FaTools, FaGraduationCap } from "react-icons/fa";

interface TabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  tabs: string[];
}

const Tabs: React.FC<TabsProps> = ({ activeTab, setActiveTab, tabs }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 600);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const detectDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains("dark-mode"));
    };
    detectDarkMode();
    window.addEventListener("storage", detectDarkMode);

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("storage", detectDarkMode);
    };
  }, []);

  const getLogoSrc = () => {
    if (isDarkMode) {
      return activeTab === "AWC" ? "/images/white-active-dark.png" : "/images/blue-inactive-dark.png";
    }
    return activeTab === "AWC" ? "/images/white-active-light.png" : "/images/black-inactive-light.png";
  };

  const iconMap: Record<string, React.ReactNode> = {
    "Me": <FaUser />,
    "AWC": <Image src={getLogoSrc()} alt="AWC Logo" width={70} height={70} />,
    "Builder": <FaTools />,
    "Development": <FaLaptopCode />,
    "Work Experience": <FaCode />,
    "Skills": <FaBook />,
    "Education": <FaGraduationCap />,
  };

  return (
    <div className={styles.tabsContainer}>
      <div className={styles.tabs}>
        {tabs.map((tab) => (
          <div
            key={tab}
            className={`${styles.tab} ${activeTab === tab ? styles.active : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {isMobile ? iconMap[tab] : tab}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
