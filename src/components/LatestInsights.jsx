import React from 'react';
import SectionTitle from './SectionTitle';
import { Link } from 'react-router-dom';

const insights = [
  {
    image: "/assets/core 11.jpeg",
    category: "Smart Home Automation",
    title: "Reducing Energy Costs, Enhancing Security & Building the Future of Connected Living",
    date: "March 12, 2026",
    link: "/smart-home-automation"
  },
  {
    image: "/assets/core 8.webp",
    category: "AIOT",
    title: "AI + IoT: Building Intelligent Environments with Data-Driven Decision Making & Secure Connected Systems",
    date: "February 28, 2026",
    link: "/aiot"
  },
  {
    image: "/assets/core 7.webp",
    category: "INDUSTRIAL IOT",
    title: "Driving Efficiency, Reducing Downtime & Enabling Predictive Operations",
    date: "February 15, 2026",
    link: "/industrial-iot"
  },
  {
    image: "/assets/core 12.jpeg",
    category: "FinTech",
    title: "Finexa",
    date: "February 15, 2026",
    link: "/finexa-article"
  },
  {
    image: "/assets/core 6.webp",
    category: "HealthTech",
    title: "Healnet",
    date: "February 15, 2026",
    link: "/healnet-article"
  }
];

const LatestInsights = () => {
  return (
    <section className="py-10 px-5 bg-gray-50 " data-aos="fade-up">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex justify-between items-end">
          <SectionTitle accent="Latest" postText=" Insights" />
          {/* <Link to="#" className="hidden md:inline-block text-brand font-bold hover:text-accent transition-colors">View All Articles &rarr;</Link> */}
        </div>
        
        <div className="flex gap-8 overflow-x-scroll">
          {insights.map((item, i) => (
            <div key={i} className="w-96 h-[450px] shrink-0 bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer border border-gray-100 flex flex-col hover:-translate-y-1">
              <div className="h-[50%] border overflow-hidden relative">
                <div className="absolute inset-0 bg-brand/10 mix-blend-multiply z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6 flex h-[50%] flex-col flex-grow">
                <div className="mb-3">
                  <span className="bg-brand/10 text-brand text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">{item.category}</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-brand transition-colors">{item.title}</h3>
                <div className="flex h-[0%] items-center justify-between text-gray-500 text-sm mt-auto pt-4 border-t border-gray-100">
                  <span>{item.date}</span>
                  <Link to={item.link}><span className="font-bold text-brand flex items-center gap-1 group-hover:gap-2 transition-all">Read <span className="hidden group-hover:inline">&rarr;</span></span></Link>
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
