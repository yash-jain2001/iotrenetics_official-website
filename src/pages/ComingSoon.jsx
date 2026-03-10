import { Link } from 'react-router-dom';

const ComingSoon = () => {
  return (
    <section className="min-h-[80vh] flex items-center justify-center px-4 py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="text-center max-w-xl mx-auto">
        {/* Animated rocket emoji */}
        <div className="text-6xl mb-6 animate-bounce">🚀</div>

        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
          Something Exciting is Coming
        </h1>

        <p className="text-lg md:text-xl text-gray-500 mb-10">
          We're building something amazing. Stay tuned!
        </p>

        <Link
          to="/"
          className="inline-block bg-brand text-white font-semibold px-8 py-3 rounded-lg
                     hover:brightness-110 hover:-translate-y-0.5
                     transition-all duration-200 shadow-lg shadow-brand/25"
        >
          Back to Home
        </Link>
      </div>
    </section>
  );
};

export default ComingSoon;
