import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock } from 'lucide-react';
import { registrarNumbersValidados } from '@/lib/argProgress';

interface NumbersModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NumbersModal = ({ isOpen, onClose }: NumbersModalProps) => {
  const [numbers, setNumbers] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const correctNumbers = ['4', '8', '15', '16', '23', '42'];

  useEffect(() => {
    if (isOpen) {
      setNumbers(['', '', '', '', '', '']);
      setError(false);
      setSuccess(false);
    }
  }, [isOpen]);

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 2) return;
    
    const newNumbers = [...numbers];
    newNumbers[index] = value;
    setNumbers(newNumbers);
    setError(false);

    // Auto-focus próximo input
    if (value && index < 5) {
      const nextInput = document.getElementById(`number-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleSubmit = () => {
    const isCorrect = numbers.every((num, idx) => num === correctNumbers[idx]);
    
    if (isCorrect) {
      setSuccess(true);
      registrarNumbersValidados();
      
      setTimeout(() => {
        onClose();
      }, 2000);
    } else {
      setError(true);
      setTimeout(() => setError(false), 1000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Enter') {
      if (index === 5 && numbers[5]) {
        handleSubmit();
      }
    } else if (e.key === 'Backspace' && !numbers[index] && index > 0) {
      const prevInput = document.getElementById(`number-input-${index - 1}`);
      prevInput?.focus();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="numbers-modal-overlay"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className={`numbers-modal-content ${error ? 'error' : ''} ${success ? 'success' : ''}`}
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={onClose} className="numbers-modal-close">
              <X className="h-5 w-5" />
            </button>

            <div className="numbers-modal-header">
              <Lock className="h-8 w-8 text-primary animate-pulse" />
              <h2 className="text-2xl font-bold neon-glow terminal-text tracking-widest">
                SISTEMA DE VALIDAÇÃO
              </h2>
              <p className="text-sm text-muted-foreground terminal-text mt-2">
                Digite a sequência numérica para desbloquear acesso
              </p>
            </div>

            <div className="numbers-modal-inputs">
              {numbers.map((num, index) => (
                <input
                  key={index}
                  id={`number-input-${index}`}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={num}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyPress(e, index)}
                  className="numbers-modal-input"
                  maxLength={2}
                  autoFocus={index === 0}
                />
              ))}
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="numbers-modal-error"
              >
                ⚠ SEQUÊNCIA INCORRETA
              </motion.div>
            )}

            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="numbers-modal-success"
              >
                ✓ ACESSO CONCEDIDO
              </motion.div>
            )}

            <button
              onClick={handleSubmit}
              className="numbers-modal-submit"
              disabled={numbers.some(n => !n)}
            >
              VALIDAR SEQUÊNCIA
            </button>

            <div className="numbers-modal-hint">
              <p className="text-xs text-muted-foreground terminal-text">
                DICA: Os números são da ilha...
              </p>
            </div>
          </motion.div>

          {success && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="numbers-success-overlay"
            >
              <div className="numbers-success-content">
                <div className="text-6xl mb-6">🔓</div>
                <p className="text-3xl neon-glow terminal-text mb-4">
                  ACESSO LIBERADO
                </p>
                <p className="text-sm text-secondary terminal-text">
                  Novos arquivos foram desbloqueados...
                </p>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NumbersModal;
