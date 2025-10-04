import { useEffect, useRef } from 'react';

interface FloatingShapesProps {
  count?: number;
  variant?: 'geometric' | 'organic' | 'mixed';
}

const FloatingShapes = ({ count = 8, variant = 'geometric' }: FloatingShapesProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const shapes: HTMLDivElement[] = [];

    for (let i = 0; i < count; i++) {
      const shape = document.createElement('div');
      shape.className = 'floating-shape';
      
      // Random size
      const size = Math.random() * 150 + 50;
      shape.style.width = `${size}px`;
      shape.style.height = `${size}px`;
      
      // Random position
      shape.style.left = `${Math.random() * 100}%`;
      shape.style.top = `${Math.random() * 100}%`;
      
      // Random animation duration
      const duration = Math.random() * 20 + 15;
      shape.style.animationDuration = `${duration}s`;
      shape.style.animationDelay = `${Math.random() * -20}s`;
      
      // Shape variant
      if (variant === 'geometric' || (variant === 'mixed' && Math.random() > 0.5)) {
        const shapeType = ['square', 'triangle', 'hexagon'][Math.floor(Math.random() * 3)];
        shape.classList.add(`shape-${shapeType}`);
      } else {
        shape.classList.add('shape-organic');
      }
      
      // Random color
      const hue = Math.random() > 0.5 ? 195 : 25; // Primary or accent
      shape.style.background = `hsla(${hue}, 85%, 55%, 0.03)`;
      shape.style.borderColor = `hsla(${hue}, 85%, 55%, 0.08)`;
      
      container.appendChild(shape);
      shapes.push(shape);
    }

    return () => {
      shapes.forEach(shape => shape.remove());
    };
  }, [count, variant]);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none" />
  );
};

export default FloatingShapes;
