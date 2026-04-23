import { Link } from "react-router-dom";
import CTASection from "../components/CTASection";

const purposeCards = [
  {
    title: "🗣️ Speak Naturally",
    items: ["Paid 500 for food", "Got salary 50,000", "Spent 200 with Simran"],
  },
  {
    title: "💰 Smart Save",
    items: ["Talk to Save", "Smart Verification", "Error-Free Records"],
  },
  {
    title: "⚙️ Finexo Understands",
    items: [
      "Amount",
      "Expense or income",
      "Category",
      "Person or group involved",
    ],
    accent: true,
  },
  {
    title: "🔁 Smart Confirmation Mode",
    items: [
      "Auto save or manual confirm",
      "Full user control",
      "Intelligent Validation",
      "One-Tap Correction",
    ],
  },
];

const featureBoxes = [
  {
    title: "🎤 Voice-Based Expense Tracking",
    items: [
      "Hands-free input",
      "Fast and natural",
      "Works with daily language",
    ],
  },
  {
    title: "💰 Income & Expense Management",
    items: [
      "Track salary, cash, and payments",
      "Supports multiple currencies",
      "Automated Visual Reports",
    ],
  },
];

const PurposeCard = ({ title, items, className = "" }) => (
  <div
    className={`p-7 border border-gray-200 bg-gray-100 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:bg-white ${className}`}
  >
    <h3 className="text-xl font-semibold mb-4">{title}</h3>
    <ul className="pl-5 list-disc">
      {items.map((item, i) => (
        <li key={i} className="mb-2.5 text-base">
          {item}
        </li>
      ))}
    </ul>
  </div>
);

const finexo = () => {
  return (
    <>
      {/* Top */}
      <section className="py-20 px-5 md:px-24" data-aos="fade-up">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold">
            <span className="text-accent">Fin</span>exo
          </h1>
          <br />
          <h2 className="text-3xl md:text-4xl font-bold">
            Track <span className="text-accent">money</span> as easily as you
            talk.
          </h2>
          <p className="text-xl text-gray-700 mt-2">
            Track expenses, income, and group spending just by speaking. Instead
            of typing transactions manually.
          </p>
        </div>

        {/* What is finexo */}
        <div className="flex items-center gap-16 max-lg:flex-col">
          <div className="w-full lg:w-[55%] transition-all duration-400 hover:-translate-y-1.5">
            <h2 className="text-4xl font-extrabold mb-5">
              What is <span className="text-accent">Finexo</span>
            </h2>
            <p className="text-xl leading-relaxed mb-5 text-gray-900">
              Finexo is a smart, voice-eroded personal finance and expense
              management app that helps you track money naturally — just by
              speaking.
            </p>
            <p className="text-xl leading-relaxed mb-5 text-gray-900">
              Instead of typing transactions manually; users can speak in plain
              language, and Finexo automatically understands, categorizes, and
              records expenses or income — for both personal and group use.
            </p>
            <strong className="text-xl">
              Speak your spending, <span className="text-accent">Finexo</span>{" "}
              does the rest.
            </strong>
          </div>
          <div className="w-full lg:w-[45%]">
            <img
              src="/assets/finexo1.webp"
              alt="finexo App Illustration"
              loading="lazy"
              className="w-full transition-transform duration-400 hover:scale-[1.03]"
            />
          </div>
        </div>
      </section>

      {/* Purpose */}
      <section className="py-20 px-[6%] bg-white" data-aos="fade-up">
        <h1 className="text-4xl font-extrabold mb-10">
          Purpose of <span className="text-accent">Finexo</span>
        </h1>
        <div className="flex gap-16 items-center max-lg:flex-col">
          <div className="flex flex-wrap rounded-xl overflow-hidden bg-gray-300 w-full">
            {purposeCards.map((card, i) => (
              <PurposeCard
                key={i}
                title={card.title}
                items={card.items}
                className="w-full sm:w-1/2"
              />
            ))}
          </div>
          <div>
            <img
              src="/assets/finexo2.webp"
              alt="finexo Illustration"
              loading="lazy"
              className="max-w-[520px] w-full transition-transform duration-400 hover:-translate-y-4 hover:scale-105"
            />
          </div>
        </div>
      </section>

      {/* Ask finexo */}
      <section className="py-20 px-[8%] bg-white" data-aos="fade-up">
        <div className="flex items-center justify-between gap-10 max-lg:flex-col max-lg:text-center">
          <div className="flex-1">
            <h2 className="text-4xl font-bold">
              Ask <span className="text-accent">Finexo</span> (AI Assistant)
            </h2>
            <p className="text-lg mt-5 max-w-[520px] max-lg:mx-auto">
              Unlock deep insights into your spending habits by simply asking.
              Finexo doesn't just record data—it understands your financial
              history.
            </p>
            <h4 className="mt-6 text-xl font-semibold">Ask questions like:</h4>
            <ul className="mt-4 list-disc pl-5">
              <li className="text-lg mb-2.5">
                "How much did transportation face?"
              </li>
              <li className="text-lg mb-2.5">"What was my biggest expense?"</li>
              <li className="text-lg mb-2.5">"What is my balance?"</li>
            </ul>
          </div>
          <div className="flex-1 text-center">
            <img
              src="/assets/finexo3.webp"
              alt="Ask finexo AI"
              loading="lazy"
              className="w-full max-w-[480px] animate-float hover:animate-none hover:-translate-y-5 hover:scale-[1.06] transition-transform duration-600"
            />
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-16 px-5 md:px-20" data-aos="fade-up">
        <h2 className="text-center text-3xl md:text-4xl font-bold mb-12">
          <span className="text-accent">Core</span> Features
        </h2>
        <div className="flex items-center gap-12 max-lg:flex-col max-lg:items-center">
          <div className="flex flex-col gap-10">
            {["/assets/finexo4.webp", "/assets/finexo5.webp"].map((src, i) => (
              <img
                key={i}
                src={src}
                alt="App Preview"
                loading="lazy"
                className="w-full max-w-[480px] transition-all duration-400 hover:-translate-y-1.5 hover:scale-[1.02] hover:shadow-2xl"
              />
            ))}
          </div>
          <div className="flex flex-col gap-12 lg:ml-[15%] max-lg:ml-0 max-lg:w-full max-lg:items-center">
            {featureBoxes.map((box, i) => (
              <div
                key={i}
                className="bg-gray-100 p-10 rounded-2xl transition-all duration-400 hover:-translate-y-1.5 hover:shadow-xl max-md:p-6 max-lg:w-4/5 max-md:w-full"
              >
                <h3 className="text-xl font-semibold mb-4">{box.title}</h3>
                <ul className="pl-5 list-disc">
                  {box.items.map((item, j) => (
                    <li key={j} className="mb-2">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="text-center mt-16">
          <h3 className="text-2xl md:text-3xl font-bold">
            Start <span className="text-accent">Mastering</span> Your Money
            Today.
          </h3>
          <p className="font-bold my-4">
            Join thousands of users tracking their finances with just their
            voice.{" "}
            <Link to={"/privacy-policy-finexo"}>
              <span className="text-accent underline">Privacy Policy</span>
            </Link>
          </p>
          <div className="flex flex-col gap-2 justify-center items-center">
            <a href="https://play.google.com/store/apps/details?id=com.iotrenetics.finexo" target="_blank" className="py-4 px-10 text-lg border-none rounded-xl font-bold bg-blue-500 text-white cursor-pointer hover:bg-blue-600 transition-colors">
              Now available on Play Store
            </a>
            <Link to={"/delete-account-policy-finexo"}>
              <span className="text-accent underline">
                Delete account policy
              </span>
            </Link>
            {/* <button className="py-4 px-10 text-lg border-none rounded-xl font-bold bg-blue-500 text-white cursor-pointer hover:bg-blue-600 transition-colors">
              Download ⬇️
            </button> */}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
};

export default finexo;
