import type { ResearchPaper } from '../data/papers';

export const hrpOptimization: ResearchPaper = {
  id: "hrp-optimization-2026",
  title: "[IN PROGRESS] Neural Network Based Hierarchical Risk Parity",
  author: "MAT Quant Division",
  description: "",
  abstract: "This paper explores the integration of Neural Networks with the Hierarchical Risk Parity (HRP) approach. Unlike traditional tree-based models, neural architectures provide the cross-sectional complexity needed to capture true alpha before HRP handles the allocation.",
  pdfUrl: "/mat_research_papers/mat_paper.pdf",
  rawHtml: `
<h2 class="text-xl font-bold mb-4 font-sans border-b border-white/10 pb-2">1. Introduction</h2>
<p class="mb-4 leading-relaxed text-gray-400"><strong>Status: Work In Progress</strong></p>
`,
  content: [
    {
      sectionTitle: "Hierarchical Correlation Structure",
      paragraphs: [],
      chartSymbol: "HRP_VISUAL"
    }
  ]
};
