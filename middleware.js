import { NextResponse } from "next/server";
import createIntlMiddleware from "next-intl/middleware";

const intlMiddleware = createIntlMiddleware({
  locales: ["en", "ar"],
  defaultLocale: "en",
  localePrefix: "always" // Always require /en or /ar
});

export const config = {
  matcher: [
    "/((?!api/|_next/|_static/|_vercel|.*\\..*).*)",
  ],
};

export default function middleware(req) {
  const url = req.nextUrl;
  const hostname = req.headers.get("host");

  // Run next-intl middleware first
  const response = intlMiddleware(req);

  // If next-intl issues a redirect (e.g. from / to /en), return it immediately
  if (response.status >= 300 && response.status < 400) {
    return response;
  }

  const searchParams = req.nextUrl.searchParams.toString();
  const path = `${url.pathname}${searchParams.length > 0 ? `?${searchParams}` : ""}`;

  let currentHost = hostname;
  let domain = "default";
  
  if (currentHost) {
    if (currentHost.includes("localhost")) {
      const parts = currentHost.split(".");
      if (parts.length > 1 && parts[0] !== "localhost") {
        domain = parts[0];
      }
    } else {
      domain = currentHost.split(":")[0]; 
    }
  }

  // next-intl has already ensured that url.pathname starts with /[locale]
  // We now rewrite it to `/[domain]/[locale]/...`
  return NextResponse.rewrite(new URL(`/${domain}${path}`, req.url), {
    headers: response.headers
  });
}
