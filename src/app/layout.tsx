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
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 6060);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Detect screen width for navbar selection
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // Run on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}>
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
