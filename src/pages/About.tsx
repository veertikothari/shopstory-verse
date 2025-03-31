
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';

const About = () => {
  return (
    <Layout>
      <motion.div 
        className="py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1 
          className="text-4xl font-bold mb-6 text-center"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Our Story
        </motion.h1>
        
        <div className="max-w-3xl mx-auto mb-16">
          <motion.p 
            className="text-lg text-gray-600 mb-6 leading-relaxed"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            ShopStory was founded in 2018 with a simple mission: to connect people with thoughtfully designed, 
            high-quality products that tell a story. We believe that the items we surround ourselves with should 
            not only be functional and beautiful, but should also have meaning and purpose.
          </motion.p>
          
          <motion.p 
            className="text-lg text-gray-600 mb-6 leading-relaxed"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Our journey began when our founder, Sarah, traveled throughout Asia and Europe, meeting 
            artisans who were creating incredible handcrafted goods using traditional techniques passed 
            down through generations. She was inspired by their dedication to quality and craftsmanship 
            in an age of mass production and disposable goods.
          </motion.p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1558951383-a19a5c262169?q=80&w=2670&auto=format&fit=crop" 
              alt="Artisan at work" 
              className="rounded-lg shadow-lg"
            />
          </motion.div>
          
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold mb-4">Our Values</h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              At ShopStory, we're guided by a set of core values that inform every decision we make:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="bg-primary text-white p-1 rounded-full mr-2 flex-shrink-0 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span><strong>Quality:</strong> We never compromise on the quality of our products. Each item is built to last and become a cherished part of your life.</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-white p-1 rounded-full mr-2 flex-shrink-0 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span><strong>Sustainability:</strong> We're committed to environmentally responsible practices across our business, from sourcing to shipping.</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-white p-1 rounded-full mr-2 flex-shrink-0 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span><strong>Transparency:</strong> We believe in being open about where and how our products are made, and fair pricing that reflects true value.</span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-white p-1 rounded-full mr-2 flex-shrink-0 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span><strong>Community:</strong> We support the artisans and makers behind our products, ensuring fair partnerships that benefit their communities.</span>
              </li>
            </ul>
          </motion.div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            className="order-2 md:order-1"
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold mb-4">Our Process</h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Every product in our collection goes through a careful curation process:
            </p>
            <ol className="space-y-4">
              <li className="flex">
                <span className="bg-primary text-white rounded-full h-6 w-6 flex items-center justify-center mr-3 flex-shrink-0 mt-1">1</span>
                <div>
                  <h3 className="font-medium">Discovery</h3>
                  <p className="text-gray-600">We explore the world to find exceptional artisans and designers creating meaningful goods.</p>
                </div>
              </li>
              <li className="flex">
                <span className="bg-primary text-white rounded-full h-6 w-6 flex items-center justify-center mr-3 flex-shrink-0 mt-1">2</span>
                <div>
                  <h3 className="font-medium">Evaluation</h3>
                  <p className="text-gray-600">We assess the quality, materials, production methods, and story behind each item.</p>
                </div>
              </li>
              <li className="flex">
                <span className="bg-primary text-white rounded-full h-6 w-6 flex items-center justify-center mr-3 flex-shrink-0 mt-1">3</span>
                <div>
                  <h3 className="font-medium">Collaboration</h3>
                  <p className="text-gray-600">We work directly with makers to ensure their products meet our standards and values.</p>
                </div>
              </li>
              <li className="flex">
                <span className="bg-primary text-white rounded-full h-6 w-6 flex items-center justify-center mr-3 flex-shrink-0 mt-1">4</span>
                <div>
                  <h3 className="font-medium">Curation</h3>
                  <p className="text-gray-600">We carefully select items that complement our collection and will resonate with our customers.</p>
                </div>
              </li>
            </ol>
          </motion.div>
          
          <motion.div
            className="order-1 md:order-2"
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1608501078713-8e445a709b39?q=80&w=2670&auto=format&fit=crop" 
              alt="Product design process" 
              className="rounded-lg shadow-lg"
            />
          </motion.div>
        </div>
        
        <motion.div 
          className="bg-gray-50 p-8 rounded-lg text-center mb-16"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold mb-4">Our Promise to You</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            When you shop with us, you're not just buying a product – you're investing in quality, 
            supporting sustainable practices, and becoming part of a community that values craftsmanship 
            and thoughtful design. We stand behind everything we sell and are committed to your complete satisfaction.
          </p>
        </motion.div>
        
        <motion.h2 
          className="text-2xl font-bold mb-8 text-center"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Meet Our Team
        </motion.h2>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2
              }
            }
          }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {[
            {
              name: "Sarah Johnson",
              title: "Founder & CEO",
              image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=2622&auto=format&fit=crop",
              bio: "Sarah's background in design and passion for craftsmanship led her to create ShopStory after years of working with artisans around the world."
            },
            {
              name: "Michael Chen",
              title: "Creative Director",
              image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2574&auto=format&fit=crop",
              bio: "Michael brings over 15 years of experience in product design and visual storytelling to the ShopStory team."
            },
            {
              name: "Olivia Rodriguez",
              title: "Head of Curation",
              image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2576&auto=format&fit=crop",
              bio: "With an eye for quality and a passion for discovering hidden gems, Olivia leads our product selection process."
            }
          ].map((member, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg shadow-sm overflow-hidden"
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
              }}
            >
              <img 
                src={member.image} 
                alt={member.name} 
                className="w-full h-64 object-cover object-center"
              />
              <div className="p-6">
                <h3 className="text-xl font-medium mb-1">{member.name}</h3>
                <p className="text-primary mb-3">{member.title}</p>
                <p className="text-gray-600">{member.bio}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </Layout>
  );
};

export default About;
