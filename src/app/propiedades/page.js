import React from "react";
import Spacer from "@/components/Spacer";
import ContactUs from "@/components/ContactUs";
import PropertiesList from "@/components/PropertiesList";
import {
  getContactSectionServer,
  getPropiedadesPageServer,
  getAllLandingPagesServer,
} from "@/lib/strapi-server";

export default async function PropertiesPage() {
  let landingData = null;
  let landingPages = null;
  let propertiesData = null;

  try {
    // Fetch both contact and properties data at build time
    landingPages = await getAllLandingPagesServer();
    const [contactResult, propertiesResult] = await Promise.all([
      getContactSectionServer(landingPages?.data[0]?.documentId),
      getPropiedadesPageServer(),
    ]);

    landingData = contactResult;
    propertiesData = propertiesResult;
  } catch (error) {
    console.error("Error fetching from Strapi:", error);
  }

  return (
    <React.Fragment>
      <Spacer height={80} />
      <PropertiesList initialProperties={propertiesData?.data} />
      <ContactUs data={landingData?.data?.Contacto} />
    </React.Fragment>
  );
}
