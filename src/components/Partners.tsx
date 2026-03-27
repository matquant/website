import { partners } from '../data/content';
import { Section } from './ui/Section';

export const Partners = () => {
  return (
    <Section className="py-24 border-y border-white/5 bg-surface/50">
      <div className="flex flex-col md:flex-row items-center justify-between gap-12">
        <span className="text-sm font-mono text-muted uppercase tracking-[0.3em] font-bold border-l-2 border-primary/40 pl-4">PARTNERS</span>
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 grayscale opacity-50 contrast-125">
          {partners.map((partner) => (
            <a
              key={partner.name}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group transition-opacity duration-300 hover:opacity-100"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="h-8 md:h-10 brightness-0 invert"
              />
            </a>
          ))}
        </div>
      </div>
    </Section>
  );
};
