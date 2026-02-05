import { useState, useEffect } from 'react';
import { Menu, X, ChevronRight } from 'lucide-react';
import { navLinks } from '../data/content';
import { Button } from './ui/Button';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-background/80 backdrop-blur-lg border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center">
        <a href="#" className="flex items-center gap-3 group">
          <img src="/MainLogo.png" alt="Michigan Algorithmic Traders" className="h-10 w-10 object-contain" />
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="px-4 py-2 text-xs font-mono font-medium text-muted hover:text-primary transition-colors uppercase tracking-widest relative group overflow-hidden"
            >
              <span className="relative z-10">{link.name}</span>
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </a>
          ))}
          <div className="ml-6 flex items-center gap-4">
             <a href="https://discord.gg/83J9ZRUKB6" target="_blank" rel="noopener noreferrer">
               <Button variant="primary" size="sm">
                 Join Now <ChevronRight size={14} />
               </Button>
             </a>
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
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <a href="https://discord.gg/83J9ZRUKB6" target="_blank" rel="noopener noreferrer" className="w-full">
            <Button fullWidth variant="primary">Join Now</Button>
          </a>
        </div>
      )}
    </nav>
  );
};
