import React from "react";
import FAQ from "@/components/FAQ";
import Hero from "@/components/Hero";
import Spacer from "@/components/Spacer";
import WhoWeAre from "@/components/WhoWeAre";
import ContactUs from "@/components/ContactUs";
import Testimonials from "@/components/Testimonials";
import Characteristics from "@/components/Characteristics";
import LastCallToAction from "@/components/LastCallToAction";
import {
  getAllLandingPagesServer,
  getLandingPageServer,
} from "@/lib/strapi-server";

export default async function Home() {
  let landingData = null;
  let landingPages = null;

  try {
    landingPages = await getAllLandingPagesServer();
    landingData = await getLandingPageServer(landingPages?.data[0]?.documentId);
  } catch (error) {
    console.error("Error fetching from Strapi:", error);
  }

  if (!landingData) {
    console.warn(
      "No se pudo obtener datos de Strapi. Los componentes mostrarán contenido estático."
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
