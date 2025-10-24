import { useState, useRef, useEffect } from 'react';
import { X, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient';

interface CommandTerminalProps {
  onCommand: (command: string) => boolean;
  onClose: () => void;
}

const CommandTerminal = ({ onCommand, onClose }: CommandTerminalProps) => {
  const [input, setInput] = useState('');
  const [errorCount, setErrorCount] = useState(0);
  const [showSecurityAlert, setShowSecurityAlert] = useState(false);
  const [history, setHistory] = useState<string[]>([
    '>>> EXOCORP TERMINAL INICIADO',
    '>>> SISTEMA DE COMANDO ATIVO',
    '>>> AGUARDANDO ENTRADA...',
    '>>> _ _ _',
  ]);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const historyEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    historyEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  // Play loud alert sound when security alert is triggered
  useEffect(() => {
    if (showSecurityAlert) {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // Create a loud, harsh alarm sound
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.frequency.setValueAtTime(400, audioContext.currentTime + 0.1);
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime + 0.2);
      oscillator.frequency.setValueAtTime(400, audioContext.currentTime + 0.3);
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime + 0.4);
      
      oscillator.type = 'sawtooth';
      gainNode.gain.setValueAtTime(0.8, audioContext.currentTime);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 1);
      
      // Cleanup
      setTimeout(() => {
        audioContext.close();
      }, 1500);
    }
  }, [showSecurityAlert]);

  const handleSecurityReboot = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate('/');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newHistory = [...history, `> ${input}`];
    const user = sessionStorage.getItem('user') || 'Usuário Desconhecido';
    const cmd = input.toLowerCase().trim();
    
    // Check for audit_log command
    if (cmd === 'audit_log') {
      newHistory.push('>>> CARREGANDO REGISTROS DE AUDITORIA...');
      newHistory.push('>>> _ _ _');
      
      try {
        const { data: logs, error } = await supabase
          .from('access_logs')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(20);
        
        if (error) throw error;
        
        if (logs && logs.length > 0) {
          newHistory.push('>>> ═══════════════════════════════════════════════════════════════');
          newHistory.push('>>>  AUDIT LOG - ÚLTIMOS 20 REGISTROS');
          newHistory.push('>>> ═══════════════════════════════════════════════════════════════');
          
          logs.forEach((log) => {
            const timestamp = new Date(log.created_at).toLocaleString('pt-BR', {
              dateStyle: 'short',
              timeStyle: 'medium',
            });
            newHistory.push(`>>> [${timestamp}] ${log.action_description}`);
          });
          
          newHistory.push('>>> ═══════════════════════════════════════════════════════════════');
          newHistory.push(`>>> TOTAL DE REGISTROS: ${logs.length}`);
        } else {
          newHistory.push('>>> NENHUM REGISTRO ENCONTRADO');
        }
      } catch (error) {
        console.error('Erro ao buscar logs:', error);
        newHistory.push('>>> ERRO AO CARREGAR REGISTROS DE AUDITORIA');
      }
      
      setHistory(newHistory);
      setInput('');
      setErrorCount(0);
      return;
    }
    
    // Log command to Supabase
    try {
      await supabase.from('access_logs').insert({
        action_description: `COMANDO TERMINAL - Usuário: ${user} - Comando: ${input}`
      });
    } catch (error) {
      console.error('Erro ao registrar comando:', error);
    }
    
    const commandExecuted = onCommand(input);
    
    if (commandExecuted) {
      newHistory.push('>>> COMANDO EXECUTADO COM SUCESSO');
      newHistory.push('>>> CARREGANDO DADOS...');
      setErrorCount(0); // Reset error count on successful command
    } else {
      const newErrorCount = errorCount + 1;
      setErrorCount(newErrorCount);
      newHistory.push('>>> ERRO: COMANDO NÃO RECONHECIDO');
      
      if (newErrorCount >= 5) {
        newHistory.push('>>> ALERTA DE SEGURANÇA: VIOLAÇÃO DE PROTOCOLO DETECTADA');
        newHistory.push('>>> INICIANDO REINICIALIZAÇÃO DO SISTEMA...');
        setShowSecurityAlert(true);
      }
    }

    setHistory(newHistory);
    setInput('');
  };

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-cyber-darker/95 backdrop-blur-sm">
      <div className="w-full max-w-4xl mx-4 neon-border bg-card/90 backdrop-blur-md">
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-primary/30 px-4 py-2 bg-primary/10">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-destructive animate-pulse" />
            <span className="text-xs terminal-text tracking-widest text-primary">
              EXOCORP COMMAND TERMINAL
            </span>
          </div>
          <Button
            onClick={onClose}
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0 hover:bg-destructive/20"
          >
            <X className="h-4 w-4 text-destructive" />
          </Button>
        </div>

        {/* Terminal Content */}
        <div className="p-6 h-96 overflow-auto bg-cyber-dark/80">
          <div className="space-y-1 font-mono text-sm">
            {history.map((line, i) => (
              <div
                key={i}
                className={`${
                  line.startsWith('>>>') 
                    ? 'text-primary' 
                    : line.includes('ERRO')
                    ? 'text-destructive'
                    : 'text-foreground/80'
                } terminal-text`}
              >
                {line}
              </div>
            ))}
            <div ref={historyEndRef} />
          </div>
        </div>

        {/* Terminal Input */}
        <form onSubmit={handleSubmit} className="border-t border-primary/30 p-4 bg-input/50">
          <div className="flex items-center gap-2">
            <span className="text-primary terminal-text neon-glow">&gt;</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-foreground terminal-text focus:ring-0"
              placeholder="digite um comando..."
              autoComplete="off"
            />
            <div className="w-2 h-4 bg-primary animate-pulse" />
          </div>
        </form>

      </div>

      {/* Security Alert Dialog */}
      <Dialog open={showSecurityAlert} onOpenChange={setShowSecurityAlert}>
        <DialogContent className="max-w-2xl border-destructive border-4 bg-destructive/10 backdrop-blur-md">
          <div className="flex flex-col items-center justify-center space-y-6 p-8">
            <AlertTriangle className="h-24 w-24 text-destructive animate-pulse" />
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold text-destructive terminal-text tracking-wider">
                ⚠ ALERTA DE SEGURANÇA ⚠
              </h2>
              <p className="text-xl text-destructive/90 terminal-text">
                VIOLAÇÃO DE PROTOCOLO DETECTADA
              </p>
              <p className="text-lg text-muted-foreground terminal-text">
                System Reboot Initiated...
              </p>
            </div>
            <Button
              onClick={handleSecurityReboot}
              variant="destructive"
              size="lg"
              className="terminal-text text-lg px-8 animate-pulse"
            >
              [ REINICIAR SISTEMA ]
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CommandTerminal;
