import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import Nav from "@/components/site/Nav";
import Footer from "@/components/site/Footer";
import AgeGate from "@/components/site/AgeGate";
import CookieConsent from "@/components/site/CookieConsent";
import ScrollProgress from "@/components/site/ScrollProgress";
import ScrollGlow from "@/components/site/ScrollGlow";
import SmoothScroll from "@/components/site/SmoothScroll";
import Cursor from "@/components/site/Cursor";
import { JsonLd, organizationSchema, websiteSchema } from "@/lib/seo/jsonld";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/site-config";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
  title: {
    default: `${SITE_NAME} · Corporate`,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME }],
  icons: {
    icon: "/images/pernod/icons/favicon.png",
    apple: "/images/pernod/icons/apple-touch-icon-152x152.png",
  },
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    type: "website",
    locale: "en_IN",
    siteName: SITE_NAME,
    url: SITE_URL,
  },
  twitter: { card: "summary_large_image", title: SITE_NAME, description: SITE_DESCRIPTION },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#050506",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inter:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <JsonLd id="ld-organization" data={[organizationSchema(), websiteSchema()]} />
      </head>
      <body className="ll-grain">
        <a href="#main" className="ll-skip">Skip to content</a>
        <SmoothScroll>
          <Cursor />
          <ScrollGlow />
          <ScrollProgress />
          <AgeGate />
          <Nav />
          <main id="main">{children}</main>
          <Footer />
          <CookieConsent />
        </SmoothScroll>
      </body>
    </html>
  );
}
