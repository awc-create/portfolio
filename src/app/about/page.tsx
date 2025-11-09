"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import {
  FaWordpress, FaWix, FaShopify, FaAws, FaPython, FaReact,
  FaHtml5, FaCss3Alt, FaGitlab, FaLaravel, FaJsSquare,
  FaDocker, FaGlobe,
} from "react-icons/fa";
import { SiTypescript, SiTerraform, SiPulumi, SiKubernetes } from "react-icons/si";

import Tabs from "@/components/tabs/Tabs";
import styles from "./About.module.scss";

type Mode = "Client Mode" | "Portfolio";

const container: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
};

const gridStagger: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.05, delayChildren: 0.05 },
  },
};
const gridItem: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.25, ease: "easeOut" } },
};

const About = () => {
  const [activeTab, setActiveTab] = useState("Me");
  const [isMounted, setIsMounted] = useState(false);
  const [mode, setMode] = useState<Mode>("Client Mode");

  const clientTabs = ["Me", "AWC", "Builder", "Development"];
  const portfolioTabs = ["Me", "Work Experience", "Skills", "Education"];

  useEffect(() => setIsMounted(true), []);

  const toggleMode = (selectedMode: Mode) => {
    if (mode !== selectedMode) {
      setMode(selectedMode);
      setActiveTab("Me");
    }
  };

  if (!isMounted) return <div className={styles.loadingPlaceholder}>Loading...</div>;

  const renderContent = () => {
    if (activeTab === "Me") {
      return (
        <motion.div className={styles.meContainer} variants={container} initial="hidden" animate="show">
          <h3 className={styles.sectionTitle}>ADNAN SAID</h3>
          <p className={styles.aboutText}>
            As a former mechanical engineer, I have found myself increasingly drawn to the world of web development and DevOps
            engineering. Creating websites and bringing ideas to life quickly became my new focus. The excitement of building
            something from scratch, working to solve problems, and watching it come to life inspired me to make the switch and
            never look back.
          </p>
        </motion.div>
      );
    }

    if (mode === "Client Mode") {
      switch (activeTab) {
        case "AWC":
          return (
            <motion.div className={styles.builderContainer} variants={container} initial="hidden" animate="show">
              <h3 className={styles.sectionTitle}>Adaptive Workflow Consultancy</h3>
              <p className={styles.aboutText}>
                AWC is all about continuous improvement—iterating until your vision becomes reality. Whether it’s automation,
                design, or strategy, AWC fine-tunes workflows so businesses scale smarter.
              </p>
            </motion.div>
          );

        case "Builder":
          return (
            <motion.div className={styles.builderContainer} variants={container} initial="hidden" animate="show">
              <h3 className={styles.sectionTitle}>Platforms We Build With</h3>
              <motion.div className={styles.iconGrid} variants={gridStagger} initial="hidden" animate="show">
                <motion.span variants={gridItem}><FaWordpress style={{ color: "#21759b" }} /> WordPress</motion.span>
                <motion.span variants={gridItem}><FaWix style={{ color: "#ffce00" }} /> Wix</motion.span>
                <motion.span variants={gridItem}><FaShopify style={{ color: "#96bf48" }} /> Shopify</motion.span>
                <motion.span variants={gridItem}><FaGlobe style={{ color: "#333" }} /> GoDaddy</motion.span>
                <motion.span variants={gridItem}><FaCss3Alt style={{ color: "#2965f1" }} /> Squarespace</motion.span>
              </motion.div>
            </motion.div>
          );

        case "Development":
          return (
            <motion.div className={styles.devContainer} variants={container} initial="hidden" animate="show">
              <h3 className={styles.sectionTitle}>Development Stack</h3>
              <motion.div className={styles.iconGrid} variants={gridStagger} initial="hidden" animate="show">
                <motion.span variants={gridItem}><FaHtml5 style={{ color: "#e44d26" }} /> HTML</motion.span>
                <motion.span variants={gridItem}><FaCss3Alt style={{ color: "#264de4" }} /> CSS</motion.span>
                <motion.span variants={gridItem}><FaJsSquare style={{ color: "#f0db4f" }} /> JavaScript</motion.span>
                <motion.span variants={gridItem}><FaLaravel style={{ color: "#ff2d20" }} /> Laravel</motion.span>
                <motion.span variants={gridItem}><FaReact style={{ color: "#61dafb" }} /> React</motion.span>
                <motion.span variants={gridItem}><FaAws style={{ color: "#ff9900" }} /> AWS</motion.span>
                <motion.span variants={gridItem}><SiPulumi style={{ color: "#ff6f61" }} /> Pulumi</motion.span>
                <motion.span variants={gridItem}><FaGitlab style={{ color: "#fc6d26" }} /> GitLab</motion.span>
                <motion.span variants={gridItem}><FaPython style={{ color: "#3776ab" }} /> Python</motion.span>
                <motion.span variants={gridItem}><SiTerraform style={{ color: "#844fba" }} /> Terraform</motion.span>
                <motion.span variants={gridItem}><SiTypescript style={{ color: "#007acc" }} /> TypeScript</motion.span>
              </motion.div>
            </motion.div>
          );

        default:
          return null;
      }
    }

    if (mode === "Portfolio") {
      switch (activeTab) {
        case "Work Experience":
          return (
            <motion.div className={styles.experienceGrid} variants={container} initial="hidden" animate="show">
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
                  <Image
                    src="/images/bt-plc-header-logo-white.png"
                    alt="BT logo"
                    className={styles.btLogo}
                    width={100}
                    height={30}
                    priority
                  />
                  <h5>Senior DevOps Engineer — British Telecom (BT)</h5>
                </div>
              </div>

              <div className={styles.experienceItem}>
                <div className={styles.experienceHeader}>
                  <Image
                    src="/images/bt-plc-header-logo-white.png"
                    alt="BT logo"
                    className={styles.btLogo}
                    width={100}
                    height={30}
                  />
                  <h5>DevOps Engineer — British Telecom (BT)</h5>
                </div>
              </div>
            </motion.div>
          );

        case "Skills":
          return (
            <motion.div variants={container} initial="hidden" animate="show">
              <h3 className={styles.sectionTitle}>Skills</h3>
              <motion.div className={styles.iconGrid} variants={gridStagger} initial="hidden" animate="show">
                <motion.span variants={gridItem}><FaAws style={{ color: "#ff9900" }} /> AWS </motion.span>
                <motion.span variants={gridItem}><SiTerraform style={{ color: "#844fba" }} /> Terraform</motion.span>
                <motion.span variants={gridItem}><SiPulumi style={{ color: "#ff6f61" }} /> Pulumi</motion.span>
                <motion.span variants={gridItem}><FaDocker style={{ color: "#0db7ed" }} /> Docker</motion.span>
                <motion.span variants={gridItem}><SiKubernetes style={{ color: "#326ce5" }} /> Kubernetes</motion.span>
                <motion.span variants={gridItem}><FaGitlab style={{ color: "#fc6d26" }} /> GitLab </motion.span>
                <motion.span variants={gridItem}><FaPython style={{ color: "#3776ab" }} /> Python </motion.span>
                <motion.span variants={gridItem}><FaReact style={{ color: "#61dafb" }} /> React</motion.span>
                <motion.span variants={gridItem}><FaJsSquare style={{ color: "#f0db4f" }} /> JavaScript</motion.span>
              </motion.div>
            </motion.div>
          );

        case "Education":
          return (
            <motion.div className={styles.educationSection} variants={container} initial="hidden" animate="show">
              <h3 className={styles.sectionTitle}>Education</h3>

              <div className={styles.educationItem}>
                <div className={styles.educationHeader}>
                  <Image
                    src="/images/aston-uni-logo.svg"
                    alt="Aston University logo"
                    className={styles.universityLogo}
                    width={120}
                    height={40}
                  />
                  <div className={styles.educationText}>
                    <h4>MSc Computer Science</h4>
                    <p>Aston University (2019 – 2020)</p>
                  </div>
                </div>
              </div>

              <div className={styles.educationItem}>
                <div className={styles.educationHeader}>
                  <Image
                    src="/images/aston-uni-logo.svg"
                    alt="Aston University logo"
                    className={styles.universityLogo}
                    width={120}
                    height={40}
                  />
                  <div className={styles.educationText}>
                    <h4>BEng Mechanical Engineering</h4>
                    <p>Aston University (2015 – 2019)</p>
                  </div>
                </div>
              </div>
            </motion.div>
          );

        default:
          return null;
      }
    }
  };

  return (
    <main className={styles.layout}>
      <div className={styles.container}>
        <div className={styles.modeSwitcher} role="tablist" aria-label="About mode">
          <button
            className={`${styles.toggleButton} ${mode === "Client Mode" ? styles.active : ""}`}
            onClick={() => toggleMode("Client Mode")}
            role="tab"
            aria-selected={mode === "Client Mode"}
          >
            Client Mode
          </button>
          <button
            className={`${styles.toggleButton} ${mode === "Portfolio" ? styles.active : ""}`}
            onClick={() => toggleMode("Portfolio")}
            role="tab"
            aria-selected={mode === "Portfolio"}
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

        <section className={styles.content}>{renderContent()}</section>
      </div>
    </main>
  );
};

export default About;
