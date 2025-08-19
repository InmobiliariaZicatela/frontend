"use client";

import React, { useState } from "react";
import Icon from "./Icon";
import "../styles/components/property-map.scss";

const PropertyMap = ({ location, address }) => {
  const [isLoading, setIsLoading] = useState(true);

  // Function to generate Google Maps embed URL
  const generateMapUrl = (location) => {
    if (!location) return null;

    // If location is coordinates (lat,lng format), use them directly
    if (location.includes(",")) {
      const coords = location.split(",").map((coord) => coord.trim());
      if (coords.length === 2) {
        const lat = parseFloat(coords[0]);
        const lng = parseFloat(coords[1]);

        // Validate coordinates are within valid ranges
        if (lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) {
          return `https://maps.google.com/maps?q=${lat},${lng}&hl=es&z=15&output=embed`;
        }
      }
    }

    // If location is already a Google Maps embed URL, use it directly
    if (
      location.includes("google.com/maps") &&
      location.includes("output=embed")
    ) {
      return location;
    }

    // If location is a regular Google Maps URL, convert to embed
    if (location.includes("google.com/maps")) {
      // Check if it already has output=embed parameter
      if (!location.includes("output=embed")) {
        // Add output=embed parameter if not present
        const separator = location.includes("?") ? "&" : "?";
        return `${location}${separator}output=embed`;
      }
      return location;
    }

    // If location is neither valid coordinates nor a valid URL, return null
    return null;
  };

  // Function to generate Google Maps link for directions
  const generateDirectionsUrl = (location) => {
    if (!location) return null;

    // If location is coordinates, format them for directions
    if (location.includes(",")) {
      const coords = location.split(",").map((coord) => coord.trim());
      if (coords.length === 2) {
        const lat = parseFloat(coords[0]);
        const lng = parseFloat(coords[1]);

        if (lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) {
          return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
        }
      }
    }

    // If location is a Google Maps URL, try to convert to directions
    if (location.includes("google.com/maps")) {
      // For directions, we'll use the current location as origin
      return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
        location
      )}`;
    }

    return null;
  };

  const mapUrl = generateMapUrl(location);
  const directionsUrl = generateDirectionsUrl(location);

  const handleMapLoad = () => {
    setIsLoading(false);
  };

  const handleDirectionsClick = () => {
    if (directionsUrl) {
      window.open(directionsUrl, "_blank");
    }
  };

  if (!location) {
    return (
      <div className="container flex-column property-map-container">
        <div className="property-map-error">
          <Icon name="MapPin" size={48} />
          <h3 className="text text-lg text-primary">Ubicación no disponible</h3>
          <p className="text text-secondary">
            La ubicación debe ser coordenadas (latitud,longitud) o una URL de
            Google Maps válida.
          </p>
        </div>
      </div>
    );
  }

  if (!mapUrl) {
    return (
      <div className="container flex-column property-map-container">
        <div className="property-map-error">
          <Icon name="MapPin" size={48} />
          <h3 className="text text-lg text-primary">
            Formato de ubicación inválido
          </h3>
          <p className="text text-secondary">
            La ubicación debe ser coordenadas (latitud,longitud) o una URL de
            Google Maps válida.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container flex-column property-map-container">
      {/* Map Header */}
      <div className="property-map-header">
        <div className="property-map-title-section">
          <h2 className="title h3 property-map-title">
            <Icon name="MapPin" size={24} />
            Ubicación
          </h2>
          {address && <p className="text property-map-address">{address}</p>}
        </div>

        {directionsUrl && (
          <button
            onClick={handleDirectionsClick}
            className="btn btn-outline btn-sm property-map-directions-btn"
          >
            <Icon name="Navigation" size={16} />
            Cómo llegar
          </button>
        )}
      </div>

      {/* Map Container */}
      <div className="property-map-wrapper">
        {isLoading && (
          <div className="property-map-loading">
            <Icon name="Loader2" size={32} className="spinning" />
            <p className="text text-sm">Cargando mapa...</p>
          </div>
        )}

        <iframe
          src={mapUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          onLoad={handleMapLoad}
          className="property-map-iframe"
          title={`Mapa de ubicación - ${address}`}
        />
      </div>
    </div>
  );
};

export default PropertyMap;
