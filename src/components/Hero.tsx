import { Section } from './ui/Section';
import { Button } from './ui/Button';
import { ArrowRight, ChevronDown } from 'lucide-react';

export const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center pt-20 overflow-hidden">
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono tracking-wider">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              EST. 2025 // UMich
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold leading-none tracking-tight">
              MICHIGAN <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-gray-500">ALGORITHMIC</span> <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary text-glow">TRADERS</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted max-w-lg leading-relaxed border-l-2 border-primary/30 pl-6">
              The premier quantitative finance and algorithmic trading organization.
              <span className="text-white"> Research. Build. Compete.</span>
            </p>
            
            <div className="flex flex-wrap gap-4">
              <a href="https://discord.gg/83J9ZRUKB6" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="primary">
                  Join Now <ArrowRight size={16} />
                </Button>
              </a>
              {/*<Button size="lg" variant="secondary">*/}
              {/*  Read Research*/}
              {/*</Button>*/}
            </div>
          </div>

          <div className="relative">
            {/* Holographic Card Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-2xl blur opacity-20 animate-pulse"></div>
            
            <div className="relative bg-surface/80 backdrop-blur-xl border border-white/10 p-8 rounded-2xl overflow-hidden">
              {/* Scanline */}
              <div className="absolute top-0 left-0 w-full h-1 bg-primary/30 shadow-[0_0_15px_rgba(0,255,148,0.5)] animate-[scan_3s_linear_infinite]"></div>
              
              <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
                <h3 className="text-xl font-bold font-mono text-primary flex items-center gap-2">
                  <span className="text-xs bg-primary text-black px-1 rounded">MAT</span>
                  RESEARCH_CORE
                </h3>
                <div className="flex gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                </div>
              </div>
              
              <div className="space-y-6 text-muted font-mono text-sm leading-relaxed">
                <p>
                  <span className="text-primary mr-2">&gt;</span>
                  Quantitative market analysis & modeling...
                </p>
                <p>
                  <span className="text-primary mr-2">&gt;</span>
                  Student-led research & software development...
                </p>
                <p>
                  <span className="text-primary mr-2">&gt;</span>
                  <span className="text-white">Status:</span> Recruiting for winter 2026.
                </p>
                <div className="p-4 bg-black/40 rounded border border-white/5 mt-4">
                  <div className="flex justify-between text-xs mb-2">
                    <span>SEMESTER_PROGRESS</span>
                    <span className="text-primary">45%</span>
                  </div>
                  <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-[45%] shadow-[0_0_10px_rgba(0,255,148,0.5)]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-primary/50">
        <ChevronDown size={32} />
      </div>
    </div>
  );
};
