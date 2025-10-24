import { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SystemStatusFullViewProps {
  onClose: () => void;
}

const SystemStatusFullView = ({ onClose }: SystemStatusFullViewProps) => {
  const [uptime, setUptime] = useState({ hours: 8, minutes: 17, seconds: 45 });
  const [cpuLoad, setCpuLoad] = useState(78);
  const [memoryUsed, setMemoryUsed] = useState(12.7);
  const [coreTemp, setCoreTemp] = useState(62);
  const [networkLatency, setNetworkLatency] = useState(14);

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

    // System metrics simulation
    const cpuInterval = setInterval(() => {
      setCpuLoad(prev => Math.max(20, Math.min(95, prev + (Math.random() - 0.5) * 10)));
    }, 2000);

    const memInterval = setInterval(() => {
      setMemoryUsed(prev => Math.max(8, Math.min(15.5, prev + (Math.random() - 0.5) * 0.3)));
    }, 3000);

    const tempInterval = setInterval(() => {
      setCoreTemp(prev => Math.max(55, Math.min(75, prev + (Math.random() - 0.5) * 3)));
    }, 2500);

    const latencyInterval = setInterval(() => {
      setNetworkLatency(prev => Math.max(8, Math.min(30, prev + (Math.random() - 0.5) * 5)));
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

  return (
    <div className="h-full flex flex-col bg-cyber-dark">
      {/* Header */}
      <div className="border-b border-primary/30 p-6 bg-card/50 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              onClick={onClose}
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 hover:bg-primary/20"
            >
              <ArrowLeft className="h-5 w-5 text-primary" />
            </Button>
            <div>
              <h2 className="text-2xl font-bold neon-glow tracking-widest font-['Orbitron']">
                STATUS COMPLETO DO SISTEMA
              </h2>
              <p className="text-xs text-muted-foreground terminal-text mt-1">
                EXOCORP DATA-HUB // NODO 847-OMEGA // MONITORAMENTO EM TEMPO REAL
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 overflow-auto flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Status Essencial */}
          <div className="neon-border bg-card/30 p-6 space-y-4">
            <h3 className="text-sm text-primary terminal-text tracking-widest neon-glow border-b border-primary/30 pb-2">
              STATUS ESSENCIAL
            </h3>
            <div className="space-y-3 text-xs terminal-text">
              <div>
                <span className="text-muted-foreground">ID DA UNIDADE:</span>
                <div className="text-primary mt-1">ONYX-DECK-7B4F</div>
              </div>
              <div>
                <span className="text-muted-foreground">SISTEMA ATIVO HÁ:</span>
                <div className="text-foreground mt-1 font-mono">{formatUptime()}</div>
              </div>
              <div>
                <span className="text-muted-foreground">CARGA DA UCP:</span>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex-1 h-2 bg-muted rounded overflow-hidden">
                    <div 
                      className="h-full bg-primary transition-all duration-300 neon-glow"
                      style={{ width: `${cpuLoad}%` }}
                    />
                  </div>
                  <span className="text-primary">{Math.round(cpuLoad)}%</span>
                </div>
              </div>
              <div>
                <span className="text-muted-foreground">USO DE MEMÓRIA:</span>
                <div className="text-foreground mt-1">
                  Buffer: {memoryUsed.toFixed(1)} / 16 GB
                </div>
              </div>
              <div>
                <span className="text-muted-foreground">TEMP. DO NÚCLEO:</span>
                <div className={`mt-1 ${coreTemp > 70 ? 'text-destructive' : 'text-foreground'}`}>
                  {Math.round(coreTemp)}°C {coreTemp > 70 ? '(ALERTA)' : '(Estável)'}
                </div>
              </div>
              <div>
                <span className="text-muted-foreground">FONTE DE ENERGIA:</span>
                <div className="text-foreground mt-1">Rede Elétrica (Flutuante)</div>
              </div>
            </div>
          </div>

          {/* Conexão e Rede */}
          <div className="neon-border bg-card/30 p-6 space-y-4">
            <h3 className="text-sm text-secondary terminal-text tracking-widest neon-glow-magenta border-b border-secondary/30 pb-2">
              CONEXÃO E REDE
            </h3>
            <div className="space-y-3 text-xs terminal-text">
              <div>
                <span className="text-muted-foreground">STATUS:</span>
                <div className="text-secondary mt-1 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                  CONECTADO À MATRIZ (Criptografado)
                </div>
              </div>
              <div>
                <span className="text-muted-foreground">QUAN-ID:</span>
                <div className="text-foreground mt-1 font-mono text-[10px] break-all">
                  2A:F4:88:F1:C9:B3:E1:9D
                </div>
              </div>
              <div>
                <span className="text-muted-foreground">LATÊNCIA DO PULSO:</span>
                <div className="text-foreground mt-1">{Math.round(networkLatency)}ms (Nethub Local)</div>
              </div>
              <div>
                <span className="text-muted-foreground">PROXIES ATIVOS:</span>
                <div className="text-foreground mt-1 text-[10px]">
                  Torre Neo-Kyoto → HK Server → SAÍDA
                </div>
              </div>
              <div>
                <span className="text-muted-foreground">TAXA DE TRANSFERÊNCIA:</span>
                <div className="text-foreground mt-1">
                  <div>DOWN: 1.2 Gbp/s</div>
                  <div>UP: 890 Mbp/s</div>
                </div>
              </div>
              <div>
                <span className="text-muted-foreground">PACOTES DE DADOS:</span>
                <div className="text-foreground mt-1 font-mono text-[10px]">
                  <div>PKT_IN: {Math.floor(Math.random() * 9000000 + 8000000).toLocaleString()}</div>
                  <div>PKT_OUT: {Math.floor(Math.random() * 5000000 + 4000000).toLocaleString()}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Segurança */}
          <div className="neon-border bg-card/30 p-6 space-y-4">
            <h3 className="text-sm text-destructive terminal-text tracking-widest border-b border-destructive/30 pb-2">
              SEGURANÇA E AMEAÇAS
            </h3>
            <div className="space-y-3 text-xs terminal-text">
              <div>
                <span className="text-muted-foreground">FIREWALL:</span>
                <div className="text-foreground mt-1 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  Cérbero v4.2: ATIVO
                </div>
              </div>
              <div>
                <span className="text-muted-foreground">IDS:</span>
                <div className="text-foreground mt-1">
                  Quebra-Gelo: Monitorando...
                </div>
              </div>
              <div>
                <span className="text-muted-foreground">TENTATIVAS DE INTRUSÃO:</span>
                <div className="text-destructive mt-1">
                  Bloqueados (última hora): {Math.floor(Math.random() * 8 + 2)}
                </div>
              </div>
              <div>
                <span className="text-muted-foreground">BANCO DE AMEAÇAS:</span>
                <div className="text-foreground mt-1">
                  Sincronizado 07.10.2225
                </div>
              </div>
              <div className="pt-2 border-t border-destructive/20">
                <div className="text-destructive text-[10px] animate-pulse">
                  ⚠ ALERTA: Rastreamento detectado da rede ExoCorp!
                </div>
              </div>
            </div>
          </div>

          {/* Hardware e Cyberware */}
          <div className="neon-border bg-card/30 p-6 space-y-4">
            <h3 className="text-sm text-primary terminal-text tracking-widest neon-glow border-b border-primary/30 pb-2">
              HARDWARE & CYBERWARE
            </h3>
            <div className="space-y-3 text-xs terminal-text">
              <div>
                <span className="text-muted-foreground">INTERFACE NEURAL:</span>
                <div className="text-primary mt-1">Link estável (Sincronizado)</div>
              </div>
              <div>
                <span className="text-muted-foreground">HARDWARE CONECTADO:</span>
                <div className="text-foreground mt-1 space-y-1 text-[10px]">
                  <div>→ Cyberdeck: FURY-X1</div>
                  <div>→ Drone "Espectro": Standby</div>
                  <div className="text-muted-foreground">→ Impressora 3D: Inativa</div>
                </div>
              </div>
              <div>
                <span className="text-muted-foreground">DIAGNÓSTICO CYBERWARE:</span>
                <div className="text-foreground mt-1 space-y-1 text-[10px]">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    Olho Kiroshi: Link 100%
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    Braço Arasaka: Bateria 92%
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    Conector Neural: Ótimo
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Energia */}
          <div className="neon-border bg-card/30 p-6 space-y-4">
            <h3 className="text-sm text-secondary terminal-text tracking-widest neon-glow-magenta border-b border-secondary/30 pb-2">
              GERENCIAMENTO DE ENERGIA
            </h3>
            <div className="space-y-3 text-xs terminal-text">
              <div>
                <span className="text-muted-foreground">FONTE PRIMÁRIA:</span>
                <div className="text-foreground mt-1">Rede Elétrica Municipal</div>
              </div>
              <div>
                <span className="text-muted-foreground">BACKUP:</span>
                <div className="text-foreground mt-1">
                  Célula de Lítio: 89% (3h 12m)
                </div>
              </div>
              <div>
                <span className="text-muted-foreground">CONSUMO ATUAL:</span>
                <div className="text-foreground mt-1">245W / 500W Max</div>
              </div>
              <div>
                <span className="text-muted-foreground">MODO:</span>
                <div className="text-primary mt-1">Performance Balanceado</div>
              </div>
            </div>
          </div>

          {/* Processos Ativos */}
          <div className="neon-border bg-card/30 p-6 space-y-4">
            <h3 className="text-sm text-primary terminal-text tracking-widest neon-glow border-b border-primary/30 pb-2">
              PROCESSOS ATIVOS
            </h3>
            <div className="space-y-2 text-[10px] terminal-text font-mono">
              <div className="flex justify-between">
                <span className="text-foreground">[001] matrix_browser.x</span>
                <span className="text-primary">OK</span>
              </div>
              <div className="flex justify-between">
                <span className="text-foreground">[002] ICE_guardian.x</span>
                <span className="text-secondary">RUN</span>
              </div>
              <div className="flex justify-between">
                <span className="text-destructive">[003] crack_suite_v12.x</span>
                <span className="text-destructive">45%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-foreground">[004] ghost_proxy.x</span>
                <span className="text-primary">SAFE</span>
              </div>
              <div className="flex justify-between">
                <span className="text-foreground">[005] comms_scrambler.x</span>
                <span className="text-secondary">ENC</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>[006] sys_monitor.x</span>
                <span>IDLE</span>
              </div>
            </div>
          </div>
        </div>

        {/* News Ticker */}
        <div className="mt-6 neon-border bg-destructive/10 p-3 overflow-hidden">
          <div className="text-[10px] terminal-text text-destructive whitespace-nowrap">
            ++ ExoCorp anuncia lucros recordes ++ Polícia de NY reprime protestos no Setor 3 ++ Novo vírus "Data-Krash" se espalha pela rede ++ Manifestações contra implantes obrigatórios crescem ++ ExoCorp nega acusações de vigilância em massa ++ Blackout no Setor 5 deixa milhares sem energia ++
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemStatusFullView;
