# MAT Research Paper Template

To add a new paper to the website, follow these steps:

1. Open `src/data/papers.ts`.
2. Copy the template below and paste it into the `RESEARCH_PAPERS` array.
3. Fill in the fields.

### Template:

{
  id: "unique-paper-id", // No spaces, use dashes
  title: "Your Title Here",
  author: "Author Name or Division",
  date: "Month Year",
  description: "Short 1-sentence blurb for the archive card.",
  tags: ["Tag1", "Tag2"],
  abstract: "Formal abstract paragraph here.",
  content: [
    {
      sectionTitle: "1. Introduction",
      paragraphs: [
        "First paragraph...",
        "Second paragraph..."
      ]
    },
    {
      sectionTitle: "2. Visual Analysis",
      paragraphs: ["Check the chart below."],
      chartSymbol: "NASDAQ:AAPL" // Optional: Displays a live TradingView gauge
    },
    {
      sectionTitle: "3. Implementation",
      paragraphs: ["Code details..."],
      code: "print('Your code here')" // Optional: Displays a dark code block
    }
  ]
}

### Option 2: Raw HTML (Easiest for Complex Layouts)
If you prefer to write your report in pure HTML, use the `rawHtml` field:

{
  id: "my-custom-report",
  title: "Custom HTML Report",
  // ... other fields ...
  rawHtml: \`
    <h2 class="text-xl font-bold mb-4">My Header</h2>
    <p class="mb-4">My content...</p>
  \`
}

### Interactive Template
We have added a **[TEMPLATE]** card in the Research Archive. 
1. Click the template card on the website.
2. Scroll to the bottom.
3. Click **"Copy HTML Source"** to get the starter code.
4. Paste it into an HTML editor, write your report, and then drop it back into `papers.ts`.

