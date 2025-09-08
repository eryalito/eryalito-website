import './App.css';
import AboutSection from './components/AboutSection';
import ProjectsSection from './components/ProjectsSection';
import SkillsSection from './components/SkillsSection';
import ContactSection from './components/ContactSection';
import Navbar from './components/Navbar';
import IterativeCat from './components/IterativeCat';

function App() {
  const handleNavClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="app-container flex flex-col md:flex-row min-h-screen">
      <Navbar handleNavClick={handleNavClick} />
      <main className="main-content flex-1 w-full">
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
        <IterativeCat />
        {/* <footer className="footer">© {new Date().getFullYear()} Eryalito</footer> */}
      </main>
    </div>
  );
}

export default App;
