
import React from 'react';

const projects = [
  {
    title: "Personal Portfolio",
    description: "A modern, responsive website to showcase my work and skills.",
    link: "https://github.com/eryalito/portfolio"
  },
  {
    title: "Game Tracker",
    description: "A web app to track and review video games I've played.",
    link: "https://github.com/eryalito/game-tracker"
  },
  {
    title: "Cat Gallery",
    description: "A fun project to display random cat images using an API.",
    link: "https://github.com/eryalito/cat-gallery"
  }
];


// Reusable card color classes for post-it style
const cardColorClass = "bg-yellow-100 border-yellow-200 text-zinc-800 shadow-lg";

const ProjectsSection: React.FC = () => (
  <section id="projects" className="section">
    <div className="mx-auto px-4 py-10">
      <h1 className="mb-8 font-bold text-3xl tracking-wide text-center text-primary">Projects</h1>
      <div className="flex flex-wrap justify-center gap-8">
        {projects.map((project, i) => (
          <div
            key={i}
            className={`rounded-md px-6 py-4 w-80 max-w-full flex flex-col items-start font-pixel transition-transform hover:scale-105 border relative z-10 ${cardColorClass}`}
            style={{ boxShadow: '0 4px 16px 0 rgba(0,0,0,0.10)', transform: `rotate(${(Math.random() * 6 - 3).toFixed(2)}deg)` }}
          >
            <h2 className="text-xl mb-2">{project.title}</h2>
            <p className="mb-4 text-zinc-700 font-sans font-pixel">{project.description}</p>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-bold underline hover:text-secondary"
            >
              View on GitHub
            </a>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ProjectsSection;
