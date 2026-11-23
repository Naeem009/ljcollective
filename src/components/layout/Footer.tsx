import Link from "next/link";
import type { SVGProps } from "react";
import { WhatsAppLink } from "@/components/contact/WhatsAppLink";
import { Logo } from "@/components/ui/Logo";
import { company, contactDetails, navItems } from "@/content/site";

function LinkedInIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" />
      <path d="M7.5 10.5V17" />
      <path d="M7.5 7.4h.01" />
      <path d="M11.2 17v-3.8a1.9 1.9 0 0 1 3.8 0V17" />
    </svg>
  );
}

function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden {...props}>
      <rect x="4" y="4" width="16" height="16" />
      <circle cx="12" cy="12" r="3.4" />
      <circle cx="16.6" cy="7.4" r="0.7" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Footer() {
  const { email, phone, whatsapp, address, linkedin, instagram } = contactDetails;
  const showContact = Boolean(email || phone || whatsapp || address || linkedin || instagram);

  return (
    <footer className="bg-stone text-espresso">
      <div
        className={`grid w-full gap-12 px-5 py-16 md:grid-cols-2 md:px-8 lg:px-12 ${
          showContact ? "lg:grid-cols-4" : "lg:grid-cols-3"
        }`}
      >
        <div>
          <Logo />
          <p className="mt-6 max-w-[34ch] text-base leading-relaxed text-espresso">{company.statement}</p>
        </div>
        <nav aria-label="Footer">
          <ul className="flex flex-col gap-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-base text-espresso underline-offset-4 hover:underline">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <span aria-hidden className="mb-4 block h-px w-8 bg-mineral" />
          <p className="font-sans text-[12px] font-medium uppercase tracking-[0.18em] text-espresso">
            Fashion development & production
          </p>
        </div>
        {showContact ? (
          <div className="text-base text-espresso">
            <p className="font-sans text-[12px] font-medium uppercase tracking-[0.18em] text-espresso">Contact</p>
            <ul className="mt-4 space-y-2">
              {email ? (
                <li>
                  <a className="text-espresso underline-offset-4 hover:underline" href={`mailto:${email}`}>
                    {email}
                  </a>
                </li>
              ) : null}
              {phone ? (
                <li>
                  <a className="text-espresso underline-offset-4 hover:underline" href={`tel:${phone}`}>
                    {phone}
                  </a>
                </li>
              ) : null}
              {whatsapp ? (
                <li>
                  <WhatsAppLink className="text-espresso underline-offset-4 hover:underline">
                    {`WhatsApp ${whatsapp}`}
                  </WhatsAppLink>
                </li>
              ) : null}
              {address ? <li className="max-w-[28ch] text-espresso">{address}</li> : null}
            </ul>
            {linkedin || instagram ? (
              <ul className="mt-5 flex gap-3">
                {linkedin ? (
                  <li>
                    <a
                      href={linkedin}
                      className="inline-flex h-11 w-11 items-center justify-center text-espresso hover:text-sienna"
                      aria-label={`${company.name} on LinkedIn`}
                    >
                      <LinkedInIcon className="h-6 w-6" />
                    </a>
                  </li>
                ) : null}
                {instagram ? (
                  <li>
                    <a
                      href={instagram}
                      className="inline-flex h-11 w-11 items-center justify-center text-espresso hover:text-sienna"
                      aria-label={`${company.name} on Instagram`}
                    >
                      <InstagramIcon className="h-6 w-6" />
                    </a>
                  </li>
                ) : null}
              </ul>
            ) : null}
          </div>
        ) : null}
      </div>
      <div className="border-t border-espresso/20">
        <p className="w-full px-5 py-5 text-base text-espresso md:px-8 lg:px-12">
          © 2026 {company.name}. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
