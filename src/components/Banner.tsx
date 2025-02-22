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
    <div className="banner" data-testid="banner">
      <div
        className={`banner-content ${applyShake ? "shake" : ""}`}
        data-testid="banner-content"
        onMouseEnter={() => setApplyShake(true)}
        onAnimationEnd={() => setApplyShake(false)}
      >
        {showStaticText ? (
          <span className="static-text">AWC</span>
        ) : (
          <TypeAnimation
            sequence={["Streamlining Success, One Workflow at a Time", 2500]}
            speed={45}
            style={{ fontSize: "2rem", textAlign: "left" }}
            repeat={0}
          />
        )}
      </div>
    </div>
  );  
};

export default Banner;
