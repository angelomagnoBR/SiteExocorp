// Sistema de Progressão do ARG
// Controla o desbloqueio gradual de conteúdo baseado em ações do usuário

type PistaARG = 
  | 'INICIO'      // Estado inicial após primeiro login
  | 'COELHO'      // Após comando "coelho branco" no terminal
  | 'PILULA'      // Após clicar na pílula vermelha
  | 'NUMBERS'     // Após digitar números corretos no modal
  | 'VENDETTA'    // Após descobrir VENDETTA no dossiê Bobby
  | 'GAME';       // Acesso ao jogo final liberado

interface ProgressoARG {
  pistasEncontradas: PistaARG[];
  ultimaPista: PistaARG;
  numbersDigitados: boolean; // Novo: controla se números foram validados
  timestampInicio?: number;
}

const STORAGE_KEY = 'exocorp_arg_progress';

// Inicializa o progresso do ARG
export function inicializarProgresso(): void {
  const progressoExistente = obterProgresso();
  
  if (!progressoExistente.pistasEncontradas.length) {
    const novoProgresso: ProgressoARG = {
      pistasEncontradas: ['INICIO'],
      ultimaPista: 'INICIO',
      numbersDigitados: false,
      timestampInicio: Date.now()
    };
    salvarProgresso(novoProgresso);
  }
}

// Registra que uma pista foi encontrada
export function registrarPistaEncontrada(pista: PistaARG): void {
  const progresso = obterProgresso();
  
  if (!progresso.pistasEncontradas.includes(pista)) {
    progresso.pistasEncontradas.push(pista);
    progresso.ultimaPista = pista;
    salvarProgresso(progresso);
  }
}

// Registra que os números foram digitados corretamente
export function registrarNumbersValidados(): void {
  const progresso = obterProgresso();
  progresso.numbersDigitados = true;
  registrarPistaEncontrada('NUMBERS');
  salvarProgresso(progresso);
}

// Verifica se uma pista específica foi encontrada
export function pistaFoiEncontrada(pista: PistaARG): boolean {
  const progresso = obterProgresso();
  return progresso.pistasEncontradas.includes(pista);
}

// Verifica se os números foram validados
export function numbersForamValidados(): boolean {
  const progresso = obterProgresso();
  return progresso.numbersDigitados === true;
}

// Obtém o progresso atual
export function obterProgresso(): ProgressoARG {
  try {
    const dados = localStorage.getItem(STORAGE_KEY);
    if (dados) {
      return JSON.parse(dados);
    }
  } catch (error) {
    console.error('Erro ao ler progresso:', error);
  }
  
  return {
    pistasEncontradas: [],
    ultimaPista: 'INICIO',
    numbersDigitados: false
  };
}

// Salva o progresso
function salvarProgresso(progresso: ProgressoARG): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progresso));
  } catch (error) {
    console.error('Erro ao salvar progresso:', error);
  }
}

// Reseta todo o progresso (para quando digitar números errados)
export function resetarProgresso(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
    // Recarrega a página para estado inicial
    window.location.href = '/';
  } catch (error) {
    console.error('Erro ao resetar progresso:', error);
  }
}

// Verifica se o jogo está liberado
export function jogoEstaLiberado(): boolean {
  return pistaFoiEncontrada('GAME');
}

// Debug: mostra progresso atual no console
export function debugProgresso(): void {
  console.log('=== PROGRESSO ARG ===');
  console.log(obterProgresso());
  console.log('====================');
}
