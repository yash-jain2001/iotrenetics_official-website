import { motion } from "framer-motion";

const FeatureCard = ({ direction }) => {

const technologies = [
  { img: '/assets/T1.webp', title: 'IoT & Embedded Systems' },
  { img: '/assets/T2.webp', title: 'AI and Machine Learning' },
  { img: '/assets/T3.webp', title: 'Computer Vision' },
  { img: '/assets/T4.webp', title: 'Digital Transformation' },
];



  // Duplicate 4 times since the list is short, making sure it visually covers high resolution displays on -50% shift
  const duplicatedTechs = [...technologies, ...technologies, ...technologies, ...technologies];

  return (
    <div className="flex w-full overflow-hidden">
      <motion.div
        initial={{ x: direction === "left" ? "0" : "-50%" }}
        animate={{ x: direction === "left" ? "-50%" : "0" }}
        transition={{ ease: "linear", duration: 15, repeat: Infinity }}
        className="flex flex-shrink-0"
      >
        <div className="flex flex-shrink-0 gap-5 border-none">
          {duplicatedTechs.map((tech, i) => (
            <div
              key={i}
              className="bg-gray-100 flex gap-4 items-center justify-center px-6 py-2 rounded-xl text-center w-max transition-all duration-300 hover:bg-white hover:-translate-y-1.5 hover:shadow-lg border border-gray-100 shrink-0"
            >
              <img
                src={tech.img}
                alt={tech.title}
                loading="lazy"
                className="w-[40px] h-[40px] rounded-full shrink-0 object-cover"
              />
              <h4 className="text-lg font-bold text-gray-800 whitespace-nowrap">{tech.title}</h4>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default FeatureCard;
