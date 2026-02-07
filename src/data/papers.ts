export interface ResearchPaper {
  id: string;
  title: string;
  author: string;
  description: string;
  abstract: string;
  imageUrl?: string;
  rawHtml?: string;
  content: {
    sectionTitle: string;
    paragraphs: string[];
    code?: string;
    chartSymbol?: string;
  }[];
}

export const RESEARCH_PAPERS: ResearchPaper[] = [
  {
    id: "ma-crossover-2026",
    title: "Comparative Analysis of Moving Average Crossover Strategies",
    author: "MAT Quant Division",
    description: "A deep dive into signal latency and false-positive frequencies in SMA vs EMA systems.",
    abstract: "This report investigates the efficacy of simple (SMA) versus exponential (EMA) moving average crossover systems. By reproducing historical performance metrics on high-beta equities, we examine the trade-offs between signal latency and false-positive frequencies in trending versus mean-reverting regimes.",
    imageUrl: "https://pbs.twimg.com/media/ERcu2HUUUAEFwPQ.jpg",
    content: [
      {
        sectionTitle: "1. Introduction",
        paragraphs: [
          "Moving averages serve as the foundational building blocks for trend-following systems.",
          "This report focuses on the 50-day and 200-day 'Golden Cross' and 'Death Cross' signals."
        ]
      },
      {
        sectionTitle: "2. Visual Analysis",
        paragraphs: [
          "To understand the practical application, we observe the crossover behavior in real-time."
        ],
        chartSymbol: "NASDAQ:NVDA"
      }
    ]
  },
  {
    id: "template-v1",
    title: "[TEMPLATE] Academic Research Format",
    author: "MAT System",
    description: "The standard HTML template for all MAT research publications.",
    abstract: "This is a placeholder abstract. Researchers should copy this template to ensure consistent academic formatting across all publications.",
    imageUrl: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&q=80&w=800",
    content: [],
    rawHtml: `
      <h2 class="text-xl font-bold mb-4 font-sans border-b border-white/10 pb-2">1. Introduction</h2>
      <p class="mb-4 leading-relaxed text-gray-400">Insert introduction here. Use standard p tags for paragraphs.</p>
      
      <h2 class="text-xl font-bold mb-4 font-sans border-b border-white/10 pb-2">2. Methodology</h2>
      <p class="mb-4 leading-relaxed text-gray-400">Describe the quantitative approach.</p>
      
      <div class="bg-white/5 p-6 border-l-4 border-primary my-8 italic text-gray-300">
        "Quotes or key takeaways can be highlighted like this."
      </div>

      <h2 class="text-xl font-bold mb-4 font-sans border-b border-white/10 pb-2">3. Conclusion</h2>
      <p class="mb-4 leading-relaxed text-gray-400">Summarize findings and potential strategy applications.</p>
    `
  }
];