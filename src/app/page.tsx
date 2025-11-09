"use client";

import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
import "./Home.scss";

export default function Home() {
  const easeOutBezier = [0.22, 1, 0.36, 1] as const;

  const container: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.12 } },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 18 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: easeOutBezier },
    },
  };

  return (
    <section className="homeContent" aria-label="Hero">
      {/* ===== Desktop / Tablet — your original hero kept intact ===== */}
      <motion.div
        className="heroDesktop"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.h1 className="heroTitle" variants={item}>
          Welcome to AWC
        </motion.h1>

        <motion.p className="heroSub" variants={item}>
          I design, build, and deploy reliable web apps — end-to-end.
        </motion.p>

        <motion.p className="heroLead" variants={item}>
          Product-focused Full-Stack + DevOps. From concept → production with
          CI/CD, observability, and sensible architecture.
        </motion.p>

        <motion.ul className="infoChips" variants={item}>
          <li>Available for select projects</li>
          <li>Remote · UK (UTC)</li>
          <li>Response &lt; 24h</li>
        </motion.ul>

        <motion.div className="heroActions" variants={item}>
          <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
            <Link href="/projects" className="btnPrimary">
              View Projects
            </Link>
          </motion.div>
          <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
            <Link href="/book" className="btnGhost">
              Book a Call
            </Link>
          </motion.div>
        </motion.div>

        <motion.details className="more" variants={item}>
          <summary>More</summary>
          <p>
            Services: design systems, Next.js apps, APIs, infra (AWS), CI/CD,
            performance audits, and production support.
          </p>
        </motion.details>
      </motion.div>

      {/* ===== Mobile — compact, centered, low-clutter ===== */}
      <motion.div
        className="heroMobile"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.p className="mTagline" variants={item}>
          Reliable web apps, end-to-end.
        </motion.p>

        <motion.ul className="mChips" variants={item}>
          <li>Available</li>
          <li>Response &lt; 24h</li>
        </motion.ul>

        <motion.div className="mActions" variants={item}>
          <Link href="/projects" className="mBtnPrimary">
            View Projects
          </Link>
          <Link href="/book" className="mTextLink" aria-label="Book a call">
            Book a call
          </Link>
        </motion.div>

        <motion.div className="mSocials" variants={item}>
          <a
            href="https://www.instagram.com/awc_adaptiveworks/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="mIcon"
          >
            <FaInstagram size={22} />
          </a>
          <a
            href="https://www.linkedin.com/in/adnan-said-fullstack-eng"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="mIcon"
          >
            <FaLinkedin size={22} />
          </a>
          <a
            href="https://github.com/awc-create"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="mIcon"
          >
            <FaGithub size={22} />
          </a>
        </motion.div>

        <details className="mMore">
          <summary>More</summary>
          <p>
            Full-Stack + DevOps. Design → production with CI/CD and sensible
            architecture.
          </p>
        </details>
      </motion.div>
    </section>
  );
}
