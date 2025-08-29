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
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen pt-20">
        <LoadingSpinner message="Cargando propiedades y información de contacto..." />
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
