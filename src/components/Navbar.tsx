import { useState, useEffect } from 'react';
import { Menu, X, BookOpen } from 'lucide-react';
import { navLinks } from '../data/content';
import { Button } from './ui/Button';

export const Navbar = ({ onViewResearch, onGoHome }: { onViewResearch: () => void, onGoHome: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent, name: string, href: string) => {
    if (name === 'Research') {
      e.preventDefault();
      onViewResearch();
    } else if (href.startsWith('#')) {
      e.preventDefault();
      onGoHome();
      // Small timeout to allow the view to switch before scrolling
      setTimeout(() => {
        const element = document.getElementById(href.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: 'auto' }); // Remove smooth scroll for a more direct feel
        }
      }, 50);
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed w-full top-[40px] z-50 transition-colors duration-200 ${isScrolled ? 'bg-background border-b border-white/10 py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center">
        <a 
          href="#" 
          onClick={(e) => {
            e.preventDefault();
            onGoHome();
          }}
          className="flex items-center gap-4 group"
        >
          <img 
            src="/MainLogo.png" 
            alt="University of Michigan Quant - MAT Logo" 
            className="h-7 w-7 md:h-8 md:w-8 object-contain" 
          />
          <span className="text-xs md:text-sm font-mono font-bold tracking-tighter text-white">MAT // RESEARCH</span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.name, link.href)}
              className="text-xs font-mono font-medium text-muted hover:text-white transition-colors uppercase tracking-[0.2em]"
            >
              {link.name}
            </a>
          ))}
          <div className="ml-4">
             <Button onClick={onViewResearch} variant="outline" size="sm" className="h-10 px-6">
               COLLECTIVE <BookOpen size={12} className="ml-2" />
             </Button>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white hover:text-primary transition-colors p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-background border-b border-white/10 py-6 px-6 flex flex-col gap-6 shadow-2xl">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-xs font-mono font-bold text-muted uppercase tracking-[0.3em] py-2 border-b border-white/5"
              onClick={(e) => handleLinkClick(e, link.name, link.href)}
            >
              {link.name}
            </a>
          ))}
          <Button onClick={() => { setMobileMenuOpen(false); onViewResearch(); }} variant="primary" className="h-12 text-xs">
            VIEW COLLECTIVE
          </Button>
        </div>
      )}
    </nav>
  );
};
