import { useState, useEffect } from 'react';
import { Card } from './ui/Card';
import { 
  Terminal, 
  ArrowRight, 
  ArrowLeft, 
  Lock, 
  Unlock 
} from 'lucide-react';
import { RESEARCH_PAPERS, PROPRIETARY_PAPERS } from '../data/papers';
import type { ResearchPaper } from '../data/papers';
import { HRPChart } from './ui/HRPChart';
import { ProprietaryAuthModal } from './ProprietaryAuthModal';

export const ResearchPage = ({ onSelectPaper }: { onSelectPaper: (id: string) => void }) => {
  const [dynamicPapers, setDynamicPapers] = useState<ResearchPaper[]>([]);
  const [activeTab, setActiveTab] = useState<'public' | 'proprietary'>('public');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check existing session auth
    try {
      const auth = sessionStorage.getItem('mat_proprietary_auth');
      if (auth === 'true') {
        setIsAuthenticated(true);
      }
    } catch (e) {
      console.warn('Session storage read error', e);
    }

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

  const allPublicPapers = [...dynamicPapers, ...RESEARCH_PAPERS];

  const handleProprietaryClick = () => {
    if (isAuthenticated) {
      setActiveTab('proprietary');
    } else {
      setIsAuthModalOpen(true);
    }
  };

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    setActiveTab('proprietary');
  };



  return (
    <div className="min-h-screen bg-background pt-32 pb-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Top Header & Navigation */}
        <div className="mb-12">
          <button 
            onClick={() => window.location.hash = ''}
            className="flex items-center gap-2 text-muted hover:text-white transition-colors mb-8 font-mono text-xs uppercase tracking-widest"
          >
            <ArrowLeft size={14} /> Back to Hub
          </button>
          
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8 border-b border-white/10">
            <div>
              <div className="text-[10px] font-mono font-bold tracking-[0.3em] text-primary uppercase mb-3">
                Michigan Algorithmic Traders // Quant Repository
              </div>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white uppercase">
                Research
              </h1>
            </div>

            {/* Segmented View Switcher Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setActiveTab('public')}
                className={`px-5 py-3 text-xs font-mono font-bold tracking-widest uppercase transition-all flex items-center gap-2 ${
                  activeTab === 'public'
                    ? 'bg-white text-black shadow-lg'
                    : 'bg-surface text-muted hover:text-white border border-white/10'
                }`}
              >
                Public Archive
              </button>

              <button
                onClick={handleProprietaryClick}
                className={`px-5 py-3 text-xs font-mono font-bold tracking-widest uppercase transition-all flex items-center gap-2 ${
                  activeTab === 'proprietary'
                    ? 'bg-primary text-black shadow-lg'
                    : 'bg-primary/10 text-primary border border-primary/30 hover:bg-primary/20'
                }`}
              >
                {isAuthenticated ? (
                  <>
                    <Unlock size={14} className="text-black" />
                    Proprietary Research
                  </>
                ) : (
                  <>
                    <Lock size={14} />
                    Proprietary Research
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Tab 1: Public Archive */}
        {activeTab === 'public' && (
          <div className="space-y-12">
            <div className="grid md:grid-cols-2 gap-px bg-white/5 border border-white/5">
              {allPublicPapers.length > 0 ? (
                allPublicPapers.map((paper) => (
                  <Card 
                    key={paper.id} 
                    className="group p-10 flex flex-col h-full cursor-pointer bg-background hover:bg-surface transition-colors duration-200 border-none"
                    onClick={() => onSelectPaper(paper.id)}
                  >
                    <div className="mb-8 overflow-hidden border border-white/5 aspect-video bg-surface flex items-center justify-center relative">
                      {paper.id.startsWith('hrp-optimization') ? (
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
                    {paper.description ? (
                      <p className="text-muted mb-10 flex-grow leading-relaxed font-sans">{paper.description}</p>
                    ) : <div className="mb-10 flex-grow" />}

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

              {/* Proprietary Access Prompt Card in Grid */}
              <div 
                onClick={handleProprietaryClick}
                className="bg-surface/50 hover:bg-surface border border-primary/20 hover:border-primary/50 transition-all p-10 flex flex-col justify-between cursor-pointer group min-h-[400px]"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 border border-primary/30 text-primary text-[10px] font-mono font-bold uppercase tracking-widest">
                      <Lock size={12} /> Proprietary Alpha Repository
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-8 group-hover:text-primary transition-colors tracking-tight uppercase">
                    Proprietary Research
                  </h3>

                  <div className="grid grid-cols-2 gap-3 mb-6 font-mono text-[11px]">
                    <div className="p-3 bg-black/40 border border-white/5">
                      <div className="text-muted/60 text-[9px] uppercase">Alpha Focus</div>
                      <div className="text-white font-bold">HFT & Stat-Arb</div>
                    </div>
                    <div className="p-3 bg-black/40 border border-white/5">
                      <div className="text-muted/60 text-[9px] uppercase">Access Status</div>
                      <div className="text-primary font-bold">Password Required</div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono font-bold text-primary tracking-widest uppercase">
                  <span>{isAuthenticated ? 'Enter Proprietary Research' : 'Authenticate & Unlock'}</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Proprietary Research */}
        {activeTab === 'proprietary' && (
          <div className="space-y-10">


            {/* Proprietary Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {PROPRIETARY_PAPERS.map((paper) => {
                const isHtmlApp = paper.pdfUrl && paper.pdfUrl.endsWith('.html');
                const CardWrapper = isHtmlApp ? 'a' : 'div';
                const wrapperProps = isHtmlApp 
                  ? { href: paper.pdfUrl } 
                  : { onClick: () => onSelectPaper(paper.id) };

                return (
                  <CardWrapper
                    key={paper.id}
                    {...wrapperProps}
                    className="group bg-surface hover:bg-surfaceHighlight border border-white/10 hover:border-primary/40 transition-all p-8 flex flex-col justify-between cursor-pointer block"
                  >
                    <div>
                      {/* Header tags */}
                      <div className="flex items-center justify-between gap-2 mb-6">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-primary/10 border border-primary/30 text-primary text-[10px] font-mono font-bold uppercase tracking-wider">
                          <Lock size={11} /> PROPRIETARY
                        </span>
                      </div>

                      <h3 className="text-xl md:text-2xl font-bold text-white mb-4 group-hover:text-primary transition-colors tracking-tight leading-snug">
                        {paper.title}
                      </h3>
                    </div>

                    <div>
                      <div className="flex items-center justify-between text-xs font-mono font-bold text-primary tracking-widest uppercase mt-6 pt-4 border-t border-white/5">
                        <span>Access Dashboard</span>
                        <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </CardWrapper>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Proprietary Password Modal */}
      <ProprietaryAuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
};
