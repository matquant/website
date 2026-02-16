const fs = require('fs');
const path = require('path');

const RESEARCH_DIR = path.join(__dirname, '../public/research');
const PAPERS_FILE = path.join(__dirname, '../src/data/papers.ts');

if (!fs.existsSync(RESEARCH_DIR)) {
  fs.mkdirSync(RESEARCH_DIR, { recursive: true });
}

function sync() {
  console.log('// MAT_SYNC_ENGINE_V1.0 //');
  console.log('Scanning:', RESEARCH_DIR);

  const files = fs.readdirSync(RESEARCH_DIR).filter(f => f.endsWith('.html'));
  
  let papersContent = fs.readFileSync(PAPERS_FILE, 'utf8');
  
  // Extract existing papers to avoid duplicates or keep hardcoded ones
  // For simplicity in this script, we'll append new ones found in the folder
  
  files.forEach(file => {
    const id = file.replace('.html', '').toLowerCase().replace(/\s+/g, '-');
    if (papersContent.includes(id)) {
      console.log(`[-] Skipping ${file} (already exists)`);
      return;
    }

    console.log(`[+] Found new paper: ${file}`);
    const html = fs.readFileSync(path.join(RESEARCH_DIR, file), 'utf8');
    const titleMatch = html.match(/<h2.*?>(.*?)<\/h2>/i) || html.match(/<title>(.*?)<\/title>/i);
    const title = titleMatch ? titleMatch[1].replace(/<[^>]*>?/gm, '') : file.replace('.html', '');

    const newPaperEntry = `
  {
    id: "${id}",
    title: "${title} [AUTO_SYNC]",
    author: "MAT Research Lab",
    description: "Automatically indexed research paper from local storage.",
    abstract: "This paper was automatically detected and indexed by the MAT Sync Engine.",
    rawHtml: `${html.replace(/`/g, '`').replace(/\${/g, '\${')}`,
    content: []
  },`;

    // Insert before the last ];
    const lastIndex = papersContent.lastIndexOf('];');
    papersContent = papersContent.slice(0, lastIndex) + newPaperEntry + papersContent.slice(lastIndex);
  });

  fs.writeFileSync(PAPERS_FILE, papersContent);
  console.log('// SYNC_COMPLETE //');
}

sync();
