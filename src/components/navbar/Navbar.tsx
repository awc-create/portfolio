import React from "react";
import Link from "next/link";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import styles from "./Navbar.module.scss";

const Navbar: React.FC = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles["navbar-container"]}>
        {/* Navigation Links */}
        <ul className={styles["nav-links"]}>
          <li><Link href="/" data-testid="nav-home">Root/</Link></li>
          <li><Link href="/projects" data-testid="nav-projects">Projects</Link></li>
          <li><Link href="/about" data-testid="nav-about">About</Link></li>
          <li><Link href="/book-now" data-testid="nav-booking">Book Now</Link></li>
        </ul>

        {/* Social Icons */}
        <div className={styles["social-icons"]}>
          <a href="https://www.instagram.com/awc_adaptiveworks/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <FaInstagram size={20} />
          </a>
          <a href="https://www.linkedin.com/in/adnan-said-fullstack-eng" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <FaLinkedin size={20} />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
