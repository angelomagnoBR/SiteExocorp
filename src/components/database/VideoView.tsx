import { useState, useRef } from 'react';

const VideoView = () => {
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const videos = [
    { id: 1, title: 'Naufrágio_de_Navio_Detalhado.mp4', url: '/videos/Naufrágio_de_Navio_Detalhado.mp4', duration: '--:--' },
    { id: 2, title: 'Cyberpunk_Wanted_Video_Script.mp4', url: '/videos/Cyberpunk_Wanted_Video_Script.mp4', duration: '--:--' },
    { id: 3, title: 'Cyberpunk_Transformation_Video_Generation.mp4', url: '/videos/Cyberpunk_Transformation_Video_Generation.mp4', duration: '--:--' },
    { id: 4, title: 'GRAVAÇÃO_SEGURANÇA_001.mp4', url: '', duration: '03:47' },
    { id: 5, title: 'INTERCEPTAÇÃO_ÁUDIO_002.mp4', url: '', duration: '12:33' },
    { id: 6, title: 'VIGILÂNCIA_REMOTA_003.mp4', url: '', duration: '08:21' },
  ];

  const handleVideoSelect = (videoId: number) => {
    const video = videos.find(v => v.id === videoId);
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

      {/* Main video player */}
      <div className="neon-border bg-card/30 backdrop-blur-sm p-6 mb-6">
        <div className="aspect-video bg-input/50 flex items-center justify-center mb-4 relative overflow-hidden">
          {currentVideo ? (
            <video
              ref={videoRef}
              src={currentVideo.url}
              controls
              className="w-full h-full object-contain"
            />
          ) : (
            <div className="text-center">
              <div className="text-4xl text-primary mb-2 animate-pulse-neon">▶</div>
              <p className="text-sm text-muted-foreground terminal-text">
                [ PLAYER DE VÍDEO ]
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
        {videos.map((video) => (
          <div
            key={video.id}
            onClick={() => handleVideoSelect(video.id)}
            className={`border p-4 transition-all cursor-pointer group flex items-center justify-between ${
              selectedVideo === video.id
                ? 'border-primary bg-primary/20 neon-border'
                : 'border-primary/30 bg-card/20 hover:bg-card/40'
            } ${!video.url ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-input/50 flex items-center justify-center neon-border-magenta group-hover:bg-secondary/20 transition-all">
                <span className="text-secondary text-xl">▶</span>
              </div>
              <div>
                <p className="text-sm text-foreground terminal-text tracking-wider">
                  {video.title}
                </p>
                <p className="text-[10px] text-muted-foreground terminal-text mt-1">
                  REGISTRO: 2225.10.09 // DURAÇÃO: {video.duration}
                </p>
              </div>
            </div>
            {video.url && (
              <div className="text-xs text-primary terminal-text opacity-0 group-hover:opacity-100 transition-opacity">
                CARREGAR &gt;&gt;
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 neon-border bg-primary/10">
        <p className="text-xs text-primary terminal-text tracking-wider">
          ✓ VÍDEO CARREGADO: {videos.filter(v => v.url).length} DE {videos.length} ARQUIVOS DISPONÍVEIS
        </p>
      </div>
    </div>
  );
};

export default VideoView;
