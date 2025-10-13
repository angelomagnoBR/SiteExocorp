const GalleryView = () => {
  const surveillanceImages = [
    { id: 1, title: 'SETOR_CRESCIMENTO.webp', url: '/images/Setor_de_Crescimento.webp' },
    { id: 2, title: 'LANTERNA_VERMELHA.jpeg', url: '/images/Lanterna_Vermelha.jpeg' },
    { id: 3, title: 'FESTA_PURPLE_FANG.png', url: '/images/Festa_purple_fang.png' },
    { id: 4, title: 'PLANTA_HOLOGRÁFICA.webp', url: '/images/Planta_holografaica.webp' },
    { id: 5, title: 'CYBERPUNK_CHARACTERS.webp', url: '/images/Cyberpunk_Characters_Lineup.webp' },
    { id: 6, title: 'RITUAL_AGHORIS.webp', url: '/images/Cyberpunk_Aghoris_Ritual.webp' },
    { id: 7, title: 'CAMINHANTES_VAZIO.webp', url: '/images/Caminhantes_do_Vazio.webp' },
    { id: 8, title: 'FADE_TO_BLACK.webp', url: '/images/Fade_to_Black.webp' },
  ];

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
            className="neon-border bg-card/30 backdrop-blur-sm p-4 hover:bg-card/50 transition-all cursor-pointer group"
          >
            <div className="aspect-video bg-input/50 flex items-center justify-center mb-4 relative overflow-hidden">
              <img 
                src={img.url} 
                alt={img.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <p className="text-xs text-primary terminal-text tracking-wider">
              {img.title}
            </p>
            <p className="text-[10px] text-muted-foreground terminal-text mt-1">
              CAPTURA: 2225.10.09 // 03:47:23
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 neon-border bg-primary/10">
        <p className="text-xs text-primary terminal-text tracking-wider">
          ✓ {surveillanceImages.length} IMAGENS DE VIGILÂNCIA CARREGADAS
        </p>
      </div>
    </div>
  );
};

export default GalleryView;
