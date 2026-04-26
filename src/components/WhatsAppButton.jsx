const WhatsAppButton = ({ phoneNumber = '7303677709', message = 'Hello! I would like to know more about IoTrenetics.' }) => {
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-4 left-6 md:bottom-8 md:left-8 z-[1001] bg-[#25D366] w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-300 animate-bounce-slow"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-8 h-8 fill-white">
        <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16c0 3.5 1.128 6.744 3.046 9.378L1.054 31.29l6.118-1.96A15.9 15.9 0 0 0 16.004 32C24.826 32 32 24.822 32 16S24.826 0 16.004 0zm9.302 22.602c-.39 1.1-1.932 2.014-3.168 2.28-.846.18-1.95.324-5.668-1.218-4.762-1.972-7.828-6.798-8.066-7.114-.23-.316-1.93-2.572-1.93-4.904s1.222-3.476 1.656-3.952c.434-.476.948-.596 1.264-.596.316 0 .632.002.908.016.292.014.682-.11 1.068.814.39.94 1.326 3.232 1.442 3.466.116.234.194.508.038.814-.154.316-.232.51-.462.786-.232.274-.488.612-.696.822-.232.232-.474.484-.204.948.272.464 1.208 1.992 2.594 3.228 1.782 1.588 3.284 2.08 3.748 2.314.464.234.736.194 1.006-.116.272-.316 1.164-1.354 1.474-1.82.308-.464.618-.388 1.042-.232.426.154 2.706 1.276 3.17 1.508.464.234.774.35.89.542.114.194.114 1.108-.276 2.208z" />
      </svg>
    </a>
  );
};

export default WhatsAppButton;
