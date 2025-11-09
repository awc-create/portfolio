"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./BottomNav.module.scss";

const NAV: Array<{ href: string; label: string }> = [
  { href: "/", label: "root/" },
  { href: "/projects", label: "projects" },
  { href: "/about", label: "about" },
  { href: "/book-now", label: "book" },
];

const BottomNav: React.FC = () => {
  const pathname = usePathname() || "/";

  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(href + "/");

  return (
    <nav className={styles.bottomNav} aria-label="Primary (mobile)">
      <div className={styles.row}>
        {/* Active indicator bar */}
        <span
          className={styles.activeBar}
          style={
            {
              transform: `translateX(${NAV.findIndex(n => isActive(n.href)) * 100}%)`,
            } as React.CSSProperties
          }
          aria-hidden
        />

        {NAV.map(({ href, label }) => {
          const active = isActive(href);
          return (
            <Link
              key={href}
              href={href}
              className={`${styles.item} ${active ? styles.active : ""}`}
              aria-current={active ? "page" : undefined}
            >
              <span className={styles.label}>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
