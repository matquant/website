import { Section } from './ui/Section';
import { Button } from './ui/Button';
import { ArrowRight } from 'lucide-react';

export const AboutUs = ({ onViewProjects }: { onViewProjects: () => void }) => {
  return (
    <Section id="about" className="border-t border-white/5 py-24 md:py-32">
      <div className="grid lg:grid-cols-[250px,1fr] gap-12 lg:gap-32">
        <div className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white uppercase">
            Core <br />Mission
          </h2>
          <div className="w-12 h-1 bg-primary"></div>
        </div>
        
        <div className="max-w-3xl">
          <div className="space-y-8 md:space-y-12 text-base md:text-lg text-muted leading-relaxed mb-12 md:mb-16">
            <p>
              Michigan Algorithmic Traders (MAT) is a student-led University of Michigan quantitative research group. 
              Our day-to-day operations focus on the reproduction and implementation of modern research 
              papers within integrated quantitative frameworks and real-time market data.
            </p>
            <p>
              As the premier Umichigan quant organization, we prioritize seeing how theoretical models perform in real-world conditions. By reproducing 
              results and pressure-testing strategies in our own environments, we bridge the gap between 
              academic concepts and actual market performance. Our focus areas include statistical arbitrage, 
              risk management, and the practical application of machine learning.
            </p>
          </div>

          <Button onClick={onViewProjects} variant="outline" className="h-12 md:h-14 px-6 md:px-8 text-xs md:text-sm">
            View Research Collective <ArrowRight size={14} className="ml-2" />
          </Button>
        </div>
      </div>
    </Section>
  );
};
