const SolutionBlock = ({ title, description, image, reverse = false, btnText = 'LEARN MORE' }) => {
  return (
    <div className={`flex items-center justify-between gap-12 ${reverse ? 'flex-row-reverse' : ''} max-md:flex-col`} data-aos="fade-up">
      <div className="bg-gray-100 p-6 sm:p-10 rounded-xl max-w-lg shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg max-md:max-w-full">
        <h3 className="text-2xl md:text-3xl font-bold mb-4 text-center md:text-left">
          {title}
        </h3>
        <p className="text-base leading-relaxed mb-7 text-gray-800 text-center md:text-left">{description}</p>
        <div className="text-center md:text-left">
          <a href="#" className="inline-block py-3 px-8 rounded-full bg-gray-200 text-accent font-bold no-underline transition-colors duration-300 hover:bg-gray-300">
            {btnText}
          </a>
        </div>
      </div>
      <div className="w-full max-w-[500px]">
        <img src={image} alt={typeof title === 'string' ? title : ''} loading="lazy" className="w-full h-auto rounded-xl shadow-md" />
      </div>
    </div>
  );
};

export default SolutionBlock;
