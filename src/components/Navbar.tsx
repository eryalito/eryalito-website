import { useState } from 'react';
import type { ReactNode } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faTools, faLightbulb, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';

type Section = { id: string; label: string; icon: ReactNode };

const sections: Section[] = [
  { id: 'about', label: 'About', icon: <FontAwesomeIcon icon={faUser} /> },
  { id: 'skills', label: 'Skills', icon: <FontAwesomeIcon icon={faLightbulb} /> },
  { id: 'projects', label: 'Projects', icon: <FontAwesomeIcon icon={faTools} /> },
  { id: 'contact', label: 'Contact', icon: <FontAwesomeIcon icon={faEnvelope} /> },
];

interface NavbarProps {
  handleNavClick: (id: string) => void;
}

const Navbar = ({ handleNavClick }: NavbarProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const onLinkClick = (id: string) => {
    handleNavClick(id);
    setMenuOpen(false);
  };

  return (
    <nav className="sidebar bg-gray-900 text-white flex-shrink-0 md:w-64 w-full md:min-h-screen">
      <div className="flex flex-col h-full w-full">
        <div className="flex flex-row items-center justify-between px-4 py-4 w-full">
          <div className="flex flex-col items-start md:items-center w-full">
            <img
              src={import.meta.env.BASE_URL + 'logo.png'}
              alt="Eryalito Logo"
              className="hidden md:block w-16 h-16 mb-2 mx-auto"
            />
            <div className="logo font-pixel text-2xl">Eryalito</div>
          </div>
          <button
            className="md:hidden text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
            aria-controls="sidebar-content"
          >
            ☰
          </button>
        </div>

        <div
          id="sidebar-content"
          className={`${menuOpen ? 'block' : 'hidden'} md:flex md:flex-col md:h-full`}
        >
          <ul className="flex flex-col gap-2 px-2">
            {sections.map((section) => (
              <li key={section.id} className="font-pixel">
                <button
                  onClick={() => onLinkClick(section.id)}
                  className="group flex items-center gap-3 px-5 py-3 rounded-xl font-semibold text-md transition-all duration-300 bg-zinc-100 border border-yellow-200 text-zinc-800 hover:bg-yellow-100 focus-visible:bg-yellow-100 hover:scale-105 focus-visible:scale-105 shadow-md hover:shadow-xl outline-none w-full text-left font-pixel"
                >
                  <span className="transition-transform duration-300 group-hover:rotate-12 group-focus:rotate-12 text-2xl">{section.icon}</span>
                  <span className="tracking-wide">{section.label}</span>
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-6 md:mt-auto mb-4 md:mb-6 flex justify-center">
            <div className="flex gap-6">
              <a
                href="https://www.linkedin.com/in/adrian-cameselle/"
                target="_blank"
                rel="noopener noreferrer"
                className="group text-2xl text-white hover:text-white focus:text-white transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <FontAwesomeIcon
                  icon={faLinkedin}
                  className="text-white transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-12 group-focus:scale-125 group-focus:-rotate-12"
                />
              </a>
              <a
                href="https://github.com/eryalito"
                target="_blank"
                rel="noopener noreferrer"
                className="group text-2xl text-white hover:text-white focus:text-white transition-colors duration-200"
                aria-label="GitHub"
              >
                <FontAwesomeIcon
                  icon={faGithub}
                  className="text-white transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-12 group-focus:scale-125 group-focus:-rotate-12"
                />
              </a>
              <a
                href="mailto:eryalito@gmail.com"
                className="group text-2xl text-white hover:text-white focus:text-white transition-colors duration-200"
                aria-label="Email"
              >
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="text-white transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-12 group-focus:scale-125 group-focus:-rotate-12"
                  style={{ color: 'white' }}
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
