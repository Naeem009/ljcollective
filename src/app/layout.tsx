import type { Metadata } from "next";
import { Montserrat, Playfair_Display } from "next/font/google";
import { WhatsAppButton } from "@/components/contact/WhatsAppLink";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { company, contactDetails, siteUrl } from "@/content/site";
import "@/styles/globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
  variable: "--font-montserrat",
});

const description = `From trend research and creative direction to fabric development, sampling and production, ${company.name} brings every stage of apparel development together. Based in the UAE.`;

const title = `${company.name} | Fashion Development & Apparel Production Partner (UAE)`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: {
    default: title,
    template: `%s | ${company.name}`,
  },
  description,
  applicationName: company.name,
  icons: {
    icon: [
      { url: "/brand/favicon.svg", type: "image/svg+xml" },
      { url: "/brand/favicon.png", type: "image/png" },
    ],
    apple: [{ url: "/brand/favicon-512.png", type: "image/png" }],
  },
  openGraph: {
    title,
    description,
    siteName: company.name,
    locale: "en_GB",
    type: "website",
  },
};

function jsonLd() {
  const url = siteUrl();
  const organization: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.name,
    url,
    logo: `${url}/brand/logo.svg`,
    slogan: company.tagline,
    description: company.statement,
  };
  if (contactDetails.email) organization.email = contactDetails.email;
  if (contactDetails.phone) organization.telephone = contactDetails.phone;
  if (contactDetails.address) {
    organization.address = {
      "@type": "PostalAddress",
      streetAddress: contactDetails.address,
    };
  }
  const sameAs = [contactDetails.linkedin, contactDetails.instagram].filter(Boolean);
  if (sameAs.length > 0) organization.sameAs = sameAs;

  return [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: company.name,
      url,
      description,
    },
    organization,
  ];
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-GB" className={`${playfair.variable} ${montserrat.variable}`}>
      <body className="flex min-h-full flex-col bg-cream font-sans text-espresso antialiased">
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[70] focus:bg-stone focus:px-4 focus:py-3 focus:text-espresso"
        >
          Skip to content
        </a>
        <Header />
        <main id="content" className="flex-1">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()) }} />
      </body>
    </html>
  );
}
