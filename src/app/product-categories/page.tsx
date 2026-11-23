import type { Metadata } from "next";
import { FinalCta } from "@/components/sections/FinalCta";
import { PageHero } from "@/components/sections/PageHero";
import { SiteImage } from "@/components/ui/SiteImage";
import { categories } from "@/content/categories";
import { pageCopy } from "@/content/copy";
import { images, type ImageKey } from "@/lib/images";

export const metadata: Metadata = {
  title: "Product Categories",
  description:
    "From everyday essentials to contemporary collections, LJ-Collective supports apparel development and production across nine fashion categories.",
  alternates: { canonical: "/product-categories" },
};

export default function ProductCategoriesPage() {
  const copy = pageCopy.categories;

  return (
    <>
      <PageHero eyebrow={copy.eyebrow} title={copy.title}>
        <p>{copy.lead}</p>
        <p className="border border-stone px-4 py-3">{copy.todo}</p>
      </PageHero>
      <div className="bg-cream text-espresso">
        {categories.map((category, index) => {
          const photo = images[category.image as ImageKey];
          const reversed = index % 2 === 1;
          return (
            <article key={category.slug} id={category.slug} className="scroll-mt-24 border-b border-stone">
              <div className="grid w-full items-center gap-8 px-5 py-[clamp(3rem,6vw,5rem)] md:px-8 lg:grid-cols-2 lg:gap-16 lg:px-12">
                <div className={`relative aspect-[4/5] overflow-hidden ${reversed ? "lg:order-2" : ""}`}>
                  <SiteImage image={photo} sizes="(min-width: 1024px) 40vw, 100vw" />
                </div>
                <div>
                  <p className="font-display text-[1.75rem] leading-none text-sienna">{category.number}</p>
                  <h2 className="mt-3 font-display text-[length:var(--text-h3)] font-medium uppercase leading-tight text-espresso">
                    {category.name}
                  </h2>
                  <p className="mt-4 max-w-[46ch] text-base leading-[1.7] text-espresso">{category.description}</p>
                  {photo.note ? <p className="mt-4 text-base text-espresso">{photo.note}</p> : null}
                </div>
              </div>
            </article>
          );
        })}
      </div>
      <FinalCta />
    </>
  );
}
