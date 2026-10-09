export interface ResearchPaper {
  id: string;
  title: string;
  author: string;
  description: string;
  abstract: string;
  date?: string;
  imageUrl?: string;
  rawHtml?: string;
  pdfUrl?: string; // Added for PDF support
  reader?: boolean; // Render as an immersive scrollable PDF reader
  thumbnail?: string; // Card image (first page of the PDF)
  content: {
    sectionTitle: string;
    paragraphs: string[];
    code?: string;
    chartSymbol?: string;
  }[];
}

export { RESEARCH_PAPERS } from '../papers';
export { PROPRIETARY_PAPERS } from './proprietaryPapers';
