import { useState } from 'react';
import { Menu, X, Dumbbell } from 'lucide-react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { label: 'Home', href: '#home' },
    { label: 'Services', href: '#services' },
    { label: 'About', href: '#about' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 bg-black/95 backdrop-blur-sm z-50 border-b border-white/10">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2 text-white">
            <Dumbbell className="w-8 h-8 text-orange-500" />
            <span className="font-bold text-xl">FITCOACH</span>
          </a>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="text-white/80 hover:text-orange-500 transition-colors"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <button className="hidden md:block bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full transition-colors">
            Get Started
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white p-2"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-2">
            <ul className="flex flex-col gap-4">
              {menuItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-white/80 hover:text-orange-500 transition-colors block py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full transition-colors w-full">
                  Get Started
                </button>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
