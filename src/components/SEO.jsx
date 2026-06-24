import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title, 
  description, 
  url = '', 
  image = 'https://iotrenetics.com/assets/IOT.webp', 
  type = 'website', 
  schema 
}) => {
  const siteName = "IoTrenetics Solutions Pvt. Ltd.";
  const baseUrl = "https://iotrenetics.com";
  const fullUrl = `${baseUrl}${url}`;

  // Core Organization Schema (Base Entity)
  const organizationSchema = {
    "@type": "Organization",
    "@id": `${baseUrl}/#organization`,
    "name": siteName,
    "url": baseUrl,
    "logo": {
      "@type": "ImageObject",
      "url": `${baseUrl}/assets/IOT.webp`
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-7303677709",
      "contactType": "sales",
      "areaServed": "IN",
      "availableLanguage": ["en", "hi"]
    }
  };

  // WebSite Schema for site search and identification
  const websiteSchema = {
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    "url": baseUrl,
    "name": siteName,
    "publisher": {
      "@id": `${baseUrl}/#organization`
    }
  };

  // WebPage Schema for the current page
  const webpageSchema = {
    "@type": "WebPage",
    "@id": `${fullUrl}/#webpage`,
    "url": fullUrl,
    "name": title,
    "description": description,
    "isPartOf": {
      "@id": `${baseUrl}/#website`
    }
  };

  // Combine default schemas
  const graph = [organizationSchema, websiteSchema, webpageSchema];

  // If a custom schema is provided (like Product or Service), add it to the graph
  if (schema) {
    if (Array.isArray(schema)) {
      graph.push(...schema);
    } else {
      graph.push(schema);
    }
  }

  const finalSchema = {
    "@context": "https://schema.org",
    "@graph": graph
  };

  return (
    <Helmet prioritizeSeoTags>
      {/* Standard Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph / Facebook / LinkedIn */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Structured Data (Schema.org) */}
      <script type="application/ld+json">
        {JSON.stringify(finalSchema)}
      </script>
    </Helmet>
  );
};

export default SEO;
