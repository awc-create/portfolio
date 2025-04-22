"use client";

import React, { useState, useEffect, useRef } from "react";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import walkingMail from "@/components/lottie/walking-mail.json";
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
  const [isLoading, setIsLoading] = useState(false);
  const [isWalking, setIsWalking] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [websiteType, setWebsiteType] = useState("");
  const [preferredPlatform, setPreferredPlatform] = useState("");
  const [budget, setBudget] = useState("");
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  const walkRef = useRef<LottieRefCurrentProps>(null);
  const miniWalkRef = useRef<LottieRefCurrentProps>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (walkRef.current) {
      walkRef.current.setSpeed(5);
    }
  }, [isWalking]);

  useEffect(() => {
    if (miniWalkRef.current) {
      miniWalkRef.current.setSpeed(1.2);
    }
  }, [isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isDesktop) {
      setIsWalking(true);
      setTimeout(() => setIsWalking(false), 2000);
    }

    setIsLoading(true);

    const payload = {
      name,
      email,
      phone,
      websiteType,
      preferredPlatform,
      features: selectedFeatures,
      budget,
      message,
    };

    try {
      await fetch("https://wxa8o33hac.execute-api.eu-west-2.amazonaws.com/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      setIsModalOpen(false);
    } catch (err) {
      console.error("Submit Error:", err);
    } finally {
      setIsLoading(false);
      setShowSuccessPopup(true);
      setTimeout(() => setShowSuccessPopup(false), 4000);
    }
  };

  return (
    <>
      {showSuccessPopup && (
        <div className={styles.successPopup}>Your inquiry has been sent!</div>
      )}

      {isWalking && isDesktop && (
        <div className={styles.walkingAcrossScreen}>
          <div className={styles.dust}></div>
          <Lottie
            animationData={walkingMail}
            loop
            autoPlay
            lottieRef={walkRef}
            className={styles.walkingAnimationLarge}
          />
        </div>
      )}

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

            <form className={styles.bookNowForm} onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Name"
                className={styles.inputField}
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <input
                type="email"
                placeholder="Email"
                className={styles.inputField}
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                type="tel"
                placeholder="Phone"
                className={styles.inputField}
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />

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
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>

              <button type="submit" className={styles.submitButton} disabled={isLoading}>
                {isLoading ? (
                  <div className={styles.walkingWrapper}>
                    <Lottie
                      animationData={walkingMail}
                      loop
                      autoPlay
                      lottieRef={miniWalkRef}
                      className={styles.walkingAnimation}
                    />
                    <span>Sending...</span>
                  </div>
                ) : (
                  "Send Inquiry"
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default BookNow;
