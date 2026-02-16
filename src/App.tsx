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

  // Handle deep-linking and back-button
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#research/')) {
        const id = hash.replace('#research/', '');
        setSelectedPaperId(id);
        setView('paper');
      } else if (hash === '#research') {
        setView('research');
      } else {
        setView('landing');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Check on initial load

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleViewResearch = () => {
    window.location.hash = 'research';
  };

  const handleSelectPaper = (id: string) => {
    window.location.hash = `research/${id}`;
  };

  const handleGoHome = () => {
    window.location.hash = '';
  };

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
            onSelectPaper={handleSelectPaper} 
          />
        )}

        {view === 'paper' && selectedPaperId && (
          <ResearchPaperDetail 
            id={selectedPaperId} 
          />
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;