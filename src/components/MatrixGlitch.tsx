import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Componente de Glitch "The Matrix 9m40s"
 * Aparece periodicamente na tela inicial com efeito Matrix verde
 */

export default function MatrixGlitch() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Primeira aparição após 5 segundos (delay inicial)
    const initialTimeout = setTimeout(() => {
      triggerGlitch();
    }, 5000);

    // Loop: a cada 20 segundos
    const interval = setInterval(() => {
      triggerGlitch();
    }, 20000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  const triggerGlitch = () => {
    setIsVisible(true);
    
    // Desaparece após 2.5 segundos
    setTimeout(() => {
      setIsVisible(false);
    }, 2500);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: [0, 1, 0.9, 1, 0.8, 1],
            scale: [0.8, 1.05, 0.95, 1.02, 1],
            x: [0, -2, 2, -1, 1, 0],
            y: [0, 1, -1, 2, -1, 0]
          }}
          exit={{ 
            opacity: 0, 
            scale: 0.7,
            filter: 'blur(10px)' 
          }}
          transition={{ 
            duration: 0.6,
            times: [0, 0.2, 0.4, 0.6, 0.8, 1]
          }}
          className="matrix-glitch-overlay"
        >
          <div className="matrix-glitch-container">
            {/* Efeito de código Matrix caindo no fundo */}
            <div className="matrix-rain" />
            
            {/* Texto principal com múltiplas camadas de glitch */}
            <div className="matrix-text-wrapper">
              {/* Camada de glitch vermelho */}
              <motion.div
                className="matrix-text glitch-red"
                animate={{
                  x: [-2, 2, -1],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{
                  duration: 0.1,
                  repeat: Infinity,
                  repeatType: 'reverse'
                }}
              >
                The Matrix 9m40s
              </motion.div>
              
              {/* Camada de glitch azul */}
              <motion.div
                className="matrix-text glitch-blue"
                animate={{
                  x: [2, -2, 1],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{
                  duration: 0.15,
                  repeat: Infinity,
                  repeatType: 'reverse'
                }}
              >
                The Matrix 9m40s
              </motion.div>
              
              {/* Texto principal verde Matrix */}
              <motion.div
                className="matrix-text main-text"
                animate={{
                  textShadow: [
                    '0 0 10px #00ff41, 0 0 20px #00ff41, 0 0 30px #00ff41',
                    '0 0 20px #00ff41, 0 0 30px #00ff41, 0 0 40px #00ff41',
                    '0 0 10px #00ff41, 0 0 20px #00ff41, 0 0 30px #00ff41'
                  ]
                }}
                transition={{
                  duration: 0.3,
                  repeat: Infinity,
                  repeatType: 'reverse'
                }}
              >
                The Matrix 9m40s
              </motion.div>
            </div>

            {/* Linhas de scan horizontais */}
            <motion.div
              className="scan-lines"
              animate={{
                y: [-100, 600]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'linear'
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
