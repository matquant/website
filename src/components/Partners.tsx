import { Section } from './ui/Section';
import { partners } from '../data/content';

export const Partners = () => {
  return (
    <Section id="partners" className="border-t border-white/5 py-40">
      <div className="flex flex-col items-center gap-24">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase text-center">
          Partners
        </h2>
        
        <div className="flex flex-wrap justify-center items-center gap-24 md:gap-40">
          {partners.map((partner) => (
            <a
              key={partner.name}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="group flex items-center justify-center grayscale opacity-40 hover:opacity-100 hover:grayscale-0 transition-all duration-700"
              title={partner.name}
            >
              <img
                src={partner.logo}
                alt={`${partner.name} logo`}
                className="h-20 md:h-28 w-auto object-contain max-w-[320px] filter brightness-0 invert opacity-80 group-hover:filter-none group-hover:opacity-100 transition-all duration-500"
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
