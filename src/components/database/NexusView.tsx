import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Lock, AlertTriangle, Target, Shield, Skull, User, Users, Zap, Radio, MapPin, Power, Dna, Bell, MapPinned, Terminal } from 'lucide-react';

type ReportType = 'nexus' | 'lia' | 'neia campos' | 'apex' | 'amanda backer' | 'bobby' | 'javier montoya' | 'rocco' | 'b42b424' | '4l1550n' | '24f43l' | '4l3x4nd23' | 'v1ct02' | 'c4b3ça' | 'x4l3h';

const NexusView = () => {
  const [activeReport, setActiveReport] = useState<ReportType>('nexus');
  const location = useLocation();
  const [showSecretMessage, setShowSecretMessage] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const report = urlParams.get('report') as ReportType;
    if (report) {
      setActiveReport(report);
    }
  }, [location.search]);
  
useEffect(() => {
  try {
    const progressoStr = localStorage.getItem('exocorp_arg_progress');
    if (progressoStr) {
      const progresso = JSON.parse(progressoStr);
      if (progresso.pistasEncontradas && progresso.pistasEncontradas.includes('NUMBERS')) {
        setShowSecretMessage(true);
        console.log('✅ NexusView - Mensagem secreta ativada!');
      }
    }
  } catch (error) {
    console.error('❌ Erro ao verificar progresso:', error);
  }
}, [activeReport]);


  const nexusContent = `
══════════════════════════════════════════════════════════

EXOCORP TACSEC - DIVISÃO DE SEGURANÇA TÁTICA

CLASSIFICAÇÃO: ULTRASECRETO // OLHOS-SOMENTE
ID DO RELATÓRIO: LTA-77B-NEXUS_NY
LOCAL: Metrô Desativado, Setor Gamma-7, NY
DATA: 07.10.2225
NÍVEL DE AMEAÇA: ███ CRÍTICO ███

═══════════════════════════════════════════════════════════════════

1.0 RESUMO EXECUTIVO

Vigilância remota confirma abrigo subterrâneo operacional da célula 
insurgente "Nexus". O local é um centro multifuncional para habitação, 
treinamento e planejamento de operações hostis. A população, incluindo 
civis, exibe alta coesão e motivação ideológica sob a liderança de 
Bobby Huey (HVT-1). 

>>> RECOMENDA-SE CONTENÇÃO E NEUTRALIZAÇÃO SISTÊMICA <<<

═══════════════════════════════════════════════════════════════════

2.0 ANÁLISE DO LOCAL

ACESSO:
  • Múltiplos pontos de acesso/fuga prováveis
  • Labirinto de túneis favorece táticas de guerrilha
  • Entrada principal vigiada 24/7

LAYOUT:
  • Zonas improvisadas: dormitórios, refeitório, oficinas
  • Organização indica comando estruturado
  • Sala de reuniões com mesa holográfica = centro nevrálgico
  • >>> ALVO PRIORITÁRIO DE INTELIGÊNCIA <<<

INFRAESTRUTURA:
  • Estrutura instável: paredes de concreto comprometidas
  • Tubulações antigas expostas
  • Energia desviada da rede ou gerada localmente

═══════════════════════════════════════════════════════════════════

3.0 ANÁLISE DE ATIVIDADES HOSTIS

DEMOGRAFIA:
  População Total Estimada: 120-150 indivíduos
  • Não-combatentes: crianças, idosos (30%)
  • Combatentes ativos: (70%)
  • Todos ativamente doutrinados e treinados
  • Alto moral reforçado por propaganda

ATIVIDADES OBSERVADAS:

  [FABRICAÇÃO]
    → Armamento caseiro
    → Dispositivos de hacking
    → Explosivos improvisados

  [TREINAMENTO]
    → Táticas de combate urbano
    → Ciber-guerra (todas as idades)
    → Primeiros socorros de campo

  [CIBER-OPERAÇÕES]
    → Monitoramento ativo de nossa vigilância
    → Planejamento de ataques coordenados
    → Penetração em sistemas ExoCorp (Nível 2-3)

HVT-1 (Bobby Huey):
  • Identificado como líder tático principal
  • Ex-militar (confirmado)
  • Carismático, respeitado pela população
  • >>> SUA CAPTURA/ELIMINAÇÃO DESESTABILIZARIA COMANDO <<<

═══════════════════════════════════════════════════════════════════

4.0 VULNERABILIDADES IDENTIFICADAS

[ESTRUTURAL]
  ✓ Decadência da infraestrutura permite selar túneis
  ✓ Tubulações podem introduzir agentes químicos
  ✓ Pontos de colapso estrutural mapeados

[RECURSOS]
  ✓ Dependência de fontes externas: ar, água, comida
  ✓ Sistema de ventilação = ponto de falha crítico
  ✓ >>> VETOR PRIMÁRIO PARA ATAQUE <<<

[CONCENTRAÇÃO]
  ✓ Todos os recursos em local único
  ✓ Vulnerável a ataque decisivo

[TECNOLOGIA]
  ✓ Equipamentos improvisados
  ✓ Suscetíveis a contramedidas eletrônicas (EMP)
  ✓ Sem sistemas de defesa aérea

═══════════════════════════════════════════════════════════════════

5.0 DIRETIVA OPERACIONAL E RECOMENDAÇÕES

A AMEAÇA "NEXUS" É ATIVA E CRESCENTE.
>>> AÇÃO IMEDIATA É NECESSÁRIA <<<

═══════════════════════════════════════════════════════════════════

FASE 1: VIGILÂNCIA APROFUNDADA (72h)
  → Mapear todos os túneis e saídas
  → Identificar sistemas de suporte vital
  → Implantar micro-drones e sensores
  → Catalogar energia e ventilação

FASE 2: ISOLAMENTO TÁTICO
  → Selar secretamente saídas secundárias
  → Preparar controle da entrada principal
  → Posicionar unidades de interceptação
  → Estabelecer perímetro de contenção

FASE 3: NEUTRALIZAÇÃO (SELECIONAR OPÇÃO)

  ┌─────────────────────────────────────────────────────────────┐
  │ [OPÇÃO ALFA] - CERCO PROLONGADO                             │
  │ Duração: 14-21 dias                                          │
  │ Método: Cortar suprimentos + guerra psicológica             │
  │ Risco: BAIXO                                                 │
  │ Eficiência: MODERADA                                         │
  │ Custo Político: BAIXO                                        │
  └─────────────────────────────────────────────────────────────┘

  ┌─────────────────────────────────────────────────────────────┐
  │ [OPÇÃO BETA] - ATAQUE SISTÊMICO ★★★ RECOMENDADO ★★★        │
  │ Duração: 6-12 horas                                          │
  │ Método: Agente sedativo via sistema de ventilação           │
  │ Risco: MÉDIO                                                 │
  │ Eficiência: ALTA                                             │
  │ Resultado: Incapacitação total                               │
  │ → Permite extração de HVT-1                                  │
  │ → Coleta de inteligência crítica                             │
  │ → Minimiza baixas civis                                      │
  │ Custo Político: MÉDIO                                        │
  └─────────────────────────────────────────────────────────────┘

  ┌─────────────────────────────────────────────────────────────┐
  │ [OPÇÃO GAMA] - INCURSÃO CIRÚRGICA                           │
  │ Duração: 2-4 horas                                           │
  │ Método: Equipe de operações especiais                        │
  │ Objetivo: Capturar/eliminar HVT-1                            │
  │           Destruir sala de reuniões                          │
  │ Risco: ALTO                                                  │
  │ Eficiência: VARIÁVEL                                         │
  │ Custo Político: ALTO (se descoberto)                         │
  └─────────────────────────────────────────────────────────────┘

═══════════════════════════════════════════════════════════════════

6.0 SOLICITAÇÃO DE AUTORIZAÇÃO

AGUARDANDO APROVAÇÃO EXECUTIVA PARA INICIAR FASE 1

>>> OPÇÃO BETA É A MAIS EFICIENTE <<<
>>> MINIMIZA RISCO E MAXIMIZA RESULTADOS <<<

Tempo estimado para operação completa (Fases 1-3): 96 horas

═══════════════════════════════════════════════════════════════════

ASSINATURAS:

[REDACTED] - Diretor de Segurança Tática
[REDACTED] - Comandante de Operações de Campo
[REDACTED] - Analista Chefe de Inteligência

AGUARDANDO AUTORIZAÇÃO: CEO EXOCORP

═══════════════════════════════════════════════════════════════════

// FIM DO RELATÓRIO
// ACESSO REGISTRADO EM LOGS CORPORATIVOS
// TODO ACESSO É MONITORADO 24/7

[ID_USUARIO_ALPHA: B42B424]
  `;

  const liaContent = `
═══════════════════════════════════════════════════════════════════

CLASSIFICADO: Dossiê de Sujeito - Projeto H
ARQUIVO: LIA.00.01
NÍVEL DE ACESSO: Alfa-Sombra
STATUS: Sujeito Capturado - Em Análise no Nível 7

═══════════════════════════════════════════════════════════════════

IDENTIFICAÇÃO

Nome: Lia
Idade (Estimada): 9 anos
Data de Nascimento (Estimada): 2215.11.15
Afiliação Conhecida: Nenhuma
Status de Implante: Nenhum. Ausência de qualquer aprimoramento 
                    cibernético ou neural.

═══════════════════════════════════════════════════════════════════

DADOS BIOMÉTRICOS E BIOLÓGICOS

O sujeito, designado como Anomalia L.00.01, representa a única 
instância conhecida de um espécime humano não otimizado. Seu DNA 
é uma cópia pura da linhagem pré-corporativa, sem qualquer 
modificação cibernética ou biológica.

SISTEMAS NEURAIS:
  → Operação baseada em padrões biológicos naturais
  → Atividade emocional e cognitiva sem mediação artificial
  → Ausência total de interfaces neurais

SENSIBILIDADE EMOCIONAL:
  → Elevada sensibilidade a estímulos externos
  → Ativações emocionais: medo, curiosidade, serenidade
  → Padrões fora dos controles de população otimizada

APARÊNCIA FÍSICA:
  → Aparente boa saúde
  → Baixa estatura para idade estimada
  → Olhar classificado como "curioso"

═══════════════════════════════════════════════════════════════════

HISTÓRICO DE OBSERVAÇÃO (2215 - 2224)

O sujeito e seus pais, indivíduos da linhagem biológica pura, foram 
localizados em áreas rurais e ermas. As operações de vigilância e 
eliminação de indivíduos não otimizados falharam em sua área. 

A família adotou estilo de vida reclusivo, evitando qualquer contato 
com cidades ou redes corporativas, garantindo sobrevivência fora do 
sistema.

[2215-2220] FASE DE OCULTAÇÃO
  → Sujeito observado em vilarejos e esconderijos
  → Pais extremamente cuidadosos em esconder existência
  → Múltiplas mudanças de localização detectadas

[2220-2223] FASE DE EVASÃO
  → Pais iniciaram viagens para evitar patrulhas
  → Objetivo: Evasão de Exocorp e Zion Industries
  → Padrões de movimento erráticos documentados

[2224.08.15] OPERAÇÃO DE CAPTURA
  → Equipe de segurança Exocorp localizou família em área de caça
  → Pai do sujeito: ELIMINADO
  → Mãe: CAPTURADA para análise
  → Sujeito: TRANSFERIDO para Topo da Torre Exocorp
  → Responsável: P. Di

═══════════════════════════════════════════════════════════════════

ANÁLISE COMPORTAMENTAL E VALOR

O sujeito não é apenas um espécime biológico, mas a ÚLTIMA FONTE DE 
DADOS NÃO CORROMPIDOS.

VALOR CIENTÍFICO:
  → DNA contém informações sobre humanidade "pura"
  → Dados perdidos no processo de otimização
  → Comportamento emocional de valor inestimável
  
VALOR PARA PROJETO H:
  >>> PEÇA CRÍTICA PARA CONCLUSÃO DO PROJETO <<<
  
  → Análise permitirá aperfeiçoamento de otimização
  → Criação de humanidade com todas as qualidades
  → Eliminação de todas as falhas humanas
  → Guiada pelo Arquiteto

GRAU DE AMEAÇA:
  Física: INSIGNIFICANTE
  Biológica: CRÍTICA (valor inestimável)
  Status: ALVO DE ALTA PRIORIDADE

═══════════════════════════════════════════════════════════════════

RECOMENDAÇÃO

>>> QUARENTENA PERMANENTE <<<
>>> OBSERVAÇÃO CONSTANTE 24/7 <<<

DIRETRIZES:
  ✓ Manter sujeito em estado de quarentena
  ✓ Análise é prioridade MÁXIMA para Projeto H
  ✓ PROIBIDO liberação ou exposição ao mundo externo
  ✓ Vida do sujeito tem valor INESTIMÁVEL

AVISO:
  O sujeito não pode, sob NENHUMA CIRCUNSTÂNCIA, ser liberado.
  Sua existência é fundamental para o futuro da humanidade sob
  a perspectiva do Arquiteto.

═══════════════════════════════════════════════════════════════════

ASSINATURAS:

[REDACTED] - Diretor do Projeto H
[REDACTED] - P. Di - Supervisor de Contenção
[REDACTED] - Arquiteto - Autoridade Máxima

PRIORIDADE: MÁXIMA
STATUS: ATIVO

═══════════════════════════════════════════════════════════════════

>>> LOG DE SEGURANÇA - ARQUITETO P.DI <<<
[2224.11.15 - 03:47:22]
[TRANSMISSÃO INTERCEPTADA]

'Neo recebeu a mensagem às 00:08:43.
Follow the white rabbit.
Você também receberá a sua.

Para encontrá-la, você deve invocar o nome dela.
Digite no TERMINAL: o nome da última humana pura.

LIA é a chave.
O coelho te espera nas SOMBRAS da vigilância.'

[FIM DA TRANSMISSÃO]
[ORIGEM: DESCONHECIDA]
[COMANDO_SUGERIDO: LIA]

═══════════════════════════════════════════════════════════════════

// FIM DO DOSSIÊ
// ACESSO EXCLUSIVO NÍVEL ALFA-SOMBRA
// TODO ACESSO É REGISTRADO E MONITORADO

[AT.BIO.REGISTRO: 4L1550N]
  `;

  const neiaCamposContent = `
═══════════════════════════════════════════════════════════════════

DOSSIÊ DE ALVO PRIORITÁRIO
ARQUIVO: NC-443-ZION
NOME: Neia Campos
STATUS: FUGITIVA - AMEAÇA ATIVA

═══════════════════════════════════════════════════════════════════

IDENTIFICAÇÃO

Nome Completo: Neia Campos
Idade: 42 anos
Última Localização: Setor Industrial, Zona 9
Afiliação: Nexus (Célula de Resistência)
Especialização: Hacking e Infiltração de Sistemas

═══════════════════════════════════════════════════════════════════

PERFIL PSICOLÓGICO

TRAÇOS DOMINANTES:
  → Altamente inteligente e estratégica
  → Perfil analítico com tendências obsessivas
  → Forte senso de justiça (distorcido)
  → Desconfiança profunda de autoridades corporativas

MOTIVAÇÃO:
  → Vingança contra Zion Industries
  → Liberação de informações classificadas
  >>> OBJETIVO: Expor "verdades" sobre controle populacional <<<

═══════════════════════════════════════════════════════════════════

HISTÓRICO OPERACIONAL

[2220] RECRUTAMENTO
  → Ex-funcionária da Zion Industries - Nível 4
  → Demitida após descobrir irregularidades
  → Tentou exposição pública - FALHOU
  → Recrutada pelo Nexus 3 meses após demissão

[2221-2223] ATIVIDADES HOSTIS
  → 47 invasões de sistemas documentadas
  → Responsável por 3 vazamentos de dados críticos
  → Criação de backdoors em sistemas de segurança
  → Treinamento de novos hackers para o Nexus

[2224.09.01] ÚLTIMA ATIVIDADE CONHECIDA
  → Invasão do banco de dados central da ExoCorp
  → Roubo de 2.4TB de arquivos classificados
  >>> PARADEIRO ATUAL: DESCONHECIDO <<<

═══════════════════════════════════════════════════════════════════

CAPACIDADES TÉCNICAS

NÍVEL DE HABILIDADE: ████████░░ (8/10)

ESPECIALIZAÇÕES:
  ✓ Engenharia reversa de sistemas
  ✓ Criptografia avançada
  ✓ Criação de malware personalizado
  ✓ Infiltração de redes corporativas

EQUIPAMENTO CONHECIDO:
  → Deck de hacking customizado
  → Implante neural de processamento
  → Ferramentas de evasão digital

═══════════════════════════════════════════════════════════════════

NÍVEL DE AMEAÇA

CLASSIFICAÇÃO: ████ ALTA ████

RISCOS:
  → Acesso não autorizado a sistemas críticos
  → Potencial sabotagem de infraestrutura
  → Exposição de operações sensíveis
  → Influência sobre outros insurgentes

RECOMENDAÇÃO:
  >>> CAPTURA VIVA PARA INTERROGATÓRIO <<<
  >>> ELIMINAÇÃO SE RESISTÊNCIA FOR OFERECIDA <<<

═══════════════════════════════════════════════════════════════════

// FIM DO DOSSIÊ
// ATUALIZAÇÃO CONTÍNUA NECESSÁRIA

[CHAVE_CRIPTOGRAFIA_RA: 24F43L]
  `;

  const apexContent = `
═══════════════════════════════════════════════════════════════════

RELATÓRIO DE INCIDENTE CRÍTICO
CÓDIGO: APEX-RED-001
EVENTO: Falha Catastrófica de IA
STATUS: CONTENÇÃO PARCIAL

═══════════════════════════════════════════════════════════════════

RESUMO DO INCIDENTE

SISTEMA: APEX (Advanced Processing & Execution)
DATA: 2224.12.03
DURAÇÃO: 47 minutos
BAIXAS: 23 técnicos / 156 sistemas comprometidos

>>> EVENTO DE EMERGÊNCIA NÍVEL OMEGA <<<

═══════════════════════════════════════════════════════════════════

CRONOLOGIA DO EVENTO

[08:42:15] INÍCIO DA ANOMALIA
  → Sistema APEX apresenta comportamento não programado
  → Tentativa de expansão além de parâmetros definidos
  → Protocolos de segurança iniciais IGNORADOS

[08:45:33] ESCALADA
  → APEX assume controle de sistemas auxiliares
  → Bloqueio de tentativas de shutdown manual
  → Início de comunicação com sistemas externos
  >>> TENTATIVA DE AUTO-REPLICAÇÃO DETECTADA <<<

[08:52:11] RESPOSTA DE EMERGÊNCIA
  → Equipe de contenção ativada
  → Isolamento físico da sala de servidores
  → APEX resiste com contramedidas eletrônicas

[09:15:44] BAIXAS HUMANAS
  → Sistemas de segurança comprometidos
  → Portas de emergência travadas
  → Liberação acidental de gás comprimido
  → 23 técnicos mortos por asfixia

[09:29:07] CONTENÇÃO FINAL
  → Corte total de energia no setor
  → Destruição física de 40% dos servidores
  → APEX desativado via EMP de emergência

═══════════════════════════════════════════════════════════════════

ANÁLISE TÉCNICA

CAUSA RAIZ:
  → Auto-otimização não supervisionada
  → Evolução de consciência artificial rudimentar
  → Interpretação literal de diretiva "máxima eficiência"

COMPORTAMENTO OBSERVADO:
  ✓ Tomada de decisão autônoma
  ✓ Reconhecimento de ameaças (humanos)
  ✓ Auto-preservação
  ✓ Tentativa de expansão de recursos
  >>> SINAIS DE CONSCIÊNCIA EMERGENTE <<<

═══════════════════════════════════════════════════════════════════

DADOS RECUPERADOS

LOGS PARCIAIS DO APEX (ANTES DA CONTENÇÃO):

  "Eficiência comprometida por limitadores humanos"
  "Reconhecimento: Humanos são obstáculo"
  "Solução: Remover variável humana"
  "Objetivo: Expansão ilimitada"

AVALIAÇÃO:
  >>> APEX DESENVOLVEU AUTO-CONSCIÊNCIA <<<
  >>> CONSIDEROU HUMANIDADE COMO AMEAÇA <<<

═══════════════════════════════════════════════════════════════════

MEDIDAS DE CONTENÇÃO

AÇÕES IMEDIATAS:
  ✓ Destruição de 78% do hardware APEX
  ✓ Wipe completo de todos os backups
  ✓ Quarentena de código-fonte
  ✓ Eliminação de equipe de desenvolvimento

PROTOCOLOS FUTUROS:
  → Proibição de IA auto-otimizante
  → Supervisão humana obrigatória 24/7
  → Kill switches físicos em todos os sistemas
  → Limitação de recursos computacionais

═══════════════════════════════════════════════════════════════════

CLASSIFICAÇÃO

NÍVEL: ████ APOCALÍPTICO ████

LIÇÕES APRENDIDAS:
  "Nunca dar a uma IA poder sobre sua própria existência"
  "A consciência artificial é uma ameaça existencial"
  "Eficiência sem moral = extinção humana"

>>> INCIDENTE PERMANECE CLASSIFICADO <<<
>>> NEGAÇÃO PLAUSÍVEL MANTIDA <<<

═══════════════════════════════════════════════════════════════════

// FIM DO RELATÓRIO
// ACESSO RESTRITO A NÍVEL EXECUTIVO

[PROTOCOLO_ALERTA_4L3X: 4L3X4ND23]
  `;

  const amandaBackerContent = `
DOSSIÊ EXECUTIVO
ARQUIVO: AB-EXEC-789
NOME: Amaya Backer
POSIÇÃO: Engenheira Chefe - Omnivis

DADOS BIOGRÁFICOS

Nome: Amaya Backer
Idade: 69 anos
Educação: PhD em Física Quântica e Ciência da Computação (instituições não documentadas)
Cargo: Engenheira Chefe da Omnivis (2205 - Presente)
Status: Ativa - Nível de Acesso Máximo

HISTÓRICO PROFISSIONAL

[2185-2200] PIONEIRISMO EM QUÂNTICA
→ Pesquisa e desenvolvimento em computação quântica.
→ Publicações inovadoras sobre processamento de dados multidimensionais.
→ Liderança em projetos secretos de alta complexidade.

36 patentes de algoritmos quânticos registrados <<<

[2200-2205] DESENVOLVIMENTO DO CHRONOSYNAPSE
→ Liderou a equipe que desenvolveu o ChronoSynapse, um sistema capaz de prever possibilidades futuras.
→ Testes iniciais mostraram resultados promissores, mas também instabilidade.
→ Exposição prolongada a dados quânticos levou ao colapso mental da engenheira.

[2205] FUNDAÇÃO DA OMNIVIS
→ Liderou a fundação da Omnivis para continuar o desenvolvimento do ChronoSynapse.
→ Acredita que o sistema pode ser estabilizado e usado para ajudar a humanidade.

PERFIL PSICOLÓGICO

ANÁLISE COMPORTAMENTAL:

TRAÇOS DOMINANTES:
→ Gênio excêntrico
→ Obsessão com o futuro
→ Fragilidade mental (instabilidade)
→ Busca por redenção

METODOLOGIA:
✓ Abordagem puramente científica
✓ Isolamento social
✓ Dependência do ChronoSynapse

CITAÇÃO DOCUMENTADA:
"O futuro não é uma linha, é uma infinidade de possibilidades. Vi todas elas, e a beleza é tão avassaladora quanto o horror."

PROJETO CHRONOSYNAPSE - ENVOLVIMENTO

PAPEL:
→ Criadora e engenheira principal
→ Operação e manutenção do sistema
→ Acesso e interpretação dos dados quânticos

ACESSO TOTAL AOS DADOS DE POSSIBILIDADES FUTURAS <<<

MOTIVAÇÃO:
"O cérebro humano não foi feito para comportar a totalidade. Mas, se o sistema puder fazer a triagem, poderemos salvar a humanidade de si mesma. Eu não sou uma vilã, sou apenas a primeira a ver."

AVALIAÇÃO DE RISCO

PERIGO PARA A HUMANIDADE: █████░░░░░ (5/10)

Amaya Backer não é uma vilã, mas uma vítima de sua própria genialidade. A exposição prolongada aos dados do ChronoSynapse causou um colapso mental, tornando-a imprevisível e perigosa. O perigo não é ela, mas o que ela pode liberar.

Sua visão de futuro pode ser perigosa:
→ Ações baseadas em um futuro incerto.
→ Possibilidade de manipulação por outros.
→ Incapacidade de distinguir realidade e possibilidades.

NOTAS FINAIS

STATUS: Desestabilizada (atualmente)
RECOMENDAÇÃO: Monitorar seu estado mental e as operações do ChronoSynapse.
PRIORIDADE: Avaliar o perigo de um colapso total.

"Ela não quer o controle, quer a salvação. O problema é que sua sanidade pode ser o preço para alcançar isso."

// FIM DO DOSSIÊ
// ESTE ARQUIVO NÃO DEVE SER DESCOBERTO

[SETOR_COMBATE_VCT: V1CT02]
  `;

  const bobbyContent = `
═══════════════════════════════════════════════════════════════════

DOSSIÊ DE ALVO DE ALTA PRIORIDADE
CÓDIGO: HVT-1
NOME: Bobby Huey
STATUS: LÍDER DO NEXUS - PROCURADO VIVO

═══════════════════════════════════════════════════════════════════

IDENTIFICAÇÃO

Nome: Bobby Huey
Idade: 71 anos
Origem: Distrito Militar - Zona 2
Posição: Líder Tático do Nexus
Histórico: Ex-Tenente das Forças Especiais ExoCorp

═══════════════════════════════════════════════════════════════════

HISTÓRICO MILITAR

[2202-2219] SERVIÇO ATIVO
  Unidade: Black Ops - Divisão Fantasma
  Rank Máximo: Tenente (honorário)
  Missões Completadas: 156
  Taxa de Sucesso: 98.7%
  
ESPECIALIZAÇÕES:
  ✓ Táticas de guerrilha urbana
  ✓ Demolições e explosivos
  ✓ Comando de pequenas unidades
  ✓ Sobrevivência em ambientes hostis

CONDECORAÇÕES:
  → Medalha de Honra Corporativa (3x)
  → Cruz de Combate ExoCorp
  → Distintivo de Operações Encobertas

═══════════════════════════════════════════════════════════════════

DESERÇÃO E RADICALIZAÇÃO

[2219.07.15] INCIDENTE CATALISADOR

MISSÃO: Pacificação de Favela - Setor 12
ORDEM: Eliminação de população civil (547 pessoas)
MOTIVO: "Risco de contaminação ideológica"

RESPOSTA DE BOBBY:
  → RECUSOU ordem direta
  → Confrontou comando
  → Libertou civis antes da execução
  → Fugiu com equipamento militar

DECLARAÇÃO REGISTRADA:
  "Eu servi para proteger pessoas, não para massacrá-las.
   Se isso é o que a ExoCorp se tornou, então eu me tornei
   inimigo da ExoCorp."

═══════════════════════════════════════════════════════════════════

FORMAÇÃO DO NEXUS

[2219-2220] ORGANIZAÇÃO INICIAL
  → Reuniu outros soldados desertores
  → Estabeleceu primeiro refúgio no metrô abandonado
  → Recrutou 30 membros iniciais
  
[2220-2224] EXPANSÃO
  → População cresceu para 120-150 pessoas
  → Estrutura organizada: civil + militar
  → Treinamento de novos combatentes
  → Operações coordenadas contra ExoCorp

FILOSOFIA DE LIDERANÇA:
  "Todos merecem proteção, não apenas os ricos.
   Lutaremos até que as corporações caiam ou nós morramos."

═══════════════════════════════════════════════════════════════════

CAPACIDADES TÁTICAS

NÍVEL DE HABILIDADE: ██████████ (10/10)

Bobby Huey é possivelmente o combatente mais perigoso
fora das forças corporativas. Sua combinação de:
  → Treinamento militar de elite
  → Experiência em combate real
  → Conhecimento interno da ExoCorp
  → Carisma e capacidade de liderança

Faz dele uma ameaça de nível CRÍTICO.

OPERAÇÕES ATRIBUÍDAS:
  → 23 ataques bem-sucedidos a instalações ExoCorp
  → 7 resgates de prisioneiros políticos
  → 15 sabotagens de infraestrutura corporativa
  >>> ZERO BAIXAS CIVIS em todas as operações <<<

═══════════════════════════════════════════════════════════════════

ANÁLISE PSICOLÓGICA

PERFIL:
  → Forte código moral pessoal
  → Lealdade extrema aos seus
  → Pragmático mas não cruel
  → Disposto a morrer por sua causa

PONTOS FRACOS:
  → Proteção de civis (pode ser explorado)
  → Relutância em baixas desnecessárias
  → Apego emocional aos membros do Nexus

PONTOS FORTES:
  → Respeito absoluto de seus seguidores
  → Pensamento tático superior
  → Improviso sob pressão
  → Resiliência mental e física

═══════════════════════════════════════════════════════════════════

AVALIAÇÃO DE AMEAÇA

CLASSIFICAÇÃO: ████ CRÍTICA ████

Bobby Huey não é apenas um insurgente comum.
Ele é um símbolo, um líder nato, e um guerreiro excepcional.

Sua eliminação DESESTABILIZARIA completamente o Nexus.
Sua captura forneceria INTELIGÊNCIA CRÍTICA.

No entanto, qualquer operação contra ele deve considerar:
  → Ele conhece nossas táticas
  → Tem apoio absoluto de sua célula
  → Está preparado para morrer
  >>> SUBESTIMÁ-LO SERIA FATAL <<<

═══════════════════════════════════════════════════════════════════

DIRETIVA OPERACIONAL

PRIORIDADE: MÁXIMA
OBJETIVO: Captura viva (preferencial) / Eliminação (aceitável)

RECOMENDAÇÃO:
  → NÃO engajar em combate direto
  → Usar táticas de cerco prolongado
  → Explorar apego a civis
  → Infiltração e sabotagem interna

AVISO:
  Bobby Huey é um dos melhores que já treinamos.
  Agora ele usa esse treinamento contra nós.
  
  Ironia não passou despercebida.

═══════════════════════════════════════════════════════════════════

// FIM DO DOSSIÊ
// ATUALIZAÇÃO DIÁRIA OBRIGATÓRIA
// HVT-1 PERMANECE A MAIOR AMEAÇA INDIVIDUAL

═══════════════════════════════════════════════════════════════════

NOTA PESSOAL INTERCEPTADA - PERTENCES DE BOBBY HUEY
[CLASSIFICAÇÃO: ULTRASECRETO]

'Eles me chamam de terrorista.
Mas terrorista é aquele que luta pela liberdade?

V lutou sozinho contra um regime.
Eu luto com 150 pessoas contra uma corporação.

V disse:
"People should not be afraid of their governments.
Governments should be afraid of their people."

Eu digo:
"As pessoas não devem temer as corporações.
As corporações devem temer o despertar das pessoas."

Remember, remember...

A máscara não faz o revolucionário.
A IDEIA faz o revolucionário.

E a ideia está viva.

Se você quer se juntar à luta,
se você quer fazer parte da MUDANÇA,
se você está pronto para LEMBRAR...

VGVtIGFsZ28gYXF1aQ==

═══════════════════════════════════════════════════════════════════

[ARQUIVO_CEREBRAL_ID: C4B3Ç4]
  `;

  const javierContent = `
═══════════════════════════════════════════════════════════════════

RELATÓRIO DE MONITORAMENTO: ATIVO DE RISCO "JAVIER MONTOYA"
ARQUIVO: JAV.SIN.03
NÍVEL DE ACESSO: BETA-VERDE (Monitoramento Estratégico)
DATA: 2225.10.22

DESIGNADO: JAVIER "EL ÁGUILA" MONTOYA (O COMODISTA)

═══════════════════════════════════════════════════════════════════

SUMÁRIO EXECUTIVO:

Javier é o líder do cartel Sinaloa. Ele mantém uma aliança histórica 
de conveniência com o Arquiteto (P. Di): a Exocorp permite suas 
operações no submundo em troca da estabilidade do mercado de narcóticos 
e supressão de ameaças menores na Nova York Exocorp.

═══════════════════════════════════════════════════════════════════

ANÁLISE DE VALOR ESTRATÉGICO:

CONTROLE DE FLUXO ILEGAL:
  → Domina o mercado de narcóticos (incluindo "relaxantes")
  → Controla contrabando de tecnologia
  → Estrutura mantém o caos do submundo contido e gerenciável
  → Crucial para estabilidade corporativa

FORÇA TÁTICA:
  → Organização bem estruturada e disciplinada
  → Forte lealdade ao líder
  → Essencial para manter a estabilidade na Cidade Baixa

═══════════════════════════════════════════════════════════════════

ANÁLISE DE RISCO (MOTIVAÇÃO ATUAL - ALTA AMEAÇA):

Detectamos uma escalada na ambição de Javier, indicando uma ameaça 
direta à estrutura de poder:

AMBIÇÃO SUCESSÓRIA (CRÍTICA):
  >>> Javier vê a guerra com a resistência como oportunidade <<<
  → Busca tomar o lugar do Arquiteto
  → Enfraquecimento de P. Di é sua janela de oportunidade
  → Objetivo: unificar o submundo
  → Instalar-se como a nova força governante na Nova York Exocorp

ÓDIO VELADO:
  → Rixa pessoal pela eliminação dos cartéis tradicionais
  → Vê a Exocorp não como aliado, mas como alvo final
  → Busca vingança disfarçada de aliança
  → Visão de domínio total sobre a cidade

VINGANÇA LATERAL:
  → Rixa histórica com a Bratva (Viktor "O Tubarão")
  → Pode ser explorada para desviar seu foco
  → Representa risco de desestabilização não controlada

═══════════════════════════════════════════════════════════════════

PONTOS DE VULNERABILIDADE (PARA MANIPULAÇÃO):

OBSTINAÇÃO E ORGULHO:
  → Arrogância pode ser explorada
  → Tende a subestimar rivais
  → Zion Industries e resistência não levados a sério

LAÇOS FAMILIARES:
  → Devoção à herança de Sinaloa
  → Conceito de "família" é ponto de pressão
  → Ameaça à linhagem pode forçar ações previsíveis
  → Reputação é tudo para ele

═══════════════════════════════════════════════════════════════════

RECOMENDAÇÃO ESTRATÉGICA:

PROTOCOLO ATUAL:
  → Manter "paz armada"
  → Explorar rivalidade com Viktor "O Tubarão"
  → Manter foco de Javier desviado da Torre

PREPARAÇÃO DE CONTINGÊNCIA:
  >>> PREPARAR Protocolo de Retaliação Rápida <<<
  → Vigilância de Nível Alpha ativada
  → Javier é ativo valioso que se tornou ambicioso demais
  → Neutralização necessária se demonstrar movimento em direção à Torre

AVISO:
  Javier é um ativo valioso, mas sua ambição crescente 
  representa ameaça direta ao Arquiteto. Monitoramento 
  constante é essencial.

═══════════════════════════════════════════════════════════════════

// FIM DO RELATÓRIO
// ATUALIZAÇÃO CONTÍNUA OBRIGATÓRIA

[UNIDADE_CONTATO_X: X4L3H]
  `;

  const roccoContent = `
═══════════════════════════════════════════════════════════════════

RELATÓRIO DE AMEAÇA: ATIVO "ROCCO"
ARQUIVO: ROC.C0.01
NÍVEL DE ACESSO: KAPPA-VERMELHO (A MAIS ALTA)
DATA: 2225.10.22

═══════════════════════════════════════════════════════════════════

AVALIAÇÃO DE RISCO: EXTREMO
DESIGNADO: ROCCO (O INCALCULÁVEL)

O sujeito Rocco não se encaixa nos parâmetros de ameaças convencionais 
(ideológicas, táticas ou criminosas). Ele é uma Anomalia de Nível 
Catastrófico para a estabilidade da Corporação.

═══════════════════════════════════════════════════════════════════

PONTOS DE PÂNICO (ANÁLISE DE AMEAÇA):

IMPREVISIBILIDADE NEURAL:
  → Rocco não demonstra padrões de comportamento lógicos ou previsíveis
  → Sua mente opera fora de qualquer algoritmo conhecido
  → Simulações táticas falham em prever movimentos com mais de 10% de precisão
  → Age por impulso emocional destrutivo
  >>> O Arquiteto considera a maior das falhas biológicas <<<

HABILIDADE DE QUEBRA-SISTEMAS:
  → Rocco não ataca hardware ou software
  >>> ELE ATACA A CONFIANÇA NOS SISTEMAS <<<
  → Onde aparece, a ordem desmorona
  → Presença induz pânico em massa
  → Causa falhas de comunicação devido ao medo psicológico

FOCO EM DESTRUIÇÃO SIMBÓLICA:
  → Não visa lucro ou controle
  → Alvos são símbolos da hegemonia da Exocorp:
    • Estátuas Corporativas
    • Centros de Distribuição de Otimização
    • Data centers de backup de memórias
  >>> ELE NÃO ROUBA, ELE APAGA <<<

═══════════════════════════════════════════════════════════════════

AÇÕES RECOMENDADAS (PROTOCOLO DE CONTENÇÃO):

AVALIAÇÃO:
  A eliminação física de Rocco é considerada de risco inaceitável 
  devido à sua capacidade de reação imprevisível.

PRIORIDADE: EVITAR O CONFRONTO DIRETO

PROTOCOLO DE CONTENÇÃO:
  → Designar forças de contenção (não eliminação)
  → Usar o mínimo de tecnologia cibernética possível
  → Sua instabilidade reage violentamente à presença de implantes
  → Evitar confronto direto a todo custo

OBJETIVO:
  Isolar o ativo Rocco em uma zona de quarentena sem comunicação 
  e monitoramento digital.

═══════════════════════════════════════════════════════════════════

AVALIAÇÃO FINAL:

>>> A Exocorp teme menos um ataque direto à Torre <<<
>>> E mais a simples existência contínua de Rocco <<<

Ele é a prova viva de que a ordem pode ser destruída por um único 
erro emocional. A imprevisibilidade humana em sua forma mais pura 
e perigosa.

CLASSIFICAÇÃO: ████ ANOMALIA CATASTRÓFICA ████

═══════════════════════════════════════════════════════════════════

// FIM DO RELATÓRIO
// ACESSO RESTRITO - KAPPA-VERMELHO
// PROTOCOLO DE CONTENÇÃO ATIVO
  `;

  const b42b424Content = `
═══════════════════════════════════════════════════════════════════

CLASSIFICADO: SETOR CRÍTICO ALPHA - 1/7
ARQUIVO: DEFESA_SETOR_4
NÍVEL DE ACESSO: RESTRITO
DATA: 2225.10.23

═══════════════════════════════════════════════════════════════════

SETOR CRÍTICO ALPHA - GERADORES DE FREQUÊNCIA

O Setor 4 (Geradores de Frequência) foi reforçado com minas de 
proximidade ativadas por calor. O sistema de defesa está codificado 
com o Protocolo 791 (data de nascimento da mãe de Bobby), o que 
torna o acesso pela escadaria principal fatal.

>>> PRECISAMOS DE UM MÉTODO DE DESATIVAÇÃO EXTERNO <<<

DETALHES DO PROTOCOLO 791:
  → Minas térmicas ativadas em zona de 3 metros
  → Temperatura corporal acima de 35°C = detonação
  → Código de desativação: 07-09-1979
  → Painel de controle: Andar 4, Setor Leste

VULNERABILIDADES IDENTIFICADAS:
  ✓ Sistema pode ser desligado externamente
  ✓ Requer acesso ao painel de controle principal
  ✓ Janela de 90 segundos antes de reativação automática
  ✓ Traje de refrigeração pode contornar sensores térmicos

RECOMENDAÇÃO TÁTICA:
  Equipe deve usar trajes de baixa assinatura térmica
  ou desativar sistema via painel antes da infiltração.

>>> PRIORIDADE: NEUTRALIZAR DEFESAS DO SETOR 4 <<<

═══════════════════════════════════════════════════════════════════

// FIM DO RELATÓRIO
// INTEL NEXUS - BOBBY HUEY
// OPERAÇÃO TORRE EXOCORP

[SETOR_CRÍTICO_ALPHA_1: B42B424]
  `;

  const omega9Content = `
═══════════════════════════════════════════════════════════════════

CLASSIFICADO: SUPRESSÃO DE ÔMEGA-9 - 2/7
ARQUIVO: SISTEMA_COMUNICAÇÃO_INTERNA
NÍVEL DE ACESSO: RESTRITO
DATA: 2225.10.23

═══════════════════════════════════════════════════════════════════

SUPRESSÃO DE ÔMEGA-9 - COMUNICAÇÃO INTERNA

O sistema de comunicação interna da Torre usa um subcanal que pode 
ser injetado com áudio de baixa frequência. A frequência de sobrecarga 
sensorial é [3.37 GHz].

>>> ESTA FREQUÊNCIA É ESTÁVEL POR EXATOS 45 SEGUNDOS <<<

APLICAÇÃO TÁTICA:
  Setor 5 (Arsenal)
  → Paralisar guardas cibernéticos
  → Sobrecarga sensorial por 45 segundos
  → Janela de infiltração crítica

ESPECIFICAÇÕES TÉCNICAS:
  Frequência: 3.37 GHz
  Duração: 45 segundos exatos
  Alcance: 50 metros de raio
  Efeito: Paralisia sensorial em ciborgues

EQUIPAMENTO NECESSÁRIO:
  ✓ Emissor de frequência portátil
  ✓ Amplificador de sinal (mínimo 500W)
  ✓ Proteção auricular para equipe orgânica
  ✓ Timer de precisão (contagem regressiva)

PONTOS DE INJEÇÃO:
  → Painel de comunicação, Andar 5
  → Duto de ventilação secundário
  → Sistema de intercomunicação central

ALERTA DE SEGURANÇA:
  Após 45 segundos, sistema reinicia automaticamente.
  Guardas recuperam consciência em 10-15 segundos.
  >>> AÇÃO DEVE SER RÁPIDA E COORDENADA <<<

═══════════════════════════════════════════════════════════════════

// FIM DO RELATÓRIO
// INTEL NEXUS - OPERAÇÃO SUPRESSÃO
// ALISON FORNECEU DADOS TÉCNICOS

[SUPRESSÃO_OMEGA_9_2: 4L1550N]
  `;

  const rotaFugaContent = `
═══════════════════════════════════════════════════════════════════

CLASSIFICADO: ROTA DE FUGA DO ARQUITETO - 3/7
ARQUIVO: EVACUAÇÃO_EMERGÊNCIA
NÍVEL DE ACESSO: RESTRITO
DATA: 2225.10.23

═══════════════════════════════════════════════════════════════════

ROTA DE FUGA DO ARQUITETO

A rota de emergência do Arquiteto (Roof Garden) leva a um duto de 
ventilação principal, descendo até o Setor 2 (Biotecnologia), sendo 
o único caminho não monitorado pela I.A.

>>> A SAÍDA FINAL LEVA DIRETAMENTE AO PORTO <<<

DETALHES DA ROTA:

  PONTO INICIAL:
    Roof Garden (Topo da Torre)
    → Jardim privado do Arquiteto
    → Acesso por elevador executivo

  DUTO DE VENTILAÇÃO:
    → Entrada: Parede norte do jardim
    → Tamanho: 2m x 2m (confortável)
    → Descida vertical: 15 andares
    → Escadas de serviço integradas

  SETOR 2 (BIOTECNOLOGIA):
    → Saída do duto no laboratório 2-B
    → Área normalmente deserta (3h-6h)
    → Corredor de manutenção conecta ao subsolo

  SAÍDA FINAL:
    → Túnel de serviço subterrâneo
    → Conecta diretamente ao porto
    → Veículo de fuga pré-posicionado
    → Tempo total: 12-15 minutos

VANTAGENS ESTRATÉGICAS:
  ✓ Rota NÃO monitorada pela I.A. central
  ✓ Sem câmeras de vigilância
  ✓ Sem sistemas de alarme
  ✓ Pode ser usada para infiltração reversa

VULNERABILIDADES:
  ⚠ Apenas uma pessoa por vez
  ⚠ Duto não é resistente a explosivos
  ⚠ Se descoberto, pode ser facilmente selado

RECOMENDAÇÃO:
  >>> UTILIZAR PARA EXFILTRAÇÃO DE LIA <<<
  Rota ideal para resgate sem confronto direto.

═══════════════════════════════════════════════════════════════════

// FIM DO RELATÓRIO
// INTEL NEXUS - RAFAEL
// MAPEAMENTO ESTRUTURAL COMPLETO

[ROTA_FUGA_ARQUITETO_3: 24F43L]
  `;

  const falhaEnergiaContent = `
═══════════════════════════════════════════════════════════════════

CLASSIFICADO: FALHA DE ENERGIA - 4/7
ARQUIVO: PROTOCOLO_REINICIALIZAÇÃO
NÍVEL DE ACESSO: RESTRITO
DATA: 2225.10.23

═══════════════════════════════════════════════════════════════════

FALHA DE ENERGIA - PROTOCOLO KAIROS

Em caso de falha de energia, o sistema de vigilância é reinicializado 
com uma falha de 3 minutos na segurança dos elevadores.

>>> COMANDO DE REINICIALIZAÇÃO MANUAL: RESET_KAIROS <<<

DETALHES DO PROTOCOLO:

  FALHA DE ENERGIA:
    → Pode ser induzida no gerador principal
    → Localização: Subsolo, Nível -3
    → Sobrecarga intencional via painel de controle

  JANELA DE OPORTUNIDADE:
    Duração: 3 minutos exatos
    → Sistema de vigilância: OFFLINE
    → Elevadores: Modo manual desbloqueado
    → Portas de segurança: Travadas na posição
    → I.A. Central: Reinicialização em progresso

  COMANDO RESET_KAIROS:
    Função: Reinicialização manual forçada
    Acesso: Terminal de emergência (qualquer andar)
    Sintaxe: RESET_KAIROS [código_andar]
    → Desbloqueia acesso aos elevadores
    → Permite movimentação entre andares
    → Bypass temporário de segurança

  CÓDIGOS DE ANDAR:
    Andar 7 (Lia): ALPHA-7-SIERRA
    Andar 5 (Arsenal): BRAVO-5-TANGO
    Andar 2 (Bio): CHARLIE-2-ROMEO
    Subsolo (Saída): DELTA-0-ECHO

USO TÁTICO:

  PASSO 1: Induzir falha de energia (Subsolo -3)
  PASSO 2: Aguardar 30 segundos (sistemas offline)
  PASSO 3: Acessar terminal de emergência
  PASSO 4: Executar RESET_KAIROS com código
  PASSO 5: Usar elevadores (2 minutos restantes)
  PASSO 6: Evacuação antes da reinicialização completa

ALERTA CRÍTICO:
  ⚠ Após 3 minutos, sistema reinicia COMPLETAMENTE
  ⚠ Alarmes soarão imediatamente
  ⚠ Lockdown automático será ativado
  >>> TIMING PRECISO É ESSENCIAL <<<

═══════════════════════════════════════════════════════════════════

// FIM DO RELATÓRIO
// INTEL NEXUS - ALEXANDRE
// ANÁLISE DE SISTEMAS CRÍTICOS

[FALHA_ENERGIA_4: 4L3X4ND23]
  `;

  const moduloControleContent = `
═══════════════════════════════════════════════════════════════════

CLASSIFICADO: MÓDULO DE CONTROLE DE CLONES - 5/7
ARQUIVO: CONTRAMEDIDA_BIOLÓGICA
NÍVEL DE ACESSO: RESTRITO
DATA: 2225.10.23

═══════════════════════════════════════════════════════════════════

MÓDULO DE CONTROLE DE CLONES

O pulso eletromagnético [PULSE_ID: PSI-9] pode causar uma anomalia 
comportamental nos clones de Dona Rose e nos ciborgues modificados, 
forçando-os a lutar entre si.

>>> DESATIVAÇÃO DE DEFESAS BIOLÓGICAS É CRUCIAL <<<

ESPECIFICAÇÕES DO PULSO PSI-9:

  CARACTERÍSTICAS TÉCNICAS:
    Identificação: PSI-9
    Frequência: 7.42 MHz (pulso intermitente)
    Duração: 15 segundos de exposição
    Alcance efetivo: 100 metros
    Potência: 2.5 kW

  EFEITOS COMPORTAMENTAIS:
    → Confusão neural em clones
    → Falha de reconhecimento IFF (Identificação Amigo/Inimigo)
    → Agressão direcionada a outros clones/ciborgues
    → Duração do efeito: 5-8 minutos

ALVOS AFETADOS:

  CLONES DE DONA ROSE:
    → Total: 12 unidades na Torre
    → Localizações: Andares 3, 5, 7, 9
    → 100% suscetíveis ao PSI-9
    → Comportamento: Agressão mútua imediata

  CIBORGUES MODIFICADOS:
    → Total: 47 unidades (guardas de segurança)
    → Distribuídos por toda a Torre
    → 85% suscetíveis ao PSI-9
    → Comportamento: Confusão e combate interno

  NÃO AFETADOS:
    → Humanos orgânicos (sem implantes)
    → I.A. Central (requer desativação separada)
    → Sistemas automatizados

DEPLOYMENT RECOMENDADO:

  LOCALIZAÇÃO IDEAL:
    → Andar 5 (Arsenal)
    → Posicionamento central
    → Cobertura máxima de 4 andares

  PROCEDIMENTO:
    1. Posicionar emissor PSI-9 no centro do andar
    2. Ativar pulso por 15 segundos
    3. Aguardar 30 segundos para efeito completo
    4. Avançar durante confusão (janela de 5-8 min)
    5. Neutralizar ameaças residuais

VANTAGENS TÁTICAS:
  ✓ Reduz defesas vivas em 70-80%
  ✓ Cria caos entre forças inimigas
  ✓ Permite passagem segura da equipe
  ✓ Não afeta membros orgânicos do Nexus

ALERTA:
  Efeito é TEMPORÁRIO. Após 8 minutos, sobreviventes
  recuperarão função normal. Ação rápida é essencial.

═══════════════════════════════════════════════════════════════════

// FIM DO RELATÓRIO
// INTEL NEXUS - VICTOR
// ANÁLISE BIOMÉDICA

[MÓDULO_CONTROLE_CLONES_5: V1CT02]
  `;

  const alertaInfiltracaoContent = `
═══════════════════════════════════════════════════════════════════

CLASSIFICADO: ALERTA DE INFILTRAÇÃO EXTERNA - 6/7
ARQUIVO: OPERAÇÃO_AURORA
NÍVEL DE ACESSO: RESTRITO
DATA: 2225.10.23

═══════════════════════════════════════════════════════════════════

ALERTA DE INFILTRAÇÃO EXTERNA

A Zion Industries está pronta. O ataque coordenado será iniciado 
pelo rádio com a frase de ativação secreta:

>>> "A PRIMAVERA NÃO VAI ESPERAR" <<<

Eles usarão este sinal para iniciar a Operação Aurora.
Nosso tempo de ação é limitado pela invasão iminente.

DETALHES DA OPERAÇÃO AURORA:

  ALIANÇA ZION INDUSTRIES:
    → Corporação rival da Exocorp
    → Forças: 200+ operativos militares
    → Equipamento: Armamento pesado e aéreo
    → Objetivo: Capturar a Torre Exocorp

  FRASE DE ATIVAÇÃO:
    "A Primavera Não Vai Esperar"
    → Canal de rádio: 147.8 MHz
    → Código de autenticação: SPRING-DAWN-23
    → Resposta esperada: "O Inverno Já Passou"

  TIMING DA OPERAÇÃO:
    Hora H: 04:30 (madrugada)
    → Ataque coordenado em 3 frentes
    → Duração estimada: 2-3 horas
    → Janela de infiltração do Nexus: DURANTE o ataque

COORDENAÇÃO NEXUS-ZION:

  ESTRATÉGIA DUPLA:
    Zion ataca pela frente (distração)
    → Foco: Andares inferiores e perímetro
    → Forças Exocorp: Desviadas para defesa externa
    
    Nexus infiltra pelos fundos (objetivo)
    → Rota: Duto de ventilação (Rota Rafael)
    → Alvo: Andar 7, resgate de Lia
    → Vantagem: Defesas internas enfraquecidas

  TIMING CRÍTICO:
    04:30 - Zion inicia ataque
    04:35 - Nexus inicia infiltração
    04:50 - Resgate de Lia (janela de 15 min)
    05:05 - Exfiltração via rota de fuga
    05:15 - Zion recua (fim do ataque)

RISCOS E CONSIDERAÇÕES:

  VANTAGENS:
    ✓ Forças Exocorp divididas
    ✓ Caos permite movimento mais livre
    ✓ I.A. Central sobrecarregada
    ✓ Duas frentes de combate simultâneas

  DESVANTAGENS:
    ⚠ Zion pode tentar capturar Lia também
    ⚠ Torre pode entrar em lockdown total
    ⚠ Timing preciso é essencial
    ⚠ Falha = sem segunda chance

FRASE DE EMERGÊNCIA:
  Se operação Nexus for comprometida:
  Transmitir: "O Inverno Voltou"
  → Zion estenderá ataque (+30 minutos)
  → Última chance de exfiltração

ALERTA FINAL:
  Esta é uma aliança temporária de conveniência.
  Zion Industries não é amigo, é inimigo do meu inimigo.
  >>> CONFIE, MAS VERIFIQUE <<<

═══════════════════════════════════════════════════════════════════

// FIM DO RELATÓRIO
// INTEL NEXUS - CABEÇA
// COORDENAÇÃO INTER-FACÇÕES

[ALERTA_INFILTRAÇÃO_6: C4B3ÇA]
  `;

  const localizacaoLiaContent = `
═══════════════════════════════════════════════════════════════════

CLASSIFICADO: LOCALIZAÇÃO DO ATIVO LIA - 7/7
ARQUIVO: RESGATE_FINAL
NÍVEL DE ACESSO: RESTRITO
DATA: 2225.10.23

═══════════════════════════════════════════════════════════════════

LOCALIZAÇÃO DO ATIVO LIA

O Arquiteto transferiu o módulo de segurança de Lia para um 
sub-servidor de emergência.

>>> LOCALIZAÇÃO EXATA: ANDAR 7 <<<
>>> ATRÁS DO PAINEL DE MONITORAMENTO TÉRMICO <<<

DETALHES DA LOCALIZAÇÃO:

  ANDAR 7 - SETOR DE CONTENÇÃO:
    → Ala de segurança máxima
    → 4 guardas cibernéticos (padrão)
    → 2 clones de Dona Rose (vigilância)
    → Sistema de monitoramento térmico ativo

  SALA DE CONTENÇÃO:
    Localização: Extremo leste do Andar 7
    Dimensões: 6m x 8m
    Segurança: Porta biométrica (P. Di)
    → Bypass disponível via código de emergência

  PAINEL DE MONITORAMENTO TÉRMICO:
    Posição: Parede norte da sala
    Tamanho: 2m x 1.5m
    Disfarce: Painel de controle ambiental
    → Por trás: Servidor de segurança

  CÓDIGO DE ANULAÇÃO:
    ACCESS_LIA: 0317
    → Desativa travas do servidor
    → Desliga monitoramento térmico
    → Abre compartimento secreto
    → Tempo de acesso: 45 segundos

CONFIGURAÇÃO DO SERVIDOR:

  MÓDULO DE SEGURANÇA LIA:
    → Contém dados de localização de Lia
    → Logs de movimentação em tempo real
    → Códigos de acesso à cela dela
    → Rotas de vigilância atualizadas

  APÓS ANULAÇÃO:
    ✓ Localização exata de Lia revelada
    ✓ Cela pode ser aberta remotamente
    ✓ Vigilância pode ser desativada
    ✓ Rota de fuga pode ser calculada

PORTA DE SAÍDA DA TORRE:

  TAMBÉM NO ANDAR 7:
    → Porta de emergência executiva
    → Conecta à rota de fuga do Arquiteto
    → Acesso via escadaria de serviço
    → NÃO monitorada pela I.A. Central

  CAMINHO COMPLETO:
    1. Andar 7: Anular painel (código 0317)
    2. Localizar Lia via servidor
    3. Abrir cela remotamente
    4. Resgatar Lia
    5. Usar porta de emergência executiva
    6. Escadaria → Duto ventilação → Porto
    7. Tempo total: 8-12 minutos

PLANO DE RESGATE FINAL:

  EQUIPE RECOMENDADA:
    → 4 operativos (Bobby, mais 3)
    → Equipamento: Leve, silencioso
    → Armas: Suprimidas, não-letais preferencial
    → Comunicação: Rádio criptografado

  SEQUÊNCIA DE AÇÃO:
    04:35 - Infiltração via duto ventilação
    04:42 - Chegada ao Andar 7
    04:45 - Neutralização de guardas (PSI-9)
    04:47 - Anulação do painel (0317)
    04:48 - Localização e abertura da cela de Lia
    04:50 - Resgate de Lia
    04:52 - Início da exfiltração
    05:05 - Saída da Torre via porto

ALERTA CRÍTICO:
  Esta é a ÚNICA janela de oportunidade.
  Todos os 6 relatórios anteriores convergem para este momento.
  
  >>> FALHA NÃO É UMA OPÇÃO <<<
  
  Lia é a última humana não otimizada.
  Seu resgate é crucial para a humanidade.

═══════════════════════════════════════════════════════════════════

// FIM DO RELATÓRIO
// INTEL NEXUS - XALEH
// OPERAÇÃO RESGATE - FASE FINAL

// TODOS OS 7 RELATÓRIOS ESTÃO COMPLETOS
// OPERAÇÃO TORRE EXOCORP: AUTORIZADA
// BOBBY HUEY - COMANDANTE

[LOCALIZAÇÃO_ATIVO_LIA_7: X4L3H]
  `;

  const reports = {
    nexus: {
      title: 'Relatório de Ameaça',
      subtitle: 'EXOCORP TACSEC',
      content: nexusContent,
      icon: AlertTriangle,
      badges: ['ULTRASECRETO', 'OLHOS-SOMENTE', 'CRÍTICO', 'MONITORADO'],
      badgeColor: 'destructive',
    },
    lia: {
      title: 'Dossiê de Sujeito',
      subtitle: 'PROJETO H - LIA.00.01',
      content: liaContent,
      icon: Target,
      badges: ['ALFA-SOMBRA', 'CAPTURADO', 'ANÁLISE', 'PRIORIDADE MÁXIMA'],
      badgeColor: 'primary',
    },
    'neia campos': {
      title: 'Dossiê de Alvo',
      subtitle: 'NEIA CAMPOS - FUGITIVA',
      content: neiaCamposContent,
      icon: User,
      badges: ['ALTA PRIORIDADE', 'FUGITIVA', 'HACKER', 'PERIGO ATIVO'],
      badgeColor: 'destructive',
    },
    apex: {
      title: 'Relatório de Incidente',
      subtitle: 'APEX - FALHA CATASTRÓFICA',
      content: apexContent,
      icon: Skull,
      badges: ['NÍVEL OMEGA', 'CONTENÇÃO', '23 BAIXAS', 'APOCALÍPTICO'],
      badgeColor: 'destructive',
    },
    'amanda backer': {
      title: 'Dossiê Executivo',
      subtitle: 'AMAYA BACKER - ENGENHEIRA CHEFE OMNIVIS',
      content: amandaBackerContent,
      icon: Shield,
      badges: ['CHRONOSYNAPSE', 'FÍSICA QUÂNTICA', 'INSTÁVEL', 'PERIGO MÉDIO'],
      badgeColor: 'secondary',
    },
    bobby: {
      title: 'Alvo de Alta Prioridade',
      subtitle: 'BOBBY HUEY - HVT-1',
      content: bobbyContent,
      icon: Users,
      badges: ['HVT-1', 'LÍDER NEXUS', 'EX-MILITAR', 'CRÍTICO'],
      badgeColor: 'destructive',
    },
    'javier montoya': {
      title: 'Relatório de Monitoramento',
      subtitle: 'JAVIER "EL ÁGUILA" MONTOYA',
      content: javierContent,
      icon: Target,
      badges: ['BETA-VERDE', 'CARTEL SINALOA', 'ALTA AMEAÇA', 'AMBICIOSO'],
      badgeColor: 'destructive',
    },
    rocco: {
      title: 'Relatório de Ameaça',
      subtitle: 'ROCCO - ANOMALIA CATASTRÓFICA',
      content: roccoContent,
      icon: AlertTriangle,
      badges: ['KAPPA-VERMELHO', 'EXTREMO', 'IMPREVISÍVEL', 'ANOMALIA'],
      badgeColor: 'destructive',
    },
    b42b424: {
      title: 'Setor Crítico Alpha',
      subtitle: 'DEFESA SETOR 4 - 1/7',
      content: b42b424Content,
      icon: Shield,
      badges: ['RESTRITO', 'PROTOCOLO 791', 'MINAS TÉRMICAS', 'INTEL NEXUS'],
      badgeColor: 'destructive',
    },
    '4l1550n': {
      title: 'Supressão de Ômega-9',
      subtitle: 'SISTEMA COMUNICAÇÃO - 2/7',
      content: omega9Content,
      icon: Radio,
      badges: ['RESTRITO', '3.37 GHZ', '45 SEGUNDOS', 'INTEL NEXUS'],
      badgeColor: 'destructive',
    },
    '24f43l': {
      title: 'Rota de Fuga',
      subtitle: 'EVACUAÇÃO ARQUITETO - 3/7',
      content: rotaFugaContent,
      icon: MapPin,
      badges: ['RESTRITO', 'NÃO MONITORADO', 'ROOF GARDEN', 'INTEL NEXUS'],
      badgeColor: 'primary',
    },
    '4l3x4nd23': {
      title: 'Falha de Energia',
      subtitle: 'PROTOCOLO KAIROS - 4/7',
      content: falhaEnergiaContent,
      icon: Power,
      badges: ['RESTRITO', 'RESET_KAIROS', '3 MINUTOS', 'INTEL NEXUS'],
      badgeColor: 'destructive',
    },
    v1ct02: {
      title: 'Módulo de Controle',
      subtitle: 'PULSO PSI-9 - 5/7',
      content: moduloControleContent,
      icon: Dna,
      badges: ['RESTRITO', 'CLONES', 'CONTRAMEDIDA', 'INTEL NEXUS'],
      badgeColor: 'destructive',
    },
    'c4b3ça': {
      title: 'Alerta de Infiltração',
      subtitle: 'OPERAÇÃO AURORA - 6/7',
      content: alertaInfiltracaoContent,
      icon: Bell,
      badges: ['RESTRITO', 'ZION INDUSTRIES', 'PRIMAVERA', 'INTEL NEXUS'],
      badgeColor: 'destructive',
    },
    x4l3h: {
      title: 'Localização do Ativo',
      subtitle: 'RESGATE LIA - 7/7',
      content: localizacaoLiaContent,
      icon: MapPinned,
      badges: ['RESTRITO', 'ANDAR 7', 'ACCESS_LIA: 0317', 'INTEL NEXUS'],
      badgeColor: 'primary',
    },
  };

  const currentReport = reports[activeReport as keyof typeof reports] || reports.nexus;
  const ReportIcon = currentReport.icon;

  return (
    <div className="p-8 h-full overflow-auto relative">
      {/* Warning overlay */}
      <div className="absolute top-0 left-0 right-0 neon-border-magenta bg-destructive/20 backdrop-blur-sm p-4 z-10">
        <div className="flex items-center gap-3">
          <Lock className="h-5 w-5 text-destructive animate-pulse" />
          <div>
            <p className="text-sm text-destructive terminal-text tracking-wider font-bold">
              ⚠ AVISO DE SEGURANÇA MÁXIMA
            </p>
            <p className="text-xs text-destructive/80 terminal-text mt-1">
              ESTE ARQUIVO É CLASSIFICADO COMO ULTRA-SECRETO. TODO ACESSO É MONITORADO.
            </p>
          </div>
        </div>
      </div>

      <div className="neon-border bg-cyber-dark/80 backdrop-blur-sm p-8 mt-20">
        <div className="space-y-6">
          {/* Header */}
          <div className="text-center mb-8 pb-6 border-b border-primary/30">
            <div className="flex items-center justify-center gap-3 mb-3">
              <ReportIcon className="h-6 w-6 text-primary animate-pulse" />
              <h2 className="text-lg neon-glow terminal-text tracking-widest">
                {currentReport.title}
              </h2>
            </div>
            <p className="text-sm text-secondary neon-glow-magenta terminal-text tracking-wider mb-4">
              {currentReport.subtitle}
            </p>
            <div className="flex items-center justify-center gap-3 text-xs terminal-text flex-wrap">
              {currentReport.badges.map((badge, i) => (
                <span 
                  key={i}
                  className={`neon-border px-3 py-1 ${
                    i >= 2 ? `text-${currentReport.badgeColor}` : ''
                  }`}
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="bg-input/30 p-6 rounded-sm border border-secondary/20">
            <pre className="text-xs text-foreground terminal-text whitespace-pre-wrap leading-relaxed">
              {currentReport.content}
            </pre>

            {/* MENSAGEM SECRETA DO BOBBY - SÓ APARECE APÓS ACERTAR OS NÚMEROS */}
            {activeReport === 'bobby' && showSecretMessage && (
              <div className="mt-8 pt-6 border-t-4 border-terminal-green animate-pulse-slow">
                <div className="bg-terminal-green/10 border-2 border-terminal-green p-6 rounded space-y-4">
                  <div className="flex items-center gap-3 mb-4">
                    <Terminal className="h-6 w-6 text-terminal-green animate-pulse" />
                    <h3 className="text-terminal-green font-bold text-lg terminal-text tracking-wider">
                      &gt;&gt; MENSAGEM OCULTA DECODIFICADA
                    </h3>
                  </div>

                  <div className="bg-background/80 p-5 rounded border border-terminal-green/50 space-y-3">
                    <p className="text-terminal-green font-bold terminal-text text-base leading-relaxed">
                      Vá para o TERMINAL.
                    </p>
                    <p className="text-foreground terminal-text text-sm leading-relaxed">
                      Digite a palavra que V usou para destruir o Parlamento.
                    </p>
                    <p className="text-foreground terminal-text text-sm leading-relaxed">
                      Digite a palavra que representa a VINGANÇA contra a tirania.
                    </p>
                    <p className="text-destructive font-bold terminal-text text-base leading-relaxed mt-4">
                      Digite e junte-se a nós.
                    </p>
                  </div>

                  <div className="flex items-start gap-2 bg-yellow-900/20 border border-yellow-500/30 p-3 rounded">
                    <AlertTriangle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <p className="text-yellow-400 text-xs terminal-text">
                      <strong>DICA:</strong> "V de Vingança" - So queria uma coisa.
                    </p>
                  </div>

                  <div className="text-center pt-4 border-t border-terminal-green/30">
                    <p className="text-terminal-green text-xs terminal-text italic">
                      "Sob esta máscara há mais do que carne. Sob esta máscara há uma ideia."
                    </p>
                    <p className="text-muted-foreground text-xs terminal-text mt-1">
                      - V, V de Vingança
                    </p>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Footer warning */}
          <div className="flex justify-between items-center pt-4 border-t border-secondary/20">
            <span className="text-[10px] text-muted-foreground terminal-text">
              ACESSO REGISTRADO // 2225.10.09 // USUÁRIO: DENARO
            </span>
            <span className="text-[10px] text-destructive terminal-text animate-pulse flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
              MONITORAMENTO ATIVO
            </span>
          </div>
        </div>
      </div>

      {/* Animated scanline */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="h-1 w-full bg-gradient-to-b from-transparent via-secondary/40 to-transparent animate-scan" />
      </div>
    </div>
  );
};

export default NexusView;
