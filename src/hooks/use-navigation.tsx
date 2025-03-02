"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const useNavigation = () => {
  const pathname = usePathname();
  const [activePage, setActivePage] = useState<string | null>(null);

  useEffect(() => {
    setActivePage(pathname);
  }, [pathname]);

  return {
    isHomeActive: activePage === "/",
    isProjectsActive: activePage === "/projects",
    isAboutActive: activePage === "/about",
    isBookingActive: activePage === "/book-now",
  };
};

export default useNavigation;
