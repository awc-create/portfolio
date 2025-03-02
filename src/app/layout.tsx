"use client";

import { useState, useEffect } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/navbar/Navbar";
import BottomNav from "@/components/navbar/BottomNav";
import Preloader from "@/components/preloader/Preloader";
import Banner from "@/components/banner/Banner";
import MaxWidthWrapper from "@/components/layout/MaxWidthWrapper";
import "@/styles/globals.scss";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // ✅ Handle Preloader Timeout
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 6060);
    return () => clearTimeout(timer);
  }, []);

  // ✅ Detect Screen Width for Navbar Selection
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
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

  return (
    <html lang="en" className="overflow-x-hidden">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased ${isDarkMode ? "dark-mode" : "light-mode"}`}>
        {!isLoaded && <Preloader onLoaded={() => setIsLoaded(true)} />}
        {isLoaded && (
          <>
            <Banner />
            <MaxWidthWrapper>
              <div className="flex">
                {!isMobile && <Navbar />}
                <main className="flex-1">{children}</main>
              </div>
            </MaxWidthWrapper>
            {isMobile && <BottomNav />}
          </>
        )}
      </body>
    </html>
  );
}
