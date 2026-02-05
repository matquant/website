import { Section } from './ui/Section';
import { partners } from '../data/content';

export const Partners = () => {
  return (
    <Section id="partners" className="bg-primary/[0.06] border-y border-white/10">
      <div className="flex flex-col items-center gap-10">
        <p className="text-muted text-xs font-mono tracking-[0.3em] uppercase">
          Our Partners
        </p>
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-16">
          {partners.map((partner) => (
            <a
              key={partner.name}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="group flex items-center justify-center grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300"
              title={partner.name}
            >
              <img
                src={partner.logo}
                alt={`${partner.name} logo`}
                className="h-10 md:h-12 w-auto object-contain max-w-[180px]"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (partner.logoFallback && !target.dataset.fallbackUsed) {
                    target.dataset.fallbackUsed = 'true';
                    target.src = partner.logoFallback;
                  }
                }}
              />
            </a>
          ))}
        </div>
      </div>
    </Section>
  );
};
