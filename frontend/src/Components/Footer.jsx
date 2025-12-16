import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "../Styles/Footer.css";

function Footer() {
  const footerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, []);

  // Smooth scroll function
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      ref={footerRef}
      className={`footer-section ${isVisible ? "visible" : ""}`}
    >
      <div className="footer-wave"></div>

      <div className="footer-container">
        {/* About */}
        <div className="footer-about" id="about">
          <h2 className="footer-logo">
            <span className="text-warning">Sport</span>
            <span className="text-light">Spot</span>
          </h2>
          <p>
            Reserve your favorite sports courts anytime, anywhere. Football,
            badminton, tennis, cricket, and more – all in one click!
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><Link onClick={() => scrollToSection("/")}>Home</Link></li>
            <li><Link onClick={() => scrollToSection("/about")}>About</Link></li>
            <li><Link onClick={() => scrollToSection("/sports")}>Sports</Link></li>
            <li><Link onClick={() => scrollToSection("/contact")}>Contact</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-contact" id="contact">
          <h3>Contact</h3>
          <p>Email: support@sportspot.com</p>
          <p>Phone: +91 96561 21945</p>
          <div className="footer-socials">
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-linkedin-in"></i></a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>© 2025 SportSpot. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;