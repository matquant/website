import { Card } from './ui/Card';
import { Terminal, ArrowRight, ArrowLeft } from 'lucide-react';
import { RESEARCH_PAPERS, ResearchPaper } from '../data/papers';
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
        <div className="mb-12">
          <button 
            onClick={() => window.location.hash = ''}
            className="flex items-center gap-2 text-primary hover:text-white transition-colors mb-8 font-mono text-sm"
          >
            <ArrowLeft size={16} /> HOMEPAGE
          </button>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            RESEARCH
          </h1>
          <div className="h-1 w-24 bg-gradient-to-r from-primary to-transparent"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {allPapers.length > 0 ? (
            allPapers.map((paper) => (
              <Card 
                key={paper.id} 
                className="group hover:border-primary/40 p-8 flex flex-col h-full cursor-pointer transition-all duration-300"
                onClick={() => onSelectPaper(paper.id)}
              >
                <div className="mb-6 overflow-hidden rounded-lg border border-white/10 aspect-video bg-white/5 flex items-center justify-center relative group">
                  {paper.id === 'bnn-meta-labeling-2026' ? (
                    <div className="w-full h-full transform group-hover:scale-110 transition-transform duration-500">
                      <BNNChart />
                    </div>
                  ) : paper.id === 'hrp-optimization-2026' ? (
                    <div className="w-full h-full transform group-hover:scale-110 transition-transform duration-500">
                      <HRPChart />
                    </div>
                  ) : paper.imageUrl ? (
                    <img src={paper.imageUrl} alt={paper.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Terminal className="text-primary/20" size={48} />
                    </div>
                  )}
                </div>
                
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors tracking-tight">{paper.title}</h3>
                <p className="text-sm text-muted mb-8 flex-grow leading-relaxed group-hover:text-gray-300 transition-colors">{paper.description}</p>

                <div className="mt-auto flex items-center gap-2 text-xs font-mono text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  ACCESS_REPORT <ArrowRight size={14} />
                </div>
              </Card>
            ))
          ) : (
            <div className="col-span-2 py-20 text-center border border-dashed border-white/10 rounded-2xl">
              <p className="text-muted font-mono tracking-widest">NO_PAPERS_FOUND_IN_DATABASE</p>
            </div>
          )}
          
          {/* Placeholder for future papers */}
          <div className="border-2 border-dashed border-white/5 rounded-2xl flex items-center justify-center p-12 group hover:border-white/10 transition-colors h-full min-h-[400px]">
            <div className="text-center">
              <Terminal className="mx-auto mb-4 text-white/10 group-hover:text-primary/20 transition-colors" size={48} />
              <p className="text-muted font-mono text-sm uppercase tracking-widest">Awaiting_Next_Release</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
