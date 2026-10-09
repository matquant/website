import { useEffect, useRef } from 'react';

export const Ticker = () => {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Clean up previous script if any
    if (container.current) {
      container.current.innerHTML = '';
      const innerContainer = document.createElement('div');
      innerContainer.className = 'tradingview-widget-container';
      const widgetDiv = document.createElement('div');
      widgetDiv.className = 'tradingview-widget-container__widget';
      innerContainer.appendChild(widgetDiv);
      container.current.appendChild(innerContainer);

      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = JSON.stringify({
        "symbols": [
          { "description": "Microsoft", "proName": "NASDAQ:MSFT" },
          { "description": "Apple", "proName": "NASDAQ:AAPL" },
          { "description": "Nvidia", "proName": "NASDAQ:NVDA" },
          { "description": "Meta", "proName": "NASDAQ:META" },
          { "description": "Google", "proName": "NASDAQ:GOOGL" },
          { "description": "S&P 500", "proName": "FOREXCOM:SPX500" },
          { "description": "Costco", "proName": "NASDAQ:COST" },
          { "description": "Starbucks", "proName": "NASDAQ:SBUX" },
          { "description": "Coinbase", "proName": "NASDAQ:COIN" },
          { "description": "ARM Holdings", "proName": "NASDAQ:ARM" }
        ],
        "showSymbolLogo": true,
        "colorTheme": "dark",
        "isTransparent": true,
        "displayMode": "adaptive",
        "locale": "en"
      });
      innerContainer.appendChild(script);
    }
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full z-[100] h-[40px] bg-[#050505] border-b border-white/5" ref={container}>
      {/* Widget will be injected here */}
    </div>
  );
};