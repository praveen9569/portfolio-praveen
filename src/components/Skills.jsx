import { useEffect, useRef } from 'react';

const SkillCard = ({ icon, title, level, delay }) => {
  const cardRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('opacity-100');
            entry.target.classList.remove('translate-y-10');
          }, delay);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
      }
    );
    
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    
    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [delay]);

  return (
    <div 
      ref={cardRef} 
      className="bg-dark/50 backdrop-blur-lg rounded-xl p-6 opacity-0 translate-y-10 transition-all duration-700 ease-out hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-1 border border-gray-800"
    >
      <div className="text-primary text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
      <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
        <div 
          className="bg-primary h-2 rounded-full transition-all duration-1000 ease-out" 
          style={{ width: `${level}%`, transitionDelay: `${delay + 300}ms` }}
        ></div>
      </div>
      <p className="text-gray-400 text-sm">{level}% Proficiency</p>
    </div>
  );
};

const Skills = () => {
  const sectionRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100');
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

  const skills = [
    { icon: '⚛️', title: 'React', level: 90, delay: 0 },
    { icon: '🌐', title: 'JavaScript', level: 85, delay: 100 },
    { icon: '🎨', title: 'CSS/Tailwind', level: 80, delay: 200 },
    { icon: '📱', title: 'Responsive Design', level: 85, delay: 300 },
    { icon: '🔄', title: 'Node.js', level: 75, delay: 400 },
    { icon: '💾', title: 'MongoDB', level: 70, delay: 500 },
    { icon: '🛢️', title: 'SQL/MySQL', level: 80, delay: 600 },
    { icon: '🔍', title: 'SEO', level: 65, delay: 700 },
    { icon: '🔒', title: 'Security', level: 60, delay: 800 },
    { icon: '🖥️', title: 'C++', level: 75, delay: 900 },
  ];

  return (
    <section id="skills" className="py-20 bg-black">
      <div 
        ref={sectionRef} 
        className="container mx-auto px-4 opacity-0 transition-opacity duration-1000 ease-out"
      >
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            My <span className="text-primary">Skills</span>
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto"></div>
          <p className="text-gray-300 max-w-2xl mx-auto mt-6">
            I've worked with a variety of technologies and frameworks to create seamless digital experiences.
            Here's an overview of my technical expertise and proficiency levels.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {skills.map((skill, index) => (
            <SkillCard 
              key={index}
              icon={skill.icon}
              title={skill.title}
              level={skill.level}
              delay={skill.delay}
            />
          ))}
        </div>
        
        <div className="flex justify-center">
          <a 
            href="/resume.pdf" 
            target="resume.pdf"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-primary text-white font-medium rounded-full hover:bg-primary/80 transition-all duration-300 transform hover:scale-105"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download CV
          </a>
        </div>
      </div>
    </section>
  );
};

export default Skills;