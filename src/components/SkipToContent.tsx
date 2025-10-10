import { useEffect, useState } from 'react';

const SkipToContent = () => {
  const [isFocused, setIsFocused] = useState(false);

  const handleSkip = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.focus();
      mainContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <a
      href="#main-content"
      onClick={handleSkip}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      className={`
        fixed top-4 left-4 z-[10000] px-4 py-2 
        bg-primary text-primary-foreground rounded-md
        font-medium text-sm shadow-lg
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2
        ${isFocused ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0'}
      `}
      tabIndex={0}
    >
      Skip to main content
    </a>
  );
};

export default SkipToContent;
