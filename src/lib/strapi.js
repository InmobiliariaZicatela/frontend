const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
const STRAPI_TOKEN = process.env.STRAPI_TOKEN;

// Helper function to make authenticated requests to Strapi
export async function fetchFromStrapi(endpoint, options = {}) {
  if (!STRAPI_TOKEN) {
    throw new Error("STRAPI_TOKEN is not configured");
  }

  const url = `${STRAPI_URL}/api/${endpoint}`;

  const defaultOptions = {
    headers: {
      Authorization: `Bearer ${STRAPI_TOKEN}`,
      "Content-Type": "application/json",
    },
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
    console.error("Error fetching from Strapi:", error);
    throw error;
  }
}
