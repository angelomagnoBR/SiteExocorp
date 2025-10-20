import { useState, useRef } from 'react';
import { Lock } from 'lucide-react';

interface VideoViewProps {
  roseUnlocked?: boolean;
}

const VideoView = ({ roseUnlocked = false }: VideoViewProps) => {
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const videos = [
    { id: 1, title: 'Naufrágio_de_Navio_Detalhado.mp4', url: '/videos/Naufrágio_de_Navio_Detalhado.mp4', duration: '--:--', type: 'video', classified: false },
    { id: 2, title: 'Cyberpunk_Wanted_Video_Script.mp4', url: '/videos/Cyberpunk_Wanted_Video_Script.mp4', duration: '--:--', type: 'video', classified: false },
    { id: 3, title: 'ARQUIVO_SIGILOSO_ROSE.mp4', url: '/videos/Cyberpunk_Transformation_Video_Generation.mp4', duration: '--:--', type: 'video', classified: true },
    { id: 4, title: 'Cyberpunk_Laboratório_Corpos_Gigantes_em_Tubos.mp4', url: '/videos/Cyberpunk_Laboratório_Corpos_Gigantes_em_Tubos.mp4', duration: '--:--', type: 'video', classified: false },
    { id: 5, title: 'Criação_de_Vídeo_Instalação_Científica_Cyberpunk.mp4', url: '/videos/Criação_de_Vídeo_Instalação_Científica_Cyberpunk.mp4', duration: '--:--', type: 'video', classified: false },
    { id: 6, title: 'Denarao_cassino_nyx.mp3', url: '/audios/Denarao_cassino_nyx.mp3', duration: '--:--', type: 'audio', classified: false },
    { id: 7, title: 'Denaro_Campos.mp3', url: '/audios/Denaro_Campos.mp3', duration: '--:--', type: 'audio', classified: false },
    { id: 8, title: 'Vazamento_op_aurora.mp3', url: '/audios/Vazamento_op_aurora.mp3', duration: '--:--', type: 'audio', classified: false },
    { id: 9, title: 'Audio_vazado_operação_aurora.mp3', url: '/audios/Audio_vazado_operação_aurora.mp3', duration: '--:--', type: 'audio', classified: false },
    { id: 10, title: 'GRAVAÇÃO_SEGURANÇA_001.mp4', url: '', duration: '03:47', type: 'video', classified: false },
    { id: 11, title: 'INTERCEPTAÇÃO_ÁUDIO_002.mp4', url: '', duration: '12:33', type: 'audio', classified: false },
    { id: 12, title: 'VIGILÂNCIA_REMOTA_003.mp4', url: '', duration: '08:21', type: 'video', classified: false },
  ];

  const handleVideoSelect = (videoId: number) => {
    const video = videos.find(v => v.id === videoId);
    if (video?.classified && !roseUnlocked) {
      return; // Blocked if classified and not unlocked
    }
    if (video?.url) {
      setSelectedVideo(videoId);
    }
  };

  const currentVideo = videos.find(v => v.id === selectedVideo);

  return (
    <div className="p-8 h-full overflow-auto">
      <div className="mb-6">
        <h2 className="text-lg neon-glow terminal-text tracking-widest mb-2">
          // ARQUIVOS DE MÍDIA
        </h2>
        <p className="text-xs text-muted-foreground terminal-text">
          VÍDEOS E GRAVAÇÕES // NÍVEL DE ACESSO RESTRITO
        </p>
      </div>

      {/* Main media player */}
      <div className="neon-border bg-card/30 backdrop-blur-sm p-6 mb-6">
        <div className="aspect-video bg-input/50 flex items-center justify-center mb-4 relative overflow-hidden">
          {currentVideo ? (
            currentVideo.type === 'audio' ? (
              <div className="w-full flex flex-col items-center justify-center space-y-4">
                <div className="text-6xl text-primary mb-4 animate-pulse-neon">♪</div>
                <audio
                  ref={videoRef as any}
                  src={currentVideo.url}
                  controls
                  className="w-full max-w-md"
                />
              </div>
            ) : (
              <video
                ref={videoRef}
                src={currentVideo.url}
                controls
                className="w-full h-full object-contain"
              />
            )
          ) : (
            <div className="text-center">
              <div className="text-4xl text-primary mb-2 animate-pulse-neon">▶</div>
              <p className="text-sm text-muted-foreground terminal-text">
                [ PLAYER DE MÍDIA ]
              </p>
              <p className="text-xs text-muted-foreground terminal-text mt-2">
                Selecione um arquivo para reproduzir
              </p>
            </div>
          )}
        </div>
        {currentVideo && (
          <div className="text-center text-xs text-primary terminal-text tracking-wider">
            Reproduzindo: {currentVideo.title}
          </div>
        )}
      </div>

      {/* Video list */}
      <div className="space-y-3">
        {videos.map((video) => {
          const isLocked = video.classified && !roseUnlocked;
          
          return (
            <div
              key={video.id}
              onClick={() => handleVideoSelect(video.id)}
              className={`border p-4 transition-all group flex items-center justify-between ${
                selectedVideo === video.id
                  ? 'border-primary bg-primary/20 neon-border'
                  : isLocked
                  ? 'border-destructive/50 bg-destructive/10 cursor-not-allowed'
                  : 'border-primary/30 bg-card/20 hover:bg-card/40 cursor-pointer'
              } ${!video.url && !isLocked ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 flex items-center justify-center transition-all ${
                  isLocked 
                    ? 'bg-destructive/20 border border-destructive neon-border' 
                    : 'bg-input/50 neon-border-magenta group-hover:bg-secondary/20'
                }`}>
                  {isLocked ? (
                    <Lock className="text-destructive text-xl" />
                  ) : (
                    <span className="text-secondary text-xl">▶</span>
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className={`text-sm terminal-text tracking-wider ${
                      isLocked ? 'text-destructive' : 'text-foreground'
                    }`}>
                      {video.title}
                    </p>
                    {isLocked && (
                      <span className="text-[9px] text-destructive terminal-text border border-destructive px-2 py-0.5 animate-pulse">
                        SIGILOSO
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-muted-foreground terminal-text mt-1">
                    {isLocked 
                      ? 'ACESSO RESTRITO // AUTORIZAÇÃO NECESSÁRIA' 
                      : `REGISTRO: 2225.10.09 // DURAÇÃO: ${video.duration}`
                    }
                  </p>
                </div>
              </div>
              {video.url && !isLocked && (
                <div className="text-xs text-primary terminal-text opacity-0 group-hover:opacity-100 transition-opacity">
                  CARREGAR &gt;&gt;
                </div>
              )}
              {isLocked && (
                <div className="text-xs text-destructive terminal-text">
                  [ BLOQUEADO ]
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-6 p-4 neon-border bg-primary/10">
        <p className="text-xs text-primary terminal-text tracking-wider">
          ✓ ARQUIVOS CARREGADOS: {videos.filter(v => v.url).length} DE {videos.length} DISPONÍVEIS
        </p>
      </div>
    </div>
  );
};

export default VideoView;
