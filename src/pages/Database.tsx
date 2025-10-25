import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import NexusView from '@/components/database/NexusView';
import GalleryView from '@/components/database/GalleryView';
import MatrixGlitch from '@/components/MatrixGlitch';
import NumbersModal from '@/components/NumbersModal';
import { pistaFoiEncontrada, numbersForamValidados, registrarPistaEncontrada } from '@/lib/argProgress';

type ViewType = 'nexus' | 'gallery';

export default function Database() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activeView, setActiveView] = useState<ViewType>('nexus');
  const [showTerminal, setShowTerminal] = useState(false);
  const [showNumbersModal, setShowNumbersModal] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Verifica se há parâmetro de report na URL
  useEffect(() => {
    const report = searchParams.get('report');
    if (report === 'lia') {
      setActiveView('nexus');
    }
  }, [searchParams]);

  // Handler do terminal
  const handleTerminalCommand = (cmd: string): boolean => {
    const command = cmd.toLowerCase().trim();

    // ========================================
    // COMANDO: "COELHO BRANCO" e variações
    // ========================================
    const coelhoVariations = [
      'coelho branco',
      'coelhobranco', 
      'coelho_branco',
      'white rabbit',
      'white_rabbit',
      'whiterabbit'
    ];

    if (coelhoVariations.includes(command)) {
      import('@/lib/argProgress').then(({ registrarPistaEncontrada }) => {
        registrarPistaEncontrada('COELHO');
        navigate('/database?report=lia');
        setActiveView('nexus');
        setShowTerminal(false);
      });
      return true;
    }

    // ========================================
    // COMANDO: INICIO
    // ========================================
    if (command === 'inicio' || command === 'start') {
      import('@/lib/argProgress').then(({ inicializarProgresso }) => {
        inicializarProgresso();
      });
      return true;
    }

    // ========================================
    // COMANDO: GAME
    // ========================================
    if (command === 'game' || command === 'jogo') {
      if (pistaFoiEncontrada('VENDETTA')) {
        import('@/lib/argProgress').then(({ registrarPistaEncontrada }) => {
          registrarPistaEncontrada('GAME');
          navigate('/game');
        });
        return true;
      } else {
        console.log('Você precisa descobrir mais pistas antes...');
        return false;
      }
    }

    return false;
  };

  // Handler quando "Anomalia" é clicada (após pílula vermelha)
  const handleAnomaliaClick = () => {
    if (pistaFoiEncontrada('PILULA')) {
      setShowNumbersModal(true);
    }
  };

  // Handler quando números são validados com sucesso
  const handleNumbersSuccess = () => {
    setShowSuccessMessage(true);
    
    setTimeout(() => {
      setShowSuccessMessage(false);
      registrarPistaEncontrada('NUMBERS');
    }, 3000);
  };

  return (
    <div className="database-page">
      {/* Glitch "The Matrix" na tela inicial */}
      {activeView === 'nexus' && !showTerminal && (
        <MatrixGlitch />
      )}

      {/* Header */}
      <div className="database-header">
        <div className="header-tabs">
          <button
            className={`tab ${activeView === 'nexus' ? 'active' : ''}`}
            onClick={() => setActiveView('nexus')}
          >
            📁 Base de Dados NEXUS
          </button>
          <button
            className={`tab ${activeView === 'gallery' ? 'active' : ''}`}
            onClick={() => setActiveView('gallery')}
          >
            📷 Registro de Vigilância
          </button>
        </div>

        <button
          className="terminal-toggle"
          onClick={() => setShowTerminal(!showTerminal)}
        >
          {showTerminal ? '✕ Fechar Terminal' : '⌨️ Abrir Terminal'}
        </button>
      </div>

      {/* Terminal */}
      {showTerminal && (
        <div className="terminal-container">
          <div className="terminal-header">
            <span>EXOCORP TERMINAL v2.4.1</span>
            <button onClick={() => setShowTerminal(false)}>✕</button>
          </div>
          <div className="terminal-body">
            <input
              type="text"
              placeholder="Digite um comando..."
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const input = e.currentTarget;
                  const handled = handleTerminalCommand(input.value);
                  if (handled) {
                    input.value = '';
                  }
                }
              }}
            />
          </div>
        </div>
      )}

      {/* Views */}
      <div className="database-content">
        {activeView === 'nexus' && (
          <NexusView 
            onAnomaliaClick={handleAnomaliaClick}
            numbersValidated={numbersForamValidados()}
          />
        )}
        {activeView === 'gallery' && <GalleryView />}
      </div>

      {/* Modal de Números */}
      <NumbersModal
        isOpen={showNumbersModal}
        onClose={() => setShowNumbersModal(false)}
        onSuccess={handleNumbersSuccess}
      />

      {/* Mensagem de Sucesso após validar números */}
      {showSuccessMessage && (
        <div className="success-overlay">
          <div className="success-message">
            <h2>✓ SEQUÊNCIA VALIDADA</h2>
            <p>As portas foram abertas...</p>
            <p className="success-hint">Continue investigando os dossiês...</p>
          </div>
        </div>
      )}
    </div>
  );
}

