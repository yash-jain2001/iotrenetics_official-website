import React from 'react';
import SectionTitle from './SectionTitle';
import { Link } from 'react-router-dom';

const insights = [
  {
    image: "/assets/core 8.webp",
    category: "Smart Cities",
    title: "How IoT is Revolutionizing Urban Infrastructure",
    date: "March 12, 2026",
    link: "#"
  },
  {
    image: "/assets/core 7.webp",
    category: "Industrial IoT",
    title: "Predictive Maintenance: The AI Advantage",
    date: "February 28, 2026",
    link: "#"
  },
  {
    image: "/assets/core 6.webp",
    category: "Home Automation",
    title: "Building the Connected Home of Tomorrow",
    date: "February 15, 2026",
    link: "#"
  }
];

const LatestInsights = () => {
  return (
    <section className="py-10 px-5 bg-gray-50" data-aos="fade-up">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex justify-between items-end mb-10">
          <SectionTitle accent="Latest" postText=" Insights" />
          <Link to="/about" className="hidden md:inline-block text-brand font-bold hover:text-accent transition-colors">View All Articles &rarr;</Link>
        </div>
        
        <div className="flex flex-wrap justify-center gap-8">
          {insights.map((item, i) => (
            <div key={i} className="w-full sm:w-[calc(50%-2rem)] lg:w-[calc(33.333%-2rem)] max-w-sm bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer border border-gray-100 flex flex-col h-full hover:-translate-y-1">
              <div className="h-56 overflow-hidden relative">
                <div className="absolute inset-0 bg-brand/10 mix-blend-multiply z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="mb-3">
                  <span className="bg-brand/10 text-brand text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">{item.category}</span>
                </div>
                <h3 className="text-xl font-bold mb-3 line-clamp-2 text-gray-800 group-hover:text-brand transition-colors flex-grow">{item.title}</h3>
                <div className="flex items-center justify-between text-gray-500 text-sm mt-auto pt-4 border-t border-gray-100">
                  <span>{item.date}</span>
                  <span className="font-bold text-brand flex items-center gap-1 group-hover:gap-2 transition-all">Read <span className="hidden group-hover:inline">&rarr;</span></span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center md:hidden">
            <Link to="/about" className="inline-block text-brand font-bold hover:text-accent transition-colors">View All Articles &rarr;</Link>
        </div>
      </div>
    </section>
  );
}

export default LatestInsights;
