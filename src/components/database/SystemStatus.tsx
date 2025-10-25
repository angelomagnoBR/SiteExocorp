import { useState, useEffect } from 'react';
import { Maximize2, AlertTriangle, X } from 'lucide-react';
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
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    // Verificar se deve mostrar a anomalia (PISTA 4)
    setShowAnomaly(podeMostrarPista('NUMBERS'));
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
      registrarPistaEncontrada('NUMBERS');
      toast.success('Sequência Correta!', {
        description: 'Os números desbloquearam algo...',
      });
      setShowAnomalyDialog(false);
      setNumbersInput('');
      setIsError(false);
    } else {
      // Erro
      setIsError(true);
      setAttempts(prev => prev + 1);
      toast.error('Sequência Incorreta', {
        description: 'Os números não correspondem...',
      });
      
      // Remove o shake após a animação
      setTimeout(() => {
        setIsError(false);
      }, 500);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
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
    <div className="p-4 neon-border-magenta bg-secondary/5 rounded-sm">
      <div className="flex items-center justify-between mb-2">
        <p className="text-[10px] text-secondary terminal-text tracking-widest">
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
      
      <div className="space-y-1 text-[10px] text-muted-foreground terminal-text">
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
            <span className="text-destructive animate-pulse flex items-center gap-1">
              <AlertTriangle className="h-3 w-3" />
              ANOMALIA:
            </span>
            <span className="text-destructive animate-pulse neon-glow">CLIQUE</span>
          </div>
        )}
      </div>

      {/* Diálogo da Anomalia com Campo de Input */}
      <Dialog open={showAnomalyDialog} onOpenChange={setShowAnomalyDialog}>
        <DialogContent className={`max-w-2xl bg-background/95 backdrop-blur-sm border-destructive ${isError ? 'animate-shake' : ''}`}>
          <DialogHeader>
            <DialogTitle className="text-destructive terminal-text tracking-widest text-center text-xl flex items-center justify-center gap-2">
              <AlertTriangle className="h-6 w-6 animate-pulse" />
              ANOMALIA DETECTADA
            </DialogTitle>
          </DialogHeader>
          <div className="p-6 space-y-6">
            <div className="neon-border bg-card/30 p-6 space-y-4">
              <p className="text-sm text-destructive terminal-text text-center">
                ARQUIVO DE SEGURANÇA BLOQUEADO
              </p>
              
              <div className="bg-input/50 p-6 rounded space-y-4">
                <p className="text-center text-sm text-muted-foreground terminal-text">
                  Digite a sequência de números para desbloquear:
                </p>
                
                <Input
                  type="text"
                  value={numbersInput}
                  onChange={(e) => setNumbersInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="_ _ _ _ _ _ _ _ _ _"
                  className="text-center text-2xl tracking-widest terminal-text bg-input border-primary/50 focus:border-primary"
                  autoFocus
                />
                
                <p className="text-center text-xs text-muted-foreground terminal-text">
                  Formato aceito: 4-8-15-16-23-42 ou 4 8 15 16 23 42 ou 4815162342
                </p>
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
                className="w-full bg-primary hover:bg-primary/80 text-primary-foreground terminal-text tracking-widest"
              >
                [ VALIDAR SEQUÊNCIA ]
              </Button>
              
              <div className="border-t border-primary/30 pt-4">
                <p className="text-xs text-muted-foreground terminal-text text-center italic">
                  "Os números são bons. Os números são nossos amigos."
                </p>
                <p className="text-xs text-muted-foreground terminal-text text-center mt-2">
                  - LOST, Temporada 1
                </p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

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
  );
};

export default SystemStatus;
