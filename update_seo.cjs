const fs = require('fs');
const path = require('path');

const files = [
  { path: 'src/pages/Home.jsx', title: 'IoTrenetics Solutions | Smart IoT & AI Automation', desc: 'Leading provider of smart home, office, and industrial automation solutions in India.', url: '/' },
  { path: 'src/pages/About.jsx', title: 'About Us | IoTrenetics Solutions', desc: 'Learn about IoTrenetics, our mission, and our journey in transforming spaces with AI and IoT.', url: '/about' },
  { path: 'src/pages/Contact.jsx', title: 'Contact Us | IoTrenetics', desc: 'Get in touch with IoTrenetics for your smart automation and AI solution needs.', url: '/contact' },
  { path: 'src/pages/Solutions.jsx', title: 'Our Solutions | IoTrenetics', desc: 'Explore our comprehensive range of IoT and AI driven solutions.', url: '/solutions' },
  { path: 'src/pages/Industries.jsx', title: 'Industries | IoTrenetics Solutions', desc: 'Discover the industries we serve with our advanced IoT and AI solutions.', url: '/industries' },
  { path: 'src/pages/Agentra.jsx', title: 'Agentra | IoTrenetics Solutions', desc: 'Agentra - Intelligent AI solutions by IoTrenetics.', url: '/agentra' },
  { path: 'src/pages/HomeAutomation.jsx', title: 'Smart Home Automation | IoTrenetics', desc: 'Experience the future of living with our smart home automation systems in India.', url: '/home-automation' },
  { path: 'src/pages/OfficeAutomation.jsx', title: 'Smart Office Automation | IoTrenetics', desc: 'Optimize your workspace with intelligent office automation solutions.', url: '/office-automation' },
  { path: 'src/pages/HotelAutomation.jsx', title: 'Smart Hotel Automation | IoTrenetics', desc: 'Enhance guest experiences and operational efficiency with our smart hotel automation.', url: '/hotel-automation' },
  { path: 'src/pages/AudioVideoAutomation.jsx', title: 'Audio & Video Automation | IoTrenetics', desc: 'Seamless audio and video automation for homes, offices, and commercial spaces.', url: '/audio-video-automation' },
  { path: 'src/pages/ComingSoon.jsx', title: 'Coming Soon | IoTrenetics', desc: 'Exciting new solutions are coming soon from IoTrenetics.', url: '/coming-soon' },
  { path: 'src/pages/TermsAndConditions.jsx', title: 'Terms and Conditions | IoTrenetics', desc: 'Read the terms and conditions for IoTrenetics Solutions.', url: '/terms-and-conditions' },
  { path: 'src/pages/PrivacyPolicyFinexo.jsx', title: 'Finexo Privacy Policy | IoTrenetics', desc: 'Privacy policy for the Finexo app.', url: '/privacy-policy-finexo' },
  { path: 'src/pages/DeleteAccFinexo.jsx', title: 'Finexo Delete Account | IoTrenetics', desc: 'Instructions on how to delete your Finexo account.', url: '/delete-account-policy-finexo' },
  { path: 'src/sub-pages/IOT_Driven_Automation.jsx', title: 'IoT Driven Automation | IoTrenetics', desc: 'Explore our IoT driven automation services.', url: '/iot-driven-automation' },
  { path: 'src/sub-pages/Ai_and_Genrative_Solutions.jsx', title: 'AI & Generative Solutions | IoTrenetics', desc: 'Cutting edge AI and Generative solutions for your business.', url: '/ai-and-genrative-solutions' },
  { path: 'src/sub-pages/Video_Analytics_and_Computer_Vision.jsx', title: 'Video Analytics & Computer Vision | IoTrenetics', desc: 'Advanced video analytics and computer vision services.', url: '/video-analytics-and-computer-vision' },
  { path: 'src/sub-pages/ARVR_and_Immersive_technologies.jsx', title: 'AR/VR & Immersive Technologies | IoTrenetics', desc: 'Immersive AR and VR solutions by IoTrenetics.', url: '/arvr-and-immersive-technologies' },
  { path: 'src/sub-pages/Digital_Transformation_Systems.jsx', title: 'Digital Transformation Systems | IoTrenetics', desc: 'Complete digital transformation systems for modern enterprises.', url: '/digital-transformation-systems' },
  { path: 'src/articles/SmartHomeAutomation.jsx', title: 'Smart Home Automation Guide | IoTrenetics', desc: 'Learn more about the benefits of smart home automation.', url: '/smart-home-automation' },
  { path: 'src/articles/AIOT.jsx', title: 'AIoT: Artificial Intelligence of Things | IoTrenetics', desc: 'Discover how AI and IoT combine to create powerful AIoT solutions.', url: '/aiot-article' },
  { path: 'src/articles/IndustrialIOT.jsx', title: 'Industrial IoT (IIoT) | IoTrenetics', desc: 'The impact of Industrial IoT on manufacturing and automation.', url: '/industrial-iot-article' },
  { path: 'src/articles/Finexo.jsx', title: 'Finexo AI Overview | IoTrenetics', desc: 'An in-depth look at Finexo AI and its capabilities.', url: '/finexo-article' },
  { path: 'src/articles/Healnet.jsx', title: 'HealTech Overview | IoTrenetics', desc: 'An in-depth look at HealTech and how it transforms healthcare.', url: '/healnet-article' }
];

for (const fileObj of files) {
  const filePath = path.join(__dirname, fileObj.path);
  if (!fs.existsSync(filePath)) {
    console.log('Not found:', filePath);
    continue;
  }
  
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Calculate relative path to components
  let importPath = '../components/SEO';
  if (fileObj.path.includes('sub-pages/') || fileObj.path.includes('articles/')) {
    importPath = '../../components/SEO';
  }

  // Check if SEO is already imported
  if (!content.includes('import SEO from')) {
    // Replace Helmet import with SEO import
    if (content.includes('import { Helmet } from "react-helmet-async";')) {
      content = content.replace('import { Helmet } from "react-helmet-async";', `import SEO from "${importPath}";`);
    } else if (content.includes("import { Helmet } from 'react-helmet-async';")) {
      content = content.replace("import { Helmet } from 'react-helmet-async';", `import SEO from "${importPath}";`);
    } else {
       // Insert at top
       content = `import SEO from "${importPath}";\n` + content;
    }
  }

  const helmetRegex = /<Helmet>[\s\S]*?<\/Helmet>/i;
  const seoTag = `<SEO title="${fileObj.title}" description="${fileObj.desc}" url="${fileObj.url}" />`;

  if (helmetRegex.test(content)) {
    content = content.replace(helmetRegex, seoTag);
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log('Updated Helmet to SEO in:', filePath);
  } else if (!content.includes('<SEO')) {
    // Attempt to inject if no Helmet was found
    const returnRegex = /return\s*\(?\s*(<[a-zA-Z0-9]+(?:>|\s+[^>]*>)|<>)/i;
    const match = content.match(returnRegex);
    if (match) {
      content = content.replace(returnRegex, match[0] + '\\n      ' + seoTag);
      fs.writeFileSync(filePath, content, 'utf-8');
      console.log('Injected SEO in:', filePath);
    }
  } else {
      console.log('Already updated:', filePath);
  }
}
