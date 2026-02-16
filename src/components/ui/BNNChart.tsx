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
    <div className="w-full h-full bg-black/40 relative overflow-hidden group">
      <div className="absolute top-2 left-3 font-mono text-[8px] text-primary/60 uppercase tracking-widest z-10">
        // BNN_PREDICTIVE_DISTRIBUTION
      </div>
      
      <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid slice" className="w-full h-full scale-110">
        {/* Grid Lines */}
        <g stroke="white" strokeWidth="0.5" strokeOpacity="0.05">
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
          className="text-primary/10"
        />

        {/* Sampled Paths (the 'ensemble') */}
        {samplePaths.map((path, i) => (
          <path
            key={i}
            d={path}
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-primary/20"
            strokeDasharray="4 2"
          />
        ))}

        {/* Mean Prediction Path */}
        <path
          d={meanPath}
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          className="text-primary animate-pulse"
          style={{ filter: 'drop-shadow(0 0 8px rgba(var(--primary-rgb), 0.8))' }}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Data points (simulated) */}
        {data.filter((_, i) => i % 5 === 0).map((d, i) => (
          <circle
            key={i}
            cx={d.x}
            cy={d.y + (Math.random() - 0.5) * 10}
            r="3"
            className="fill-white"
          />
        ))}

        {/* X and Y labels (minimal) */}
        <text x={padding} y={height - 10} className="fill-muted font-mono text-[10px]">TIME_STEPS (T)</text>
        <text x={10} y={height / 2} transform={`rotate(-90 10 ${height / 2})`} className="fill-muted font-mono text-[10px]">PROBABILITY_DENSITY (P)</text>
      </svg>

      {/* Legend / Info */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-2 font-mono text-[10px]">
        <div className="flex items-center gap-2">
          <div className="w-3 h-1 bg-primary"></div>
          <span className="text-gray-400">MEAN_PREDICTION</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-primary/20"></div>
          <span className="text-gray-400">95%_CONFIDENCE_INTERVAL</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-[1px] bg-primary/40 border-t border-dashed border-primary/40"></div>
          <span className="text-gray-400">STOCHASTIC_SAMPLES</span>
        </div>
      </div>
    </div>
  );
};
