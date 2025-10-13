import { useState, useEffect, useRef } from 'react';

interface TypingEffectOptions {
  text: string;
  speed?: number;
  delay?: number;
  onComplete?: () => void;
}

export const useTypingEffect = ({
  text,
  speed = 50,
  delay = 0,
  onComplete
}: TypingEffectOptions) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const indexRef = useRef(0);

  useEffect(() => {
    // Reset when text changes
    indexRef.current = 0;
    setDisplayedText('');
    setIsComplete(false);
    
    // Start typing after delay
    const startTimeout = setTimeout(() => {
      setIsTyping(true);
    }, delay);

    return () => {
      clearTimeout(startTimeout);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [text, delay]);

  useEffect(() => {
    if (!isTyping || isComplete) return;

    if (indexRef.current < text.length) {
      // Variable speed based on character type
      let currentSpeed = speed;
      const currentChar = text[indexRef.current];
      
      // Slower after punctuation
      if (indexRef.current > 0) {
        const prevChar = text[indexRef.current - 1];
        if (prevChar === '.' || prevChar === '!' || prevChar === '?') {
          currentSpeed = speed * 3;
        } else if (prevChar === ',' || prevChar === ';') {
          currentSpeed = speed * 2;
        }
      }

      timeoutRef.current = setTimeout(() => {
        setDisplayedText(text.substring(0, indexRef.current + 1));
        indexRef.current++;
      }, currentSpeed);
    } else {
      setIsTyping(false);
      setIsComplete(true);
      if (onComplete) {
        onComplete();
      }
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [text, speed, isTyping, isComplete, onComplete, displayedText]);

  return { displayedText, isTyping, isComplete };
};
