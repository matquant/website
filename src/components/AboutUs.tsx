import { Section } from './ui/Section';
import { Button } from './ui/Button';
import { ArrowRight } from 'lucide-react';

export const AboutUs = ({ onViewProjects }: { onViewProjects: () => void }) => {
  return (
    <Section id="about" className="border-t border-white/5">
      <div className="grid md:grid-cols-[250px,1fr] gap-12 lg:gap-32">
        <div className="space-y-6">
          <h2 className="text-4xl font-bold tracking-tight text-white uppercase">
            Core <br />Mission
          </h2>
          <div className="w-12 h-0.5 bg-primary"></div>
        </div>
        
        <div className="max-w-3xl">
          <div className="space-y-10 text-lg text-muted leading-relaxed mb-16">
            <p>
              Michigan Algorithmic Traders (MAT) is a student-led quantitative research organization. 
              Our day-to-day operations focus on the reproduction and implementation of modern research 
              papers within integrated quantitative frameworks and real-time market data.
            </p>
            <p>
              We prioritize seeing how theoretical models perform in real-world conditions. By reproducing 
              results and pressure-testing strategies in our own environments, we bridge the gap between 
              academic concepts and actual market performance. Our focus areas include statistical arbitrage, 
              risk management, and the practical application of machine learning.
            </p>
          </div>

          <Button onClick={onViewProjects} variant="outline" className="h-14 px-8">
            View Research Collective <ArrowRight size={16} />
          </Button>
        </div>
      </div>
    </Section>
  );
};
