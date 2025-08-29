import React from "react";
import "../styles/components/property-extra-details.scss";

const PropertyExtraDetails = ({ data }) => {
  return (
    <div
      id="detalles-extra"
      className="container flex-row justify-between property-extra-details-container"
    >
      <div className="flex-item flex-column justify-center align-content-center property-extra-details-illustration">
        {/* Unsplash Image */}
        <div className="image-container aspect-horizontal property-extra-details-image">
          <img
            src={`${data?.imagen?.url}`}
            alt="Property development and real estate"
            className="property-extra-details-img"
          />
        </div>
      </div>

      <div className="flex-item flex-column justify-center p-1 property-extra-details-content">
        <h2 className="title h3 property-extra-details-title">
          {data?.titulo}
        </h2>
        <p className="text text-lg font-light property-extra-details-description">
          {data?.descripcion}
        </p>
        {data?.puntos && (
          <ul className="list list-dot text-primary font-light gap-2 property-extra-details-list">
            {data?.puntos?.map((item) => (
              <li key={item.id}>{item.punto}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default PropertyExtraDetails;
