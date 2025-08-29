// Server-side only Strapi configuration
// This file should only be imported in server components or API routes

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
const STRAPI_TOKEN = process.env.STRAPI_TOKEN;

export function getStrapiConfig() {
  if (!STRAPI_TOKEN) {
    throw new Error("STRAPI_TOKEN is not configured in server environment");
  }

  return {
    url: STRAPI_URL,
    token: STRAPI_TOKEN,
    headers: {
      Authorization: `Bearer ${STRAPI_TOKEN}`,
      "Content-Type": "application/json",
    },
  };
}

export async function fetchFromStrapiServer(endpoint, options = {}) {
  const config = getStrapiConfig();

  const url = `${config.url}/api/${endpoint}`;

  const defaultOptions = {
    headers: config.headers,
    cache: "force-cache", // Use static caching for build time
    ...options,
  };

  try {
    const response = await fetch(url, defaultOptions);

    if (!response.ok) {
      throw new Error(
        `Strapi API error: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching from Strapi server:", error);
    throw error;
  }
}

// Function to check available content types
export async function getAvailableContentTypes() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"}/api/`,
      {
        headers: {
          Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error("Error checking content types:", error);
  }

  return null;
}

export async function getAllLandingPagesServer() {
  return fetchFromStrapiServer("inicios?populate=*");
}

export async function getLandingPageServer(documentId) {
  return fetchFromStrapiServer(
    `inicios/${documentId}?populate[Hero][populate][imagen][fields]=*&populate[caracteristicas][populate]=*&populate[quienes_somos][populate][puntos][populate]=*&populate[quienes_somos][populate][imagen][fields]=*&populate[Testimonios][populate][imagen][fields]=*&populate[Contacto][populate][contactos][populate][tipo]=*&populate[Contacto][populate][contactos][populate][links]=*&populate[preguntas_respuestas][populate][preguntas_respuestas][populate]=*&populate[ultima_llamada][populate]=*`
  );
}

export async function getContactSectionServer(documentId) {
  return fetchFromStrapiServer(
    `inicios/${documentId}?populate[Contacto][populate][contactos][populate][tipo]=*&populate[Contacto][populate][contactos][populate][links]=*`
  );
}

export async function getPropiedadesPageServer() {
  return fetchFromStrapiServer("propiedads?populate=*");
}

export async function getPropertyByDocumentIdServer(documentId) {
  return fetchFromStrapiServer(
    `propiedads/${documentId}?populate[imagenes][fields]=*&populate[pdf][fields]=*&populate[caracteristicas][populate]=*&populate[encabezado][populate][imagen][fields]=*&populate[encabezado][populate][puntos][populate]=*&populate[colonia][populate]=*`
  );
}
