import { useState, useEffect } from 'react';
import { Maximize2, AlertTriangle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { podeMostrarPista, registrarPistaEncontrada } from '@/lib/argProgress';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';

interface SystemStatusProps {
  onOpenFull?: () => void;
}

const SystemStatus = ({ onOpenFull }: SystemStatusProps) => {
  const [uptime, setUptime] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [cpuLoad, setCpuLoad] = useState(45);
  const [memoryUsage, setMemoryUsage] = useState(12.7);
  const [coreTemp, setCoreTemp] = useState(62);
  const [latency, setLatency] = useState(14);
  const [showAnomaly, setShowAnomaly] = useState(false);
  const [showAnomalyDialog, setShowAnomalyDialog] = useState(false);
  const [numbersInput, setNumbersInput] = useState('');
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    // Verificar se deve mostrar a anomalia (PISTA 4)
    const shouldShow = podeMostrarPista('NUMBERS');
    setShowAnomaly(shouldShow);
    
    // Verificar se já foi resolvida
    const unlockedClues = JSON.parse(localStorage.getItem('unlockedClues') || '[]');
    if (unlockedClues.includes('NUMBERS')) {
      setIsSuccess(true);
    }
  }, []);

  const handleAnomalyClick = () => {
    setShowAnomalyDialog(true);
    setNumbersInput('');
    setIsError(false);
  };

  const validateNumbers = () => {
    // Remove espaços, hífens e outros caracteres não numéricos, mantém apenas os números
    const cleanInput = numbersInput.replace(/[^0-9]/g, '');
    const correctSequence = '4815162342';
    
    if (cleanInput === correctSequence) {
      // Sucesso!

      // Adicione após a linha 52 (dentro do if de sucesso):
const validateNumbers = () => {
  const cleanInput = numbersInput.replace(/[^0-9]/g, '');
  const correctSequence = '4815162342';
  
  console.log('🎯 Input limpo:', cleanInput);
  console.log('🎯 Sequência correta:', correctSequence);
  console.log('🎯 É igual?', cleanInput === correctSequence);
  
  if (cleanInput === correctSequence) {
    console.log('✅ SUCESSO! Registrando NUMBERS...');
    registrarPistaEncontrada('NUMBERS');
    
    // Verificar se realmente foi salvo
    const saved = JSON.parse(localStorage.getItem('unlockedClues') || '[]');
    console.log('📦 LocalStorage após registro:', saved);
    
    setIsSuccess(true);
    // ... resto do código
  }
};

      registrarPistaEncontrada('NUMBERS');
      setIsSuccess(true);
      
      toast.success('SEQUÊNCIA VALIDADA!', {
        description: 'Sistema estabilizado. Protocolo de segurança restaurado.',
        duration: 5000,
      });
      
      // Aguarda um pouco antes de fechar para mostrar a mensagem de sucesso
      setTimeout(() => {
        setNumbersInput('');
        setIsError(false);
        setAttempts(0);
      }, 500);
    } else {
      // Erro
      setIsError(true);
      setAttempts(prev => prev + 1);
      
      toast.error('SEQUÊNCIA INVÁLIDA', {
        description: 'Os números não correspondem. Tente novamente.',
        duration: 3000,
      });
      
      // Remove o shake após a animação
      setTimeout(() => {
        setIsError(false);
      }, 600);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isSuccess) {
      validateNumbers();
    }
  };

  useEffect(() => {
    // Uptime counter
    const uptimeInterval = setInterval(() => {
      setUptime(prev => {
        let newSeconds = prev.seconds + 1;
        let newMinutes = prev.minutes;
        let newHours = prev.hours;

        if (newSeconds >= 60) {
          newSeconds = 0;
          newMinutes += 1;
        }
        if (newMinutes >= 60) {
          newMinutes = 0;
          newHours += 1;
        }

        return { hours: newHours, minutes: newMinutes, seconds: newSeconds };
      });
    }, 1000);

    // CPU Load simulation (random fluctuation)
    const cpuInterval = setInterval(() => {
      setCpuLoad(prev => {
        const change = (Math.random() - 0.5) * 10;
        return Math.max(20, Math.min(95, prev + change));
      });
    }, 2000);

    // Memory usage simulation
    const memInterval = setInterval(() => {
      setMemoryUsage(prev => {
        const change = (Math.random() - 0.5) * 0.3;
        return Math.max(8, Math.min(15.5, prev + change));
      });
    }, 3000);

    // Core temperature simulation
    const tempInterval = setInterval(() => {
      setCoreTemp(prev => {
        const change = (Math.random() - 0.5) * 3;
        return Math.max(55, Math.min(75, prev + change));
      });
    }, 2500);

    // Network latency simulation
    const latencyInterval = setInterval(() => {
      setLatency(prev => {
        const change = (Math.random() - 0.5) * 5;
        return Math.max(8, Math.min(30, prev + change));
      });
    }, 1500);

    return () => {
      clearInterval(uptimeInterval);
      clearInterval(cpuInterval);
      clearInterval(memInterval);
      clearInterval(tempInterval);
      clearInterval(latencyInterval);
    };
  }, []);

  const formatUptime = () => {
    return `${String(uptime.hours).padStart(2, '0')}h:${String(uptime.minutes).padStart(2, '0')}m:${String(uptime.seconds).padStart(2, '0')}s`;
  };

  const getCpuBarWidth = () => {
    return `${cpuLoad}%`;
  };

  const getTempColor = () => {
    if (coreTemp > 70) return 'text-destructive';
    if (coreTemp > 65) return 'text-yellow-500';
    return 'text-terminal-green';
  };

  return (
    <>
      <div className="p-2 sm:p-3 md:p-4 neon-border-magenta bg-secondary/5 rounded-sm">
        <div className="flex items-center justify-between mb-2">
       <p className="text-[8px] sm:text-[10px] text-secondary terminal-text tracking-widest">
  STATUS DO SISTEMA
</p>

            STATUS DO SISTEMA
          </p>
          <Button
            onClick={onOpenFull}
            variant="ghost"
            size="sm"
            className="h-5 w-5 p-0 hover:bg-secondary/20"
          >
            <Maximize2 className="h-3 w-3 text-secondary" />
          </Button>
        </div>
        
        <div className="space-y-1 text-[8px] sm:text-[10px] text-muted-foreground terminal-text">
          <div className="flex justify-between">
            <span>CONEXÃO:</span>
            <span className="text-terminal-green animate-pulse">ATIVA</span>
          </div>
          <div className="flex justify-between">
            <span>UPTIME:</span>
            <span className="text-primary">{formatUptime()}</span>
          </div>
          <div className="flex justify-between">
            <span>CARGA UCP:</span>
            <span className="text-primary">{Math.round(cpuLoad)}%</span>
          </div>
          <div className="flex justify-between">
            <span>MEMÓRIA:</span>
            <span className="text-primary">{memoryUsage.toFixed(1)}/16 GB</span>
          </div>
          <div className="flex justify-between">
            <span>TEMP. NÚCLEO:</span>
            <span className={getTempColor()}>{Math.round(coreTemp)}°C</span>
          </div>
          <div className="flex justify-between">
            <span>LATÊNCIA:</span>
            <span className="text-primary">{Math.round(latency)}ms</span>
          </div>
          <div className="flex justify-between">
            <span>CRIPTOGRAFIA:</span>
            <span className="text-primary">AES-512</span>
          </div>
          <div className="flex justify-between">
            <span>LOCALIZAÇÃO:</span>
            <span className="text-secondary">OCULTA</span>
          </div>
          
          {/* PISTA 4: Anomalia dos Números (Aparece após encontrar PISTA 3) */}
          {showAnomaly && (
            <div 
              className="flex justify-between cursor-pointer hover:bg-destructive/10 p-1 -m-1 transition-all"
              onClick={handleAnomalyClick}
            >
              <span className={`${isSuccess ? 'text-terminal-green' : 'text-destructive animate-pulse'} flex items-center gap-1`}>
                {isSuccess ? (
                  <CheckCircle className="h-3 w-3" />
                ) : (
                  <AlertTriangle className="h-3 w-3" />
                )}
                {isSuccess ? 'RESOLVIDA:' : 'ANOMALIA:'}
              </span>
              <span className={`${isSuccess ? 'text-terminal-green' : 'text-destructive animate-pulse neon-glow'}`}>
                CLIQUE
              </span>
            </div>
          )}
        </div>

        {/* CPU Load Bar */}
        <div className="mt-3">
          <div className="h-1 bg-muted/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
              style={{ width: getCpuBarWidth() }}
            />
          </div>
        </div>
      </div>

      {/* Diálogo da Anomalia com Campo de Input */}
      <Dialog open={showAnomalyDialog} onOpenChange={setShowAnomalyDialog}>
        <DialogContent className={`w-[95vw] sm:w-full max-w-2xl bg-background/95 backdrop-blur-sm ${isSuccess ? 'border-terminal-green' : 'border-destructive'} ${isError ? 'animate-shake' : ''}`}>
          <DialogHeader>
            <DialogTitle className={`${isSuccess ? 'text-terminal-green' : 'text-destructive'} terminal-text tracking-widest text-center text-xl flex items-center justify-center gap-2`}>
              {isSuccess ? (
                <>
                  <CheckCircle className="h-6 w-6" />
                  SISTEMA ESTABILIZADO
                </>
              ) : (
                <>
                  <AlertTriangle className="h-6 w-6 animate-pulse" />
                  ANOMALIA DETECTADA
                </>
              )}
            </DialogTitle>
          </DialogHeader>
          
         <div className="p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6">
            {!isSuccess ? (
              /* MODAL DE INPUT - Antes de acertar */
              <div className="neon-border bg-card/30 p-6 space-y-4">
                <p className="text-sm text-destructive terminal-text text-center">
                  ARQUIVO DE SEGURANÇA BLOQUEADO
                </p>
                
                <div className="bg-input/50 p-6 rounded space-y-4">
                  <p className="text-center text-sm text-muted-foreground terminal-text">
                    Padrão numérico anômalo detectado nos logs do sistema.
                  </p>
                  <p className="text-center text-xs text-muted-foreground terminal-text">
                    Entrada de validação requerida para resolver instabilidade:
                  </p>
                  
              <Input
  type="text"
  value={numbersInput}
  onChange={(e) => setNumbersInput(e.target.value)}
  onKeyPress={handleKeyPress}
  placeholder="???"
  className="text-center text-xl sm:text-2xl tracking-widest terminal-text bg-input border-primary/50 focus:border-primary"
  autoFocus
/>
                </div>

                {attempts > 0 && (
                  <div className="bg-destructive/10 border border-destructive/30 p-3 rounded">
                    <p className="text-xs text-destructive terminal-text text-center">
                      ⚠ TENTATIVAS: {attempts} | SEQUÊNCIA INCORRETA
                    </p>
                  </div>
                )}
                
                <Button
                  onClick={validateNumbers}
                  className="w-full bg-destructive hover:bg-destructive/80 text-white terminal-text tracking-widest"
                >
                  [ VALIDAR SEQUÊNCIA ]
                </Button>
                
                <div className="border-t border-primary/30 pt-4">
                  <p className="text-xs text-muted-foreground terminal-text text-center italic">
                    "Os números... eles significam algo. Procure nos padrões."
                  </p>
                </div>
              </div>
            ) : (
              /* MENSAGEM DE SUCESSO - Após acertar */
              <div className="neon-border border-terminal-green bg-card/30 p-6 space-y-6">
                <div className="flex items-start gap-4">
                  <CheckCircle className="h-8 w-8 text-terminal-green flex-shrink-0 mt-1" />
                  <div className="space-y-4 flex-1">
                    <div>
                      <h3 className="text-terminal-green font-bold text-lg mb-2 terminal-text">
                        SEQUÊNCIA VALIDADA COM SUCESSO
                      </h3>
                      <p className="text-muted-foreground text-sm terminal-text">
                        Sistema estabilizado. Protocolo de segurança restaurado.
                      </p>
                    </div>

                    <div className="bg-background/50 p-5 rounded border border-terminal-green/30 space-y-4">
                      <p className="text-terminal-green font-mono text-xs uppercase tracking-wide">
                        &gt;&gt; MENSAGEM DECODIFICADA:
                      </p>
                      
                      <div className="space-y-3">
                        <p className="text-foreground leading-relaxed terminal-text text-sm">
                          "Um verdadeiro líder não se curva ao sistema. 
                          Ele questiona, ele resiste, ele inspira outros a fazer o mesmo."
                        </p>
                        
                        <p className="text-destructive font-semibold leading-relaxed terminal-text text-sm">
                          Ele será vingado. Sua voz não foi silenciada em vão.
                        </p>
                        
                        <p className="text-primary italic leading-relaxed terminal-text text-sm">
                          Revise com atenção. Podem conter mais informações sobre 
                          o que realmente aconteceu.
                        </p>
                      </div>
                    </div>

                    <div className="bg-yellow-900/20 border border-yellow-500/30 p-4 rounded">
                      <p className="text-yellow-400 text-sm flex items-start gap-2 terminal-text">
                        <AlertTriangle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                        <span>
                          <strong>DICA:</strong> Pode haver informações adicionais aguardando.
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-terminal-green/30 pt-4">
                  <div className="bg-background/30 p-3 rounded text-xs font-mono text-muted-foreground space-y-1">
                    <div className="text-[10px] text-terminal-green mb-2">DETALHES TÉCNICOS:</div>
                    <div>TIMESTAMP: {new Date().toISOString().replace('T', ' ').substring(0, 19)}</div>
                    <div>ERROR CODE: 0x4815162342 [RESOLVIDO]</div>
                    <div>AFFECTED MODULE: core_system.dll [ESTABILIZADO]</div>
                    <div>SEVERITY: <span className="text-terminal-green">NORMAL</span></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

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
    </>
  );
};

export default SystemStatus;
