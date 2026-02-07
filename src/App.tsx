import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutUs } from './components/AboutUs';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { Partners } from './components/Partners';
import { Ticker } from './components/ui/Ticker';
import { ResearchPage } from './components/ResearchPage';
import { ResearchPaperDetail } from './components/ResearchPaperDetail';

function App() {
  const [view, setView] = useState<'landing' | 'research' | 'paper'>('landing');
  const [selectedPaperId, setSelectedPaperId] = useState<string | null>(null);

  const handleViewResearch = () => {
    setView('research');
    window.scrollTo(0, 0);
  };

  const handleSelectPaper = (id: string) => {
    setSelectedPaperId(id);
    setView('paper');
    window.scrollTo(0, 0);
  };

  const handleGoHome = () => {
    setView('landing');
    window.scrollTo(0, 0);
  };

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  return (
    <div className="min-h-screen bg-background text-text font-sans selection:bg-primary/30 selection:text-white">
      <Ticker />
      <Navbar onViewResearch={handleViewResearch} onGoHome={handleGoHome} />
      
      <main>
        {view === 'landing' && (
          <>
            <Hero onViewResearch={handleViewResearch} />
            <AboutUs onViewProjects={handleViewResearch} />
            <Partners />
            <FAQ />
          </>
        )}

        {view === 'research' && (
          <ResearchPage 
            onBack={handleGoHome} 
            onSelectPaper={handleSelectPaper} 
          />
        )}

        {view === 'paper' && selectedPaperId && (
          <ResearchPaperDetail 
            id={selectedPaperId} 
            onBack={handleViewResearch} 
          />
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;