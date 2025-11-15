"use client";

import React, { useState, useEffect } from "react";
import FAQ from "@/components/FAQ";
import Hero from "@/components/Hero";
import Spacer from "@/components/Spacer";
import WhoWeAre from "@/components/WhoWeAre";
import ContactUs from "@/components/ContactUs";
import Testimonials from "@/components/Testimonials";
import Characteristics from "@/components/Characteristics";
import LastCallToAction from "@/components/LastCallToAction";
import LoadingSpinner from "@/components/LoadingSpinner";

// Force dynamic rendering - no pre-render
export const dynamic = "force-dynamic";

export default function Home() {
  const [landingData, setLandingData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Reset loading state when component mounts
    setLoading(true);

    const fetchData = async () => {
      try {
        // Fetch data dynamically on client side
        const [landingPagesResult, landingDataResult, propertiesResult] =
          await Promise.all([
            fetch("/api/landing-pages"),
            fetch("/api/landing-data"),
          ]);

        const landingPages = await landingPagesResult.json();
        const landingData = await landingDataResult.json();

        setLandingData(landingData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Cleanup function to reset state when component unmounts
    return () => {
      setLoading(false);
    };
  }, []);

  if (loading) {
    return (
      <div className="fullscreen-loader" key="home-loading">
        <LoadingSpinner message="Cargando información de la inmobiliaria..." />
      </div>
    );
  }

  return (
    <React.Fragment>
      <Spacer height={80} />
      <Hero data={landingData?.data?.Hero} />
      <Characteristics data={landingData?.data?.caracteristicas} />
      <Spacer height={50} />
      <WhoWeAre data={landingData?.data?.quienes_somos} />
      <Testimonials data={landingData?.data?.Testimonios} />
      <ContactUs data={landingData?.data?.Contacto} />
      <FAQ data={landingData?.data?.preguntas_respuestas} />
      <LastCallToAction data={landingData?.data?.ultima_llamada} />
    </React.Fragment>
  );
}
