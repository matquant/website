import { Card } from './ui/Card';
import { Terminal, ArrowRight, ArrowLeft } from 'lucide-react';
import { RESEARCH_PAPERS } from '../data/papers';
import type { ResearchPaper } from '../data/papers';
import { BNNChart } from './ui/BNNChart';
import { HRPChart } from './ui/HRPChart';
import { useState, useEffect } from 'react';

export const ResearchPage = ({ onSelectPaper }: { onSelectPaper: (id: string) => void }) => {
  const [dynamicPapers, setDynamicPapers] = useState<ResearchPaper[]>([]);

  useEffect(() => {
    // Attempt to load the auto-indexed papers
    fetch('/src/data/papers_manifest.json')
      .then(res => res.json())
      .then(async (manifest: { id: string, title: string, fileName: string }[]) => {
        const loaded = await Promise.all(manifest.map(async (p) => {
          const res = await fetch(`/research_papers/${p.fileName}`);
          const html = await res.text();
          return {
            id: p.id,
            title: p.title,
            author: "MAT Research Lab",
            description: "Automatically indexed publication.",
            abstract: "External research document.",
            rawHtml: html,
            content: []
          } as ResearchPaper;
        }));
        setDynamicPapers(loaded);
      })
      .catch(() => console.log("No dynamic papers found."));
  }, []);

  const allPapers = [...dynamicPapers, ...RESEARCH_PAPERS];

  return (
    <div className="min-h-screen bg-background pt-32 pb-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <button 
            onClick={() => window.location.hash = ''}
            className="flex items-center gap-2 text-muted hover:text-white transition-colors mb-8 font-mono text-xs uppercase tracking-widest"
          >
            <ArrowLeft size={14} /> Back to Hub
          </button>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter text-white uppercase">
            Research <br />Archive
          </h1>
          <div className="h-1 w-12 bg-primary"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-px bg-white/5 border border-white/5">
          {allPapers.length > 0 ? (
            allPapers.map((paper) => (
              <Card 
                key={paper.id} 
                className="group p-10 flex flex-col h-full cursor-pointer bg-background hover:bg-surface transition-colors duration-200 border-none"
                onClick={() => onSelectPaper(paper.id)}
              >
                <div className="mb-8 overflow-hidden border border-white/5 aspect-video bg-surface flex items-center justify-center relative">
                  {paper.id === 'bnn-meta-labeling-2026' ? (
                    <div className="w-full h-full grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500">
                      <BNNChart />
                    </div>
                  ) : paper.id === 'hrp-optimization-2026' ? (
                    <div className="w-full h-full grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500">
                      <HRPChart />
                    </div>
                  ) : paper.imageUrl ? (
                    <img src={paper.imageUrl} alt={paper.title} className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-all duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Terminal className="text-white/5" size={48} />
                    </div>
                  )}
                </div>
                
                <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors tracking-tight text-white">{paper.title}</h3>
                <p className="text-muted mb-10 flex-grow leading-relaxed font-sans">{paper.description}</p>

                <div className="mt-auto flex items-center gap-3 text-[10px] font-mono font-bold text-primary uppercase tracking-[0.2em]">
                  Read Publication <ArrowRight size={12} />
                </div>
              </Card>
            ))
          ) : (
            <div className="col-span-2 py-32 text-center bg-background">
              <p className="text-muted font-mono text-xs uppercase tracking-widest">No publications indexed at this time.</p>
            </div>
          )}
          
          {/* Placeholder for future papers */}
          <div className="bg-background flex items-center justify-center p-12 group h-full min-h-[400px]">
            <div className="text-center opacity-20">
              <Terminal className="mx-auto mb-6" size={40} />
              <p className="text-muted font-mono text-[10px] uppercase tracking-[0.3em]">Upcoming Release</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
