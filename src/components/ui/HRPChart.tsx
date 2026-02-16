import { useMemo } from 'react';

export const HRPChart = () => {
  const size = 600;
  const padding = 60;
  const gridSize = 12; // 12 assets
  const cellSize = (size - padding * 2) / gridSize;

  const assets = ['NVDA', 'AMD', 'AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA', 'META', 'NFLX', 'AVGO', 'QCOM', 'INTC'];

  // Simulate a clustered correlation matrix
  const data = useMemo(() => {
    const matrix = [];
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        // Higher correlation for assets near each other (simulating clusters)
        const distance = Math.abs(i - j);
        const baseCorr = 1 - (distance / gridSize);
        const noise = (Math.random() - 0.5) * 0.2;
        matrix.push({
          x: i,
          y: j,
          value: i === j ? 1 : Math.max(0, Math.min(1, baseCorr + noise))
        });
      }
    }
    return matrix;
  }, []);

  return (
    <div className="w-full h-full bg-black/60 relative overflow-hidden group">
      <div className="absolute top-2 left-3 font-mono text-[8px] text-primary/60 uppercase tracking-[0.4em] z-10">
        // HRP_QUASI_DIAGONALIZATION
      </div>

      <svg viewBox={`0 0 ${size} ${size}`} preserveAspectRatio="xMidYMid slice" className="w-full h-full scale-105">
        <defs>
          <linearGradient id="heatGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFCB05" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#00274C" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#030305" stopOpacity="1" />
          </linearGradient>
          
          {/* Glow filter */}
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Dendrogram (Tree structure on top) */}
        <g transform={`translate(${padding}, 10)`} className="stroke-primary/30" strokeWidth="1.5" fill="none">
          <path d={`M ${cellSize/2},40 L ${cellSize/2},20 L ${cellSize * 2.5},20 L ${cellSize * 2.5},40`} />
          <path d={`M ${cellSize * 3.5},40 L ${cellSize * 3.5},20 L ${cellSize * 5.5},20 L ${cellSize * 5.5},40`} />
          <path d={`M ${cellSize * 1.5},20 L ${cellSize * 1.5},5 L ${cellSize * 4.5},5 L ${cellSize * 4.5},20`} />
          <circle cx={cellSize * 1.5} cy={20} r="2" fill="#FFCB05" />
          <circle cx={cellSize * 4.5} cy={20} r="2" fill="#FFCB05" />
          <circle cx={cellSize * 3} cy={5} r="3" className="fill-primary animate-pulse" />
        </g>

        {/* Heatmap Grid */}
        <g transform={`translate(${padding}, ${padding})`}>
          {data.map((cell, i) => (
            <rect
              key={i}
              x={cell.x * cellSize}
              y={cell.y * cellSize}
              width={cellSize - 1}
              height={cellSize - 1}
              fill={cell.value > 0.8 ? '#FFCB05' : cell.value > 0.5 ? '#003B72' : '#0d0d10'}
              fillOpacity={cell.value}
              className="transition-all duration-500 hover:fill-white"
            >
              <title>{`Corr: ${cell.value.toFixed(2)}`}</title>
            </rect>
          ))}

          {/* Asset Labels (X) */}
          {assets.map((asset, i) => (
            <text
              key={`x-${i}`}
              x={i * cellSize + cellSize / 2}
              y={-10}
              textAnchor="middle"
              className="fill-muted font-mono text-[8px] uppercase tracking-tighter"
              transform={`rotate(-45 ${i * cellSize + cellSize / 2}, -10)`}
            >
              {asset}
            </text>
          ))}

          {/* Asset Labels (Y) */}
          {assets.map((asset, i) => (
            <text
              key={`y-${i}`}
              x={-10}
              y={i * cellSize + cellSize / 2 + 3}
              textAnchor="end"
              className="fill-muted font-mono text-[8px] uppercase tracking-tighter"
            >
              {asset}
            </text>
          ))}
        </g>

        {/* Risk Allocation Bar Chart (Bottom) */}
        <g transform={`translate(${padding}, ${size - 40})`}>
          {assets.map((_, i) => (
            <rect
              key={`bar-${i}`}
              x={i * cellSize}
              y={-(Math.random() * 30 + 10)}
              width={cellSize - 4}
              height={40}
              className="fill-primary/20 stroke-primary/40"
              strokeWidth="0.5"
            />
          ))}
          <text x={-padding + 10} y={-10} className="fill-primary font-mono text-[7px] tracking-[0.2em] uppercase">RISK_WT</text>
        </g>
      </svg>

      {/* Legend & Stats Overlay */}
      <div className="absolute bottom-6 right-6 flex flex-col gap-1 text-right">
        <div className="font-mono text-[10px] text-primary">SIGMA_TOTAL: 0.142</div>
        <div className="font-mono text-[8px] text-muted uppercase tracking-widest">Confidence: 98.4%</div>
      </div>
      
      {/* Decorative Scanline */}
      <div className="absolute inset-0 pointer-events-none bg-scan-line opacity-10"></div>
    </div>
  );
};
