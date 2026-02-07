import { Section } from './ui/Section';
import { Button } from './ui/Button';
import { ArrowRight } from 'lucide-react';

export const AboutUs = ({ onViewProjects }: { onViewProjects: () => void }) => {
  return (
    <Section id="about" darker>
      <div className="max-w-4xl">
        <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight">
          ABOUT US
        </h2>
        <div className="h-1 w-24 bg-gradient-to-r from-primary to-transparent mb-12"></div>
        
        <div className="space-y-8 text-lg text-muted leading-relaxed mb-12">
          <p>
            Michigan Algorithmic Traders (MAT) is a student-led quantitative research organization. 
            Our day-to-day operations focus on the reproduction and implementation of modern research 
            papers within live coding and trading environments.
          </p>
          <p>
            We prioritize seeing how theoretical models perform in real-world conditions. By reproducing 
            results and pressure-testing strategies in our own environments, we bridge the gap between 
            academic concepts and actual market performance. Our focus areas include statistical arbitrage, 
            risk management, and the practical application of machine learning.
          </p>
        </div>

        <Button onClick={onViewProjects} size="lg" variant="primary">
          View Research <ArrowRight size={16} />
        </Button>
      </div>
    </Section>
  );
};
