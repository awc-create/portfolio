"use client";

import React, { useState } from "react";
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
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleFeatureSelection = (feature: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(feature) ? prev.filter((f) => f !== feature) : [...prev, feature]
    );
  };

  return (
    <>
      {/* ✅ Centered "Start Your Project" Button */}
      {!isModalOpen && (
        <div className={styles.startProjectWrapper}>
          <button className={styles.startProjectButton} onClick={() => setIsModalOpen(true)}>
            Start Your Project
          </button>
        </div>
      )}

      {/* ✅ Modal Popup */}
      {isModalOpen && (
        <div className={styles.modalBackdrop} onClick={() => setIsModalOpen(false)}>
          <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
            {/* ✅ Close Button */}
            <button className={styles.closeButton} onClick={() => setIsModalOpen(false)}>✖</button>

            <h2>Let's Build Your Website</h2>
            <p>Fill out this form to discuss your project.</p>

            {/* ✅ Form */}
            <form className={styles.bookNowForm}>
              {/* Name, Email, Phone */}
              <div className={styles.formGroup}>
                <input type="text" placeholder="Name" className={styles.inputField} required />
              </div>
              <input type="email" placeholder="Email" className={styles.inputField} required />
              <input type="tel" placeholder="Phone" className={styles.inputField} required />

              {/* Website Type */}
              <select className={styles.inputField} required>
                <option value="">Select Website Type</option>
                <option value="E-Commerce">E-Commerce</option>
                <option value="Portfolio">Portfolio</option>
                <option value="Business Website">Business Website</option>
                <option value="Landing Page">Landing Page</option>
                <option value="Blog">Blog</option>
                <option value="Custom Web App">Custom Web App</option>
              </select>

              {/* Preferred Platform */}
              <select className={styles.inputField} required>
                <option value="">Preferred Platform</option>
                <option value="Coded">Coded (Custom Development)</option>
                <option value="Shopify">Shopify</option>
                <option value="Wix">Wix</option>
                <option value="WordPress">WordPress</option>
                <option value="Squarespace">Squarespace</option>
              </select>

              {/* Features Needed - Custom Dropdown */}
              <div className={styles.customDropdown} onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                <div className={styles.dropdownLabel}>
                  {selectedFeatures.length > 0 ? selectedFeatures.join(", ") : "Select Features"}
                  <span className={styles.dropdownArrow}>▼</span>
                </div>
                {isDropdownOpen && (
                  <div className={styles.dropdownMenu}>
                    {featuresList.map((feature) => (
                      <div
                        key={feature}
                        className={`${styles.dropdownItem} ${
                          selectedFeatures.includes(feature) ? styles.selected : ""
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFeatureSelection(feature);
                        }}
                      >
                        {feature}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Budget */}
              <select className={styles.inputField} required>
                <option value="">Select a Budget</option>
                <option value="£500 - £1,500">£500 - £1,500</option>
                <option value="£1,500 - £3,000">£1,500 - £3,000</option>
                <option value="£3,000 - £5,000">£3,000 - £5,000</option>
                <option value="£5,000+">£5,000+</option>
              </select>

              {/* Message */}
              <textarea className={styles.inputField} placeholder="Describe your project..." rows={4} required></textarea>

              {/* Submit Button */}
              <button type="submit" className={styles.submitButton}>Send Inquiry</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default BookNow;
