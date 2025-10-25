import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MatrixGlitch = () => {
  const [showGlitch, setShowGlitch] = useState(false);
  const [glitchEnabled, setGlitchEnabled] = useState(true);
  const [keySequence, setKeySequence] = useState('');

  useEffect(() => {
    // Funções globais para controle via console
    window.stopMatrixGlitch = () => {
      setGlitchEnabled(false);
      setShowGlitch(false);
      console.log('🐰 Matrix Glitch desativado! Siga o coelho branco...');
    };

    window.startMatrixGlitch = () => {
      setGlitchEnabled(true);
      console.log('✅ Matrix Glitch reativado!');
    };

    window.coelhoBranco = () => {
      setGlitchEnabled(false);
      setShowGlitch(false);
      console.log('🐇 "Siga o coelho branco" - Neo');
      console.log('💊 Você tomou a pílula vermelha...');
    };

    // Detector de digitação na página (Easter Egg)
    const handleKeyPress = (e) => {
      const newSequence = (keySequence + e.key).toLowerCase().slice(-13);
      setKeySequence(newSequence);
      
      if (newSequence === 'coelhobranco') {
        setGlitchEnabled(false);
        setShowGlitch(false);
        console.log('🐇 Easter Egg encontrado! Matrix Glitch desativado.');
        // Opcional: remova o comentário abaixo para mostrar alerta
        // alert('🐰 Você seguiu o coelho branco! Matrix Glitch desativado.');
      }
    };

    window.addEventListener('keypress', handleKeyPress);

    return () => {
      delete window.stopMatrixGlitch;
      delete window.startMatrixGlitch;
      delete window.coelhoBranco;
      window.removeEventListener('keypress', handleKeyPress);
    };
  }, [keySequence]);

  useEffect(() => {
    if (!glitchEnabled) return; // Não executa se desabilitado

    // Mostra o glitch a cada 30 segundos (era 20)
    const interval = setInterval(() => {
      setShowGlitch(true);
      
      // Esconde após 6 segundos (era 3)
      setTimeout(() => {
        setShowGlitch(false);
      }, 6000);
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
