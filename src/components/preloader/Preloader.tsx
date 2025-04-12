// "use client";

import React, { useEffect, useState } from "react";
import { TypeAnimation } from "react-type-animation";
import Styles from "./Preloader.module.scss"; // ✅ Import using relative path
import Image from "next/image";

const Preloader = ({ onLoaded }: { onLoaded: () => void }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [logoSrc, setLogoSrc] = useState("/images/awcLogo.png");

  useEffect(() => {
    const hasSeenPreloader = localStorage.getItem("hasSeenPreloader");

    if (!hasSeenPreloader) {
      setIsVisible(true);
      setTimeout(() => {
        setIsVisible(false);
        localStorage.setItem("hasSeenPreloader", "true");
        if (onLoaded) onLoaded();
      }, 7000);
    } else {
      if (onLoaded) onLoaded();
    }
  }, [onLoaded]);

  if (!isVisible) return null;

  return (
    <div className={`${Styles.preloader} ${!isVisible ? Styles.hidden : ""}`} data-testid="preloader">
      <div className={Styles.logo}>
        <Image 
          src={logoSrc}
          alt="AWC Logo" 
          width={200} 
          height={200} 
          priority={true} 
          onError={() => setLogoSrc("/awcLogo.svg")}
        />
      </div>

      <div className={Styles.bannerAnimation} data-testid="banner-animation">
        <TypeAnimation
          sequence={["Welcome to", 1000, "Adaptive Workflow Consultancy", 1000]}
          speed={48}
          style={{ fontSize: "max(2.5vw, 1.2rem)" }}
          repeat={1}
        />
      </div>
    </div>
  );
};

export default Preloader;
