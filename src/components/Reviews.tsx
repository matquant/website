import { testimonials } from '../data/content';
import { Section } from './ui/Section';
import { Card } from './ui/Card';
import { Quote } from 'lucide-react';

export const Reviews = () => {
  return (
    <Section id="reviews" darker className="relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20"></div>

      <div className="mb-20 relative z-10">
        <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
          INDUSTRY <br />
          <span className="text-muted font-mono text-3xl md:text-5xl opacity-50">RECOGNITION</span>
        </h2>
        <div className="h-1 w-24 bg-gradient-to-r from-accent to-transparent mt-4"></div>
        <h3 className="text-xl mt-8 text-accent font-mono tracking-wide">
          // WHERE_WE_WORK
        </h3>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
        {testimonials.map((review, index) => (
          <Card key={index} className="relative group border-accent/10 hover:border-accent/40">
            <Quote className="absolute top-6 right-6 text-accent/20 group-hover:text-accent/40 transition-colors" size={48} />
            
            <div className="mb-8 flex items-center gap-4">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center border border-accent/20 group-hover:scale-110 transition-transform">
                <span className="font-mono text-accent font-bold text-lg">{review.name.charAt(0)}</span>
              </div>
              <div>
                <h4 className="text-lg font-bold text-white group-hover:text-accent transition-colors">{review.name}</h4>
                <p className="text-muted text-xs font-mono">{review.role}</p>
              </div>
            </div>
            
            <p className="text-gray-400 leading-relaxed relative z-10 font-light italic border-l-2 border-white/5 pl-4 group-hover:border-accent/50 transition-colors">
              "{review.text}"
            </p>
            
            <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center">
              <span className="text-xs font-mono text-accent">{review.handle}</span>
              <div className="flex gap-1">
                {[1,2,3,4,5].map(i => (
                  <div key={i} className="w-1 h-1 bg-accent rounded-full opacity-50"></div>
                ))}
              </div>
            </div>
          </Card>
        ))}
        
         <Card className="relative group border-accent/10 hover:border-accent/40 hidden lg:block">
            <Quote className="absolute top-6 right-6 text-accent/20 group-hover:text-accent/40 transition-colors" size={48} />
            
            <div className="mb-8 flex items-center gap-4">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center border border-accent/20 group-hover:scale-110 transition-transform">
                <span className="font-mono text-accent font-bold text-lg">{testimonials[0].name.charAt(0)}</span>
              </div>
              <div>
                <h4 className="text-lg font-bold text-white group-hover:text-accent transition-colors">{testimonials[0].name}</h4>
                <p className="text-muted text-xs font-mono">{testimonials[0].role}</p>
              </div>
            </div>
            
            <p className="text-gray-400 leading-relaxed relative z-10 font-light italic border-l-2 border-white/5 pl-4 group-hover:border-accent/50 transition-colors">
              "{testimonials[0].text}"
            </p>
             <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center">
              <span className="text-xs font-mono text-accent">{testimonials[0].handle}</span>
              <div className="flex gap-1">
                {[1,2,3,4,5].map(i => (
                  <div key={i} className="w-1 h-1 bg-accent rounded-full opacity-50"></div>
                ))}
              </div>
            </div>
          </Card>
      </div>
    </Section>
  );
};
