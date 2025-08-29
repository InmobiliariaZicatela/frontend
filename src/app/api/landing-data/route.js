import { NextResponse } from "next/server";

export async function GET() {
  try {
    // First get landing pages to get the document ID
    const landingPagesResponse = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/inicios?populate=*`,
      {
        headers: {
          Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!landingPagesResponse.ok) {
      throw new Error(`HTTP error! status: ${landingPagesResponse.status}`);
    }

    const landingPages = await landingPagesResponse.json();
    const documentId = landingPages?.data[0]?.documentId;

    if (!documentId) {
      throw new Error("No document ID found");
    }

    // Then get complete landing page data
    const landingDataUrl = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/inicios/${documentId}?populate[Hero][populate][imagen][fields]=*&populate[caracteristicas][populate]=*&populate[quienes_somos][populate][puntos][populate]=*&populate[quienes_somos][populate][imagen][fields]=*&populate[Testimonios][populate][imagen][fields]=*&populate[Contacto][populate][contactos][populate][tipo]=*&populate[Contacto][populate][contactos][populate][links]=*&populate[preguntas_respuestas][populate][preguntas_respuestas][populate]=*&populate[ultima_llamada][populate]=*`;

    const landingDataResponse = await fetch(landingDataUrl, {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    if (!landingDataResponse.ok) {
      throw new Error(`HTTP error! status: ${landingDataResponse.status}`);
    }

    const landingData = await landingDataResponse.json();
    return NextResponse.json(landingData);
  } catch (error) {
    console.error("Error fetching landing data:", error);
    return NextResponse.json(
      { error: "Failed to fetch landing data" },
      { status: 500 }
    );
  }
}
