"use client";

import React, { useState, useEffect } from "react";
import Tabs from "@/components/tabs/Tabs";
import styles from "./About.module.scss";
import Image from "next/image";

const About = () => {
  const [activeTab, setActiveTab] = useState("Me");
  const [isMounted, setIsMounted] = useState(false);
  const [mode, setMode] = useState("Client Mode"); // ✅ Starts with Client Mode

  const clientTabs = ["Me", "AWC", "Builds", "Coming Soon"];
  const portfolioTabs = ["Me", "Work Experience", "Skills", "Education"];

  useEffect(() => {
    setIsMounted(true); // ✅ Ensures hydration safety
  }, []);

  const toggleMode = (selectedMode: string) => {
    if (mode !== selectedMode) {
      setMode(selectedMode);
      setActiveTab("Me"); // ✅ Always resets to "Me" when switching
    }
  };

  if (!isMounted) {
    return <div className={styles.loadingPlaceholder}>Loading...</div>; // ✅ Prevents hydration issues
  }

  const renderContent = () => {
    if (activeTab === "Me") {
      return (
        <>
          <div className={styles.profileImage}>
            <Image
              src="/images/me-wb.avif"
              alt="Profile Image"
              width={100}
              height={150}
              className={styles.profileImage}
            />
          </div>
          <p>
            As a former mechanical engineer, I have found myself increasingly drawn to the world of web development and DevOps engineering.
            Creating websites and bringing ideas to life quickly became my new focus. The excitement of building something from scratch,
            working to solve problems and watching it come to life inspired me to make the switch and never look back. Now, I help businesses
            enhance and develop their websites, so they can reach their digital goals with innovative and dependable solutions.
          </p>
        </>
      );
    }

    if (mode === "Client Mode") {
      switch (activeTab) {
        case "AWC":
          return <p>AWC is all about continuous improvement. Making iterative changes until your ideas come to life on screen.</p>;
        case "Builds":
          return <p>We build sites using WordPress, Wix, Shopify, GoDaddy, and write in HTML, CSS, JavaScript, Laravel & React.</p>;
        case "Coming Soon":
          return (
            <>
              <p>Stay tuned for exciting new updates!</p>
              <div className={styles.comingSoonList}>
                <p>AWS</p>
                <p>Pulumi</p>
                <p>GitLab</p>
                <p>Python</p>
                <p>Terraform</p>
                <p>TypeScript</p>
              </div>
            </>
          );
        default:
          return null;
      }
    }

    if (mode === "Portfolio") {
      switch (activeTab) {
        case "Work Experience":
          return (
            <div className={styles.experienceGrid}>
              <div className={styles.cvDownload}>
                <a href="/files/DevOps Engineer - With name Adnan Said CV.pdf" download className={styles.cvButton}>
                  📄 Download CV
                </a>
              </div>
              <div className={styles.experienceItem}>
                <h5>Senior DevOps Engineer - British Telecom (BT)</h5>
              </div>
              <div className={styles.experienceItem}>
                <h5>DevOps Engineer - British Telecom (BT)</h5>
              </div>
            </div>
          );
        case "Skills":
          return (
            <div className={styles.skillsGrid}>
              <div>AWS (EC2, Lambda, S3, IAM)</div>
              <div>Terraform & Pulumi</div>
              <div>Docker & Kubernetes</div>
              <div>GitLab CI/CD</div>
              <div>Python (Boto3)</div>
              <div>React & JavaScript</div>
            </div>
          );
        case "Education":
          return (
            <p>
              MSc Computer Science - Aston University (2019 - 2020) <br />
              BEng Mechanical Engineering - Aston University (2015 - 2019)
            </p>
          );
        default:
          return null;
      }
    }
  };

  return (
    <div className={styles.layout}>
      <div className={styles.rightSection}>
        <div className={styles.borderContainer}>
          {/* ✅ Mode Toggle Button Above Tabs */}
          <div className={styles.modeSwitcher}>
            <button
              className={`${styles.toggleButton} ${mode === "Client Mode" ? styles.active : ""}`}
              onClick={() => toggleMode("Client Mode")}
            >
              Client Mode
            </button>
            <button
              className={`${styles.toggleButton} ${mode === "Portfolio" ? styles.active : ""}`}
              onClick={() => toggleMode("Portfolio")}
            >
              Portfolio
            </button>
          </div>

          {/* ✅ Dynamic Tabs for Portfolio or Client Mode */}
          <div className={styles.tabsContainer}>
            <Tabs activeTab={activeTab} setActiveTab={setActiveTab} tabs={mode === "Client Mode" ? clientTabs : portfolioTabs} />
          </div>

          <div className={styles.content}>{renderContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default About;
