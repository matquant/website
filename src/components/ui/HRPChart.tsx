import { useMemo } from 'react';

export const HRPChart = () => {
  const width = 600;
  const height = 400;
  const padding = 50;

  // Simple dendrogram structure
  const treeLines = useMemo(() => {
    const lines = [];
    const bottomY = height - padding;
    const topY = padding;
    const centerX = width / 2;
    
    // Root to two main clusters
    lines.push({ x1: centerX, y1: topY, x2: centerX - 150, y2: topY + 80 });
    lines.push({ x1: centerX, y1: topY, x2: centerX + 150, y2: topY + 80 });
    
    // Left cluster bisection
    lines.push({ x1: centerX - 150, y1: topY + 80, x2: centerX - 220, y2: topY + 180 });
    lines.push({ x1: centerX - 150, y1: topY + 80, x2: centerX - 80, y2: topY + 180 });
    
    // Right cluster bisection
    lines.push({ x1: centerX + 150, y1: topY + 80, x2: centerX + 80, y2: topY + 180 });
    lines.push({ x1: centerX + 150, y1: topY + 80, x2: centerX + 220, y2: topY + 180 });
    
    // Leaf connections (simplified)
    const leafs = [-250, -190, -110, -50, 50, 110, 190, 250];
    leafs.forEach((offset, i) => {
      const parentX = i < 4 ? (i < 2 ? centerX - 220 : centerX - 80) : (i < 6 ? centerX + 80 : centerX + 220);
      const parentY = topY + 180;
      lines.push({ x1: parentX, y1: parentY, x2: centerX + offset, y2: bottomY });
    });

    return lines;
  }, [width, height]);

  return (
    <div className="w-full h-full bg-black/40 relative overflow-hidden flex items-center justify-center">
      <div className="absolute top-3 left-4 font-mono text-[8px] text-primary/40 uppercase tracking-[0.4em] z-10">
        // HRP_RECURSIVE_BISECTION_TREE
      </div>

      <svg viewBox={`0 0 ${width} ${height}`} className="w-[85%] h-[85%] overflow-visible">
        {/* Glow effect for the tree */}
        <defs>
          <filter id="treeGlow">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Tree Branches */}
        <g filter="url(#treeGlow)">
          {treeLines.map((line, i) => (
            <line
              key={i}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              className="stroke-primary"
              strokeWidth="2"
              strokeLinecap="round"
              opacity={0.6}
            />
          ))}
        </g>

        {/* Nodes */}
        <g>
          {treeLines.map((line, i) => (
            <circle
              key={`node-start-${i}`}
              cx={line.x1}
              cy={line.y1}
              r="3"
              className="fill-white"
            />
          ))}
          {/* Leaf nodes */}
          {[-250, -190, -110, -50, 50, 110, 190, 250].map((offset, i) => (
            <circle
              key={`leaf-${i}`}
              cx={width / 2 + offset}
              cy={height - padding}
              r="4"
              className="fill-primary"
            />
          ))}
        </g>

        {/* Decorative Grid Lines (faint) */}
        <g opacity="0.05" stroke="white" strokeWidth="1">
          {Array.from({ length: 5 }).map((_, i) => (
            <line key={i} x1="0" y1={(height / 4) * i} x2={width} y2={(height / 4) * i} />
          ))}
        </g>
      </svg>
      
      {/* Legend / Status */}
      <div className="absolute bottom-4 right-6 text-right font-mono text-[8px] text-muted space-y-1">
        <div>CLUSTERING: WARD_LINKAGE</div>
        <div>STABILITY_INDEX: 0.94</div>
      </div>
    </div>
  );
};
