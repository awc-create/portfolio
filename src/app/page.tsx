import { FaInstagram, FaLinkedin } from "react-icons/fa";
import "./Home.scss"; // Assuming your styles are here

export default function Home() {
  return (
    <div className="homeContent">
      <h1 className="homeTitle">Welcome to AWC</h1>

      {/* Social icons only visible on mobile */}
      <div className="mobile-social-icons">
        <a
          href="https://instagram.com/yourhandle"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
        >
          <FaInstagram size={24} />
        </a>
        <a
          href="https://linkedin.com/in/yourhandle"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          <FaLinkedin size={24} />
        </a>
      </div>
    </div>
  );
}
