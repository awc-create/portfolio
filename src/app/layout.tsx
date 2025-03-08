"use client";

import { useEffect, useState } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/navbar/Navbar";
import BottomNav from "@/components/navbar/BottomNav";
import Preloader from "@/components/preloader/Preloader";
import Banner from "@/components/banner/Banner";
import "@/styles/globals.scss";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // ✅ Handle Preloader Timeout
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 6060);
    return () => clearTimeout(timer);
  }, []);

  // ✅ Detect Screen Width for Navbar Selection
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize(); // Run on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ Handle Dark Mode Preferences
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (storedTheme === "dark" || (!storedTheme && prefersDark)) {
      document.documentElement.classList.add("dark-mode");
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark-mode");
      setIsDarkMode(false);
    }
  }, []);

  // ✅ Ensures Hydration Completes Before Rendering
  useEffect(() => {
    setHydrated(true);
  }, []);

  return (
    <html lang="en" className="overflow-x-hidden">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased ${isDarkMode ? "dark-mode" : "light-mode"} ${hydrated ? "pageWrapper" : ""}`}>
        {!isLoaded && <Preloader onLoaded={() => setIsLoaded(true)} />}
        {isLoaded && hydrated && (
          <div className="layout">
            {/* ✅ Banner (Top Section) */}
            <Banner />

            {/* ✅ Sidebar + Main Content Layout */}
            <div className="mainContainer">
              {/* ✅ Sidebar Navbar (Desktop) */}
              {!isMobile && <Navbar />}

              {/* ✅ Main Content */}
              <main className="mainContent">
                <div className="contentWrapper">{children}</div>
              </main>
            </div>

            {/* ✅ Bottom Navigation for Mobile */}
            {isMobile && <BottomNav />}
          </div>
        )}
      </body>
    </html>
  );
}
