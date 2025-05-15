import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
import "./Home.scss";

export default function Home() {
  return (
    <div className="homeContent">
      <h1 className="homeTitle">Welcome to AWC</h1>

      {/* Social icons only visible on mobile */}
      <div className="mobile-social-icons">
        <a
          href="https://www.instagram.com/awc_adaptiveworks/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          style={{ color: "#E1306C" }} // Instagram pink
        >
          <FaInstagram size={24} />
        </a>
        <a
          href="https://www.linkedin.com/in/adnan-said-fullstack-eng"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          style={{ color: "#0A66C2" }} // LinkedIn blue
        >
          <FaLinkedin size={24} />
        </a>
        <a
            href="https://github.com/awc-create"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="githubIcon"
          >
            <FaGithub size={24} />
          </a>
      </div>
    </div>
  );
}
