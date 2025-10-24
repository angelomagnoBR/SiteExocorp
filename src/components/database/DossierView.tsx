import { useState } from 'react';
import { ArrowLeft, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Target {
  id: string;
  codename: string;
  realName: string;
  status: 'ATIVO' | 'NEUTRALIZADO' | 'EM OBSERVAÇÃO' | 'DESAPARECIDO';
  priority: 'CRÍTICO' | 'ALTO' | 'MÉDIO' | 'BAIXO';
  lastUpdate: string;
  threatLevel: string;
  dossier: string;
}

const targets: Target[] = [
  {
    id: '001-MENTOR-NY',
    codename: 'O MENTOR',
    realName: 'Bobby Huey',
    status: 'NEUTRALIZADO',
    priority: 'CRÍTICO',
    lastUpdate: '15.10.2225',
    threatLevel: 'NEUTRALIZADO',
    dossier: `
DOSSIÊ DE ANÁLISE DE AMEAÇA – EXOCORP SEC.

CLASSIFICAÇÃO: ULTRASECRETO // ACESSO ALPHA
ID DO ARQUIVO: 001-MENTOR-NY
DATA: 15.10.2225
ASSUNTO: Bobby Huey, a.k.a. "O Mentor"
NÍVEL DE AMEAÇA: NEUTRALIZADO
STATUS: ELIMINADO

═══════════════════════════════════════════════════════════

1.0 RESUMO EXECUTIVO

Bobby Huey, líder supremo do movimento insurgente Nexus, foi
neutralizado com êxito em operação coordenada. Sua eliminação
representa um golpe crítico à moral e coesão da resistência
"orgânica" em Nova York.

>>> OPERAÇÃO CONCLUÍDA COM SUCESSO <<<
>>> ALVO NEUTRALIZADO: 14.10.2225 <<<

═══════════════════════════════════════════════════════════

2.0 ANÁLISE DE CAPACIDADES

2.1 PONTOS FORTES (VETORES DE AMEAÇA)

▸ Carisma Excepcional
  Capacidade comprovada de inspirar lealdade absoluta. Seus
  seguidores demonstram disposição ao martírio.

▸ Unificação de Facções
  Único líder capaz de manter coesão entre grupos ideologicamente
  diversos. Sua presença é o cimento do Nexus.

▸ Simbolismo
  Representa a esperança da "resistência orgânica". Sua imagem
  transcende sua pessoa física.

▸ Experiência Militar
  Background confirmado em operações táticas. Conhecimento de
  contra-vigilância e guerra urbana.

2.2 PONTOS FRACOS (VETORES DE EXPLORAÇÃO)

▸ Idealismo Excessivo
  Subestima sistematicamente a brutalidade corporativa. Hesita
  em tomar medidas extremas.

▸ Lealdade aos Aliados
  Sua devoção aos subordinados é explorável. Ameaças aos seus
  seguidores podem forçar erros táticos.

▸ Confiança em Estruturas
  Dependente da organização do Nexus. Isolamento pode
  comprometer sua eficácia.

═══════════════════════════════════════════════════════════

3.0 OPERAÇÃO DE NEUTRALIZAÇÃO

STATUS: CONCLUÍDA

▸ Data de Eliminação: 14.10.2225
▸ Local: [CLASSIFICADO]
▸ Método: Ação tática coordenada

▸ Resultado:
  - Alvo neutralizado permanentemente
  - Corpo recuperado e sob custódia ExoCorp
  - Impacto imediato observado na moral insurgente

▸ Monitoramento Pós-Operação:
  - Vigilância intensificada sobre membros remanescentes do Nexus
  - Análise de sucessão de liderança em andamento
  - Preparação para exploração psicológica da perda

>>> MISSÃO CUMPRIDA <<<
>>> RESISTÊNCIA SEVERAMENTE DESESTABILIZADA <<<

═══════════════════════════════════════════════════════════

// FIM DO DOSSIÊ
    `
  },
  {
    id: '002-CIENTISTA-NY',
    codename: 'O CIENTISTA',
    realName: 'Artz',
    status: 'ATIVO',
    priority: 'CRÍTICO',
    lastUpdate: '12.10.2225',
    threatLevel: 'CRÍTICO',
    dossier: `
DOSSIÊ DE ANÁLISE DE AMEAÇA – EXOCORP SEC.

CLASSIFICAÇÃO: CONFIDENCIAL // ACESSO ALPHA
ID DO ARQUIVO: 002-CIENTISTA-NY
DATA: 12.10.2225
ASSUNTO: Artz, a.k.a. "O Cientista"
NÍVEL DE AMEAÇA: ALTO

═══════════════════════════════════════════════════════════

1.0 RESUMO EXECUTIVO

Artz é o estrategista tático do Nexus, responsável pela análise
de dados e planejamento operacional. Sua capacidade de improvisação
e visão estratégica o tornam um multiplicador de força para a
insurgência.

═══════════════════════════════════════════════════════════

2.0 ANÁLISE DE CAPACIDADES

2.1 PONTOS FORTES

▸ Análise Tática Superior
  Habilidade excepcional em processar dados complexos e
  transformá-los em planos operacionais viáveis.

▸ Capacidade Científica
  Conhecimento técnico avançado. Desenvolve soluções
  improvisadas para problemas táticos.

▸ Improvisação em Tempo Real
  Adapta planos rapidamente diante de contingências.

▸ Rede de Informações
  Conexões com o submundo da Cidade Baixa, especialmente
  através de Adrian.

2.2 PONTOS FRACOS

▸ Dependência de Dados Externos
  Sua eficácia depende de fluxo constante de informações.
  Vulnerável a desinformação estratégica.

▸ Conexões Rastreáveis
  Suas interações com Adrian e fóruns clandestinos podem
  ser monitoradas e exploradas.

▸ Foco Analítico
  Pode sofrer de "paralisia por análise" em situações
  de alta pressão temporal.

═══════════════════════════════════════════════════════════

3.0 DIRETIVA DE AÇÃO

▸ Operação "Informação Envenenada"
  Infiltrar dados falsos através da rede de Adrian.

▸ Monitoramento Ativo
  Vigilância de todos os fóruns clandestinos conhecidos.

▸ Neutralização por Isolamento
  Cortar suas fontes de informação para reduzir eficácia.

═══════════════════════════════════════════════════════════

// FIM DO DOSSIÊ
    `
  },
  {
    id: '003-HACKER-NY',
    codename: 'O FANTASMA',
    realName: '[IDENTIDADE DESCONHECIDA]',
    status: 'ATIVO',
    priority: 'CRÍTICO',
    lastUpdate: '12.10.2225',
    threatLevel: 'CRÍTICO',
    dossier: `
DOSSIÊ DE ANÁLISE DE AMEAÇA – EXOCORP SEC.

CLASSIFICAÇÃO: ULTRASECRETO // ACESSO ALPHA
ID DO ARQUIVO: 003-HACKER-NY
DATA: 12.10.2225
ASSUNTO: "O Fantasma" (Hacker)
NÍVEL DE AMEAÇA: CRÍTICO

═══════════════════════════════════════════════════════════

1.0 RESUMO EXECUTIVO

>>> IDENTIDADE NÃO CONFIRMADA <<<

O ativo conhecido apenas como "O Fantasma" é uma lenda urbana
materializada. Sem nome, sem registro, sem rosto. Responsável
pelas mais sofisticadas invasões aos sistemas ExoCorp.

Uma entidade digital que se tornou mítica.

═══════════════════════════════════════════════════════════

2.0 ANÁLISE DE CAPACIDADES

2.1 PONTOS FORTES

▸ Anonimato Absoluto
  Não existe registro físico ou digital confirmado de sua
  identidade real.

▸ Habilidades Elite de Hacking
  Capacidade de penetrar sistemas de segurança de nível
  corporativo máximo.

▸ Status de Lenda
  Sua mera existência inspira outros hackers. É um símbolo
  da resistência digital.

▸ Sem Padrão Identificável
  Métodos, horários e alvos variam constantemente. Impossível
  estabelecer perfil comportamental confiável.

2.2 PONTOS FRACOS

▸ Ausência de Conexões Físicas
  Sem laços pessoais identificáveis. Dificulta localização
  mas também limita influência direta.

▸ Dependência de Infraestrutura Digital
  Vulnerável a contramedidas de segurança cibernética em
  larga escala.

▸ Isolamento Operacional
  Trabalha sozinho. Sem rede de apoio físico conhecida.

═══════════════════════════════════════════════════════════

3.0 DIRETIVA DE AÇÃO

▸ Análise de Padrões de Ataque
  Sistema de IA dedicado a identificar assinaturas digitais
  recorrentes.

▸ Honeypots Estratégicos
  Criação de alvos falsos para estudar metodologias e tentar
  rastreamento reverso.

▸ Recompensa Massiva
  Prêmio de 50 milhões de créditos por informações que levem
  à identificação.

>>> PRIORIDADE MÁXIMA: IDENTIFICAÇÃO <<<

═══════════════════════════════════════════════════════════

// FIM DO DOSSIÊ
    `
  },
  {
    id: '004-DUPLA-NY',
    codename: 'A DUPLA',
    realName: 'Ramona & Nyx',
    status: 'ATIVO',
    priority: 'ALTO',
    lastUpdate: '12.10.2225',
    threatLevel: 'SEVERO',
    dossier: `
DOSSIÊ DE ANÁLISE DE AMEAÇA – EXOCORP SEC.

CLASSIFICAÇÃO: CONFIDENCIAL // ACESSO ALPHA
ID DO ARQUIVO: 004-DUPLA-NY
DATA: 12.10.2225
ASSUNTO: Ramona & Nyx, a.k.a. "A Dupla"
NÍVEL DE AMEAÇA: SEVERO

═══════════════════════════════════════════════════════════

1.0 RESUMO EXECUTIVO

Ramona e Nyx operam como uma unidade tática única. Suas
habilidades complementares de combate e direção as tornam
uma ameaça letal em operações móveis e de extração.

>>> ATUALIZAÇÃO: Ramona foi capturada. Operação em andamento
    para usar como isca para Nyx. <<<

═══════════════════════════════════════════════════════════

2.0 ANÁLISE DE CAPACIDADES

2.1 PONTOS FORTES

▸ Sinergia Operacional
  Comunicação não-verbal perfeita. Antecipam movimentos uma
  da outra com precisão milimétrica.

▸ Habilidades de Combate (Ramona)
  Treinamento militar confirmado. Especialista em combate
  corpo-a-corpo e armas de fogo.

▸ Habilidades de Direção (Nyx)
  Piloto excepcional. Conhecimento íntimo das rotas da
  Cidade Baixa. Capacidade de extrações sob fogo.

▸ Motivação por Lealdade
  Sua ligação emocional as torna imprevisíveis e perigosas
  quando uma está ameaçada.

2.2 PONTOS FRACOS

▸ Dependência Mútua
  A ameaça à vida de uma é a vulnerabilidade crítica da outra.

▸ Previsibilidade Emocional
  Ramona reagirá irracionalmente a ameaças contra Nyx, e
  vice-versa.

▸ Isolamento Tático
  Separadas, sua eficácia é reduzida significativamente.

═══════════════════════════════════════════════════════════

3.0 DIRETIVA DE AÇÃO

▸ FASE 1: CONCLUÍDA
  Ramona capturada durante operação em 08.10.2225.

▸ FASE 2: EM ANDAMENTO
  Usar Ramona como isca. Infiltração nas comunicações do
  Nexus com mensagens falsas.

▸ FASE 3: PLANEJADA
  Captura de Nyx durante tentativa de resgate. Ambas serão
  utilizadas como moeda de troca ou eliminadas publicamente.

>>> ALTO POTENCIAL DE SUCESSO <<<

═══════════════════════════════════════════════════════════

// FIM DO DOSSIÊ
    `
  },
  {
    id: '005-INVESTIDOR-NY',
    codename: 'O INVESTIDOR',
    realName: 'Kaito Ichida',
    status: 'EM OBSERVAÇÃO',
    priority: 'CRÍTICO',
    lastUpdate: '12.10.2225',
    threatLevel: 'ALTO',
    dossier: `
DOSSIÊ DE ANÁLISE DE AMEAÇA – EXOCORP SEC.

CLASSIFICAÇÃO: CONFIDENCIAL // ACESSO ALPHA
ID DO ARQUIVO: 005-INVESTIDOR-NY
DATA: 12.10.2225
ASSUNTO: Kaito Ichida, CEO Zion Industries
NÍVEL DE AMEAÇA: ALTO (Rival Corporativo)

═══════════════════════════════════════════════════════════

1.0 RESUMO EXECUTIVO

Kaito Ichida, CEO da Zion Industries, é nosso principal rival
corporativo em Nova York. Sua empresa opera em escala global
com ativos ocultos significativos na região. Inteligência
sugere infiltração ativa em operações ExoCorp.

═══════════════════════════════════════════════════════════

2.0 ANÁLISE DE CAPACIDADES

2.1 PONTOS FORTES

▸ Inteligência e Paciência Tática
  Planejador de longo prazo. Opera em escalas temporais de
  anos, não meses.

▸ Recursos Globais
  Zion Industries possui ativos em 47 países. Capacidade
  de mobilizar recursos massivos rapidamente.

▸ Rede de Infiltração
  Agentes confirmados dentro de subsidiárias ExoCorp.
  Número exato desconhecido.

▸ Legitimidade Corporativa
  Opera dentro de estruturas legais. Difícil justificar
  ação direta sem evidências sólidas.

2.2 PONTOS FRACOS

▸ Arrogância
  Subestima a capacidade de adaptação de P. Di e da
  liderança ExoCorp.

▸ Dependência de Redes Digitais
  Toda sua operação depende de comunicações seguras.
  Vulnerável a interceptação e sabotagem.

▸ Exposição Pública
  Como CEO de empresa listada, possui padrões previsíveis
  e compromissos públicos rastreáveis.

═══════════════════════════════════════════════════════════

3.0 DIRETIVA DE AÇÃO

▸ Contra-Inteligência Ativa
  Identificação e neutralização de agentes Zion dentro
  da ExoCorp.

▸ Monitoramento Total
  Vigilância de todas as comunicações corporativas.
  Sistema dedicado de interceptação.

▸ Guerra Econômica
  Preparar ataques coordenados aos ativos financeiros
  da Zion Industries.

>>> NÃO AUTORIZADO PARA ELIMINAÇÃO FÍSICA <<<
>>> RISCO DE GUERRA CORPORATIVA ABERTA <<<

═══════════════════════════════════════════════════════════

// FIM DO DOSSIÊ
    `
  },
  {
    id: '006-TOUPEIRA-NY',
    codename: 'A TOUPEIRA',
    realName: '[IDENTIDADE CLASSIFICADA]',
    status: 'ATIVO',
    priority: 'ALTO',
    lastUpdate: '12.10.2225',
    threatLevel: 'MÉDIO',
    dossier: `
DOSSIÊ DE ANÁLISE DE AMEAÇA – EXOCORP SEC.

CLASSIFICAÇÃO: ULTRASECRETO // ACESSO ALPHA
ID DO ARQUIVO: 006-TOUPEIRA-NY
DATA: 12.10.2225
ASSUNTO: "A Toupeira" (Agente Duplo)
NÍVEL DE AMEAÇA: MÉDIO (Agente Duplo)

═══════════════════════════════════════════════════════════

1.0 RESUMO EXECUTIVO

A Toupeira é uma agente de dupla-face trabalhando primariamente
para a Zion Industries. Possui conhecimento profundo da lei
corporativa e táticas da Zion. Atualmente sob monitoramento
constante enquanto é utilizada para contrainteligência.

>>> LEALDADE PRIMÁRIA: ZION INDUSTRIES <<<
>>> UTILIDADE TÁTICA: ALTA <<<

═══════════════════════════════════════════════════════════

2.0 ANÁLISE DE CAPACIDADES

2.1 PONTOS FORTES

▸ Conhecimento Legal Avançado
  Especialista em lei corporativa internacional. Conhece
  todas as brechas e zonas cinzentas.

▸ Acesso a Informações Zion
  Como agente da Zion, tem acesso a planos e operações
  que podem ser explorados.

▸ Habilidade de Infiltração
  Treinada em espionagem corporativa. Capaz de manter
  múltiplas identidades operacionais.

2.2 PONTOS FRACOS

▸ Lealdade Dividida
  Sua verdadeira lealdade é com Zion. Pode se tornar
  traidora em momento crítico.

▸ Dependência de Proteção Corporativa
  Sem cobertura legal da Zion, está completamente exposta.

▸ Perfil Psicológico
  Sinais de instabilidade moral. Conflito interno sobre
  suas ações pode levar a erros.

═══════════════════════════════════════════════════════════

3.0 DIRETIVA DE AÇÃO

▸ Monitoramento 24/7
  Vigilância total de todas as comunicações e movimentos.

▸ Desinformação Controlada
  Alimentá-la com informações falsas para transmitir à Zion.

▸ Plano de Contingência
  Preparar sua utilização como bode expiatório para
  desestabilizar a resistência quando necessário.

▸ Eliminação
  Aprovada quando sua utilidade se esgotar.

>>> ALTO VALOR TÁTICO TEMPORÁRIO <<<

═══════════════════════════════════════════════════════════

// FIM DO DOSSIÊ
    `
  },
  {
    id: '007-RAINHA-NY',
    codename: 'A RAINHA',
    realName: 'Isabela Carbone',
    status: 'NEUTRALIZADO',
    priority: 'MÉDIO',
    lastUpdate: '12.10.2225',
    threatLevel: 'MODERADO',
    dossier: `
DOSSIÊ DE ANÁLISE DE AMEAÇA – EXOCORP SEC.

CLASSIFICAÇÃO: CONFIDENCIAL // ACESSO ALPHA
ID DO ARQUIVO: 007-RAINHA-NY
DATA: 12.10.2225
ASSUNTO: Isabela Carbone, a.k.a. "A Rainha"
NÍVEL DE AMEAÇA: MODERADO
STATUS: CAPTURADA

═══════════════════════════════════════════════════════════

1.0 RESUMO EXECUTIVO

Isabela Carbone, líder do sindicato do crime organizado na
Cidade Baixa, foi neutralizada com sucesso. Ela e seu braço
direito estão sob custódia ExoCorp. Seu valor agora é como
refém e ferramenta de desestabilização.

>>> OPERAÇÃO DE CAPTURA: SUCESSO COMPLETO <<<

═══════════════════════════════════════════════════════════

2.0 ANÁLISE DE CAPACIDADES

2.1 PONTOS FORTES (Histórico)

▸ Liderança Organizacional
  Controlava vasta rede de gangues e operações criminosas.

▸ Recursos Financeiros
  Acesso a fundos significativos do submundo.

▸ Rede de Informantes
  Possuía olhos e ouvidos em toda a Cidade Baixa.

▸ Capacidade de Violência Organizada
  Podia mobilizar centenas de combatentes quando necessário.

2.2 PONTOS FRACOS (Explorados)

▸ Arrogância Fatal
  Acreditava ser a única força capaz de derrubar P. Di.
  Subestimou severamente nossas capacidades.

▸ Previsibilidade Operacional
  Padrões de reunião e locais de comando eram rastreáveis.

▸ Dependência de Estrutura
  Sem sua organização, é apenas mais uma criminosa.

═══════════════════════════════════════════════════════════

3.0 STATUS ATUAL E UTILIZAÇÃO

▸ Localização: Instalação de Detenção Alpha-7
▸ Condição: Sob custódia. Isolamento total.
▸ Utilização Planejada:
  - Ferramenta de barganha contra o submundo
  - Fonte de inteligência sobre operações criminosas
  - Possível eliminação pública para efeito psicológico

▸ Valor Remanescente: MÉDIO

>>> SUCESSO OPERACIONAL <<<
>>> CONTINUAR MONITORAMENTO DE SUA REDE DESCENTRALIZADA <<<

═══════════════════════════════════════════════════════════

// FIM DO DOSSIÊ
    `
  },
  {
    id: '008-ATIRADOR-NY',
    codename: 'EL MUSTACHE',
    realName: 'El Mustache',
    status: 'ATIVO',
    priority: 'MÉDIO',
    lastUpdate: '12.10.2225',
    threatLevel: 'ALTO',
    dossier: `
DOSSIÊ DE ANÁLISE DE AMEAÇA – EXOCORP SEC.

CLASSIFICAÇÃO: CONFIDENCIAL // ACESSO ALPHA
ID DO ARQUIVO: 008-ATIRADOR-NY
DATA: 12.10.2225
ASSUNTO: "El Mustache", a.k.a. "O Atirador"
NÍVEL DE AMEAÇA: ALTO

═══════════════════════════════════════════════════════════

1.0 RESUMO EXECUTIVO

El Mustache é um pistoleiro mercenário de elite com histórico
comprovado de 47 eliminações confirmadas. Atualmente fornece
serviços ao Nexus, mas sua lealdade é puramente transacional.

>>> OPORTUNIDADE: AQUISIÇÃO POR PAGAMENTO <<<

═══════════════════════════════════════════════════════════

2.0 ANÁLISE DE CAPACIDADES

2.1 PONTOS FORTES

▸ Habilidade de Tiro Elite
  Precisão excepcional em distâncias de até 1.200 metros.
  Taxa de sucesso: 94%.

▸ Capacidade de Improvisação
  Adapta-se rapidamente a mudanças no ambiente tático.

▸ Experiência Diversificada
  Operou em 12 países diferentes. Conhecimento amplo de
  técnicas de eliminação.

▸ Profissionalismo
  Completa missões sem envolvimento emocional. Confiável
  dentro de seus termos contratuais.

2.2 PONTOS FRACOS

▸ Mercenário Sem Lealdade
  Não possui ideologia. Trabalha apenas por dinheiro.
  Pode ser virado contra seus empregadores atuais.

▸ Código de Honra Rígido
  Paradoxalmente, sua ética profissional é explorável.
  Não quebrará contrato ativo por dinheiro adicional.

▸ Operador Solitário
  Sem rede de apoio. Vulnerável quando isolado.

═══════════════════════════════════════════════════════════

3.0 DIRETIVA DE AÇÃO

▸ Opção Alfa: Aquisição
  Oferecer contrato de longo prazo com pagamento superior
  assim que seu compromisso atual terminar.
  Valor sugerido: 10 milhões de créditos/ano.

▸ Opção Beta: Neutralização
  Se Opção Alfa falhar, autorizada eliminação.
  Método recomendado: drone de precisão ou sniper de
  contra-ataque.

▸ Monitoramento
  Rastrear todos os contratos conhecidos para identificar
  janela de oportunidade.

>>> PRIORIDADE: AQUISIÇÃO <<<
>>> RECURSO VALIOSO SE REORIENTADO <<<

═══════════════════════════════════════════════════════════

// FIM DO DOSSIÊ
    `
  },
  {
    id: '009-DRAGOES-NY',
    codename: 'LÍDER DOS DRAGÕES',
    realName: 'Qiong Li',
    status: 'ATIVO',
    priority: 'ALTO',
    lastUpdate: '12.10.2225',
    threatLevel: 'ALTO',
    dossier: `
DOSSIÊ DE ANÁLISE DE AMEAÇA – EXOCORP SEC.

CLASSIFICAÇÃO: CONFIDENCIAL // ACESSO ALPHA
ID DO ARQUIVO: 009-DRAGOES-NY
DATA: 12.10.2225
ASSUNTO: Qiong Li, Líder dos Dragões de Jade
NÍVEL DE AMEAÇA: ALTO

═══════════════════════════════════════════════════════════

1.0 RESUMO EXECUTIVO

Qiong Li comanda os Dragões de Jade, uma das gangues mais
organizadas e perigosas de Nova York. Sua rede de aliados e
agentes infiltrados representa ameaça significativa às operações
ExoCorp na Cidade Baixa.

═══════════════════════════════════════════════════════════

2.0 ANÁLISE DE CAPACIDADES

2.1 PONTOS FORTES

▸ Rede Organizada
  Estrutura hierárquica disciplinada com células operacionais
  em todos os distritos da Cidade Baixa.

▸ Lealdade dos Membros
  Seus subordinados demonstram devoção excepcional. Cultura
  de honra e família dentro da gangue.

▸ Recursos Diversificados
  Controle sobre: contrabando, armas, informações, rotas
  de fuga e casas seguras.

▸ Conexões Internacionais
  Ligações com Tríades em Hong Kong, Taipei e Tóquio.
  Acesso a recursos externos.

▸ Inteligência de Rua
  Sistema de informantes proporciona conhecimento em tempo
  real de movimentos corporativos.

2.2 PONTOS FRACOS

▸ Lealdade Familiar
  Sua devoção aos membros dos Dragões é vulnerabilidade
  explorável. Ameaças aos seus homens podem forçar erros.

▸ Rotas Conhecidas
  Padrões de movimento e locais de operação foram mapeados
  por nossa vigilância.

▸ Dependência de Território
  Poder concentrado na Cidade Baixa. Fora dessa zona, sua
  influência diminui drasticamente.

═══════════════════════════════════════════════════════════

3.0 DIRETIVA DE AÇÃO

▸ Fase 1: Infiltração
  Inserir agentes disfarçados nos escalões inferiores da
  gangue para obter inteligência em tempo real.

▸ Fase 2: Monitoramento de Rotas
  Mapear todas as rotas de fuga e casas seguras conhecidas.

▸ Fase 3: Captura
  Operação coordenada para capturar Qiong Li vivo.
  Objetivo: usar como alavanca para controlar ou destruir
  os Dragões de Jade.

>>> VALOR TÁTICO ALTO SE CAPTURADO <<<

═══════════════════════════════════════════════════════════

// FIM DO DOSSIÊ
    `
  },
  {
    id: '010-CIENTISTA2-NY',
    codename: 'DR. FOSS',
    realName: 'Dr. Donatelo Foss',
    status: 'DESAPARECIDO',
    priority: 'CRÍTICO',
    lastUpdate: '12.10.2225',
    threatLevel: 'CRÍTICO',
    dossier: `
DOSSIÊ DE ANÁLISE DE AMEAÇA – EXOCORP SEC.

CLASSIFICAÇÃO: ULTRASECRETO // ACESSO ALPHA
ID DO ARQUIVO: 010-CIENTISTA2-NY
DATA: 12.10.2225
ASSUNTO: Dr. Donatelo Foss, a.k.a. "O Cientista"
NÍVEL DE AMEAÇA: CRÍTICO

═══════════════════════════════════════════════════════════

1.0 RESUMO EXECUTIVO

Dr. Donatelo Foss é um ex-cientista sênior da ExoCorp que
desertou levando consigo conhecimento crítico do "Projeto O Véu".
Sua expertise em bioengenharia avançada representa ameaça
existencial se utilizada contra nós.

>>> LOCALIZAÇÃO: DESCONHECIDA <<<
>>> PRIORIDADE: CAPTURA IMEDIATA <<<

═══════════════════════════════════════════════════════════

2.0 ANÁLISE DE CAPACIDADES

2.1 PONTOS FORTES

▸ Conhecimento de Bioengenharia
  Um dos três cientistas vivos com conhecimento completo
  do Projeto O Véu.

▸ Acesso a Segredos Corporativos
  Possui informações sobre múltiplos projetos classificados
  além do Véu.

▸ Capacidade de Desenvolvimento
  Pode replicar ou criar variações de nossas tecnologias
  proprietárias.

▸ Inteligência Superior
  QI estimado em 165. Capacidade de improvisação científica
  excepcional.

2.2 PONTOS FRACOS

▸ Paranoia Extrema
  Medo constante de ser encontrado. Pode levar a erros
  operacionais por excesso de cautela.

▸ Dependência de Equipamento
  Necessita de laboratório e recursos para trabalhar.
  Limitações de acesso podem ser exploradas.

▸ Isolamento Social
  Sem rede de apoio significativa. Opera sozinho ou com
  mínima assistência.

═══════════════════════════════════════════════════════════

3.0 PROJETO O VÉU - AMEAÇA

O Projeto O Véu é uma arma biológica neurológica capaz de:
- Manipulação de memórias em massa
- Controle comportamental através de nanobots
- Reprogramação de respostas emocionais

Se Foss compartilhar este conhecimento com a resistência ou
desenvolver contramedidas, nossas capacidades de controle
populacional serão severamente comprometidas.

═══════════════════════════════════════════════════════════

4.0 DIRETIVA DE AÇÃO

▸ Prioridade Máxima: LOCALIZAÇÃO
  Todos os recursos de vigilância dedicados à sua busca.

▸ Monitoramento de Comunicações
  Rastreamento de todas as redes científicas clandestinas.

▸ Captura e Extração
  Ao ser localizado, equipe de operações especiais fará
  extração forçada.

▸ Objetivos:
  1. Capturá-lo vivo
  2. Recuperar qualquer material relacionado ao Projeto O Véu
  3. Identificar com quem ele compartilhou informações
  4. Recondicionamento neural ou eliminação

>>> AMEAÇA EXISTENCIAL SE NÃO CONTIDO <<<

═══════════════════════════════════════════════════════════

// FIM DO DOSSIÊ
    `
  },
  {
    id: '011-SONAMBULO-NY',
    codename: 'O SONÂMBULO',
    realName: 'Amaya Backer',
    status: 'NEUTRALIZADO',
    priority: 'MÉDIO',
    lastUpdate: '12.10.2225',
    threatLevel: 'BAIXO',
    dossier: `
DOSSIÊ DE ANÁLISE DE AMEAÇA – EXOCORP SEC.

CLASSIFICAÇÃO: CONFIDENCIAL // ACESSO ALPHA
ID DO ARQUIVO: 011-SONAMBULO-NY
DATA: 12.10.2225
ASSUNTO: Amaya Backer, a.k.a. "O Sonâmbulo"
NÍVEL DE AMEAÇA: BAIXO
STATUS: SOB CUSTÓDIA - ESTADO CATATÔNICO

═══════════════════════════════════════════════════════════

1.0 RESUMO EXECUTIVO

Amaya Backer, ex-engenheira de I.A. da ExoCorp, sofreu colapso
psicológico completo após tentativa de deserção. Atualmente em
estado catatônico sob custódia médica. Seu conhecimento dos
sistemas de segurança ExoCorp continua valioso.

>>> STATUS: INCAPACITADA <<<
>>> VALOR: EXTRAÇÃO DE CONHECIMENTO <<<

═══════════════════════════════════════════════════════════

2.0 ANÁLISE DE CAPACIDADES

2.1 CONHECIMENTO (Pré-Colapso)

▸ Sistemas de I.A. da ExoCorp
  Trabalhou diretamente no desenvolvimento de P. Di e
  sistemas de segurança correlatos.

▸ Vulnerabilidades Conhecidas
  Possui conhecimento íntimo de pontos fracos nos nossos
  sistemas de defesa.

▸ Protocolos de Segurança
  Conhece senhas, backdoors e protocolos de emergência
  de sistemas críticos.

2.2 ESTADO ATUAL

▸ Catatonia Completa
  Não responsiva a estímulos externos. Estado mental
  degradado severamente.

▸ Memórias Fragmentadas
  Escaneamento neural indica que conhecimentos técnicos
  ainda estão preservados em estruturas de memória profunda.

▸ Condição Irreversível (Provável)
  Especialistas indicam <15% de chance de recuperação
  significativa.

═══════════════════════════════════════════════════════════

3.0 DIRETIVA DE AÇÃO

▸ Extração Neural Forçada
  Autorizada utilização de tecnologia experimental de
  leitura neural para extrair conhecimentos.

▸ Análise de Memórias
  Equipe de neurociência dedicada a mapear e recuperar
  informações sobre:
  - Vulnerabilidades de sistema conhecidas
  - Contatos com a resistência
  - Conhecimento sobre planos de deserção

▸ Valor Remanescente: MÉDIO
  Após extração completa, valor se torna NULO.

▸ Disposição Final: Pendente
  Aguardando conclusão da extração neural para determinação
  de eliminação ou manutenção em custódia permanente.

>>> OPORTUNIDADE DE INTELIGÊNCIA <<<

═══════════════════════════════════════════════════════════

// FIM DO DOSSIÊ
    `
  },
  {
    id: '012-INFORMADOR-NY',
    codename: 'O INFORMADOR',
    realName: 'Adrian',
    status: 'ATIVO',
    priority: 'MÉDIO',
    lastUpdate: '12.10.2225',
    threatLevel: 'MÉDIO',
    dossier: `
DOSSIÊ DE ANÁLISE DE AMEAÇA – EXOCORP SEC.

CLASSIFICAÇÃO: CONFIDENCIAL // ACESSO ALPHA
ID DO ARQUIVO: 012-INFORMADOR-NY
DATA: 12.10.2225
ASSUNTO: "Adrian", a.k.a. "O Informador"
NÍVEL DE AMEAÇA: MÉDIO

═══════════════════════════════════════════════════════════

1.0 RESUMO EXECUTIVO

Adrian é um intermediário de informações do submundo da Cidade
Baixa. Seu conhecimento das rotas de comunicação clandestinas
o torna recurso valioso, mas sua dependência química o torna
vulnerável e não confiável.

═══════════════════════════════════════════════════════════

2.0 ANÁLISE DE CAPACIDADES

2.1 PONTOS FORTES

▸ Rede de Informações
  Acesso a múltiplas fontes no submundo. Broker de
  informações com reputação estabelecida.

▸ Conhecimento de Rotas
  Sabe de todas as principais rotas de comunicação
  clandestina na Cidade Baixa.

▸ Conexões Diversas
  Contatos com criminosos, hackers, e membros da
  resistência. Incluindo Artz.

▸ Neutralidade Percebida
  Visto como "neutro" pelas várias facções. Permite
  acesso a informações de múltiplas fontes.

2.2 PONTOS FRACOS

▸ Dependência Química
  Viciado em "Blur" (substância sintética). Necessita
  de doses regulares. VULNERABILIDADE CRÍTICA.

▸ Instabilidade
  Efeitos colaterais da droga incluem paranoia e
  julgamento comprometido.

▸ Facilmente Manipulável
  Controle de seu suprimento de Blur permite controle
  quase total de suas ações.

▸ Sem Lealdade Real
  Trabalhará para quem pagar ou fornecer sua droga.

═══════════════════════════════════════════════════════════

3.0 DIRETIVA DE AÇÃO

▸ Infiltração de Rede
  Monitoramento total de todas as suas comunicações.
  Sistema de interceptação dedicado instalado.

▸ Controle por Dependência
  Operação em andamento para controlar seu suprimento
  de Blur. Objetivo: torná-lo dependente de fornecimento
  ExoCorp.

▸ Uso Tático
  Uma vez sob controle:
  - Fonte de inteligência em tempo real
  - Canal para desinformação direcionada
  - Meio de localizar esconderijo do Nexus

▸ Disposição Final
  Eliminação após utilidade esgotar. Overdose será
  atribuída a fornecedor do mercado negro.

>>> ALTO POTENCIAL COMO ATIVO <<<
>>> BAIXO CUSTO DE AQUISIÇÃO E MANUTENÇÃO <<<

═══════════════════════════════════════════════════════════

// FIM DO DOSSIÊ
    `
  },
  {
    id: '013-PASTOR-NY',
    codename: 'O PASTOR',
    realName: 'Reverendo Márcio',
    status: 'ATIVO',
    priority: 'BAIXO',
    lastUpdate: '12.10.2225',
    threatLevel: 'BAIXO',
    dossier: `
DOSSIÊ DE ANÁLISE DE AMEAÇA – EXOCORP SEC.

CLASSIFICAÇÃO: CONFIDENCIAL // ACESSO ALPHA
ID DO ARQUIVO: 013-PASTOR-NY
DATA: 12.10.2225
ASSUNTO: Reverendo Márcio, a.k.a. "O Pastor"
NÍVEL DE AMEAÇA: BAIXO

═══════════════════════════════════════════════════════════

1.0 RESUMO EXECUTIVO

O Reverendo Márcio é um líder espiritual que fornece apoio
moral e psicológico aos membros da resistência. Sua influência
é primariamente ideológica, representando ameaça mínima mas
persistente à narrativa corporativa.

═══════════════════════════════════════════════════════════

2.0 ANÁLISE DE CAPACIDADES

2.1 PONTOS FORTES

▸ Conexão Espiritual
  Fornece esperança e propósito a insurgentes. Reduz
  deserções através de suporte emocional.

▸ Oratória Persuasiva
  Habilidade excepcional de comunicação. Sermões inspiram
  lealdade à causa da resistência.

▸ Neutralidade Percebida
  Como líder religioso, tem acesso a locais e pessoas
  que desconfiariam de outros insurgentes.

▸ Rede de Santuários
  Igrejas e locais religiosos servem como casas seguras
  não oficiais para a resistência.

2.2 PONTOS FRACOS

▸ Idealista Extremo
  Crença inabalável no "bem" e na "justiça". Previsível
  em suas ações morais.

▸ Não-Violento
  Recusa-se a participar de ações violentas. Limita sua
  influência operacional.

▸ Fé Explorável
  Sua fé pode ser usada contra ele através de manipulação
  de símbolos e narrativas religiosas.

▸ Sem Treinamento Tático
  Vulnerável fisicamente. Facilmente capturável.

═══════════════════════════════════════════════════════════

3.0 DIRETIVA DE AÇÃO

▸ Monitoramento Passivo
  Vigilância de suas atividades em fóruns e reuniões.

▸ Operação "Falso Profeta"
  Inserir agentes disfarçados em sua congregação para:
  - Semear dúvidas sobre a resistência
  - Identificar membros da insurgência
  - Preparar narrativa de "traição" quando conveniente

▸ Utilização Psicológica
  Captura e eliminação pública planejada para ocasião
  estratégica. Objetivo: desmoralizar a resistência
  demonstrando que "nem Deus pode salvá-los".

▸ Prioridade: BAIXA
  Ameaça mínima no curto prazo. Recurso para exploração
  tática futura.

>>> VALOR PRIMÁRIO: PSICOLÓGICO <<<

═══════════════════════════════════════════════════════════

// FIM DO DOSSIÊ
    `
  },
  {
    id: '014-BRINQUEDO-NY',
    codename: 'O SALTO QUÂNTICO',
    realName: '[DISPOSITIVO TECNOLÓGICO]',
    status: 'DESAPARECIDO',
    priority: 'ALTO',
    lastUpdate: '12.10.2225',
    threatLevel: 'ALTO',
    dossier: `
DOSSIÊ DE ANÁLISE DE AMEAÇA – EXOCORP SEC.

CLASSIFICAÇÃO: ULTRASECRETO // ACESSO ALPHA
ID DO ARQUIVO: 014-BRINQUEDO-NY
DATA: 12.10.2225
ASSUNTO: "Salto Quântico" (Dispositivo de Teletransporte)
NÍVEL DE AMEAÇA: ALTO

═══════════════════════════════════════════════════════════

1.0 RESUMO EXECUTIVO

O "Salto Quântico" é um protótipo de dispositivo de teletransporte
de curta distância roubado dos laboratórios ExoCorp. Atualmente
em posse de elementos da resistência. Representa ameaça tática
significativa e recurso valioso a ser recuperado.

>>> STATUS: ROUBADO <<<
>>> PRIORIDADE: RECUPERAÇÃO IMEDIATA <<<

═══════════════════════════════════════════════════════════

2.0 ESPECIFICAÇÕES TÉCNICAS

2.1 CAPACIDADES

▸ Teletransporte de Curta Distância
  Alcance máximo: [DADOS CLASSIFICADOS]
  Tempo de recarga: 45 segundos
  Precisão: ±2 metros do ponto-alvo

▸ Transporte de Massa
  Capacidade: até 50kg
  Limitado a uma pessoa ou carga equivalente

▸ Assinatura Mínima
  Emisão detectável por 0,3 segundos durante transporte

2.2 AMEAÇA OPERACIONAL

▸ Infiltração
  Permite acesso a áreas supostamente seguras

▸ Extração Rápida
  Equipes de ataque podem escapar antes de resposta tática

▸ Imprevisibilidade
  Padrões de movimento convencionais se tornam inúteis

═══════════════════════════════════════════════════════════

3.0 RASTREAMENTO E RECUPERAÇÃO

3.1 ASSINATURA QUÂNTICA

Cada uso do dispositivo gera assinatura detectável através
de nossos sensores quânticos de longo alcance.

▸ Usos Registrados: 7
▸ Último Uso: 10.10.2225 (Setor Gamma-3)
▸ Padrão: Movimentos erráticos. Dificulta predição.

3.2 VULNERABILIDADES

▸ Dependência Energética
  Requer recarga a cada 6 usos. Período de vulnerabilidade.

▸ Limitações de Distância
  Usuários devem estar relativamente próximos ao destino.

▸ Interferência Possível
  Campo de disrupção quântica pode desativar o dispositivo.

═══════════════════════════════════════════════════════════

4.0 DIRETIVA DE AÇÃO

▸ Rede de Sensores Expandida
  Instalação de 200 sensores quânticos adicionais em toda
  a Cidade Baixa para triangulação precisa.

▸ Operação "Armadilha Quântica"
  Criar situação que force uso do dispositivo em área
  preparada com:
  - Campo de disrupção ativo
  - Equipe de captura em posição
  - Bloqueio total de rotas de fuga convencionais

▸ Prioridade Dupla:
  1. RECUPERAR dispositivo intacto
  2. CAPTURAR usuários atuais para interrogatório

▸ Autorização Especial:
  Uso de força letal autorizado para prevenir destruição
  do dispositivo.

>>> TECNOLOGIA CRÍTICA <<<
>>> RECUPERAÇÃO É PRIORIDADE OPERACIONAL <<<

═══════════════════════════════════════════════════════════

// FIM DO DOSSIÊ
    `
  },
  {
    id: '015-FANTASMA2-NY',
    codename: 'JOHN BOHN',
    realName: 'John Bohn',
    status: 'DESAPARECIDO',
    priority: 'ALTO',
    lastUpdate: '12.10.2225',
    threatLevel: 'ALTO',
    dossier: `
DOSSIÊ DE ANÁLISE DE AMEAÇA – EXOCORP SEC.

CLASSIFICAÇÃO: CONFIDENCIAL // ACESSO ALPHA
ID DO ARQUIVO: 015-FANTASMA2-NY
DATA: 12.10.2225
ASSUNTO: John Bohn, a.k.a. "O Fantasma"
NÍVEL DE AMEAÇA: ALTO

═══════════════════════════════════════════════════════════

1.0 RESUMO EXECUTIVO

John Bohn é um ex-operador militar de elite que desapareceu
do radar ExoCorp há alguns meses. Sua experiência em
infiltração e contra-vigilância o torna extremamente perigoso
e imprevisível. Alto prêmio oferecido por sua captura viva.

>>> ÚLTIMA LOCALIZAÇÃO: DESCONHECIDA (4 MESES) <<<
>>> STATUS: DESAPARECIDO - PARADEIRO INCERTO <<<
>>> PRÊMIO: 25 MILHÕES DE CRÉDITOS <<<

═══════════════════════════════════════════════════════════

2.0 ANÁLISE DE CAPACIDADES

2.1 PONTOS FORTES

▸ Experiência Militar Elite
  15 anos em forças especiais. Veterano de 34 operações
  de combate em 11 países diferentes.

▸ Mestre em Infiltração
  Especialista em contra-vigilância. Capaz de operar
  completamente fora de qualquer sistema de rastreamento.

▸ Combate Avançado
  Proficiente em: combate corpo-a-corpo, armas de fogo,
  explosivos, táticas urbanas.

▸ Imprevisibilidade
  Sem padrão comportamental estabelecido nos últimos 4
  meses. Impossível antecipar movimentos.

▸ Rede Subterrânea
  Conexões com elementos criminosos e insurgentes.
  Identidades múltiplas confirmadas.

2.2 PONTOS FRACOS

▸ Desilusão
  Psicológica perfil indica amargor e trauma. Motivação
  primária é sobrevivência, não ideologia.

▸ Aliado Inconstante
  Sem lealdade verdadeira a qualquer causa. Pode ser
  negociado se abordagem correta for utilizada.

▸ Isolamento Operacional
  Opera sozinho. Sem rede de apoio confiável. Vulnerável
  se localizado e cercado.

═══════════════════════════════════════════════════════════

3.0 CONEXÃO COM NEXUS

Inteligência sugere possível associação com o esconderijo
Nexus. Evidências:
- 3 avistamentos não confirmados na região Gamma-7
- Comunicações interceptadas mencionam "o fantasma"
- Perfil tático corresponde a operações recentes do Nexus

Probabilidade de envolvimento ativo: 67%

═══════════════════════════════════════════════════════════

4.0 DIRETIVA DE AÇÃO

▸ Vigilância Massiva
  Monitoramento de:
  - Todas as redes de transporte
  - Sistemas de reconhecimento facial em toda a cidade
  - Comunicações em canais conhecidos de ex-militares

▸ Prêmio de Captura
  25 milhões de créditos por captura VIVA
  Restrição: deve estar em condição de interrogatório

▸ Protocolo de Interrogatório Preparado
  Foco em:
  - Localização do Nexus
  - Estrutura de comando da resistência
  - Identidades de outros operadores

▸ Oferta de Negociação (Aprovada)
  Se contato for estabelecido, autorizado oferecer:
  - Anistia completa
  - Pagamento de 15 milhões
  - Nova identidade e exfiltração
  Em troca de: informações sobre Nexus

>>> ALTO VALOR COMO FONTE DE INTELIGÊNCIA <<<
>>> CAPTURA VIVA É ESSENCIAL <<<

═══════════════════════════════════════════════════════════

// FIM DO DOSSIÊ
    `
  },
  {
    id: '016-COLETOR-NY',
    codename: 'O COLETOR',
    realName: 'Nilo Saito',
    status: 'ATIVO',
    priority: 'CRÍTICO',
    lastUpdate: '12.10.2225',
    threatLevel: 'CRÍTICO',
    dossier: `
DOSSIÊ DE ANÁLISE DE AMEAÇA – EXOCORP SEC.

CLASSIFICAÇÃO: CONFIDENCIAL // ACESSO ALPHA
ID DO ARQUIVO: 016-COLETOR-NY
DATA: 12.10.2225
ASSUNTO: Nilo Saito, a.k.a. "O Coletor"
NÍVEL DE AMEAÇA: MÉDIO

═══════════════════════════════════════════════════════════

1.0 RESUMO EXECUTIVO

Nilo Saito é especialista em reconhecimento e operações de
drone para o Nexus. Seu conhecimento íntimo da geografia da
Cidade Baixa o torna valioso para operações de infiltração e
ataque. Lealdade a Bobby Huey é vulnerabilidade explorável.

═══════════════════════════════════════════════════════════

2.0 ANÁLISE DE CAPACIDADES

2.1 PONTOS FORTES

▸ Conhecimento Geográfico Elite
  Mapas mentais completos de:
  - Rotas de serviço e manutenção
  - Túneis abandonados e ativos
  - Sistemas de ventilação
  - Pontos de acesso a edifícios corporativos

▸ Operações de Drone
  Piloto experiente. Utiliza drones para:
  - Reconhecimento de áreas protegidas
  - Ataques aéreos com explosivos improvisados
  - Vigilância de movimentos corporativos

▸ Navegação Urbana
  Pode mover-se pela Cidade Baixa evitando todas as rotas
  de vigilância conhecidas.

▸ Improvisação Técnica
  Capaz de modificar drones comerciais para uso militar.

2.2 PONTOS FRACOS

▸ Impulsividade
  Histórico de decisões precipitadas. Age sem planejamento
  completo quando sob pressão emocional.

▸ Lealdade a Bobby
  Devoção extrema ao Mentor. Pode ser manipulado através
  de ameaças ou informações falsas sobre Bobby.

▸ Dependência de Tecnologia
  Sua eficácia depende de acesso a drones e equipamentos.
  Vulnerável a contramedidas eletrônicas.

▸ Perfil Online
  Ativo demais em fóruns clandestinos. Padrões de
  comunicação rastreáveis.

═══════════════════════════════════════════════════════════

3.0 DIRETIVA DE AÇÃO

▸ Monitoramento Digital
  Vigilância total de:
  - Fóruns de entusiastas de drones
  - Redes sociais clandestinas
  - Padrões de compra de componentes eletrônicos

▸ Contramedidas Anti-Drone
  Instalação de sistemas de:
  - Detecção de frequências de controle
  - Jamming direcionado
  - Interceptação física automatizada

▸ Operação "Isca Emocional"
  Plantar desinformação sobre Bobby Huey estar ferido ou
  em perigo para forçar Nilo a agir impulsivamente e se
  expor.

▸ Captura ou Eliminação
  Uma vez localizado:
  - Prioridade: Captura para interrogatório sobre rotas
  - Alternativa: Eliminação se captura não for viável

>>> VALOR MÉDIO <<<
>>> VULNERABILIDADES PSICOLÓGICAS EXPLORÁVEIS <<<

═══════════════════════════════════════════════════════════

// FIM DO DOSSIÊ
    `
  },
  {
    id: '017-VOZ-NY',
    codename: 'A VOZ DA REVOLUÇÃO',
    realName: 'Zhen Liu',
    status: 'ATIVO',
    priority: 'CRÍTICO',
    lastUpdate: '12.10.2225',
    threatLevel: 'CRÍTICO',
    dossier: `
DOSSIÊ DE ANÁLISE DE AMEAÇA – EXOCORP SEC.

CLASSIFICAÇÃO: CONFIDENCIAL // ACESSO ALPHA
ID DO ARQUIVO: 017-VOZ-NY
DATA: 12.10.2225
ASSUNTO: Zhen Liu, a.k.a. "A Voz da Revolução"
NÍVEL DE AMEAÇA: ALTO

═══════════════════════════════════════════════════════════

1.0 RESUMO EXECUTIVO

Zhen Liu é o propagandista-mor da resistência. Seus vídeos
virais e podcasts alcançam milhões na Cidade Baixa, fazendo
dele a voz pública do movimento insurgente. Sucessor natural
de Bobby Huey. Neutralização pública recomendada para impacto
psicológico máximo.

═══════════════════════════════════════════════════════════

2.0 ANÁLISE DE CAPACIDADES

2.1 PONTOS FORTES

▸ Carisma e Comunicação
  Orador excepcional. Capacidade de traduzir ideias
  complexas em mensagens acessíveis e emocionais.

▸ Alcance Massivo
  Audiência estimada:
  - 8,4 milhões de seguidores em redes clandestinas
  - 200k visualizações médias por vídeo (primeiras 24h)
  - Presença em 47 plataformas diferentes

▸ Credibilidade
  Visto como "voz do povo". Seus pronunciamentos têm peso
  entre todos os estratos da população da Cidade Baixa.

▸ Sucessor Designado
  Analistas concordam: se Bobby Huey for neutralizado,
  Zhen Liu assumirá liderança moral do movimento.

▸ Proteção da Multidão
  Popularidade o protege. Eliminação mal executada pode
  criar mártir ainda mais poderoso.

2.2 PONTOS FRACOS

▸ Inexperiência Tática
  Sem treinamento militar ou de combate. Vulnerável
  fisicamente.

▸ Confiança Excessiva em Informação
  Acredita que "a verdade" vencerá. Subestima poder da
  força bruta.

▸ Padrões Previsíveis
  Localizações de transmissão podem ser rastreadas através
  de análise de sinal e metadados.

▸ Dependência de Tecnologia
  Toda sua influência depende de acesso a plataformas
  digitais. Vulnerável a desconexão forçada.

═══════════════════════════════════════════════════════════

3.0 DIRETIVA DE AÇÃO

▸ Fase 1: Rastreamento
  - Monitoramento de todas as transmissões
  - Triangulação de sinais para identificar locais
  - Mapeamento de sua rede de suporte técnico

▸ Fase 2: Preparação
  - Identificar janela ideal para neutralização pública
  - Preparar narrativa alternativa para controlar reação
  - Posicionar equipes de captura

▸ Fase 3: Neutralização Espetacular
  RECOMENDAÇÃO: Eliminação durante transmissão ao vivo

  Objetivos:
  - Demonstrar alcance e poder da ExoCorp
  - Desmoralizar resistência mostrando que nem seus
    "intocáveis" estão seguros
  - Enviar mensagem: "Não há onde se esconder"

▸ Contingência: Campanha de Difamação
  Se eliminação física for politicamente inviável:
  - Revelar (ou fabricar) escândalos pessoais
  - Associá-lo a crimes graves
  - Destruir credibilidade antes da eliminação

>>> NEUTRALIZAÇÃO PÚBLICA É ARMA PSICOLÓGICA <<<
>>> TIMING É CRÍTICO <<<

═══════════════════════════════════════════════════════════

// FIM DO DOSSIÊ
    `
  },
  {
    id: '018-AGUILA-NY',
    codename: 'EL ÁGUILA',
    realName: 'Javier Montoya',
    status: 'ATIVO',
    priority: 'CRÍTICO',
    lastUpdate: '13.10.2225',
    threatLevel: 'CRÍTICO',
    dossier: `
DOSSIÊ DE ANÁLISE DE AMEAÇA – EXOCORP SEC.

CLASSIFICAÇÃO: ULTRASECRETO // ACESSO ALPHA
ID DO ARQUIVO: 018-AGUILA-NY
DATA: 13.10.2225
ASSUNTO: Javier "El Águila" Montoya, Líder da Sinaloa
NÍVEL DE AMEAÇA: CRÍTICO
STATUS: PROCURADO

═══════════════════════════════════════════════════════════

1.0 RESUMO EXECUTIVO

Javier "El Águila" Montoya é o líder supremo do cartel modernizado
da Sinaloa em NeonCity. Descendente direto de uma família histórica
de traficantes, ele adaptou o antigo império criminoso ao mundo
cyberpunk, estabelecendo um dos cartéis mais poderosos e tecnológicos
da cidade. Sua combinação de brutalidade tradicional com táticas
modernas o torna uma ameaça crítica aos interesses corporativos.

>>> PROCURADO: RECOMPENSA DE 50 MILHÕES DE CRÉDITOS <<<
>>> CAPTURA VIVA PREFERENCIAL <<<

═══════════════════════════════════════════════════════════

2.0 PERFIL PESSOAL

▸ Idade: 45 anos
▸ Origem: Filho de família tradicional do antigo cartel de Sinaloa
▸ Aparência: 
  - Estatura média, presença intimidadora
  - Pele bronzeada com cicatrizes de batalha
  - Tatuagens elaboradas representando poder e linhagem
  - Implante ocular cibernético discreto para monitoramento
  - Veste roupas de alta qualidade mesclando estilo mexicano
    clássico com elementos futuristas
  - Sombreiro estilizado feito de fibra de carbono (icônico)

═══════════════════════════════════════════════════════════

3.0 ANÁLISE DE CAPACIDADES

3.1 PONTOS FORTES

▸ Liderança Carismática
  Inspira lealdade absoluta em seus seguidores. Cultivou
  imagem de protetor e figura paterna para membros da gangue.

▸ Estrategista Nato
  Calculista e metódico. Raramente age sem plano bem pensado.
  Estuda inimigos com precisão cirúrgica.

▸ Império Modernizado
  Transformou a Sinaloa em força tecnológica:
  - Controle de rotas de tráfico de armas e drogas
  - Rede de tecnologias ilegais
  - Sistema de inteligência avançado
  - Operações em múltiplos setores de NeonCity

▸ Preservação Cultural
  Mantém rituais antigos da gangue, reforçando senso de
  identidade e lealdade dos membros.

▸ Visão Global
  Planeja transformar Sinaloa em força global novamente.
  Aproveita caos entre corporações para expandir influência.

3.2 PONTOS FRACOS

▸ Obstinação
  Obsessão por poder e vingança pode cegá-lo para alianças
  estratégicas, tornando-o vulnerável a manipulações.

▸ Orgulho Fatal
  Despreza aqueles que não considera dignos. Pode subestimar
  rivais ou até aliados potenciais.

▸ Laços Familiares
  Profundamente ligado à ideia de família. Vulnerável a
  manipulação emocional através desses laços.

▸ Rixa Pessoal
  Vendetta com Viktor "O Tubarão" da Bratva por morte de
  irmão. Pode ser usado para provocar erro tático.

═══════════════════════════════════════════════════════════

4.0 MOTIVAÇÕES PRIMÁRIAS

▸ Consolidação de Poder Absoluto
  Deseja dominar completamente submundo, unificar ou destruir
  todas gangues rivais.

▸ Preservação de Herança
  Vê Sinaloa como última chama da glória dos cartéis.
  Comprometido em manter nome temido por gerações.

▸ Exploração do Caos
  Aproveita guerra entre corporações e gangues para expandir.
  Visa tornar Sinaloa força global novamente.

▸ Independência Total
  Busca acumular riqueza suficiente para garantir liberdade
  absoluta das corporações.

▸ Vingança contra Bratva
  Eliminação de Viktor é prioridade pessoal após perda familiar.

═══════════════════════════════════════════════════════════

5.0 RELAÇÕES COM OUTRAS FACÇÕES

▸ Trindade da Chama: Desprezados por sua brutalidade
▸ Bratva: Inimizade mortal (vendetta pessoal)
▸ Dragões de Jade: Rivalidade territorial
▸ Família Carbone: Competição por rotas de contrabando

═══════════════════════════════════════════════════════════

6.0 DIRETIVA DE AÇÃO

▸ Fase 1: Infiltração
  Inserir agentes nas operações da Sinaloa para mapear
  estrutura de comando e localizar El Águila.

▸ Fase 2: Exploração de Fraquezas
  - Usar rixa com Bratva para criar situações de exposição
  - Identificar e monitorar familiares próximos
  - Mapear locais de rituais tradicionais da gangue

▸ Fase 3: Captura ou Neutralização
  Prioridade: CAPTURA VIVA para interrogatório sobre:
  - Estrutura completa da Sinaloa
  - Rotas de tráfico e armas
  - Conexões com outras organizações criminosas
  
  Alternativa: Eliminação se captura não for viável

▸ Recompensa: 50 MILHÕES DE CRÉDITOS
  Vivo: 50 milhões
  Morto: 25 milhões
  Informações que levem à captura: 10 milhões

>>> AMEAÇA DE NÍVEL MÁXIMO <<<
>>> CAPTURA É PRIORIDADE ESTRATÉGICA <<<

═══════════════════════════════════════════════════════════

// FIM DO DOSSIÊ
    `
  },
  {
    id: '019-INFERNO-NY',
    codename: 'INFERNO',
    realName: 'Rocco',
    status: 'ATIVO',
    priority: 'CRÍTICO',
    lastUpdate: '14.10.2225',
    threatLevel: 'CRÍTICO',
    dossier: `
DOSSIÊ DE ANÁLISE DE AMEAÇA – EXOCORP SEC.

CLASSIFICAÇÃO: ULTRASECRETO // ACESSO ALPHA
ID DO ARQUIVO: 019-INFERNO-NY
DATA: 14.10.2225
ASSUNTO: Rocco "Inferno", Líder da Trindade da Chama
NÍVEL DE AMEAÇA: CRÍTICO
STATUS: ATIVO - EXTREMAMENTE PERIGOSO

═══════════════════════════════════════════════════════════

1.0 RESUMO EXECUTIVO

Rocco, conhecido como "Inferno", é o líder carismático e fanático
da Trindade da Chama, uma organização terrorista que combina
misticismo, fervor revolucionário e tecnologia experimental.
Descendente de trabalhadores italianos, fundou o movimento como
resistência contra as corporações, acreditando que apenas através
da destruição completa do sistema é possível alcançar liberdade.

Sua combinação de devoção quase religiosa com brutalidade tática
o torna uma das maiores ameaças à estabilidade corporativa.

>>> ALERTA CRÍTICO: EXTREMAMENTE PERIGOSO <<<
>>> NEUTRALIZAÇÃO PRIORITÁRIA AUTORIZADA <<<

═══════════════════════════════════════════════════════════

2.0 PERFIL PESSOAL

▸ História: Descendente de trabalhadores italianos migrantes
  em NeonCity. Fundou Trindade da Chama como movimento de
  resistência revolucionária.

▸ Aparência:
  - Homem robusto de presença dominante
  - Tatuagens de símbolos religiosos e revolucionários
  - Túnica vermelha e preta (uniforme característico)
  - Evoca imagem de sacerdote rebelde
  - Implantes luminescentes simulando brasas sob a pele

▸ Personalidade:
  - Carismático e apaixonado
  - Visionário com discursos poderosos
  - Visão de mundo binária: "conosco ou contra nós"
  - Fervor quase religioso pela causa

═══════════════════════════════════════════════════════════

3.0 ORGANIZAÇÃO: TRINDADE DA CHAMA

3.1 ESTRUTURA

▸ Liderança Tripla: "Chamas Primordiais"
  - FORÇA (Rocco)
  - VISÃO (Identidade desconhecida)
  - DESTRUIÇÃO (Identidade desconhecida)

▸ Culto ao Poder
  Veneram a "Chama Eterna" representando purificação e
  renovação através da destruição.

3.2 CAPACIDADES OPERACIONAIS

▸ Operações Principais:
  - Ataques diretos a instalações corporativas
  - Sabotagem sistemática de infraestrutura
  - Propaganda revolucionária massiva
  - Recrutamento ativo em setores pobres
  - Proteção e serviços em troca de lealdade

▸ Tecnologia:
  - Drogas sintéticas de amplificação de força/agressividade
  - Cibernética experimental e bioenhanced
  - Armas experimentais
  - Implantes luminescentes de identificação

▸ Atividades Criminosas:
  - Extorsão corporativa
  - Tráfico de armas bioenhanced
  - Experimentos ilegais com cibernética
  - Atos incendiários contra símbolos corporativos

═══════════════════════════════════════════════════════════

4.0 ANÁLISE DE CAPACIDADES

4.1 PONTOS FORTES

▸ Carisma Excepcional
  Habilidade única de inspirar devoção fanática. Seguidores
  demonstram disposição ao martírio pela causa.

▸ Ideologia Poderosa
  Movimento transcende ganância. Membros lutam por "causa
  maior", tornando-os imprevisíveis e perigosos.

▸ Fervor Revolucionário
  Paixão contagiante que atrai novos recrutas constantemente.
  Crescimento exponencial da organização.

▸ Táticas de Guerrilha
  Especialista em ataques surpresa, sabotagem e guerra
  psicológica contra corporações.

▸ Domínio Territorial
  Controla setores inteiros da Cidade Baixa, oferecendo
  serviços e proteção como governo paralelo.

▸ Rede de Propaganda
  Sistema eficiente de disseminação ideológica e recrutamento.

4.2 PONTOS FRACOS

▸ Fanatismo Cego
  Visão binária do mundo pode ser explorada para criar
  divisões internas ou forçar erros táticos.

▸ Dependência de Lealdade
  Organização baseada em devoção pessoal a Rocco. Sua
  eliminação causaria colapso parcial do movimento.

▸ Tecnologia Experimental
  Uso de cibernética não testada pode causar falhas críticas
  em operações.

▸ Intolerância
  Recusa em trabalhar com grupos que considera "vendidos".
  Limita alianças potenciais.

▸ Perfil Alto
  Rocco é figura pública reconhecível. Túnica característica
  e presença marcante facilitam identificação.

═══════════════════════════════════════════════════════════

5.0 RELAÇÕES COM OUTRAS FACÇÕES

▸ Família Carbone:
  Respeitam herança italiana, mas consideram métodos
  conservadores e "vendidos" às corporações.

▸ Sinaloa:
  Desprezam ganância e brutalidade. Frequentemente sabotam
  rotas da Sinaloa.

▸ Bratva:
  Tolerância relutante. Evitam aliança devido à natureza
  oportunista.

▸ Dragões de Jade:
  Admiram disciplina, mas consideram que falta paixão na luta.

▸ Clã Kurogane:
  Respeitam honra, mas veem tradição como obstáculo à mudança.

═══════════════════════════════════════════════════════════

6.0 AMEAÇA CORPORATIVA

▸ Impacto Direto:
  - 47 ataques confirmados a instalações ExoCorp
  - Perdas estimadas: 230 milhões de créditos
  - 89 baixas entre pessoal de segurança
  - Sabotagem de 3 projetos de desenvolvimento críticos

▸ Impacto Indireto:
  - Inspiração para outros grupos revolucionários
  - Desestabilização de setores controlados
  - Dano à imagem corporativa
  - Custos crescentes de segurança

═══════════════════════════════════════════════════════════

7.0 DIRETIVA DE AÇÃO

STATUS: NEUTRALIZAÇÃO AUTORIZADA - PRIORIDADE MÁXIMA

▸ Fase 1: Infiltração Profunda
  - Inserir agentes em células periféricas da Trindade
  - Identificar localização dos outros dois líderes
  - Mapear estrutura de comando completa
  - Localizar depósitos de armas e laboratórios

▸ Fase 2: Desestabilização Interna
  - Semear dúvidas sobre liderança através de propaganda
  - Criar conflitos entre células da organização
  - Sabotar experimentos de tecnologia experimental
  - Interceptar rotas de fornecimento

▸ Fase 3: Ataque Coordenado
  - Operação simultânea contra múltiplas células
  - Captura ou eliminação dos três líderes
  - Destruição de infraestrutura crítica
  - Desmantelamento público da organização

▸ Opção Alfa: Eliminação de Rocco
  Ataque direto durante evento público. Risco de criar mártir,
  mas pode desmoralizar movimento imediatamente.

▸ Opção Beta: Captura e Interrogatório
  Extração forçada para obtenção de inteligência completa
  sobre estrutura, planos futuros e identidade dos outros
  líderes. Alto valor tático.

▸ Opção Gama: Difamação Total
  Campanha de desinformação para destruir credibilidade:
  - Revelar conexões com crimes não ideológicos
  - Fabricar evidências de corrupção pessoal
  - Expor falhas nos experimentos cibernéticos
  - Associar a atrocidades contra civis

>>> AMEAÇA EXISTENCIAL AO CONTROLE CORPORATIVO <<<
>>> NEUTRALIZAÇÃO É IMPERATIVA <<<
>>> AUTORIZADO USO DE FORÇA LETAL MÁXIMA <<<

═══════════════════════════════════════════════════════════

8.0 NOTAS OPERACIONAIS

Rocco representa um tipo de ameaça diferente: não busca poder
pessoal ou riqueza, mas destruição completa do sistema. Sua
motivação ideológica pura o torna imune a suborno ou negociação.

A Trindade da Chama é mais que uma gangue - é um movimento com
potencial de iniciar revolução em massa se não for contida.

Recomendação: Tratamento como ameaça terrorista de nível máximo.
Não subestimar.

═══════════════════════════════════════════════════════════

// FIM DO DOSSIÊ
    `
  },
  {
    id: '734-ORPHEUS-NY',
    codename: 'ORPHEUS',
    realName: 'Calíope',
    status: 'ATIVO',
    priority: 'CRÍTICO',
    lastUpdate: '07.10.2225',
    threatLevel: 'SEVERO',
    dossier: `
DOSSIÊ DE ANÁLISE DE AMEAÇA – EXOCORP SEC.

CLASSIFICAÇÃO: CONFIDENCIAL // ACESSO ÔMEGA
ID DO ARQUIVO: 734-ORPHEUS-NY
DATA: 07.10.2225
ASSUNTO: Calíope, a.k.a. "Orpheus"
NÍVEL DE AMEAÇA: SEVERO

═══════════════════════════════════════════════════════════

1.0 RESUMO EXECUTIVO

O ativo "Orpheus" (identidade civil: Calíope) é uma insurgente 
de alta periculosidade com capacidades disruptivas 
ciber-psicossociais. Utilizando a fachada de uma DJ de renome, 
promove ideologias subversivas (comunistas) e executa ataques 
diretos contra interesses corporativos. Sua fusão de guerra 
informacional com manipulação de massas via música neuropisíquica 
a torna uma ameaça prioritária e instável. 

A diretiva recomendada é a neutralização do ativo.

═══════════════════════════════════════════════════════════

2.0 ANÁLISE DE CAPACIDADES

2.1 PONTOS FORTES (VETORES DE AMEAÇA)

▸ Guerra Psicoacústica
  Manipula multidões através de música neuropisíquica, incitando 
  estados emocionais e motins.

▸ Infiltração Social
  A persona pública de "DJ Calíope" garante acesso e influência, 
  servindo como camuflagem para atividades clandestinas.

▸ Ciber-Guerra Avançada
  Habilidades de hacking de elite para violar redes seguras, 
  drones e sistemas de vigilância.

▸ Capacidade Destrutiva ("Overdrive Surge")
  Implante neural confirmado que sobrecarrega dispositivos 
  eletrônicos, transformando-os em explosivos improvisados. 
  Ameaça letal em ambientes tecnológicos.

▸ Motivação Ideológica
  Movida por trauma passado e fanatismo ideológico. Imune a 
  subornos ou ameaças convencionais.

2.2 PONTOS FRACOS (VETORES DE EXPLORAÇÃO)

▸ Trauma Psicológico
  A perda da família é uma vulnerabilidade explorável para 
  induzir respostas emocionais e erros táticos.

▸ Dependência Tecnológica
  Suas principais habilidades dependem de implantes. Vulnerável 
  a contramedidas eletrônicas (EMP, contra-hacking neural).

▸ Dupla Identidade
  A persona pública possui padrões rastreáveis (shows, locais). 
  Atacar "Calíope" força "Orpheus" a se expor.

▸ Infraestrutura Física
  Necessita de equipamentos de som para sua arma principal 
  (música). Esses são alvos físicos e vulneráveis.

═══════════════════════════════════════════════════════════

3.0 AVALIAÇÃO OPERACIONAL

Padrões e Nexus: 
O ativo opera nas sombras de NY, mas suas aparições públicas 
são previsíveis. Seu verdadeiro poder (Nexus) não é um local, 
mas a sinergia entre sua fama como artista e suas ações como 
terrorista. A música cria os seguidores que ela arma com sua 
ideologia. 

Para neutralizá-la, sua influência cultural deve ser destruída 
junto com suas capacidades operacionais.

═══════════════════════════════════════════════════════════

4.0 DIRETIVA DE AÇÃO

A ameaça "Orpheus" à estabilidade corporativa na região é 
intolerável.

RECOMENDAÇÃO: NEUTRALIZAÇÃO IMEDIATA.

▸ Opção Alfa (Eliminação)
  Envio de equipe de extermínio. Risco de criar uma mártir.

▸ Opção Beta (Difamação)
  Destruir sua persona pública, isolando-a de sua base de apoio.

▸ Opção Gama (Captura)
  Extrair tecnologia e tentar recondicionamento neural. 
  Alto risco, alta recompensa.

═══════════════════════════════════════════════════════════

Aguardando decisão para alocação de recursos.

// FIM DO DOSSIÊ
    `
  }
];

const DossierView = () => {
  const [selectedTarget, setSelectedTarget] = useState<Target | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ATIVO': return 'text-destructive';
      case 'NEUTRALIZADO': return 'text-muted-foreground';
      case 'EM OBSERVAÇÃO': return 'text-secondary';
      case 'DESAPARECIDO': return 'text-primary';
      default: return 'text-foreground';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'CRÍTICO': return 'border-destructive bg-destructive/10 text-destructive';
      case 'ALTO': return 'border-secondary bg-secondary/10 text-secondary';
      case 'MÉDIO': return 'border-primary bg-primary/10 text-primary';
      case 'BAIXO': return 'border-muted bg-muted/10 text-muted-foreground';
      default: return 'border-muted bg-muted/10 text-muted-foreground';
    }
  };

  if (selectedTarget) {
    return (
      <div className="p-8 h-full overflow-auto">
        <Button
          onClick={() => setSelectedTarget(null)}
          variant="outline"
          size="sm"
          className="mb-6 border-primary text-primary hover:bg-primary hover:text-primary-foreground terminal-text"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          VOLTAR À LISTA
        </Button>

        <div className="neon-border bg-card/30 backdrop-blur-sm p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-6 pb-6 border-b border-primary/30">
            <div>
              <h2 className="text-2xl neon-glow terminal-text tracking-widest mb-2">
                {selectedTarget.codename}
              </h2>
              <p className="text-sm text-muted-foreground terminal-text">
                IDENTIDADE: {selectedTarget.realName}
              </p>
              <p className="text-xs text-muted-foreground terminal-text mt-1">
                ID: {selectedTarget.id}
              </p>
            </div>
            <div className="text-right space-y-2">
              <div className={`inline-flex items-center gap-2 px-3 py-1 border ${getPriorityColor(selectedTarget.priority)} text-xs terminal-text`}>
                <AlertTriangle className="h-3 w-3" />
                {selectedTarget.priority}
              </div>
              <div className="text-xs text-muted-foreground terminal-text">
                ATUALIZADO: {selectedTarget.lastUpdate}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="bg-input/50 p-8 rounded-sm border border-primary/20">
            <pre className="text-sm text-foreground terminal-text whitespace-pre-wrap leading-relaxed">
              {selectedTarget.dossier}
            </pre>
          </div>

          {/* Footer */}
          <div className="flex justify-between items-center pt-6 border-t border-primary/20 mt-6">
            <span className="text-[10px] text-muted-foreground terminal-text">
              ACESSO REGISTRADO // 2225.10.09 // USUÁRIO: DENARO
            </span>
            <span className={`text-[10px] terminal-text ${getStatusColor(selectedTarget.status)}`}>
              STATUS: {selectedTarget.status}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 h-full overflow-auto">
      <div className="mb-6">
        <h2 className="text-lg neon-glow terminal-text tracking-widest mb-2">
          // DOSSIÊS DE PESSOAL
        </h2>
        <p className="text-xs text-muted-foreground terminal-text">
          ARQUIVOS CLASSIFICADOS // ALVOS DE ALTO VALOR
        </p>
      </div>

      {/* Grid de cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {targets.map((target) => (
          <button
            key={target.id}
            onClick={() => setSelectedTarget(target)}
            className="text-left neon-border bg-card/30 backdrop-blur-sm p-5 hover:bg-card/50 transition-all group cursor-pointer"
          >
            {/* Header do card */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg text-primary neon-glow terminal-text tracking-wider mb-1 group-hover:text-secondary transition-colors">
                  {target.codename}
                </h3>
                <p className="text-xs text-muted-foreground terminal-text">
                  {target.realName}
                </p>
              </div>
              <div className={`text-[10px] px-2 py-1 border ${getPriorityColor(target.priority)} terminal-text whitespace-nowrap ml-2`}>
                {target.priority}
              </div>
            </div>

            {/* Info do card */}
            <div className="space-y-2 text-xs terminal-text">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">STATUS:</span>
                <span className={getStatusColor(target.status)}>
                  {target.status}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">AMEAÇA:</span>
                <span className="text-foreground">{target.threatLevel}</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-primary/20">
                <span className="text-muted-foreground">ÚLTIMA ATUALIZAÇÃO:</span>
                <span className="text-primary">{target.lastUpdate}</span>
              </div>
            </div>

            {/* Footer do card */}
            <div className="mt-4 pt-3 border-t border-primary/20">
              <p className="text-[10px] text-muted-foreground terminal-text opacity-0 group-hover:opacity-100 transition-opacity">
                CLIQUE PARA ABRIR DOSSIÊ COMPLETO &gt;&gt;
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Info box */}
      <div className="mt-6 p-4 neon-border-magenta bg-secondary/5">
        <p className="text-xs text-secondary terminal-text tracking-wider">
          ⚠ {targets.length} ALVOS CATALOGADOS // ADICIONE MAIS EDITANDO O CÓDIGO
        </p>
      </div>
    </div>
  );
};

export default DossierView;
