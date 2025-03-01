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
        <Link href="/" className={styles.navItem}>
          <Icon icon={isHomeActive ? "mingcute:home-5-fill" : "mingcute:home-5-line"} width="32" height="32" />
        </Link>

        <Link href="/projects" className={styles.navItem}>
          <Icon icon={isProjectsActive ? "mdi:code" : "mdi:briefcase-outline"} width="32" height="32" />
        </Link>

        <Link href="/about" className={styles.navItem}>
          <Icon icon={isAboutActive ? "cib:about-me" : "mdi:account-circle-outline"} width="32" height="32" />
        </Link>

        <Link href="/book-now" className={styles.navItem}>
          <Icon icon={isBookingActive ? "lucide:book-open-check" : "ic:outline-email"} width="32" height="32" />
        </Link>
      </div>
    </div>
  );
};

export default BottomNav;