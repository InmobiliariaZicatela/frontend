import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Get landing pages to get the document ID
    const landingPagesResponse = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/inicios`,
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

    // Get detailed contact data with all nested fields
    const contactUrl = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/inicios/${documentId}?populate[Contacto][populate][contactos][populate][tipo][populate]=*&populate[Contacto][populate][contactos][populate][links][populate]=*`;

    const contactResponse = await fetch(contactUrl, {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    if (!contactResponse.ok) {
      throw new Error(`HTTP error! status: ${contactResponse.status}`);
    }

    const contactData = await contactResponse.json();

    // Return both the raw data and a simplified structure analysis
    return NextResponse.json({
      rawData: contactData,
      analysis: {
        hasContacto: !!contactData?.data?.Contacto,
        contactosCount: contactData?.data?.Contacto?.contactos?.length || 0,
        firstContacto: contactData?.data?.Contacto?.contactos?.[0] || null,
        hasTipo: !!contactData?.data?.Contacto?.contactos?.[0]?.tipo,
        hasLinks: !!contactData?.data?.Contacto?.contactos?.[0]?.links,
        tipoStructure:
          contactData?.data?.Contacto?.contactos?.[0]?.tipo || null,
        linksStructure:
          contactData?.data?.Contacto?.contactos?.[0]?.links || null,
      },
    });
  } catch (error) {
    console.error("Error in debug contact:", error);
    return NextResponse.json(
      { error: "Debug contact failed", message: error.message },
      { status: 500 }
    );
  }
}
