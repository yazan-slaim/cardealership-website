import { Inter } from "next/font/google";
import "./globals.css";
import { Provider } from "./Providers";
import SmoothScrolling from "@/components/SmoothScroll";
import NewHeader from "@/components/NewHeader";
import NewMenuTemplateNoRouting from "@/components/NewMenuTemplateNoRouting";
import dynamic from "next/dynamic";
import TelemetryProvider from "@/components/TelemetryProvider";

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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TelemetryProvider />
        <Provider>
          <NewMenuTemplateNoRouting />
          <SmoothScrolling>
            <GptCustomCursor />
            <NewHeader />
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
          <WhatsAppChatWidget />
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
