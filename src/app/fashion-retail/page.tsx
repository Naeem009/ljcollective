import type { Metadata } from "next";
import { FinalCta } from "@/components/sections/FinalCta";
import { PageHero } from "@/components/sections/PageHero";
import { pageCopy } from "@/content/copy";
import { processStages } from "@/content/process";
import { audiences } from "@/content/site";

export const metadata: Metadata = {
  title: "Fashion & Retail",
  description:
    "LJ-Collective works with fashion brands and retailers to turn ideas into commercially ready apparel, from the first concept to sampling, manufacturing and delivery.",
  alternates: { canonical: "/fashion-retail" },
};

export default function FashionRetailPage() {
  const copy = pageCopy.fashion;

  return (
    <>
      <PageHero eyebrow={copy.eyebrow} title={copy.title}>
        {copy.intro.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </PageHero>
      <section className="bg-cream py-[clamp(3.25rem,6vw,5.5rem)] text-espresso">
        <div className="w-full px-5 md:px-8 lg:px-12">
          <h2 className="font-display text-[length:var(--text-h2)] font-medium uppercase leading-[1.05] text-espresso">
            {copy.audienceTitle}
          </h2>
          <ol className="mt-10 divide-y divide-stone border-y border-stone">
            {audiences.map((audience, index) => (
              <li key={audience} className="grid gap-3 py-5 sm:grid-cols-[4rem_1fr] sm:items-baseline">
                <span className="font-display text-[1.75rem] leading-none text-sienna">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="text-base text-espresso">{audience}</p>
              </li>
            ))}
          </ol>
          <p className="mt-8 border border-stone px-4 py-3 text-base text-espresso">{copy.todo}</p>
          <h2 className="mt-16 font-display text-[length:var(--text-h3)] font-medium uppercase text-espresso">
            {copy.processTitle}
          </h2>
          <ol className="mt-8 grid gap-8 md:grid-cols-2">
            {processStages.map((stage) => (
              <li key={stage.number} className="border-t border-stone pt-5">
                <p className="font-display text-[1.75rem] leading-none text-sienna">{stage.number}</p>
                <h3 className="mt-3 font-sans text-base font-semibold uppercase tracking-[0.08em] text-espresso">
                  {stage.title}
                </h3>
                <p className="mt-3 text-base leading-[1.7] text-espresso">{stage.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <FinalCta />
    </>
  );
}
