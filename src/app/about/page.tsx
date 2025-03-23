"use client";

import React, { useState, useEffect } from "react";
import Tabs from "@/components/tabs/Tabs";
import styles from "./About.module.scss";

const About = () => {
  const [activeTab, setActiveTab] = useState("Me");
  const [isMounted, setIsMounted] = useState(false);
  const [mode, setMode] = useState("Client Mode");

  const clientTabs = ["Me", "AWC", "Builder", "Development"];
  const portfolioTabs = ["Me", "Work Experience", "Skills", "Education"];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleMode = (selectedMode: string) => {
    if (mode !== selectedMode) {
      setMode(selectedMode);
      setActiveTab("Me");
    }
  };

  if (!isMounted) {
    return <div className={styles.loadingPlaceholder}>Loading...</div>;
  }

  const renderContent = () => {
    if (activeTab === "Me") {
      return (
        <div className={styles.meContainer}>
          <h3 className={styles.sectionTitle}>ADNAN SAID</h3>
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
          return (
            <div className={styles.builderContainer}>
              <h3 className={styles.sectionTitle}>Adaptive Workflow Consultancy</h3>
              <p className={styles.aboutText}>
                AWC is all about continuous improvement—iterating until your vision becomes reality. Whether it’s automation, design, or strategy,
                AWC fine-tunes workflows so businesses scale smarter.
              </p>
            </div>
          );
        case "Builder":
          return (
            <div className={styles.builderContainer}>
              <h3 className={styles.sectionTitle}>Platforms We Build With</h3>
              <div className={styles.skillGrid}>
                <span>WordPress</span>
                <span>Wix</span>
                <span>Shopify</span>
                <span>GoDaddy</span>
                <span>Squarespace</span>
              </div>
            </div>
          );

        case "Development":
          return (
            <div className={styles.devContainer}>
              <h3 className={styles.sectionTitle}>Development Stack</h3>
              <div className={styles.skillGrid}>
                <span>HTML</span>
                <span>CSS</span>
                <span>JavaScript</span>
                <span>Laravel</span>
                <span>React</span>
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
              <h3 className={styles.sectionTitle}>Experience</h3>
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
              <>
                <h3 className={styles.sectionTitle}>Skills</h3>
                <div className={styles.skillsGrid}>
                  <span>AWS (EC2, Lambda, S3, IAM)</span>
                  <span>Terraform & Pulumi</span>
                  <span>Docker & Kubernetes</span>
                  <span>GitLab CI/CD</span>
                  <span>Python (Boto3)</span>
                  <span>React & JavaScript</span>
                </div>
              </>
            );

        case "Education":
          return (
            <div className={styles.educationSection}>
              <h3 className={styles.sectionTitle}>Education</h3>
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

        <div className={styles.tabsContainer}>
          <Tabs activeTab={activeTab} setActiveTab={setActiveTab} tabs={mode === "Client Mode" ? clientTabs : portfolioTabs} />
        </div>

        <div className={styles.content}>{renderContent()}</div>
      </div>
    </div>
  );
};

export default About;
