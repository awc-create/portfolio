"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/navbar/Navbar";
import BottomNav from "@/components/navbar/BottomNav";
import Preloader from "@/components/preloader/Preloader";
import Banner from "@/components/banner/Banner";

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 6060);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const useDark = storedTheme === "dark" || (!storedTheme && prefersDark);
    document.documentElement.classList.toggle("dark-mode", useDark);
    setIsDarkMode(useDark);
  }, []);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return (
    <>
      {!isLoaded && <Preloader onLoaded={() => setIsLoaded(true)} />}
      {isLoaded && hydrated && (
        <div className="layout">
          <Banner />
          <div className="mainContainer">
            {!isMobile && <Navbar />}
            <main className="mainContent">
              <div className="contentWrapper">{children}</div>
            </main>
          </div>
          {isMobile && <BottomNav />}
        </div>
      )}
    </>
  );
};

export default ClientLayout;
