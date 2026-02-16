import { useEffect } from 'react';
import { ArrowLeft, Download, User } from 'lucide-react';
import { Button } from './ui/Button';
import { TradingViewTechnicalAnalysis } from './ui/TerminalWidgets';
import { BNNChart } from './ui/BNNChart';
import { HRPChart } from './ui/HRPChart';
import { RESEARCH_PAPERS } from '../data/papers';

interface PaperDetailProps {
  id: string;
}

export const ResearchPaperDetail = ({ id }: PaperDetailProps) => {
  const paper = RESEARCH_PAPERS.find(p => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!paper) return <div className="p-20 text-center text-white">Paper not found.</div>;

  return (
    <div className="min-h-screen bg-background text-text pb-20 pt-32 px-4 md:px-8">
      {/* Top Navigation */}
      <div className="max-w-4xl mx-auto mb-12 flex justify-between items-center">
        <button 
          onClick={() => window.location.hash = 'research'}
          className="flex items-center gap-2 text-primary hover:text-white transition-colors font-mono text-sm"
        >
          <ArrowLeft size={16} /> HOMEPAGE
        </button>
        <div className="flex gap-4">
          <Button variant="outline" size="sm" className="border-white/10">
            <Download size={14} className="mr-2" /> PDF
          </Button>
        </div>
      </div>

      {/* Main Container */}
      <article className="max-w-4xl mx-auto">
        <header className="mb-16">
          <div className="text-[10px] uppercase tracking-widest text-primary mb-4 font-mono">// PUBLIC_RESEARCH_ARCHIVE</div>
          <h1 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight">
            {paper.title}
          </h1>
          
          <div className="flex items-center gap-6 text-sm text-muted font-mono">
            <div className="flex items-center gap-2">
              <User size={14} className="text-primary" /> <span>{paper.author}</span>
            </div>
          </div>
          <div className="h-[1px] w-full bg-gradient-to-r from-primary/30 to-transparent mt-8"></div>
        </header>

        {paper.id === 'bnn-meta-labeling-2026' ? (
          <div className="mb-16 max-w-3xl mx-auto">
            <BNNChart />
          </div>
        ) : paper.id === 'hrp-optimization-2026' ? (
          <div className="mb-16 max-w-3xl mx-auto">
            <HRPChart />
          </div>
        ) : (paper.imageUrl && !paper.rawHtml) && (
          <div className="mb-16 rounded-lg overflow-hidden border border-white/10 bg-white/5 p-1 max-w-3xl mx-auto">
            <img src={paper.imageUrl} alt="Research Visual" className="w-full h-auto rounded shadow-2xl" />
          </div>
        )}

        {/* Abstract - only show if not rawHtml or if specifically requested */}
        {!paper.rawHtml && (
          <section className="mb-16">
            <h3 className="text-xs uppercase tracking-widest text-primary font-mono mb-4">// ABSTRACT</h3>
            <p className="text-xl text-gray-300 leading-relaxed font-light italic">
              {paper.abstract}
            </p>
          </section>
        )}

        {/* Dynamic Content */}
        {paper.rawHtml ? (
          <div className="prose prose-invert max-w-none text-gray-400 leading-relaxed space-y-8" dangerouslySetInnerHTML={{ __html: paper.rawHtml }} />
        ) : (
          <div className="space-y-16">
            {paper.content.map((section, idx) => (
              <section key={idx}>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <span className="text-primary font-mono text-xs">0{idx + 1}</span>
                  {section.sectionTitle}
                </h2>
                {section.paragraphs.map((p, pIdx) => (
                  <p key={pIdx} className="mb-4 text-gray-400 leading-relaxed">{p}</p>
                ))}
                
                {section.chartSymbol === 'BNN_VISUAL' ? (
                  <div className="my-10">
                    <BNNChart />
                  </div>
                ) : section.chartSymbol === 'HRP_VISUAL' ? (
                  <div className="my-10">
                    <HRPChart />
                  </div>
                ) : section.chartSymbol && (
                  <div className="my-10 rounded-lg overflow-hidden border border-white/10">
                    <TradingViewTechnicalAnalysis symbol={section.chartSymbol} />
                  </div>
                )}
              </section>
            ))}
          </div>
        )}

        <footer className="mt-32 pt-12 border-t border-white/5 text-[10px] text-muted font-mono text-center tracking-widest uppercase">
          MAT Research Lab // 2026
        </footer>
      </article>
    </div>
  );
};
