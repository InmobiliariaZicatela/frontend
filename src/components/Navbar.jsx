"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleScrollClick = (e, sectionId) => {
    e.preventDefault();
    closeMobileMenu();

    // If we're on the root page, just scroll to the section
    if (pathname === "/") {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    } else {
      // If we're on another page, navigate to root and then scroll
      router.push("/");
      // Wait for navigation to complete, then scroll
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 100);
    }
  };

  const handleInicioClick = (e) => {
    closeMobileMenu();

    // If we're already on the home page, scroll to top
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
    // If we're on another page, let the Link handle navigation
  };

  return (
    <nav>
      <div className="nav-container">
        {/* Logo and Company Name */}
        <div className="logo-container">
          <img
            src="/images/logo.png"
            alt="Zicatela Inmobiliaria Logo"
            className="logo-image"
          />
        </div>

        {/* Desktop Navigation Links */}
        <div className="nav-links">
          <Link href="/" onClick={handleInicioClick}>
            Inicio
          </Link>
          <button
            onClick={(e) => handleScrollClick(e, "nosotros")}
            className="nav-link-button"
          >
            Nosotros
          </button>
          <button
            onClick={(e) => handleScrollClick(e, "contacto")}
            className="nav-link-button"
          >
            Contacto
          </button>
          <button
            onClick={(e) => handleScrollClick(e, "faq")}
            className="nav-link-button"
          >
            FAQ
          </button>
          <Link href="/propiedades" className="btn">
            Propiedades
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className={`nav-toggle ${isMobileMenuOpen ? "active" : ""}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Mobile Menu Overlay */}
        <div className={`nav-mobile ${isMobileMenuOpen ? "active" : ""}`}>
          {/* Close Button */}
          <button
            className="nav-close"
            onClick={closeMobileMenu}
            aria-label="Close mobile menu"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div className="nav-mobile-links">
            <Link href="/" onClick={handleInicioClick}>
              Inicio
            </Link>
            <button
              onClick={(e) => handleScrollClick(e, "nosotros")}
              className="nav-link-button mobile"
            >
              Nosotros
            </button>
            <button
              onClick={(e) => handleScrollClick(e, "contacto")}
              className="nav-link-button mobile"
            >
              Contacto
            </button>
            <button
              onClick={(e) => handleScrollClick(e, "faq")}
              className="nav-link-button mobile"
            >
              FAQ
            </button>
            <Link href="/propiedades" className="btn" onClick={closeMobileMenu}>
              Propiedades
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
