import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { podeMostrarPista, registrarPistaEncontrada } from '@/lib/argProgress';
import { toast } from 'sonner';

const GalleryView = () => {
  const [showEncryptedText, setShowEncryptedText] = useState(false);
  const [showWhiteRabbit, setShowWhiteRabbit] = useState(false);
  const [showRabbitDialog, setShowRabbitDialog] = useState(false);

  useEffect(() => {
    // Verificar se deve mostrar o coelho branco (PISTA 2)
    // Agora verifica se comando LIA foi digitado
    const argProgress = localStorage.getItem('exocorp_arg_progress');
    if (argProgress) {
      const progress = JSON.parse(argProgress);
      // Coelho aparece se LIA foi digitada (COELHO pista desbloqueada)
      setShowWhiteRabbit(progress.pistasEncontradas?.includes('COELHO'));
    }
  }, []);

  const handleRabbitClick = () => {
    // Registrar que o coelho foi encontrado
    registrarPistaEncontrada('COELHO');
    setShowRabbitDialog(true);
    
    toast.success('Pista Encontrada!', {
      description: 'Você seguiu o coelho branco...',
    });
  };
  
  const surveillanceImages = [
    { id: 1, title: 'SETOR_CRESCIMENTO.webp', url: '/images/Setor_de_Crescimento.webp' },
    { id: 2, title: 'LANTERNA_VERMELHA.jpeg', url: '/images/Lanterna_Vermelha.jpeg' },
    { id: 3, title: 'FESTA_PURPLE_FANG.png', url: '/images/Festa_purple_fang.png' },
    { id: 4, title: 'PLANTA_HOLOGRÁFICA.webp', url: '/images/Planta_holografaica.webp' },
    { id: 5, title: 'CYBERPUNK_CHARACTERS.webp', url: '/images/Cyberpunk_Characters_Lineup.webp' },
    { id: 6, title: 'RITUAL_AGHORIS.webp', url: '/images/Cyberpunk_Aghoris_Ritual.webp' },
    { id: 7, title: 'CAMINHANTES_VAZIO.webp', url: '/images/Caminhantes_do_Vazio.webp' },
    { id: 8, title: 'FADE_TO_BLACK.webp', url: '/images/Fade_to_Black.webp' },
    { id: 9, title: 'NEIA_CAMPOS.webp', url: '/images/NPC_-_Neya_Campos.webp', encrypted: true },
    { id: 10, title: 'FABRICA_HUMANOS_2.webp', url: '/images/Fabrica_de_Humanos_2.webp' },
  ];

  const handleImageClick = (img: typeof surveillanceImages[0]) => {
    if (img.encrypted) {
      setShowEncryptedText(true);
    }
  };

  return (
    <div className="p-8 h-full overflow-auto">
      <div className="mb-6">
        <h2 className="text-lg neon-glow terminal-text tracking-widest mb-2">
          // REGISTROS DE VIGILÂNCIA
        </h2>
        <p className="text-xs text-muted-foreground terminal-text">
          IMAGENS CAPTURADAS // ALTO NÍVEL DE SEGURANÇA
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {surveillanceImages.map((img) => (
          <div
            key={img.id}
            onClick={() => handleImageClick(img)}
            className="neon-border bg-card/30 backdrop-blur-sm p-4 hover:bg-card/50 transition-all cursor-pointer group"
          >
            <div className="aspect-video bg-input/50 flex items-center justify-center mb-4 relative overflow-hidden">
              <img 
                src={img.url} 
                alt={img.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              {img.encrypted && (
                <div className="absolute top-2 right-2 px-2 py-1 bg-destructive/90 text-destructive-foreground text-[10px] terminal-text font-bold">
                  ENCRYPTED
                </div>
              )}
            </div>
            <p className="text-xs text-primary terminal-text tracking-wider">
              {img.title}
            </p>
            <p className="text-[10px] text-muted-foreground terminal-text mt-1">
              CAPTURA: 2225.10.09 // 03:47:23
            </p>
          </div>
        ))}

        {/* PISTA 2: Coelho Branco Cyberpunk (Aparece após digitar LIA no terminal) */}
        {showWhiteRabbit && (
          <div
            onClick={handleRabbitClick}
            className="neon-border bg-card/30 backdrop-blur-sm p-4 hover:bg-card/50 transition-all cursor-pointer group relative overflow-hidden"
          >
            <div className="aspect-video bg-black flex items-center justify-center mb-4 relative overflow-hidden">
              {/* Coelho Cyberpunk SVG Estilizado */}
              <div className="w-full h-full relative flex items-center justify-center bg-gradient-to-br from-cyan-950 via-purple-950 to-black">
                {/* Grid Cyberpunk */}
                <div className="absolute inset-0 opacity-20" style={{
                  backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(0, 255, 255, .3) 25%, rgba(0, 255, 255, .3) 26%, transparent 27%, transparent 74%, rgba(0, 255, 255, .3) 75%, rgba(0, 255, 255, .3) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(0, 255, 255, .3) 25%, rgba(0, 255, 255, .3) 26%, transparent 27%, transparent 74%, rgba(0, 255, 255, .3) 75%, rgba(0, 255, 255, .3) 76%, transparent 77%, transparent)',
                  backgroundSize: '50px 50px'
                }} />
                
                {/* Coelho com efeito neon */}
                <div className="relative z-10 text-center">
                  <div className="text-9xl filter drop-shadow-[0_0_30px_rgba(0,255,255,0.8)] animate-pulse" style={{
                    textShadow: '0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 30px #00ffff, 0 0 40px #ff00ff, 0 0 70px #ff00ff, 0 0 80px #ff00ff, 0 0 100px #ff00ff'
                  }}>
                    🐰
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="bg-black/80 backdrop-blur-sm px-6 py-3 border-2 border-cyan-500 rounded">
                      <span className="text-2xl text-cyan-400 terminal-text tracking-widest font-bold" style={{
                        textShadow: '0 0 10px #00ffff'
                      }}>
                        FOLLOW ME
                      </span>
                    </div>
                  </div>
                </div>

                {/* Scanlines effect */}
                <div className="absolute inset-0 pointer-events-none opacity-10" style={{
                  background: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.15), rgba(0,0,0,0.15) 1px, transparent 1px, transparent 2px)'
                }} />

                {/* Glitch effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-magenta-500/10 animate-pulse" />
              </div>
              
              <div className="absolute top-2 right-2 px-3 py-1 bg-gradient-to-r from-cyan-500 to-magenta-500 text-black text-[10px] terminal-text font-bold animate-pulse">
                [ANOMALIA DETECTADA]
              </div>
              <div className="absolute top-2 left-2 px-2 py-1 border border-cyan-500 bg-cyan-500/10 text-cyan-400 text-[9px] terminal-text font-bold">
                CLASSIFIED
              </div>
            </div>
            <p className="text-xs text-cyan-400 terminal-text tracking-wider animate-pulse" style={{
              textShadow: '0 0 10px rgba(0,255,255,0.5)'
            }}>
              WHITE_RABBIT.CYBR
            </p>
            <p className="text-[10px] text-cyan-600/70 terminal-text mt-1">
              CAPTURA: 1999.03.31 // 00:08:43 // [ENCRYPTED]
            </p>
          </div>
        )}
      </div>

      <div className="mt-6 p-4 neon-border bg-primary/10">
        <p className="text-xs text-primary terminal-text tracking-wider">
          ✓ {surveillanceImages.length} IMAGENS DE VIGILÂNCIA CARREGADAS
        </p>
      </div>

      <Dialog open={showEncryptedText} onOpenChange={setShowEncryptedText}>
        <DialogContent className="max-w-4xl max-h-[80vh] bg-background/95 backdrop-blur-sm border-primary">
          <DialogHeader>
            <DialogTitle className="text-destructive terminal-text tracking-widest">
              [DOCUMENTO CRIPTOGRAFADO - NEIA CAMPOS]
            </DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-[60vh] w-full pr-4">
            <pre className="text-xs terminal-text text-muted-foreground whitespace-pre-wrap font-mono">
              {`ORJ.08 [UHODWÓULR_GH_OHDOGDGH_QHLD]

WÍWXOR: Dydoldçãr Frpsruwdphqwdo gd Frplvváuld Fdpsrv

FODVVLILFDÇÃR: DOSKD-VRPEUD / DOWR ULVFR

GDWD GD DYDOLDÇÃR: 2225.10.19

Vxpáulr Hahfxwlyr:

D Frplvváuld gh Sroífld Qhld Fdpsrv dsuhvhqwd ghvylrv frpsruwdphqwdlv h gh frpxqlfdçãr txh hafhghp dv pdujhqv gh wrohuâqfld dfhlwáyhlv. D ohdogdgh gr dwlyr, hperud fuxfldo sdud d hvwdelolcdçãr gd Crqd 7 (Flgdgh Edlad), é frqvlghudgd frpsurphwlgd.

Dqáolvh Ghwdokdgd:

1. Ghvylr gh Urwd: Irl ghwhfwdgr xp ghvylr qãr dxwrulcdgr qdv urwdv gh sdwuxokd prqlwrudgdv shod Xqlgdgh gh Yljloâqfld. Fdpsrv xwlolcrx urwdv vhfxqgáuldv, qãr uhjlvwudgdv qr Surwrfror Sdguãr gh Hahfxçãr (SSH), hp wuêv rfdvlõhv glvwlqwdv qdv úowlpdv 48 krudv. D dqáolvh grv ghvylrv vxjhuh hqfrqwurv glvfuhwrv frp hqwlgdghv qãr lghqwlilfdgdv.

2. Frpxqlfdçõhv Fliudgdv: Lqwhufhswdçãr gh xp sdguãr gh frpxqlfdçãr qãr-sdguãr. Fdpsrv xwlolcrx xp surwrfror gh fulswrjudild revrohwr, pdv dowdphqwh frpsohar, sdud frqwdwrv hawhuqrv. R frqwhúgr gdv frpxqlfdçõhv shupdqhfh lohjíyho, pdv d dçãr gh rfxowdçãr shu vh é xp vlqdo gh dohuwd gh Qíyho 3.

3. Klsówhvh gh Frqwuroh Hawhuqr: D shuirupdqfh hilflhqwh gh Fdpsrv hp ghvpdqwhodu d lqiudhvwuxwxud gh jdqjxhv é qrwáyho. Qr hqwdqwr, vxd dvfhqvãr phwhóulfd h d surqwlgãr sdud djlu vxjhuhp xpd prwlydçãr txh wudqvfhqgh d phud dpelçãr. D sulqflsdo klsówhvh é txh d Frplvváuld hvwhmd vhqgr frqwurodgd, rx hvwhmd hp doldqçd, frp xpd hqwlgdgh frusrudwlyd ulydo.

Frqfoxvãr:

D Frplvváuld Fdpsrv é xpd ihuudphqwd srghurvd, pdv lqvwáyho. Hod qãr é pdlv frqvlghudgd xpd djhqwh gh frqildqçd lqwhjudo. D vxd hilfáfld hp holplqdu d uhvlvwêqfld é vhfxqgáuld dr ulvfr txh hod uhsuhvhqwd sdud d khjhprqld gr Dutxlwhwr.

Uhfrphqgdçãr:

Lqwhqvlilfdu d yljloâqfld gh Qíyho Doskd. Pdqwhu r dwlyr rshudflrqdo sdud fxpsulu d djhqgd gh sdflilfdçãr, pdv suhsdudu xp Surwrfror gh Qhxwudolcdçãr gh Hphujêqfld (SQH) sdud vhu hahfxwdgr qr prphqwr hp txh vhx dolqkdphqwr hawhuqr iru frqilupdgr. D txhgd gh S. Gl qãr srgh deulu fdplqkr sdud r grpíqlr gh xp ulydo.`}
            </pre>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* Diálogo do Coelho Branco (PISTA 2) */}
      <Dialog open={showRabbitDialog} onOpenChange={setShowRabbitDialog}>
        <DialogContent className="max-w-2xl bg-background/95 backdrop-blur-sm border-primary">
          <DialogHeader>
            <DialogTitle className="text-primary terminal-text tracking-widest text-center text-2xl">
              🐰 VOCÊ ENCONTROU O COELHO
            </DialogTitle>
          </DialogHeader>
          <div className="p-6 space-y-4">
            <p className="text-center text-sm text-cyan-400 terminal-text mb-4">
              Comando LIA executado com sucesso.
            </p>
            <p className="text-center text-lg text-foreground terminal-text">
              Bem-vindo ao próximo nível.
            </p>
            
            <div className="neon-border bg-card/30 p-6 space-y-4">
              <p className="text-sm text-muted-foreground terminal-text">
                Morpheus ofereceu duas opções a Neo.
              </p>
              <p className="text-sm text-foreground terminal-text">
                Uma escolha que define tudo:
              </p>
              
              <div className="flex justify-center gap-8 py-4">
                <div className="text-center">
                  <div className="text-4xl mb-2">🔴</div>
                  <p className="text-xs text-destructive terminal-text">Verdade dolorosa</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-2">🔵</div>
                  <p className="text-xs text-primary terminal-text">Ilusão confortável</p>
                </div>
              </div>
              
              <div className="border-t border-primary/30 pt-4">
                <p className="text-center text-sm text-primary terminal-text neon-glow">
                  Volte para onde tudo começou.
                </p>
                <p className="text-center text-xs text-secondary terminal-text mt-2">
                  A ESCOLHA te espera na entrada.
                </p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GalleryView;
