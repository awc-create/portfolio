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

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 600);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const iconMap: Record<string, React.ReactNode> = {
    "Me": <FaUser />,
    "AWC": <Image src="/awcLogo.svg" alt="AWC Logo" width={30} height={30} />,
    "Builds": <FaLaptopCode />,
    "Coming Soon": <FaTools />,
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
