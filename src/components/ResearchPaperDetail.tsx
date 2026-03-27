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
      <div className="max-w-4xl mx-auto mb-20 flex justify-between items-center">
        <button 
          onClick={() => window.location.hash = 'research'}
          className="flex items-center gap-2 text-muted hover:text-white transition-colors font-mono text-xs uppercase tracking-widest"
        >
          <ArrowLeft size={14} /> Back to Archive
        </button>
        <div className="flex gap-6">
          <Button variant="outline" size="sm" className="h-10 px-6 font-mono text-xs">
            DOWNLOAD PDF
          </Button>
        </div>
      </div>

      {/* Main Container */}
      <article className="max-w-4xl mx-auto">
        <header className="mb-20">
          <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary mb-6 font-mono">Public Archive // 2026</div>
          <h1 className="text-4xl md:text-7xl font-bold mb-10 tracking-tighter text-white uppercase leading-[0.9]">
            {paper.title}
          </h1>
          
          <div className="flex items-center gap-8 text-[11px] text-muted font-mono uppercase tracking-widest">
            <div className="flex items-center gap-2">
              <span className="text-primary opacity-50">BY:</span> <span>{paper.author}</span>
            </div>
          </div>
          <div className="h-px w-24 bg-primary mt-12"></div>
        </header>

        {paper.id === 'bnn-meta-labeling-2026' ? (
          <div className="mb-20 max-w-3xl mx-auto">
            <BNNChart />
          </div>
        ) : paper.id === 'hrp-optimization-2026' ? (
          <div className="mb-20 max-w-3xl mx-auto">
            <HRPChart />
          </div>
        ) : (paper.imageUrl && !paper.rawHtml) && (
          <div className="mb-20 border border-white/5 bg-surface p-1 max-w-3xl mx-auto shadow-2xl">
            <img src={paper.imageUrl} alt="Research Visual" className="w-full h-auto" />
          </div>
        )}

        {/* Abstract - only show if not rawHtml or if specifically requested */}
        {!paper.rawHtml && (
          <section className="mb-20">
            <h3 className="text-xs font-bold uppercase tracking-widest text-primary font-mono mb-8">Abstract</h3>
            <p className="text-2xl text-gray-300 leading-relaxed font-sans font-medium tracking-tight">
              {paper.abstract}
            </p>
          </section>
        )}

        {/* Dynamic Content */}
        {paper.rawHtml ? (
          <div className="prose prose-invert max-w-none text-muted leading-relaxed font-sans space-y-10 prose-headings:text-white prose-headings:uppercase prose-headings:tracking-tight prose-p:mb-8" dangerouslySetInnerHTML={{ __html: paper.rawHtml }} />
        ) : (
          <div className="space-y-24">
            {paper.content.map((section, idx) => (
              <section key={idx} className="border-t border-white/5 pt-12">
                <h2 className="text-3xl font-bold mb-10 flex items-start gap-6 text-white uppercase tracking-tight">
                  <span className="text-primary font-mono text-xs mt-2">{idx + 1}.0</span>
                  {section.sectionTitle}
                </h2>
                <div className="space-y-8">
                  {section.paragraphs.map((p, pIdx) => (
                    <p key={pIdx} className="text-muted leading-relaxed font-sans text-lg">{p}</p>
                  ))}
                </div>
                
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
