import { Section } from './ui/Section';
import { Button } from './ui/Button';
import { ArrowRight, ChevronDown, BookOpen } from 'lucide-react';
import { Terminal } from './ui/Terminal';
import { PlexusBackground } from './ui/PlexusBackground';

export const Hero = ({ onViewResearch }: { onViewResearch: () => void }) => {
  return (
    <div className="relative min-h-screen flex items-center pt-32 overflow-hidden">
      <PlexusBackground />
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Animated Orbs */}
        <div className="absolute top-[20%] right-[10%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[10%] left-[5%] w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px] animate-pulse delay-1000"></div>
        
        {/* Grid Overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
        
        {/* Tech Lines */}
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
        <div className="absolute top-0 right-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-primary/10 to-transparent"></div>
      </div>

      <Section className="relative z-10 w-full">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-10">
            <h1 className="text-5xl md:text-7xl font-bold leading-none tracking-tight">
              MICHIGAN <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-gray-500">ALGORITHMIC</span> <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary text-glow">TRADERS</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted max-w-lg leading-relaxed border-l-2 border-primary/30 pl-6">
              A quantitative finance and algorithmic trading organization.
              <span className="text-white"> Research. Build. Compete.</span>
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <Button onClick={onViewResearch} size="lg" className="px-12 py-8 text-xl bg-white text-black hover:bg-primary transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-primary/40 group">
                View Research <BookOpen className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>

          <div className="relative">
            <Terminal />
          </div>
        </div>
      </Section>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-primary/50">
        <ChevronDown size={32} />
      </div>
    </div>
  );
};
