import { useEffect, useRef, useState } from 'react';

const Hero = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Set a small delay to ensure DOM is fully loaded
    const timer = setTimeout(() => {
      setIsVisible(true);
      
      // Simple animation on load
      const title = titleRef.current;
      const subtitle = subtitleRef.current;
      const cta = ctaRef.current;

      if (title && subtitle && cta) {
        title.classList.add('animate-fade-in');
        
        setTimeout(() => {
          subtitle.classList.add('animate-fade-in');
        }, 300);
        
        setTimeout(() => {
          cta.classList.add('animate-slide-up');
        }, 600);
      }
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-dark to-black">
      <div className="absolute inset-0 bg-[url('/src/assets/grid.svg')] bg-center opacity-20"></div>
      
      <div className="container mx-auto px-4 z-10 text-center">
        <h1 
          ref={titleRef} 
          className={`text-4xl md:text-6xl lg:text-7xl font-bold mb-6 ${isVisible ? '' : 'opacity-0'} text-white`}
        >
          <span className="text-primary">Praveen Kumar </span> Nishad
        </h1>
        
        <p 
          ref={subtitleRef} 
          className={`text-xl md:text-2xl max-w-2xl mx-auto mb-10 ${isVisible ? '' : 'opacity-0'} text-gray-300`}
        >
          I craft beautiful, functional digital experiences with a focus on user-centered design and clean code.
        </p>
        
        <div 
          ref={ctaRef} 
          className={`${isVisible ? '' : 'opacity-0'} flex flex-col sm:flex-row justify-center gap-4`}
        >
          <a 
            href="#projects" 
            className="px-8 py-3 bg-primary text-white font-medium rounded-full hover:bg-primary/80 transition-all duration-300 transform hover:scale-105"
          >
            View My Work
          </a>
          <a 
            href="#contact" 
            className="px-8 py-3 bg-transparent border-2 border-white text-white font-medium rounded-full hover:bg-white/10 transition-all duration-300 transform hover:scale-105"
          >
            Contact Me
          </a>
        </div>
        
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce-slow">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-8 w-8 text-primary" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 14l-7 7m0 0l-7-7m7 7V3" 
            />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Hero;