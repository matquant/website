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
    { type: 'text', content: 'MAT Research Terminal. Type help for commands.' }
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
        { type: 'text', content: `> ${cmdStr}`, lineColor: 'text-primary' },
        { type: 'text', content: 'Navigating to section: About', lineColor: 'text-muted' }
      ]);
      setTimeout(() => document.getElementById('about')?.scrollIntoView({ behavior: 'auto' }), 100);
    } else if (cmd === 'faq') {
      setHistory(prev => [...prev, 
        { type: 'text', content: `> ${cmdStr}`, lineColor: 'text-primary' },
        { type: 'text', content: 'Navigating to section: FAQ', lineColor: 'text-muted' }
      ]);
      setTimeout(() => document.getElementById('faq')?.scrollIntoView({ behavior: 'auto' }), 100);
    } else if (cmd === 'view' && args.length > 0) {
      const ticker = args[0].toUpperCase();
      setHistory(prev => [...prev, 
        { type: 'text', content: `> ${cmdStr}`, lineColor: 'text-primary' },
        { type: 'text', content: `Loading market data: ${ticker}`, lineColor: 'text-muted' },
        { type: 'widget', content: <TradingViewSymbolInfo symbol={ticker} /> },
        { type: 'widget', content: <TradingViewTechnicalAnalysis symbol={ticker} /> }
      ]);
      setShowSuggestions(false);
    } else if (cmd in COMMANDS) {
      setHistory(prev => [...prev, 
        { type: 'text', content: `> ${cmdStr}`, lineColor: 'text-primary' },
        { type: 'text', content: COMMANDS[cmd as keyof typeof COMMANDS] }
      ]);
    } else if (cmd !== '') {
      setHistory(prev => [...prev, 
        { type: 'text', content: `> ${cmdStr}`, lineColor: 'text-primary' },
        { type: 'text', content: `Error: Command not found: ${cmd}`, lineColor: 'text-red-500/80' }
      ]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeCommand(input);
    setInput('');
  };

  return (
    <div className="relative">
      <div 
        className="relative bg-surface border border-white/5 shadow-2xl h-[500px] flex flex-col font-mono text-xs overflow-hidden cursor-text"
        onClick={() => inputRef.current?.focus()}
      >
        {/* Terminal Header */}
        <div className="bg-background border-b border-white/5 px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-white font-bold tracking-widest text-[10px] uppercase">Research Console</span>
            <span className="text-muted text-[9px] uppercase tracking-widest">v2.4.0</span>
          </div>
          <div className="flex gap-4">
             <div className="w-1.5 h-1.5 bg-white/10"></div>
             <div className="w-1.5 h-1.5 bg-white/10"></div>
          </div>
        </div>

        {/* Terminal Body */}
        <div ref={scrollRef} className="flex-grow p-8 overflow-y-auto space-y-3 scrollbar-hide relative">
          {history.map((item, i) => (
            <div key={i} className={item.lineColor || 'text-white/80'}>
              {item.content}
            </div>
          ))}

          {/* Quick Commands */}
          <div className="flex flex-wrap gap-4 pt-6">
            {['about', 'faq', 'clear'].map((label) => (
              <button
                key={label}
                onClick={(e) => {
                  e.stopPropagation();
                  executeCommand(label);
                }}
                className="text-[10px] text-muted hover:text-primary transition-colors uppercase font-bold tracking-widest border-b border-transparent hover:border-primary"
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
