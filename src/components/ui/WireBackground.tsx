import { useEffect, useRef } from 'react';

/**
 * Subtle geometric wireframe animation.
 * Slow-drifting nodes on a coarse grid, connected by hairlines when close.
 * Monochrome (white at very low opacity) so it reads as texture, not decoration.
 */
export const WireBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

  const NODE_SPACING = 260; // px between grid nodes
  const CONNECT_DIST = 200;
  const MAX_DRIFT = 26; // px of drift around grid position
  const NODE_ALPHA = 0.16;
  const LINE_ALPHA = 0.05;

    let raf = 0;
    let nodes: { gx: number; gy: number; phase: number; speed: number }[] = [];
    let w = 0;
    let h = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      nodes = [];
      const cols = Math.ceil(w / NODE_SPACING) + 1;
      const rows = Math.ceil(h / NODE_SPACING) + 1;
      for (let ix = 0; ix < cols; ix++) {
        for (let iy = 0; iy < rows; iy++) {
          nodes.push({
            gx: ix * NODE_SPACING,
            gy: iy * NODE_SPACING,
            phase: Math.random() * Math.PI * 2,
            speed: 0.00012 + Math.random() * 0.0001,
          });
        }
      }
    };

    const position = (n: { gx: number; gy: number; phase: number }, t: number) => ({
      x: n.gx + Math.sin(t + n.phase) * MAX_DRIFT,
      y: n.gy + Math.cos(t * 0.8 + n.phase * 1.7) * MAX_DRIFT,
    });

    const frame = (now: number) => {
      ctx.clearRect(0, 0, w, h);

      const pts = nodes.map((n) => position(n, now * n.speed));

      // hairline connections
      ctx.lineWidth = 1;
      ctx.strokeStyle = `rgba(255,255,255,${LINE_ALPHA})`;
      ctx.beginPath();
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const d2 = dx * dx + dy * dy;
          if (d2 < CONNECT_DIST * CONNECT_DIST) {
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
          }
        }
      }
      ctx.stroke();

      // nodes
      ctx.fillStyle = `rgba(255,255,255,${NODE_ALPHA})`;
      for (const p of pts) {
        ctx.fillRect(p.x - 1, p.y - 1, 2, 2);
      }

      raf = requestAnimationFrame(frame);
    };

    resize();
    raf = requestAnimationFrame(frame);
    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 opacity-60"
    />
  );
};
