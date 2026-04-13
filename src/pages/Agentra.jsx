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
    accent: true,
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

const Agentra = () => {
  return (
    <>
      {/* HERO */}
      <section className="py-20 px-5 md:px-24" data-aos="fade-up">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold">
            Agentra<span className="text-accent">MailSense</span>
          </h1>
          <br />
          <h2 className="text-3xl md:text-4xl font-bold">
            AI-Powered <span className="text-accent">Email Automation</span>
          </h2>
          <p className="text-xl text-gray-700 mt-2">
            Transform your inbox into an intelligent, self-managing system —
            classify emails, generate replies, and automate actions instantly.
          </p>
        </div>

        {/* WHAT IS */}
        <div className="flex items-center gap-16 max-lg:flex-col">
          <div className="w-full lg:w-[55%]">
            <h2 className="text-4xl font-extrabold mb-5">
              What is <span className="text-accent">Agentra</span>
            </h2>
            <p className="text-xl mb-5">
              AgentraMailSense is an AI-powered autonomous email system that
              understands, classifies, and responds to emails in real time.
            </p>
            <p className="text-xl mb-5">
              Instead of manually replying or sorting emails, Agentra analyzes
              context, prioritizes conversations, and responds intelligently —
              saving time and improving communication efficiency.
            </p>
            <strong className="text-xl">
              Let AI handle your inbox,{" "}
              <span className="text-accent">you focus on what matters.</span>
            </strong>
          </div>

          <div className="w-full lg:w-[50%] rounded-xl overflow-hidden">
            <img
              src="/assets/agentra img 1.jpeg"
              className="w-full transition-transform hover:scale-[1.03]"
            />
          </div>
        </div>
      </section>

      {/* PURPOSE */}
      <section className="py-20 px-[6%] bg-white">
        <h1 className="text-4xl font-extrabold mb-10">
          Core of <span className="text-accent">Agentra</span>
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

          {/* <div>
            <img
              src="/assets/agentra img 2.jpeg"
              className="max-w-[520px] w-full transition-transform hover:scale-105"
            />
          </div> */}
        </div>
      </section>

      {/* AI SECTION */}
      <section className="py-20 px-[8%] bg-white">
        <div className="flex items-center justify-between gap-10 max-lg:flex-col max-lg:text-center">
          <div className="flex-1">
            <h2 className="text-4xl font-bold">
              AI Email <span className="text-accent">Assistant</span>
            </h2>
            <p className="text-lg mt-5 max-w-[520px]">
              Agentra doesn’t just read emails — it understands them. Get
              automatic replies, insights, and actions instantly.
            </p>

            <h4 className="mt-6 text-xl font-semibold">
              It can handle tasks like:
            </h4>

            <ul className="mt-4 list-disc pl-5">
              <li className="mb-2">Reply to client emails instantly</li>
              <li className="mb-2">Filter spam intelligently</li>
              <li className="mb-2">Prioritize important conversations</li>
            </ul>
          </div>

          <div className="flex-1 text-center">
            <img
              src="/assets/agentra img 3.jpeg"
              className="w-full max-w-[480px] hover:scale-[1.06] transition-transform"
            />
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-16 px-5 md:px-20 border">
        <h2 className="text-center text-3xl md:text-4xl font-bold mb-12">
          <span className="text-accent">Agent</span> Modes
        </h2>

        <div className="flex items-center justify-center max-lg:flex-col">
          <div className="flex flex-col gap-10">
            {[
              "/assets/agentra img 1.jpeg",
              "/assets/agentra img 2.jpeg",
            ].map((src, i) => (
              <img
                key={i}
                src={src}
                className="w-full max-w-[480px] h-[250px] hover:scale-[1.02] shadow-lg"
              />
            ))}
          </div>

          <div className="flex flex-col gap-10 lg:ml-[15%] max-lg:w-full">
            {featureBoxes.map((box, i) => (
              <div
                key={i}
                className="bg-gray-100 w-[480px] p-10 h-[250px] rounded-2xl hover:shadow-xl"
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

        {/* CTA */}
        <div className="text-center mt-16">
          <h3 className="text-2xl md:text-3xl font-bold">
            Turn Inbox Chaos into{" "}
            <span className="text-accent">Clarity</span>
          </h3>
          <p className="font-bold my-4">
            Smarter emails. Faster replies. Better productivity.
          </p>

          <button className="py-4 px-10 text-lg rounded-xl font-bold bg-blue-500 text-white hover:bg-blue-600">
            Get Started
          </button>
        </div>
      </section>

      <CTASection />
    </>
  );
};

export default Agentra;