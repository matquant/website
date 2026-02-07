import { partners } from '../data/content';
import { Section } from './ui/Section';

export const Partners = () => {
  return (
    <Section className="py-20 border-y border-white/5 bg-white/[0.01]">
      <div className="flex flex-col items-center gap-12">
        <span className="text-xl font-mono text-muted uppercase tracking-[0.5em] font-bold">PARTNERS</span>
        <div className="flex flex-wrap justify-center items-center gap-16 md:gap-32">
          {partners.map((partner) => (
            <a
              key={partner.name}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group transition-all duration-500"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="h-12 md:h-16 opacity-40 group-hover:opacity-100 group-hover:scale-110 brightness-0 invert transition-all duration-500"
              />
            </a>
          ))}
        </div>
      </div>
    </Section>
  );
};
