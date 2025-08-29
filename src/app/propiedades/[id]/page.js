import React from "react";
import Spacer from "@/components/Spacer";
import ContactUs from "@/components/ContactUs";
import PropertyMap from "@/components/PropertyMap";
import PropertyDetail from "@/components/PropertyDetail";
import Characteristics from "@/components/Characteristics";
import PropertyExtraDetails from "@/components/PropertyExtraDetails";
import LoadingSpinner from "@/components/LoadingSpinner";
import {
  getContactSectionServer,
  getPropertyByDocumentIdServer,
  getAllLandingPagesServer,
} from "@/lib/strapi-server";

export const dynamic = "force-dynamic";

export default async function PropertyDetailPage({ params }) {
  let landingPages = null;
  let landingData = null;
  let propertyData = null;

  const { id: documentId } = await params;

  try {
    // Use documentId to fetch property data
    landingPages = await getAllLandingPagesServer();
    const [contactResult, propertyResult] = await Promise.all([
      getContactSectionServer(landingPages?.data[0]?.documentId),
      getPropertyByDocumentIdServer(documentId),
    ]);

    landingData = contactResult;
    propertyData = propertyResult;
  } catch (error) {
    console.error("Error fetching from Strapi:", error);
  }

  // Show loading spinner while data is being fetched
  if (!propertyData) {
    return (
      <div className="fullscreen-loader">
        <LoadingSpinner message="Cargando propiedad..." />
      </div>
    );
  }

  return (
    <React.Fragment>
      <Spacer height={80} />
      <PropertyDetail property={propertyData?.data} />
      <Spacer height={60} />
      <Characteristics data={propertyData?.data?.caracteristicas} />
      <Spacer height={60} />
      <PropertyMap
        location={propertyData?.data?.coordenadas_mapa}
        address={propertyData?.data?.direccion}
      />
      <PropertyExtraDetails data={propertyData?.data?.encabezado} />
      <ContactUs data={landingData?.data?.Contacto} />
    </React.Fragment>
  );
}
