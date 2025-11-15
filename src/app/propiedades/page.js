"use client";

import React, { useState, useEffect } from "react";
import Spacer from "@/components/Spacer";
import ContactUs from "@/components/ContactUs";
import PropertiesList from "@/components/PropertiesList";
import LoadingSpinner from "@/components/LoadingSpinner";

// Force dynamic rendering - no pre-render
export const dynamic = "force-dynamic";

export default function PropertiesPage() {
  const [landingData, setLandingData] = useState(null);
  const [propertiesData, setPropertiesData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Reset loading state when component mounts
    setLoading(true);

    const fetchData = async () => {
      try {
        // Fetch data dynamically on client side
        const [contactResult, propertiesResult] = await Promise.all([
          fetch("/api/contact"),
          fetch("/api/properties"),
        ]);

        const contactData = await contactResult.json();
        const properties = await propertiesResult.json();

        setLandingData(contactData);
        setPropertiesData(properties);
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
      <div className="fullscreen-loader" key="properties-loading">
        <LoadingSpinner message="Cargando propiedades..." />
      </div>
    );
  }

  return (
    <React.Fragment>
      <Spacer height={80} />
      <PropertiesList initialProperties={propertiesData?.data} />
      <ContactUs data={landingData?.data?.Contacto} />
    </React.Fragment>
  );
}
