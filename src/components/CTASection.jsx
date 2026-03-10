import { Link } from 'react-router-dom';

const CTASection = () => {
  return (
    <section className="bg-gradient-to-br from-brand to-brand-dark text-white text-center py-24 px-5 max-md:py-16">
      <div className="max-w-[1200px] mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-5 text-white">Let's Build the Future Together</h2>
        <p className="max-w-[800px] mx-auto mb-8 text-lg leading-relaxed text-gray-100">
          Partner with <strong>IoTrenetics Solutions Pvt. Ltd.</strong> to innovate, automate, and accelerate your
          business transformation journey.
          From AI-driven automation to IoT-based intelligence — we help you create smart, scalable, and future-ready
          solutions.
        </p>
        <div className="flex justify-center gap-5 flex-wrap max-md:flex-col max-md:items-center">
          <Link to="/contact" className="bg-white text-brand py-3 px-7 rounded-full font-bold transition-colors duration-300 hover:bg-gray-200 no-underline">Get in Touch</Link>
          <Link to="/solutions" className="bg-transparent border-2 border-white text-white py-3 px-7 rounded-full font-bold transition-all duration-300 hover:bg-white hover:text-brand no-underline">Explore Our Solutions</Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
