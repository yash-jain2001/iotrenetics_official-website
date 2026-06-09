import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, url = '', image = 'https://iotrenetics.com/assets/IOT.webp', type = 'website', schema }) => {
  const siteName = "IoTrenetics Solutions Pvt. Ltd.";
  const fullUrl = `https://iotrenetics.com${url}`;

  // Default LocalBusiness Schema
  const defaultSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": siteName,
    "image": "https://iotrenetics.com/assets/IOT.webp",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "faridabad",
      "addressLocality": "New Delhi",
      "addressRegion": "Delhi",
      "postalCode": "110044",
      "addressCountry": "IN"
    },
    "telephone": "+91-9873468833",
    "url": "https://iotrenetics.com"
  };

  const finalSchema = schema || defaultSchema;

  return (
    <Helmet>
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
