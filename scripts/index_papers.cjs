const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../public/research_papers');
const manifestFile = path.join(__dirname, '../src/data/papers_manifest.json');

if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
}

const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
const manifest = files.map(file => {
    const content = fs.readFileSync(path.join(dir, file), 'utf8');
    const titleMatch = content.match(/<h2.*?>(.*?)<\/h2>/i) || content.match(/<title>(.*?)<\/title>/i);
    const title = titleMatch ? titleMatch[1].replace(/<[^>]*>?/gm, '') : file.replace('.html', '');
    
    return {
        id: file.replace('.html', '').toLowerCase().replace(/\s+/g, '-'),
        title: title,
        fileName: file
    };
});

fs.writeFileSync(manifestFile, JSON.stringify(manifest, null, 2));
console.log(`Manifest updated: ${manifest.length} papers found.`);
