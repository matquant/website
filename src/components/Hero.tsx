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

      <Section className="relative z-10 w-full">
        <div className="grid lg:grid-cols-[1.2fr,0.8fr] gap-12 items-start">
          <div className="space-y-12">
            <div className="inline-flex items-center gap-3 px-3 py-1 border border-primary/20 bg-primary/5 text-primary text-xs font-mono uppercase tracking-widest">
              <span className="w-2 h-2 bg-primary animate-pulse"></span>
              Quantitative Research Collective
            </div>

            <div className="space-y-4">
              <h1 className="text-6xl md:text-8xl font-bold leading-[0.9] tracking-tighter text-white">
                MICHIGAN <br />
                ALGORITHMIC <br />
                <span className="text-primary">TRADERS</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-muted max-w-xl leading-relaxed font-sans">
                Bridging the gap between <span className="text-white">academic theory</span> and <span className="text-white">live market execution</span> through rigorous strategy reproduction.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-6 pt-4">
              <Button onClick={onViewResearch} size="lg" variant="primary" className="h-16 px-10 text-lg">
                Explore Research Papers <BookOpen className="ml-2" size={20} />
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/5 max-w-lg">
              <div>
                <div className="text-2xl font-bold text-white">50+</div>
                <div className="text-xs font-mono uppercase text-muted tracking-wider">Papers Indexed</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">12</div>
                <div className="text-xs font-mono uppercase text-muted tracking-wider">Active Strats</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">24/7</div>
                <div className="text-xs font-mono uppercase text-muted tracking-wider">Live Monitoring</div>
              </div>
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
