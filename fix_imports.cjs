const fs = require('fs');
const path = require('path');

const dirs = ['src/sub-pages', 'src/articles'];

dirs.forEach(dir => {
  const fullDir = path.join(__dirname, dir);
  if (fs.existsSync(fullDir)) {
    const files = fs.readdirSync(fullDir);
    files.forEach(f => {
      if (f.endsWith('.jsx')) {
        const filePath = path.join(fullDir, f);
        let c = fs.readFileSync(filePath, 'utf8');
        if (c.includes('../../components/SEO')) {
            c = c.replace(/\.\.\/\.\.\/components\/SEO/g, '../components/SEO');
            fs.writeFileSync(filePath, c, 'utf8');
            console.log('Fixed:', filePath);
        }
      }
    });
  }
});
