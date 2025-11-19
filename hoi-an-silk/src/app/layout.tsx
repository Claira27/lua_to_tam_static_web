import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Chatbot from "@/components/chatbot/Chatbot";
import { SITE_CONFIG } from "@/lib/constants";
import { CartProvider } from "@/contexts/CartContext";

export const metadata: Metadata = {
  title: `${SITE_CONFIG.name} - ${SITE_CONFIG.tagline}`,
  description: SITE_CONFIG.description,
  keywords: ["lụa tơ tằm", "Hội An", "silk", "Vietnamese silk", "handmade", "traditional"],
  authors: [{ name: SITE_CONFIG.name }],
  openGraph: {
    title: `${SITE_CONFIG.name} - ${SITE_CONFIG.tagline}`,
    description: SITE_CONFIG.description,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        <CartProvider>
          <Header />
          <main className="min-h-screen pt-0">
            {children}
          </main>
          <Footer />
          <Chatbot />
        </CartProvider>
      </body>
    </html>
  );
}
