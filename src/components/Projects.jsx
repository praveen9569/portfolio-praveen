import { useState, useEffect, useRef } from 'react';

const ProjectCard = ({ title, description, tags, image, link, delay }) => {
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
      className="group bg-dark/50 backdrop-blur-lg rounded-xl overflow-hidden opacity-0 translate-y-10 transition-all duration-700 ease-out border border-gray-800 hover:border-primary/50"
    >
      <div className="relative overflow-hidden">
        <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
          {image ? (
            <img 
              src={image} 
              alt={title} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <span className="text-white text-lg">Project Image</span>
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-white group-hover:text-primary transition-colors duration-300">{title}</h3>
        <p className="text-gray-400 mb-4 line-clamp-2">{description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <span 
              key={index} 
              className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <a 
          href={link} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="inline-flex items-center text-primary hover:text-white transition-colors duration-300"
        >
          View Project
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </div>
    </div>
  );
};

const Projects = () => {
  const [filter, setFilter] = useState('all');
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

  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'A full-featured online store with product catalog, shopping cart, and secure checkout.',
      tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      image: '',
      link: '#',
      category: 'web',
      delay: 0,
    },
    {
      title: 'Task Management App',
      description: 'A productivity application for organizing tasks, setting deadlines, and tracking progress.',
      tags: ['React', 'Firebase', 'Tailwind CSS'],
      image: '',
      link: '#',
      category: 'web',
      delay: 100,
    },
    {
      title: 'Portfolio Website',
      description: 'A responsive portfolio website showcasing projects and skills with smooth animations.',
      tags: ['React', 'Tailwind CSS', 'Framer Motion'],
      image: '',
      link: '#',
      category: 'web',
      delay: 200,
    },
    {
      title: 'Weather Dashboard',
      description: 'A weather application that displays current conditions and forecasts for any location.',
      tags: ['JavaScript', 'API Integration', 'CSS'],
      image: '',
      link: '#',
      category: 'app',
      delay: 300,
    },
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

  return (
    <section id="projects" className="py-20 bg-dark">
      <div 
        ref={sectionRef} 
        className="container mx-auto px-4 opacity-0 transition-opacity duration-1000 ease-out"
      >
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            My <span className="text-primary">Projects</span>
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto"></div>
          <p className="text-gray-300 max-w-2xl mx-auto mt-6">
            Here are some of my recent projects. Each one was carefully crafted to solve specific problems
            and deliver exceptional user experiences.
          </p>
        </div>
        
        <div className="flex justify-center mb-10">
          <div className="inline-flex bg-dark/50 backdrop-blur-md rounded-full p-1 border border-gray-800">
            <button 
              onClick={() => setFilter('all')} 
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${filter === 'all' ? 'bg-primary text-white' : 'text-gray-300 hover:text-white'}`}
            >
              All Projects
            </button>
            <button 
              onClick={() => setFilter('web')} 
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${filter === 'web' ? 'bg-primary text-white' : 'text-gray-300 hover:text-white'}`}
            >
              Web Development
            </button>
            <button 
              onClick={() => setFilter('app')} 
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${filter === 'app' ? 'bg-primary text-white' : 'text-gray-300 hover:text-white'}`}
            >
              Applications
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard 
              key={index}
              title={project.title}
              description={project.description}
              tags={project.tags}
              image={project.image}
              link={project.link}
              delay={project.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;