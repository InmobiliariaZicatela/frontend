"use client";

import React from "react";
import StatusBadge from "./StatusBadge";
import { useRouter } from "next/navigation";

const PropertyCard = ({ property }) => {
  const router = useRouter();

  const handlePropertyClick = (propertyId) => {
    router.push(`/propiedades/${propertyId}`);
  };

  const formatPrice = (price) => {
    return price.toLocaleString("es-MX", {
      style: "currency",
      currency: "MXN",
    });
  };

  return (
    <div
      key={property.id}
      className="properties-card"
      onClick={() => handlePropertyClick(property.documentId)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handlePropertyClick(property.documentId);
        }
      }}
    >
      {/* Property Image */}
      <div className="properties-card-image-container">
        <img
          src={`${property.imagenes[0]?.url}`}
          alt={property.titulo}
          className="properties-card-image"
        />
      </div>

      {/* Property Details */}
      <div className="properties-card-details">
        <div className="properties-card-info">
          <h3 className="text font-medium text-lg text-primary properties-card-name">
            {property.titulo}
          </h3>
          <h3 className="text font-semibold text-lg text-primary properties-card-name">
            {formatPrice(property.precio)}
          </h3>
        </div>
        <div className="properties-card-direction">
          <p className="text font-normal text-sm text-dark properties-card-address">
            {property.direccion}
          </p>
          {property.estatus && <StatusBadge status={property.estatus} />}
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
