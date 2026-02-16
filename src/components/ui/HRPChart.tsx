import { useMemo } from 'react';

export const HRPChart = () => {
  const width = 800;
  const height = 500;
  
  // Clean, high-impact dendrogram data
  const lines = useMemo(() => {
    const l = [];
    const centerX = width / 2;
    const top = 50;
    const bottom = height - 50;
    
    // Main branches (Level 0 -> Level 1)
    l.push({ x1: centerX - 250, y1: top, x2: centerX + 250, y2: top }); // horizontal
    l.push({ x1: centerX - 250, y1: top, x2: centerX - 250, y2: top + 100 }); // left vertical
    l.push({ x1: centerX + 250, y1: top, x2: centerX + 250, y2: top + 100 }); // right vertical
    
    // Level 1 -> Level 2 (Left)
    l.push({ x1: centerX - 350, y1: top + 100, x2: centerX - 150, y2: top + 100 });
    l.push({ x1: centerX - 350, y1: top + 100, x2: centerX - 350, y2: top + 200 });
    l.push({ x1: centerX - 150, y1: top + 100, x2: centerX - 150, y2: top + 200 });

    // Level 1 -> Level 2 (Right)
    l.push({ x1: centerX + 150, y1: top + 100, x2: centerX + 350, y2: top + 100 });
    l.push({ x1: centerX + 150, y1: top + 100, x2: centerX + 150, y2: top + 200 });
    l.push({ x1: centerX + 350, y1: top + 100, x2: centerX + 350, y2: top + 200 });

    // Level 2 -> Leafs
    const leafParents = [centerX - 400, centerX - 300, centerX - 200, centerX - 100, centerX + 100, centerX + 200, centerX + 300, centerX + 400];
    const leafTopY = top + 200;
    
    [centerX-350, centerX-150, centerX+150, centerX+350].forEach(px => {
        l.push({ x1: px - 40, y1: leafTopY, x2: px + 40, y2: leafTopY });
        l.push({ x1: px - 40, y1: leafTopY, x2: px - 40, y2: bottom });
        l.push({ x1: px + 40, y1: leafTopY, x2: px + 40, y2: bottom });
    });

    return l;
  }, []);

  return (
    <div className="w-full h-full bg-[#050505] relative overflow-hidden flex items-center justify-center border border-white/5">
      <div className="absolute top-4 left-4 font-mono text-[10px] text-primary/80 uppercase tracking-[0.5em] z-10">
        // HRP_RECURSIVE_DIAGONALIZATION
      </div>

      <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid slice" className="w-full h-full scale-100 p-8">
        <g stroke="currentColor" strokeWidth="3" fill="none" className="text-primary">
          {lines.map((line, i) => (
            <line key={i} x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2} strokeLinecap="square" />
          ))}
        </g>

        {/* Junction points */}
        <g className="fill-white">
            <circle cx={width/2} cy={50} r="5" />
            <circle cx={width/2-250} cy={150} r="4" />
            <circle cx={width/2+250} cy={150} r="4" />
        </g>

        {/* Assets (Leafs) */}
        <g className="fill-primary">
            {[width/2-390, width/2-310, width/2-190, width/2-110, width/2+110, width/2+190, width/2+310, width/2+390].map((x, i) => (
                <rect key={i} x={x-5} y={height-60} width="10" height="20" rx="2" className="animate-pulse" style={{ animationDelay: `${i * 150}ms` }} />
            ))}
        </g>

        {/* Faint Grid */}
        <path d={`M 0,${height-50} L ${width},${height-50}`} stroke="white" strokeWidth="1" strokeOpacity="0.1" strokeDasharray="5,5" />
      </svg>

      <div className="absolute bottom-4 right-6 font-mono text-[9px] text-primary/40 uppercase tracking-widest">
        QUASI_DIAGONAL_ALGORITHM_V4
      </div>
    </div>
  );
};
