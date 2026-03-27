export interface ResearchPaper {
  id: string;
  title: string;
  author: string;
  description: string;
  abstract: string;
  imageUrl?: string;
  rawHtml?: string;
  pdfUrl?: string; // Added for PDF support
  content: {
    sectionTitle: string;
    paragraphs: string[];
    code?: string;
    chartSymbol?: string;
  }[];
}

export { RESEARCH_PAPERS } from '../papers';
