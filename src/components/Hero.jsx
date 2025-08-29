"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import "../styles/components/hero.scss";

const Hero = ({ data }) => {
  const [imageAspect, setImageAspect] = useState("aspect-vertical");
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (data?.imagen?.url) {
      const img = new Image();
      img.onload = () => {
        const isHorizontal = img.width > img.height;
        const isSquare = Math.abs(img.width - img.height) < 50; // Allow some tolerance

        if (isSquare) {
          setImageAspect("aspect-square");
        } else if (isHorizontal) {
          setImageAspect("aspect-16-10"); // Good for landscape images
        } else {
          setImageAspect("aspect-vertical"); // Keep vertical for portrait images
        }
        setImageLoaded(true);
      };
      img.src = `${data.imagen.url}`;
    }
  }, [data?.imagen?.url]);

  return (
    <div
      id="inicio"
      className="container flex-row justify-between hero-container"
    >
      <div className="flex-item flex-column justify-center p-1 hero-content">
        <h1 className="header hero-title " style={{ marginBottom: "15px" }}>
          {data?.titulo}
        </h1>
        <p
          className="text text-xl font-regular text-primary"
          style={{ marginBottom: "40px" }}
        >
          {data?.explicacion}
        </p>
        <div className="hero-cta-container">
          <Link href="/propiedades">
            <button className="btn btn-primary btn-md">Ver Propiedades</button>
          </Link>
          <p
            className="text text-md font-regular text-primary"
            style={{ margin: 0 }}
          >
            {data?.texto_persuasivo}
          </p>
        </div>
      </div>
      <div className="flex-item flex-column justify-center align-content-center hero-image-wrapper">
        <div
          className={`image-container ${imageAspect} object-fill size-md hero-image-container ${
            imageLoaded ? "loaded" : "loading"
          }`}
        >
          <img
            src={`${data?.imagen?.url}`}
            alt="Hero"
            onLoad={() => setImageLoaded(true)}
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
