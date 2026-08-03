import type { ResearchPaper } from '../data/papers';

export const denoising: ResearchPaper = {
  id: "denoising",
  title: "[IN PROGRESS] Machine Learning Asset Allocation via Denoised Covariance and Momentum",
  author: "MAT Quant Division",
  description: "Machine learning asset allocation using a denoised covariance matrix with momentum asset selection on an index.",
  abstract: "This research presents a machine learning asset allocation framework utilizing a denoised covariance matrix combined with momentum asset selection across index constituents to enhance signal stability and portfolio performance.",
  pdfUrl: "/mat_research_papers/denoising.pdf",
  rawHtml: `
<h2 class="text-xl font-bold mb-4 font-sans border-b border-white/10 pb-2">1. Introduction</h2>
<p class="mb-4 leading-relaxed text-gray-400"><strong>Status: Work In Progress</strong></p>
<p class="mb-4 leading-relaxed text-gray-400">Financial empirical covariance matrices often contain significant noise, leading to sub-optimal portfolio weighting. This paper introduces an asset allocation strategy combining denoised covariance estimation with momentum asset selection on an index via machine learning.</p>
`,
  content: []
};

