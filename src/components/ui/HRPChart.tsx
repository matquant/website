import { useMemo } from 'react';

export const HRPChart = () => {
  const width = 800;
  const height = 500;
  
  const treeData = useMemo(() => {
    const l = [];
    const centerX = width / 2;
    const top = 60;
    const bottom = height - 80;
    
    // Level 0 to Level 1
    l.push({ x1: centerX - 200, y1: top, x2: centerX + 200, y2: top }); // horizontal
    l.push({ x1: centerX - 200, y1: top, x2: centerX - 200, y2: top + 80 }); // left
    l.push({ x1: centerX + 200, y1: top, x2: centerX + 200, y2: top + 80 }); // right
    
    // Level 1 to Level 2
    [centerX - 200, centerX + 200].forEach(x => {
      l.push({ x1: x - 100, y1: top + 80, x2: x + 100, y2: top + 80 });
      l.push({ x1: x - 100, y1: top + 80, x2: x - 100, y2: top + 160 });
      l.push({ x1: x + 100, y1: top + 80, x2: x + 100, y2: top + 160 });
    });

    // Level 2 to Leafs (8 Assets)
    [centerX-300, centerX-100, centerX+100, centerX+300].forEach(x => {
      l.push({ x1: x - 50, y1: top + 160, x2: x + 50, y2: top + 160 });
      l.push({ x1: x - 50, y1: top + 160, x2: x - 50, y2: bottom });
      l.push({ x1: x + 50, y1: top + 160, x2: x + 50, y2: bottom });
    });

    return l;
  }, []);

  return (
    <div className="w-full h-full bg-[#050505] relative overflow-hidden flex items-center justify-center border border-white/5">
      <div className="absolute top-4 left-5 font-mono text-[9px] text-primary/40 uppercase tracking-[0.4em] z-10">
        // HRP_RECURSIVE_STRUCTURE
      </div>

      <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid slice" className="w-full h-full p-12">
        {/* Static, high-contrast tree lines */}
        <g stroke="white" strokeWidth="2.5" fill="none" opacity="0.8">
          {treeData.map((line, i) => (
            <line key={i} x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2} strokeLinecap="square" />
          ))}
        </g>

        {/* Junction nodes */}
        <g fill="white">
          <circle cx={width/2} cy={60} r="5" className="fill-primary" />
          {[width/2-200, width/2+200].forEach((x, i) => (
            <circle key={i} cx={x} cy={140} r="4" />
          ))}
        </g>

        {/* Terminal Leaf nodes */}
        <g fill="white">
          {[width/2-350, width/2-250, width/2-150, width/2-50, width/2+50, width/2+150, width/2+250, width/2+350].map((x, i) => (
            <circle key={i} cx={x} cy={height-80} r="6" className="fill-primary" />
          ))}
        </g>
      </svg>

      <div className="absolute bottom-4 right-6 font-mono text-[8px] text-muted uppercase tracking-widest opacity-30">
        Static_Asset_Cluster_Map
      </div>
    </div>
  );
};
