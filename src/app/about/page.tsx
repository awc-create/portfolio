"use client";

import React, { useState, useEffect } from "react";
import Tabs from "@/components/tabs/Tabs";
import styles from "./About.module.scss";
import Image from "next/image";

const About = () => {
  const [activeTab, setActiveTab] = useState("Me");
  const [isMobile, setIsMobile] = useState(false);

  const tabs = ["Me", "AWC", "Builds", "Coming Soon"];

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case "Me":
        return (
          <>
            <div className={styles.profileImage}>
              <Image
                src="/images/me-wb.avif"
                alt="Profile Image"
                width={200}
                height={200}
              />
            </div>
            <p>
              As a former mechanical engineer, I have found myself increasingly drawn to the world
              of web development and DevOps engineering. Creating websites and bringing ideas to
              life quickly became my new focus. The excitement of building something from scratch,
              working to solve problems and watching it come to life inspired me to make the switch
              and never look back. Now, I help businesses enhance and develop their websites, so
              they can reach their digital goals with innovative and dependable solutions.
            </p>
          </>
        );
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
  };

  return (
    <div className={styles.layout}>
      {!isMobile && <h1 className={styles.pageTitle}>About</h1>}

      <div className={`${styles.rightSection} ${isMobile ? styles.mobileView : ""}`}>
        <div className={styles.borderContainer}>
          <div className={`${styles.tabsContainer} ${isMobile ? styles.mobileTabs : ""}`}>
            <Tabs activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} />
          </div>
          <div className={styles.content}>{renderContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default About;
