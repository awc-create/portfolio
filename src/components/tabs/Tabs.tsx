"use client";

import React, { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import styles from "./Tabs.module.scss";

interface TabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  tabs: string[];
}

const Tabs: React.FC<TabsProps> = ({ activeTab, setActiveTab, tabs }) => {
  const [mounted, setMounted] = useState(false);
  const reduce = useReducedMotion();
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <nav className={styles.wrap} role="tablist" aria-label="Sections">
      <div className={styles.scroller}>
        {tabs.map((tab) => {
          const isActive = tab === activeTab;
          return (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`${styles.tab} ${isActive ? styles.active : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              <span className={styles.label}>{tab}</span>

              {/* Animated underline lives INSIDE the active tab */}
              {isActive && (
                <motion.span
                  layoutId="tab-underline"
                  className={styles.underline}
                  transition={
                    reduce ? { duration: 0.12 } : { type: "spring", stiffness: 420, damping: 30 }
                  }
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default Tabs;
