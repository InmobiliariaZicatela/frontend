import React from "react";
import Spacer from "@/components/Spacer";
import ContactUs from "@/components/ContactUs";
import PropertyMap from "@/components/PropertyMap";
import PropertyDetail from "@/components/PropertyDetail";
import Characteristics from "@/components/Characteristics";
import PropertyExtraDetails from "@/components/PropertyExtraDetails";
import {
  getContactSectionServer,
  getPropertyByDocumentIdServer,
  getPropiedadesPageServer,
} from "@/lib/strapi-server";

// Generate static params for all properties at build time
export async function generateStaticParams() {
  try {
    const properties = await getPropiedadesPageServer();

    const params =
      properties?.data?.map((property) => {
        const id = property.documentId; // Use documentId instead of numeric id
        return { id };
      }) || [];

    return params;
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export default async function PropertyDetailPage({ params }) {
  let landingData = null;
  let propertyData = null;

  const { id: documentId } = await params;

  try {
    // Use documentId to fetch property data
    const [contactResult, propertyResult] = await Promise.all([
      getContactSectionServer(),
      getPropertyByDocumentIdServer(documentId),
    ]);

    landingData = contactResult;
    propertyData = propertyResult;
  } catch (error) {
    console.error("Error fetching from Strapi:", error);
  }

  if (!propertyData) {
    console.warn(
      "No se pudo obtener datos de Strapi. Los componentes mostrarán contenido estático."
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
