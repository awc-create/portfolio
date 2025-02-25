"use client";

import { useState, useEffect } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Preloader from "@/components/Preloader";
import Banner from "@/components/Banner";
import "@/styles/globals.css";

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

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 6060);
    return () => clearTimeout(timer);
  }, []);

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      {!isLoaded && <Preloader onLoaded={() => setIsLoaded(true)} />}
        {isLoaded && (
          <>
            <Banner />
            <Navbar />
            {children}
          </>
        )}
      </body>
    </html>
  );
}
