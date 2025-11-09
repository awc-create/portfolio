import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaInstagram,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";
import { FaTiktok } from "react-icons/fa6"; // ✅ TikTok icon
import styles from "./Navbar.module.scss";

const LINKS = [
  { href: "/", label: "Root/" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/book-now", label: "Book Now" },
];

const Navbar: React.FC = () => {
  const pathname = usePathname() || "/";

  return (
    <nav className={styles.navbar} aria-label="Primary">
      <div className={styles.navbarContainer}>
        <ul className={styles.navLinks}>
          {LINKS.map(({ href, label }) => {
            const active =
              pathname === href ||
              (href !== "/" && pathname.startsWith(href));

            return (
              <li key={href} className={styles.navItem}>
                <Link
                  href={href}
                  className={`${styles.navLink} ${active ? styles.active : ""}`}
                  aria-current={active ? "page" : undefined}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className={styles.socialIcons}>
          <a
            href="https://www.instagram.com/awc_adaptiveworks/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            style={{ color: "#E1306C" }}
          >
            <FaInstagram size={20} />
          </a>

          <a
            href="https://www.linkedin.com/in/adnan-said-fullstack-eng"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            style={{ color: "#0A66C2" }}
          >
            <FaLinkedin size={20} />
          </a>

          <a
            href="https://github.com/awc-create"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className={styles.githubIcon}
          >
            <FaGithub size={20} />
          </a>

          {/* ✅ TikTok */}
          <a
            href="https://www.tiktok.com/@adaptiveworkflow"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok"
            className={styles.tiktokIcon}
          >
            <FaTiktok size={20} />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
