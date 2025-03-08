"use client";

import React from "react";
import Link from "next/link";
import useNavigation from "@/hooks/use-navigation";
import { Icon } from "@iconify/react";
import styles from "./BottomNav.module.scss";

const BottomNav: React.FC = () => {
  const { isHomeActive, isProjectsActive, isAboutActive, isBookingActive } = useNavigation();

  return (
    <div className={styles.bottomNav}>
      <div className="flex flex-row justify-around items-center w-full">
        <Link href="/" className={`${styles.navItem} ${isHomeActive ? styles.active : ""}`}>
          <Icon icon={isHomeActive ? "mingcute:home-5-fill" : "mingcute:home-5-line"} width="32" height="32" />
        </Link>

        <Link href="/projects" className={`${styles.navItem} ${isProjectsActive ? styles.active : ""}`}>
          <Icon icon={isProjectsActive ? "mdi:code" : "mdi:code"} width="32" height="32" />
        </Link>

        <Link href="/about" className={`${styles.navItem} ${isAboutActive ? styles.active : ""}`}>
          <Icon icon={isAboutActive ? "cib:about-me" : "cib:about-me"} width="32" height="32" />
        </Link>

        <Link href="/book-now" className={`${styles.navItem} ${isBookingActive ? styles.active : ""}`}>
          <Icon icon={isBookingActive ? "lucide:book-open-check" : "lucide:book-open-check"} width="32" height="32" />
        </Link>
      </div>
    </div>
  );
};

export default BottomNav;
