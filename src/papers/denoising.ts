import type { ResearchPaper } from '../data/papers';

export const denoising: ResearchPaper = {
  id: "denoising",
  title: "Denoising",
  author: "MAT Quant Division",
  description: "Denoising financial data.",
  abstract: "This paper explores the application of denoising techniques on financial time series.",
  pdfUrl: "/mat_research_papers/denoising.pdf",
  rawHtml: `
<h2 class="text-xl font-bold mb-4 font-sans border-b border-white/10 pb-2">1. Introduction</h2>
<p class="mb-4 leading-relaxed text-gray-400">Financial time series data is notoriously noisy, making it difficult to extract meaningful signals. This paper presents an approach to denoise the data.</p>
`,
  content: []
};
