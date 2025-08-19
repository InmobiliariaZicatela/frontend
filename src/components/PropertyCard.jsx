"use client";

import React from "react";
import { useRouter } from "next/navigation";

const PropertyCard = ({ property }) => {
  const router = useRouter();

  const handlePropertyClick = (propertyId) => {
    router.push(`/propiedades/${propertyId}`);
  };

  // Check if this is Strapi data or fallback data
  const isStrapiData = property.titulo && property.direccion && property.precio;
  
  if (isStrapiData) {
    // Render Strapi data
    return (
      <div
        className="properties-card"
        onClick={() => handlePropertyClick(property.id)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handlePropertyClick(property.id);
          }
        }}
      >
        {/* Property Image */}
        <div className="properties-card-image-container">
          <img
            src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${property.imagen?.url}`}
            alt={property.titulo}
            className="properties-card-image"
          />
        </div>

        {/* Property Details */}
        <div className="properties-card-details">
          <div className="properties-card-info">
            <h3 className="text font-semibold text-lg text-primary properties-card-name">
              {property.titulo}
            </h3>
            <p className="text font-normal text-sm text-dark properties-card-address">
              {property.direccion}
            </p>
          </div>
          <div className="properties-card-price">
            <span className="text font-bold text-lg text-primary">
              {property.precio}
            </span>
          </div>
        </div>
      </div>
    );
  } else {
    // Render fallback data
    return (
      <div
        className="properties-card"
        onClick={() => handlePropertyClick(property.id)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handlePropertyClick(property.id);
          }
        }}
      >
        {/* Property Image */}
        <div className="properties-card-image-container">
          <img
            src={property.image}
            alt={property.name}
            className="properties-card-image"
          />
        </div>

        {/* Property Details */}
        <div className="properties-card-details">
          <div className="properties-card-info">
            <h3 className="text font-semibold text-lg text-primary properties-card-name">
              {property.name}
            </h3>
            <p className="text font-normal text-sm text-dark properties-card-address">
              {property.address}
            </p>
          </div>
          <div className="properties-card-price">
            <span className="text font-bold text-lg text-primary">
              {property.price}
            </span>
          </div>
        </div>
      </div>
    );
  }
};

export default PropertyCard; 