import { useState } from 'react';
import { faqs } from '../data/content';
import { Section } from './ui/Section';
import { Plus, Minus, HelpCircle } from 'lucide-react';

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Section id="faq" className="pb-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute right-0 bottom-0 w-1/3 h-full bg-gradient-to-t from-primary/5 to-transparent pointer-events-none"></div>

      <div className="grid md:grid-cols-12 gap-16 relative z-10">
        <div className="md:col-span-4">
          <div className="sticky top-24">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              CLUB <br />
              <span className="text-muted font-mono text-3xl md:text-5xl opacity-50">INFO</span>
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-primary to-transparent mt-4"></div>
            <div className="mt-8 p-6 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm">
               <HelpCircle className="text-primary mb-4" size={32} />
               <p className="text-muted text-sm leading-relaxed">
                 Can't find the answer you're looking for? Reach out to our board members or join our recruitment events.
               </p>
            </div>
          </div>
        </div>

        <div className="md:col-span-8 space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`border border-white/5 rounded-lg transition-all duration-300 ${openIndex === index ? 'bg-white/5 border-primary/30' : 'bg-transparent hover:bg-white/[0.02]'}`}
            >
              <button
                className="w-full flex justify-between items-center p-6 text-left group"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className={`text-lg font-medium font-mono transition-colors ${openIndex === index ? 'text-primary' : 'text-white group-hover:text-primary/80'}`}>
                  <span className="mr-4 text-xs opacity-50">Q_0{index + 1}</span>
                  {faq.question}
                </span>
                <span className={`transition-all duration-300 p-1 rounded border border-white/10 ${openIndex === index ? 'rotate-180 text-primary border-primary/50' : 'text-muted'}`}>
                  {openIndex === index ? <Minus size={16} /> : <Plus size={16} />}
                </span>
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out px-6 ${
                  openIndex === index ? 'max-h-96 opacity-100 pb-6' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="w-full h-px bg-white/5 mb-4"></div>
                <p className="text-gray-400 leading-relaxed pl-8 border-l border-primary/20">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <a href="https://discord.gg/83J9ZRUKB6" target="_blank" rel="noopener noreferrer" className="mt-40 text-center relative group cursor-pointer block">
        <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
        <h2 className="relative z-10 text-5xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white/20 to-white/0 uppercase tracking-tighter group-hover:from-primary/50 group-hover:to-transparent transition-all duration-500">
          Join Now
        </h2>
      </a>
    </Section>
  );
};
