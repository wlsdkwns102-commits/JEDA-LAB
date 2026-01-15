import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/' + id);
      return;
    }
    const element = document.getElementById(id.replace('#', ''));
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white/95 backdrop-blur-md py-4 border-b border-zinc-100' : 'bg-transparent py-8'}`}>
      <div className="max-w-[1800px] mx-auto px-6 sm:px-12 flex items-center justify-between">
        <Link to="/" className="text-xl font-serif font-black tracking-tighter editorial-spacing">JDEA_LAB</Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-12 text-[10px] font-bold tracking-[0.2em] uppercase text-zinc-400">
          <button onClick={() => scrollToSection('#work')} className="hover:text-black transition">Work</button>
          <button onClick={() => scrollToSection('#about')} className="hover:text-black transition">About</button>
          <button onClick={() => scrollToSection('#contact')} className="hover:text-black transition">Contact</button>
        </div>

        <div className="flex items-center space-x-8">
          <button 
            onClick={() => scrollToSection('#contact')} 
            className="hidden sm:block text-[10px] font-bold uppercase tracking-[0.2em] border-b border-black pb-1 hover:text-zinc-400 hover:border-zinc-400 transition"
          >
            Inquiry
          </button>
          
          <button 
            onClick={toggleMenu}
            className="flex flex-col justify-center items-end space-y-1 w-6 h-6 focus:outline-none z-50 relative"
          >
            <span className={`block h-px bg-black transition-all duration-500 ${isMenuOpen ? 'w-6 rotate-45 translate-y-1' : 'w-6'}`}></span>
            <span className={`block h-px bg-black transition-all duration-500 ${isMenuOpen ? 'opacity-0' : 'w-4'}`}></span>
            <span className={`block h-px bg-black transition-all duration-500 ${isMenuOpen ? 'w-6 -rotate-45 -translate-y-1' : 'w-2'}`}></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-white z-40 transition-all duration-700 ease-in-out ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="flex flex-col h-full justify-center px-12 sm:px-24 space-y-4">
          <button onClick={() => scrollToSection('#work')} className="text-6xl sm:text-8xl font-serif font-bold text-left hover:italic transition-all duration-500">Work</button>
          <button onClick={() => scrollToSection('#about')} className="text-6xl sm:text-8xl font-serif font-bold text-left hover:italic transition-all duration-500">About</button>
          <button onClick={() => scrollToSection('#contact')} className="text-6xl sm:text-8xl font-serif font-bold text-left hover:italic transition-all duration-500">Contact</button>
          <div className="pt-20">
             <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-300 mb-4">Direct Connection</p>
             <p className="text-xl font-serif italic">hello@jdealab.design</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-white py-32 border-t border-zinc-100">
      <div className="max-w-[1800px] mx-auto px-6 sm:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          <div className="lg:col-span-6 space-y-12">
            <h3 className="text-4xl font-serif font-black italic editorial-spacing">JDEA_LAB</h3>
            <p className="text-zinc-500 text-lg font-light leading-relaxed max-w-md">
              우리는 디자인이 비즈니스의 복잡함을 해결하는 가장 강력한 언어라고 믿습니다.
            </p>
            <div className="flex space-x-8 text-[10px] font-bold uppercase tracking-widest">
                <a href="#" className="hover:text-zinc-400 transition">Instagram</a>
                <a href="#" className="hover:text-zinc-400 transition">Behance</a>
                <a href="#" className="hover:text-zinc-400 transition">LinkedIn</a>
            </div>
          </div>
          
          <div className="lg:col-span-3 space-y-8">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-300">Office</h4>
            <p className="text-sm leading-loose">
              Seoul, Republic of Korea<br />
              Gangnam-gu, Teheran-ro 521<br />
              T. +82 2 1234 5678
            </p>
          </div>

          <div className="lg:col-span-3 space-y-8">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-300">Quick Path</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="hover:underline">Top of page</button></li>
              <li><Link to="/admin" className="hover:underline">Studio Admin</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-40 pt-12 border-t border-zinc-50 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-300">© 2024 JDEA LAB. ALL RIGHTS RESERVED.</p>
          <div className="flex space-x-12 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-300">
            <a href="#" className="hover:text-black">Privacy Policy</a>
            <a href="#" className="hover:text-black">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen selection:bg-black selection:text-white">
      <Navbar />
      <main className="fade-in pt-0">
        {children}
      </main>
      <Footer />
    </div>
  );
};