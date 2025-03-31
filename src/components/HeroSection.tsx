
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      title: "New Summer Collection",
      subtitle: "Elevate your everyday style with our latest arrivals",
      cta: "Shop Now",
      image: "https://images.unsplash.com/photo-1511556820780-d912e42b4980?q=80&w=2940&auto=format&fit=crop",
      bgColor: "bg-blue-50"
    },
    {
      title: "Artisan Crafted Goods",
      subtitle: "Handcrafted with care and attention to detail",
      cta: "Discover",
      image: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?q=80&w=2947&auto=format&fit=crop",
      bgColor: "bg-amber-50"
    },
    {
      title: "Sustainable Fashion",
      subtitle: "Eco-friendly materials that look good and do good",
      cta: "Learn More",
      image: "https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=2940&auto=format&fit=crop",
      bgColor: "bg-green-50"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="relative h-[80vh] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <div className={`h-full w-full ${slide.bgColor}`}>
            <div className="container mx-auto h-full flex flex-col md:flex-row items-center">
              <motion.div 
                className="md:w-1/2 p-8 md:p-12"
                initial={{ opacity: 0, x: -50 }}
                animate={{ 
                  opacity: index === currentSlide ? 1 : 0,
                  x: index === currentSlide ? 0 : -50
                }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h1 className="text-4xl md:text-6xl font-bold mb-4">{slide.title}</h1>
                <p className="text-lg md:text-xl text-gray-600 mb-8">{slide.subtitle}</p>
                <Button asChild size="lg" className="rounded-full">
                  <Link to="/products">{slide.cta}</Link>
                </Button>
              </motion.div>
              
              <motion.div 
                className="md:w-1/2 h-full"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ 
                  opacity: index === currentSlide ? 1 : 0, 
                  scale: index === currentSlide ? 1 : 1.1
                }}
                transition={{ duration: 0.7 }}
              >
                <img 
                  src={slide.image} 
                  alt={slide.title}
                  className="w-full h-full object-cover object-center"
                />
              </motion.div>
            </div>
          </div>
        </div>
      ))}
      
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`h-2 rounded-full transition-all ${
              index === currentSlide ? 'w-8 bg-primary' : 'w-2 bg-gray-300'
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
