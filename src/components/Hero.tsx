import { Section } from './ui/Section';
import { Button } from './ui/Button';
import { ArrowRight } from 'lucide-react';
import { WireBackground } from './ui/WireBackground';

export const Hero = ({ onViewResearch }: { onViewResearch: () => void }) => {
  return (
    <div className="relative min-h-[90vh] flex items-center overflow-hidden bg-background">
      <WireBackground />

      <Section className="relative z-10 w-full py-24 md:py-32">
        <h1 className="sr-only">University of Michigan Quantitative Research Group - MAT</h1>
        <div className="max-w-3xl mx-auto text-center">
          <img
            src="/MainLogo.png"
            alt="Michigan Algorithmic Traders logo"
            className="h-36 md:h-48 w-auto mx-auto mb-10"
            style={{ filter: 'drop-shadow(0 0 48px rgba(255, 203, 5, 0.12))' }}
          />

          <p className="text-xs font-mono uppercase tracking-[0.3em] text-muted mb-8">
            Michigan Algorithmic Traders
          </p>

          <p className="font-display text-5xl sm:text-6xl md:text-7xl leading-[1.05] tracking-tight text-white mb-8">
            From paper<br />to portfolio.
          </p>

          <p className="text-base md:text-lg text-muted max-w-xl mx-auto leading-relaxed mb-12">
            A student-run quantitative research group at the University of Michigan.
            We reproduce modern research, implement the strategies, and test them
            against real market data.
          </p>

          <div className="flex flex-col items-center gap-4">
            <Button onClick={onViewResearch} size="lg" variant="primary">
              View Research <ArrowRight size={16} />
            </Button>
            <p className="text-xs font-mono text-muted uppercase tracking-widest">
              Note: we are not accepting new members at this time.
            </p>
          </div>
        </div>
      </Section>
    </div>
  );
};
