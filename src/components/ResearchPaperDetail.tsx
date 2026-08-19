import { useEffect } from 'react';
import { ArrowLeft, Download, Lock } from 'lucide-react';
import { TradingViewTechnicalAnalysis } from './ui/TerminalWidgets';
import { HRPChart } from './ui/HRPChart';
import { RESEARCH_PAPERS, PROPRIETARY_PAPERS } from '../data/papers';

interface PaperDetailProps {
  id: string;
}

export const ResearchPaperDetail = ({ id }: PaperDetailProps) => {
  const allAvailablePapers = [...RESEARCH_PAPERS, ...PROPRIETARY_PAPERS];
  const paper = allAvailablePapers.find(p => p.id === id);
  const isProprietary = PROPRIETARY_PAPERS.some(p => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!paper) return <div className="p-20 text-center text-white">Paper not found.</div>;

  return (
    <div className="min-h-screen bg-background text-text pb-20 pt-32 px-4 md:px-8">
      {/* Top Navigation */}
      <div className="max-w-4xl mx-auto mb-12 flex items-center justify-between">
        <button 
          onClick={() => window.location.hash = 'research'}
          className="flex items-center gap-2 text-muted hover:text-white transition-colors font-mono text-xs uppercase tracking-widest"
        >
          <ArrowLeft size={14} /> Back to Research
        </button>

        {isProprietary && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 border border-primary/30 text-primary text-[10px] font-mono font-bold uppercase tracking-widest">
            <Lock size={12} /> PROPRIETARY ALPHA
          </div>
        )}
      </div>

      {/* Main Container */}
      <div className="max-w-5xl mx-auto">
        <article className="max-w-4xl mx-auto">
          <header className="mb-20">
            <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary mb-6 font-mono">
              {isProprietary ? 'INTERNAL ALPHA REPOSITORY // CONFIDENTIAL' : 'Public Archive // 2026'}
            </div>
            <h1 className="text-4xl md:text-7xl font-bold mb-6 tracking-tighter text-white uppercase leading-[0.9]">
              {paper.title}
            </h1>
            
            {paper.description ? (
              <p className="text-lg text-muted mb-10 font-sans leading-relaxed max-w-2xl border-l border-primary/30 pl-6">
                {paper.description}
              </p>
            ) : null}
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pt-6 border-t border-white/5">
              <div className="flex items-center gap-8 text-[11px] text-muted font-mono uppercase tracking-widest">
                <div className="flex items-center gap-2">
                  <span className="text-primary opacity-50">BY:</span> <span>{paper.author}</span>
                </div>
              </div>
              
              <a 
                href={paper.pdfUrl || '/papers/placeholder.pdf'} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border border-primary/40 text-primary font-mono text-xs hover:bg-primary hover:text-black transition-all uppercase tracking-widest"
              >
                <Download size={14} /> Download PDF Archive
              </a>
            </div>
          </header>

          {paper.id === 'hrp-optimization-2026' ? (
            <div className="mb-20 max-w-3xl mx-auto">
              <HRPChart />
            </div>
          ) : (paper.imageUrl && !paper.rawHtml) && (
            <div className="mb-20 border border-white/5 bg-surface p-1 max-w-3xl mx-auto shadow-2xl">
              <img src={paper.imageUrl} alt="Research Visual" className="w-full h-auto" />
            </div>
          )}

          {/* Abstract - only show if not rawHtml or if specifically requested */}
          {!paper.rawHtml && paper.abstract && (
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

                  {section.code && (
                    <div className="my-8 bg-black/60 border border-white/10 p-6 rounded-none font-mono text-xs text-primary overflow-x-auto">
                      <div className="text-[10px] text-muted uppercase tracking-widest mb-3 pb-2 border-b border-white/10">
                        MAT Quantitative Algorithm Spec
                      </div>
                      <pre className="text-gray-300 leading-relaxed">
                        <code>{section.code}</code>
                      </pre>
                    </div>
                  )}
                  
                  {section.chartSymbol === 'HRP_VISUAL' ? (
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

          {/* Full PDF View */}
          <div className="mt-32">
            <div className="w-full bg-surface border border-white/5 h-[800px] shadow-2xl overflow-hidden relative">
              <iframe 
                src={`${paper.pdfUrl || '/papers/placeholder.pdf'}#toolbar=1&navpanes=0&scrollbar=1`} 
                className="w-full h-full border-none"
                title={`${paper.title} PDF`}
                loading="lazy"
              >
                <div className="p-12 text-center">
                  <p className="text-muted mb-4 font-mono text-xs uppercase tracking-widest">Unable to render PDF viewer in this browser.</p>
                  <a 
                    href={paper.pdfUrl || '/papers/placeholder.pdf'} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-black font-mono text-xs font-bold uppercase tracking-widest"
                  >
                    <Download size={14} /> Manual Download
                  </a>
                </div>
              </iframe>
            </div>
          </div>

          <footer className="mt-32 pt-12 border-t border-white/5 text-[10px] text-muted font-mono text-center tracking-widest uppercase">
            MAT Research Lab // {isProprietary ? 'PROPRIETARY' : '2026'}
          </footer>
        </article>
      </div>
    </div>
  );
};

