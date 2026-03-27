import { useMemo } from 'react';

export const BNNChart = () => {
  const width = 800;
  const height = 400;
  const padding = 40;

  // Generate some synthetic data for the chart
  const data = useMemo(() => {
    const points = 50;
    const result = [];
    for (let i = 0; i <= points; i++) {
      const x = (i / points) * 10;
      const baseMean = Math.sin(x) * 100 + 200;
      // Increase uncertainty as x increases to show "aleatoric/epistemic" uncertainty
      const uncertainty = 20 + Math.pow(x, 1.5) * 5;
      
      // Generate some random samples for the ensemble look
      const samples = Array.from({ length: 5 }, () => 
        baseMean + (Math.random() - 0.5) * uncertainty * 1.5
      );

      result.push({ x: (i / points) * (width - 2 * padding) + padding, y: baseMean, uncertainty, samples });
    }
    return result;
  }, [width, height, padding]);

  const areaPoints = useMemo(() => {
    const top = data.map(d => `${d.x},${d.y - d.uncertainty}`).join(' ');
    const bottom = [...data].reverse().map(d => `${d.x},${d.y + d.uncertainty}`).join(' ');
    return `${top} ${bottom}`;
  }, [data]);

  const meanPath = useMemo(() => {
    return `M ${data.map(d => `${d.x},${d.y}`).join(' L ')}`;
  }, [data]);

  const samplePaths = useMemo(() => {
    return Array.from({ length: 5 }, (_, i) => {
      return `M ${data.map(d => `${d.x},${d.samples[i]}`).join(' L ')}`;
    });
  }, [data]);

  return (
    <div className="w-full h-full bg-surface border border-white/5 relative overflow-hidden group">
      <div className="absolute top-4 left-4 font-mono text-[10px] text-muted uppercase tracking-widest z-10 border-l border-primary/40 pl-3">
        Predictive Distribution // BNN
      </div>
      
      <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid slice" className="w-full h-full">
        {/* Grid Lines */}
        <g stroke="white" strokeWidth="0.5" strokeOpacity="0.03">
          {Array.from({ length: 10 }).map((_, i) => (
            <line key={`v-${i}`} x1={(width / 10) * i} y1="0" x2={(width / 10) * i} y2={height} />
          ))}
          {Array.from({ length: 10 }).map((_, i) => (
            <line key={`h-${i}`} x1="0" y1={(height / 10) * i} x2={width} y2={(height / 10) * i} />
          ))}
        </g>

        {/* Uncertainty Area */}
        <polygon
          points={areaPoints}
          fill="currentColor"
          className="text-primary/5"
        />

        {/* Sampled Paths (the 'ensemble') */}
        {samplePaths.map((path, i) => (
          <path
            key={i}
            d={path}
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            className="text-primary/10"
          />
        ))}

        {/* Mean Prediction Path */}
        <path
          d={meanPath}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-primary"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Data points (simulated) */}
        {data.filter((_, i) => i % 5 === 0).map((d, i) => (
          <circle
            key={i}
            cx={d.x}
            cy={d.y + (Math.random() - 0.5) * 10}
            r="2"
            className="fill-white/20"
          />
        ))}

        {/* X and Y labels (minimal) */}
        <text x={padding} y={height - 10} className="fill-muted font-mono text-[9px] uppercase tracking-widest">Time Steps (T)</text>
        <text x={10} y={height / 2} transform={`rotate(-90 10 ${height / 2})`} className="fill-muted font-mono text-[9px] uppercase tracking-widest">Density (P)</text>
      </svg>

      {/* Legend / Info */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-2 font-mono text-[9px] uppercase tracking-wider">
        <div className="flex items-center gap-3">
          <div className="w-4 h-0.5 bg-primary"></div>
          <span className="text-muted">Mean Estimate</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-4 h-3 bg-primary/10"></div>
          <span className="text-muted">95% Confidence</span>
        </div>
      </div>
    </div>
  );
};
