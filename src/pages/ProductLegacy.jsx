import { Link } from 'react-router-dom';
import CTASection from '../components/CTASection';
import SectionTitle from '../components/SectionTitle';
import SolutionBlock from '../components/SolutionBlock';

const products = [
  {
    title: <><span className="text-accent">Short</span> Description</>,
    description: 'Short description of the product goes here. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam numquam reiciendis quas at, eum ex, cumque repellendus maiores magni sunt optio autem voluptas facilis consectetur necessitatibus natus, aut deserunt eveniet eos praesentium iste possimus ut.',
    image: '/assets/Product 1.webp',
    reverse: false,
  },
  {
    title: <><span className="text-accent">Short</span> Description</>,
    description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eveniet quasi soluta, repudiandae placeat consequatur autem accusantium, voluptatum culpa sint qui nisi quibusdam aspernatur ab minus.',
    image: '/assets/Product 2.webp',
    reverse: true,
  },
  {
    title: <><span className="text-accent">Short</span> Description</>,
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur dolorem asperiores laboriosam, cumque repellendus nulla quidem.',
    image: '/assets/Product 3.webp',
    reverse: false,
  },
  {
    title: <><span className="text-accent">Short</span> Description</>,
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae obcaecati, ducimus praesentium velit quis impedit suscipit architecto esse temporibus.',
    image: '/assets/Product 4.webp',
    reverse: true,
  },
  {
    title: <><span className="text-accent">Short</span> Description</>,
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur dolorem asperiores laboriosam, cumque repellendus nulla quidem.',
    image: '/assets/Product 5.webp',
    reverse: false,
  },
];

const ProductLegacy = () => {
  return (
    <>
      <section className="py-24 bg-white max-md:py-16" data-aos="fade-up">
        <div className="max-w-[1200px] mx-auto px-5">
          <div className="text-center mb-20">
            <SectionTitle accent="Our" postText=" Products" />
            <p className="mt-3 text-base text-gray-600">Explore our range of cutting-edge products designed to enhance your IoT ecosystem.</p>
          </div>

          <div className="flex flex-col gap-20">
            {products.map((prod, i) => (
              <SolutionBlock
                key={i}
                title={prod.title}
                description={prod.description}
                image={prod.image}
                reverse={prod.reverse}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Ecosystem */}
      <section className="py-24 text-center max-w-[1200px] mx-auto px-5" data-aos="fade-up">
        <h2 className="text-3xl font-bold mb-4">How Our <span className="text-accent">Products</span> Work Together</h2>
        <p className="max-w-[800px] mx-auto mb-16 text-lg leading-relaxed text-gray-700">Our products are designed to work independently or as a complete ecosystem. Teams can start with a single product and scale as their needs grow.</p>
        <div className="relative max-w-[1100px] mx-auto">
          <img src="/assets/Product 6.webp" alt="Ecosystem" loading="lazy" className="w-4/5 rounded-[600px] block mx-auto max-md:rounded-2xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-center max-w-[700px] px-5">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Designed for Scale . Built for the Future</h3>
            <p className="text-lg leading-relaxed opacity-95">Our <span className="text-accent font-bold">product</span> ecosystem adapts to your needs today and grows with you tomorrow.</p>
          </div>
        </div>
      </section>

      {/* Finexa Link */}
      <div className="text-center py-8" data-aos="fade-up">
        <SectionTitle preText="Explore " accent="Finexa" postText=" Product" />
        <Link to="/finexa">
          <button className="bg-accent text-white border-none py-4 px-12 text-lg rounded cursor-pointer hover:bg-accent-dark transition-colors">Click Here</button>
        </Link>
      </div>

      <CTASection />
    </>
  );
};

export default ProductLegacy;
