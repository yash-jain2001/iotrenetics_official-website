
import CTASection from "../components/CTASection";

const purposeCards = [
  {
    title: "📥 Real-Time Email Ingestion",
    items: [
      "Connects directly with Gmail",
      "Continuously monitors inbox",
      "Captures raw email streams instantly",
    ],
  },
  {
    title: "🤖 AI Classification Engine",
    items: [
      "Important, Spam, Promotional, General",
      "Powered by Mistral AI",
      "Confidence-based tagging",
    ],
  },
  {
    title: "💬 Auto Reply Intelligence",
    items: [
      "Context-aware responses",
      "Learns from templates",
      "Instant reply generation",
    ],
  },
  {
    title: "🔔 Smart Notifications",
    items: [
      "Priority alerts",
      "Urgent email detection",
      "Daily summaries",
    ],
  },
];

const featureBoxes = [
  {
    title: "⚡ Fast Mode",
    items: [
      "Instant replies without approval",
      "Fully automated workflow",
      "Ideal for high-volume emails",
    ],
  },
  {
    title: "🛡️ Safe Mode",
    items: [
      "Manual approval before sending",
      "Edit responses easily",
      "Perfect for sensitive emails",
    ],
  },
];

const PurposeCard = ({ title, items }) => (
  <div className="w-full sm:w-[48%] bg-gray-100 p-6 rounded-xl border border-gray-200 hover:shadow-xl hover:bg-white transition-all duration-300">
    <h3 className="text-lg sm:text-xl font-semibold mb-4">{title}</h3>
    <ul className="pl-5 list-disc">
      {items.map((item, i) => (
        <li key={i} className="mb-2 text-sm sm:text-base">
          {item}
        </li>
      ))}
    </ul>
  </div>
);

const Agentra = () => {
  return (
    <>
      {/* HERO */}
      <section className="py-16 px-5 sm:px-8 md:px-16 lg:px-24">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
            Agentra<span className="text-accent">MailSense</span>
          </h1>

          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mt-4">
            AI-Powered <span className="text-accent">Email Automation</span>
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-gray-700 mt-4 max-w-2xl mx-auto">
            Transform your inbox into an intelligent, self-managing system —
            classify emails, generate replies, and automate actions instantly.
          </p>
        </div>

        {/* WHAT IS */}
        <div className="flex flex-col lg:flex-row items-center gap-10">
          <div className="w-full lg:w-1/2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-5">
              What is <span className="text-accent">Agentra</span>
            </h2>

            <p className="text-base sm:text-lg mb-4">
              AgentraMailSense is an AI-powered autonomous email system that
              understands, classifies, and responds to emails in real time.
            </p>

            <p className="text-base sm:text-lg mb-4">
              Instead of manually replying or sorting emails, Agentra analyzes
              context, prioritizes conversations, and responds intelligently —
              saving time and improving communication efficiency.
            </p>

            <strong className="text-base sm:text-lg">
              Let AI handle your inbox,{" "}
              <span className="text-accent">you focus on what matters.</span>
            </strong>
          </div>

          <div className="w-full lg:w-1/2">
            <img
              src="/assets/agentra img 1.jpeg"
              className="w-full h-auto rounded-xl object-cover hover:scale-[1.03] transition"
            />
          </div>
        </div>
      </section>

      {/* PURPOSE */}
      <section className="py-16 px-5 sm:px-8 md:px-16 lg:px-24 bg-white">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-10">
          Core of <span className="text-accent">Agentra</span>
        </h1>

        <div className="flex flex-wrap gap-4">
          {purposeCards.map((card, i) => (
            <PurposeCard key={i} title={card.title} items={card.items} />
          ))}
        </div>
      </section>

      {/* AI SECTION */}
      <section className="py-16 px-5 sm:px-8 md:px-16 lg:px-24 bg-white">
        <div className="flex flex-col lg:flex-row items-center gap-10 text-center lg:text-left">
          <div className="w-full lg:w-1/2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
              AI Email <span className="text-accent">Assistant</span>
            </h2>

            <p className="text-base sm:text-lg mt-4 max-w-md mx-auto lg:mx-0">
              Agentra doesn’t just read emails — it understands them. Get
              automatic replies, insights, and actions instantly.
            </p>

            <h4 className="mt-6 text-lg sm:text-xl font-semibold">
              It can handle tasks like:
            </h4>

            <ul className="mt-4 list-disc pl-5 text-left inline-block">
              <li className="mb-2">Reply to client emails instantly</li>
              <li className="mb-2">Filter spam intelligently</li>
              <li className="mb-2">Prioritize important conversations</li>
            </ul>
          </div>

          <div className="w-full lg:w-1/2 flex justify-center">
            <img
              src="/assets/agentra img 3.jpeg"
              className="w-full max-w-md h-auto rounded-xl hover:scale-[1.05] transition"
            />
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-16 px-5 sm:px-8 md:px-16 lg:px-24 border">
        <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold mb-12">
          <span className="text-accent">Agent</span> Modes
        </h2>

        <div className="flex flex-col lg:flex-row items-center gap-10">
          {/* Images */}
          <div className="flex flex-col gap-6 w-full lg:w-1/2 items-center">
            {[
              "/assets/agentra img 1.jpeg",
              "/assets/agentra img 2.jpeg",
            ].map((src, i) => (
              <img
                key={i}
                src={src}
                className="w-full max-w-md h-auto rounded-xl shadow-md hover:scale-[1.02] transition"
              />
            ))}
          </div>

          {/* Feature Boxes */}
          <div className="flex flex-col gap-6 w-full lg:w-1/2">
            {featureBoxes.map((box, i) => (
              <div
                key={i}
                className="bg-gray-100 w-full p-6 sm:p-8 rounded-2xl hover:shadow-xl transition"
              >
                <h3 className="text-lg sm:text-xl font-semibold mb-4">
                  {box.title}
                </h3>

                <ul className="pl-5 list-disc">
                  {box.items.map((item, j) => (
                    <li key={j} className="mb-2 text-sm sm:text-base">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold">
            Turn Inbox Chaos into{" "}
            <span className="text-accent">Clarity</span>
          </h3>

          <p className="font-bold my-4 text-sm sm:text-base">
            Smarter emails. Faster replies. Better productivity.
          </p>

          <button className="py-3 px-8 sm:px-10 text-base sm:text-lg rounded-xl font-bold bg-blue-500 text-white hover:bg-blue-600 transition">
            Get Started
          </button>
        </div>
      </section>

      <CTASection />
    </>
  );
};

export default Agentra;
