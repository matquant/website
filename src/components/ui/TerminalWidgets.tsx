import React, { useEffect, useRef } from 'react';

export const TradingViewSymbolInfo = ({ symbol }: { symbol: string }) => {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (container.current) {
      container.current.innerHTML = '';
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-symbol-info.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = JSON.stringify({
        "symbol": symbol.includes(':') ? symbol : `NASDAQ:${symbol}`,
        "width": "100%",
        "locale": "en",
        "colorTheme": "dark",
        "isTransparent": true
      });
      container.current.appendChild(script);
    }
  }, [symbol]);

  return (
    <div className="my-4 border border-white/10 rounded bg-white/5 p-2 overflow-hidden">
      <div className="tradingview-widget-container" ref={container}>
        <div className="tradingview-widget-container__widget"></div>
      </div>
    </div>
  );
};

export const TradingViewTechnicalAnalysis = ({ symbol }: { symbol: string }) => {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (container.current) {
      container.current.innerHTML = '';
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = JSON.stringify({
        "interval": "1D",
        "width": "100%",
        "isTransparent": true,
        "height": 300,
        "symbol": symbol.includes(':') ? symbol : `NASDAQ:${symbol}`,
        "showIntervalTabs": true,
        "displayMode": "single",
        "locale": "en",
        "colorTheme": "dark"
      });
      container.current.appendChild(script);
    }
  }, [symbol]);

  return (
    <div className="my-4 border border-white/10 rounded bg-white/5 p-2 overflow-hidden">
      <div className="tradingview-widget-container" ref={container}>
        <div className="tradingview-widget-container__widget"></div>
      </div>
    </div>
  );
};
