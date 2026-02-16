import { useState, useEffect } from 'react';
import type { ResearchPaper } from '../data/papers';

export const useLocalPapers = () => {
  const [localPapers, setLocalPapers] = useState<ResearchPaper[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('mat_local_papers');
    if (saved) {
      try {
        setLocalPapers(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse local papers', e);
      }
    }
  }, []);

  const addPaper = (paper: ResearchPaper) => {
    const updated = [paper, ...localPapers];
    setLocalPapers(updated);
    localStorage.setItem('mat_local_papers', JSON.stringify(updated));
  };

  const clearLocalPapers = () => {
    setLocalPapers([]);
    localStorage.removeItem('mat_local_papers');
  };

  return { localPapers, addPaper, clearLocalPapers };
};
