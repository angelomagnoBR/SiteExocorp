import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MatrixGlitch = () => {
  const [showGlitch, setShowGlitch] = useState(false);

  useEffect(() => {
    // Mostra o glitch a cada 20 segundos
    const interval = setInterval(() => {
      setShowGlitch(true);
      
      // Esconde após 3 segundos
      setTimeout(() => {
        setShowGlitch(false);
      }, 3000);
    }, 20000);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {showGlitch && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="matrix-glitch-overlay"
        >
          <div className="matrix-glitch-content">
            <div className="matrix-glitch-text">The Matrix</div>
            <div className="matrix-glitch-time">9m40s</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MatrixGlitch;
