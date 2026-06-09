const fs = require('fs');
const path = require('path');

const DOMAIN = 'https://iotrenetics.com';

const routes = [
  '/',
  '/about',
  '/solutions',
  '/finexo',
  '/industries',
  '/contact',
  '/healnet',
  '/agentra',
  '/home-automation',
  '/office-automation',
  '/hotel-automation',
  '/audio-video-automation',
  '/privacy-policy-finexo',
  '/delete-account-policy-finexo',
  '/terms-and-conditions',
  '/iot-driven-automation',
  '/ai-and-genrative-solutions',
  '/video-analytics-and-computer-vision',
  '/arvr-and-immersive-technologies',
  '/digital-transformation-systems',
  '/smart-home-automation',
  '/aiot-article',
  '/industrial-iot-article',
  '/finexo-article',
  '/healnet-article',
  '/coming-soon'
];

function generateSitemap() {
  const currentDate = new Date().toISOString();
  
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  for (const route of routes) {
    const priority = route === '/' ? '1.0' : '0.8';
    xml += `  <url>\n`;
    xml += `    <loc>${DOMAIN}${route}</loc>\n`;
    xml += `    <lastmod>${currentDate}</lastmod>\n`;
    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>${priority}</priority>\n`;
    xml += `  </url>\n`;
  }

  xml += `</urlset>`;

  const sitemapPath = path.join(__dirname, 'public', 'sitemap.xml');
  fs.writeFileSync(sitemapPath, xml, 'utf8');
  console.log(`Sitemap successfully generated at ${sitemapPath}`);
}

generateSitemap();
