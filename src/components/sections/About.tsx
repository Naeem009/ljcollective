import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SiteImage } from "@/components/ui/SiteImage";
import { homeCopy } from "@/content/copy";
import { images } from "@/lib/images";

export function About() {
  const copy = homeCopy.about;

  return (
    <section id="about-lj-collective" className="bg-cream py-[clamp(3.25rem,6vw,5.5rem)] text-espresso">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="font-display text-[length:var(--text-h2)] font-medium uppercase leading-[1.05] tracking-[-0.01em] text-espresso">
              {copy.title}
            </h2>
            <div className="mt-6 space-y-4 text-base leading-[1.7] text-espresso">
              {copy.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-8">
              <Button href="/about">{copy.cta}</Button>
            </div>
          </div>
          <Reveal variant="image" className="relative aspect-[4/5] overflow-hidden">
            <SiteImage image={images.aboutMain} sizes="(min-width: 1024px) 45vw, 100vw" />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
