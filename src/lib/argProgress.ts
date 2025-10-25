// Sistema de tracking do ARG (Alternate Reality Game)
// Gerencia o progresso das pistas e garante progressão linear

export type PistaID = 
  | 'INICIO'      // Pista 1 - Matrix (Coelho) - Sempre visível
  | 'COELHO'      // Pista 2 - Matrix (Coelho encontrado)
  | 'PILULA'      // Pista 3 - Matrix (Pílulas)
  | 'NUMBERS'     // Pista 4 - LOST (4-8-15-16-23-42)
  | 'VENDETTA'    // Pista 5 - V de Vingança
  | 'GAME';       // Jogo desbloqueado

export interface ARGProgress {
  pistasEncontradas: PistaID[];
  pistaAtual: PistaID;
  jogoDesbloqueado: boolean;
  timestamp: number;
}

const STORAGE_KEY = 'exocorp_arg_progress';

// Ordem das pistas (progressão linear)
const ORDEM_PISTAS: PistaID[] = [
  'INICIO',
  'COELHO',
  'PILULA',
  'NUMBERS',
  'VENDETTA',
  'GAME'
];

// Inicializar progresso
const inicializarProgresso = (): ARGProgress => ({
  pistasEncontradas: ['INICIO'], // Primeira pista sempre disponível
  pistaAtual: 'INICIO',
  jogoDesbloqueado: false,
  timestamp: Date.now()
});

// Carregar progresso do localStorage
export const carregarProgresso = (): ARGProgress => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const progress = JSON.parse(saved) as ARGProgress;
      // Validar estrutura
      if (progress.pistasEncontradas && Array.isArray(progress.pistasEncontradas)) {
        return progress;
      }
    }
  } catch (error) {
    console.error('Erro ao carregar progresso do ARG:', error);
  }
  
  return inicializarProgresso();
};

// Salvar progresso no localStorage
export const salvarProgresso = (progresso: ARGProgress): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progresso));
  } catch (error) {
    console.error('Erro ao salvar progresso do ARG:', error);
  }
};

// Registrar que uma pista foi encontrada
export const registrarPistaEncontrada = (pista: PistaID): ARGProgress => {
  const progresso = carregarProgresso();
  
  // Verificar se já foi encontrada
  if (progresso.pistasEncontradas.includes(pista)) {
    return progresso;
  }
  
  // Adicionar pista encontrada
  progresso.pistasEncontradas.push(pista);
  progresso.timestamp = Date.now();
  
  // Determinar próxima pista
  const indexAtual = ORDEM_PISTAS.indexOf(pista);
  if (indexAtual < ORDEM_PISTAS.length - 1) {
    progresso.pistaAtual = ORDEM_PISTAS[indexAtual + 1];
  }
  
  // Verificar se jogo foi desbloqueado
  if (pista === 'VENDETTA') {
    progresso.jogoDesbloqueado = true;
  }
  
  salvarProgresso(progresso);
  return progresso;
};

// Verificar se uma pista pode ser exibida
export const podeMostrarPista = (pista: PistaID): boolean => {
  const progresso = carregarProgresso();
  const indexPista = ORDEM_PISTAS.indexOf(pista);
  
  // Primeira pista sempre visível
  if (indexPista === 0) {
    return true;
  }
  
  // Outras pistas só aparecem se a anterior foi encontrada
  const pistaAnterior = ORDEM_PISTAS[indexPista - 1];
  return progresso.pistasEncontradas.includes(pistaAnterior);
};

// Verificar se jogo está desbloqueado
export const isJogoDesbloqueado = (): boolean => {
  const progresso = carregarProgresso();
  return progresso.jogoDesbloqueado;
};

// Resetar progresso (para debug/teste)
export const resetarProgresso = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};

// Obter status atual do ARG
export const getStatusARG = (): {
  pistasEncontradas: number;
  totalPistas: number;
  pistaAtual: PistaID;
  jogoDesbloqueado: boolean;
} => {
  const progresso = carregarProgresso();
  return {
    pistasEncontradas: progresso.pistasEncontradas.length,
    totalPistas: ORDEM_PISTAS.length,
    pistaAtual: progresso.pistaAtual,
    jogoDesbloqueado: progresso.jogoDesbloqueado
  };
};
// ============================================
// NOVAS FUNÇÕES V6 - ADICIONAR NO FINAL
// ============================================

/**
 * Registra que os números foram validados corretamente
 */
export const registrarNumbersValidados = (): void => {
  const progress = carregarProgresso();
  progress.numbersDigitados = true;
  salvarProgresso(progress);
  registrarPistaEncontrada('NUMBERS');
};

/**
 * Verifica se os números já foram validados
 */
export const numbersForamValidados = (): boolean => {
  const progress = carregarProgresso();
  return progress.numbersDigitados === true;
};

/**
 * Verifica se uma pista específica foi encontrada
 */
export const pistaFoiEncontrada = (pista: PistaID): boolean => {
  const progress = carregarProgresso();
  return progress.pistasEncontradas.includes(pista);
};
