import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MatrixGlitch = () => {
  const [showGlitch, setShowGlitch] = useState(false);
  const [glitchEnabled, setGlitchEnabled] = useState(true);

  useEffect(() => {
    // Expõe funções globais para controle via comandos
    window.stopMatrixGlitch = () => {
      setGlitchEnabled(false);
      setShowGlitch(false);
      console.log('🐰 Matrix Glitch desativado!');
    };

    window.startMatrixGlitch = () => {
      setGlitchEnabled(true);
      console.log('✅ Matrix Glitch reativado!');
    };

    return () => {
      delete window.stopMatrixGlitch;
      delete window.startMatrixGlitch;
    };
  }, []);

  useEffect(() => {
    if (!glitchEnabled) return; // Não executa se desabilitado

    // Mostra o glitch a cada 30 segundos
    const interval = setInterval(() => {
      setShowGlitch(true);
      
      // Esconde após 6 segundos
      setTimeout(() => {
        setShowGlitch(false);
      }, 500);
    }, 30000);

    return () => clearInterval(interval);
  }, [glitchEnabled]);

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
