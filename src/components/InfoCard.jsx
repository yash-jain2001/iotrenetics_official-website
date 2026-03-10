const InfoCard = ({ title, description, icon, className = '' }) => {
  return (
    <div className={`bg-white rounded-xl p-6 shadow-sm text-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg ${className}`} data-aos="fade-up">
      {icon && <h3 className="text-brand-dark mb-2.5 text-lg font-semibold">{icon} {title}</h3>}
      {!icon && title && <h3 className="text-brand-dark mb-2.5 text-lg font-semibold">{title}</h3>}
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
};

export default InfoCard;
