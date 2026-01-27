import { features } from '../data/content';
import { Section } from './ui/Section';
import { Card } from './ui/Card';

export const FundamentalAnalysis = () => {
  return (
    <Section id="features" darker>
      <div className="mb-20 relative">
        <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
          FUNDAMENTAL <br />
          <span className="text-muted font-mono text-3xl md:text-5xl opacity-50">ANALYSIS_PROTOCOL</span>
        </h2>
        <div className="h-1 w-24 bg-gradient-to-r from-primary to-transparent mt-4"></div>
        <h3 className="text-xl mt-8 text-primary font-mono tracking-wide">
          // STAY_AHEAD_OF_COMPETITION
        </h3>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <Card key={index} className="flex flex-col gap-6 group min-h-[300px]">
              {/* Background Number */}
              <span className="absolute -right-4 -top-8 text-[120px] font-bold text-white/[0.02] group-hover:text-primary/[0.05] transition-colors font-mono select-none">
                0{index + 1}
              </span>
              
              <div className="flex items-center justify-between z-10">
                <div className="p-3 bg-white/5 rounded-lg border border-white/10 group-hover:border-primary/50 group-hover:bg-primary/10 transition-colors duration-300">
                  <Icon className="text-white group-hover:text-primary transition-colors duration-300" size={24} />
                </div>
                <div className="h-[1px] flex-grow mx-4 bg-white/5 group-hover:bg-primary/20 transition-colors"></div>
              </div>
              
              <div className="z-10 relative">
                <h4 className="text-xl font-bold mb-4 text-white group-hover:text-primary transition-colors tracking-wide">{feature.title}</h4>
                <p className="text-muted text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
                  {feature.description.split('**').map((part, i) => 
                    i % 2 === 1 ? <span key={i} className="text-white font-medium">{part}</span> : part
                  )}
                </p>
                
                {feature.value && (
                  <div className="mt-6 inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded text-xs font-mono text-primary">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></span>
                    {feature.value}
                  </div>
                )}
              </div>
              
              {/* Hover Glow Bottom */}
              <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </Card>
          );
        })}
      </div>
    </Section>
  );
};
