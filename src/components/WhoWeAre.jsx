import React from "react";
import "../styles/components/who-we-are.scss";

const WhoWeAre = ({ data }) => {
  return (
    <div
      id="nosotros"
      className="container flex-row justify-between who-we-are-container"
    >
      <div className="flex-item flex-column justify-center align-content-center who-we-are-illustration">
        <img
          src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${data?.imagen?.url}`}
          alt="Professional real estate team working together"
          className="who-we-are-image"
        />
      </div>

      <div className="flex-item flex-column justify-center p-1 who-we-are-content">
        <h2 className="title h3 who-we-are-title">{data?.titulo}</h2>
        <p className="text text-lg font-light text-primary who-we-are-description">
          {data?.descripcion}
        </p>
        <ul className="list list-dot text-primary font-light gap-2 who-we-are-list">
          {data?.puntos?.map((punto) => (
            <li key={punto.id}>{punto.punto}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WhoWeAre;
