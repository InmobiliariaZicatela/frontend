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

    // Then get contact section data
    const contactUrl = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/inicios/${documentId}?populate[Contacto][populate][contactos][populate][tipo]=*&populate[Contacto][populate][contactos][populate][links]=*`;

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
    return NextResponse.json(contactData);
  } catch (error) {
    console.error("Error fetching contact data:", error);
    return NextResponse.json(
      { error: "Failed to fetch contact data" },
      { status: 500 }
    );
  }
}
