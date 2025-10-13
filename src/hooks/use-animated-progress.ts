import { useState, useEffect, useRef } from 'react';

interface AnimatedProgressOptions {
  targetValue: number;
  duration?: number;
  delay?: number;
  onComplete?: () => void;
  easing?: (t: number) => number;
}

// Easing function for smooth animation
const easeOutCubic = (t: number): number => {
  return 1 - Math.pow(1 - t, 3);
};

export const useAnimatedProgress = ({
  targetValue,
  duration = 2000,
  delay = 0,
  onComplete,
  easing = easeOutCubic
}: AnimatedProgressOptions) => {
  const [progress, setProgress] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const startTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number>();

  useEffect(() => {
    // Reset animation
    setProgress(0);
    setIsComplete(false);
    startTimeRef.current = null;

    // Start animation after delay
    const delayTimeout = setTimeout(() => {
      setIsAnimating(true);
      startTimeRef.current = performance.now();
    }, delay);

    return () => {
      clearTimeout(delayTimeout);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [targetValue, delay]);

  useEffect(() => {
    if (!isAnimating || isComplete) return;

    const animate = (currentTime: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = currentTime;
      }

      const elapsed = currentTime - startTimeRef.current;
      const progressRatio = Math.min(elapsed / duration, 1);
      
      // Apply easing function
      const easedProgress = easing(progressRatio);
      const currentValue = easedProgress * targetValue;
      
      setProgress(currentValue);

      if (progressRatio < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
        setIsComplete(true);
        setProgress(targetValue); // Ensure we hit exact target
        if (onComplete) {
          onComplete();
        }
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [isAnimating, isComplete, targetValue, duration, easing, onComplete]);

  return {
    progress: Math.round(progress),
    isAnimating,
    isComplete
  };
};
