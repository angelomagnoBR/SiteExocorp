// src/utils/consoleMessage.ts

export const initConsoleMessage = () => {
  // Limpar console
  console.clear();

  // ASCII Art - Logo Matrix/Cyberpunk
  console.log(`
  %c
  ███████╗██╗  ██╗ ██████╗  ██████╗ ██████╗ ██████╗ ██████╗ 
  ██╔════╝╚██╗██╔╝██╔═══██╗██╔════╝██╔═══██╗██╔══██╗██╔══██╗
  █████╗   ╚███╔╝ ██║   ██║██║     ██║   ██║██████╔╝██████╔╝
  ██╔══╝   ██╔██╗ ██║   ██║██║     ██║   ██║██╔══██╗██╔═══╝ 
  ███████╗██╔╝ ██╗╚██████╔╝╚██████╗╚██████╔╝██║  ██║██║     
  ╚══════╝╚═╝  ╚═╝ ╚═════╝  ╚═════╝ ╚═════╝ ╚═╝  ╚═╝╚═╝     
  `, 
  'color: #00ff00; font-weight: bold; text-shadow: 0 0 10px #00ff00;'
  );

  // Mensagem Principal
  console.log(
    '%c⚠️ ALERTA DE SEGURANÇA ⚠️',
    'color: #ff0000; font-size: 24px; font-weight: bold; text-shadow: 0 0 10px #ff0000; padding: 10px;'
  );

  console.log(
    '%cVocê acaba de acessar uma área restrita.',
    'color: #ffaa00; font-size: 16px; font-weight: bold;'
  );

  console.log('%c ', 'padding: 5px;');

  // Mensagem Divertida
  console.log(
    '%c🕵️ Encontrou o console, hein?',
    'color: #00ffff; font-size: 18px; font-weight: bold;'
  );

  console.log(
    '%cVocê poderia olhar agora... mas qual é a graça? 🤔',
    'color: #ffffff; font-size: 14px;'
  );

  console.log('%c ', 'padding: 5px;');

  // Citação do Matrix
  console.log(
    '%c"Infelizmente, ninguém pode ser informado do que é a Matrix.\nVocê tem que vê-la por si mesmo." - Morpheus',
    'color: #00ff00; font-size: 13px; font-style: italic; line-height: 1.5;'
  );

  console.log('%c ', 'padding: 5px;');

  // Dica
  console.log(
    '%c💡 DICA:',
    'color: #ffff00; font-size: 16px; font-weight: bold;'
  );

  console.log(
    '%cAs pistas são justas e possíveis de resolver.\nPrometo que vale a pena jogar sem olhar em! 😊',
    'color: #aaaaaa; font-size: 13px; line-height: 1.5;'
  );

  console.log('%c ', 'padding: 10px;');

  // Easter Egg
  console.log(
    '%c🎁 EASTER EGG:',
    'color: #ff00ff; font-size: 14px; font-weight: bold;'
  );

  console.log(
    '%cSe você é programador e quer ver o código, tudo bem!\nMas tente jogar primeiro. É mais divertido! 🎮',
    'color: #cccccc; font-size: 12px; line-height: 1.5;'
  );

  console.log('%c ', 'padding: 10px;');

  // Rodapé
  console.log(
    '%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    'color: #00ff00;'
  );

  console.log(
    '%cSiga o coelho branco... 🐰',
    'color: #ffffff; font-size: 12px; font-style: italic;'
  );

  console.log(
    '%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    'color: #00ff00;'
  );
};

// Detector de DevTools (quando alguém abre o console)
export const detectDevTools = () => {
  let devtoolsOpen = false;

  const checkDevTools = () => {
    const threshold = 160;
    const widthThreshold = window.outerWidth - window.innerWidth > threshold;
    const heightThreshold = window.outerHeight - window.innerHeight > threshold;
    const isOpen = widthThreshold || heightThreshold;

    if (isOpen && !devtoolsOpen) {
      devtoolsOpen = true;
      
      // Mensagem quando abrir
      setTimeout(() => {
        console.log('%c⚡ INTRUSO DETECTADO!', 'color: red; font-size: 20px; font-weight: bold;');
        console.log('%cRelaxe... você pode olhar. Mas não trapaceie! 😉', 'color: yellow; font-size: 14px;');
      }, 500);
    }

    if (!isOpen && devtoolsOpen) {
      devtoolsOpen = false;
    }
  };

  setInterval(checkDevTools, 1000);
};
