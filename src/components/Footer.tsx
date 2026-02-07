
export const Footer = () => {
  return (
    <footer className="bg-black py-16 px-4 border-t border-white/10 relative overflow-hidden">
       {/* Tech background graphic */}
       <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
       
      <div className="max-w-7xl mx-auto flex flex-col gap-12 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="flex items-center gap-3">
              <img src="/MainLogo.png" alt="Michigan Algorithmic Traders" className="h-12 w-12 object-contain" />
            </div>
            <p className="text-muted text-xs font-mono max-w-xs text-center md:text-left uppercase tracking-widest">
              Michigan Algorithmic Traders // Quant Research
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-end gap-2">
            <span className="text-[10px] font-mono text-muted uppercase tracking-[0.3em] mb-2">Supported By</span>
            <a href="https://www.quantconnect.com" target="_blank" rel="noopener noreferrer" className="opacity-60 hover:opacity-100 transition-opacity">
              <img 
                src="https://cdn.quantconnect.com/web/i/about/our-purpose/cta-section/cta-logo.svg" 
                alt="QuantConnect" 
                className="h-8 brightness-0 invert" 
              />
            </a>
          </div>

          <div className="text-muted text-xs text-center md:text-right font-mono">
            <p>&copy; {new Date().getFullYear()} MAT // U-M</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
