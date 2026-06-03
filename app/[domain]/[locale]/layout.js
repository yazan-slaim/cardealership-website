import { Inter } from "next/font/google";
import "../../globals.css";
import { Provider } from "../../Providers";
import SmoothScrolling from "@/components/SmoothScroll";
import NewHeader from "@/components/NewHeader";
import NewMenuTemplateNoRouting from "@/components/NewMenuTemplateNoRouting";
import dynamic from "next/dynamic";
import TelemetryProvider from "@/components/TelemetryProvider";
import { ViewTransitions } from "next-view-transitions";
import RouteTransitionWatcher from "@/components/RouteTransitionWatcher";

const GptCustomCursor = dynamic(() => import("@/components/GptCustomCursor"), {
  ssr: false,
});
const Footer = dynamic(() => import("@/components/Footer"), {
  ssr: false,
});
const WhatsAppChatWidget = dynamic(() => import("@/components/Chat/WhatsAppChatWidget"), {
  ssr: false,
});

export const metadata = {
  title: "Exquisit Motors — Premium Automotive Gallery",
  description:
    "Discover a curated collection of luxury and performance vehicles. Exquisit Motors specializes in sourcing, importing, and delivering the finest automobiles to discerning clients.",
  keywords: "luxury cars, premium vehicles, car dealership, exotic cars, imports",
};

const inter = Inter({ subsets: ["latin"] });

import { Dealership } from "@/models/Dealership";
import { connectMongoDB } from "@/lib/mongodb";
import { notFound } from "next/navigation";

import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Cairo } from 'next/font/google';

const cairo = Cairo({ subsets: ["arabic", "latin"] });

export default async function DomainLayout({ children, params }) {
  await connectMongoDB();
  const domain = params.domain;
  const locale = params.locale;

  // Provide messages to the client side
  const messages = await getMessages();

  let dealership = await Dealership.findOne({
    $or: [{ subdomain: domain }, { customDomain: domain }]
  });

  if (!dealership) {
    dealership = await Dealership.findOne(); 
    if (!dealership) return notFound();
  }

  const dealershipData = JSON.parse(JSON.stringify(dealership));
  
  const isRtl = locale === 'ar';
  const fontClass = isRtl ? cairo.className : inter.className;

  return (
    <html lang={locale} dir={isRtl ? 'rtl' : 'ltr'}>
      <body className={fontClass}>
        <ViewTransitions>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <TelemetryProvider />
          <Provider>
            <NewMenuTemplateNoRouting dealership={dealershipData} />
            <SmoothScrolling>
              <RouteTransitionWatcher />
              <GptCustomCursor />
              <NewHeader dealership={dealershipData} />
              <div id="menu-push-layer" />

              <div
                id="app-content"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  minHeight: "100vh",
                  width: "100%",
                }}
              >
                {children}
              </div>
            </SmoothScrolling>
            <WhatsAppChatWidget dealership={dealershipData} />
            <Footer dealership={dealershipData} />
          </Provider>
        </NextIntlClientProvider>
        </ViewTransitions>
      </body>
    </html>
  );
}
