import { useState, useEffect } from 'react';
import { X, Activity, Cpu, HardDrive, Thermometer, Network, Shield, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SystemStatusDialogProps {
  open: boolean;
  onClose: () => void;
  uptime: string;
  cpuLoad: number;
  memoryUsage: number;
  coreTemp: number;
  latency: number;
}

const SystemStatusDialog = ({ open, onClose, uptime, cpuLoad, memoryUsage, coreTemp, latency }: SystemStatusDialogProps) => {
  const [batteryLevel, setBatteryLevel] = useState(89);
  const [packetsIn, setPacketsIn] = useState(8455120);
  const [packetsOut, setPacketsOut] = useState(4120998);
  const [blockedAttempts, setBlockedAttempts] = useState(4);
  const [downloadSpeed, setDownloadSpeed] = useState(1.2);
  const [uploadSpeed, setUploadSpeed] = useState(0.89);
  const [newsIndex, setNewsIndex] = useState(0);

  const newsItems = [
    "++ EXOCORP ANUNCIA LUCROS RECORDES EM Q3 ++",
    "++ POLÍCIA DE NY REPRIME PROTESTOS NO SETOR 3 ++",
    "++ NOVO VÍRUS 'DATA-KRASH' SE ESPALHA PELA REDE ++",
    "++ ATUALIZAÇÃO DE SEGURANÇA CRÍTICA DISPONÍVEL ++",
    "++ BLACKOUT ENERGÉTICO ATINGE DISTRITO INDUSTRIAL ++"
  ];

  useEffect(() => {
    if (!open) return;

    // Battery drain simulation
    const batteryInterval = setInterval(() => {
      setBatteryLevel(prev => Math.max(50, prev - 0.1));
    }, 5000);

    // Network packets counter
    const packetInterval = setInterval(() => {
      setPacketsIn(prev => prev + Math.floor(Math.random() * 1000) + 500);
      setPacketsOut(prev => prev + Math.floor(Math.random() * 500) + 200);
    }, 1000);

    // Security threats
    const threatInterval = setInterval(() => {
      if (Math.random() > 0.9) {
        setBlockedAttempts(prev => prev + 1);
      }
    }, 5000);

    // Network speed fluctuation
    const speedInterval = setInterval(() => {
      setDownloadSpeed(prev => Math.max(0.8, Math.min(2.5, prev + (Math.random() - 0.5) * 0.2)));
      setUploadSpeed(prev => Math.max(0.5, Math.min(1.5, prev + (Math.random() - 0.5) * 0.1)));
    }, 2000);

    // News ticker
    const newsInterval = setInterval(() => {
      setNewsIndex(prev => (prev + 1) % newsItems.length);
    }, 5000);

    return () => {
      clearInterval(batteryInterval);
      clearInterval(packetInterval);
      clearInterval(threatInterval);
      clearInterval(speedInterval);
      clearInterval(newsInterval);
    };
  }, [open]);

  if (!open) return null;

  const getCpuBarWidth = () => `${cpuLoad}%`;
  const getMemoryBarWidth = () => `${(memoryUsage / 16) * 100}%`;
  const getBatteryBarWidth = () => `${batteryLevel}%`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-cyber-darker/95 backdrop-blur-sm">
      <div className="w-full max-w-6xl mx-4 max-h-[90vh] overflow-auto neon-border bg-card/90 backdrop-blur-md">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-primary/30 px-6 py-3 bg-primary/10 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <Activity className="w-5 h-5 text-primary animate-pulse" />
            <span className="text-sm terminal-text tracking-widest text-primary">
              MONITORAMENTO COMPLETO DO SISTEMA
            </span>
          </div>
          <Button
            onClick={onClose}
            variant="ghost"
            size="sm"
            className="h-7 w-7 p-0 hover:bg-destructive/20"
          >
            <X className="h-5 w-5 text-destructive" />
          </Button>
        </div>

        {/* Content Grid */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* System Status */}
          <div className="neon-border p-4 bg-card/50">
            <div className="flex items-center gap-2 mb-3">
              <Cpu className="w-4 h-4 text-primary" />
              <h3 className="text-xs text-primary terminal-text tracking-wider">STATUS ESSENCIAL</h3>
            </div>
            <div className="space-y-2 text-[10px] terminal-text">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-muted-foreground">ID DA UNIDADE:</span>
                  <span className="text-primary">ONYX-DECK-7B4F</span>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-muted-foreground">SISTEMA ATIVO HÁ:</span>
                  <span className="text-primary">{uptime}</span>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-muted-foreground">CARGA DA UCP:</span>
                  <span className="text-primary">{Math.round(cpuLoad)}%</span>
                </div>
                <div className="h-2 bg-muted/20 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
                    style={{ width: getCpuBarWidth() }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-muted-foreground">BUFFER DE MEMÓRIA:</span>
                  <span className="text-primary">{memoryUsage.toFixed(1)} / 16 GB</span>
                </div>
                <div className="h-2 bg-muted/20 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-primary to-terminal-green transition-all duration-500"
                    style={{ width: getMemoryBarWidth() }}
                  />
                </div>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">TEMP. DO NÚCLEO:</span>
                <span className={coreTemp > 70 ? 'text-destructive' : coreTemp > 65 ? 'text-yellow-500' : 'text-terminal-green'}>
                  {Math.round(coreTemp)}°C {coreTemp < 70 ? '(Estável)' : '(Alta)'}
                </span>
              </div>
            </div>
          </div>

          {/* Network Status */}
          <div className="neon-border p-4 bg-card/50">
            <div className="flex items-center gap-2 mb-3">
              <Network className="w-4 h-4 text-primary" />
              <h3 className="text-xs text-primary terminal-text tracking-wider">CONEXÃO E REDE</h3>
            </div>
            <div className="space-y-2 text-[10px] terminal-text">
              <div className="flex justify-between">
                <span className="text-muted-foreground">STATUS DA CONEXÃO:</span>
                <span className="text-terminal-green animate-pulse">CONECTADO À MATRIZ</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">QUAN-ID:</span>
                <span className="text-primary">2A:F4:88:F1:C9:B3</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">LATÊNCIA DO PULSO:</span>
                <span className="text-primary">{Math.round(latency)}ms</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">PROXY ATIVO:</span>
                <span className="text-secondary">NEO-KYOTO &gt; HK</span>
              </div>
              <div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">TAXA DE TRANSF.:</span>
                </div>
                <div className="pl-2 mt-1 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-terminal-green">DOWN:</span>
                    <span className="text-terminal-green">{downloadSpeed.toFixed(2)} Gbp/s</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary">UP:</span>
                    <span className="text-primary">{uploadSpeed.toFixed(2)} Gbp/s</span>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">PACOTES DE DADOS:</span>
                </div>
                <div className="pl-2 mt-1 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-terminal-green">PKT_IN:</span>
                    <span className="text-terminal-green">{packetsIn.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary">PKT_OUT:</span>
                    <span className="text-primary">{packetsOut.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Security Status */}
          <div className="neon-border-magenta p-4 bg-secondary/5">
            <div className="flex items-center gap-2 mb-3">
              <Shield className="w-4 h-4 text-secondary" />
              <h3 className="text-xs text-secondary terminal-text tracking-wider">SEGURANÇA</h3>
            </div>
            <div className="space-y-2 text-[10px] terminal-text">
              <div className="flex justify-between">
                <span className="text-muted-foreground">FIREWALL:</span>
                <span className="text-terminal-green">CÉRBERO v4.2 ATIVO</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">IDS:</span>
                <span className="text-primary">QUEBRA-GELO: MON.</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">INTRUSÕES BLOQ.:</span>
                <span className="text-destructive">{blockedAttempts} (última hora)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">BANCO DE AMEAÇAS:</span>
                <span className="text-terminal-green">SINCRONIZADO</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">CRIPTOGRAFIA:</span>
                <span className="text-primary">AES-512</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">LOCALIZAÇÃO:</span>
                <span className="text-secondary">OCULTA</span>
              </div>
              {blockedAttempts > 5 && (
                <div className="mt-2 p-2 neon-border-magenta bg-destructive/10 animate-pulse">
                  <span className="text-destructive text-[9px]">
                    ALERTA: RASTREAMENTO DETECTADO DA REDE EXOCORP!
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Hardware Status */}
          <div className="neon-border p-4 bg-card/50">
            <div className="flex items-center gap-2 mb-3">
              <HardDrive className="w-4 h-4 text-primary" />
              <h3 className="text-xs text-primary terminal-text tracking-wider">HARDWARE & CYBERWARE</h3>
            </div>
            <div className="space-y-2 text-[10px] terminal-text">
              <div className="flex justify-between">
                <span className="text-muted-foreground">IND (Link Neural):</span>
                <span className="text-terminal-green">SINCRONIZADO</span>
              </div>
              <div>
                <div className="text-muted-foreground mb-1">HARDWARE CONECTADO:</div>
                <div className="pl-2 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-primary">&gt; Cyberdeck:</span>
                    <span className="text-terminal-green">FURY-X1</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary">&gt; Drone Vigil.:</span>
                    <span className="text-yellow-500">STANDBY</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary">&gt; Impressora 3D:</span>
                    <span className="text-muted-foreground">INATIVA</span>
                  </div>
                </div>
              </div>
              <div>
                <div className="text-muted-foreground mb-1">CYBERWARE:</div>
                <div className="pl-2 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-primary">&gt; Olho (Kiroshi):</span>
                    <span className="text-terminal-green">100%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary">&gt; Braço (Arasaka):</span>
                    <span className="text-terminal-green">92%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-primary">&gt; Conector Neural:</span>
                    <span className="text-terminal-green">ÓTIMO</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Power Status */}
          <div className="neon-border p-4 bg-card/50">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-4 h-4 text-primary" />
              <h3 className="text-xs text-primary terminal-text tracking-wider">FONTE DE ENERGIA</h3>
            </div>
            <div className="space-y-2 text-[10px] terminal-text">
              <div className="flex justify-between">
                <span className="text-muted-foreground">FONTE PRIMÁRIA:</span>
                <span className="text-terminal-green">REDE ELÉTRICA</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">STATUS:</span>
                <span className="text-yellow-500">FLUTUANTE</span>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-muted-foreground">CÉLULA DE BACKUP:</span>
                  <span className="text-primary">{Math.round(batteryLevel)}%</span>
                </div>
                <div className="h-2 bg-muted/20 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-500 ${
                      batteryLevel > 70 ? 'bg-terminal-green' : 
                      batteryLevel > 30 ? 'bg-yellow-500' : 'bg-destructive'
                    }`}
                    style={{ width: getBatteryBarWidth() }}
                  />
                </div>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">TEMPO RESTANTE:</span>
                <span className="text-primary">3h 12m</span>
              </div>
            </div>
          </div>

          {/* Active Processes */}
          <div className="neon-border p-4 bg-card/50">
            <div className="flex items-center gap-2 mb-3">
              <Thermometer className="w-4 h-4 text-primary" />
              <h3 className="text-xs text-primary terminal-text tracking-wider">PROCESSOS ATIVOS</h3>
            </div>
            <div className="space-y-1 text-[9px] terminal-text">
              <div className="flex justify-between">
                <span className="text-terminal-green">[001] matrix_browser.x</span>
                <span className="text-muted-foreground">Estável</span>
              </div>
              <div className="flex justify-between">
                <span className="text-primary">[002] ICE_guardian.x</span>
                <span className="text-muted-foreground">Monitorando</span>
              </div>
              <div className="flex justify-between">
                <span className="text-destructive">[003] crack_suite_v12.x</span>
                <span className="text-destructive">ILEGAL</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary">[004] ghost_proxy.x</span>
                <span className="text-muted-foreground">NÃO RASTREÁVEL</span>
              </div>
              <div className="flex justify-between">
                <span className="text-primary">[005] comms_scrambler.x</span>
                <span className="text-muted-foreground">Criptografando</span>
              </div>
            </div>
          </div>
        </div>

        {/* News Ticker */}
        <div className="border-t border-primary/20 bg-cyber-dark/80 px-6 py-2">
          <div className="overflow-hidden">
            <div className="text-[10px] text-primary terminal-text tracking-wider animate-pulse">
              {newsItems[newsIndex]}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemStatusDialog;
