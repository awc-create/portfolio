import React from 'react';
import { Link } from 'react-scroll';
import './NavBar.css';

const NavBar = () => {
  return (
    <nav aria-label="Site" className="vertical-menu">
      <ul>
        <li>
          <Link 
            to="home" 
            smooth={true} 
            duration={500} 
            className="menu-item"
          >
            Home
          </Link>
        </li>
        <li>
          <Link 
            to="about" 
            smooth={true} 
            duration={500} 
            className="menu-item"
          >
            About
          </Link>
        </li>
        <li>
          <Link 
            to="projects" 
            smooth={true} 
            duration={500} 
            className="menu-item"
          >
            Projects
          </Link>
        </li>
        <li>
          <Link 
            to="book-online" 
            smooth={true} 
            duration={500} 
            className="menu-item"
          >
            Book Online
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
