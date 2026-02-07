import { useEffect, useRef } from 'react';

export const PlexusBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let mathSymbols: MathSymbol[] = [];
    const particleCount = 200;
    const symbolCount = 15;
    const connectionDistance = 140;
    const mouseRadius = 150;

    const MATH_GLYPHS = ['Σ', 'α', 'β', 'Δ', 'λ', 'Ω', 'θ', 'π', '∂', '∫', '≈', '≠', '√'];

    class MathSymbol {
      x: number;
      y: number;
      text: string;
      speed: number;
      opacity: number;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.text = MATH_GLYPHS[Math.floor(Math.random() * MATH_GLYPHS.length)];
        this.speed = Math.random() * 0.2 + 0.1;
        this.opacity = Math.random() * 0.1 + 0.05;
      }

      draw() {
        ctx!.font = '12px JetBrains Mono';
        ctx!.fillStyle = `rgba(255, 203, 5, ${this.opacity})`;
        ctx!.fillText(this.text, this.x, this.y);
        this.y -= this.speed;
        if (this.y < -20) {
          this.y = canvas!.height + 20;
          this.x = Math.random() * canvas!.width;
        }
      }
    }

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      pulse: number;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.vx = (Math.random() - 0.5) * 0.8; 
        this.vy = (Math.random() - 0.5) * 0.8;
        this.size = Math.random() * 1.5 + 0.5;
        this.pulse = Math.random() * Math.PI;
      }

      update() {
        // Super subtle interactivity
        const dx = mouseRef.current.x - this.x;
        const dy = mouseRef.current.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouseRadius) {
          const force = (mouseRadius - distance) / mouseRadius;
          const angle = Math.atan2(dy, dx);
          this.vx -= Math.cos(angle) * force * 0.1; // Very low force
          this.vy -= Math.sin(angle) * force * 0.1;
        }

        this.x += this.vx;
        this.y += this.vy;

        // Smooth movement
        this.vx *= 0.99;
        this.vy *= 0.99;

        if (this.x < 0 || this.x > canvas!.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas!.height) this.vy *= -1;
        
        this.pulse += 0.03;
      }

      draw() {
        if (!ctx) return;
        // More transparent/subtle alpha
        const alpha = 0.2 + Math.sin(this.pulse) * 0.15;
        ctx.fillStyle = `rgba(255, 203, 5, ${alpha})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const drawGrid = () => {
      ctx.strokeStyle = 'rgba(255, 203, 5, 0.02)';
      ctx.lineWidth = 1;
      const step = 80;

      for (let x = 0; x < canvas.width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    };

    const init = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      particles = [];
      mathSymbols = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
      for (let i = 0; i < symbolCount; i++) {
        mathSymbols.push(new MathSymbol());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawGrid();
      
      mathSymbols.forEach(s => s.draw());
      
      particles.forEach((p, i) => {
        p.update();
        p.draw();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            const alpha = (1 - dist / connectionDistance) * 0.15;
            ctx.strokeStyle = `rgba(255, 203, 5, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', init);
    
    init();
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', init);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full opacity-40 pointer-events-none"
    />
  );
};