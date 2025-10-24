import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isJogoDesbloqueado } from '@/lib/argProgress';

const Game = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar se jogo está desbloqueado
    if (!isJogoDesbloqueado()) {
      console.warn('Tentativa de acesso não autorizado ao jogo');
      navigate('/');
      return;
    }

    // Log de acesso
    console.log('🎮 SIMULAÇÃO DE COMBATE INICIADA');
  }, [navigate]);

  return (
    <div className="w-full h-screen bg-black">
      {/* iframe do jogo */}
      <iframe
        src="/game/index.html"
        className="w-full h-full border-0"
        title="Ecos da Humanidade - Simulação de Combate"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};

export default Game;
