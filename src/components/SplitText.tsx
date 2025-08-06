import { useEffect, useState } from 'react';

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}

const SplitText = ({ text, className = "", delay = 0, stagger = 0.05 }: SplitTextProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [delay]);

  if (!isVisible) {
    return (
      <span className={`opacity-0 ${className}`}>
        {text}
      </span>
    );
  }

  return (
    <span className={`animate-fade-in ${className}`}>
      {text}
    </span>
  );
};

export default SplitText;