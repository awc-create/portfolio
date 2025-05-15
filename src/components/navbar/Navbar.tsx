import React from "react";
import Link from "next/link";
import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
import styles from "./Navbar.module.scss";

const Navbar: React.FC = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles["navbar-container"]}>
        <ul className={styles["nav-links"]}>
          <li><Link href="/">Root/</Link></li>
          <li><Link href="/projects">Projects</Link></li>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/book-now">Book Now</Link></li>
        </ul>

        <div className={styles["social-icons"]}>
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
