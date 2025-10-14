import { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CommandTerminalProps {
  onCommand: (command: string) => boolean;
  onClose: () => void;
}

const CommandTerminal = ({ onCommand, onClose }: CommandTerminalProps) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([
    '>>> EXOCORP TERMINAL INICIADO',
    '>>> COMANDOS DISPONÍVEIS:',
    '>>> nexus | lia | neia | apex | amanda | bobby | javier | rocco',
    '>>> _ _ _',
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const historyEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    historyEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newHistory = [...history, `> ${input}`];
    
    const commandExecuted = onCommand(input);
    
    if (commandExecuted) {
      newHistory.push('>>> COMANDO EXECUTADO COM SUCESSO');
      newHistory.push('>>> CARREGANDO DADOS...');
    } else {
      newHistory.push('>>> ERRO: COMANDO NÃO RECONHECIDO');
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
    </div>
  );
};

export default CommandTerminal;
