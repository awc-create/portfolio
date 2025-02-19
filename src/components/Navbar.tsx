import React from "react";
import Link from "next/link";
import styles from "@/styles/Navbar.module.css";

const Navbar: React.FC = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles["navbar-container"]}>

        {/* Navigation Links */}
        <ul className={styles["nav-links"]}>
          <li><Link href="/services">Services</Link></li>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/contact">Contact</Link></li>
        </ul>

        {/* Book Now Button */}
        {/* <Button text="Book Now" href="/book" variant="primary" className={styles["book-now-button"]} /> */}
      </div>
    </nav>
  );
};

export default Navbar;
