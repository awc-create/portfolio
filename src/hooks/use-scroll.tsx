"use client";

import { useEffect, useState } from "react";

const useScrollingEffect = (): "up" | "down" => {
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("down");

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollDirection(currentScrollY > lastScrollY ? "down" : "up");
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return scrollDirection;
};

export default useScrollingEffect;
