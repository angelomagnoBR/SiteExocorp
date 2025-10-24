import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Camera, Video, LogOut, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DossierView from '@/components/database/DossierView';
import GalleryView from '@/components/database/GalleryView';
import VideoView from '@/components/database/VideoView';
import NexusView from '@/components/database/NexusView';
import CommandTerminal from '@/components/database/CommandTerminal';
import SystemStatus from '@/components/database/SystemStatus';
import SystemStatusFullView from '@/components/database/SystemStatusFullView';
import AuditLogView from '@/components/database/AuditLogView';

type ViewType = 'dossier' | 'gallery' | 'video' | 'nexus' | 'system-status' | null;

const Database = () => {
  const [activeView, setActiveView] = useState<ViewType>(null);
  const [showTerminal, setShowTerminal] = useState(false);
  const [showAuditLog, setShowAuditLog] = useState(false);
  const [roseUnlocked, setRoseUnlocked] = useState(false);
  const [vendettaStage, setVendettaStage] = useState<'idle' | 'confirmed' | 'loading'>('idle');
  const commandQueueRef = useRef<string[]>([]);
  const navigate = useNavigate();

  const handleCommand = (command: string) => {
    const cmd = command.toLowerCase().trim();
    
    // PISTA 2: Comando LIA - Revela o coelho branco na galeria
    if (cmd === 'lia') {
      import('@/lib/argProgress').then(({ registrarPistaEncontrada, podeMostrarPista }) => {
        // Só registra se PISTA 1 foi completada (leu o dossiê da Lia)
        if (podeMostrarPista('COELHO')) {
          registrarPistaEncontrada('COELHO');
          setActiveView('gallery');
          setShowTerminal(false);
        }
      });
      return true;
    }
    
    // PISTA 6: Comando VENDETTA - Abre o jogo
    if (cmd === 'vendetta' || cmd === 'remember') {
      import('@/lib/argProgress').then(({ registrarPistaEncontrada, isJogoDesbloqueado }) => {
        registrarPistaEncontrada('VENDETTA');
        
        if (isJogoDesbloqueado()) {
          setVendettaStage('confirmed');
          setShowTerminal(false);
          
          // Aguardar 1 segundo antes de mostrar o loading
          setTimeout(() => {
            setVendettaStage('loading');
            
            // Aguardar 3 segundos de animação antes de navegar
            setTimeout(() => {
              navigate('/game');
            }, 3000);
          }, 1000);
        }
      });
      return true;
    }
    
    // Check for audit_log command
    if (cmd === 'audit_log') {
      setShowAuditLog(true);
      setShowTerminal(false);
      return true;
    }
    
    // Check for Rose command
    if (cmd === 'rose') {
      setRoseUnlocked(true);
      setActiveView('video');
      setShowTerminal(false);
      return true;
    }
    
    // Map commands to their respective reports
    const commandMap: { [key: string]: string } = {
      'nexus': 'nexus',
      'lia': 'lia',
      'neia campos': 'neia campos',
      'neia': 'neia campos', // Alias
      'apex': 'apex',
      'amanda backer': 'amanda backer',
      'amaya backer': 'amanda backer', // Alias for updated name
      'amaya': 'amanda backer', // Short alias
      'amanda': 'amanda backer', // Short alias
      'bobby': 'bobby',
      'bobby huey': 'bobby', // Full name alias
      'javier montoya': 'javier montoya',
      'javier': 'javier montoya', // Short alias
      'el aguila': 'javier montoya', // Codename alias
      'aguila': 'javier montoya', // Codename short
      'rocco': 'rocco',
      'inferno': 'rocco', // Codename alias
      // New secret commands
      'b42b424': 'b42b424',
      '4l1550n': '4l1550n',
      '24f43l': '24f43l',
      '4l3x4nd23': '4l3x4nd23',
      'v1ct02': 'v1ct02',
      'c4b3ç4': 'c4b3ç4',
      'c4b3ca': 'c4b3ç4', // Alias without cedilla
      'x4l3h': 'x4l3h',
    };
    
    if (commandMap[cmd]) {
      const reportName = commandMap[cmd];
      // Navigate to the specific report
      navigate(`/database?report=${encodeURIComponent(reportName)}`);
      setActiveView('nexus');
      setShowTerminal(false);
      return true;
    }
    
    return false;
  };

  useEffect(() => {
    // Check authentication
    const auth = sessionStorage.getItem('auth');
    if (!auth) {
      navigate('/');
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem('auth');
    navigate('/');
  };

  const menuItems = [
    { id: 'dossier' as ViewType, label: '// DOSSIÊS DE PESSOAL', icon: FileText },
    { id: 'gallery' as ViewType, label: '// REGISTROS DE VIGILÂNCIA', icon: Camera },
    { id: 'video' as ViewType, label: '// ARQUIVOS DE MÍDIA', icon: Video },
  ];

  return (
    <div className="min-h-screen bg-cyber-darker relative overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 cyber-grid opacity-10" />

      {/* Header */}
      <header className="relative z-20 border-b border-primary/30 bg-card/50 backdrop-blur-sm">
        <div className="px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold neon-glow tracking-widest font-['Orbitron']">
              EXOCORP
            </h1>
            <p className="text-[10px] text-secondary neon-glow-magenta terminal-text tracking-[0.2em]">
              DATA-HUB PRIVADO
            </p>
            <p className="text-[9px] text-muted-foreground terminal-text tracking-[0.3em] mt-0.5">
              NÓ 847-OMEGA // NYC-2225
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => setShowTerminal(!showTerminal)}
              variant="outline"
              size="sm"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground terminal-text"
            >
              <Terminal className="mr-2 h-4 w-4" />
              TERMINAL
            </Button>
            <Button
              onClick={handleLogout}
              variant="outline"
              size="sm"
              className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground terminal-text"
            >
              <LogOut className="mr-2 h-4 w-4" />
              DESCONECTAR
            </Button>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-73px)]">
        {/* Sidebar */}
        <aside className="w-80 border-r border-primary/30 bg-card/30 backdrop-blur-sm relative z-10">
          <div className="p-6">
            <h2 className="text-xs text-primary terminal-text tracking-widest mb-6 neon-glow">
              DIRETÓRIOS DE SISTEMA
            </h2>
            <nav className="space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveView(item.id)}
                  className={`w-full text-left px-4 py-3 terminal-text text-sm tracking-wider transition-all ${
                    activeView === item.id
                      ? 'bg-primary/20 neon-border text-primary'
                      : 'border border-transparent hover:border-primary/50 hover:bg-primary/5 text-muted-foreground'
                  }`}
                >
                  <item.icon className="inline-block w-4 h-4 mr-3" />
                  {item.label}
                </button>
              ))}
            </nav>

            {/* System info */}
            <div className="mt-12">
              <SystemStatus onOpenFull={() => setActiveView('system-status')} />
            </div>
          </div>
        </aside>

        {/* Main content area */}
        <main className="flex-1 overflow-auto relative z-10">
          {showAuditLog ? (
            <AuditLogView onClose={() => setShowAuditLog(false)} />
          ) : (
            <>
              {showTerminal && (
                <CommandTerminal 
                  onCommand={handleCommand}
                  onClose={() => setShowTerminal(false)}
                />
              )}
              
              {!activeView && (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl text-primary/20 mb-4 animate-pulse-neon">
                  [ Ξ ]
                </div>
                <p className="text-muted-foreground terminal-text tracking-widest">
                  SELECIONE UM DIRETÓRIO PARA ACESSAR
                </p>
                <p className="text-xs text-muted-foreground/50 terminal-text mt-4">
                  OU USE O TERMINAL PARA COMANDOS ESPECIAIS
                </p>
              </div>
            </div>
          )}

          {activeView === 'dossier' && <DossierView />}
          {activeView === 'gallery' && <GalleryView />}
          {activeView === 'video' && <VideoView roseUnlocked={roseUnlocked} />}
          {activeView === 'nexus' && <NexusView />}
          {activeView === 'system-status' && (
            <SystemStatusFullView onClose={() => setActiveView(null)} />
          )}
            </>
          )}
        </main>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-0 left-0 w-24 h-24 border-l-2 border-t-2 border-primary/20 pointer-events-none z-0" />
      <div className="absolute bottom-0 right-0 w-24 h-24 border-r-2 border-b-2 border-secondary/20 pointer-events-none z-0" />

      {/* Tela de transição VENDETTA */}
      {vendettaStage !== 'idle' && (
        <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center">
          <div className="text-center space-y-8 animate-fade-in">
            {vendettaStage === 'confirmed' && (
              <>
                <div className="text-8xl mb-8 animate-pulse">🎭</div>
                <p className="text-3xl text-primary terminal-text tracking-widest neon-glow animate-pulse">
                  VENDETTA
                </p>
                <p className="text-sm text-muted-foreground terminal-text italic">
                  "Remember, remember..."
                </p>
              </>
            )}
            
            {vendettaStage === 'loading' && (
              <>
                <div className="text-6xl mb-8">
                  <div className="inline-block animate-spin">☢️</div>
                </div>
                <p className="text-2xl text-primary terminal-text tracking-widest neon-glow mb-8">
                  INICIANDO SIMULAÇÃO DE COMBATE
                </p>
                
                <div className="w-96 h-2 bg-input/30 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-primary to-secondary animate-loading-bar" />
                </div>
                
                <div className="space-y-2 text-xs text-muted-foreground terminal-text mt-8">
                  <p className="animate-pulse">▶ Carregando matriz de combate...</p>
                  <p className="animate-pulse" style={{ animationDelay: '0.5s' }}>▶ Verificando credenciais revolucionárias...</p>
                  <p className="animate-pulse" style={{ animationDelay: '1s' }}>▶ Conectando ao NEXUS...</p>
                  <p className="animate-pulse" style={{ animationDelay: '1.5s' }}>▶ "Ideas are bulletproof."</p>
                </div>
                
                <p className="text-lg text-secondary terminal-text mt-12 neon-glow">
                  BEM-VINDO À RESISTÊNCIA
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Database;
