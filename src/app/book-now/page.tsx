"use client";

import React, { useState } from "react";
import CustomDropdown from "@/components/dropdown/CustomDropdown";
import styles from "./BookNow.module.scss";

const featuresList = [
  "Online Store",
  "Booking System",
  "SEO Optimization",
  "Custom Design",
  "User Login System",
  "Payment Gateway",
  "Analytics & Reports",
];

const BookNow = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [websiteType, setWebsiteType] = useState("");
  const [preferredPlatform, setPreferredPlatform] = useState("");
  const [budget, setBudget] = useState("");
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  return (
    <>
      {!isModalOpen && (
        <div className={styles.startProjectWrapper}>
          <button className={styles.startProjectButton} onClick={() => setIsModalOpen(true)}>
            Start Your Project
          </button>
        </div>
      )}

      {isModalOpen && (
        <div className={styles.modalBackdrop} onClick={() => setIsModalOpen(false)}>
          <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={() => setIsModalOpen(false)}>✖</button>

            <h2>Let&apos;s Build Your Website</h2>
            <p>Fill out this form to discuss your project.</p>

            <form className={styles.bookNowForm}>
              <input type="text" placeholder="Name" className={styles.inputField} required />
              <input type="email" placeholder="Email" className={styles.inputField} required />
              <input type="tel" placeholder="Phone" className={styles.inputField} required />

              <CustomDropdown
                label="Select Website Type"
                options={[
                  "E-Commerce",
                  "Portfolio",
                  "Business Website",
                  "Landing Page",
                  "Blog",
                  "Custom Web App",
                ]}
                selected={websiteType}
                setSelected={setWebsiteType}
              />

              <CustomDropdown
                label="Preferred Platform"
                options={["Coded", "Shopify", "Wix", "WordPress", "Squarespace"]}
                selected={preferredPlatform}
                setSelected={setPreferredPlatform}
              />

              <CustomDropdown
                label="Select Features"
                options={featuresList}
                isMulti
                selected={selectedFeatures}
                setSelected={setSelectedFeatures}
              />

              <CustomDropdown
                label="Select a Budget"
                options={["£500 - £1,500", "£1,500 - £3,000", "£3,000 - £5,000", "£5,000+"]}
                selected={budget}
                setSelected={setBudget}
              />

              <textarea
                className={styles.inputField}
                placeholder="Describe your project..."
                rows={4}
                required
              ></textarea>

              <button type="submit" className={styles.submitButton}>Send Inquiry</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default BookNow;
