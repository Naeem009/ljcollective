import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SiteImage } from "@/components/ui/SiteImage";
import { homeCopy } from "@/content/copy";
import { whyPoints } from "@/content/why";
import { images, type ImageKey } from "@/lib/images";

export function WhyLjCollective() {
  return (
    <section id="why-lj-collective" className="bg-stone/25 py-[clamp(3.25rem,6vw,5.5rem)] text-espresso">
      <Container wide>
        <SectionHeading title={homeCopy.why.title} />
        <ol className="mt-14 grid gap-10 md:grid-cols-2 xl:grid-cols-4">
          {whyPoints.map((point) => {
            const photo = images[point.image as ImageKey];
            return (
              <li key={point.number} className="border-t border-stone pt-6">
                <div className="relative mb-5 aspect-[3/2] overflow-hidden">
                  <SiteImage image={photo} sizes="(min-width: 1280px) 22vw, (min-width: 768px) 45vw, 100vw" />
                </div>
                <p className="font-display text-[1.75rem] leading-none text-sienna">{point.number}</p>
                <h3 className="mt-3 font-sans text-base font-semibold uppercase tracking-[0.08em] text-espresso">
                  {point.title}
                </h3>
                <p className="mt-3 text-base leading-[1.7] text-espresso">{point.text}</p>
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
