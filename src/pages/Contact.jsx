import CTASection from "../components/CTASection";

const benefits = [
  "We deliver smart and reliable tech solutions tailored to your business needs.",
  "Our team supports you from idea to deployment with end-to-end expertise.",
  "We help you improve efficiency and growth through modern digital innovation.",
  "We prioritize clear communication and fast response to your queries.",
  "We use secure, scalable technologies built for long-term performance.",
];

const Contact = () => {
  return (
    <>
      <section className="py-20 px-5 md:px-10 bg-gray-200" data-aos="fade-up">
        <div className="max-w-[1200px] mx-auto flex gap-16 max-lg:flex-col">
          {/* Left */}
          <div className="flex-1">
            <h1 className="text-5xl font-medium mb-2.5 text-center">
              <span className="text-accent">Contact</span> Us
            </h1>
            <p className="text-xl mb-8 text-center">
              Let's explore how <span className="text-accent">IoTrenetics</span>{" "}
              work for you.
            </p>
            <div className="bg-gray-100 p-9 mb-6">
              {benefits.map((b, i) => (
                <p key={i} className="text-base mb-4 leading-relaxed text-left">
                  ✓ {b}
                </p>
              ))}
            </div>
            <p className="text-base">
              Looking for support?{" "}
              <a href="#" className="text-black underline">
                Visit help and documentation
              </a>
            </p>
          </div>

          {/* Right — Form */}
          <div className="flex-[1.2]">
            <form className=" p-5 flex flex-col" action="https://api.web3forms.com/submit" method="POST">
              <input
                type="hidden"
                name="access_key"
                value="5b6c798b-e407-4391-8eeb-83adb2332c6b"
              />
              <div className="flex gap-8 max-lg:flex-col">
                <div className="mb-5 w-full">
                  <label htmlFor="fname" className="block text-lg mb-2">
                    First name*
                  </label>
                  <input
                    type="text"
                    id="fname"
                    name="first_name"
                    required
                    className="w-full bg-gray-100 border-none p-4 text-base"
                  />
                </div>
                <div className="mb-5 w-full">
                  <label htmlFor="lname" className="block text-lg mb-2">
                    Last name
                  </label>
                  <input
                    type="text"
                    id="lname"
                    name="last_name"
                    className="w-full bg-gray-100 border-none p-4 text-base"
                  />
                </div>
              </div>
              {[
                {
                  id: "email",
                  label: "Work Email*",
                  type: "email",
                  name: "work_email",
                  required: true,
                },
                {
                  id: "company",
                  label: "Company Name*",
                  type: "text",
                  name: "company_name",
                  required: true,
                },
                {
                  id: "phone",
                  label: "Phone No.*",
                  type: "number",
                  name: "phone_number",
                  required: true,
                },
              ].map((field) => (
                <div key={field.id} className="mb-5 w-full">
                  <label htmlFor={field.id} className="block text-lg mb-2">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    id={field.id}
                    name={field.name}
                    required={field.required}
                    className="w-full bg-gray-100 border-none p-4 text-base"
                  />
                </div>
              ))}
              <div className="mb-5 w-full">
                <label htmlFor="message" className="block text-lg mb-2">
                  Anything else?
                </label>
                <textarea
                  id="message"
                  name="message"
                  className="w-full bg-gray-100 border-none p-4 text-base h-[120px] resize-none"
                ></textarea>
              </div>
              <p className="text-sm mt-4">
                By submitting this form, I acknowledge receipt of the{" "}
                <a href="#" className="text-accent underline">
                  IoTrenetics Policy
                </a>
                .
              </p>
              <p className="text-sm mt-2.5">
                Fields marked with an asterisk (*) are required.
              </p>
              <button
                type="submit"
                className="mt-6 w-fit mx-auto py-3 px-12 rounded-full border-none bg-gray-100 text-accent text-lg cursor-pointer hover:bg-white transition-colors"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
};

export default Contact;
