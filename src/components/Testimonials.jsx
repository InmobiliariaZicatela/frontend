"use client";

import React from "react";
import "../styles/components/testimonials.scss";

const Testimonials = ({ data }) => {
  return (
    <div className="container flex-row justify-around py-5 testimonials-container">
      {data.map((testimonial, index) => (
        <div
          key={index}
          className="flex-item flex-column justify-start align-start p-4 testimonial-card"
        >
          <p className="text text-md font-light text-primary mb-5 testimonial-quote">
            {testimonial.texto_testimonio}
          </p>

          <div className="mb-3 testimonial-avatar">
            <img
              src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${testimonial.imagen?.url}`}
              alt={testimonial.nombre}
            />
          </div>

          <p className="text text-xl font-medium text-primary testimonial-client-name">
            {testimonial.nombre}
          </p>

          <p className="text text-md font-regular text-primary testimonial-client-description">
            {testimonial.descripcion}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Testimonials;
