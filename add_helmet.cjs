const fs = require('fs');
const path = require('path');

const files = [
  { path: 'src/pages/Industries.jsx', title: 'Industries | IoTrenetics Solutions', desc: 'Discover the industries we serve with our advanced IoT and AI solutions.' },
  { path: 'src/pages/Agentra.jsx', title: 'Agentra | IoTrenetics Solutions', desc: 'Agentra - Intelligent AI solutions by IoTrenetics.' },
  { path: 'src/pages/HomeAutomation.jsx', title: 'Smart Home Automation | IoTrenetics', desc: 'Experience the future of living with our smart home automation systems in India.' },
  { path: 'src/pages/OfficeAutomation.jsx', title: 'Smart Office Automation | IoTrenetics', desc: 'Optimize your workspace with intelligent office automation solutions.' },
  { path: 'src/pages/HotelAutomation.jsx', title: 'Smart Hotel Automation | IoTrenetics', desc: 'Enhance guest experiences and operational efficiency with our smart hotel automation.' },
  { path: 'src/pages/AudioVideoAutomation.jsx', title: 'Audio & Video Automation | IoTrenetics', desc: 'Seamless audio and video automation for homes, offices, and commercial spaces.' },
  { path: 'src/pages/ComingSoon.jsx', title: 'Coming Soon | IoTrenetics', desc: 'Exciting new solutions are coming soon from IoTrenetics.' },
  { path: 'src/pages/TermsAndConditions.jsx', title: 'Terms and Conditions | IoTrenetics', desc: 'Read the terms and conditions for IoTrenetics Solutions.' },
  { path: 'src/pages/PrivacyPolicyFinexo.jsx', title: 'Finexo Privacy Policy | IoTrenetics', desc: 'Privacy policy for the Finexo app.' },
  { path: 'src/pages/DeleteAccFinexo.jsx', title: 'Finexo Delete Account | IoTrenetics', desc: 'Instructions on how to delete your Finexo account.' },
  { path: 'src/sub-pages/IOT_Driven_Automation.jsx', title: 'IoT Driven Automation | IoTrenetics', desc: 'Explore our IoT driven automation services.' },
  { path: 'src/sub-pages/Ai_and_Genrative_Solutions.jsx', title: 'AI & Generative Solutions | IoTrenetics', desc: 'Cutting edge AI and Generative solutions for your business.' },
  { path: 'src/sub-pages/Video_Analytics_and_Computer_Vision.jsx', title: 'Video Analytics & Computer Vision | IoTrenetics', desc: 'Advanced video analytics and computer vision services.' },
  { path: 'src/sub-pages/ARVR_and_Immersive_technologies.jsx', title: 'AR/VR & Immersive Technologies | IoTrenetics', desc: 'Immersive AR and VR solutions by IoTrenetics.' },
  { path: 'src/sub-pages/Digital_Transformation_Systems.jsx', title: 'Digital Transformation Systems | IoTrenetics', desc: 'Complete digital transformation systems for modern enterprises.' },
  { path: 'src/articles/SmartHomeAutomation.jsx', title: 'Smart Home Automation Guide | IoTrenetics', desc: 'Learn more about the benefits of smart home automation.' },
  { path: 'src/articles/AIOT.jsx', title: 'AIoT: Artificial Intelligence of Things | IoTrenetics', desc: 'Discover how AI and IoT combine to create powerful AIoT solutions.' },
  { path: 'src/articles/IndustrialIOT.jsx', title: 'Industrial IoT (IIoT) | IoTrenetics', desc: 'The impact of Industrial IoT on manufacturing and automation.' },
  { path: 'src/articles/Finexo.jsx', title: 'Finexo AI Overview | IoTrenetics', desc: 'An in-depth look at Finexo AI and its capabilities.' },
  { path: 'src/articles/Healnet.jsx', title: 'HealTech Overview | IoTrenetics', desc: 'An in-depth look at HealTech and how it transforms healthcare.' }
];

for (const fileObj of files) {
  const filePath = path.join(__dirname, fileObj.path);
  if (!fs.existsSync(filePath)) {
    console.log('Not found:', filePath);
    continue;
  }
  
  let content = fs.readFileSync(filePath, 'utf-8');
  if (content.includes('react-helmet-async')) {
    console.log('Skipping (already has Helmet):', filePath);
    continue;
  }
  
  content = 'import { Helmet } from "react-helmet-async";\n' + content;
  
  const returnRegex = /return\s*\(?\s*(<[a-zA-Z0-9]+(?:>|\s+[^>]*>)|<>)/i;
  const match = content.match(returnRegex);
  
  if (match) {
    const helmetContent = `
      <Helmet>
        <title>${fileObj.title}</title>
        <meta name="description" content="${fileObj.desc}" />
      </Helmet>
`;
    content = content.replace(returnRegex, match[0] + helmetContent);
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log('Updated:', filePath);
  } else {
    console.log('Failed to match return statement in:', filePath);
  }
}
