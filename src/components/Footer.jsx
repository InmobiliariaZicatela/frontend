import React from "react";
import Icon from "./Icon";

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        {/* Main footer content */}
        <div className="footer-main">
          {/* Left side - Logo and company info */}
          <div className="footer-logo">
            {/* Logo */}
            <img
              src="/images/logo.png"
              alt="Zicatela Inmobiliaria Logo"
              className="logo-image"
            />
          </div>

          {/* Right side - Social Media */}
          <div className="footer-social-media">
            <p className="text font-semibold text-primary">Síguenos</p>
            <div className="social-media-icons">
              <a
                className="social-media-link"
                href="https://www.facebook.com/inmobiliariazicatelapxm"
                rel="noopener noreferrer"
                target="_blank"
                aria-label="Síguenos en Facebook"
              >
                <Icon name="Facebook" size={24} color="#0065f2" />
              </a>
              <a
                className="social-media-link"
                href="https://www.instagram.com/inmobiliaria.zicatela/"
                rel="noopener noreferrer"
                target="_blank"
                aria-label="Síguenos en Instagram"
              >
                <Icon name="Instagram" size={24} color="#e4405f" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="footer-copyright">
          <p>
            &copy; 2025 Inmobiliaria Zicatela. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
