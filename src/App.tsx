import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Navbar from './components/Navbar';
import BlogButton from './components/BlogButton';
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
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
        </Routes>
      </main>
      <BlogButton />
      <IterativeCat />
    </div>
  );
}

export default App;