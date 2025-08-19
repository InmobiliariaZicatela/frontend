"use client";

import React, { useState } from "react";
import Icon from "./Icon";
import PropertyPhotos from "./PropertyPhotos";
import "../styles/components/property-detail.scss";

const PropertyDetail = ({ property }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageLoadError, setImageLoadError] = useState(false);

  // Get Strapi URL with fallback
  const strapiUrl =
    process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

  // Transform images data for PropertyPhotos component
  const transformedImages =
    property?.imagenes?.map((image) => `${strapiUrl}${image.url}`) || [];

  const handleWhatsAppContact = () => {
    const phoneNumber = "529541286282";
    const message = `Hola! Me gustaria pedir una cotizacion para la propiedad: ${property?.titulo} en ${property?.direccion}`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  const handlePDFDownload = (pdfInfo) => {
    window.open(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}${pdfInfo.url}`,
      "_blank"
    );
  };

  const formatPrice = (price) => {
    return price.toLocaleString("es-MX", {
      style: "currency",
      currency: "MXN",
    });
  };

  const handleImageChange = (index) => {
    setActiveImageIndex(index);
  };

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleImageError = () => {
    setImageLoadError(true);
  };

  const handleImageLoad = () => {
    setImageLoadError(false);
  };

  if (!property) {
    return null;
  }

  return (
    <div className="container justify-between property-detail-container">
      {/* Left Column - Property Information */}
      <div className="flex-item flex-column justify-center property-info-section">
        <div className="property-info-content">
          {/* Property Title */}
          <h1 className="title h1 property-title">{property.titulo}</h1>

          {/* Property Address */}
          <p className="text text-primary text-md property-address">
            {property.direccion}
          </p>

          {/* Property Description */}
          <p className="text property-description">{property.descripcion}</p>

          {/* Price Range */}
          <div className="property-price-section">
            <p className="text text-xl font-bold property-price">
              {property.precio_2
                ? `${formatPrice(property.precio)} ~ ${formatPrice(
                    property.precio_2
                  )}`
                : formatPrice(property.precio)}
            </p>
          </div>

          {property.pdf && property.pdf.length > 0 && (
            <div className="property-pdf-section">
              <h4 className="text text-primary text-md font-semibold mb-2">
                Documentos disponibles
              </h4>
              {property.pdf.map((pdf, index) => (
                <button
                  key={index}
                  onClick={() => handlePDFDownload(pdf)}
                  className="link property-pdf-link mb-2"
                >
                  <Icon name="FileText" size={16} />
                  {pdf.name}
                </button>
              ))}
            </div>
          )}

          {/* Call to Action Button */}
          <div className="property-cta-section">
            <button
              onClick={handleWhatsAppContact}
              className="btn btn-primary btn-lg property-cta-btn"
            >
              <Icon name="MessageCircle" size={20} />
              Pide tu cotización
            </button>
          </div>
        </div>
      </div>

      {/* Right Column - Property Image */}
      <div className="flex-item flex-column justify-center align-content-center property-image-section">
        <div className="property-image-container">
          {/* Main Image */}
          {property.imagenes && property.imagenes.length > 0 ? (
            <>
              <div className="property-main-image">
                {imageLoadError ? (
                  <div className="image-error-fallback">
                    <Icon name="Image" size={64} className="text-muted" />
                    <p className="text text-muted">Error al cargar la imagen</p>
                  </div>
                ) : (
                  <img
                    src={`${strapiUrl}${property.imagenes[activeImageIndex].url}`}
                    alt={property.titulo}
                    className="main-image"
                    onClick={handleImageClick}
                    style={{ cursor: "pointer" }}
                    onError={handleImageError}
                    onLoad={handleImageLoad}
                  />
                )}
              </div>

              {/* Image Thumbnails (if multiple images) */}
              {property.imagenes.length > 1 && (
                <div className="property-thumbnails">
                  {property.imagenes.map((image, index) => (
                    <div
                      key={index}
                      className={`thumbnail ${
                        index === activeImageIndex ? "active" : ""
                      }`}
                      onClick={() => handleImageChange(index)}
                    >
                      <img
                        src={`${strapiUrl}${image.url}`}
                        alt={`${property.titulo} - Imagen ${index + 1}`}
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="property-no-image">
              <Icon name="Image" size={64} className="text-muted" />
              <p className="text text-muted">No hay imágenes disponibles</p>
            </div>
          )}
        </div>
      </div>

      {/* Property Photos Modal */}
      <PropertyPhotos
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        images={transformedImages}
        propertyTitle={property.titulo}
        currentImageIndex={activeImageIndex}
      />
    </div>
  );
};

export default PropertyDetail;
