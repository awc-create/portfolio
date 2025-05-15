"use client";

import React, { useState, useEffect } from "react";
import {
  FaWordpress,
  FaWix,
  FaShopify,
  FaAws,
  FaPython,
  FaReact,
  FaHtml5,
  FaCss3Alt,
  FaGitlab,
  FaLaravel,
  FaJsSquare,
  FaDocker,
  FaGlobe,
} from "react-icons/fa";
import {
  SiTypescript,
  SiTerraform,
  SiPulumi,
  SiKubernetes,
} from "react-icons/si";

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

  if (!isMounted)
    return <div className={styles.loadingPlaceholder}>Loading...</div>;

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
              <div className={styles.iconGrid}>
                <span><FaWordpress style={{ color: "#21759b" }} /> WordPress</span>
                <span><FaWix style={{ color: "#ffce00" }} /> Wix</span>
                <span><FaShopify style={{ color: "#96bf48" }} /> Shopify</span>
                <span><FaGlobe style={{ color: "#333" }} /> GoDaddy</span>
                <span><FaCss3Alt style={{ color: "#2965f1" }} /> Squarespace</span>
              </div>
            </div>
          );

        case "Development":
          return (
            <div className={styles.devContainer}>
              <h3 className={styles.sectionTitle}>Development Stack</h3>
              <div className={styles.iconGrid}>
                <span><FaHtml5 style={{ color: "#e44d26" }} /> HTML</span>
                <span><FaCss3Alt style={{ color: "#264de4" }} /> CSS</span>
                <span><FaJsSquare style={{ color: "#f0db4f" }} /> JavaScript</span>
                <span><FaLaravel style={{ color: "#ff2d20" }} /> Laravel</span>
                <span><FaReact style={{ color: "#61dafb" }} /> React</span>
                <span><FaAws style={{ color: "#ff9900" }} /> AWS</span>
                <span><SiPulumi style={{ color: "#ff6f61" }} /> Pulumi</span>
                <span><FaGitlab style={{ color: "#fc6d26" }} /> GitLab</span>
                <span><FaPython style={{ color: "#3776ab" }} /> Python</span>
                <span><SiTerraform style={{ color: "#844fba" }} /> Terraform</span>
                <span><SiTypescript style={{ color: "#007acc" }} /> TypeScript</span>
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
                <a
                  href="/files/DevOps Engineer - With name Adnan Said CV.pdf"
                  download
                  className={styles.cvButton}
                >
                  📄 Download CV
                </a>
              </div>

              <div className={styles.experienceItem}>
                <div className={styles.experienceHeader}>
                  <img
                    src="/images/bt-plc-header-logo-white.png"
                    alt="BT Logo"
                    className={styles.btLogo}
                  />
                  <h5>Senior DevOps Engineer - British Telecom (BT)</h5>
                </div>
              </div>

              <div className={styles.experienceItem}>
                <div className={styles.experienceHeader}>
                  <img
                    src="/images/bt-plc-header-logo-white.png"
                    alt="BT Logo"
                    className={styles.btLogo}
                  />
                  <h5>DevOps Engineer - British Telecom (BT)</h5>
                </div>
              </div>
            </div>
          );

        case "Skills":
          return (
            <>
              <h3 className={styles.sectionTitle}>Skills</h3>
              <div className={styles.iconGrid}>
                <span><FaAws style={{ color: "#ff9900" }} /> AWS </span>
                <span><SiTerraform style={{ color: "#844fba" }} /> Terraform</span>
                <span><SiPulumi style={{ color: "#ff6f61" }} /> Pulumi</span>
                <span><FaDocker style={{ color: "#0db7ed" }} /> Docker</span>
                <span><SiKubernetes style={{ color: "#326ce5" }} /> Kubernetes</span>
                <span><FaGitlab style={{ color: "#fc6d26" }} /> GitLab </span>
                <span><FaPython style={{ color: "#3776ab" }} /> Python </span>
                <span><FaReact style={{ color: "#61dafb" }} /> React</span>
                <span><FaJsSquare style={{ color: "#f0db4f" }} /> JavaScript</span>
              </div>
            </>
          );

        case "Education":
          return (
            <div className={styles.educationSection}>
              <h3 className={styles.sectionTitle}>Education</h3>

              <div className={styles.educationItem}>
                <div className={styles.educationHeader}>
                  <img
                    src="/images/aston-uni-logo.svg"
                    alt="Aston University Logo"
                    className={styles.universityLogo}
                  />
                  <div className={styles.educationText}>
                    <h4>MSc Computer Science</h4>
                    <p>Aston University (2019 - 2020)</p>
                  </div>
                </div>
              </div>

              <div className={styles.educationItem}>
                <div className={styles.educationHeader}>
                  <img
                    src="/images/aston-uni-logo.svg"
                    alt="Aston University Logo"
                    className={styles.universityLogo}
                  />
                  <div className={styles.educationText}>
                    <h4>BEng Mechanical Engineering</h4>
                    <p>Aston University (2015 - 2019)</p>
                  </div>
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
          <Tabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            tabs={mode === "Client Mode" ? clientTabs : portfolioTabs}
          />
        </div>

        <div className={styles.content}>{renderContent()}</div>
      </div>
    </div>
  );
};

export default About;
