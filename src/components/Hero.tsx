import { Section } from './ui/Section';
import { Button } from './ui/Button';
import { BookOpen } from 'lucide-react';
import { Terminal } from './ui/Terminal';

export const Hero = ({ onViewResearch }: { onViewResearch: () => void }) => {
  return (
    <div className="relative min-h-screen flex items-center pt-24 overflow-hidden bg-background">
      {/* Structural Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Subtle Grid - static and professional */}
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
        </div>
        
        {/* Minimalist Accents */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent"></div>
      </div>

      <Section className="relative z-10 w-full py-20 md:py-32">
        <div className="grid lg:grid-cols-[1.2fr,0.8fr] gap-12 items-start">
          <div className="space-y-8 md:space-y-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-primary/20 bg-primary/5 text-primary text-[10px] md:text-xs font-mono uppercase tracking-[0.2em]">
              <span className="w-1.5 h-1.5 bg-primary animate-pulse"></span>
              quantitative research group
            </div>

            <div className="space-y-6">
              <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold leading-[0.85] tracking-tighter text-white uppercase">
                Michigan <br />
                Algorithmic <br />
                <span className="text-primary">Traders</span>
              </h1>
              
              <p className="text-lg md:text-2xl text-muted max-w-xl leading-relaxed font-sans border-l border-primary/20 pl-6">
                Bridging the gap between academic theory and live market execution through rigorous strategy reproduction.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <Button onClick={onViewResearch} size="lg" variant="primary" className="h-14 md:h-16 px-8 md:px-10 text-base md:text-lg">
                Explore Research <BookOpen className="ml-2" size={18} />
              </Button>
            </div>
          </div>

          <div className="hidden lg:block relative mt-12">
             <div className="absolute -top-4 -left-4 w-12 h-12 border-t-2 border-l-2 border-primary/30"></div>
             <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-2 border-r-2 border-primary/30"></div>
             <Terminal />
          </div>
        </div>
      </Section>
    </div>
  );
};
