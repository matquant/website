import { useMemo } from 'react';

export const HRPChart = () => {
  const width = 800;
  const height = 450;
  const paddingX = 80;
  const paddingY = 60;

  // Famous HRP Dendrogram (Orthogonal lines)
  const treeLines = useMemo(() => {
    const lines: { x1: number; y1: number; x2: number; y2: number }[] = [];
    const top = paddingY;
    const bottom = height - paddingY;
    const center = width / 2;

    // Root Level
    const level1Y = top + 60;
    lines.push({ x1: center - 200, y1: top, x2: center + 200, y2: top }); // horizontal top
    lines.push({ x1: center - 200, y1: top, x2: center - 200, y2: level1Y }); // vertical left
    lines.push({ x1: center + 200, y1: top, x2: center + 200, y2: level1Y }); // vertical right

    // Level 2 Left
    const level2Y = level1Y + 80;
    lines.push({ x1: center - 300, y1: level1Y, x2: center - 100, y2: level1Y }); // horizontal
    lines.push({ x1: center - 300, y1: level1Y, x2: center - 300, y2: level2Y }); // vertical
    lines.push({ x1: center - 100, y1: level1Y, x2: center - 100, y2: level2Y }); // vertical

    // Level 2 Right
    lines.push({ x1: center + 100, y1: level1Y, x2: center + 300, y2: level1Y }); // horizontal
    lines.push({ x1: center + 100, y1: level1Y, x2: center + 100, y2: level2Y }); // vertical
    lines.push({ x1: center + 300, y1: level1Y, x2: center + 300, y2: level2Y }); // vertical

    // Leaf nodes connections (8 clusters)
    const leafOffsets = [-350, -250, -150, -50, 50, 150, 250, 350];
    leafOffsets.forEach((offset, i) => {
      const parentX = i < 2 ? center - 300 : (i < 4 ? center - 100 : (i < 6 ? center + 100 : center + 300));
      lines.push({ x1: parentX - 25, y1: level2Y, x2: parentX + 25, y2: level2Y }); // small horizontal
      lines.push({ x1: center + offset, y1: level2Y, x2: center + offset, y2: bottom }); // final vertical to leaf
    });

    return lines;
  }, [width, height]);

  return (
    <div className="w-full h-full bg-black/40 relative overflow-hidden flex items-center justify-center">
      <div className="absolute top-2 left-3 font-mono text-[8px] text-primary/60 uppercase tracking-[0.4em] z-10">
        // HRP_QUASI_DIAGONALIZATION_TREE
      </div>

      <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid slice" className="w-full h-full scale-110">
        <defs>
          <filter id="hrpGlow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <g filter="url(#hrpGlow)">
          {treeLines.map((line, i) => (
            <line
              key={i}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke="currentColor"
              strokeWidth="2.5"
              className="text-primary/80"
              strokeLinecap="square"
            />
          ))}
        </g>

        {/* Junction Nodes */}
        <g fill="white">
          <circle cx={width/2} cy={paddingY} r="4" className="fill-primary" />
          {treeLines.map((line, i) => (
            <circle key={i} cx={line.x1} cy={line.y1} r="2" fillOpacity="0.5" />
          ))}
        </g>

        {/* Leaf Nodes */}
        {[-350, -250, -150, -50, 50, 150, 250, 350].map((offset, i) => (
          <g key={i} transform={`translate(${width / 2 + offset}, ${height - paddingY})`}>
            <circle r="5" className="fill-primary shadow-glow" />
            <rect x="-1" y="5" width="2" height="15" className="fill-primary/20" />
          </g>
        ))}
        
        {/* Background Grid */}
        <g opacity="0.03" stroke="white" strokeWidth="1">
          {Array.from({ length: 12 }).map((_, i) => (
            <line key={i} x1={(width / 12) * i} y1="0" x2={(width / 12) * i} y2={height} />
          ))}
        </g>
      </svg>

      <div className="absolute bottom-2 right-3 font-mono text-[7px] text-muted tracking-tighter uppercase opacity-50">
        Recursive_Bisection_v4.2 // Institutional_Grade
      </div>
    </div>
  );
};
