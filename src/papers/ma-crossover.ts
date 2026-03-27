import type { ResearchPaper } from '../data/papers';

export const maCrossover: ResearchPaper = {
  id: "ma-crossover-2026",
  title: "[IN PROGRESS] Comparative Analysis of Moving Average Crossover Strategies",
  author: "MAT Quant Division",
  description: "A simple study on the performance of 'Golden Cross' and 'Death Cross' signals.",
  abstract: "This project looks at how basic moving average crossovers perform across different stocks. We compare simple moving averages (SMA) to exponential moving averages (EMA) to see which one catches trends faster and which one has fewer false signals.",
  imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Lissage_sinus_bruite_moyenne_glissante.svg/250px-Lissage_sinus_bruite_moyenne_glissante.svg.png",
  pdfUrl: "/papers/placeholder.pdf",
  content: [
    {
      sectionTitle: "Visual Analysis",
      paragraphs: [
        "To understand the practical application, we observe the crossover behavior in real-time."
      ],
      chartSymbol: "NASDAQ:NVDA"
    }
  ]
};
