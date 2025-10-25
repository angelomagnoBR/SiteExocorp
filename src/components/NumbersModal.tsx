import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertTriangle } from 'lucide-react';
import { registrarNumbersValidados, resetarProgresso } from '@/lib/argProgress';

interface NumbersModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const CORRECT_SEQUENCE = '4815162342'; // Sequência correta sem espaços

export default function NumbersModal({ isOpen, onClose, onSuccess }: NumbersModalProps) {
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);
  const [isValidating, setIsValidating] = useState(false);

  // Normaliza input removendo espaços, vírgulas e outros caracteres
  const normalizeInput = (value: string): string => {
    return value.replace(/[\s,.-]/g, '');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const normalized = normalizeInput(input);
    
    if (normalized === CORRECT_SEQUENCE) {
      // ✅ SEQUÊNCIA CORRETA
      setIsValidating(true);
      
      setTimeout(() => {
        registrarNumbersValidados();
        onSuccess();
        onClose();
      }, 1500);
      
    } else {
      // ❌ SEQUÊNCIA ERRADA - Reseta tudo
      setError(true);
      
      setTimeout(() => {
        resetarProgresso(); // Reseta site ao estado inicial
      }, 2000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Permite apenas números, espaços, vírgulas e hífens
    if (/^[0-9\s,.-]*$/.test(value)) {
      setInput(value);
      setError(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="numbers-modal-backdrop"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ 
              opacity: 1, 
              scale: error ? [1, 1.05, 0.95, 1.02, 1] : 1,
              y: 0,
              x: error ? [-10, 10, -8, 8, -5, 5, 0] : 0
            }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ duration: error ? 0.5 : 0.3 }}
            className={`numbers-modal ${error ? 'error-shake' : ''}`}
          >
            {/* Header */}
            <div className="numbers-modal-header">
              <div className="header-title">
                <AlertTriangle className="warning-icon" size={24} />
                <h2>SISTEMA DE SEGURANÇA</h2>
              </div>
              <button 
                onClick={onClose} 
                className="close-button"
                disabled={isValidating}
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="numbers-modal-content">
              <div className="warning-text">
                <p className="warning-main">
                  ⚠️ ANOMALIA DETECTADA
                </p>
                <p className="warning-sub">
                  Sequência de números necessária para prosseguir
                </p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="input-wrapper">
                  <label htmlFor="numbers-input">
                    Digite a sequência:
                  </label>
                  <input
                    id="numbers-input"
                    type="text"
                    value={input}
                    onChange={handleChange}
                    placeholder="4 8 15 16 23 42"
                    autoFocus
                    disabled={isValidating}
                    className={error ? 'input-error' : ''}
                    maxLength={30}
                  />
                  
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="error-message"
                    >
                      <AlertTriangle size={16} />
                      SEQUÊNCIA INCORRETA - SISTEMA RESETANDO...
                    </motion.div>
                  )}
                </div>

                <div className="modal-actions">
                  <button
                    type="button"
                    onClick={onClose}
                    disabled={isValidating}
                    className="btn-secondary"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={!input || isValidating}
                    className="btn-primary"
                  >
                    {isValidating ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="spinner"
                        />
                        Validando...
                      </>
                    ) : (
                      'Validar Sequência'
                    )}
                  </button>
                </div>
              </form>

              {/* Hints visuais */}
              <div className="hints">
                <p className="hint-text">
                  💡 Aceita múltiplos formatos: com espaços, sem espaços, com vírgulas
                </p>
              </div>
            </div>

            {/* Efeito de glitch nas bordas */}
            <div className="modal-glitch-effect" />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
