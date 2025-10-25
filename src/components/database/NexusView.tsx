import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, AlertTriangle, Clock } from 'lucide-react';
import { pistaFoiEncontrada, numbersForamValidados } from '@/lib/argProgress';

interface NexusViewProps {
  onAnomaliaClick?: () => void;
  numbersValidated?: boolean;
}

interface Dossie {
  id: string;
  nome: string;
  cargo: string;
  status: 'ativo' | 'inativo' | 'suspeito' | 'eliminado';
  conteudo: string | React.ReactNode;
  icone?: string;
  requiresNumbers?: boolean; // Novo: indica se precisa validar números
}

export default function NexusView({ onAnomaliaClick, numbersValidated = false }: NexusViewProps) {
  const [dossieAberto, setDossieAberto] = useState<string | null>(null);

  // Lista de dossiês com conteúdo censurado quando necessário
  const dossies: Dossie[] = [
    {
      id: 'bobby',
      nome: 'Bobby "O Fantasma"',
      cargo: 'Ex-Operador de Sistemas',
      status: 'eliminado',
      icone: '👤',
      requiresNumbers: true, // Precisa validar números para ver VENDETTA
      conteudo: numbersValidated ? (
        // VERSÃO COMPLETA (após validar números)
        <>
          <h3>📋 Dossiê: Bobby "O Fantasma"</h3>
          <div className="dossie-section">
            <h4>🔍 Identificação</h4>
            <p><strong>Nome Completo:</strong> Robert "Bobby" Chen</p>
            <p><strong>Codinome:</strong> O Fantasma</p>
            <p><strong>Cargo Anterior:</strong> Operador de Sistemas Nível 5</p>
            <p><strong>Status:</strong> <span className="status-eliminado">ELIMINADO</span></p>
          </div>

          <div className="dossie-section">
            <h4>⚠️ Incidente</h4>
            <p>Bobby foi eliminado após descobrir irregularidades na Operação Eclipse. Tentou expor documentos classificados relacionados ao Projeto NEXUS.</p>
            <p className="warning-text">
              <AlertTriangle size={16} />
              Investigação interna concluída. Caso encerrado por ordem direta da diretoria.
            </p>
          </div>

          <motion.div 
            className="dossie-section classified-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4>🔒 INFORMAÇÃO CLASSIFICADA</h4>
            <motion.div
              initial={{ filter: 'blur(10px)', opacity: 0 }}
              animate={{ filter: 'blur(0px)', opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.5 }}
              className="vendetta-reveal"
            >
              <p className="critical-info">
                Última mensagem interceptada antes da eliminação:
              </p>
              <blockquote className="bobby-message">
                "Eles não vão me calar. A verdade precisa sair. Se algo acontecer comigo, 
                procurem por <span className="highlight-red">VENDETTA</span>. 
                É a chave para tudo. Lia sabe onde encontrar."
              </blockquote>
              <p className="timestamp">
                <Clock size={14} />
                Interceptado em: 15/03/2024 - 23:47:12
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 2 }}
              className="vendetta-keyword"
            >
              <div className="keyword-box">
                <span className="keyword-label">PALAVRA-CHAVE DETECTADA:</span>
                <span className="keyword-value">VENDETTA</span>
              </div>
            </motion.div>
          </motion.div>

          <div className="dossie-section">
            <h4>📎 Arquivos Relacionados</h4>
            <ul className="file-list">
              <li>• Relatório_Operacao_Eclipse.enc</li>
              <li>• Projeto_NEXUS_Fase2.classified</li>
              <li>• Comunicacao_Interna_Lia.deleted</li>
            </ul>
          </div>
        </>
      ) : (
        // VERSÃO CENSURADA (antes de validar números)
        <>
          <h3>📋 Dossiê: Bobby "O Fantasma"</h3>
          <div className="dossie-section">
            <h4>🔍 Identificação</h4>
            <p><strong>Nome Completo:</strong> Robert "Bobby" Chen</p>
            <p><strong>Codinome:</strong> O Fantasma</p>
            <p><strong>Cargo Anterior:</strong> Operador de Sistemas Nível 5</p>
            <p><strong>Status:</strong> <span className="status-eliminado">ELIMINADO</span></p>
          </div>

          <div className="dossie-section">
            <h4>⚠️ Incidente</h4>
            <p>Bobby foi eliminado após descobrir irregularidades na Operação Eclipse. Tentou expor documentos classificados relacionados ao Projeto NEXUS.</p>
            <p className="warning-text">
              <AlertTriangle size={16} />
              Investigação interna concluída. Caso encerrado por ordem direta da diretoria.
            </p>
          </div>

          <div className="dossie-section censored-section">
            <h4>🔒 INFORMAÇÃO CLASSIFICADA</h4>
            <div className="censored-content">
              <p className="censored-text">
                Última mensagem interceptada antes da eliminação:
              </p>
              <div className="censored-block">
                <div className="censored-lines">
                  <span className="censored-line">█████████████████████████████</span>
                  <span className="censored-line">██████████████████████</span>
                  <span className="censored-line">████████████████████████████████</span>
                  <span className="censored-line">█████████████████</span>
                </div>
                <p className="censored-notice">
                  <AlertTriangle size={16} />
                  ACESSO NEGADO - CREDENCIAIS INSUFICIENTES
                </p>
              </div>
            </div>
          </div>

          <div className="dossie-section">
            <h4>📎 Arquivos Relacionados</h4>
            <ul className="file-list">
              <li>• Relatório_Operacao_Eclipse.enc</li>
              <li>• Projeto_NEXUS_Fase2.classified</li>
              <li>• Comunicacao_Interna_Lia.deleted</li>
            </ul>
          </div>
        </>
      )
    },
    {
      id: 'lia',
      nome: 'Dra. Lia Chen',
      cargo: 'Cientista Chefe - Projeto NEXUS',
      status: 'suspeito',
      icone: '🔬',
      conteudo: (
        <>
          <h3>📋 Dossiê: Dra. Lia Chen</h3>
          <div className="dossie-section">
            <h4>🔍 Identificação</h4>
            <p><strong>Nome Completo:</strong> Dra. Lia Chen</p>
            <p><strong>Cargo:</strong> Cientista Chefe - Divisão de Biotecnologia</p>
            <p><strong>Projeto Atual:</strong> NEXUS - Interface Neural Avançada</p>
            <p><strong>Status:</strong> <span className="status-suspeito">SOB INVESTIGAÇÃO</span></p>
          </div>

          <div className="dossie-section">
            <h4>⚠️ Alertas de Segurança</h4>
            <p className="warning-text">
              <AlertTriangle size={16} />
              Atividade suspeita detectada: Acesso a arquivos fora do escopo do projeto
            </p>
            <p className="warning-text">
              <AlertTriangle size={16} />
              Possível comunicação com Bobby Chen antes da eliminação
            </p>
            <p className="warning-text">
              <AlertTriangle size={16} />
              Tentativas de acesso ao servidor central em horários não autorizados
            </p>
          </div>

          <div className="dossie-section">
            <h4>🧪 Projeto NEXUS</h4>
            <p>Interface neural de próxima geração desenvolvida para integração homem-máquina. Potencial de controle total sobre sistemas conectados.</p>
            <p><strong>Fase Atual:</strong> Testes Beta com voluntários</p>
            <p><strong>Taxa de Sucesso:</strong> <span className="highlight-red">23%</span></p>
            <p><strong>Efeitos Colaterais:</strong> Perda de memória, comportamento errático, [DADOS CENSURADOS]</p>
          </div>

          <div className="dossie-section">
            <h4>💬 Última Comunicação Registrada</h4>
            <blockquote>
              "O projeto não pode continuar assim. As cobaias... eles não merecem isso. 
              Bobby tinha razão sobre tudo. Eu preciso fazer algo antes que seja tarde demais."
            </blockquote>
            <p className="timestamp">
              <Clock size={14} />
              Interceptado em: 18/03/2024 - 02:34:56
            </p>
          </div>

          <div className="dossie-section">
            <h4>📎 Nota Investigativa</h4>
            <p className="critical-info">
              Aumentar vigilância. Possível risco de sabotagem interna. 
              Considerar realocação ou contenção preventiva.
            </p>
          </div>
        </>
      )
    },
    {
      id: 'marcus',
      nome: 'Marcus Webb',
      cargo: 'Diretor de Segurança',
      status: 'ativo',
      icone: '🛡️',
      conteudo: (
        <>
          <h3>📋 Dossiê: Marcus Webb</h3>
          <div className="dossie-section">
            <h4>🔍 Identificação</h4>
            <p><strong>Nome Completo:</strong> Marcus Webb</p>
            <p><strong>Cargo:</strong> Diretor de Segurança Corporativa</p>
            <p><strong>Tempo de Serviço:</strong> 12 anos</p>
            <p><strong>Status:</strong> <span className="status-ativo">ATIVO - CONFIANÇA MÁXIMA</span></p>
          </div>

          <div className="dossie-section">
            <h4>📊 Responsabilidades</h4>
            <ul className="file-list">
              <li>• Supervisão de operações de segurança interna</li>
              <li>• Coordenação de eliminações autorizadas</li>
              <li>• Gerenciamento de crises e contenção de vazamentos</li>
              <li>• Monitoramento de funcionários suspeitos</li>
            </ul>
          </div>

          <div className="dossie-section">
            <h4>✅ Operações Recentes</h4>
            <p><strong>Operação Eclipse:</strong> Executada com sucesso</p>
            <p><strong>Caso Bobby Chen:</strong> Eliminação autorizada e concluída</p>
            <p><strong>Vigilância Dra. Lia:</strong> Em andamento</p>
          </div>

          <div className="dossie-section">
            <h4>💼 Avaliação</h4>
            <p>Marcus demonstra lealdade absoluta à Exocorp. Eficiente, discreto e sem hesitação em operações críticas. Recomendado para promoções futuras.</p>
          </div>
        </>
      )
    }
  ];

  // Renderiza conteúdo inicial quando nenhum dossiê está aberto
  const renderWelcomeScreen = () => (
    <div className="welcome-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="welcome-content"
      >
        <FileText size={64} className="welcome-icon" />
        <h2>Base de Dados NEXUS</h2>
        <p className="welcome-text">
          Selecione um diretório para acessar ou use o terminal para comandos especiais
        </p>

        {/* Botão de Anomalia (aparece após pílula vermelha) */}
        {pistaFoiEncontrada('PILULA') && !numbersValidated && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="anomalia-button"
            onClick={onAnomaliaClick}
          >
            <AlertTriangle size={20} />
            ⚠️ ANOMALIA DETECTADA - CLIQUE AQUI
          </motion.button>
        )}
      </motion.div>
    </div>
  );

  return (
    <div className="nexus-view">
      {/* Lista de Dossiês */}
      <div className="dossies-sidebar">
        <h3>📁 Dossiês Disponíveis</h3>
        <div className="dossies-list">
          {dossies.map((dossie) => (
            <motion.button
              key={dossie.id}
              className={`dossie-item ${dossieAberto === dossie.id ? 'active' : ''} status-${dossie.status}`}
              onClick={() => setDossieAberto(dossie.id)}
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="dossie-icon">{dossie.icone}</span>
              <div className="dossie-info">
                <span className="dossie-nome">{dossie.nome}</span>
                <span className="dossie-cargo">{dossie.cargo}</span>
              </div>
              <span className={`dossie-status status-${dossie.status}`}>
                {dossie.status.toUpperCase()}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Conteúdo do Dossiê */}
      <div className="dossie-content">
        {dossieAberto ? (
          <motion.div
            key={dossieAberto}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="dossie-viewer"
          >
            {dossies.find((d) => d.id === dossieAberto)?.conteudo}
          </motion.div>
        ) : (
          renderWelcomeScreen()
        )}
      </div>
    </div>
  );
}
