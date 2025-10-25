import { useState, useEffect } from 'react';

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
};

export const responsiveClasses = {
  container: 'w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
  heading1: 'text-2xl sm:text-3xl md:text-4xl font-bold',
  heading2: 'text-xl sm:text-2xl md:text-3xl font-bold',
  heading3: 'text-lg sm:text-xl md:text-2xl font-semibold',
  body: 'text-sm sm:text-base',
  small: 'text-xs sm:text-sm',
  terminal: 'text-[10px] sm:text-xs md:text-sm font-mono',
  padding: 'p-3 sm:p-4 md:p-6',
  paddingX: 'px-3 sm:px-4 md:px-6',
  paddingY: 'py-3 sm:py-4 md:py-6',
  dialog: 'w-[95vw] sm:w-full max-w-2xl max-h-[85vh] overflow-y-auto',
  dialogLarge: 'w-[95vw] sm:w-full max-w-4xl max-h-[85vh] overflow-y-auto',
  button: 'px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base',
};
