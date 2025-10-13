import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Lock, AlertTriangle, Target, Shield, Skull, User, Users } from 'lucide-react';

type ReportType = 'nexus' | 'lia' | 'neia campos' | 'apex' | 'amanda backer' | 'bobby';

const NexusView = () => {
  const [activeReport, setActiveReport] = useState<ReportType>('nexus');
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const report = urlParams.get('report') as ReportType;
    if (report) {
      setActiveReport(report);
    }
  }, [location.search]);

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

// FIM DO DOSSIÊ
// ACESSO EXCLUSIVO NÍVEL ALFA-SOMBRA
// TODO ACESSO É REGISTRADO E MONITORADO
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
Idade: 32 anos
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
  `;

  const amandaBackerContent = `
═══════════════════════════════════════════════════════════════════

DOSSIÊ EXECUTIVO
ARQUIVO: AB-EXEC-789
NOME: Amanda Backer
POSIÇÃO: CEO - ExoCorp

═══════════════════════════════════════════════════════════════════

DADOS BIOGRÁFICOS

Nome: Amanda Backer
Idade: 48 anos
Educação: MBA Harvard, PhD Neurociência MIT
Cargo: CEO da ExoCorp (2218 - Presente)
Status: Ativa - Nível de Acesso Máximo

═══════════════════════════════════════════════════════════════════

HISTÓRICO PROFISSIONAL

[2195-2210] ASCENSÃO CORPORATIVA
  → Início como Pesquisadora Junior
  → Desenvolvimento de implantes neurais de 3ª geração
  → 47 patentes registradas em seu nome
  → Promoção para Diretora de P&D (2205)

[2210-2218] CONSOLIDAÇÃO DE PODER
  → VP de Operações Tecnológicas
  → Liderou fusão com BioSynt Corporation
  → Eliminação estratégica de rivais internos
  >>> 3 "acidentes" documentados <<<

[2218] NOMEAÇÃO COMO CEO
  → Aprovação unânime do conselho
  → Implementação de "Projeto H"
  → Parceria estratégica com O Arquiteto

═══════════════════════════════════════════════════════════════════

PERFIL PSICOLÓGICO

ANÁLISE COMPORTAMENTAL:

TRAÇOS DOMINANTES:
  → Ambição ilimitada
  → Falta de empatia (psicopatia funcional)
  → Inteligência excepcional (QI 156)
  → Visão de longo prazo

METODOLOGIA:
  ✓ Pragmatismo extremo
  ✓ Fins justificam os meios
  ✓ Manipulação de narrativas públicas
  ✓ Eliminação de obstáculos (qualquer custo)

CITAÇÃO DOCUMENTADA:
  "A humanidade precisa de orientação, não de democracia.
   Somos a evolução em forma corporativa."

═══════════════════════════════════════════════════════════════════

PROJETO H - ENVOLVIMENTO

PAPEL:
  → Patrocinadora principal
  → Fornecimento de recursos ilimitados
  → Proteção política e legal
  >>> CONHECIMENTO COMPLETO DE TODAS AS OPERAÇÕES <<<

MOTIVAÇÃO:
  "Criar uma humanidade perfeita, otimizada, controlável.
   A raça humana 2.0 não cometerá os erros do passado.
   Seremos os arquitetos de nosso próprio destino."

INVESTIMENTO:
  → 847 bilhões de créditos
  → 15 anos de desenvolvimento
  → Recursos ilimitados alocados

═══════════════════════════════════════════════════════════════════

OPERAÇÕES ENCOBERTAS

ATIVIDADES DOCUMENTADAS:

[ELIMINAÇÃO DE OPOSITORES]
  → 12 jornalistas investigativos "desaparecidos"
  → 5 políticos hostis "substituídos"
  → 200+ ativistas em prisões negras

[MANIPULAÇÃO SOCIAL]
  → Controle de 67% da mídia global
  → Propaganda pró-corporativa 24/7
  → Supressão de informações conflitantes

[EXPERIMENTOS NÃO AUTORIZADOS]
  → Testes em populações vulneráveis
  → Modificações genéticas ilegais
  >>> VIOLAÇÃO DE 47 TRATADOS INTERNACIONAIS <<<

═══════════════════════════════════════════════════════════════════

AVALIAÇÃO DE RISCO

PERIGO PARA A HUMANIDADE: ████████░░ (9/10)

Amanda Backer representa a elite corporativa em sua forma
mais perigosa: inteligente, rica, sem moral, e com acesso
a tecnologia capaz de remodelar a própria humanidade.

Sua visão de "humanidade perfeita" é fundamentalmente 
totalitária e representa extinção da liberdade individual.

>>> NÃO PODE SER DETIDA POR MEIOS CONVENCIONAIS <<<
>>> PROTEÇÃO POLÍTICA E MILITAR ABSOLUTA <<<

═══════════════════════════════════════════════════════════════════

NOTAS FINAIS

STATUS: Intocável (atualmente)
RECOMENDAÇÃO: Vigilância contínua
PRIORIDADE: Documentar todas as atividades

"Ela não é apenas uma CEO. Ela é uma ameaça existencial
 disfarçada de líder empresarial."

═══════════════════════════════════════════════════════════════════

// FIM DO DOSSIÊ
// ESTE ARQUIVO NÃO DEVE SER DESCOBERTO
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
Idade: 41 anos
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
      subtitle: 'AMANDA BACKER - CEO EXOCORP',
      content: amandaBackerContent,
      icon: Shield,
      badges: ['NÍVEL EXECUTIVO', 'PROJETO H', 'INTOCÁVEL', 'AMEAÇA MÁXIMA'],
      badgeColor: 'primary',
    },
    bobby: {
      title: 'Alvo de Alta Prioridade',
      subtitle: 'BOBBY HUEY - HVT-1',
      content: bobbyContent,
      icon: Users,
      badges: ['HVT-1', 'LÍDER NEXUS', 'EX-MILITAR', 'CRÍTICO'],
      badgeColor: 'destructive',
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
