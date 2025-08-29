import { NextResponse } from "next/server";

export async function GET() {
  try {
    const debugInfo = {
      strapiUrl: process.env.NEXT_PUBLIC_STRAPI_URL,
      hasToken: !!process.env.STRAPI_TOKEN,
      tokenLength: process.env.STRAPI_TOKEN
        ? process.env.STRAPI_TOKEN.length
        : 0,
      siteUrl: process.env.NEXT_PUBLIC_SITE_URL,
      timestamp: new Date().toISOString(),
    };

    // Test Strapi connection
    if (process.env.NEXT_PUBLIC_STRAPI_URL && process.env.STRAPI_TOKEN) {
      try {
        const testResponse = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/inicios?populate=*`,
          {
            headers: {
              Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
              "Content-Type": "application/json",
            },
          }
        );

        debugInfo.strapiTest = {
          status: testResponse.status,
          ok: testResponse.ok,
          statusText: testResponse.statusText,
        };

        if (testResponse.ok) {
          const testData = await testResponse.json();
          debugInfo.strapiData = {
            hasData: !!testData.data,
            dataLength: testData.data ? testData.data.length : 0,
            firstItem: testData.data ? testData.data[0] : null,
          };
        }
      } catch (strapiError) {
        debugInfo.strapiError = strapiError.message;
      }
    }

    return NextResponse.json(debugInfo);
  } catch (error) {
    return NextResponse.json(
      { error: "Debug failed", message: error.message },
      { status: 500 }
    );
  }
}
