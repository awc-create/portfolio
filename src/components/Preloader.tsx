"use client";

import React, { useEffect, useState } from "react";
import { TypeAnimation } from "react-type-animation";
import "@/styles/Preloader.css";
import awcLogo from "@/assets/logo.png";

const Preloader = ({ onLoaded }: { onLoaded: () => void }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onLoaded) onLoaded();
    }, 7000);
    return () => clearTimeout(timer);
  }, [onLoaded]);
  
  
  if (!isVisible) return null;
  return (
    <div className="preloader" data-testid="preloader">
      <div className="banner-animation" data-testid="banner-animation">
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
