
export const Footer = () => {
  return (
    <footer className="bg-black py-16 px-4 border-t border-white/10 relative overflow-hidden">
       {/* Tech background graphic */}
       <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
       <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-primary/5 rounded-full blur-[80px]"></div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
        <div className="flex flex-col items-center md:items-start gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-sm rotate-45 flex items-center justify-center shadow-glow">
              <div className="w-4 h-4 bg-black rounded-sm"></div>
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-bold text-xl tracking-wider font-mono text-white">MICHIGAN</span>
              <span className="text-xs text-primary tracking-[0.3em] font-bold">ALGORITHMIC TRADER</span>
            </div>
          </div>
          <p className="text-muted text-xs font-mono max-w-xs text-center md:text-left">
            UNIVERSITY OF MICHIGAN'S QUANT CLUB. <br/>
            EST. 2025 // GO BLUE
          </p>
        </div>
        
        <div className="flex gap-12 font-mono text-xs tracking-wider">
          <a href="#" className="text-muted hover:text-primary transition-colors uppercase relative group">
            Instagram
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary transition-all group-hover:w-full"></span>
          </a>
          <a href="https://discord.gg/83J9ZRUKB6" className="text-muted hover:text-primary transition-colors uppercase relative group">
            Discord
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary transition-all group-hover:w-full"></span>
          </a>
        </div>

        <div className="text-muted text-xs text-center md:text-right font-mono">
          <p>&copy; {new Date().getFullYear()} Michigan Algorithmic Trader</p>
          <p className="opacity-50">UNIVERSITY OF MICHIGAN</p>
        </div>
      </div>
    </footer>
  );
};
