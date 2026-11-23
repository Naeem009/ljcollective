import type { Metadata } from "next";
import { FinalCta } from "@/components/sections/FinalCta";
import { PageHero } from "@/components/sections/PageHero";
import { SiteImage } from "@/components/ui/SiteImage";
import { homeCopy, pageCopy } from "@/content/copy";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "LJ-Collective brings together creative development, technical expertise and production coordination to support fashion brands and retailers.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  const copy = homeCopy.about;

  return (
    <>
      <PageHero eyebrow={pageCopy.about.eyebrow} title={pageCopy.about.title}>
        {copy.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <p className="border border-stone px-4 py-3">{pageCopy.about.todo}</p>
      </PageHero>
      <section className="bg-cream py-[clamp(3rem,7vw,5rem)] text-espresso">
        <div className="grid w-full items-center gap-10 px-5 md:px-8 lg:grid-cols-2 lg:px-12">
          <div className="relative aspect-[4/5] overflow-hidden">
            <SiteImage image={images.aboutMain} sizes="(min-width: 1024px) 45vw, 100vw" />
          </div>
          <div className="space-y-4 text-base leading-[1.7] text-espresso">
            {copy.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>
      <FinalCta />
    </>
  );
}
