# Research Publication Pipeline

This document outlines the process for adding new research papers to the MAT Collective archive. The structure has been flattened to make research content easily accessible in `src/papers/`.

## Directory Structure
- `src/papers/`: Contains individual paper data files (`.ts`).
- `src/papers/index.ts`: The central manifest where papers are registered.
- `public/papers/`: Store the corresponding PDF files here.

## Steps to Add a New Paper

### 1. Create the Content File
Create a new file in `src/papers/` (e.g., `my-new-strategy.ts`):

```typescript
import { ResearchPaper } from '../data/papers';

export const myNewStrategy: ResearchPaper = {
  id: "unique-id-2026",
  title: "Title of the Research",
  author: "Author Name",
  description: "Short 1-2 sentence hook for the card and header.",
  abstract: "Full academic abstract.",
  pdfUrl: "/papers/my-file.pdf", // Path to file in public/papers/
  content: [
    {
      sectionTitle: "Introduction",
      paragraphs: ["Paragraph 1...", "Paragraph 2..."]
    }
    // Add more sections as needed
  ]
};
```

### 2. Register in the Manifest
Open `src/papers/index.ts` and add your paper:

```typescript
import { myNewStrategy } from './my-new-strategy';

export const RESEARCH_PAPERS: ResearchPaper[] = [
  // ... existing papers
  myNewStrategy,
];
```

### 3. Add the PDF
Place your finalized PDF in `public/papers/` and ensure the filename matches the `pdfUrl` defined in your content file.

## Advanced: Custom HTML or Widgets
- **Raw HTML:** Use the `rawHtml` property in your paper object to bypass the standard section renderer for custom formatting.
- **Charts:** Use `chartSymbol` in a section (e.g., `chartSymbol: "NASDAQ:AAPL"`) to automatically embed a TradingView widget, or use reserved keys like `BNN_VISUAL` for custom organization charts.
