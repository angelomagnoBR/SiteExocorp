import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Database as DatabaseIcon, FileText, Users, Lock } from 'lucide-react';
import EmailView from './EmailView';
import NexusView from './NexusView';
import DossiersView from './DossiersView';
import ProjectsView from './ProjectsView';

type View = 'terminal' | 'email' | 'nexus' | 'dossiers' | 'projects';

const Database = () => {
  const [currentView, setCurrentView] = useState<View>('terminal');
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const commands: Record<string, () => void> = {
    help: () => addToHistory(`
Comandos disponíveis:
- help: Mostra esta mensagem
- clear: Limpa o terminal
- email: Acessa o sistema de email
- nexus: Acessa o banco de dados Nexus
- dossiers: Visualiza dossiês de funcionários
- projects: Lista projetos da empresa
- lia: Sistema de IA da EXOCORP
    `),
    clear: () => setHistory([]),
    email: () => {
      addToHistory('Acessando sistema de email...');
      setCurrentView('email');
    },
    nexus: () => {
      addToHistory('Conectando ao banco de dados Nexus...');
      setCurrentView('nexus');
    },
    dossiers: () => {
      addToHistory('Carregando dossiês de funcionários...');
      setCurrentView('dossiers');
    },
    projects: () => {
      addToHistory('Listando projetos...');
      setCurrentView('projects');
    },
    lia: () => {
      addToHistory('L.I.A. (Logical Intelligence Assistant) v3.2');
      addToHistory('Status: Online');
      addToHistory('Como posso ajudar?');
    },
  };

  const addToHistory = (text: string) => {
    setHistory(prev => [...prev, text]);
  };

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    addToHistory(`> ${cmd}`);
    
    if (commands[trimmedCmd]) {
      commands[trimmedCmd]();
    } else {
      addToHistory(`Comando não reconhecido: ${cmd}. Digite "help" para ver os comandos disponíveis.`);
    }
    
    setInput('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && input.trim()) {
      handleCommand(input);
    }
  };

  if (currentView === 'email') {
    return <EmailView onBack={() => setCurrentView('terminal')} />;
  }

  if (currentView === 'nexus') {
    return <NexusView onBack={() => setCurrentView('terminal')} />;
  }

  if (currentView === 'dossiers') {
    return <DossiersView onBack={() => setCurrentView('terminal')} />;
  }

  if (currentView === 'projects') {
    return <ProjectsView onBack={() => setCurrentView('terminal')} />;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-green-400 p-8 font-mono">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Terminal className="w-8 h-8" />
            <h1 className="text-2xl font-bold">EXOCORP DATABASE v2.1</h1>
          </div>
          <div className="text-sm opacity-70">
            Sistema Autorizado | Acesso Restrito
          </div>
        </div>

        <div className="bg-black border border-green-400 rounded-lg p-6 mb-6">
          <div 
            ref={terminalRef}
            className="h-96 overflow-y-auto mb-4 whitespace-pre-wrap"
          >
            <div className="mb-4">
              Bem-vindo ao Sistema de Database da EXOCORP
              Digite 'help' para ver os comandos disponíveis.
            </div>
            {history.map((line, i) => (
              <div key={i} className="mb-1">{line}</div>
            ))}
          </div>
          
          <div className="flex items-center gap-2">
            <span>{'>'}</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 bg-transparent outline-none"
              autoFocus
            />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button
            onClick={() => setCurrentView('email')}
            className="bg-gray-800 border border-green-400 p-4 rounded hover:bg-gray-700 transition-colors flex flex-col items-center gap-2"
          >
            <FileText className="w-6 h-6" />
            <span>Emails</span>
          </button>
          
          <button
            onClick={() => setCurrentView('nexus')}
            className="bg-gray-800 border border-green-400 p-4 rounded hover:bg-gray-700 transition-colors flex flex-col items-center gap-2"
          >
            <DatabaseIcon className="w-6 h-6" />
            <span>Nexus</span>
          </button>
          
          <button
            onClick={() => setCurrentView('dossiers')}
            className="bg-gray-800 border border-green-400 p-4 rounded hover:bg-gray-700 transition-colors flex flex-col items-center gap-2"
          >
            <Users className="w-6 h-6" />
            <span>Dossiês</span>
          </button>
          
          <button
            onClick={() => setCurrentView('projects')}
            className="bg-gray-800 border border-green-400 p-4 rounded hover:bg-gray-700 transition-colors flex flex-col items-center gap-2"
          >
            <Lock className="w-6 h-6" />
            <span>Projetos</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Database;
