"use client";

import React, { useState, useEffect } from "react";
import Tabs from "@/components/tabs/Tabs";
import styles from "./About.module.scss";
import Image from "next/image";

const About = () => {
  const [activeTab, setActiveTab] = useState("Me");
  const [isMounted, setIsMounted] = useState(false);
  const [mode, setMode] = useState("Client Mode"); // ✅ Default mode

  const clientTabs = ["Me", "AWC", "Builds", "Coming Soon"];
  const portfolioTabs = ["Me", "Work Experience", "Skills", "Education"];

  useEffect(() => {
    setIsMounted(true); // ✅ Prevents hydration issues
  }, []);

  const toggleMode = (selectedMode: string) => {
    if (mode !== selectedMode) {
      setMode(selectedMode);
      setActiveTab("Me"); // ✅ Resets to "Me" when switching
    }
  };

  if (!isMounted) {
    return <div className={styles.loadingPlaceholder}>Loading...</div>; // ✅ Avoids hydration mismatch
  }

  const renderContent = () => {
    if (activeTab === "Me") {
      return (
        <div className={styles.meContainer}>
          <Image
            src="/images/me-wb.avif"
            alt="Profile Image"
            width={100}
            height={150}
            className={styles.profileImage}
          />
          <p className={styles.aboutText}>
            As a former mechanical engineer, I have found myself increasingly drawn to the world of web development and DevOps engineering.
            Creating websites and bringing ideas to life quickly became my new focus. The excitement of building something from scratch,
            working to solve problems, and watching it come to life inspired me to make the switch and never look back.
          </p>
        </div>
      );
    }

    if (mode === "Client Mode") {
      switch (activeTab) {
        case "AWC":
          return <p className={styles.aboutText}>AWC is all about continuous improvement. Making iterative changes until your ideas come to life on screen.</p>;
        case "Builds":
          return <p className={styles.aboutText}>We build sites using WordPress, Wix, Shopify, GoDaddy, and write in HTML, CSS, JavaScript, Laravel & React.</p>;
        case "Coming Soon":
          return (
            <div className={styles.comingSoon}>
              <p>Stay tuned for exciting new updates!</p>
              <div className={styles.comingSoonList}>
                <span>AWS</span>
                <span>Pulumi</span>
                <span>GitLab</span>
                <span>Python</span>
                <span>Terraform</span>
                <span>TypeScript</span>
              </div>
            </div>
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
              <span>AWS (EC2, Lambda, S3, IAM)</span>
              <span>Terraform & Pulumi</span>
              <span>Docker & Kubernetes</span>
              <span>GitLab CI/CD</span>
              <span>Python (Boto3)</span>
              <span>React & JavaScript</span>
            </div>
          );
          case "Education":
            return (
              <div className={styles.educationSection}>
                <div className={styles.educationItem}>
                  <span className={styles.educationIcon}>🎓</span>
                  <div className={styles.educationText}>
                    <h4>MSc Computer Science</h4>
                    <p>Aston University (2019 - 2020)</p>
                  </div>
                </div>
                <div className={styles.educationItem}>
                  <span className={styles.educationIcon}>🎓</span>
                  <div className={styles.educationText}>
                    <h4>BEng Mechanical Engineering</h4>
                    <p>Aston University (2015 - 2019)</p>
                  </div>
                </div>
              </div>
            );
        default:
          return null;
      }
    }
  };

  return (
    <div className={styles.layout}>
      <div className={styles.container}>
        {/* ✅ Mode Toggle */}
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

        {/* ✅ Tabs */}
        <div className={styles.tabsContainer}>
          <Tabs activeTab={activeTab} setActiveTab={setActiveTab} tabs={mode === "Client Mode" ? clientTabs : portfolioTabs} />
        </div>

        {/* ✅ Content */}
        <div className={styles.content}>{renderContent()}</div>
      </div>
    </div>
  );
};

export default About;
