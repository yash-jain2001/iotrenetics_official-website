import SmartifyClone from "../components/SmartifyClone";

const features = [
  {
    title: "Smart Room Control",
    desc: "Control lighting, AC & scenes seamlessly",
  },
  {
    title: "Central Dashboard",
    desc: "Monitor all rooms in one place",
  },
  {
    title: "Energy Management",
    desc: "Reduce wastage automatically",
  },
  {
    title: "Guest Experience",
    desc: "Personalized room automation",
  },
  {
    title: "Security & Access",
    desc: "Smart locks & entry control",
  },
  {
    title: "Housekeeping",
    desc: "Real-time room status updates",
  },
];

const useCases = [
  {
    title: "Smart Hotel Rooms",
    img: "/assets/hotel1.png",
    points: [
      "Scene-based automation",
      "Smart lighting & curtains",
      "Occupancy-based AC",
      "DND / MMR control",
    ],
  },
  {
    title: "Luxury Suites & Resorts",
    img: "/assets/hotel2.png ",
    reverse: true,
    points: [
      "Mood lighting scenes",
      "Voice-enabled control",
      "Outdoor automation",
      "Guest presets",
    ],
  },
  {
    title: "Operations & Backend",
    img: "/assets/hotel3.png",
    points: [
      "Housekeeping tracking",
      "Room occupancy monitoring",
      "Central dashboard",
      "Staff alerts",
    ],
  },
];

const HotelAutomation = () => {
  return (
    <>
      {/* HERO */}

      <section className="relative bg-[url('https://images.unsplash.com/photo-1566073771259-6a8506099945')] bg-cover bg-center h-[90vh] flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 bg-black/45"></div>

        <div className="relative z-10 max-w-2xl px-4 flex flex-col items-center">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight text-white">
            ELEVATING GUEST EXPERIENCES THROUGH HOTEL AUTOMATION
          </h1>

          <p className="mt-4 text-white">
            Deliver seamless comfort, personalized control, and operational efficiency — all from a unified smart platform.
          </p>

          <span className="mt-4 text-yellow-500 font-semibold">
            Luxury Meets Intelligence
          </span>

          <div className="flex flex-wrap gap-4 mt-6 justify-center">
            {/* <button className="px-6 py-3 rounded-xl bg-yellow-500 text-white font-semibold hover:scale-105 transition">
              Request Demo
            </button>
            <button className="px-6 py-3 rounded-xl border bg-white hover:scale-105 transition">
              Download Deck
            </button> */}
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="text-center py-5 bg-white border-t text-sm">
        Trusted for Smart Hospitality & Luxury Automation
      </section>

      {/* VALUE */}
      <section className="py-20 px-5 flex justify-center">
        <div className="max-w-3xl text-center">
          <h2 className="text-3xl font-semibold mb-4">
            Transform Every Room into a Smart Experience
          </h2>
          <p className="text-gray-600">
            Enhance guest comfort while optimizing operations — automation that works behind the scenes and impresses upfront.
          </p>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20 px-5 flex justify-center">
        <div className="max-w-6xl w-full">
          <h2 className="text-center text-3xl font-semibold mb-10">
            Core Features
          </h2>

          <div className="flex flex-wrap gap-6 justify-center">
            {features.map((f, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-2xl shadow-md w-full sm:w-[45%] lg:w-[30%] text-center hover:-translate-y-2 transition"
              >
                <h4 className="font-semibold">{f.title}</h4>
                <p className="text-gray-500 text-sm mt-2">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section className="py-20 px-5 flex flex-col items-center gap-20">
        {useCases.map((item, i) => (
          <div
            key={i}
            className={`flex flex-col lg:flex-row ${
              item.reverse ? "lg:flex-row-reverse" : ""
            } items-center gap-10 max-w-6xl w-full`}
          >
            <img
              src={item.img}
              alt={item.title}
              className="w-full lg:w-1/2 rounded-2xl hover:scale-105 transition"
            />

            <div className="bg-white p-8 rounded-2xl shadow-md w-full lg:w-1/2 text-center">
              <h3 className="text-xl font-semibold mb-4">{item.title}</h3>

              <ul className="space-y-2 text-gray-600">
                {item.points.map((p, idx) => (
                  <li key={idx}>• {p}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 px-5 flex justify-center">
        <div className="max-w-6xl text-center w-full">
          <h2 className="text-3xl font-semibold mb-4">
            How Smart Hotel Automation Works
          </h2>
          <p className="text-gray-600 mb-10">
            A unified system designed to simplify operations while elevating guest experiences.
          </p>

          <div className="flex flex-wrap gap-6 justify-center">
            {[
              "Guest Check-In",
              "Smart Room Activation",
              "Central Monitoring",
              "Energy Optimization",
            ].map((step, i) => (
                <div
                key={i}
                className="bg-white p-6 rounded-xl shadow w-full sm:w-[45%] lg:w-[22%]"
              >
                <h4 className="text-yellow-500 font-bold mb-2">
                  0{i + 1}
                </h4>
                <p className="font-semibold">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SmartifyClone/>
    </>
  );
};

export default HotelAutomation;