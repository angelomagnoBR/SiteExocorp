import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import DigitalRain from '@/components/DigitalRain';

const Login = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Specific credentials validation (case-insensitive)
    if (userId.toLowerCase() === 'denaro' && password === '569437') {
      // Store auth in sessionStorage for this fictional system
      sessionStorage.setItem('auth', 'authenticated');
      sessionStorage.setItem('user', userId);
      navigate('/database');
    } else {
      setError('>>> ERRO DE AUTENTICAÇÃO: CREDENCIAIS INCORRETAS');
      setTimeout(() => setError(''), 3000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-cyber-darker">
      <DigitalRain />
      
      {/* Scanline effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="h-1 w-full bg-gradient-to-b from-transparent via-primary/30 to-transparent animate-scan" />
      </div>

      {/* Grid background */}
      <div className="absolute inset-0 cyber-grid opacity-20" />

      <div className="relative z-10 w-full max-w-md px-6">
        {/* Logo/Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold neon-glow mb-2 tracking-widest font-['Orbitron'] animate-pulse-neon">
            EXOCORP
          </h1>
          <div className="text-sm text-secondary neon-glow-magenta tracking-[0.2em] mb-2">
            DATA-HUB PRIVADO
          </div>
          <p className="text-xs text-muted-foreground terminal-text tracking-[0.3em]">
            NODO SEGURO // ACESSO RESTRITO
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="neon-border bg-card/50 backdrop-blur-sm p-8 rounded-sm">
            <div className="space-y-6">
              <div>
                <label className="text-xs text-primary terminal-text block mb-2 tracking-widest">
                  ID DE USUÁRIO
                </label>
                <Input
                  type="text"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  className="bg-input border-primary/50 text-foreground terminal-text focus:neon-border focus:ring-0 transition-all"
                  placeholder="_ _ _ _ _ _ _ _"
                />
              </div>

              <div>
                <label className="text-xs text-primary terminal-text block mb-2 tracking-widest">
                  SENHA DE ACESSO
                </label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-input border-primary/50 text-foreground terminal-text focus:neon-border focus:ring-0 transition-all"
                  placeholder="* * * * * * * *"
                />
              </div>

              {error && (
                <div className="neon-border-magenta bg-destructive/10 p-3 rounded-sm">
                  <p className="text-xs text-destructive terminal-text animate-flicker">
                    {error}
                  </p>
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/80 text-primary-foreground neon-glow terminal-text tracking-widest transition-all hover:scale-[1.02]"
              >
                [ AUTENTICAR &gt;&gt; ]
              </Button>
            </div>
          </div>
        </form>

        {/* Bottom text */}
        <p className="text-center mt-6 text-[10px] text-muted-foreground/50 terminal-text tracking-widest">
          EXOCORP SYSTEMS // NOVA YORK 2225
        </p>
        <p className="text-center mt-2 text-[9px] text-destructive/30 terminal-text">
          UNAUTHORIZED ACCESS IS PROHIBITED
        </p>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-4 left-4 w-16 h-16 border-l-2 border-t-2 border-primary/30" />
      <div className="absolute top-4 right-4 w-16 h-16 border-r-2 border-t-2 border-secondary/30" />
      <div className="absolute bottom-4 left-4 w-16 h-16 border-l-2 border-b-2 border-secondary/30" />
      <div className="absolute bottom-4 right-4 w-16 h-16 border-r-2 border-b-2 border-primary/30" />
    </div>
  );
};

export default Login;
