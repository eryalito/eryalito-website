
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRobot, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faTelegram } from '@fortawesome/free-brands-svg-icons';

const projects = [
  {
    title: "KubeNSync",
    description: "A Kubernetes operator designed to simplify resource management across namespaces and the entire cluster.",
    link: "https://kubensync.com/",
    svg: import.meta.env.BASE_URL + 'images/kubernetes.svg',
    icons: [faGlobe]
  },
  {
    title: "FofonsoBot",
    description: "Telegram bot with basic tasks on groups: random number, custom messages, etc.",
    link: "https://github.com/eryalito/fofonso",
    svg: null,
    icons: [faRobot, faTelegram, faGithub]
  },
  {
    title: "BusVigoBot",
    description: "Telegram bot with real-time bus information for Vigo.",
    link: "https://t.me/busvigobot",
    svg: null,
    icons: [faRobot, faTelegram]
  },
  {
    title: "This??",
    description: "Well... Just this site, you can look around if you want",
    link: "https://github.com/eryalito/eryalito-website",
    svg: null,
    icons: [faGithub]
  },
  {
    title: "More Random Stuff",
    description: "You can find more random stuff here",
    link: "https://github.com/eryalito",
    svg: null,
    icons: [faGithub]
  },
];


// Reusable card color classes for post-it style
const cardColorClass = "bg-yellow-100 border-yellow-200 text-zinc-800 shadow-lg";

const ProjectsSection: React.FC = () => (
  <section id="projects" className="section">
    <div className="mx-auto px-4 py-10">
      <h1 className="mb-8 font-bold text-3xl tracking-wide text-center text-primary">Projects</h1>
      <div className="flex flex-wrap justify-center gap-8">
        {projects.map((project, i) => (
          <a
            key={i}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`rounded-md px-6 py-4 w-96 max-w-full flex flex-col items-start font-pixel transition-transform hover:scale-105 border relative z-10 ${cardColorClass}`}
            style={{ boxShadow: '0 4px 16px 0 rgba(0,0,0,0.10)', transform: `rotate(${(Math.random() * 6 - 3).toFixed(2)}deg)`, textDecoration: 'none', color: '#27272a' }}
            title={project.title}
          >
            <h2 className="text-xl mb-2" style={{ color: '#27272a', textDecoration: 'none' }}>{project.title}</h2>
            <p className="mb-4 text-zinc-700 font-sans font-pixel" style={{ color: '#27272a', textDecoration: 'none' }}>{project.description}</p>
            <span className="font-bold mt-auto flex items-center gap-2" style={{ color: '#27272a', textDecoration: 'none' }}>
              {project.svg ? (
                <img src={project.svg} alt={project.title + ' logo'} style={{ height: '1.5em', width: '1.5em' }} />
              ) : (
                project.icons && project.icons.map((icon, idx) => (
                  <FontAwesomeIcon icon={icon} size="lg" key={idx} />
                ))
              )}
            </span>
          </a>
        ))}
      </div>
    </div>
  </section>
);

export default ProjectsSection;
