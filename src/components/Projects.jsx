import { useState, useEffect, useRef } from 'react';

const ProjectCard = ({ title, description, tags, image, link, delay }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add("opacity-100");
          entry.target.classList.remove("translate-y-10");
        }, delay);
        observer.unobserve(entry.target);
      }
    });

    if (cardRef.current) observer.observe(cardRef.current);

    return () => {
      if (cardRef.current) observer.unobserve(cardRef.current);
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
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-white group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>
        <p className="text-gray-400 mb-4 line-clamp-2">{description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, i) => (
            <span
              key={i}
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 ml-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </a>
      </div>
    </div>
  );
};

const Projects = () => {
  const [filter, setFilter] = useState("all");
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("opacity-100");
        observer.unobserve(entry.target);
      }
    });

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  const projects = [
    {
      title: "Real Time Chat-App",
      description:
        "A full real-time chat application using MERN, Socket.io, JWT authentication, and typing indicators.",
      tags: ["React", "Socket.io", "Tailwind CSS", "JWT"],
      image: "/chatapp.png",
      link: "https://github.com/praveen9569/real-time-chat-app",
      github: "https://github.com/praveen9569/real-time-chat-app",
      category: "web",
      delay: 0,
    },
    {
      title: "Developer Portfolio Website",
      description:
        "A responsive personal portfolio website with animations and project showcases.",
      tags: ["React", "Tailwind CSS", "Framer Motion"],
      image: "/port.png",
      link: "https://portfolio-praveen-orcin.vercel.app/",
      github: "https://github.com/praveen9569/portfolio-praveen",
      category: "web",
      delay: 200,
    },
    {
      title: "ThinkBoard",
      description:
        "A MERN-based note-taking app with authentication and smooth UI animations.",
      tags: [
        "React",
        "Node.js",
        "Express",
        "MongoDB",
        "Tailwind CSS",
        "Framer Motion",
        "JWT",
      ],
      image: "/thinkboard.png",
      link: "https://note-taking-app-5d47.onrender.com/",
      github: "https://github.com/praveen9569/note_taking_app",
      category: "web",
      delay: 300,
    },
    {
      title: "Movie Recommendation App",
      description:
        "A content-based movie recommendation system using cosine similarity.",
      tags: ["React", "ML Model", "Content Filtering"],
      image: "/movie.png",
      link: "https://github.com/praveen9569/movie-recommadtion-system",
      github: "https://github.com/praveen9569/movie-recommadtion-system",
      category: "web",
      delay: 350,
    },
    {
      title: "Awesome To-Do List",
      description:
        "A sleek animated to-do list app with glassmorphism UI and responsive layout.",
      tags: ["JavaScript", "CSS"],
      image: "/todo.png",
      link: "https://github.com/praveen9569/TO-DO-APP",
      github: "https://github.com/praveen9569/TO-DO-APP",
      category: "web",
      delay: 400,
    },
    {
      title: "Modern Calculator",
      description:
        "A minimal and responsive calculator app with basic arithmetic operations.",
      tags: ["HTML", "CSS", "JavaScript"],
      image: "/calculator.png",
      link: "https://github.com/yourusername/modern-calculator",
      github: "https://github.com/yourusername/modern-calculator",
      category: "app",
      delay: 450,
    },
  ];

  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="py-20 bg-dark">
      <div
        ref={sectionRef}
        className="container mx-auto px-4 opacity-0 transition-opacity duration-1000"
      >
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            My <span className="text-primary">Projects</span>
          </h2>

          <p className="text-gray-300 max-w-2xl mx-auto mt-6">
            Here are some of my recent projects, crafted with clean UI and
            strong functionality.
          </p>
        </div>

        <div className="flex justify-center mb-10">
          <div className="inline-flex bg-dark/50 backdrop-blur-md rounded-full p-1 border border-gray-800">
            {["all", "web", "app"].map((t) => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                  filter === t
                    ? "bg-primary text-white"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {t === "all"
                  ? "All Projects"
                  : t === "web"
                  ? "Web Development"
                  : "Applications"}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
