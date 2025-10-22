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

  const logAction = async (actionDescription: string) => {
    try {
      await supabase.from('access_logs').insert({
        timestamp: new Date().toISOString(),
        user_id: 'CONSOLE_USER',
        action_description: actionDescription,
      });
    } catch (error) {
      console.error('Failed to log action:', error);
    }
  };

  const handleSecurityReboot = () => {
    logAction('SECURITY_BREACH: 5 failed attempts. System reboot.');
    localStorage.clear();
    sessionStorage.clear();
    navigate('/');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newHistory = [...history, `> ${input}`];
    
    const commandExecuted = onCommand(input);
    
    if (commandExecuted) {
      logAction(`TERMINAL_ACCESS_GRANTED: Executed command: ${input}`);
      newHistory.push('>>> COMANDO EXECUTADO COM SUCESSO');
      newHistory.push('>>> CARREGANDO DADOS...');
      setErrorCount(0); // Reset error count on successful command
    } else {
      logAction('TERMINAL_ACCESS_DENIED: Invalid command attempt.');
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
