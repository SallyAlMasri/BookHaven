import React from 'react';
import './Footer.css';
import {useNavigate } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaSun, FaMoon } from 'react-icons/fa';

const Footer = ({ darkMode, toggleDarkMode }) => {
  const navigate = useNavigate();
  return (
    <footer className={`footer ${darkMode ? 'dark-mode' : ''}`}>
      <div className="footer-content">
        <div className="footer-info">
          <img src="../../images/Logo.png" alt="Logo" className="footer-logo" />
          <p>Discover, explore, and connect with fellow book lovers. Share your reading journey, rate books, and create a wishlist!</p>
        </div>

        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li> <a  href="/About">About Us</a></li>
          </ul>
        </div>

        <div className="footer-social">
          <h3>Follow Us</h3>
          <ul>
            <li><a href="https://www.facebook.com" className="social-icon" target="_blank" rel="noopener noreferrer"><FaFacebook /></a></li>
            <li><a href="https://twitter.com" className="social-icon" target="_blank" rel="noopener noreferrer"><FaTwitter /></a></li>
            <li><a href="https://www.instagram.com" className="social-icon" target="_blank" rel="noopener noreferrer"><FaInstagram /></a></li>
            <li><a href="https://www.linkedin.com" className="social-icon" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a></li>
          </ul>
          
        </div>
        
      </div>
   
      
      <div className="footer-bottom">
        <p>&copy; 2025 Book System | All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
