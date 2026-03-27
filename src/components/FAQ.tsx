import { useState } from 'react';
import { faqs } from '../data/content';
import { Section } from './ui/Section';
import { Plus, Minus, HelpCircle } from 'lucide-react';

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Section id="faq" className="pb-32 border-t border-white/5">
      <div className="grid md:grid-cols-12 gap-16">
        <div className="md:col-span-4">
          <div className="sticky top-32">
            <h2 className="text-4xl font-bold mb-8 tracking-tight text-white uppercase">
              Frequently <br />Asked
            </h2>
            <div className="w-12 h-1 bg-primary mb-12"></div>
            <div className="p-8 border border-white/10 bg-surface">
               <HelpCircle className="text-primary mb-6" size={24} />
               <p className="text-muted text-sm leading-relaxed font-sans">
                 Can't find the answer you're looking for? Reach out to our research board for specific quantitative inquiries regarding our reproduction methods and data pipelines.
               </p>
            </div>
          </div>
        </div>

        <div className="md:col-span-8 space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`border border-white/5 transition-colors duration-200 ${openIndex === index ? 'bg-surface/50 border-primary/20' : 'bg-transparent hover:bg-surface/30'}`}
            >
              <button
                className="w-full flex justify-between items-center p-8 text-left group"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className={`text-lg font-bold transition-colors ${openIndex === index ? 'text-primary' : 'text-white group-hover:text-primary/80'}`}>
                  {faq.question}
                </span>
                <span className={`transition-transform duration-200 ${openIndex === index ? 'rotate-180 text-primary' : 'text-muted'}`}>
                  {openIndex === index ? <Minus size={18} /> : <Plus size={18} />}
                </span>
              </button>
              
              <div 
                className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out px-8 ${
                  openIndex === index ? 'max-h-96 opacity-100 pb-8' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="text-muted leading-relaxed font-sans max-w-2xl">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};
