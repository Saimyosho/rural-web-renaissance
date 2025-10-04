import { useEffect, useRef } from 'react';

interface WireframeBackgroundProps {
  variant?: 'grid' | 'dots' | 'hexagon' | 'circuit';
  density?: 'low' | 'medium' | 'high';
  animate?: boolean;
}

const WireframeBackground = ({ 
  variant = 'grid', 
  density = 'medium',
  animate = true 
}: WireframeBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    updateSize();

    const gridSize = density === 'low' ? 80 : density === 'medium' ? 50 : 30;
    let animationFrame: number;
    let offset = 0;

    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = 'hsla(195, 85%, 55%, 0.08)';
      ctx.lineWidth = 1;

      // Vertical lines
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x + (animate ? offset % gridSize : 0), 0);
        ctx.lineTo(x + (animate ? offset % gridSize : 0), canvas.height);
        ctx.stroke();
      }

      // Horizontal lines
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y + (animate ? offset % gridSize : 0));
        ctx.lineTo(canvas.width, y + (animate ? offset % gridSize : 0));
        ctx.stroke();
      }
    };

    const drawDots = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const dotSize = density === 'low' ? 3 : density === 'medium' ? 2 : 1.5;

      for (let x = 0; x < canvas.width; x += gridSize) {
        for (let y = 0; y < canvas.height; y += gridSize) {
          const pulse = animate ? Math.sin(offset / 20 + x / 100 + y / 100) * 0.3 + 0.7 : 1;
          ctx.fillStyle = `hsla(195, 85%, 55%, ${0.12 * pulse})`;
          ctx.beginPath();
          ctx.arc(x, y, dotSize * pulse, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const drawHexagons = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = 'hsla(195, 85%, 55%, 0.06)';
      ctx.lineWidth = 1;

      const hexSize = gridSize / 2;
      const hexHeight = hexSize * Math.sqrt(3);

      for (let row = 0; row < canvas.height / hexHeight + 2; row++) {
        for (let col = 0; col < canvas.width / (hexSize * 1.5) + 2; col++) {
          const x = col * hexSize * 1.5;
          const y = row * hexHeight + (col % 2 ? hexHeight / 2 : 0);
          
          const pulse = animate ? Math.sin(offset / 30 + col / 5 + row / 5) * 0.5 + 0.5 : 1;
          ctx.globalAlpha = 0.1 * pulse;

          ctx.beginPath();
          for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i;
            const hx = x + hexSize * Math.cos(angle);
            const hy = y + hexSize * Math.sin(angle);
            if (i === 0) ctx.moveTo(hx, hy);
            else ctx.lineTo(hx, hy);
          }
          ctx.closePath();
          ctx.stroke();
        }
      }
      ctx.globalAlpha = 1;
    };

    const drawCircuit = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = 'hsla(195, 85%, 55%, 0.08)';
      ctx.lineWidth = 1;

      const nodeSize = gridSize;
      
      for (let x = nodeSize; x < canvas.width; x += nodeSize) {
        for (let y = nodeSize; y < canvas.height; y += nodeSize) {
          // Draw node
          const pulse = animate ? Math.sin(offset / 20 + x / 50 + y / 50) * 0.5 + 0.5 : 1;
          ctx.fillStyle = `hsla(195, 85%, 55%, ${0.15 * pulse})`;
          ctx.beginPath();
          ctx.arc(x, y, 3, 0, Math.PI * 2);
          ctx.fill();

          // Draw connections
          if (Math.random() > 0.5 && x + nodeSize < canvas.width) {
            ctx.strokeStyle = `hsla(195, 85%, 55%, ${0.06 * pulse})`;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + nodeSize, y);
            ctx.stroke();
          }
          
          if (Math.random() > 0.5 && y + nodeSize < canvas.height) {
            ctx.strokeStyle = `hsla(195, 85%, 55%, ${0.06 * pulse})`;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x, y + nodeSize);
            ctx.stroke();
          }
        }
      }
    };

    const animate_frame = () => {
      offset += 0.5;

      switch (variant) {
        case 'grid':
          drawGrid();
          break;
        case 'dots':
          drawDots();
          break;
        case 'hexagon':
          drawHexagons();
          break;
        case 'circuit':
          drawCircuit();
          break;
      }

      if (animate) {
        animationFrame = requestAnimationFrame(animate_frame);
      }
    };

    animate_frame();
    window.addEventListener('resize', updateSize);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', updateSize);
    };
  }, [variant, density, animate]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: 0.4 }}
    />
  );
};

export default WireframeBackground;
