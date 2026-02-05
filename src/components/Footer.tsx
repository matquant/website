
export const Footer = () => {
  return (
    <footer className="bg-black py-16 px-4 border-t border-white/10 relative overflow-hidden">
       {/* Tech background graphic */}
       <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
       <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-primary/5 rounded-full blur-[80px]"></div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
        <div className="flex flex-col items-center md:items-start gap-4">
          <div className="flex items-center gap-3">
            <img src="/MainLogo.png" alt="Michigan Algorithmic Traders" className="h-12 w-12 object-contain" />
          </div>
          <p className="text-muted text-xs font-mono max-w-xs text-center md:text-left">
            QUANT CLUB @ U-M <br/>
            EST. 2025
          </p>
        </div>
        
        <div className="flex gap-12 font-mono text-xs tracking-wider">
          {/*<a href="#" className="text-muted hover:text-primary transition-colors uppercase relative group">*/}
          {/*  Instagram*/}
          {/*  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary transition-all group-hover:w-full"></span>*/}
          {/*</a>*/}
          <a href="https://discord.gg/83J9ZRUKB6" className="text-muted hover:text-primary transition-colors uppercase relative group">
            Discord
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary transition-all group-hover:w-full"></span>
          </a>
        </div>

        <div className="text-muted text-xs text-center md:text-right font-mono">
          <p>&copy; {new Date().getFullYear()} Michigan Algorithmic Traders</p>
          <p className="opacity-50">made with {"<"}3</p>
        </div>
      </div>
    </footer>
  );
};
