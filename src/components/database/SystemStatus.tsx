import { useState, useEffect } from 'react';
import { Maximize2, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
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

  useEffect(() => {
    // Verificar se deve mostrar a anomalia (PISTA 4)
    setShowAnomaly(podeMostrarPista('NUMBERS'));
  }, []);

  const handleAnomalyClick = () => {
    registrarPistaEncontrada('NUMBERS');
    setShowAnomalyDialog(true);
    toast.success('Pista Encontrada!', {
      description: 'Os números desbloquearam algo...',
    });
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

        {/* Diálogo da Anomalia */}
        <Dialog open={showAnomalyDialog} onOpenChange={setShowAnomalyDialog}>
          <DialogContent className="max-w-2xl bg-background/95 backdrop-blur-sm border-destructive">
            <DialogHeader>
              <DialogTitle className="text-destructive terminal-text tracking-widest text-center text-xl flex items-center justify-center gap-2">
                <AlertTriangle className="h-6 w-6 animate-pulse" />
                ANOMALIA DETECTADA
              </DialogTitle>
            </DialogHeader>
            <div className="p-6 space-y-4">
              <div className="neon-border bg-card/30 p-6 space-y-4">
                <p className="text-sm text-destructive terminal-text text-center">
                  ARQUIVO DE SEGURANÇA DESBLOQUEADO
                </p>
                
                <div className="bg-input/50 p-4 rounded">
                  <p className="text-center text-2xl text-primary terminal-text tracking-widest neon-glow font-bold">
                    4-8-15-16-23-42
                  </p>
                  <p className="text-center text-xs text-muted-foreground terminal-text mt-2">
                    Código de Segurança: BLOQUEADO
                  </p>
                </div>
                
                <div className="border-t border-primary/30 pt-4 space-y-3">
                  <p className="text-sm text-foreground terminal-text">
                    Os números abriram a porta.
                  </p>
                  <p className="text-sm text-foreground terminal-text">
                    Mas você ainda não está pronto.
                  </p>
                  
                  <div className="bg-primary/10 p-4 rounded my-4 space-y-2">
                    <p className="text-sm text-muted-foreground terminal-text italic">
                      Remember, remember, the 5th of November.
                    </p>
                    <p className="text-sm text-muted-foreground terminal-text italic">
                      Gunpowder, treason and plot.
                    </p>
                  </div>
                  
                  <p className="text-sm text-secondary terminal-text">
                    V não tinha rosto.
                  </p>
                  <p className="text-sm text-secondary terminal-text">
                    V não tinha nome.
                  </p>
                  <p className="text-sm text-secondary terminal-text">
                    V tinha apenas uma <span className="text-primary neon-glow">IDEIA</span>.
                  </p>
                  
                  <div className="border-t border-secondary/30 pt-4">
                    <p className="text-xs text-foreground terminal-text text-center">
                      Procure nos DOSSIÊS aquele que também teve uma IDEIA.
                    </p>
                    <p className="text-xs text-muted-foreground terminal-text text-center mt-2">
                      Aquele que disse NÃO ao império.
                    </p>
                    <p className="text-xs text-primary terminal-text text-center mt-2 neon-glow">
                      Aquele que lidera a REBELIÃO.
                    </p>
                  </div>
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
