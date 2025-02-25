"use client";

import React, { useEffect, useState } from "react";
import { TypeAnimation } from "react-type-animation";
import "@/styles/Preloader.css";
import Image from "next/image";

const Preloader = ({ onLoaded }: { onLoaded: () => void }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasSeenPreloader = localStorage.getItem("hasSeenPreloader");

    if (!hasSeenPreloader) {
      setIsVisible(true);
      setTimeout(() => {
        setIsVisible(false);
        localStorage.setItem("hasSeenPreloader", "true"); // ✅ Store flag in cache
        if (onLoaded) onLoaded();
      }, 7000); // ✅ Adjust duration if needed
    } else {
      if (onLoaded) onLoaded();
    }
  }, [onLoaded]);

  if (!isVisible) return null;

  return (
    <div className="preloader" data-testid="preloader">
      <div className="logo">
        <Image
          src="/images/awc logo.png"
          alt="AWC Logo"
          width={200}
          height={200}
          priority={true}
        />
      </div>

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
