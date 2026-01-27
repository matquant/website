import React, { useState } from 'react';
import { productCategories } from '../data/content';
import { Section } from './ui/Section';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { ChevronRight, Terminal } from 'lucide-react';

export const Products = () => {
  const [activeCategory, setActiveCategory] = useState(productCategories[0].name);

  return (
    <Section id="products" className="relative">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none"></div>

      <div className="mb-20">
        <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
          RESEARCH <br />
          <span className="text-muted font-mono text-3xl md:text-5xl opacity-50">INITIATIVES</span>
        </h2>
        <div className="h-1 w-24 bg-gradient-to-r from-secondary to-transparent mt-4"></div>
        <h3 className="text-xl mt-8 text-secondary font-mono tracking-wide">
          // EXPLORE_OUR_WORK
        </h3>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Category Navigation - Cyberpunk Sidebar Style */}
        <div className="lg:col-span-1 flex flex-col gap-2">
          <div className="text-xs font-mono text-muted mb-4 px-2">// SELECT_CATEGORY</div>
          {productCategories.map((category) => (
            <button
              key={category.name}
              onClick={() => setActiveCategory(category.name)}
              className={`text-left px-4 py-4 rounded-sm transition-all duration-200 flex items-center justify-between group border border-transparent ${
                activeCategory === category.name 
                  ? 'bg-white/5 border-primary/30 text-primary shadow-[inset_4px_0_0_0_#00ff94]' 
                  : 'text-muted hover:text-white hover:bg-white/5 hover:border-white/10'
              }`}
            >
              <span className="font-mono text-sm tracking-wide">{category.name}</span>
              <ChevronRight size={14} className={`transition-transform duration-300 ${activeCategory === category.name ? 'text-primary translate-x-1' : 'opacity-0 group-hover:opacity-100'}`} />
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="lg:col-span-3">
          {productCategories.map((category) => (
            <div 
              key={category.name} 
              className={`space-y-8 animate-in fade-in slide-in-from-right-4 duration-500 ${activeCategory === category.name ? 'block' : 'hidden'}`}
            >
              <div className="border-b border-white/10 pb-6">
                <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                  <Terminal size={20} className="text-secondary" />
                  {category.name}
                </h3>
                <p className="text-muted max-w-2xl">{category.description}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {category.items.map((item, idx) => (
                  <Card key={idx} className="flex flex-col h-full group hover:border-secondary/30" hoverEffect={false}>
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-xs font-mono text-secondary/50 border border-secondary/20 px-2 py-1 rounded">
                        ID:{(idx + 1).toString().padStart(3, '0')}
                      </span>
                    </div>
                    
                    <h4 className="text-lg font-bold text-white mb-3 group-hover:text-secondary transition-colors">
                      {item.name.replace("Cuban's", "")}
                      {item.name.includes("MAT") && <span className="text-xs font-normal text-muted ml-2 opacity-60 font-mono">// CORE</span>}
                    </h4>
                    
                    <p className="text-sm text-muted mb-6 flex-grow leading-relaxed group-hover:text-gray-300">
                      {item.description}
                    </p>
                    
                    <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:via-secondary/30 transition-colors"></div>
                  </Card>
                ))}
              </div>
              
              <div className="mt-8 flex justify-end">
                <Button variant="outline">View Research Paper</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};
