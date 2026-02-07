import React, { useState, useEffect, useRef } from 'react';
import { TradingViewSymbolInfo, TradingViewTechnicalAnalysis } from './TerminalWidgets';

const COMMANDS = {
  help: 'Available commands: about, faq, apply, clear, view [ticker]',
  about: 'NAVIGATING TO ABOUT SECTION...',
  faq: 'OPENING FAQ PROTOCOL...',
  apply: 'INITIATING RECRUITMENT FORM...',
  clear: '',
};

type HistoryItem = {
  type: 'text' | 'widget';
  content: string | React.ReactNode;
  lineColor?: string;
};

export const Terminal = () => {
  const [history, setHistory] = useState<HistoryItem[]>([
    { type: 'text', content: 'Type or click a protocol below to initialize.' }
  ]);
  const [input, setInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const SUGGESTIONS = ['NVDA', 'AAPL', 'TSLA', 'AMZN', 'MSFT', 'META', 'GOOGL'];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    if (input.toLowerCase().startsWith('view')) {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [input]);

  const executeCommand = (cmdStr: string) => {
    const fullCmd = cmdStr.toLowerCase().trim();
    const [cmd, ...args] = fullCmd.split(' ');
    
    if (cmd === 'clear') {
      setHistory([]);
    } else if (cmd === 'about') {
      setHistory(prev => [...prev, 
        { type: 'text', content: `>> ${cmdStr}`, lineColor: 'text-primary' },
        { type: 'text', content: 'NAVIGATING TO ABOUT SECTION...', lineColor: 'text-white/70' }
      ]);
      setTimeout(() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }), 500);
    } else if (cmd === 'faq') {
      setHistory(prev => [...prev, 
        { type: 'text', content: `>> ${cmdStr}`, lineColor: 'text-primary' },
        { type: 'text', content: 'OPENING FAQ PROTOCOL...', lineColor: 'text-white/70' }
      ]);
      setTimeout(() => document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' }), 500);
    } else if (cmd === 'view' && args.length > 0) {
      const ticker = args[0].toUpperCase();
      setHistory(prev => [...prev, 
        { type: 'text', content: `>> ${cmdStr}`, lineColor: 'text-primary' },
        { type: 'text', content: `FETCHING MARKET DATA FOR ${ticker}...`, lineColor: 'text-white/70' },
        { type: 'widget', content: <TradingViewSymbolInfo symbol={ticker} /> },
        { type: 'widget', content: <TradingViewTechnicalAnalysis symbol={ticker} /> }
      ]);
      setShowSuggestions(false);
    } else if (cmd in COMMANDS) {
      setHistory(prev => [...prev, 
        { type: 'text', content: `>> ${cmdStr}`, lineColor: 'text-primary' },
        { type: 'text', content: COMMANDS[cmd as keyof typeof COMMANDS] }
      ]);
    } else if (cmd !== '') {
      setHistory(prev => [...prev, 
        { type: 'text', content: `>> ${cmdStr}`, lineColor: 'text-primary' },
        { type: 'text', content: `ERR: INVALID COMMAND "${cmd}"`, lineColor: 'text-[#ff3b30]' }
      ]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeCommand(input);
    setInput('');
  };

  return (
    <div className="relative group">
      {/* Outer Glow */}
      <div className="absolute -inset-0.5 bg-primary/20 rounded-lg blur opacity-50 group-hover:opacity-100 transition duration-1000"></div>
      
      <div 
        className="relative bg-[#050505] border border-white/10 rounded-lg shadow-2xl h-[450px] flex flex-col font-mono text-sm overflow-hidden cursor-text"
        onClick={() => inputRef.current?.focus()}
      >
        {/* Terminal Header */}
        <div className="bg-white/5 border-b border-white/10 px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-primary font-bold tracking-tighter">MAT</span>
            <span className="text-muted text-[10px]">RESEARCH_CORE_v4</span>
          </div>
          <div className="flex gap-1.5">
             <div className="w-2.5 h-2.5 rounded-full bg-white/10"></div>
             <div className="w-2.5 h-2.5 rounded-full bg-white/10"></div>
             <div className="w-2.5 h-2.5 rounded-full bg-white/10"></div>
          </div>
        </div>

        {/* Terminal Body */}
        <div ref={scrollRef} className="flex-grow p-6 overflow-y-auto space-y-2 scrollbar-hide relative">
          {history.map((item, i) => (
            <div key={i} className={item.lineColor || 'text-white/90'}>
              {item.content}
            </div>
          ))}

          {/* Clickable Quick Protocols */}
          <div className="flex flex-wrap gap-2 pt-4">
            {['ABOUT', 'FAQ', 'VIEW', 'CLEAR'].map((label) => (
              <button
                key={label}
                onClick={(e) => {
                  e.stopPropagation();
                  if (label === 'VIEW') {
                    setInput('view ');
                    inputRef.current?.focus();
                  } else {
                    executeCommand(label);
                  }
                }}
                className="px-3 py-1 bg-white/5 border border-white/10 rounded-md text-[10px] text-primary hover:bg-primary/20 hover:border-primary/50 transition-all uppercase font-bold tracking-wider"
              >
                {label}
              </button>
            ))}
          </div>

          {/* Suggestions Dropdown */}
          {showSuggestions && (
            <div className="absolute bottom-16 left-6 bg-surface border border-white/10 rounded-md shadow-xl overflow-hidden z-20 w-48 animate-in fade-in slide-in-from-bottom-2">
              <div className="px-3 py-2 text-[10px] text-muted border-b border-white/5 font-bold uppercase tracking-widest">Suggested Tickers</div>
              {SUGGESTIONS.map(ticker => (
                <button
                  key={ticker}
                  onClick={(e) => {
                    e.stopPropagation();
                    const newCmd = `view ${ticker}`;
                    setInput(newCmd);
                    executeCommand(newCmd);
                    setInput('');
                  }}
                  className="w-full text-left px-3 py-2 text-xs text-white hover:bg-primary/10 hover:text-primary transition-colors flex justify-between items-center"
                >
                  {ticker} <span className="text-[10px] opacity-30 tracking-tighter">SELECT</span>
                </button>
              ))}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex items-center gap-2 pt-2">
            <span className="text-primary font-bold">{">>"}</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="bg-transparent border-none outline-none flex-grow text-primary caret-primary"
              autoFocus
            />
          </form>
        </div>
      </div>
    </div>
  );
};
