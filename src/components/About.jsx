import { useEffect, useRef } from 'react';

const About = () => {
  const sectionRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100');
          entry.target.classList.remove('translate-y-10');
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
      }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section id="about" className="py-20 bg-dark">
      <div 
        ref={sectionRef} 
        className="container mx-auto px-4 opacity-0 translate-y-10 transition-all duration-1000 ease-out"
      >
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            About <span className="text-primary">Me</span>
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative max-w-md mx-auto md:mx-0">
            <div className="rounded-2xl overflow-hidden" style={{ maxHeight: 'min(400px, 50vh)', width: 'auto' }}>
              <div className="aspect-square md:aspect-auto md:h-[min(400px,50vh)] flex items-center justify-center">
                <img 
                  src="/profile-placeholder.svg" 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                  style={{ maxHeight: '100%', maxWidth: '100%' }}
                />
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-primary/10 rounded-full blur-3xl"></div>
            <div className="absolute -top-6 -left-6 w-48 h-48 bg-secondary/10 rounded-full blur-3xl"></div>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold mb-4 text-white">Professional <span className="text-primary">Profile</span></h3>
            <p className="text-gray-300 mb-6">
              I am a passionate developer with expertise in creating modern web applications. 
              With a strong foundation in both frontend and backend technologies, I enjoy building 
              seamless, user-friendly experiences that solve real-world problems.
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <h4 className="text-primary font-medium mb-2">Name</h4>
                <p className="text-gray-300">Praveen Kumar Nishad</p>
              </div>
              <div>
                <h4 className="text-primary font-medium mb-2">Email</h4>
                <p className="text-gray-300">kotavns@gmail.com</p>
              </div>
              <div>
                <h4 className="text-primary font-medium mb-2">Location</h4>
                <p className="text-gray-300">Ghaziabad, Uttar Pradesh, India</p>
              </div>
              <div>
                <h4 className="text-primary font-medium mb-2">Availability</h4>
                <p className="text-gray-300">💼 Currently open to opportunities
I'm actively looking for full-time roles, internships, or freelance projects in Web Development / Software Engineering.
Available to start immediately. Remote or hybrid preferred.</p>
              </div>
            </div>
            
            <div className="mb-6">
              <h4 className="text-primary font-medium mb-3">Coding Platforms</h4>
              <div className="flex flex-wrap gap-3">
                <a 
                  href="https://codolio.com/profile/praveen12" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-dark/70 border border-gray-700 rounded-lg hover:border-primary hover:text-primary transition-colors duration-300"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                  Codolio
                </a>
                {/* Add more coding platform links here */}
              </div>
            </div>
            
            <div className="flex gap-4">
              <a 
                href="#contact" 
                className="inline-block px-6 py-3 bg-primary text-white font-medium rounded-full hover:bg-primary/80 transition-all duration-300 transform hover:scale-105"
              >
                Contact Me
              </a>
              <a 
                href="https://codolio.com/profile/praveen12" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 bg-dark/70 border border-gray-700 text-white font-medium rounded-full hover:border-primary hover:text-primary transition-all duration-300"
              >
                View My Codolio
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;