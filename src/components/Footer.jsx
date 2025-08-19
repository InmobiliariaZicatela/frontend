import React from "react";

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

          {/* Right side - Email subscription */}
          {/* <div className="footer-subscription">
            <h4>Suscripción</h4>
            <div className="subscription-form">
              <input type="email" placeholder="Email" />
              <button className="submit-button">
                <svg fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
            </div>
            <p className="subscription-text">
              Texto para suscribirse a nuestros emails
            </p>
          </div> */}
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
