const SolutionBlock = ({
  title,
  description,
  image,
  reverse = false,
  btnText = "LEARN MORE",
}) => {
  return (
    <div
      className={`flex items-center justify-between gap-15 ${reverse ? "flex-row-reverse" : ""} max-md:flex-col`}
      data-aos="fade-up"
    >
      <div className="bg-gray-100 p-10 rounded-xl max-w-lg shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg max-md:max-w-full">
        <h3 className="text-2xl md:text-3xl font-bold mb-4 text-center">
          {title}
        </h3>
        <p className="text-base leading-[1.8] mb-7 text-gray-800 text-justify">
          {description}
        </p>
        <a href="#" className="block text-center">
          <span className="inline-block py-3.5 px-8 rounded-full bg-gray-200 text-accent font-bold no-underline transition-colors duration-300 hover:bg-gray-300">
            {btnText}
          </span>
        </a>
      </div>
      <div className={`${reverse ? "w-4/5" : "w-full"} max-w-[500px]`}>
        <img
          src={image}
          alt={typeof title === "string" ? title : ""}
          loading="lazy"
          className="w-full"
        />
      </div>
    </div>
  );
};

export default SolutionBlock;
