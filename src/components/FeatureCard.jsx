const FeatureCard = ({ image, title, description, className = '' }) => {
  return (
    <div className={`bg-gray-100 p-6 rounded-xl text-center transition-all duration-300 hover:bg-gray-50 hover:-translate-y-1.5 hover:shadow-md ${className}`} data-aos="fade-up">
      {image && <img src={image} alt={title} loading="lazy" className="w-[70px] mb-3 mx-auto" />}
      <h4 className="text-base font-semibold">{title}</h4>
      {description && <p className="text-sm text-gray-600 mt-1 leading-relaxed">{description}</p>}
    </div>
  );
};

export default FeatureCard;
