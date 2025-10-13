import { useState, useEffect } from 'react';
import { Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SystemStatusProps {
  onOpenFull?: () => void;
}

const SystemStatus = ({ onOpenFull }: SystemStatusProps) => {
  const [uptime, setUptime] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [cpuLoad, setCpuLoad] = useState(45);
  const [memoryUsage, setMemoryUsage] = useState(12.7);
  const [coreTemp, setCoreTemp] = useState(62);
  const [latency, setLatency] = useState(14);

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
  );
};

export default SystemStatus;
