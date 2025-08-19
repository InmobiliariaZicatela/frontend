import React, { useState, useEffect } from "react";
import Icon from "./Icon";
import "../styles/components/property-photos.scss";

const PropertyPhotos = ({
  images = [],
  currentImageIndex = 0,
  isOpen = false,
  onClose,
  propertyTitle = "",
}) => {
  const [activeIndex, setActiveIndex] = useState(currentImageIndex);

  // Update active index when prop changes
  useEffect(() => {
    setActiveIndex(currentImageIndex);
  }, [currentImageIndex]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowLeft":
          handlePrevImage();
          break;
        case "ArrowRight":
          handleNextImage();
          break;
        default:
          break;
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, activeIndex]);

  const handlePrevImage = () => {
    setActiveIndex(activeIndex === 0 ? images.length - 1 : activeIndex - 1);
  };

  const handleNextImage = () => {
    setActiveIndex(activeIndex === images.length - 1 ? 0 : activeIndex + 1);
  };

  const handleThumbnailClick = (index) => {
    setActiveIndex(index);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen || !images.length) return null;

  return (
    <div className="property-photos-modal" onClick={handleBackdropClick}>
      <div className="modal-content">
        {/* Close Button */}
        <button
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Cerrar galería"
        >
          <Icon name="X" size={24} />
        </button>

        {/* Image Counter */}
        <div className="image-counter">
          <p className="text text-lg">
            {activeIndex + 1} / {images.length}
          </p>
        </div>

        {/* Main Image Display */}
        <div className="main-image-container">
          <img
            src={images[activeIndex]}
            alt={`${propertyTitle} - Imagen ${activeIndex + 1}`}
            className="main-image"
          />

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                className="nav-arrow nav-arrow-left"
                onClick={handlePrevImage}
                aria-label="Imagen anterior"
              >
                <Icon name="ChevronLeft" size={32} />
              </button>
              <button
                className="nav-arrow nav-arrow-right"
                onClick={handleNextImage}
                aria-label="Siguiente imagen"
              >
                <Icon name="ChevronRight" size={32} />
              </button>
            </>
          )}
        </div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="thumbnails-container">
            <div className="thumbnails-scroll">
              {images.map((image, index) => (
                <button
                  key={index}
                  className={`thumbnail ${
                    index === activeIndex ? "active" : ""
                  }`}
                  onClick={() => handleThumbnailClick(index)}
                >
                  <img
                    src={image}
                    alt={`${propertyTitle} - Miniatura ${index + 1}`}
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyPhotos;
