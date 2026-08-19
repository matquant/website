import { useState } from 'react';
import { Section } from './ui/Section';
import { GraduationCap, MapPin, Sparkles, Building2, ChevronRight, Users } from 'lucide-react';

export interface CollegeInfo {
  id: string;
  name: string;
  shortName: string;
  location: string;
  tagline: string;
  accentColor: string;
  badgeBg: string;
  borderGlow: string;
  primaryFocus: string;
  memberHighlight: string;
}

export const collegesData: CollegeInfo[] = [
  {
    id: 'umich',
    name: 'University of Michigan',
    shortName: 'UMichigan',
    location: 'Ann Arbor, MI',
    tagline: 'Founding Headquarters & Research Hub',
    accentColor: '#FFCB05',
    badgeBg: 'rgba(255, 203, 5, 0.12)',
    borderGlow: 'rgba(255, 203, 5, 0.4)',
    primaryFocus: 'Statistical Arbitrage & Market Microstructure',
    memberHighlight: 'Founding Chapter & Strategy Engine'
  },
  {
    id: 'uchicago',
    name: 'University of Chicago',
    shortName: 'UChicago',
    location: 'Chicago, IL',
    tagline: 'Financial Mathematics & Quantitative Econometrics',
    accentColor: '#A4343A',
    badgeBg: 'rgba(164, 52, 58, 0.15)',
    borderGlow: 'rgba(164, 52, 58, 0.4)',
    primaryFocus: 'Stochastic Calculus & Derivative Pricing',
    memberHighlight: 'Option Theory & Risk Research'
  },
  {
    id: 'uf',
    name: 'University of Florida',
    shortName: 'University of Florida',
    location: 'Gainesville, FL',
    tagline: 'Algorithmic Execution & High-Performance Computing',
    accentColor: '#FA4616',
    badgeBg: 'rgba(250, 70, 22, 0.15)',
    borderGlow: 'rgba(250, 70, 22, 0.4)',
    primaryFocus: 'Signal Processing & Infrastructure Development',
    memberHighlight: 'Execution Pipeline & Data Engineering'
  },
  {
    id: 'uark',
    name: 'University of Arkansas',
    shortName: 'University of Arkansas',
    location: 'Fayetteville, AR',
    tagline: 'Computational Mathematics & Factor Analysis',
    accentColor: '#9D2235',
    badgeBg: 'rgba(157, 34, 53, 0.15)',
    borderGlow: 'rgba(157, 34, 53, 0.4)',
    primaryFocus: 'Portfolio Optimization & Monte Carlo Modeling',
    memberHighlight: 'Risk Analytics & Drawdown Defense'
  },
  {
    id: 'caltech',
    name: 'California Institute of Technology',
    shortName: 'Caltech',
    location: 'Pasadena, CA',
    tagline: 'Deep Learning & Non-Linear Predictive Systems',
    accentColor: '#FF6C00',
    badgeBg: 'rgba(255, 108, 0, 0.15)',
    borderGlow: 'rgba(255, 108, 0, 0.4)',
    primaryFocus: 'Neural Architecture Search & Machine Learning Alpha',
    memberHighlight: 'AI Modeling & Advanced Time-Series'
  }
];

// Custom Vector SVG Logos for each university
const CollegeLogo = ({ id, color }: { id: string; color: string }) => {
  switch (id) {
    case 'umich':
      return (
        <svg viewBox="0 0 100 100" className="w-10 h-10 md:w-12 md:h-12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="100" height="100" rx="20" fill="#00274C" />
          <path d="M22 28H36.5L50 56.5L63.5 28H78V72H65.5V45.5L52.5 72H47.5L34.5 45.5V72H22V28Z" fill={color} />
        </svg>
      );
    case 'uchicago':
      return (
        <svg viewBox="0 0 100 100" className="w-10 h-10 md:w-12 md:h-12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="100" height="100" rx="20" fill="#181418" stroke={color} strokeWidth="2" />
          <path d="M50 18L76 30V54C76 68 64 78 50 82C36 78 24 68 24 54V30L50 18Z" fill="rgba(164, 52, 58, 0.2)" stroke={color} strokeWidth="3" />
          <path d="M50 28C40 28 32 36 32 46C32 58 41 64 50 64C56 64 62 61 66 56L72 61C66 68 58 72 50 72C34 72 23 60 23 46C23 31 34 20 50 20C58 20 66 24 71 30L65 35C61 31 56 28 50 28Z" fill={color} />
        </svg>
      );
    case 'uf':
      return (
        <svg viewBox="0 0 100 100" className="w-10 h-10 md:w-12 md:h-12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="100" height="100" rx="20" fill="#0021A5" />
          <path d="M25 25H75V37H39V44H69V56H39V75H25V25Z" fill={color} />
          <path d="M55 44H75V75H62V56H55V44Z" fill="#FFFFFF" opacity="0.9" />
        </svg>
      );
    case 'uark':
      return (
        <svg viewBox="0 0 100 100" className="w-10 h-10 md:w-12 md:h-12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="100" height="100" rx="20" fill="#1C1014" stroke={color} strokeWidth="2" />
          <path d="M50 18L78 75H62L50 50L38 75H22L50 18Z" fill={color} />
          <path d="M38 58H62V66H38V58Z" fill="#FFFFFF" />
        </svg>
      );
    case 'caltech':
      return (
        <svg viewBox="0 0 100 100" className="w-10 h-10 md:w-12 md:h-12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="100" height="100" rx="20" fill="#141414" stroke={color} strokeWidth="2" />
          <path d="M50 15L74 32V60C74 72 63 80 50 85C37 80 26 72 26 60V32L50 15Z" fill="rgba(255, 108, 0, 0.15)" stroke={color} strokeWidth="2" />
          <path d="M50 28C50 28 58 38 58 48C58 55 54 60 50 62C46 60 42 55 42 48C42 38 50 28 50 28Z" fill={color} />
          <path d="M50 40C50 40 54 46 54 51C54 54 52 56 50 58C48 56 46 54 46 51C46 46 50 40 50 40Z" fill="#FFD000" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 100 100" className="w-10 h-10 md:w-12 md:h-12" fill="none">
          <rect width="100" height="100" rx="20" fill="#222" />
          <GraduationCap className="w-6 h-6 text-primary m-auto" />
        </svg>
      );
  }
};

export const CollegesBanner = () => {
  const [selectedCollege, setSelectedCollege] = useState<string | null>('umich');

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
                className="flex items-center gap-3 px-4 py-2 rounded-lg bg-surface/60 border border-white/5 hover:border-primary/40 transition-colors cursor-pointer group"
                onClick={() => setSelectedCollege(college.id)}
              >
                <CollegeLogo id={college.id} color={college.accentColor} />
                <div className="flex flex-col text-left">
                  <span className="text-xs font-mono font-bold text-white group-hover:text-primary transition-colors">
                    {college.shortName}
                  </span>
                  <span className="text-[10px] text-muted flex items-center gap-1">
                    <MapPin size={10} className="text-primary/70" />
                    {college.location}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive College Showcase Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
          {collegesData.map((college) => {
            const isSelected = selectedCollege === college.id;

            return (
              <div
                key={college.id}
                onClick={() => setSelectedCollege(college.id)}
                className={`relative group cursor-pointer p-6 rounded-xl transition-all duration-300 border ${
                  isSelected 
                    ? 'bg-surface/90 shadow-2xl scale-[1.02]' 
                    : 'bg-surface/40 hover:bg-surface/70 hover:scale-[1.01]'
                }`}
                style={{
                  borderColor: isSelected ? college.accentColor : 'rgba(255, 255, 255, 0.08)',
                  boxShadow: isSelected ? `0 0 25px ${college.borderGlow}` : 'none'
                }}
              >
                {/* Accent Corner Bar */}
                <div 
                  className="absolute top-0 left-0 right-0 h-1 rounded-t-xl transition-opacity duration-300"
                  style={{ backgroundColor: college.accentColor, opacity: isSelected ? 1 : 0.4 }}
                />

                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <CollegeLogo id={college.id} color={college.accentColor} />
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors">
                        {college.shortName}
                      </h3>
                      <p className="text-xs text-muted flex items-center gap-1 mt-0.5 font-mono">
                        <MapPin size={12} style={{ color: college.accentColor }} />
                        {college.location}
                      </p>
                    </div>
                  </div>

                  <span 
                    className="text-[10px] font-mono font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full border"
                    style={{ 
                      backgroundColor: college.badgeBg, 
                      color: college.accentColor,
                      borderColor: `${college.accentColor}40`
                    }}
                  >
                    MEMBER
                  </span>
                </div>

                <div className="space-y-3 border-t border-white/5 pt-4">
                  <p className="text-xs text-text/90 font-medium leading-relaxed">
                    {college.tagline}
                  </p>
                  
                  <div className="flex items-center justify-between text-[11px] font-mono text-muted pt-2">
                    <span className="flex items-center gap-1.5 text-white/80">
                      <Building2 size={12} className="text-primary" />
                      {college.primaryFocus.split('&')[0]}
                    </span>
                    <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform text-primary" />
                  </div>
                </div>
              </div>
            );
          })}

          {/* "+ Nationwide Network" Card ("and yeah") */}
          <div className="relative p-6 rounded-xl border border-dashed border-primary/30 bg-surface/20 flex flex-col justify-between hover:border-primary/60 transition-all group">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-primary animate-spin" style={{ animationDuration: '8s' }} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors">
                    + Nationwide Network
                  </h3>
                  <p className="text-xs text-primary/80 font-mono">Open Application</p>
                </div>
              </div>

              <p className="text-xs text-muted leading-relaxed">
                MAT welcomes student researchers, software engineers, and quantitative traders from universities nationwide regardless of home campus.
              </p>
            </div>

            <div className="pt-6 border-t border-white/5 flex items-center justify-between">
              <span className="text-[11px] font-mono text-white/70 flex items-center gap-1">
                <Users size={12} className="text-primary" />
                Collaborative Desks
              </span>
              <span className="text-xs font-mono text-primary font-semibold flex items-center gap-1 group-hover:underline">
                Apply Now <ChevronRight size={12} />
              </span>
            </div>
          </div>

        </div>

      </div>
    </Section>
  );
};
