"use client";

import React, { useEffect, useState } from "react";
import { TypeAnimation } from "react-type-animation";
import "@/styles/Preloader.css";
import awcLogo from "@/assets/logo.png"; // ✅ Adjust path if needed

const Preloader = ({ onLoaded }: { onLoaded: () => void }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onLoaded) onLoaded(); // ✅ Only call if `onLoaded` exists
    }, 7000);
    return () => clearTimeout(timer);
  }, [onLoaded]);
  

  if (!isVisible) return null;

  return (
    <div className="preloader">
      {/* <div className="logo">
        <img src={awcLogo} alt="AWC Logo" className="awc-logo" />
      </div> */}
      <div className="banner-animation">
        <TypeAnimation
          sequence={["Welcome to", 1000, "Adaptive Workflow Consultancy", 1000]}
          speed={50}
          style={{ fontSize: "2em" }}
          repeat={1}
        />
      </div>
    </div>
  );
};

export default Preloader;
