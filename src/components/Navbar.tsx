import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Dumbbell } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { Editable } from './editor/Editable';

export function Navbar() {
  const { images, content, isEditMode } = useContent();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'About', href: '#about' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    if (location.pathname !== '/') return;
    e.preventDefault();
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-zinc-950/90 backdrop-blur-md border-b border-white/10 py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        
        {/* LOGO & BRAND SECTION */}
        <Link to="/" className="flex items-center gap-3 group">
          {/* ✅ UPDATE DI SINI: Menghapus kotak oranye */}
          <div className="flex items-center justify-center h-10 w-auto max-w-[150px] transition-transform group-hover:scale-105">
             {images['site.logo'] ? (
               // Gambar logo menyesuaikan tinggi navbar (h-10 = 40px), lebar otomatis
               <img src={images['site.logo']} alt="Logo" className="h-full w-auto object-contain" />
             ) : (
               // Ikon fallback jadi warna oranye
               <Dumbbell className="w-8 h-8 text-orange-500" />
             )}
          </div>
          <Editable 
            id="site.name" 
            as="span" 
            className="text-xl font-black text-white tracking-tighter uppercase" 
            defaultText="FITCOACH" 
          />
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleScrollTo(e, link.href)}
              className="text-sm font-medium text-white/70 hover:text-orange-500 transition-colors uppercase tracking-wider"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* CTA BUTTONS */}
        <div className="hidden md:flex items-center gap-4">
          <a 
            href="#pricing"
            onClick={(e) => handleScrollTo(e, '#pricing')}
            className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-full transition-all shadow-lg shadow-orange-500/20"
          >
            Get Started
          </a>
        </div>

        {/* MOBILE MENU TOGGLE */}
        <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-zinc-900 border-b border-white/10 p-4 flex flex-col gap-4 shadow-2xl">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleScrollTo(e, link.href)}
              className="text-white/80 hover:text-orange-500 py-2 border-b border-white/5"
            >
              {link.name}
            </a>
          ))}
          <a href="#pricing" className="text-center w-full py-3 bg-orange-500 rounded-lg text-white font-bold">
            Get Started
          </a>
        </div>
      )}
    </nav>
  );
}