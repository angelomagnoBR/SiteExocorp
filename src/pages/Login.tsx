import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import DigitalRain from '@/components/DigitalRain';
import { supabase } from '@/lib/supabaseClient';
import { podeMostrarPista, registrarPistaEncontrada } from '@/lib/argProgress';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';

const Login = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPills, setShowPills] = useState(false);
  const [showPillDialog, setShowPillDialog] = useState(false);
  const [pillChoice, setPillChoice] = useState<'red' | 'blue' | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar se deve mostrar as pílulas (PISTA 3)
    setShowPills(podeMostrarPista('PILULA'));
  }, []);

  const handlePillClick = (pill: 'red' | 'blue') => {
    setPillChoice(pill);
    setShowPillDialog(true);
    
    if (pill === 'red') {
      registrarPistaEncontrada('PILULA');
      toast.success('Pista Encontrada!', {
        description: 'Você escolheu a verdade...',
      });
    } else {
      toast.error('Escolha Errada', {
        description: 'A história termina aqui...',
      });
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Specific credentials validation (case-insensitive)
    if (userId.toLowerCase() === 'denaro' && (password === '569437' || password === '1722')) {
      // Store auth in sessionStorage for this fictional system
      sessionStorage.setItem('auth', 'authenticated');
      sessionStorage.setItem('user', userId);
      
      // Log login event to Supabase
      try {
        await supabase.from('access_logs').insert({
          action_description: `LOGIN - Usuário: ${userId}`
        });
      } catch (error) {
        console.error('Erro ao registrar login:', error);
      }
      
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

      {/* PISTA 3: Pílulas (Aparece após encontrar PISTA 2) */}
      {showPills && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex gap-12 z-50 animate-pulse">
          <button
            onClick={() => handlePillClick('red')}
            className="group relative"
            title="Pílula Vermelha - Verdade"
          >
            <div className="w-16 h-16 rounded-full bg-red-500 hover:bg-red-600 transition-all hover:scale-110 shadow-lg shadow-red-500/50 flex items-center justify-center">
              <span className="text-3xl">🔴</span>
            </div>
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
              <p className="text-xs text-destructive terminal-text whitespace-nowrap neon-glow">VERDADE</p>
            </div>
          </button>

          <button
            onClick={() => handlePillClick('blue')}
            className="group relative"
            title="Pílula Azul - Ilusão"
          >
            <div className="w-16 h-16 rounded-full bg-blue-500 hover:bg-blue-600 transition-all hover:scale-110 shadow-lg shadow-blue-500/50 flex items-center justify-center">
              <span className="text-3xl">🔵</span>
            </div>
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
              <p className="text-xs text-primary terminal-text whitespace-nowrap neon-glow">ILUSÃO</p>
            </div>
          </button>
        </div>
      )}

      {/* Diálogo das Pílulas */}
      <Dialog open={showPillDialog} onOpenChange={setShowPillDialog}>
        <DialogContent className="max-w-2xl bg-background/95 backdrop-blur-sm border-primary">
          <DialogHeader>
            <DialogTitle className="text-primary terminal-text tracking-widest text-center text-2xl">
              {pillChoice === 'red' ? '🔴 A VERDADE' : '🔵 A ILUSÃO'}
            </DialogTitle>
          </DialogHeader>
          <div className="p-6 space-y-4">
            {pillChoice === 'red' ? (
              <>
                <p className="text-center text-lg text-primary terminal-text neon-glow">
                  Você escolheu a VERDADE.
                </p>
                
                <div className="neon-border bg-card/30 p-6 space-y-4">
                  <p className="text-sm text-muted-foreground terminal-text italic">
                    'Eu posso apenas te mostrar a porta.
                    <br />
                    Você é quem tem que atravessá-la.'
                  </p>
                  
                  <div className="border-t border-primary/30 pt-4 space-y-3">
                    <p className="text-sm text-foreground terminal-text">
                      A porta está no <span className="text-primary neon-glow">DATABASE</span>.
                    </p>
                    <p className="text-sm text-foreground terminal-text">
                      Mas ela está TRANCADA.
                    </p>
                    
                    <div className="bg-input/50 p-4 rounded my-4">
                      <p className="text-center text-2xl text-primary terminal-text tracking-widest neon-glow font-bold">
                        "Alguns números muito famosos te darão o acesso. Eles já foram um grande mistério e também a sorte grande!"
                      </p>
                    </div>
                    
                    <p className="text-sm text-secondary terminal-text text-center">
                      Os números são a chave.
                    </p>
                    <p className="text-xs text-muted-foreground terminal-text text-center">
                      Procure o que eles protegem.
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <>
                <p className="text-center text-lg text-muted-foreground terminal-text">
                  Você escolheu a ilusão.
                </p>
                
                <div className="neon-border bg-card/30 p-6 space-y-4">
                  <p className="text-sm text-muted-foreground terminal-text text-center">
                    A história termina aqui.
                  </p>
                  <p className="text-sm text-muted-foreground terminal-text text-center">
                    Você acorda na sua cama e acredita no que quiser.
                  </p>
                  
                  <div className="border-t border-destructive/30 pt-4">
                    <p className="text-xs text-destructive/70 terminal-text text-center">
                      Volte quando estiver pronto para a verdade.
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Login;
