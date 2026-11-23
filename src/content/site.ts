export const company = {
  name: "LJ-Collective",
  legalName: "LJ-Collective",
  descriptor: "Textiles & Apparel",
  statement: "Fashion development and production, from the first idea to the finished collection.",
  tagline: "Ideas into products. Creativity into production.",
  locationLine: "Based in the UAE",
} as const;

export const navItems = [
  { label: "Home", href: "/" },
  { label: "Fashion & Retail", href: "/fashion-retail" },
  { label: "Our Services", href: "/services" },
  { label: "Product Categories", href: "/product-categories" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const cta = {
  label: "Start a project",
  href: "/contact",
} as const;

export const audiences = [
  "Established fashion brands",
  "Emerging labels",
  "Fashion retailers / retail chains",
  "Online fashion businesses",
  "Private-label brands",
  "Distributors and brand owners",
] as const;

function present(value: string | undefined) {
  const trimmed = value?.trim() ?? "";
  return trimmed.length > 0 ? trimmed : "";
}

const officeAddress = "401-05 GAL BUSINESS CENTER GALADARI BUILDING 16 DUBAI PRODUCTION CITY, DUBAI";
const officeEmail = "info@jaguartextiles.com";
const officeWhatsapp = "+971 50 936 1747";

function whatsappLink(display: string) {
  const digits = display.replace(/\D/g, "");
  return digits ? `https://wa.me/${digits}` : "";
}

const whatsapp = present(process.env.NEXT_PUBLIC_CONTACT_WHATSAPP) || officeWhatsapp;

export const contactDetails = {
  email: present(process.env.NEXT_PUBLIC_CONTACT_EMAIL) || officeEmail,
  phone: present(process.env.NEXT_PUBLIC_CONTACT_PHONE),
  whatsapp,
  whatsappHref: whatsappLink(whatsapp),
  address: present(process.env.NEXT_PUBLIC_CONTACT_ADDRESS) || officeAddress,
  linkedin: present(process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN),
  instagram: present(process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM),
};

export function siteUrl() {
  return (present(process.env.NEXT_PUBLIC_SITE_URL) || "https://example.com").replace(/\/$/, "");
}
