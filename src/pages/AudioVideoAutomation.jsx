import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  SpeakerWaveIcon, 
  TvIcon, 
  MusicalNoteIcon, 
  HomeIcon,
  CheckBadgeIcon,
  SparklesIcon,
  StarIcon,
  CpuChipIcon,
  ChevronDoubleDownIcon
} from "@heroicons/react/24/outline";

const solutions = [
  { name: "Home Theatre", icon: TvIcon, desc: "Immersive cinematic sound engineered for your private sanctuary." },
  { name: "Multi Room Audio", icon: SpeakerWaveIcon, desc: "Seamlessly stream high-fidelity audio throughout your entire home." },
  { name: "Outdoor Audio", icon: MusicalNoteIcon, desc: "Weather-resistant, architectural sound for your outdoor luxury spaces." },
  { name: "Media Rooms", icon: HomeIcon, desc: "Versatile entertainment spaces designed for both gaming and cinema." },
];

const why = [
  { title: "Premium US Brand", icon: CheckBadgeIcon, desc: "TruAudio is a leader in architectural audio innovation." },
  { title: "Architectural Design", icon: SparklesIcon, desc: "Speakers that blend invisibly into your premium interiors." },
  { title: "Luxury Experience", icon: StarIcon, desc: "Tailored soundscapes designed for the most discerning ears." },
  { title: "Smart Integration", icon: CpuChipIcon, desc: "Full compatibility with Control4 and other smart home ecosystems." },
];

const modes = [
  { name: "Movie Night", color: "from-blue-600 to-indigo-900" },
  { name: "Party Mode", color: "from-purple-600 to-pink-900" },
  { name: "Relax Mode", color: "from-emerald-600 to-teal-900" }
];

const AudioVideo = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <div className="bg-[#050505] text-white overflow-x-hidden font-sans">

      {/* HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center text-center overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-yellow-500/10 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1545127398-14699f92334b?q=80&w=2070&auto=format&fit=crop" 
            className="w-full h-full object-cover opacity-40 scale-105"
            alt="Luxury Audio Setup"
          />
        </div>

        <motion.div 
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="relative z-20 max-w-4xl px-6 flex flex-col items-center"
        >
          <motion.span 
            variants={itemVariants}
            className="px-4 py-1.5 rounded-full border border-yellow-500/30 bg-yellow-500/10 text-yellow-500 text-xs font-bold tracking-widest uppercase mb-6"
          >
            Premium Audio Solutions
          </motion.span>
          
          <motion.h1 
            variants={itemVariants}
            className="text-5xl md:text-7xl font-display font-bold leading-[1.1] tracking-tight mb-6"
          >
            Experience <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">Sound.</span><br />
            Feel Every <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">Moment.</span>
          </motion.h1>

          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Elevate your home with TruAudio's architectural speakers. 
            Cinema-quality luxury, engineered for the most demanding spaces.
          </motion.p>

          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap gap-5 justify-center"
          >
            <Link to="/contact" className="group relative px-8 py-4 bg-yellow-500 text-black font-bold rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(234,179,8,0.3)]">
              <span className="relative z-10">Book Private Demo</span>
              <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 opacity-20"></div>
            </Link>
            <button className="px-8 py-4 border border-white/20 hover:border-white/40 bg-white/5 backdrop-blur-md text-white font-semibold rounded-full transition-all hover:bg-white/10 active:scale-95">
              Explore Collections
            </button>
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-gray-500"
        >
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Scroll to Discover</span>
          <ChevronDoubleDownIcon className="w-5 h-5 animate-bounce" />
        </motion.div>
      </section>

      {/* STORY SECTION */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="w-full lg:w-1/2"
            >
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-8 leading-tight">
                Designed for <br />
                <span className="text-yellow-500">Luxury Living</span>
              </h2>
              <div className="space-y-6 text-gray-400 text-lg leading-relaxed">
                <p>
                  At Iotrenetics, we don't just install speakers; we curate acoustic environments. 
                  Every detail is engineered to deliver an immersive experience that moves you.
                </p>
                <p>
                  By partnering with TruAudio, we bring you world-class architectural audio that 
                  perfectly blends with your interior design, disappearing into the architecture 
                  while filling the room with crystal-clear sound.
                </p>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full lg:w-1/2 relative"
            >
              <div className="absolute -inset-4 bg-yellow-500/10 rounded-2xl blur-2xl"></div>
              <img 
                src="https://images.unsplash.com/photo-1545127398-14699f92334b?q=80&w=2070&auto=format&fit=crop" 
                className="relative rounded-2xl border border-white/10 shadow-2xl z-10 w-full"
                alt="Audio Experience"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* SOLUTIONS GRID */}
      <section className="py-24 bg-[#0a0a0a] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 italic tracking-tight">Sonic Solutions</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Tailored audio-video experiences for every corner of your estate.</p>
          </div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {solutions.map((s, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="group p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/[0.08] hover:border-yellow-500/30 transition-all duration-500 flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-yellow-500/10 flex items-center justify-center text-yellow-500 mb-6 group-hover:scale-110 group-hover:bg-yellow-500 group-hover:text-black transition-all duration-500 shadow-lg">
                  <s.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-3">{s.name}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* PARALLAX IMPACT SECTION */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/60 z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1516054653923-3e3f201dd53a?q=80&w=2072&auto=format&fit=crop" 
            className="w-full h-full object-cover fixed top-0 left-0" // Simulating parallax
            style={{ transform: 'translateY(10%)' }}
            // alt="Audio Visual"
          />
        </div>
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-20 text-center px-6"
        >
          <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tighter text-white">
            Feel the <span className="text-yellow-500 italic">Depth</span> of Sound
          </h2>
        </motion.div>
      </section>

      {/* FEATURE BLOCKS */}
      <section className="py-32 px-6 space-y-32">
        <div className="max-w-7xl mx-auto">
          {/* Block 1 */}
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full lg:w-1/2 group overflow-hidden rounded-3xl"
            >
              <img 
                src="../assets/av1.png" 
                className="w-full rounded-3xl transition-transform duration-700 group-hover:scale-110" 
                alt="Home Theatre"
              />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full lg:w-1/2"
            >
              <span className="text-yellow-500 font-bold uppercase tracking-widest text-xs mb-4 block">Visual Excellence</span>
              <h3 className="text-4xl font-display font-bold mb-6 italic">Breathtaking Home Theatre</h3>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                Transform any room into a world-class cinema. We combine 8K projection, 
                acoustically transparent screens, and Dolby Atmos surround sound to 
                transport you directly into the action.
              </p>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-yellow-500"></div>
                  Dolby Atmos Calibration
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-yellow-500"></div>
                  Acoustic Treatment Design
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-yellow-500"></div>
                  One-Touch Cinema Control
                </li>
              </ul>
            </motion.div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto">
          {/* Block 2 */}
          <div className="flex flex-col lg:flex-row-reverse items-center gap-16 lg:gap-24">
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full lg:w-1/2 group overflow-hidden rounded-3xl"
            >
              <img 
                src="../assets/av2.png" 
               className="w-full rounded-3xl transition-transform duration-700 group-hover:scale-110" 
                alt="Whole Home Audio"
              />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full lg:w-1/2"
            >
              <span className="text-yellow-500 font-bold uppercase tracking-widest text-xs mb-4 block">Ubiquitous Sound</span>
              <h3 className="text-4xl font-display font-bold mb-6 italic">Whole Home Audio</h3>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                Music that follows you. Seamlessly transition your favorite playlists from 
                the kitchen to the patio, or play different tracks in every room. 
                Full control from your smartphone or wall-mounted touchscreens.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
                  <span className="text-yellow-500 font-bold text-2xl block mb-1">32+</span>
                  <span className="text-xs text-gray-500 uppercase tracking-wider">Audio Zones</span>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
                  <span className="text-yellow-500 font-bold text-2xl block mb-1">Hi-Res</span>
                  <span className="text-xs text-gray-500 uppercase tracking-wider">Audio Quality</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* WHY SECTION */}
      <section className="py-32 bg-black relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-display font-bold mb-4">Why Choose TruAudio</h2>
            <p className="text-gray-500">Innovation meets elegance in every speaker.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {why.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative group p-8 rounded-3xl bg-[#0a0a0a] border border-white/5 hover:border-yellow-500/50 transition-all duration-500"
              >
                <div className="mb-6 text-yellow-500">
                  <item.icon className="w-10 h-10 group-hover:animate-ring" />
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-10 transition-opacity">
                   <item.icon className="w-20 h-20" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SMART MODES SECTION */}
      <section className="py-32 px-6 bg-[#050505]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             className="inline-block px-4 py-1.5 rounded-full border border-yellow-500/30 bg-yellow-500/10 text-yellow-500 text-xs font-bold tracking-widest uppercase mb-8"
          >
            One Touch Control
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-12">
            Automate Your <br className="md:hidden" />Atmosphere
          </h2>

          <div className="flex flex-wrap justify-center gap-6">
            {modes.map((m, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`relative px-10 py-5 rounded-full font-bold text-lg overflow-hidden group shadow-2xl transition-all`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${m.color} opacity-80 group-hover:opacity-100 transition-opacity`}></div>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
                <span className="relative z-10">{m.name}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-600/20 via-black to-blue-900/20"></div>
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 leading-tight">
              Ready to Transform <br />Your Space?
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12">
              Let our experts design the perfect acoustic environment for your luxury residence. 
              Schedule a personalized consultation today.
            </p>
            <Link to="/contact" className="inline-block px-12 py-5 bg-yellow-500 text-black font-black text-lg rounded-full hover:scale-110 active:scale-95 transition-all shadow-[0_0_40px_rgba(234,179,8,0.4)]">
              Book Consultation
            </Link>
          </motion.div>
        </div>
      </section>

      {/* FLOATING WHATSAPP */}
      <motion.a
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        href="https://wa.me/yournumber"
        className="fixed bottom-8 right-8 z-50 group"
      >
        <div className="absolute inset-0 bg-green-500 rounded-full blur-lg opacity-40 group-hover:opacity-60 transition-opacity animate-pulse"></div>
        <div className="relative bg-green-500 p-4 rounded-full text-white shadow-2xl flex items-center justify-center">
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.246 2.248 3.484 5.232 3.483 8.413-.003 6.557-5.338 11.892-11.893 11.892-1.997-.001-3.951-.5-5.688-1.448l-6.308 1.654zm6.757-4.015c1.517.898 3.012 1.348 4.713 1.348 5.397 0 9.786-4.389 9.789-9.788.002-5.397-4.386-9.786-9.787-9.786-2.613 0-5.067 1.017-6.913 2.863-1.845 1.846-2.862 4.3-2.862 6.913 0 1.715.451 3.21 1.349 4.727l-.995 3.636 3.706-.973zm9.953-6.833c-.263-.132-1.557-.767-1.798-.854-.24-.087-.417-.132-.592.132-.175.263-.679.854-.832 1.03-.153.175-.306.197-.569.066-.263-.132-1.11-.409-2.113-1.302-.782-.698-1.309-1.562-1.463-1.825-.153-.263-.017-.406.117-.536.12-.117.263-.306.394-.46.131-.153.175-.263.263-.438.088-.175.044-.328-.022-.46-.066-.132-.592-1.426-.811-1.952-.213-.51-.43-.44-.592-.449-.153-.008-.328-.009-.503-.009-.175 0-.46.066-.701.306-.24.24-.92.898-.92 2.193 0 1.296.941 2.545 1.073 2.72.131.175 1.853 2.83 4.489 3.976.627.272 1.115.435 1.496.556.63.2 1.203.171 1.655.105.504-.074 1.557-.636 1.776-1.25.219-.614.219-1.141.153-1.25-.065-.109-.24-.175-.503-.307z" />
          </svg>
        </div>
      </motion.a>

    </div>
  );
};

export default AudioVideo;
