import { Section } from './ui/Section';

export interface CollegeInfo {
  id: string;
  name: string;
  location: string;
  logoUrl: string;
}

export const collegesData: CollegeInfo[] = [
  {
    id: 'umich',
    name: 'University of Michigan',
    location: 'Ann Arbor, MI',
    logoUrl: '/colleges/umich.svg'
  },
  {
    id: 'uchicago',
    name: 'University of Chicago',
    location: 'Chicago, IL',
    logoUrl: '/colleges/uchicago.svg'
  },
  {
    id: 'uf',
    name: 'University of Florida',
    location: 'Gainesville, FL',
    logoUrl: '/colleges/uf.svg'
  },
  {
    id: 'uark',
    name: 'University of Arkansas',
    location: 'Fayetteville, AR',
    logoUrl: '/colleges/uark.png'
  },
  {
    id: 'caltech',
    name: 'California Institute of Technology',
    location: 'Pasadena, CA',
    logoUrl: '/colleges/caltech.png'
  }
];

export const CollegesBanner = () => {
  return (
    <Section id="colleges" className="py-20 md:py-28 border-t border-b border-white/10 bg-background relative overflow-hidden">
      {/* Background Decorative Lighting */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/10 blur-[120px] rounded-full"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:24px_24px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 space-y-16">
        
        {/* Header with MAT Logo */}
        <div className="flex flex-col items-center text-center space-y-6">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-primary/30 bg-surface/80 glass shadow-lg backdrop-blur-md">
            <img 
              src="/MainLogo.png" 
              alt="MAT Logo" 
              className="h-6 w-6 object-contain animate-pulse"
            />
            <span className="text-xs font-mono font-bold tracking-[0.25em] text-primary uppercase">
              MAT // MEMBER NETWORK
            </span>
          </div>

          <div className="space-y-4 max-w-3xl">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white uppercase">
              Colleges & <span className="text-primary">Universities</span> Represented
            </h2>
            <p className="text-muted text-base md:text-lg leading-relaxed font-sans">
              Our quantitative research initiative brings together computational talent, mathematicians, and algorithmic developers from leading institutions across the country.
            </p>
          </div>
        </div>

        {/* Ticker Marquee Banner */}
        <div className="relative w-full overflow-hidden py-4 border-y border-white/5 bg-surface/40 backdrop-blur-sm">
          {/* Subtle Side Fades */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none"></div>

          <div className="flex items-center gap-12 whitespace-nowrap animate-ticker">
            {/* Duplicate array 3x for seamless infinite scroll */}
            {[...collegesData, ...collegesData, ...collegesData].map((college, idx) => (
              <div 
                key={`${college.id}-${idx}`}
                className="flex items-center gap-4 px-6 py-3 rounded-lg bg-surface/60 border border-white/5"
              >
                <img src={college.logoUrl} alt={`${college.name} logo`} className="w-10 h-10 md:w-12 md:h-12 object-contain" />
                <div className="flex flex-col text-left">
                  <span className="text-sm font-mono font-bold text-white">
                    {college.name}
                  </span>
                  <span className="text-xs text-muted">
                    {college.location}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};
