"use client";

import React, { useState, useEffect } from "react";
import { TypeAnimation } from "react-type-animation";
import "@/styles/Banner.css";

const Banner = () => {
  const [showStaticText, setShowStaticText] = useState(false);
  const [applyShake, setApplyShake] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowStaticText(true);
      setApplyShake(true);

      // Stop shaking after a short duration
      setTimeout(() => setApplyShake(false), 1000);
    }, 6000); // Matches animation duration

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="banner">
      <div
        className={`banner-content ${applyShake ? "shake" : ""}`}
        onMouseEnter={() => setApplyShake(true)} // ✅ Triggers shake on hover
        onAnimationEnd={() => setApplyShake(false)} // ✅ Stops shaking after animation
      >
        {showStaticText ? (
          <span className="static-text">AWC</span>
        ) : (
          <TypeAnimation
            sequence={[
              "Streamlining Success, One Workflow at a Time",
              2500,
            ]}
            speed={45}
            style={{ fontSize: "2rem", textAlign: "left" }}
            repeat={0} // ✅ Runs once, then stops
          />
        )}
      </div>
    </div>
  );
};

export default Banner;
