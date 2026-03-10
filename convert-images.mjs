import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join, extname, basename } from 'path';

const ASSETS_DIR = './public/assets';
const QUALITY = 80;
const MAX_KB = 300;

async function convert() {
  const files = await readdir(ASSETS_DIR);
  const images = files.filter(f => ['.png', '.jpg', '.jpeg'].includes(extname(f).toLowerCase()));
  
  console.log(`Found ${images.length} images to convert`);
  
  for (const file of images) {
    const inputPath = join(ASSETS_DIR, file);
    const outputName = basename(file, extname(file)) + '.webp';
    const outputPath = join(ASSETS_DIR, outputName);
    
    try {
      let quality = QUALITY;
      await sharp(inputPath).webp({ quality }).toFile(outputPath);
      
      // Check size and reduce quality if needed
      const info = await stat(outputPath);
      const sizeKB = info.size / 1024;
      
      if (sizeKB > MAX_KB) {
        // Reduce quality proportionally
        const newQuality = Math.max(30, Math.floor(quality * (MAX_KB / sizeKB)));
        await sharp(inputPath).webp({ quality: newQuality }).toFile(outputPath);
        const info2 = await stat(outputPath);
        console.log(`  ${file} → ${outputName} (${Math.round(info2.size/1024)}KB, q=${newQuality})`);
      } else {
        console.log(`  ${file} → ${outputName} (${Math.round(sizeKB)}KB)`);
      }
    } catch (err) {
      console.error(`  FAILED: ${file} — ${err.message}`);
    }
  }
  console.log('Done!');
}

convert();
