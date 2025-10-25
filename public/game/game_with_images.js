// ECOS DA HUMANIDADE - NEXUS: O ÚLTIMO AMANHECER
// Sistema de livro-jogo interativo com prólogos personalizados

class GameEngine {
    constructor() {
        this.gameState = {
            // Personagem
            selectedCharacter: null,
            characterData: {},
            
            // Progressão
            currentScene: 'prologo',
            act: 1,
            
            // Tracking de Missões e Recursos
            missionsCompleted: {
                warOfInformation: false,  // Blitz News
                seekingAllies: false,      // Hong Lin/Gangues
                tacticalAdvantage: false   // Teletransporte/Novo Éden
            },
            
            resources: {
                hasCommunicator: false,        // Comunicador de Dona Rose
                hasLocationData: false,        // Localização de Lia
                hasTeleporation: false,        // Dispositivo de Teletransporte
                hasNovoEdenCoords: false,      // Coordenadas de Novo Éden
                donaRoseLiberated: false,      // Dona Rose foi libertada?
                publicChaos: 0,                // Nível de caos público (0-100)
                resistanceConfidence: 50       // Confiança da resistência (0-100)
            },
            
            allies: {
                dragonsOfJade: false,    // Aliança com Dragões de Jade
                sinaloaCartel: false,    // Aliança com Cartel de Sinaloa
                trinityOfFlame: false,   // Aliança com Trindade da Chama
                carboneFamily: false     // Aliança com Família Carbone
            },
            
            // Flags de história
            flags: {
                hongLinFate: null,           // 'killed', 'captured', 'escaped'
                pDiFate: null,               // 'defeated', 'executed', 'imprisoned'
                entryMethod: null,           // 'frontal', 'stealth', 'teleport'
                liaRescueMethod: null        // 'combat_first', 'rescue_first'
            }
        };
        
        this.characters = this.initializeCharacters();
        this.scenes = this.initializeScenes();
        this.currentSceneData = null;
    }
    
    // PERSONAGENS JOGÁVEIS
    initializeCharacters() {
        return {
            nilo: {
                name: "NILO",
                role: "Operador de Drones",
                description: "Entregador revolucionário que usa drones para contrabando e resistência.",
                portrait: "assets/nilo.png",
                prologueScene: "prologo_nilo"
            },
            
            zhen: {
                name: "ZHEN LIU", 
                role: "Cozinheiro de Rua",
                description: "Artista culinário que transformou utensílios em armas de guerra.",
                portrait: "assets/zhen.png",
                prologueScene: "prologo_zhen"
            },
            
            caliope: {
                name: "CALÍOPE / ORPHEUS",
                role: "DJ Neuropisíquica",
                description: "Revolucionária que usa música e hacking para combater opressão.",
                portrait: "assets/caliope.png",
                prologueScene: "prologo_caliope"
            },
            
            artz: {
                name: "ARTZ GEDERWÜNGEN",
                role: "Cientista Übermensch",
                description: "Médico alemão rejuvenescido que alcançou a perfeição humana.",
                portrait: "assets/artz.png",
                prologueScene: "prologo_artz"
            }
        };
    }
    
    // TODAS AS SEÇÕES DO JOGO
    initializeScenes() {
        return {
            // ========== PRÓLOGOS PERSONALIZADOS (15 DIAS ANTES) ==========
            
            prologo_nilo: {
                title: "Prólogo: 15 Dias Antes",
                location: "Apartamento de Nilo - Periferia",
                image: "nexus_destroyed",
                content: [
                    {
                        type: "narrative",
                        text: "Seu apartamento minúsculo na periferia. Através da janela suja, as torres corporativas brilham em neon. A desigualdade nunca foi tão visível."
                    },
                    {
                        type: "narrative",
                        text: "Seu drone 'Vespa-1' zumbe ao seu lado durante a manutenção. Este companheiro mecânico tem sido sua fonte de renda... e de contrabando para a resistência."
                    },
                    {
                        type: "dialogue",
                        speaker: "NILO",
                        text: "Mais um dia, mais uma entrega. Mas hoje tem algo especial no pacote..."
                    },
                    {
                        type: "narrative",
                        text: "Dentro de uma caixa de pizza falsa: um chip de dados roubados da Exocorp. Informações que podem salvar vidas. Você sorri. A revolução voa em drones discretos."
                    },
                    {
                        type: "system",
                        text: "[15 DIAS DEPOIS, O NEXUS FOI DESTRUÍDO...]"
                    }
                ],
                choices: [
                    {
                        id: "start_act1",
                        text: "Continuar para o presente",
                        desc: "O Nexus em cinzas...",
                        nextScene: "001"
                    }
                ]
            },

            prologo_zhen: {
                title: "Prólogo: 15 Dias Antes",
                location: "Barraca de Comida - Chinatown",
                image: "chinatown",
                content: [
                    {
                        type: "narrative",
                        text: "A fumaça aromática de sua barraca enche o ar de Chinatown. Você serve macarrão quente para trabalhadores exaustos que mal têm tempo para respirar entre turnos."
                    },
                    {
                        type: "dialogue",
                        speaker: "ZHEN LIU",
                        text: "Comer é um ato de resistência quando o sistema quer nos ver famintos e obedientes."
                    },
                    {
                        type: "narrative",
                        text: "Suas verdadeiras armas não são temperos. Seu martelo de amaciar carne e faca de cozinha foram modificados - cada um carrega a memória de Meiling, sua mentora assassinada."
                    },
                    {
                        type: "narrative",
                        text: "Hoje você serve não apenas comida, mas esperança. Cada prato é uma pequena vitória contra a opressão."
                    },
                    {
                        type: "system",
                        text: "[15 DIAS DEPOIS, O NEXUS FOI DESTRUÍDO...]"
                    }
                ],
                choices: [
                    {
                        id: "start_act1",
                        text: "Continuar para o presente",
                        desc: "O Nexus em cinzas...",
                        nextScene: "001"
                    }
                ]
            },

            prologo_caliope: {
                title: "Prólogo: 15 Dias Antes",
                location: "Clube Underground",
                image: "club",
                content: [
                    {
                        type: "narrative",
                        text: "As batidas eletrônicas reverberam pelo clube. Suas mãos dançam sobre o mixer enquanto luzes neon pulsam. Mas isto não é apenas performance - é guerra neurológica."
                    },
                    {
                        type: "dialogue",
                        speaker: "CALÍOPE",
                        text: "Cada batida é um vírus. Cada melodia, uma invasão. A música é minha arma contra esse sistema podre."
                    },
                    {
                        type: "narrative",
                        text: "Escondido nas frequências há código de hacking infiltrando-se nos implantes neurais da audiência corporativa. Eles dançam sem saber que suas defesas digitais estão sendo desmanteladas."
                    },
                    {
                        type: "narrative",
                        text: "Você sorri por trás dos óculos de neon. A revolução tem um ritmo, e você é a maestrina."
                    },
                    {
                        type: "system",
                        text: "[15 DIAS DEPOIS, O NEXUS FOI DESTRUÍDO...]"
                    }
                ],
                choices: [
                    {
                        id: "start_act1",
                        text: "Continuar para o presente",
                        desc: "O Nexus em cinzas...",
                        nextScene: "001"
                    }
                ]
            },

            prologo_artz: {
                title: "Prólogo: 15 Dias Antes",
                location: "Laboratório Clandestino",
                image: "lab",
                content: [
                    {
                        type: "narrative",
                        text: "Seu laboratório cheira a produtos químicos e possibilidades. Frascos borbulham, equipamentos médicos zumbem. Aos 80 anos no registro, seu corpo de 30 é prova viva de que a ciência não tem limites."
                    },
                    {
                        type: "dialogue",
                        speaker: "ARTZ",
                        text: "O Übermensch não é um sonho nazista distorcido. É uma realidade científica. E eu sou a prova disso."
                    },
                    {
                        type: "narrative",
                        text: "Você observa o gel bioluminescente em seus dedos - uma das muitas armas químicas que criou. Seu corpo é uma fábrica ambulante de compostos letais e curas milagrosas."
                    },
                    {
                        type: "narrative",
                        text: "Hoje você sintetiza um novo composto: Stinger-Ignis. Será necessário para a missão que está por vir."
                    },
                    {
                        type: "system",
                        text: "[15 DIAS DEPOIS, O NEXUS FOI DESTRUÍDO...]"
                    }
                ],
                choices: [
                    {
                        id: "start_act1",
                        text: "Continuar para o presente",
                        desc: "O Nexus em cinzas...",
                        nextScene: "001"
                    }
                ]
            },

            // ========== ATO I: A QUEDA DO REFÚGIO ==========

            '001': {
                title: "Ato I: O Retorno ao Nexus",
                location: "Nexus - Ruínas Fumegantes",
                image: "nexus_destroyed",
                content: [
                    {
                        type: "system",
                        text: "[NEXUS: O ÚLTIMO AMANHECER]"
                    },
                    {
                        type: "narrative",
                        text: "A cena é de horror. O Nexus, seu santuário, está em escombros e fumaça. O coração de cada um se aperta ao ver o refúgio da resistência transformado em cemitério."
                    },
                    {
                        type: "narrative",
                        text: "Chuva ácida cai sobre os destroços. Corpos de amigos e aliados jazem entre vigas retorcidas. O cheiro de queimado e morte permeia o ar."
                    },
                    {
                        type: "dialogue",
                        speaker: this.gameState?.characterData?.name || "VOCÊ",
                        text: "Dona Rose... ela estava aqui. Temos que encontrá-la. Rápido!"
                    },
                    {
                        type: "narrative",
                        text: "Mas o instinto de sobrevivência grita: isto pode ser uma armadilha. A Exocorp pode estar esperando o retorno da resistência."
                    }
                ],
                choices: [
                    {
                        id: "enter_immediately",
                        text: "Entrar imediatamente nos escombros",
                        desc: "O tempo é crucial para buscar Dona Rose",
                        nextScene: "002"
                    },
                    {
                        id: "observe_first",
                        text: "Observar os arredores primeiro",
                        desc: "Procurar por armadilhas e sentinelas da Exocorp",
                        nextScene: "003"
                    }
                ]
            },

            '002': {
                title: "A Matriarca e o Segredo",
                location: "Nexus - Subsolo Colapsado",
                image: "nexus_underground",
                content: [
                    {
                        type: "narrative",
                        text: "Vocês correm entre os escombros, movendo destroços com urgência desesperada. E então... a encontram."
                    },
                    {
                        type: "narrative",
                        text: "Dona Rose está sob uma viga de concreto, mortalmente ferida. Sangue escorre de múltiplos ferimentos. Seus olhos ainda brilham com determinação."
                    },
                    {
                        type: "dialogue",
                        speaker: "DONA ROSE",
                        text: "[voz fraca] Vocês... voltaram. Sabia que... voltariam..."
                    },
                    {
                        type: "dialogue",
                        speaker: this.gameState?.characterData?.name || "VOCÊ",
                        text: "Aguenta firme! Vamos te tirar daqui!"
                    },
                    {
                        type: "dialogue",
                        speaker: "DONA ROSE",
                        text: "Não... não há tempo. Lia... ela foi levada. Projeto Arquitetos... P. Di... ele vai usar ela para criar uma 'nova humanidade'..."
                    },
                    {
                        type: "narrative",
                        text: "Com tremenda força de vontade, Dona Rose entrega um comunicador manchado de sangue."
                    },
                    {
                        type: "dialogue",
                        speaker: "DONA ROSE",
                        text: "Gravação de Lia... salvem ela... salvem a humanidade..."
                    },
                    {
                        type: "narrative",
                        text: "Seus olhos se fecham. Dona Rose, a matriarca da resistência, morre em seus braços. O comunicador pulsa com uma luz fraca - uma última mensagem de esperança."
                    },
                    {
                        type: "system",
                        text: "[ITEM OBTIDO] Comunicador de Dona Rose com gravação de Lia"
                    }
                ],
                choices: [
                    {
                        id: "track_frequency",
                        text: "Usar a frequência da gravação para rastrear origem",
                        desc: "Descobrir onde Lia está",
                        flags: { hasCommunicator: true },
                        nextScene: "004"
                    },
                    {
                        id: "flee_regroup",
                        text: "Fugir imediatamente com a gravação",
                        desc: "Reagrupar em local seguro",
                        flags: { hasCommunicator: true },
                        nextScene: "005"
                    }
                ]
            },

            '003': {
                title: "Armadilha e Evasão",
                location: "Nexus - Perímetro Externo",
                image: "nexus_ruins",
                content: [
                    {
                        type: "narrative",
                        text: "Sua cautela se justifica. Escondido nas sombras, você observa atentamente os arredores antes de se aproximar."
                    },
                    {
                        type: "system",
                        text: "[PERCEPÇÃO ATIVADA]"
                    },
                    {
                        type: "narrative",
                        text: "Drones de vigilância camuflados pairam entre os escombros. Pontos de luz laser vermelha - snipers posicionados em prédios vizinhos. Uma armadilha completa."
                    },
                    {
                        type: "dialogue",
                        speaker: this.gameState?.characterData?.name || "VOCÊ",
                        text: "Merda... eles sabiam que voltaríamos. É uma emboscada!"
                    },
                    {
                        type: "narrative",
                        text: "Você pode tentar desativar os drones remotamente para recuperar o comunicador de Dona Rose, ou aceitar a perda e fugir imediatamente."
                    }
                ],
                choices: [
                    {
                        id: "disable_drones",
                        text: "Desativar os drones remotamente",
                        desc: "Arriscado, mas pode recuperar o comunicador",
                        nextScene: "002"
                    },
                    {
                        id: "escape_sewers",
                        text: "Fugir pela rota de esgoto",
                        desc: "Seguro, mas perde o comunicador e Dona Rose",
                        flags: { hasCommunicator: false },
                        nextScene: "005"
                    }
                ]
            },

            '004': {
                title: "Rastreamento de Pista",
                location: "Esconderijo Temporário - Terminal de Hacking",
                image: "hideout",
                content: [
                    {
                        type: "narrative",
                        text: "Em um esconderijo improvisado, você conecta o comunicador a um terminal de análise. Pentabyte, o hacker da resistência, trabalha freneticamente."
                    },
                    {
                        type: "dialogue",
                        speaker: "PENTABYTE",
                        text: "Deixa eu ver... analisando a frequência... triangulando o ponto de origem..."
                    },
                    {
                        type: "system",
                        text: "[PROCESSANDO... ANÁLISE ACÚSTICA E RASTREAMENTO DE SINAL...]"
                    },
                    {
                        type: "narrative",
                        text: "Linhas de código rolam na tela. Mapas holográficos se sobrepõem. E então... um ping de confirmação."
                    },
                    {
                        type: "dialogue",
                        speaker: "PENTABYTE",
                        text: "Consegui! A localização exata: Torre Exocorp, Subsolo 7, Laboratório Genético Alfa. Lia está lá."
                    },
                    {
                        type: "system",
                        text: "[LOCALIZAÇÃO DE LIA CONFIRMADA]"
                    },
                    {
                        type: "narrative",
                        text: "Vocês trocam olhares graves. A Torre Exocorp é a fortaleza mais bem guardada da cidade. Mas agora sabem exatamente onde Lia está."
                    }
                ],
                choices: [
                    {
                        id: "continue",
                        text: "Continuar para o reagrupamento",
                        desc: "Encontrar Bobby e os sobreviventes",
                        flags: { hasLocationData: true },
                        nextScene: "005"
                    }
                ]
            },

            '005': {
                title: "O Reagrupamento e a Missão",
                location: "Base Temporária - Armazém Abandonado",
                image: "warehouse",
                content: [
                    {
                        type: "narrative",
                        text: "Vocês encontram Bobby e os sobreviventes da resistência num armazém abandonado. Rostos marcados por dor e determinação."
                    },
                    {
                        type: "dialogue",
                        speaker: "BOBBY",
                        text: "Dona Rose... ela se foi, não foi? Droga... DROGA!"
                    },
                    {
                        type: "narrative",
                        text: this.gameState?.resources?.hasCommunicator ? 
                            "Você mostra o comunicador. A gravação de Lia é reproduzida para todos. Lágrimas escorrem, mas também determinação se acende nos olhos." :
                            "Você explica que Dona Rose morreu sem conseguir passar informações. O moral está baixo, mas a determinação permanece."
                    },
                    {
                        type: "dialogue",
                        speaker: this.gameState?.characterData?.name || "VOCÊ",
                        text: this.gameState?.resources?.hasLocationData ? 
                            "Sabemos onde Lia está: Subsolo 7 da Torre Exocorp. Mas entrar lá é impossível... sem preparação." :
                            "Precisamos encontrar Lia. Ela está em algum lugar na Torre Exocorp. Mas entrar lá é impossível sem preparação."
                    },
                    {
                        type: "dialogue",
                        speaker: "PENTABYTE",
                        text: "A Torre é impenetrável. Precisamos de três coisas: Informação para desestabilizar P. Di publicamente, Aliados para ter força militar, e Vantagem Tática para entrar ou escapar."
                    },
                    {
                        type: "system",
                        text: "[MISSÕES DE PREPARO DISPONÍVEIS]"
                    },
                    {
                        type: "system",
                        text: "1. GUERRA DE INFORMAÇÃO: Expor P. Di na Blitz News"
                    },
                    {
                        type: "system",
                        text: "2. BUSCA POR ALIADOS: Garantir apoio das gangues (Hong Lin)"
                    },
                    {
                        type: "system",
                        text: "3. VANTAGEM TÁTICA: Obter Teletransporte ou Coordenadas de Novo Éden"
                    },
                    {
                        type: "narrative",
                        text: "Você pode escolher qualquer ordem. Duas missões já permitem o assalto à Torre, mas três maximizam a chance de sucesso."
                    }
                ],
                choices: [
                    {
                        id: "mission_information",
                        text: "🎥 Guerra de Informação (Blitz News)",
                        desc: "Expor os crimes de P. Di publicamente",
                        nextScene: "010"
                    },
                    {
                        id: "mission_allies",
                        text: "⚔️ Busca por Aliados (Hong Lin/Gangues)",
                        desc: "Garantir força militar das facções",
                        nextScene: "020"
                    },
                    {
                        id: "mission_tactical",
                        text: "🔧 Vantagem Tática (Tecnologia)",
                        desc: "Obter dispositivos estratégicos",
                        nextScene: "030"
                    },
                    {
                        id: "proceed_act3",
                        text: "⚠️ Prosseguir para Assalto à Torre (arriscado)",
                        desc: "Tentar sem preparação completa",
                        condition: "atLeastTwoMissions",
                        nextScene: "050"
                    }
                ]
            },

            // ========== ATO II: O PILAR DA RESISTÊNCIA ==========

            // MISSÃO 1: GUERRA DE INFORMAÇÃO (Blitz News)
            '010': {
                title: "Ato II: A Grande Exposição",
                location: "Torre de Transmissão - Blitz News",
                image: "blitz_tower",
                content: [
                    {
                        type: "system",
                        text: "[MISSÃO: GUERRA DE INFORMAÇÃO]"
                    },
                    {
                        type: "narrative",
                        text: "A torre de transmissão da Blitz News se ergue como uma agulha de luz neon perfurando o céu noturno. Este é o coração da propaganda da Exocorp."
                    },
                    {
                        type: "dialogue",
                        speaker: "PENTABYTE (RÁDIO)",
                        text: "P. Di está ao vivo AGORA. Temos uma janela de 15 minutos antes da segurança perceber a invasão. Zhen, você está pronto para o testemunho?"
                    },
                    {
                        type: "dialogue",
                        speaker: "ZHEN LIU",
                        text: "Pronto. Vou contar ao mundo inteiro o que a Exocorp fez com Meiling e com todos nós."
                    },
                    {
                        type: "narrative",
                        text: "Vocês invadem a sala de controle. Nas telas, P. Di sorri cinicamente para as câmeras. E ao lado dele... Dona Rose. Mas seus olhos estão vazios, mecânicos. Ela foi reprogramada."
                    },
                    {
                        type: "dialogue",
                        speaker: "P. DI (TRANSMISSÃO)",
                        text: "Como podem ver, cidadãos, até mesmo a 'líder da resistência' reconhece a superioridade da ordem Exocorp. Dona Rose agora serve a um propósito maior."
                    },
                    {
                        type: "dialogue",
                        speaker: this.gameState?.characterData?.name || "VOCÊ",
                        text: "Aquele monstro... ele a transformou em uma marionete! Temos que decidir: foco no testemunho de Zhen, ou tentamos hackear e libertar Dona Rose?"
                    },
                    {
                        type: "system",
                        text: "[DECISÃO CRÍTICA] Esta escolha define o impacto da missão"
                    }
                ],
                choices: [
                    {
                        id: "transmit_testimony",
                        text: "🎥 Focar no testemunho de Zhen",
                        desc: "Expor os crimes de P. Di ao mundo",
                        nextScene: "011"
                    },
                    {
                        id: "rescue_dona_rose",
                        text: "💾 Hackear e libertar Dona Rose",
                        desc: "Salvar o símbolo da resistência",
                        nextScene: "012"
                    }
                ]
            },

            '011': {
                title: "A Semente da Rebelião",
                location: "Blitz News - Transmissão ao Vivo",
                image: "broadcast",
                content: [
                    {
                        type: "narrative",
                        text: "Vocês decidem. O testemunho de Zhen é mais importante. Pentabyte assume o controle das câmeras."
                    },
                    {
                        type: "system",
                        text: "[TRANSMISSÃO HACKEADA - AO VIVO PARA TODA A CIDADE]"
                    },
                    {
                        type: "dialogue",
                        speaker: "ZHEN LIU (AO VIVO)",
                        text: "Meu nome é Zhen Liu. Há três anos, P. Di ordenou a execução de Meiling Fang porque ela organizou trabalhadores. Eu vi. Eu estava lá."
                    },
                    {
                        type: "dialogue",
                        speaker: "ZHEN LIU (AO VIVO)",
                        text: "Dona Rose que vocês veem não é mais ela mesma. A Exocorp arrancou sua humanidade e a transformou em propaganda. Isto é o que P. Di faz com quem ousa resistir!"
                    },
                    {
                        type: "narrative",
                        text: "As palavras de Zhen ecoam por milhões de telas. Nas ruas, trabalhadores param. Muitos começam a chorar. Outros gritam de raiva."
                    },
                    {
                        type: "dialogue",
                        speaker: "PENTABYTE (RÁDIO)",
                        text: "Funcioção! As redes sociais estão explodindo! Protestos começando em três distritos! Mas... a segurança está vindo. SAIAM DE LÁ!"
                    },
                    {
                        type: "narrative",
                        text: "Vocês fogem enquanto Dona Rose permanece na torre, seus olhos vazios ainda transmitindo. Um sacrifício doloroso, mas necessário."
                    },
                    {
                        type: "system",
                        text: "[RESULTADO] Caos Público: +50 | Alerta Exocorp: +30 | Dona Rose: Perdida"
                    },
                    {
                        type: "system",
                        text: "[MISSÃO COMPLETA] Guerra de Informação ✓"
                    }
                ],
                choices: [
                    {
                        id: "return_hub",
                        text: "Retornar ao Hub de Missões",
                        desc: "Escolher próxima missão",
                        flags: { warOfInformation: true },
                        resources: { publicChaos: 50, donaRoseLiberated: false },
                        nextScene: "005"
                    }
                ]
            },

            '012': {
                title: "O Símbolo Liberto",
                location: "Blitz News - Sala de Controle Neural",
                image: "neural_control",
                content: [
                    {
                        type: "narrative",
                        text: "Vocês tomam a decisão: Dona Rose é muito importante para ser deixada para trás. Pentabyte inicia o hack nos implantes neurais dela."
                    },
                    {
                        type: "dialogue",
                        speaker: "PENTABYTE",
                        text: "Os protocolos de controle são complexos... mas não impossíveis. Só preciso de tempo!"
                    },
                    {
                        type: "narrative",
                        text: "Zhen começa o testemunho, mas a segurança chega mais rápido. Vocês conseguem transmitir apenas fragmentos antes de precisar fugir."
                    },
                    {
                        type: "system",
                        text: "[HACK BEM-SUCEDIDO] Dona Rose: LIBERTADA"
                    },
                    {
                        type: "narrative",
                        text: "Os olhos de Dona Rose piscam. Vida retorna a eles. Ela desaba, mas vocês a seguram."
                    },
                    {
                        type: "dialogue",
                        speaker: "DONA ROSE",
                        text: "[voz fraca] Vocês... vocês me salvaram. Eu estava presa... dentro da minha própria mente..."
                    },
                    {
                        type: "dialogue",
                        speaker: this.gameState?.characterData?.name || "VOCÊ",
                        text: "Bem-vinda de volta, Dona Rose. A resistência precisa de você."
                    },
                    {
                        type: "narrative",
                        text: "O testemunho foi interrompido, mas Dona Rose está livre. A resistência recuperou seu símbolo vivo. O moral dispara."
                    },
                    {
                        type: "system",
                        text: "[RESULTADO] Confiança da Resistência: +40 | Caos Público: +10 | Dona Rose: Salva"
                    },
                    {
                        type: "system",
                        text: "[MISSÃO COMPLETA] Guerra de Informação ✓"
                    }
                ],
                choices: [
                    {
                        id: "return_hub",
                        text: "Retornar ao Hub com Dona Rose",
                        desc: "Escolher próxima missão",
                        flags: { warOfInformation: true },
                        resources: { resistanceConfidence: 90, publicChaos: 10, donaRoseLiberated: true },
                        nextScene: "005"
                    }
                ]
            },

            // MISSÃO 2: BUSCA POR ALIADOS (Hong Lin)
            '020': {
                title: "Ato II: A Chave do Dragão",
                location: "Hospital ExoHealth - Corredor 15º Andar",
                image: "hospital",
                content: [
                    {
                        type: "system",
                        text: "[MISSÃO: BUSCA POR ALIADOS]"
                    },
                    {
                        type: "narrative",
                        text: "O Hospital ExoHealth brilha com luzes azuis estéreis. Hong Lin, o informante da Sinaloa que matou Meiling Fang, está internado aqui após um ataque."
                    },
                    {
                        type: "dialogue",
                        speaker: "PENTABYTE (RÁDIO)",
                        text: "Hong Lin está no quarto 1547. Mas cuidado: detectei comunicações convergindo. Os Dragões de Jade E a Sinaloa estão chegando."
                    },
                    {
                        type: "narrative",
                        text: "Vocês se infiltram e chegam ao corredor do 15º andar. Através do vidro reforçado, veem Hong Lin inconsciente, conectado a máquinas de suporte vital."
                    },
                    {
                        type: "narrative",
                        text: "Mas então... duas presenças entram simultaneamente: Quiong Li dos Dragões de Jade (filho de Meiling, sedento por vingança) e sicários armados do Cartel de Sinaloa."
                    },
                    {
                        type: "dialogue",
                        speaker: "QUIONG LI",
                        text: "[empunhando katana cibernética] Então a Sinaloa também veio pelo traidor. Mas Hong Lin assassinou minha mãe. Sua vida é MINHA!"
                    },
                    {
                        type: "dialogue",
                        speaker: "SICÁRIO SINALOA",
                        text: "[apontando armas] Javier quer Hong Lin VIVO para interrogação. Saia do caminho ou morra com ele."
                    },
                    {
                        type: "narrative",
                        text: "A tensão está no limite. Vocês têm Hong Lin bem ali, e duas gangues prestes a explodir em violência. Sua decisão agora define qual aliança terão."
                    },
                    {
                        type: "system",
                        text: "[DECISÃO CRÍTICA] Aliança com Dragões OU Sinaloa"
                    }
                ],
                choices: [
                    {
                        id: "let_quiong_kill",
                        text: "⚔️ Deixar Quiong matar Hong Lin",
                        desc: "Aliança com Dragões de Jade (honra e vingança)",
                        nextScene: "021"
                    },
                    {
                        id: "capture_for_sinaloa",
                        text: "🔫 Capturar Hong Lin para a Sinaloa",
                        desc: "Aliança com Cartel de Sinaloa (força bruta)",
                        nextScene: "022"
                    }
                ]
            },

            '021': {
                title: "O Preço da Vingança",
                location: "Hospital - Quarto 1547",
                image: "hospital_room",
                content: [
                    {
                        type: "narrative",
                        text: "Vocês tomam a decisão. Recuam e deixam Quiong entrar no quarto sozinho."
                    },
                    {
                        type: "dialogue",
                        speaker: this.gameState?.characterData?.name || "VOCÊ",
                        text: "[para os sicários da Sinaloa] Hong Lin matou Meiling Fang. A justiça dos Dragões é mais importante que seus negócios."
                    },
                    {
                        type: "narrative",
                        text: "Os sicários rosnam, mas recuam. A honra ainda significa algo nas gangues de Chinatown."
                    },
                    {
                        type: "narrative",
                        text: "Dentro do quarto, Quiong ergue sua katana. Hong Lin desperta por um segundo, vê o rosto do filho de sua vítima, e entende."
                    },
                    {
                        type: "system",
                        text: "[SOM DE LÂMINA CORTANDO]"
                    },
                    {
                        type: "narrative",
                        text: "Silêncio. Quiong sai do quarto, katana limpa, lágrimas escorrendo. Ele se curva respeitosamente para vocês."
                    },
                    {
                        type: "dialogue",
                        speaker: "QUIONG LI",
                        text: "Vocês honraram a memória de minha mãe. Os Dragões de Jade são seus aliados. Quando chegarem à Torre Exocorp, nossas lâminas estarão com vocês."
                    },
                    {
                        type: "system",
                        text: "[ALIANÇA FORMADA] Dragões de Jade ✓"
                    },
                    {
                        type: "system",
                        text: "[BÔNUS] +15 Lutadores de Elite | +Acesso a Chinatown | -Relação com Sinaloa"
                    },
                    {
                        type: "system",
                        text: "[MISSÃO COMPLETA] Busca por Aliados ✓"
                    }
                ],
                choices: [
                    {
                        id: "return_hub",
                        text: "Retornar ao Hub de Missões",
                        desc: "Escolher próxima missão",
                        flags: { seekingAllies: true, hongLinFate: 'killed' },
                        allies: { dragonsOfJade: true },
                        nextScene: "005"
                    }
                ]
            },

            '022': {
                title: "A Captura Estratégica",
                location: "Hospital - Confronto",
                image: "hospital_confronto",
                content: [
                    {
                        type: "narrative",
                        text: "Vocês decidem intervir. Antes que Quiong possa entrar no quarto, vocês bloqueiam a entrada."
                    },
                    {
                        type: "dialogue",
                        speaker: this.gameState?.characterData?.name || "VOCÊ",
                        text: "Quiong, entendo sua dor. Mas Hong Lin tem informações sobre a Torre Exocorp que podem salvar Lia. Precisamos dele vivo."
                    },
                    {
                        type: "dialogue",
                        speaker: "QUIONG LI",
                        text: "[tremendo de raiva] Vocês... vocês protegem o assassino de minha mãe?! TRAIDORES!"
                    },
                    {
                        type: "narrative",
                        text: "Quiong ataca com fúria, mas os sicários da Sinaloa ajudam vocês a contê-lo. Ele escapa jurando vingança contra a resistência."
                    },
                    {
                        type: "narrative",
                        text: "Vocês capturam Hong Lin e o entregam à Sinaloa. Antes de ser levado, ele murmura informações valiosas sobre as vulnerabilidades da Torre."
                    },
                    {
                        type: "dialogue",
                        speaker: "HONG LIN",
                        text: "[voz fraca] Subsolo 7... a ventilação... código de acesso 4-7-7-9... P. Di não está sempre lá... segunda e quinta à noite..."
                    },
                    {
                        type: "dialogue",
                        speaker: "JAVIER (SINALOA)",
                        text: "[chegando pessoalmente] Vocês fizeram a escolha certa. A Sinaloa paga suas dívidas. Quando invadirem a Torre, terão nosso armamento pesado."
                    },
                    {
                        type: "system",
                        text: "[ALIANÇA FORMADA] Cartel de Sinaloa ✓"
                    },
                    {
                        type: "system",
                        text: "[BÔNUS] +Armamento Pesado | +Informações Táticas da Torre | -Inimizade com Dragões de Jade"
                    },
                    {
                        type: "system",
                        text: "[MISSÃO COMPLETA] Busca por Aliados ✓"
                    }
                ],
                choices: [
                    {
                        id: "return_hub",
                        text: "Retornar ao Hub de Missões",
                        desc: "Escolher próxima missão",
                        flags: { seekingAllies: true, hongLinFate: 'captured' },
                        allies: { sinaloaCartel: true },
                        nextScene: "005"
                    }
                ]
            },

            // MISSÃO 3: VANTAGEM TÁTICA
            '030': {
                title: "Ato II: Escolha Estratégica",
                location: "Base Temporária - Sala de Planejamento",
                image: "planning_room",
                content: [
                    {
                        type: "system",
                        text: "[MISSÃO: VANTAGEM TÁTICA]"
                    },
                    {
                        type: "narrative",
                        text: "Com Bobby e Pentabyte, vocês analisam as opções tecnológicas disponíveis para o assalto final."
                    },
                    {
                        type: "dialogue",
                        speaker: "BOBBY",
                        text: "Temos duas oportunidades exclusivas. A Trindade da Chama oferece as Coordenadas de Novo Éden - um lugar seguro para levar Lia caso tudo dê errado."
                    },
                    {
                        type: "dialogue",
                        speaker: "PENTABYTE",
                        text: "E a Família Carbone tem um Dispositivo de Teletransporte experimental. Arriscado, mas permitiria entrada direta no Subsolo 7, ignorando toda a segurança."
                    },
                    {
                        type: "dialogue",
                        speaker: this.gameState?.characterData?.name || "VOCÊ",
                        text: "Então é escolher entre uma rota de fuga garantida ou uma vantagem de invasão arriscada?"
                    },
                    {
                        type: "dialogue",
                        speaker: "BOBBY",
                        text: "Exatamente. Ambos exigem missões perigosas. Qual caminho seguimos?"
                    },
                    {
                        type: "system",
                        text: "[DECISÃO CRÍTICA] Define recurso estratégico final"
                    }
                ],
                choices: [
                    {
                        id: "seek_novo_eden",
                        text: "🗺️ Buscar Coordenadas de Novo Éden",
                        desc: "Rota de fuga garantida (final de Exílio disponível)",
                        nextScene: "031"
                    },
                    {
                        id: "seek_teleporter",
                        text: "⚡ Buscar Dispositivo de Teletransporte",
                        desc: "Entrada direta no Subsolo 7 (arriscada)",
                        nextScene: "032"
                    }
                ]
            },

            '031': {
                title: "O Caminho para o Exílio",
                location: "Zona Morta - Templo da Trindade",
                image: "trinity_temple",
                content: [
                    {
                        type: "narrative",
                        text: "A Zona Morta é um pesadelo radioativo nos arredores da cidade. Mas no coração dela, a Trindade da Chama construiu seu templo místico."
                    },
                    {
                        type: "dialogue",
                        speaker: "SACERDOTE DA TRINDADE",
                        text: "Vocês buscam o caminho para Novo Éden. Mas nada é dado gratuitamente. Devem provar seu valor na Provação do Fogo."
                    },
                    {
                        type: "narrative",
                        text: "A provação é brutal. Vocês enfrentam criaturas mutantes, armadilhas místicas e os próprios medos internos. Mas a resistência está acostumada ao sofrimento."
                    },
                    {
                        type: "system",
                        text: "[PROVAÇÃO SUPERADA]"
                    },
                    {
                        type: "dialogue",
                        speaker: "SACERDOTE DA TRINDADE",
                        text: "Vocês provaram coragem. Novo Éden existe além das montanhas ao norte. Aqui estão as coordenadas exatas. Usem-nas sabiamente."
                    },
                    {
                        type: "narrative",
                        text: "Você recebe um cristal de dados antigo gravado com coordenadas. Um caminho de esperança caso tudo mais falhe."
                    },
                    {
                        type: "system",
                        text: "[RECURSO OBTIDO] Coordenadas de Novo Éden ✓"
                    },
                    {
                        type: "system",
                        text: "[EFEITO] Permite Final A: O Éxodo para Novo Éden"
                    },
                    {
                        type: "system",
                        text: "[MISSÃO COMPLETA] Vantagem Tática ✓"
                    }
                ],
                choices: [
                    {
                        id: "return_hub",
                        text: "Retornar ao Hub de Missões",
                        desc: "Escolher próxima missão",
                        flags: { tacticalAdvantage: true },
                        resources: { hasNovoEdenCoords: true },
                        allies: { trinityOfFlame: true },
                        nextScene: "005"
                    }
                ]
            },

            '032': {
                title: "A Porta Secreta",
                location: "Distrito Portuário - Armazém Carbone",
                image: "warehouse_carbone",
                content: [
                    {
                        type: "narrative",
                        text: "A Família Carbone controla o porto. Máfia italiana velha guarda, eles traficam tecnologia roubada da Exocorp."
                    },
                    {
                        type: "dialogue",
                        speaker: "DON CARBONE",
                        text: "Vocês querem o teletransportador, eh? Bom, temos um problema. Carregamento nosso foi interceptado pela Exocorp. Recuperem ele, e o dispositivo é de vocês."
                    },
                    {
                        type: "narrative",
                        text: "A missão é perigosa. Vocês assaltam um comboio da Exocorp em movimento, enfrentando drones e mercenários. Mas a resistência é experiente em guerrilha urbana."
                    },
                    {
                        type: "system",
                        text: "[MISSÃO DE ESCOLTA BEM-SUCEDIDA]"
                    },
                    {
                        type: "dialogue",
                        speaker: "DON CARBONE",
                        text: "Impressionante. Vocês têm coragem. O teletransportador é experimental, 70% de chance de sucesso. Mas quando funciona... é mágico."
                    },
                    {
                        type: "narrative",
                        text: "Vocês recebem uma mochila pesada contendo o dispositivo. Uma entrada direta no coração da Torre Exocorp... se não explodir no processo."
                    },
                    {
                        type: "system",
                        text: "[RECURSO OBTIDO] Dispositivo de Teletransporte ✓"
                    },
                    {
                        type: "system",
                        text: "[EFEITO] Permite entrada direta no Subsolo 7 (70% sucesso, 30% falha catastrófica)"
                    },
                    {
                        type: "system",
                        text: "[MISSÃO COMPLETA] Vantagem Tática ✓"
                    }
                ],
                choices: [
                    {
                        id: "return_hub",
                        text: "Retornar ao Hub de Missões",
                        desc: "Escolher próxima missão",
                        flags: { tacticalAdvantage: true },
                        resources: { hasTeleportation: true },
                        allies: { carboneFamily: true },
                        nextScene: "005"
                    }
                ]
            },

            // ========== ATO III: O ASSALTO À TORRE ==========

            '050': {
                title: "Ato III: A Decisão de Entrada",
                location: "Arredores da Torre Exocorp",
                image: "tower_exterior",
                content: [
                    {
                        type: "system",
                        text: "[ATO III: O ASSALTO À TORRE]"
                    },
                    {
                        type: "narrative",
                        text: "A Torre Exocorp se ergue como uma agulha de aço e vidro perfurando as nuvens. Luzes azuis pulsam em seus andares. Dentro dela, Lia aguarda no Subsolo 7."
                    },
                    {
                        type: "dialogue",
                        speaker: "BOBBY",
                        text: `Temos ${Object.values(this.gameState?.missionsCompleted || {}).filter(x => x).length} missões completas. Recursos reunidos. Aliados prontos. Esta é a nossa única chance.`
                    },
                    {
                        type: "narrative",
                        text: this.gameState?.resources?.donaRoseLiberated ? 
                            "Dona Rose está ao seu lado, libertada da programação da Exocorp. Seu olhar determinado inspira a todos." :
                            "Dona Rose não está aqui. Seu sacrifício pesa no coração de todos, mas sua memória os impulsiona."
                    },
                    {
                        type: "dialogue",
                        speaker: "PENTABYTE",
                        text: "Detectei três possíveis abordagens. Cada uma tem riscos e vantagens. Escolham sabiamente."
                    },
                    {
                        type: "system",
                        text: "[DECISÃO CRÍTICA] Método de entrada define o fluxo do assalto"
                    }
                ],
                choices: [
                    {
                        id: "frontal_assault",
                        text: "🔥 Ataque Frontal em Massa",
                        desc: "Usar aliados para criar caos e infiltrar",
                        nextScene: "051"
                    },
                    {
                        id: "stealth_infiltration",
                        text: "🌑 Infiltração Silenciosa",
                        desc: "Equipe de elite, sem alarde",
                        nextScene: "052"
                    },
                    {
                        id: "teleport_jump",
                        text: "⚡ Teletransporte Direto (se obtido)",
                        desc: "Salto arriscado direto ao Subsolo 7",
                        condition: "hasTeleportation",
                        nextScene: "053"
                    }
                ]
            },

            '051': {
                title: "Combate Brutal",
                location: "Torre Exocorp - Entrada Principal",
                image: "tower_assault",
                content: [
                    {
                        type: "narrative",
                        text: "A guerra explode ao redor da Torre. As forças aliadas atacam com tudo: os Dragões de Jade com suas katanas, a Sinaloa com armamento pesado, a Trindade com magia tecnológica."
                    },
                    {
                        type: "system",
                        text: "[CAOS TOTAL NA CIDADE]"
                    },
                    {
                        type: "narrative",
                        text: "Explosões iluminam a noite. Guardas da Exocorp são forçados a se dividir entre múltiplas frentes. Vocês aproveitam a confusão para entrar pelas defesas rompidas."
                    },
                    {
                        type: "dialogue",
                        speaker: this.gameState?.characterData?.name || "VOCÊ",
                        text: "Continuem lutando! Nós vamos buscar Lia!"
                    },
                    {
                        type: "narrative",
                        text: "Vocês correm pelos corredores enquanto batalhas ecoam lá fora. A segurança interna foi redirecionada para o perímetro externo. O caminho para o Subsolo 7 está relativamente livre."
                    },
                    {
                        type: "system",
                        text: "[MÉTODO: ATAQUE FRONTAL] Baixas aliadas altas, mas infiltração facilitada"
                    }
                ],
                choices: [
                    {
                        id: "continue",
                        text: "Descer para o Subsolo 7",
                        desc: "Buscar Lia no laboratório",
                        flags: { entryMethod: 'frontal' },
                        nextScene: "054"
                    }
                ]
            },

            '052': {
                title: "Furtividade e Risco",
                location: "Torre Exocorp - Dutos de Serviço",
                image: "tower_stealth",
                content: [
                    {
                        type: "narrative",
                        text: "Vocês usam rotas de serviço e túneis de manutenção. Pentabyte hackeia câmeras em tempo real, criando pontos cegos no sistema de vigilância."
                    },
                    {
                        type: "dialogue",
                        speaker: "PENTABYTE (RÁDIO)",
                        text: "Patrulha à direita em 3... 2... 1... agora! Movam-se!"
                    },
                    {
                        type: "narrative",
                        text: "Cada passo é calculado. Cada respiração contida. A falta de caos externo significa que TODA a segurança está focada internamente. Um erro e vocês serão cercados."
                    },
                    {
                        type: "narrative",
                        text: "Mas a resistência é treinada. Vocês se movem como fantasmas, invisíveis entre as sombras. Lentamente, chegam aos elevadores que levam ao subsolo."
                    },
                    {
                        type: "system",
                        text: "[MÉTODO: INFILTRAÇÃO] Sem baixas, mas risco de detecção total"
                    }
                ],
                choices: [
                    {
                        id: "continue",
                        text: "Descer para o Subsolo 7",
                        desc: "Buscar Lia silenciosamente",
                        flags: { entryMethod: 'stealth' },
                        nextScene: "054"
                    }
                ]
            },

            '053': {
                title: "Salto de Fé",
                location: "Torre Exocorp - Materialização Quântica",
                image: "teleport",
                content: [
                    {
                        type: "narrative",
                        text: "Vocês ativam o dispositivo de teletransporte da Família Carbone. A tecnologia zumbe, partículas quânticas dançam no ar."
                    },
                    {
                        type: "dialogue",
                        speaker: this.gameState?.characterData?.name || "VOCÊ",
                        text: "Coordenadas do Subsolo 7 inseridas. 70% de chance de sucesso. Vamos nessa."
                    },
                    {
                        type: "system",
                        text: "[INICIANDO TELETRANSPORTE... CALCULANDO PROBABILIDADE...]"
                    },
                    {
                        type: "narrative",
                        text: "O mundo se dissolve em luz branca. Sensação de estar em todos os lugares e em nenhum ao mesmo tempo. E então..."
                    },
                    {
                        type: "system",
                        text: Math.random() < 0.7 ? "[SUCESSO! MATERIALIZAÇÃO NO SUBSOLO 7]" : "[FALHA PARCIAL! MATERIALIZAÇÃO EM ZONA DE RISCO]"
                    },
                    {
                        type: "narrative",
                        text: Math.random() < 0.7 ?
                            "Vocês se materializam exatamente onde planejaram: corredores do Subsolo 7, a poucos metros do Laboratório Genético Alfa. Vantagem total." :
                            "ERRO! Vocês se materializam no andar de segurança máxima, cercados por guardas ciborgues! A batalha é inevitável, mas ainda estão perto do objetivo."
                    },
                    {
                        type: "system",
                        text: "[MÉTODO: TELETRANSPORTE] Rápido mas arriscado"
                    }
                ],
                choices: [
                    {
                        id: "continue",
                        text: "Avançar para o laboratório",
                        desc: "Buscar Lia rapidamente",
                        flags: { entryMethod: 'teleport' },
                        nextScene: "054"
                    }
                ]
            },

            '054': {
                title: "Resgate e Descoberta",
                location: "Subsolo 7 - Laboratório Genético Alfa",
                image: "lab_alfa",
                content: [
                    {
                        type: "narrative",
                        text: "O Laboratório Genético Alfa é uma catedral de horror científico. Câmaras de estase se alinham nas paredes, cada uma contendo experimentos genéticos fracassados - híbridos humano-máquina deformados."
                    },
                    {
                        type: "narrative",
                        text: "E no centro, em uma câmara brilhante: Lia. A última humana natural. Ela está em estase, inconsciente, conectada a dezenas de tubos extraindo seu DNA."
                    },
                    {
                        type: "dialogue",
                        speaker: this.gameState?.characterData?.name || "VOCÊ",
                        text: "Lia! Finalmente!"
                    },
                    {
                        type: "system",
                        text: "[ALERTA DE SEGURANÇA ATIVADO]"
                    },
                    {
                        type: "narrative",
                        text: "Guardas ciborgues emergem das sombras. Drones de combate descem do teto. Vocês têm segundos para decidir: libertar Lia imediatamente (arriscado) ou neutralizar as ameaças primeiro (seguro mas lento)."
                    },
                    {
                        type: "system",
                        text: "[DECISÃO CRÍTICA] Afeta condição de Lia no resgate"
                    }
                ],
                choices: [
                    {
                        id: "rush_rescue",
                        text: "⚡ Correr e libertar Lia imediatamente",
                        desc: "Mais rápido, mais arriscado",
                        nextScene: "055"
                    },
                    {
                        id: "clear_threats",
                        text: "⚔️ Neutralizar ameaças primeiro",
                        desc: "Mais seguro para Lia",
                        nextScene: "056"
                    }
                ]
            },

            '055': {
                title: "Lia Salva",
                location: "Laboratório - Câmara de Estase",
                image: "lia_rescued",
                content: [
                    {
                        type: "narrative",
                        text: "Vocês ignoram os guardas e correm direto para a câmara. Disparos ricocheteiam ao seu redor. Você quebra o vidro com tudo que tem."
                    },
                    {
                        type: "system",
                        text: "[CÂMARA VIOLADA - PROCESSO DE ESTASE INTERROMPIDO]"
                    },
                    {
                        type: "narrative",
                        text: "Lia cai em seus braços, inconsciente mas respirando. Vocês sofrem ferimentos dos guardas, mas não há tempo para cuidar disso. A fuga começa AGORA."
                    },
                    {
                        type: "dialogue",
                        speaker: this.gameState?.characterData?.name || "VOCÊ",
                        text: "Segurem eles! Eu carrego Lia!"
                    },
                    {
                        type: "narrative",
                        text: "Vocês abrem caminho à força, Lia nos braços, correndo para os elevadores que levam ao topo da Torre. P. Di os aguarda lá."
                    },
                    {
                        type: "system",
                        text: "[LIA RESGATADA] Condição: Frágil mas viva"
                    }
                ],
                choices: [
                    {
                        id: "to_top",
                        text: "Subir para o topo da Torre",
                        desc: "Confronto final com P. Di",
                        flags: { liaRescueMethod: 'rush' },
                        nextScene: "060"
                    }
                ]
            },

            '056': {
                title: "Neutralização e Fuga",
                location: "Laboratório - Combate Tático",
                image: "lab_combat",
                content: [
                    {
                        type: "narrative",
                        text: "Vocês tomam posições táticas e enfrentam os guardas metodicamente. Cada tiro é calculado. Cada movimento coordenado."
                    },
                    {
                        type: "narrative",
                        text: "Os guardas caem um por um. Os drones são hackeados por Pentabyte e se viram contra seus próprios aliados. Em minutos, a sala está segura."
                    },
                    {
                        type: "dialogue",
                        speaker: this.gameState?.characterData?.name || "VOCÊ",
                        text: "Área limpa. Agora sim, vamos buscar Lia."
                    },
                    {
                        type: "narrative",
                        text: "Vocês abrem a câmara cuidadosamente, desconectando os tubos um por um. Lia desperta lentamente, confusa mas ilesa."
                    },
                    {
                        type: "dialogue",
                        speaker: "LIA",
                        text: "[voz fraca] Vocês... vieram me buscar? Eu achei... que ninguém viria..."
                    },
                    {
                        type: "dialogue",
                        speaker: this.gameState?.characterData?.name || "VOCÊ",
                        text: "Você é a esperança da humanidade, Lia. Claro que viríamos."
                    },
                    {
                        type: "system",
                        text: "[LIA RESGATADA] Condição: Saudável e consciente"
                    }
                ],
                choices: [
                    {
                        id: "to_top",
                        text: "Subir para o topo da Torre",
                        desc: "Confronto final com P. Di",
                        flags: { liaRescueMethod: 'safe' },
                        nextScene: "060"
                    }
                ]
            },

            '060': {
                title: "O Confronto Final: Topo da Torre",
                location: "Torre Exocorp - Suite de Controle (Último Andar)",
                image: "penthouse",
                content: [
                    {
                        type: "narrative",
                        text: "O topo da Torre é uma suite de vidro e luxo obsceno. Telas holográficas mostram a cidade em caos abaixo. E no centro, conectado a sistemas complexos, P. Di aguarda."
                    },
                    {
                        type: "dialogue",
                        speaker: "P. DI",
                        text: "[sorrindo] Então vocês chegaram. Impressionante. Realmente impressionante. Achei que morreriam no Subsolo 7."
                    },
                    {
                        type: "narrative",
                        text: this.gameState?.resources?.donaRoseLiberated ?
                            "Dona Rose avança, olhos ardendo de fúria ao ver o homem que a escravizou." :
                            "Nas sombras da suite, vocês veem Dona Rose - ainda reprogramada, seus olhos vazios observando vocês como inimigos."
                    },
                    {
                        type: "dialogue",
                        speaker: "P. DI",
                        text: "Lia está com vocês. Mas o Projeto Arquitetos já coletou o suficiente. A Nova Humanidade já está em produção. Vocês chegaram tarde demais."
                    },
                    {
                        type: "dialogue",
                        speaker: this.gameState?.characterData?.name || "VOCÊ",
                        text: "Não enquanto eu estiver respirando!"
                    },
                    {
                        type: "system",
                        text: "[DECISÃO FINAL] Combate direto ou desarmar politicamente?"
                    }
                ],
                choices: [
                    {
                        id: "attack_directly",
                        text: "⚔️ Atacar P. Di diretamente",
                        desc: "Resolver pela força",
                        nextScene: "061"
                    },
                    {
                        id: "use_truth",
                        text: "📡 Usar a verdade contra ele (se fez Guerra de Informação)",
                        desc: "Desmantelá-lo politicamente",
                        condition: "warOfInformation",
                        nextScene: "062"
                    }
                ]
            },

            '061': {
                title: "A Batalha de Vontades",
                location: "Topo da Torre - Combate",
                image: "final_battle",
                content: [
                    {
                        type: "system",
                        text: "[FASE 1: TÁTICA E FORÇA]"
                    },
                    {
                        type: "narrative",
                        text: "P. Di se levanta. Modificações cibernéticas emergem de seu corpo. Lâminas, canhões de plasma, escudos energéticos. Ele não é mais humano - é uma arma de guerra."
                    },
                    {
                        type: "narrative",
                        text: "A batalha explode. Vocês usam tudo que aprenderam, todos os aliados conquistados, todos os recursos reunidos. Cada escolha que fizeram culmina AGORA."
                    },
                    {
                        type: "system",
                        text: "[FASE 2: CONTRA-ATAQUE DIGITAL]"
                    },
                    {
                        type: "narrative",
                        text: "P. Di tenta hackear seus implantes neurais, paralisar suas mentes. Mas Pentabyte contra-ataca, travando uma guerra digital enquanto vocês lutam fisicamente."
                    },
                    {
                        type: "system",
                        text: "[FASE 3: FORMA FINAL]"
                    },
                    {
                        type: "narrative",
                        text: "Derrotado, P. Di transfere sua consciência para um corpo robótico maciço que emerge do chão. Uma forma monstruosa de aço e ódio."
                    },
                    {
                        type: "dialogue",
                        speaker: "P. DI (VOZ DISTORCIDA)",
                        text: "VOCÊS NÃO PODEM MATAR UMA IDEIA! EU SOU O FUTURO!"
                    },
                    {
                        type: "narrative",
                        text: "Com um último esforço conjunto - cada membro da resistência dando tudo de si - vocês destroem o corpo robótico. P. Di desmorona, sua consciência fragmentando-se em pedaços digitais."
                    },
                    {
                        type: "system",
                        text: "[P. DI DERROTADO]"
                    }
                ],
                choices: [
                    {
                        id: "victory",
                        text: "Contemplar a vitória",
                        desc: "A guerra acabou",
                        flags: { pDiFate: 'defeated' },
                        nextScene: "063"
                    }
                ]
            },

            '062': {
                title: "O Colapso da Mentira",
                location: "Topo da Torre - Transmissão Final",
                image: "final_broadcast",
                content: [
                    {
                        type: "narrative",
                        text: "Vocês decidem não atacar. Em vez disso, Pentabyte assume controle total dos sistemas de transmissão da Torre."
                    },
                    {
                        type: "system",
                        text: "[TRANSMISSÃO GLOBAL ATIVADA - TODA A CIDADE ASSISTINDO]"
                    },
                    {
                        type: "narrative",
                        text: "Vocês reproduzem TUDO: os testemunhos de Zhen, as evidências dos experimentos, os arquivos secretos do Projeto Arquitetos, as mortes encobertas. A verdade nua e crua."
                    },
                    {
                        type: "dialogue",
                        speaker: this.gameState?.characterData?.name || "VOCÊ",
                        text: "[para as câmeras] Este homem não é seu salvador. É seu carcereiro. Vejam o que ele fez com Lia. Com Dona Rose. Com todos nós!"
                    },
                    {
                        type: "narrative",
                        text: "O impacto é devastador. Funcionários da Exocorp começam a desertar em massa. Soldados baixam suas armas. O império de P. Di desmorona em tempo real."
                    },
                    {
                        type: "dialogue",
                        speaker: "P. DI",
                        text: "[desesperado] NÃO! Vocês não entendem! EU estava salvando a humanidade! EU..."
                    },
                    {
                        type: "narrative",
                        text: "Mas suas próprias forças o capturam. Ex-leais o arrastam para fora, gritando sobre julgamento e justiça. O tirano caiu não pela espada, mas pela verdade."
                    },
                    {
                        type: "system",
                        text: "[P. DI CAPTURADO]"
                    }
                ],
                choices: [
                    {
                        id: "decide_fate",
                        text: "Decidir o destino de P. Di",
                        desc: "Vingança ou Justiça?",
                        nextScene: "064_choice"
                    }
                ]
            },

            '064_choice': {
                title: "O Destino do Tirano",
                location: "Topo da Torre - Julgamento",
                image: "judgment",
                content: [
                    {
                        type: "narrative",
                        text: "P. Di está capturado, cercado por uma multidão furiosa que clama por sua morte. A decisão final recai sobre vocês."
                    },
                    {
                        type: "dialogue",
                        speaker: "BOBBY",
                        text: "O que fazemos com ele? Execução pública ou julgamento formal?"
                    },
                    {
                        type: "narrative",
                        text: "Lia segura sua mão. Seus olhos suplicam por misericórdia. Mas as vozes dos caídos - Dona Rose, Meiling, todos os mortos - parecem clamar por vingança."
                    },
                    {
                        type: "system",
                        text: "[ESCOLHA FINAL] Define o legado da resistência"
                    }
                ],
                choices: [
                    {
                        id: "execute",
                        text: "💀 Execução Pública",
                        desc: "Vingança pela dor causada",
                        nextScene: "064"
                    },
                    {
                        id: "trial",
                        text: "⚖️ Aprisionamento e Julgamento",
                        desc: "Justiça através da lei",
                        nextScene: "065"
                    }
                ]
            },

            '063': {
                title: "P. Di Derrotado",
                location: "Topo da Torre - Vitória",
                image: "victory",
                content: [
                    {
                        type: "narrative",
                        text: "A carcaça robótica de P. Di jaz em ruínas, fumaça subindo de seus circuitos queimados. O silêncio pesa enquanto a realidade da vitória se instala."
                    },
                    {
                        type: "dialogue",
                        speaker: "LIA",
                        text: "Acabou... realmente acabou?"
                    },
                    {
                        type: "dialogue",
                        speaker: this.gameState?.characterData?.name || "VOCÊ",
                        text: "Acabou. A guerra terminou. Você está livre, Lia."
                    },
                    {
                        type: "narrative",
                        text: "Mas a vitória tem gosto amargo. Lá fora, a cidade queima. O preço da liberdade foi alto. Agora vem a parte mais difícil: construir algo novo das cinzas."
                    },
                    {
                        type: "system",
                        text: "[A GUERRA ACABOU]"
                    }
                ],
                choices: [
                    {
                        id: "aftermath",
                        text: "Ver as consequências",
                        desc: "O futuro se revela",
                        nextScene: "066"
                    }
                ]
            },

            '064': {
                title: "A Execução",
                location: "Praça Pública",
                image: "execution",
                content: [
                    {
                        type: "narrative",
                        text: "A multidão clama por sangue. Você toma a decisão: P. Di será executado publicamente. Um exemplo para todos que tentarem escravizar a humanidade."
                    },
                    {
                        type: "narrative",
                        text: "O ato é brutal, mas satisfatório. O sangue de P. Di, misturado com óleo de suas máquinas, escorre pelos escombros do que um dia foi o Nexus."
                    },
                    {
                        type: "dialogue",
                        speaker: this.gameState?.characterData?.name || "VOCÊ",
                        text: "Que isto sirva de aviso: ninguém escravizará a humanidade novamente!"
                    },
                    {
                        type: "narrative",
                        text: "A multidão ruge em aprovação. Mas nos olhos de Lia, você vê medo. Medo não de P. Di, mas de você. Do que você se tornou."
                    },
                    {
                        type: "system",
                        text: "[P. DI EXECUTADO] Legado: Vingança"
                    }
                ],
                choices: [
                    {
                        id: "aftermath",
                        text: "Ver as consequências",
                        desc: "O futuro se revela",
                        flags: { pDiFate: 'executed' },
                        nextScene: "066"
                    }
                ]
            },

            '065': {
                title: "O Julgamento",
                location: "Tribunal Improvisado",
                image: "trial",
                content: [
                    {
                        type: "narrative",
                        text: "Você decide: P. Di será aprisionado e julgado. Não pela multidão furiosa, mas por um sistema de justiça que vocês construirão juntos."
                    },
                    {
                        type: "dialogue",
                        speaker: this.gameState?.characterData?.name || "VOCÊ",
                        text: "Ele pagará por seus crimes. Mas de forma justa, com advogados, júri, e processo. Somos melhores que ele."
                    },
                    {
                        type: "narrative",
                        text: "P. Di é levado, acorrentado mas vivo. Seu julgamento estabelece um precedente crucial: ninguém, nem mesmo o pior tirano, está acima da lei."
                    },
                    {
                        type: "dialogue",
                        speaker: "LIA",
                        text: "Obrigada... por escolher a justiça. Por mostrar que podemos ser melhores."
                    },
                    {
                        type: "system",
                        text: "[P. DI APRISIONADO] Legado: Justiça"
                    }
                ],
                choices: [
                    {
                        id: "aftermath",
                        text: "Ver as consequências",
                        desc: "O futuro se revela",
                        flags: { pDiFate: 'imprisoned' },
                        nextScene: "066"
                    }
                ]
            },

            '066': {
                title: "O Preço da Vitória",
                location: "Cidade em Transição",
                image: "aftermath",
                content: [
                    {
                        type: "system",
                        text: "[EPÍLOGO]"
                    },
                    {
                        type: "narrative",
                        text: "P. Di está acabado. A Torre Exocorp fuma, metade destruída. A cidade tenta se recuperar do trauma."
                    },
                    {
                        type: "narrative",
                        text: "Mas o futuro... o futuro é incerto. Depende de todas as escolhas que você fez ao longo desta jornada."
                    },
                    {
                        type: "system",
                        text: "[ANALISANDO ESCOLHAS...]"
                    }
                ],
                choices: [
                    {
                        id: "final_a",
                        text: "Ver Final",
                        desc: "Seu destino se revela",
                        nextScene: this.calculateFinalScene()
                    }
                ]
            },

            // ========== FINAIS DRAMÁTICOS ==========

            'final_a': {
                title: "FINAL A: O Êxodo para Novo Éden",
                location: "O Amanhecer de uma Terra Prometida",
                image: "novo_eden",
                content: [
                    {
                        type: "system",
                        text: "[FINAL A: O ÉXODO PARA NOVO ÉDEN]"
                    },
                    {
                        type: "narrative",
                        text: "A fumaça da Torre Exocorp mal assentou, mas a luta para preencher o vazio de poder já começou. Você olha para Lia, que nunca conheceu a escolha verdadeira, e decide que não pode arriscar a esperança em uma cidade corroída pela guerra."
                    },
                    {
                        type: "narrative",
                        text: "Usando as Coordenadas da Trindade da Chama, você lidera o que resta da resistência em um êxodo. A jornada é longa e perigosa, atravessando territórios devastados e montanhas traçoeiras."
                    },
                    {
                        type: "narrative",
                        text: "Mas quando vocês chegam a Novo Éden, encontram uma sociedade incipiente, construída em princípios de comunidade e autonomia. Pequena, mas livre. Genuinamente livre."
                    },
                    {
                        type: "dialogue",
                        speaker: "LIA",
                        text: "[olhando o horizonte limpo] É lindo... eu nunca vi céu tão azul. Sem neon. Sem fumaça. Só... liberdade."
                    },
                    {
                        type: "narrative",
                        text: "Você se torna o guardião silencioso de Lia, observando-a crescer com a liberdade que P. Di tentou roubar. Nova York Exocorp, a cidade de neon e aço, é deixada para trás – uma ruína gloriosa, um túmulo para a velha humanidade."
                    },
                    {
                        type: "narrative",
                        text: "Seu legado não é a vitória na guerra, mas a fundação de um mundo novo e pequeno. Uma semente de esperança plantada longe da corrupção."
                    },
                    {
                        type: "system",
                        text: "=== FIM ==="
                    }
                ],
                choices: [
                    {
                        id: "credits",
                        text: "🌟 Ver Créditos",
                        desc: "Fim da jornada",
                        action: "showCredits"
                    },
                    {
                        id: "restart",
                        text: "🔁 Jogar Novamente",
                        desc: "Explorar outros caminhos",
                        action: "restart"
                    }
                ]
            },

            'final_b': {
                title: "FINAL B: A Maldição da Anarquia",
                location: "O Fogo da Guerra Civil",
                image: "anarchy",
                content: [
                    {
                        type: "system",
                        text: "[FINAL B: A MALDIÇÃO DA ANARQUIA]"
                    },
                    {
                        type: "narrative",
                        text: "P. Di está morto, mas o custo foi alto demais. As baixas da resistência são insustentáveis, e as alianças que você tentou construir entraram em colapso."
                    },
                    {
                        type: "narrative",
                        text: "A Sinaloa luta contra os Dragões de Jade nas ruas de Chinatown. A Bratva exige seu quinhão da cidade. A Trindade da Chama proclama uma nova ordem mística. O vácuo de poder é preenchido não pela liberdade, mas pelo Caos Total."
                    },
                    {
                        type: "narrative",
                        text: "Você e os sobreviventes mal conseguem proteger Lia no meio da anarquia que explode. A luz de néon reflete no sangue nas ruas. Fogo e violência se espalham como uma doença."
                    },
                    {
                        type: "dialogue",
                        speaker: this.gameState?.characterData?.name || "VOCÊ",
                        text: "[olhando a destruição] Será que... será que P. Di estava certo? Sobre a necessidade de ordem?"
                    },
                    {
                        type: "narrative",
                        text: "A humanidade, livre de P. Di, rapidamente se prova incapaz de autogoverno. Os fortes oprimem os fracos. A justiça é substituída pela lei do mais forte."
                    },
                    {
                        type: "narrative",
                        text: "Você lamenta as decisões que levaram ao colapso final. Seu legado é uma vitória amarga sobre um corpo que apodreceu em seguida."
                    },
                    {
                        type: "system",
                        text: "=== FIM ==="
                    }
                ],
                choices: [
                    {
                        id: "credits",
                        text: "🌟 Ver Créditos",
                        desc: "Fim da jornada",
                        action: "showCredits"
                    },
                    {
                        id: "restart",
                        text: "🔁 Jogar Novamente",
                        desc: "Tentar um caminho melhor",
                        action: "restart"
                    }
                ]
            },

            'final_c': {
                title: "FINAL C: A Vingança da Sombra",
                location: "A Justiça Implacavel",
                image: "shadow_justice",
                content: [
                    {
                        type: "system",
                        text: "[FINAL C: A VINGANÇA DA SOMBRA]"
                    },
                    {
                        type: "narrative",
                        text: "Você tomou a decisão final: a execução de P. Di na frente de uma multidão sedenta por retribuição. O ato foi brutal, mas satisfatório, ecoando o grito de guerra da resistência."
                    },
                    {
                        type: "narrative",
                        text: "O sangue de P. Di, misturado com o óleo de suas máquinas, escorre pelos escombros do que um dia foi o Nexus. A multidão ruge em aprovação. Justiça foi feita."
                    },
                    {
                        type: "narrative",
                        text: "A cidade, chocada e inspirada pela sua ferocidade, entra em um período de reconstrução. Bobby e os outros líderes trabalham para construir uma democracia. Mas todos sabem a verdade."
                    },
                    {
                        type: "dialogue",
                        speaker: "BOBBY",
                        text: "[em particular] As pessoas têm medo de você agora. Respeitam, mas temem. Você se tornou... algo diferente."
                    },
                    {
                        type: "narrative",
                        text: "Você se torna a nova sombra, a força implacavel por trás do poder. Líderes trabalham para o povo, mas sua palavra é lei. A democracia funciona porque você garante que funcione."
                    },
                    {
                        type: "narrative",
                        text: "Você libertou a cidade, mas a semente da tirania, baseada em sua própria dor e raiva, foi plantada em seu coração. A luta contra P. Di te transformou no que você mais temia: uma força de controle necessária para manter a paz."
                    },
                    {
                        type: "dialogue",
                        speaker: "LIA",
                        text: "[com tristeza] Você nos salvou... mas perdeu algo no processo. Espero que um dia encontre paz."
                    },
                    {
                        type: "system",
                        text: "=== FIM ==="
                    }
                ],
                choices: [
                    {
                        id: "credits",
                        text: "🌟 Ver Créditos",
                        desc: "Fim da jornada",
                        action: "showCredits"
                    },
                    {
                        id: "restart",
                        text: "🔁 Jogar Novamente",
                        desc: "Explorar outros caminhos",
                        action: "restart"
                    }
                ]
            },

            'final_d': {
                title: "FINAL D: O Equilíbrio na Restauração",
                location: "O Alvorecer da Escolha",
                image: "restoration",
                content: [
                    {
                        type: "system",
                        text: "[FINAL D: O EQUILÍBRIO NA RESTAURAÇÃO]"
                    },
                    {
                        type: "narrative",
                        text: "A verdade exposta desmantelou o império da Exocorp. P. Di, despojado de seu poder, foi levado a julgamento, estabelecendo um precedente crucial: ninguém está acima da lei."
                    },
                    {
                        type: "narrative",
                        text: "Você e a resistência trabalham incansavelmente para reestruturar a cidade, focando em reconstruir a confiança e a infraestrutura. É um trabalho duro, lento, frustrante. Mas é justo."
                    },
                    {
                        type: "dialogue",
                        speaker: "DONA ROSE",
                        text: this.gameState?.resources?.donaRoseLiberated ?
                            "Vocês me salvaram da escravidão. Agora, juntos, salvamos a cidade da tirania. Este é apenas o começo." :
                            "[em memória] A voz de Dona Rose ecoa: 'Lutem não apenas pela vitória, mas pelo que virá depois.'"
                    },
                    {
                        type: "narrative",
                        text: "Lia, o símbolo da humanidade, é colocada sob proteção de toda a comunidade. Você se recusa a assumir o poder absoluto, garantindo que o novo governo seja plural e dedicado à Escolha."
                    },
                    {
                        type: "narrative",
                        text: "A cidade é imperfeita, com crime e caos. Mas é uma cidade que pode errar e aprender. A ordem de P. Di desapareceu, substituída pela desordem bela da liberdade."
                    },
                    {
                        type: "dialogue",
                        speaker: "LIA",
                        text: "[sorrindo] Obrigada por me dar algo que nunca tive: a chance de escolher meu próprio destino."
                    },
                    {
                        type: "narrative",
                        text: "Seu legado é o de um verdadeiro herói: aquele que, ao invés de tomar o poder, o devolveu às pessoas. A humanidade é livre para construir seu próprio futuro."
                    },
                    {
                        type: "system",
                        text: "=== FIM ==="
                    }
                ],
                choices: [
                    {
                        id: "credits",
                        text: "🌟 Ver Créditos",
                        desc: "Fim da jornada",
                        action: "showCredits"
                    },
                    {
                        id: "restart",
                        text: "🔁 Jogar Novamente",
                        desc: "Explorar outros caminhos",
                        action: "restart"
                    }
                ]
            },

            'final_ruim_a': {
                title: "FINAL RUIM A: Escravos da Ordem",
                location: "O Fim da Esperança",
                image: "bad_ending",
                content: [
                    {
                        type: "system",
                        text: "[FINAL RUIM A: ESCRAVOS DA ORDEM]"
                    },
                    {
                        type: "narrative",
                        text: "A força de P. Di era superior. Vocês são capturados, seus corpos e mentes quebrados. A resistência é esmagada completamente."
                    },
                    {
                        type: "narrative",
                        text: "P. Di, vitorioso, usa Lia para criar sua 'Nova Geração'. Híbridos humano-máquina perfeitos, leais apenas à Exocorp. A humanidade natural morre com Lia."
                    },
                    {
                        type: "dialogue",
                        speaker: "P. DI",
                        text: "Vocês lutaram bravamente. Mas a perfeição sempre vence. Agora, servirão a um propósito maior."
                    },
                    {
                        type: "narrative",
                        text: "Você é reprogramado. Suas memórias de liberdade apagadas, substituídas por lealdade absoluta. Um guerreiro da resistência transformado em um leal cão de guarda da Exocorp."
                    },
                    {
                        type: "narrative",
                        text: "Sua última memória de liberdade se torna um pesadelo distante. A cidade está em paz, uma paz fria e controlada, onde a vontade de P. Di é a única lei."
                    },
                    {
                        type: "narrative",
                        text: "A humanidade não escolheu o seu destino; ele foi imposto. A era da Escolha terminou. A era da Perfeição Forçada começou."
                    },
                    {
                        type: "system",
                        text: "=== GAME OVER ==="
                    }
                ],
                choices: [
                    {
                        id: "restart",
                        text: "🔁 Tentar Novamente",
                        desc: "A humanidade merece outra chance",
                        action: "restart"
                    }
                ]
            }
        };
    }
    
    // CALCULAR QUAL FINAL O JOGADOR RECEBE
    calculateFinalScene() {
        const state = this.gameState;
        
        // FINAL RUIM: Se não completou missões suficientes (placeholder - não implementado combate real)
        // Por enquanto sempre assume vitória
        
        // FINAL A: Éxodo para Novo Éden (tem coordenadas)
        if (state.resources.hasNovoEdenCoords) {
            return 'final_a';
        }
        
        // FINAL B: Anarquia (ataque frontal + baixas altas + poucas alianças)
        const alliesCount = Object.values(state.allies).filter(x => x).length;
        if (state.flags.entryMethod === 'frontal' && alliesCount < 2) {
            return 'final_b';
        }
        
        // FINAL C: Vingança (executou P. Di)
        if (state.flags.pDiFate === 'executed') {
            return 'final_c';
        }
        
        // FINAL D: Restauração (aprisionou P. Di ou usou informação)
        if (state.flags.pDiFate === 'imprisoned' || state.missionsCompleted.warOfInformation) {
            return 'final_d';
        }
        
        // DEFAULT: Final D (restauração)
        return 'final_d';
    }
    
    // INICIALIZAR JOGO
    init() {
        this.updateUI();
        this.loadGameIfExists();
    }
    
    // SELEÇÃO DE PERSONAGEM
    selectCharacter(charId) {
        this.gameState.selectedCharacter = charId;
        this.gameState.characterData = this.characters[charId];
        
        // Definir cena inicial como o prólogo do personagem escolhido
        this.gameState.currentScene = this.characters[charId].prologueScene;
        
        this.startGame();
    }
    
    // INICIAR JOGO
    startGame() {
        document.getElementById('title-screen').style.display = 'none';
        document.getElementById('character-select').style.display = 'none';
        document.getElementById('game-container').style.display = 'block';
        
        this.updateUI();
        this.loadScene(this.gameState.currentScene);
    }
    
    // CARREGAR CENA
    loadScene(sceneId) {
        this.gameState.currentScene = sceneId;
        this.currentSceneData = this.scenes[sceneId];
        
        if (!this.currentSceneData) {
            console.error(`Cena não encontrada: ${sceneId}`);
            return;
        }
        
        this.renderScene();
        this.updateUI();
        this.saveGame();
    }
    
    // RENDERIZAR CENA
    renderScene() {
        const sceneContainer = document.getElementById('game-scene');
        const scene = this.currentSceneData;
        
        const charName = this.gameState.characterData?.name || 'Personagem';
        const charIcon = {'nilo': '🚁', 'zhen': '🍜', 'caliope': '🎧', 'artz': '🧬'}[this.gameState.selectedCharacter] || '👤';
        
        let html = `
            <div class="scene-header">
                <h2 style="color: var(--cyan); font-family: Orbitron;">${scene.title}</h2>
                <p style="color: var(--magenta); margin-bottom: 20px;">${scene.location}</p>
                <p style="color: var(--green); font-size: 0.9em; opacity: 0.8;">Jogando como: ${charIcon} ${charName}</p>
            </div>
        `;
        
        // Renderizar conteúdo
        scene.content.forEach(item => {
            switch(item.type) {
                case 'narrative':
                    html += `<div class="narrative">${item.text}</div>`;
                    break;
                case 'dialogue':
                    // Substituir placeholder do nome do personagem
                    let speakerName = item.speaker;
                    if (speakerName.includes('VOCÊ') || speakerName === this.gameState?.characterData?.name) {
                        speakerName = this.gameState.characterData?.name || "VOCÊ";
                    }
                    html += `
                        <div class="dialogue-box">
                            <div class="speaker">${speakerName}</div>
                            <div class="dialogue-text">${item.text}</div>
                        </div>
                    `;
                    break;
                case 'system':
                    html += `<div class="system-message">${item.text}</div>`;
                    break;
            }
        });
        
        // Renderizar escolhas
        if (scene.choices && scene.choices.length > 0) {
            html += '<div class="choices-container">';
            scene.choices.forEach(choice => {
                // Verificar condições especiais
                if (choice.condition === 'atLeastTwoMissions') {
                    const completed = Object.values(this.gameState.missionsCompleted).filter(x => x).length;
                    if (completed < 2) return; // Não mostrar se não completou 2 missões
                }
                
                // Verificar se tem teletransporte
                if (choice.condition === 'hasTeleportation') {
                    if (!this.gameState.resources.hasTeleportation) return;
                }
                
                // Verificar se fez Guerra de Informação
                if (choice.condition === 'warOfInformation') {
                    if (!this.gameState.missionsCompleted.warOfInformation) return;
                }
                
                html += `
                    <div class="choice" onclick="game.makeChoice('${choice.id}')">
                        <div class="choice-title">${choice.text}</div>
                        <div class="choice-desc">${choice.desc}</div>
                    </div>
                `;
            });
            html += '</div>';
        }
        
        sceneContainer.innerHTML = html;
        sceneContainer.scrollTop = 0;
    }
    
    // FAZER ESCOLHA
    makeChoice(choiceId) {
        const scene = this.currentSceneData;
        if (!scene) return;
        
        const choice = scene.choices?.find(c => c.id === choiceId);
        if (!choice) return;
        
        // Aplicar flags de missões completadas
        if (choice.flags) {
            Object.keys(choice.flags).forEach(key => {
                if (this.gameState.missionsCompleted.hasOwnProperty(key)) {
                    this.gameState.missionsCompleted[key] = choice.flags[key];
                } else if (this.gameState.resources.hasOwnProperty(key)) {
                    this.gameState.resources[key] = choice.flags[key];
                } else if (this.gameState.flags.hasOwnProperty(key)) {
                    this.gameState.flags[key] = choice.flags[key];
                }
            });
        }
        
        // Aplicar recursos
        if (choice.resources) {
            Object.keys(choice.resources).forEach(key => {
                if (this.gameState.resources.hasOwnProperty(key)) {
                    // Se for número, incrementa. Se for boolean, substitui
                    if (typeof this.gameState.resources[key] === 'number') {
                        this.gameState.resources[key] += choice.resources[key];
                    } else {
                        this.gameState.resources[key] = choice.resources[key];
                    }
                }
            });
        }
        
        // Aplicar aliados
        if (choice.allies) {
            Object.keys(choice.allies).forEach(key => {
                if (this.gameState.allies.hasOwnProperty(key)) {
                    this.gameState.allies[key] = choice.allies[key];
                }
            });
        }
        
        // Ações especiais
        if (choice.action) {
            this.executeAction(choice.action);
            return;
        }
        
        // Carregar próxima cena
        if (choice.nextScene) {
            setTimeout(() => {
                this.loadScene(choice.nextScene);
                this.updateUI();
            }, 300);
        }
    }
    
    // EXECUTAR AÇÕES ESPECIAIS
    executeAction(action) {
        switch(action) {
            case 'restart':
                this.restartGame();
                break;
            case 'showCredits':
                showCredits();
                break;
        }
    }
    
    // ATUALIZAR INTERFACE
    updateUI() {
        const charName = document.getElementById('char-name');
        if (charName && this.gameState.characterData) {
            charName.textContent = this.gameState.characterData.name;
        }
        
        const missionName = document.getElementById('mission-name');
        if (missionName && this.currentSceneData) {
            missionName.textContent = this.currentSceneData.title;
        }
    }
    
    // SALVAR JOGO
    saveGame() {
        try {
            localStorage.setItem('ecosHumanidade_save', JSON.stringify(this.gameState));
            const continueBtn = document.getElementById('continue-btn');
            if (continueBtn) continueBtn.disabled = false;
        } catch (e) {
            console.error('Erro ao salvar:', e);
        }
    }
    
    // CARREGAR JOGO
    loadGame() {
        try {
            const saved = localStorage.getItem('ecosHumanidade_save');
            if (saved) {
                this.gameState = JSON.parse(saved);
                this.gameState.characterData = this.characters[this.gameState.selectedCharacter];
                this.startGame();
                this.loadScene(this.gameState.currentScene);
            }
        } catch (e) {
            console.error('Erro ao carregar:', e);
        }
    }
    
    // VERIFICAR SE EXISTE SAVE
    loadGameIfExists() {
        const saved = localStorage.getItem('ecosHumanidade_save');
        const continueBtn = document.getElementById('continue-btn');
        if (continueBtn) continueBtn.disabled = !saved;
    }
    
    // REINICIAR JOGO
    restartGame() {
        localStorage.removeItem('ecosHumanidade_save');
        location.reload();
    }
}

// FUNÇÕES GLOBAIS
function showCharacterSelect() {
    document.getElementById('title-screen').style.display = 'none';
    document.getElementById('character-select').style.display = 'block';
}

function selectCharacter(charId) {
    game.selectCharacter(charId);
}

function loadGame() {
    game.loadGame();
}

function saveGame() {
    game.saveGame();
    alert('Jogo salvo com sucesso!');
}

function showMenu() {
    if (confirm('Voltar ao menu principal? (Progresso será salvo)')) {
        game.saveGame();
        location.reload();
    }
}

function showCredits() {
    alert(`ECOS DA HUMANIDADE
NEXUS: O ÚLTIMO AMANHECER

Baseado na história de RPG Ecos da Humanidade
Criado por: Você

Livro-jogo narrativo interativo
Versão: COMPLETA - Prólogos + 3 Atos + 5 Finais

📖 ATO I: A Queda do Refúgio
⚔️ ATO II: Missões de Preparo
🏰 ATO III: O Assalto à Torre

🌟 FINAIS (5 diferentes):
  • Final A: Êxodo para Novo Éden
  • Final B: Maldição da Anarquia
  • Final C: Vingança da Sombra
  • Final D: Equilíbrio na Restauração
  • Final Ruim: Escravos da Ordem

👥 Personagens: Nilo, Zhen Liu, Calíope, Artz

Obrigado por jogar esta jornada épica!
Suas escolhas moldaram o destino da humanidade.

❤️ Feito com paixão para você ❤️`);
}

// INICIALIZAR
let game;
document.addEventListener('DOMContentLoaded', () => {
    game = new GameEngine();
    game.init();
});