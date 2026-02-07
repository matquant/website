import { useState, useEffect } from 'react';
import { Menu, X, BookOpen } from 'lucide-react';
import { navLinks } from '../data/content';
import { Button } from './ui/Button';

export const Navbar = ({ onViewResearch, onGoHome }: { onViewResearch: () => void, onGoHome: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
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
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed w-full top-[40px] z-50 transition-all duration-300 ${isScrolled ? 'bg-background/80 backdrop-blur-lg border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center">
        <a 
          href="#" 
          onClick={(e) => {
            e.preventDefault();
            onGoHome();
          }}
          className="flex items-center gap-3 group"
        >
          <img src="/MainLogo.png" alt="Michigan Algorithmic Traders" className="h-10 w-10 object-contain" />
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.name, link.href)}
              className="px-4 py-2 text-xs font-mono font-medium text-muted hover:text-primary transition-colors uppercase tracking-widest relative group overflow-hidden"
            >
              <span className="relative z-10">{link.name}</span>
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </a>
          ))}
          <div className="ml-6 flex items-center gap-6">
             <Button onClick={onViewResearch} variant="primary" size="sm">
               Research <BookOpen size={14} className="ml-2" />
             </Button>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white hover:text-primary transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-background/95 backdrop-blur-xl border-b border-white/10 py-4 px-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-sm font-mono font-medium text-white py-3 border-b border-white/5 hover:text-primary hover:border-primary/30 transition-all pl-2"
              onClick={(e) => handleLinkClick(e, link.name, link.href)}
            >
              {link.name}
            </a>
          ))}
          <div className="flex flex-col gap-4 mt-2">
            <Button onClick={() => { setMobileMenuOpen(false); onViewResearch(); }} fullWidth variant="primary">Research</Button>
          </div>
        </div>
      )}
    </nav>
  );
};
