import React, { useState, useEffect } from 'react';
import { Activity, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

interface SystemStatusProps {
  onClose: () => void;
}

const SystemStatus: React.FC<SystemStatusProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'system' | 'anomaly'>('system');
  const [inputValue, setInputValue] = useState('');
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Verificar se a pista NUMBERS já foi desbloqueada
  useEffect(() => {
    const unlockedClues = JSON.parse(localStorage.getItem('unlockedClues') || '[]');
    if (unlockedClues.includes('NUMBERS')) {
      setShowSuccess(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Normalizar o input - remover espaços, hífens e converter para minúsculas
    const normalizedInput = inputValue.replace(/[\s-]/g, '').toLowerCase();
    const correctSequence = '4815162342';
    
    if (normalizedInput === correctSequence) {
      // Desbloquear pista NUMBERS
      const unlockedClues = JSON.parse(localStorage.getItem('unlockedClues') || '[]');
      if (!unlockedClues.includes('NUMBERS')) {
        unlockedClues.push('NUMBERS');
        localStorage.setItem('unlockedClues', JSON.stringify(unlockedClues));
      }
      
      setShowSuccess(true);
      setInputValue('');
    } else {
      // Mostrar erro com shake animation
      setShowError(true);
      setTimeout(() => setShowError(false), 600);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-cyan-500/30 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-cyan-900/50 to-blue-900/50 p-4 border-b border-cyan-500/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Activity className="w-6 h-6 text-cyan-400" />
            <h2 className="text-xl font-bold text-cyan-400">SYSTEM STATUS MONITOR</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-cyan-400 transition-colors text-2xl leading-none"
          >
            ×
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-cyan-500/30">
          <button
            onClick={() => setActiveTab('system')}
            className={`flex-1 px-6 py-3 font-semibold transition-all ${
              activeTab === 'system'
                ? 'bg-cyan-900/30 text-cyan-400 border-b-2 border-cyan-400'
                : 'text-gray-400 hover:text-cyan-400'
            }`}
          >
            SYSTEM INFO
          </button>
          <button
            onClick={() => setActiveTab('anomaly')}
            className={`flex-1 px-6 py-3 font-semibold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'anomaly'
                ? 'bg-red-900/30 text-red-400 border-b-2 border-red-400'
                : 'text-gray-400 hover:text-red-400'
            }`}
          >
            <AlertTriangle className="w-4 h-4" />
            ANOMALIA DETECTADA
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {activeTab === 'system' ? (
            <div className="space-y-6">
              {/* System Metrics */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-800/50 p-4 rounded border border-cyan-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-sm text-gray-400">CPU USAGE</span>
                  </div>
                  <div className="text-2xl font-bold text-cyan-400">34%</div>
                </div>

                <div className="bg-gray-800/50 p-4 rounded border border-cyan-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-sm text-gray-400">MEMORY</span>
                  </div>
                  <div className="text-2xl font-bold text-cyan-400">56%</div>
                </div>

                <div className="bg-gray-800/50 p-4 rounded border border-cyan-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-sm text-gray-400">NETWORK</span>
                  </div>
                  <div className="text-2xl font-bold text-cyan-400">STABLE</div>
                </div>

                <div className="bg-gray-800/50 p-4 rounded border border-red-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <XCircle className="w-4 h-4 text-red-400" />
                    <span className="text-sm text-gray-400">INTEGRITY</span>
                  </div>
                  <div className="text-2xl font-bold text-red-400">WARNING</div>
                </div>
              </div>

              {/* Active Processes */}
              <div className="bg-gray-800/50 p-4 rounded border border-cyan-500/20">
                <h3 className="text-cyan-400 font-semibold mb-3">ACTIVE PROCESSES</h3>
                <div className="space-y-2 text-sm font-mono">
                  <div className="flex justify-between text-gray-300">
                    <span>exocorp_mainframe.exe</span>
                    <span className="text-green-400">RUNNING</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>security_monitor.sys</span>
                    <span className="text-green-400">RUNNING</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>database_core.dll</span>
                    <span className="text-green-400">RUNNING</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>unknown_process_7f4a.bin</span>
                    <span className="text-red-400 animate-pulse">SUSPICIOUS</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Anomaly Header */}
              <div className="bg-red-900/20 border-l-4 border-red-500 p-4 rounded">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-red-400 font-bold text-lg mb-2">
                      ANOMALIA DE SISTEMA DETECTADA
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      Padrão numérico anômalo detectado nos logs do sistema. 
                      Entrada de validação requerida para resolver instabilidade.
                    </p>
                  </div>
                </div>
              </div>

              {!showSuccess ? (
                <>
                  {/* Input Form */}
                  <div className="bg-gray-800/50 p-6 rounded border border-red-500/30">
                    <h4 className="text-red-400 font-semibold mb-4 flex items-center gap-2">
                      <Activity className="w-4 h-4" />
                      SEQUÊNCIA DE VALIDAÇÃO NECESSÁRIA
                    </h4>
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="block text-gray-400 text-sm mb-2">
                          Digite a sequência para estabilizar o sistema:
                        </label>
                        <input
                          type="text"
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          className={`w-full bg-gray-900 border ${
                            showError ? 'border-red-500' : 'border-cyan-500/30'
                          } rounded px-4 py-3 text-cyan-400 font-mono text-lg focus:outline-none focus:border-cyan-400 transition-all ${
                            showError ? 'animate-shake' : ''
                          }`}
                          placeholder="???"
                          autoFocus
                        />
                        {showError && (
                          <p className="text-red-400 text-sm mt-2 flex items-center gap-2">
                            <XCircle className="w-4 h-4" />
                            SEQUÊNCIA INVÁLIDA. Tente novamente.
                          </p>
                        )}
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded transition-colors flex items-center justify-center gap-2"
                      >
                        <CheckCircle className="w-5 h-5" />
                        VALIDAR SEQUÊNCIA
                      </button>
                    </form>

                    <div className="mt-4 pt-4 border-t border-gray-700">
                      <p className="text-gray-500 text-xs text-center italic">
                        "Os números... eles significam algo. Procure nos padrões."
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                /* Success Message */
                <div className="bg-green-900/20 border-l-4 border-green-500 p-6 rounded">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-8 h-8 text-green-400 flex-shrink-0" />
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-green-400 font-bold text-xl mb-2">
                          SEQUÊNCIA VALIDADA COM SUCESSO
                        </h3>
                        <p className="text-gray-300 leading-relaxed">
                          Sistema estabilizado. Protocolo de segurança restaurado.
                        </p>
                      </div>

                      <div className="bg-gray-900/50 p-4 rounded border border-green-500/30">
                        <p className="text-green-400 font-mono text-sm mb-3 uppercase tracking-wide">
                          &gt;&gt; MENSAGEM DECODIFICADA:
                        </p>
                        <div className="space-y-3 text-gray-300">
                          <p className="leading-relaxed">
                            "Um verdadeiro líder não se curva ao sistema. 
                            Ele questiona, ele resiste, ele inspira outros a fazer o mesmo."
                          </p>
                          <p className="leading-relaxed text-red-400 font-semibold">
                            Bobby Chen será vingado. Sua voz não foi silenciada em vão.
                          </p>
                          <p className="leading-relaxed text-cyan-400 italic">
                            O dossiê de Bobby Chen pode conter mais informações sobre 
                            o que realmente aconteceu. Revise com atenção.
                          </p>
                        </div>
                      </div>

                      <div className="bg-yellow-900/20 border border-yellow-500/30 p-3 rounded">
                        <p className="text-yellow-400 text-sm flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                          <span>
                            <strong>DICA:</strong> Acesse o dossiê de Bobby Chen através do menu principal.
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Technical Details */}
              <div className="bg-gray-800/30 p-4 rounded border border-cyan-500/10">
                <h4 className="text-gray-400 text-xs font-mono mb-2">DETALHES TÉCNICOS</h4>
                <div className="text-gray-500 text-xs font-mono space-y-1">
                  <div>TIMESTAMP: 2024-11-08 03:42:16</div>
                  <div>ERROR CODE: 0x4815162342</div>
                  <div>AFFECTED MODULE: core_system.dll</div>
                  <div>SEVERITY: CRITICAL</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
          20%, 40%, 60%, 80% { transform: translateX(10px); }
        }
        
        .animate-shake {
          animation: shake 0.6s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default SystemStatus;
