// NOVA YORK EXOCORP: O DESPERTAR - MOTOR DO JOGO
// Sistema completo de RPG narrativo cyberpunk

class GameEngine {
    constructor() {
        this.gameState = {
            // Personagem
            selectedCharacter: null,
            characterData: {},
            
            // Progressão
            currentScene: 'intro',
            act: 1,
            mission: 1,
            
            // Stats
            morality: 50, // 0 = Humano, 100 = Pragmático
            hp: 100,
            maxHp: 100,
            
            // Reputação com Facções (-100 a +100)
            reputation: {
                nexus: 50,      // Resistência
                sinaloa: 0,     // Javier
                dragons: 0,     // Dragões de Jade
                trindade: 0,    // Trindade da Chama
                carbone: 0,     // Família Carbone
                exocorp: -100   // Sempre inimigo
            },
            
            // Flags de História
            flags: {
                nexusExplored: false,
                hongLinFate: null, // 'dragons', 'sinaloa', 'killed', 'escaped'
                denaroBetrayed: false,
                nyxRescued: false,
                trindadeAlliance: false,
                zhenInterviewed: false,
                saltoQuanticoObtained: false,
                bobbyCaptured: false,
                liaLocation: null
            },
            
            // Inventário
            inventory: [],
            
            // Objetivos
            objectives: []
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
                age: 28,
                description: "Entregador revolucionário que usa drones para contrabando e resistência.",
                portrait: "assets/nilo.png",
                abilities: [
                    { name: "Enxame Vespa", desc: "Controle tático de múltiplos drones", type: "combat" },
                    { name: "Olhos da Colmeia", desc: "Visão panorâmica 360°", type: "reconnaissance" },
                    { name: "Grito de Revolta", desc: "Inspira aliados próximos", type: "support" }
                ],
                stats: { combat: 70, tech: 85, social: 60, stealth: 75 },
                backstory: "Cresceu na periferia opressiva de Nova York Exocorp. Pilota drones com precisão letal.",
                quotes: [
                    "O salário mínimo é a nova corrente.",
                    "Para mim, os chefes não passam de engrenagens em um sistema que esmaga trabalhadores.",
                    "A revolução é a única entrega que preciso fazer."
                ]
            },
            
            zhen: {
                name: "ZHEN LIU", 
                role: "Cozinheiro de Rua",
                age: 33,
                description: "Artista culinário performático que transformou utensílios em armas de guerra.",
                portrait: "assets/zhen.png",
                abilities: [
                    { name: "Sindicato-Martelo", desc: "Ondas de choque devastadoras", type: "combat" },
                    { name: "Sindicato-Foice", desc: "Cortes letais em arco", type: "combat" },
                    { name: "Buffs Culinários", desc: "Cria melhoramentos temporários", type: "support" }
                ],
                stats: { combat: 90, tech: 40, social: 75, stealth: 55 },
                backstory: "Testemunha da morte brutal de Meiling. Sua barraca foi queimada em represália.",
                quotes: [
                    "Cozinhar é arte, lutar é necessidade.",
                    "Cada prato conta uma história. Cada golpe cobra uma injustiça.",
                    "A Chinatown precisa de mim."
                ]
            },
            
            caliope: {
                name: "CALÍOPE / ORPHEUS",
                role: "DJ Neuropisíquica",
                age: 35,
                description: "Revolucionária comunista que usa música e hacking para combater opressão.",
                portrait: "assets/caliope.png",
                abilities: [
                    { name: "Overdrive Surge", desc: "Sobrecarrega dispositivos eletrônicos", type: "tech" },
                    { name: "Batida Neural", desc: "Manipula mentes através da música", type: "social" },
                    { name: "Víbora de Neon", desc: "Assassinato furtivo letal", type: "stealth" }
                ],
                stats: { combat: 65, tech: 95, social: 80, stealth: 85 },
                backstory: "Família assassinada por corporações aos 9 anos. Sobreviveu nas ruas, tornou-se símbolo da revolução.",
                quotes: [
                    "A música é minha arma, a revolução é minha causa.",
                    "Nas sombras, eu sou a chama que arde pela liberdade.",
                    "Cada batida é um grito por justiça."
                ]
            },
            
            artz: {
                name: "ARTZ GEDERWÜNGEN",
                role: "Cientista Übermensch",
                age: 80,
                description: "Médico alemão rejuvenescido que alcançou a perfeição humana através da ciência.",
                portrait: "assets/artz.png",  
                abilities: [
                    { name: "Stinger-Ignis", desc: "Gel corrosivo que derrete metais", type: "combat" },
                    { name: "Stinger-Static", desc: "EMP orgânico para eletrônicos", type: "tech" },
                    { name: "Stinger-Phantasm", desc: "Neurotoxina alucinógena", type: "stealth" }
                ],
                stats: { combat: 80, tech: 90, social: 50, stealth: 70 },
                backstory: "Experimentos o transformaram no Übermensch. Super-força, super-sentidos, genialidade química.",
                quotes: [
                    "Finalmente encontrei o Übermensch!",
                    "A ciência não tem limites morais, apenas possibilidades.",
                    "Perfection through chemistry."
                ]
            }
        };
    }
    
    // TODAS AS CENAS DO ATO 1
    initializeScenes() {
        return {
            // PRÓLOGO
            intro: {
                title: "Ato 1 - Cinzas e Sangue",
                mission: "Prólogo",
                location: "Nexus - Ruínas",
                background: "destroyed_nexus",
                content: [
                    {
                        type: "narrative",
                        text: "A chuva ácida cai sobre os escombros do que um dia foi o Nexus. Fumaça tóxica se ergue dos edifícios colapsados. Corpos de amigos jazem entre os destroços."
                    },
                    {
                        type: "narrative", 
                        text: "Quinze dias atrás, este era um refúgio onde a esperança florescia. Agora é um túmulo de sonhos despedaçados."
                    },
                    {
                        type: "system",
                        text: "[SISTEMA] Bem-vindo ao mundo de Nova York Exocorp. Suas escolhas moldarão o destino da humanidade."
                    }
                ],
                choices: [
                    {
                        id: "explore_nexus",
                        text: "Explorar as ruínas em busca de sobreviventes",
                        desc: "Procurar por aliados nos escombros",
                        type: "human",
                        morality: -5,
                        nextScene: "nexus_ruins"
                    },
                    {
                        id: "secure_area",
                        text: "Proteger o perímetro antes de qualquer coisa",
                        desc: "Garantir segurança tática primeiro",
                        type: "pragmatic", 
                        morality: 5,
                        nextScene: "nexus_ruins"
                    }
                ]
            },
            
            // MISSÃO 1: RUÍNAS DO NEXUS
            nexus_ruins: {
                title: "Missão 1: Ruínas do Nexus",
                mission: "Investigação",
                location: "Nexus - Subsolo",
                background: "nexus_underground",
                content: [
                    {
                        type: "narrative",
                        text: "Vocês encontram Pentabyte ferido, mas vivo, em um bunker escondido. Suas telas ainda funcionam, mostrando dados da invasão."
                    },
                    {
                        type: "dialogue",
                        speaker: "PENTABYTE",
                        text: "Conseguiram! Pensei que... que todos estavam mortos. A Exocorp atacou com tudo. Drones, soldados ciborgues, até... até viram Dona Rose caindo."
                    },
                    {
                        type: "dialogue", 
                        speaker: "PENTABYTE",
                        text: "Mas há algo mais importante. Antes de morrer, ela conseguiu gravar uma mensagem de Lia. Ela está viva... mas não por muito tempo."
                    },
                    {
                        type: "system",
                        text: "[ARQUIVO DE ÁUDIO ENCONTRADO] 'Lia_final_message.wav'"
                    }
                ],
                choices: [
                    {
                        id: "play_audio",
                        text: "Reproduzir a mensagem de Lia imediatamente",
                        desc: "Ouvir as palavras finais da última humana natural",
                        type: "neutral",
                        nextScene: "lia_message"
                    },
                    {
                        id: "question_pentabyte",
                        text: "Interrogar Pentabyte sobre o ataque primeiro",
                        desc: "Obter informações táticas sobre o inimigo",
                        type: "pragmatic",
                        morality: 3,
                        nextScene: "pentabyte_debrief"
                    }
                ]
            },
            
            lia_message: {
                title: "Mensagem de Lia",
                mission: "Revelação",
                location: "Nexus - Bunker de Comunicações", 
                background: "communication_bunker",
                content: [
                    {
                        type: "system",
                        text: "[REPRODUZINDO ÁUDIO] Último sinal conhecido de Lia..."
                    },
                    {
                        type: "dialogue",
                        speaker: "LIA (ÁUDIO)",
                        text: "[voz tremula, sussurros] Se... se alguém estiver ouvindo isso... eu estou em algum lugar alto. Muito alto. Vejo toda a cidade através do vidro."
                    },
                    {
                        type: "dialogue",
                        speaker: "LIA (ÁUDIO)", 
                        text: "Há um homem... ele não é humano. Os olhos dele... brilham como telas. Ele fala sobre 'Projeto H'. Sobre... sobre me usar para criar um novo mundo."
                    },
                    {
                        type: "dialogue",
                        speaker: "LIA (ÁUDIO)",
                        text: "[som de passos se aproximando] Eles estão vindo. Por favor... não deixem ele ganhar. A humanidade... a humanidade de verdade... precisa... [SINAL PERDIDO]"
                    },
                    {
                        type: "system",
                        text: "[OBJETIVO ADICIONADO] Localizar e resgatar Lia"
                    }
                ],
                choices: [
                    {
                        id: "analyze_audio",
                        text: "Usar habilidades técnicas para analisar o áudio",
                        desc: "Tentar extrair pistas da gravação",
                        type: "neutral",
                        requiresChar: ["caliope", "artz"],
                        nextScene: "audio_analysis"
                    },
                    {
                        id: "comfort_team",
                        text: "Confortar a equipe após ouvir a mensagem",
                        desc: "Manter o moral alto diante da tragédia",
                        type: "human",
                        morality: -5,
                        nextScene: "team_bonding"
                    },
                    {
                        id: "plan_immediately",
                        text: "Começar planejamento de resgate imediatamente",
                        desc: "Focar na missão sem perder tempo",
                        type: "pragmatic",
                        morality: 5,
                        nextScene: "rescue_planning"
                    }
                ]
            },
            
            // MISSÃO 2: HOSPITAL DE HONG LIN
            hospital_infiltration: {
                title: "Missão 2: Hospital ExoHealth",
                mission: "Infiltração",
                location: "Hospital ExoHealth - Entrada",
                background: "exohealth_hospital",
                content: [
                    {
                        type: "narrative",
                        text: "O Hospital ExoHealth se ergue como uma torre de vidro e aço, brilhando com luzes azuis artificiais. Guardas da Exocorp patrulham a entrada."
                    },
                    {
                        type: "dialogue",
                        speaker: "PENTABYTE (RÁDIO)",
                        text: "Hong Lin está no 15º andar, ala de trauma. Mas cuidado - interceptei comunicações da Sinaloa E dos Dragões de Jade convergindo para lá."
                    },
                    {
                        type: "narrative",
                        text: "Três abordagens são possíveis: furtividade pelos dutos de ventilação, hackear o sistema de segurança, ou criar uma distração frontal."
                    },
                    {
                        type: "system",
                        text: "[ESCOLHA TÁTICA] Sua abordagem determinará as opções disponíveis na infiltração"
                    }  
                ],
                choices: [
                    {
                        id: "stealth_approach",
                        text: "[FURTIVIDADE] Infiltrar pelos dutos de ventilação",
                        desc: "Evitar confronto direto, mas arriscado se descoberto",
                        type: "neutral",
                        nextScene: "hospital_stealth"
                    },
                    {
                        id: "drone_recon",
                        text: "🚁 [NILO EXCLUSIVO] Enviar drones de reconhecimento",
                        desc: "Mapear todo o hospital com enxame vespa antes de entrar",
                        type: "neutral",
                        requiresChar: ["nilo"],
                        nextScene: "hospital_hack"
                    },
                    {
                        id: "hack_approach", 
                        text: "🎧 [CALÍOPE EXCLUSIVO] Hack remoto avançado",
                        desc: "Invadir sistemas à distância com habilidades de hacker",
                        type: "neutral",
                        requiresChar: ["caliope"],
                        nextScene: "hospital_hack"
                    },
                    {
                        id: "bio_analysis",
                        text: "🧬 [ARTZ EXCLUSIVO] Análise biológica do prédio",
                        desc: "Identificar pontos fracos na estrutura e segurança biológica",
                        type: "neutral",
                        requiresChar: ["artz"],
                        nextScene: "hospital_hack"
                    },
                    {
                        id: "frontal_approach",
                        text: "🍜 [ZHEN EXCLUSIVO] Invasão frontal com Sindicato-Martelo",
                        desc: "Entrar pela frente com força bruta e habilidades de combate",
                        type: "pragmatic",
                        morality: 8,
                        requiresChar: ["zhen"],
                        nextScene: "hospital_combat"
                    }
                ]
            },
            
            hong_lin_confrontation: {
                title: "Hong Lin",
                mission: "Confronto",
                location: "Hospital - Quarto 1547",
                background: "hospital_room",
                content: [
                    {
                        type: "narrative",
                        text: "Hong Lin está inconsciente em uma cama hospitalar, conectado a máquinas de suporte vital. Tubos e fios saem de seu corpo machucado."
                    },
                    {
                        type: "narrative",
                        text: "Suddenly, a porta se abre. Quiong Li, filho de Meilin Fang, entra empunhando uma katana cibernética. Seus olhos ardem de vingança."
                    },
                    {
                        type: "dialogue",
                        speaker: "QUIONG LI",
                        text: "Então vocês também vieram por ele... Este verme assassinou minha mãe. Meilin Fang morreu por causa deste parasita!"
                    },
                    {
                        type: "dialogue",
                        speaker: "QUIONG LI",
                        text: "Os Dragões de Jade exigem justiça. Mas se vocês me entregarem Hong Lin, posso oferecer uma aliança contra a Exocorp."
                    },
                    {
                        type: "system",
                        text: "[MOMENTO CRÍTICO] Sua decisão afetará permanentemente as relações com as facções"
                    }
                ],
                choices: [
                    {
                        id: "give_to_dragons",
                        text: "Entregar Hong Lin para os Dragões de Jade",
                        desc: "Ganhar aliança forte, mas pode enfurecer a Sinaloa",
                        type: "human",
                        morality: -10,
                        reputation: { dragons: 30, sinaloa: -20 },
                        flags: { hongLinFate: "dragons" },
                        nextScene: "dragons_alliance"
                    },
                    {
                        id: "negotiate_sinaloa",
                        text: "Propor entregar Hong Lin para Javier (Sinaloa)",
                        desc: "Tentar equilibrar as facções",
                        type: "pragmatic",
                        morality: 5,
                        nextScene: "sinaloa_negotiation"
                    },
                    {
                        id: "kill_hong_lin",
                        text: "Executar Hong Lin pessoalmente",
                        desc: "Fazer justiça com as próprias mãos",
                        type: "pragmatic",
                        morality: 15,
                        reputation: { dragons: 10, sinaloa: 10 },
                        flags: { hongLinFate: "killed" },
                        nextScene: "hong_lin_execution"
                    },
                    {
                        id: "protect_hong_lin",
                        text: "Proteger Hong Lin de Quiong",
                        desc: "Impedir vingança, possivelmente obter informações",
                        type: "human",
                        morality: -15,
                        reputation: { dragons: -30 },
                        nextScene: "hong_lin_protected"
                    }
                ]
            },
            
            // MISSÃO 3: BARCO CASSINO
            casino_boat: {
                title: "Missão 3: Barco Cassino",
                mission: "Infiltração Social",
                location: "Cassino Flutuante 'Fortuna'",
                background: "casino_boat",
                content: [
                    {
                        type: "narrative",
                        text: "O Barco Cassino 'Fortuna' flutua majestosamente no East River. Luzes neon refletem na água poluída enquanto elites corporativas jogam fortunas."
                    },
                    {
                        type: "dialogue",
                        speaker: "NYX (RÁDIO)",
                        text: "[voz desesperada] Vocês chegaram! Denaro... ele nos traiu. Tem Ramona como refém e exige o Salto Quântico em troca da vida dela."
                    },
                    {
                        type: "dialogue",
                        speaker: "NYX (RÁDIO)",
                        text: "Estou no cassino me passando por hacker freelancer. Denaro está no salão VIP do segundo andar. Ele... ele tem guardas da Exocorp com ele."
                    },
                    {
                        type: "system",
                        text: "[EMBOSCADA DETECTADA] Esta é uma armadilha de Denaro para acabar com a resistência"
                    }
                ],
                choices: [
                    {
                        id: "disguise_entry",
                        text: "🎧 [CALÍOPE EXCLUSIVO] Manipular mentes com música",
                        desc: "Usar batida neural para confundir guardas e infiltrar",
                        type: "neutral",
                        requiresChar: ["caliope"],
                        nextScene: "casino_disguise"
                    },
                    {
                        id: "drone_surveillance",
                        text: "🚁 [NILO EXCLUSIVO] Vigiar com enxame de drones",
                        desc: "Mapear o cassino inteiro e localizar Denaro com precisão",
                        type: "neutral",
                        requiresChar: ["nilo"],
                        nextScene: "casino_disguise"
                    },
                    {
                        id: "direct_confrontation",
                        text: "🍜 [ZHEN EXCLUSIVO] Confronto direto com Sindicato-Foice", 
                        desc: "Usar força bruta e habilidades de combate",
                        type: "pragmatic",
                        morality: 5,
                        requiresChar: ["zhen"],
                        nextScene: "denaro_confrontation"
                    },
                    {
                        id: "chemical_analysis",
                        text: "🧬 [ARTZ EXCLUSIVO] Análise química do ambiente",
                        desc: "Criar gases ou compostos para neutralizar guardas",
                        type: "pragmatic",
                        morality: 3,
                        requiresChar: ["artz"],
                        nextScene: "casino_disguise"
                    },
                    {
                        id: "rescue_ramona_first",
                        text: "Localizar e resgatar Ramona antes de enfrentar Denaro",
                        desc: "Priorizar a vida de inocentes",
                        type: "human",
                        morality: -8,
                        nextScene: "ramona_rescue"
                    }
                ]
            },
            
            denaro_betrayal: {
                title: "A Traição de Denaro",
                mission: "Confronto Final",
                location: "Cassino - Salão VIP",
                background: "casino_vip",
                content: [
                    {
                        type: "narrative",
                        text: "Denaro está sentado confortavelmente em uma poltrona de couro, um sorriso sarcástico no rosto. Ao redor dele, mercenários da Exocorp com armas apontadas."
                    },
                    {
                        type: "dialogue",
                        speaker: "DENARO 'ECO'",
                        text: "Ah, finalmente! Os heroizinhos da resistência chegaram. Vocês realmente acham que podem vencer a Exocorp com coragem? Hah, mais ingênuos do que eu pensava."
                    },
                    {
                        type: "dialogue",
                        speaker: "DENARO 'ECO'",
                        text: "P. Di me ofereceu algo que vocês nunca poderiam: poder real, posição, um futuro garantido. E tudo que preciso fazer é entregar vocês e esse brinquedinho..."
                    },
                    {
                        type: "narrative",
                        text: "Ele aponta para o Salto Quântico no cinto de um dos personagens."
                    },
                    {
                        type: "dialogue",
                        speaker: "DENARO 'ECO'",
                        text: "Se eu não estivesse aqui, essa resistência já teria se desfeito! Vocês deveriam me agradecer por acabar com esse sofrimento inútil."
                    }
                ],
                choices: [
                    {
                        id: "negotiate_denaro",
                        text: "Tentar negociar com Denaro",
                        desc: "Apelar para o lado humano do traidor",
                        type: "human",
                        morality: -5,
                        nextScene: "denaro_negotiation"
                    },
                    {
                        id: "attack_denaro",
                        text: "Atacar Denaro e os mercenários",
                        desc: "Resolver pela força",
                        type: "pragmatic",
                        morality: 10,
                        nextScene: "casino_combat"
                    },
                    {
                        id: "use_ability",
                        text: "Usar habilidade especial do personagem",
                        desc: "Estratégia única baseada no personagem escolhido",
                        type: "neutral",
                        nextScene: "character_special"
                    }
                ]
            },
            
            // MISSÃO 4: FÁBRICA DA TRINDADE
            trinity_factory: {
                title: "Missão 4: Templo da Trindade",
                mission: "Ritual de Aliança",
                location: "Fábrica Abandonada - Templo Oculto",
                background: "trinity_temple",
                content: [
                    {
                        type: "narrative", 
                        text: "A fábrica abandonada esconde um segredo: nas profundezas, a Trindade da Chama criou um templo místico. Velas flutuam no ar, símbolos brilham nas paredes."
                    },
                    {
                        type: "dialogue",
                        speaker: "SACERDOTE DA TRINDADE",
                        text: "Bem-vindos, guerreiros da resistência. Sabemos por que vieram. A aliança que buscam não pode ser concedida com simples palavras."
                    },
                    {
                        type: "dialogue",
                        speaker: "SACERDOTE DA TRINDADE",
                        text: "A Trindade da Chama exige prova de caráter. Vocês devem passar pelos Três Testes: Fogo (Coragem), Água (Sabedoria) e Espírito (Sacrifício)."
                    },
                    {
                        type: "system",
                        text: "[RITUAL INICIADO] Cada teste revelará diferentes aspectos da personalidade"
                    }
                ],
                choices: [
                    {
                        id: "accept_trials",
                        text: "Aceitar os Três Testes da Trindade",
                        desc: "Submeter-se ao ritual místico",
                        type: "neutral",
                        nextScene: "trinity_trial_fire"
                    },
                    {
                        id: "demand_alliance",
                        text: "Exigir aliança baseada na situação crítica",
                        desc: "Usar pragmatismo ao invés de rituais",
                        type: "pragmatic",
                        morality: 8,
                        nextScene: "trinity_negotiation"
                    },
                    {
                        id: "question_ritual",
                        text: "Questionar a necessidade dos testes",
                        desc: "Usar lógica para evitar rituais perigosos",
                        type: "pragmatic",
                        morality: 3,
                        nextScene: "trinity_questions"
                    }
                ]
            },
            
            trinity_trial_fire: {
                title: "Teste do Fogo",
                mission: "Prova de Coragem",
                location: "Câmara do Fogo Sagrado",
                background: "fire_chamber",
                content: [
                    {
                        type: "narrative",
                        text: "Uma parede de chamas místicas bloqueia o caminho. As chamas não queimam o corpo, mas testam a alma. Para passar, deve enfrentar seu maior medo."
                    },
                    {
                        type: "system",
                        text: "[TESTE PSÍQUICO] As chamas mostrarão visões baseadas no passado do personagem"
                    }
                ],
                choices: [
                    {
                        id: "face_fear_bravely",
                        text: "Enfrentar o medo de frente",
                        desc: "Mostrar coragem verdadeira",
                        type: "human",
                        morality: -5,
                        nextScene: "trinity_trial_water"
                    },
                    {
                        id: "analyze_illusion",
                        text: "Analisar a ilusão logicamente",
                        desc: "Usar intelecto para superar o teste",
                        type: "pragmatic",
                        morality: 3,
                        nextScene: "trinity_trial_water"
                    }
                ]
            },
            
            // FINAL DO ATO 1
            act1_finale: {
                title: "Final do Ato 1",
                mission: "Revelação",
                location: "Blitz News - Estúdio Principal",
                background: "blitz_studio",
                content: [
                    {
                        type: "narrative",
                        text: "Todas as telas da cidade se acendem simultaneamente. É o Blitz News, mas algo está diferente. Blitz parece nervoso, suando."
                    },
                    {
                        type: "dialogue",
                        speaker: "BLITZ",
                        text: "Boa noite, Nova York Exocorp. Esta noite... teremos uma transmissão especial. Um convidado que vai mudar tudo que vocês sabem sobre nossa cidade."
                    },
                    {
                        type: "narrative",
                        text: "As luzes se intensificam. P. Di surge, caminhando calmamente. Sua presença é opressiva, quase sobrenatural."
                    },
                    {
                        type: "dialogue", 
                        speaker: "P. DI",
                        text: "Meus caros cidadãos. Venho aqui para esclarecer as mentiras espalhadas pelos terroristas. Vejam o que a 'resistência' realmente representa."
                    },
                    {
                        type: "narrative",
                        text: "Uma porta lateral se abre. Uma figura emerge: é Dona Rose, mas seus olhos estão vazios, seus movimentos mecânicos como uma marionete."
                    },
                    {
                        type: "dialogue",
                        speaker: "P. DI",
                        text: "Dona Rose está viva, recuperando-se sob nossos cuidados. A Exocorp não destrói vidas - nós as preservamos, as melhoramos, as perfeiçoamos."
                    },
                    {
                        type: "system",
                        text: "[ESTADO DE SÍTIO DECLARADO] Todos os membros da resistência são agora procurados VIVOS OU MORTOS"
                    }
                ],
                choices: [
                    {
                        id: "continue_to_act2",
                        text: "Continuar para o Ato 2",
                        desc: "A guerra verdadeira apenas começou...",
                        type: "neutral",
                        nextScene: "act2_preview"
                    }
                ]
            },
            
            act2_preview: {
                title: "Ato 2: Guerra nas Sombras",
                mission: "Preview",
                location: "Em Desenvolvimento",
                background: "coming_soon",
                content: [
                    {
                        type: "system",
                        text: "=== OBRIGADO POR JOGAR O ATO 1 ==="
                    },
                    {
                        type: "narrative",
                        text: "O Ato 1 termina aqui, mas sua jornada em Nova York Exocorp está apenas começando."
                    },
                    {
                        type: "system",
                        text: "SUAS ESCOLHAS FORAM REGISTRADAS:"
                    },
                    {
                        type: "system",
                        text: `• Moralidade: ${this.gameState.morality > 50 ? 'PRAGMÁTICO' : 'HUMANO'}`
                    },
                    {
                        type: "system",
                        text: "• Reputações com facções serão carregadas no Ato 2"
                    },
                    {
                        type: "system",
                        text: "• Consequências de suas decisões afetarão a história futura"
                    },
                    {
                        type: "narrative",
                        text: "O Ato 2 incluirá: Interceptação do Salto Quântico, infiltração na Kurogane, confronto com Neia Campos, e a entrevista de Zhen na Blitz News."
                    }
                ],
                choices: [
                    {
                        id: "restart_game",
                        text: "Jogar novamente com escolhas diferentes",
                        desc: "Explorar outros caminhos narrativos",
                        type: "neutral",
                        action: "restart"
                    },
                    {
                        id: "view_stats",
                        text: "Ver estatísticas finais",
                        desc: "Analisar o impacto de suas decisões",
                        type: "neutral",
                        action: "showStats"
                    }
                ]
            },
            
            pentabyte_debrief: { title: "Debrief com Pentabyte", mission: "Investigação", location: "Nexus - Subsolo", content: [{ type: "dialogue", speaker: "PENTABYTE", text: "Eles atacaram com tudo. Eram drones militares de última geração e soldados ciborgues." }], choices: [{ id: "hear_lia", text: "Agora ouvir a mensagem de Lia", desc: "Focar no resgate", nextScene: "lia_message" }]},
            audio_analysis: { title: "Análise do Áudio", mission: "Investigação", location: "Nexus - Sala de Análises", content: [{ type: "system", text: "[ANALISANDO ÁUDIO...] Local provável: Arranha-céu corporativo, andar alto." }], choices: [{ id: "plan", text: "Planejar o resgate", desc: "Organizar a operação", nextScene: "rescue_planning" }]},
            team_bonding: { title: "Momento de União", mission: "Desenvolvimento", location: "Nexus - Área de Descanso", content: [{ type: "narrative", text: "A equipe compartilha histórias e fortalece seus laços antes da missão." }], choices: [{ id: "continue", text: "Continuar", desc: "Preparar para missão", nextScene: "rescue_planning" }]},
            rescue_planning: { title: "Planejamento do Resgate", mission: "Preparação", location: "Nexus - Sala de Operações", content: [{ type: "system", text: "[OBJETIVO ATUALIZADO] Infiltrar Hospital de Hong Lin" }], choices: [{ id: "start_mission", text: "Iniciar missão", desc: "Ir para o hospital", nextScene: "hospital_infiltration" }]},
            hospital_stealth: { title: "Infiltração Silenciosa", mission: "Missão: Hospital", location: "Hospital - Corredor", content: [{ type: "narrative", text: "Você se move silenciosamente pelos corredores estéreis." }], choices: [{ id: "find_hong", text: "Localizar Hong Lin", desc: "Buscar o alvo", nextScene: "hong_lin_confrontation" }]},
            hospital_hack: { title: "Hackear Sistemas", mission: "Missão: Hospital", location: "Hospital - Sala de Controle", content: [{ type: "narrative", text: "Você invade os sistemas de segurança do hospital." }, { type: "system", text: "[ACESSO CONCEDIDO] Informações sobre Lia obtidas." }], choices: [{ id: "confront", text: "Confrontar Hong Lin", desc: "Enfrentar o chefe", nextScene: "hong_lin_confrontation" }]},
            hospital_combat: { title: "Confronto Direto", mission: "Missão: Hospital", location: "Hospital - Entrada Principal", content: [{ type: "narrative", text: "Você entra com força total, enfrentando guardas." }], choices: [{ id: "reach_hong", text: "Avançar até Hong Lin", desc: "Lutar até o chefe", nextScene: "hong_lin_confrontation" }]},
            dragons_alliance: { title: "Aliança com Dragões", mission: "Consequência", location: "Chinatown", content: [{ type: "dialogue", speaker: "DRAGÕES DE JADE", text: "Hong Lin é nosso agora. Considerem isso uma dívida de honra." }, { type: "system", text: "[REPUTAÇÃO] Dragões de Jade +30" }], choices: [{ id: "next", text: "Continuar", desc: "Próxima missão", nextScene: "casino_boat" }]},
            sinaloa_negotiation: { title: "Negociação com Sinaloa", mission: "Consequência", location: "Território Sinaloa", content: [{ type: "dialogue", speaker: "JAVIER", text: "Vocês nos entregaram um presente valioso. Somos aliados agora." }, { type: "system", text: "[REPUTAÇÃO] Sinaloa +30" }], choices: [{ id: "next", text: "Continuar", desc: "Próxima missão", nextScene: "casino_boat" }]},
            hong_lin_execution: { title: "Execução", mission: "Consequência", location: "Hospital", content: [{ type: "narrative", text: "Você elimina Hong Lin friamente. Justiça instantânea." }, { type: "system", text: "[MORALIDADE] Pragmático +10" }], choices: [{ id: "next", text: "Continuar", desc: "Próxima missão", nextScene: "casino_boat" }]},
            hong_lin_protected: { title: "Proteção", mission: "Consequência", location: "Hospital", content: [{ type: "narrative", text: "Você permite que Hong Lin escape. Talvez haja redenção." }, { type: "system", text: "[MORALIDADE] Humano +10" }], choices: [{ id: "next", text: "Continuar", desc: "Próxima missão", nextScene: "casino_boat" }]},
            casino_disguise: { title: "Disfarce no Cassino", mission: "Missão: Cassino", location: "Barco Cassino - Entrada", content: [{ type: "narrative", text: "Você se infiltra discretamente usando disfarces elaborados." }], choices: [{ id: "find_denaro", text: "Localizar Denaro", desc: "Buscar o traidor", nextScene: "denaro_confrontation" }]},
            denaro_confrontation: { title: "Confronto com Denaro", mission: "Missão: Cassino", location: "Cassino - Salão VIP", content: [{ type: "dialogue", speaker: "DENARO", text: "Vocês... como me encontraram? Não importa, já é tarde demais." }], choices: [{ id: "fight", text: "Combater Denaro", desc: "Lutar", nextScene: "denaro_betrayal" }]},
            ramona_rescue: { title: "Resgate de Ramona", mission: "Missão: Cassino", location: "Cassino - Porão", content: [{ type: "dialogue", speaker: "RAMONA", text: "Obrigada por me salvarem... Denaro me capturou para usar como isca." }], choices: [{ id: "next", text: "Confrontar Denaro", desc: "Enfrentar o traidor", nextScene: "denaro_confrontation" }]},
            denaro_negotiation: { title: "Negociação com Denaro", mission: "Missão: Cassino", location: "Cassino", content: [{ type: "dialogue", speaker: "DENARO", text: "Podemos fazer um acordo... informações por liberdade." }], choices: [{ id: "accept", text: "Aceitar", desc: "Obter informações", nextScene: "denaro_betrayal" }]},
            casino_combat: { title: "Combate no Cassino", mission: "Missão: Cassino", location: "Cassino - Salão Principal", content: [{ type: "narrative", text: "Um tiroteio eclode no cassino. Caós total." }], choices: [{ id: "escape", text: "Escapar", desc: "Fugir da confusão", nextScene: "denaro_betrayal" }]},
            character_special: { title: "Momento Especial", mission: "Desenvolvimento", location: "Variável", content: [{ type: "narrative", text: "Um momento único baseado no seu personagem e escolhas." }], choices: [{ id: "continue", text: "Continuar", desc: "Avançar na história", nextScene: "trinity_factory" }]},
            trinity_negotiation: { title: "Negociação com Trindade", mission: "Missão: Fábrica", location: "Fábrica da Trindade", content: [{ type: "dialogue", speaker: "LÍDER DA TRINDADE", text: "Talvez possamos chegar a um acordo... se passarem nos testes." }], choices: [{ id: "trial", text: "Aceitar os testes", desc: "Provar valor", nextScene: "trinity_trial_fire" }]},
            trinity_questions: { title: "Questionário da Trindade", mission: "Missão: Fábrica", location: "Fábrica - Templo", content: [{ type: "dialogue", speaker: "SACERDOTE", text: "Responda nossas questões e prove sua sabedoria." }], choices: [{ id: "trial", text: "Continuar", desc: "Prosseguir", nextScene: "trinity_trial_fire" }]},
            trinity_trial_water: { title: "Provação da Água", mission: "Missão: Fábrica", location: "Fábrica - Câmara da Água", content: [{ type: "narrative", text: "Você enfrenta o teste da água, simbolizando purificação." }, { type: "system", text: "[PROVAÇÕES COMPLETAS] Nyx foi resgatada. A Trindade reconhece sua força." }], choices: [{ id: "finish", text: "Concluir missão", desc: "Finalizar Ato 1", nextScene: "ending" }]},
            ending: {
                title: "Fim do Ato 1: Ecos da Humanidade",
                mission: "Conclusão",
                location: "Nexus - Base Reconstruída",
                content: [
                    { type: "system", text: "[ATO 1 COMPLETO]" },
                    { type: "narrative", text: "As quatro missões foram concluídas. O Nexus começa a se reconstruir das cinzas." },
                    { type: "dialogue", speaker: "PENTABYTE", text: "Conseguimos reunir informações cruciais sobre o paradeiro de Lia. Ela está na Torre Exocorp, no último andar." },
                    { type: "narrative", text: "Você olha para o horizonte. A megacidade brilha com neon, mas sob a superfície, a resistência cresce." },
                    { type: "system", text: "SUAS ESCOLHAS FORAM REGISTRADAS" },
                    { type: "system", text: `Moralidade Final: ${this.gameState?.morality || 50}% (${(this.gameState?.morality || 50) > 50 ? 'PRAGMÁTICO' : 'HUMANO'})` },
                    { type: "narrative", text: "O Ato 2 incluirá: Infiltração na Torre Exocorp, Confronto com P. Di, Resgate de Lia, e o destino final da humanidade." }
                ],
                choices: [
                    { id: "preview", text: "Ver Preview do Ato 2", desc: "Próximos desafios", nextScene: "act2_preview" },
                    { id: "restart", text: "Jogar Novamente", desc: "Explorar outras escolhas", action: "restart" },
                    { id: "stats", text: "Ver Estatísticas Finais", desc: "Análise completa", action: "showStats" }
                ]
            },
            
            act2_preview: { title: "FIM DO ATO 1", mission: "Conclusão", location: "Nexus Reconstruído", content: [{ type: "system", text: "[ATO 1 COMPLETO]" }, { type: "narrative", text: "Sua jornada no Ato 1 está completa. O Ato 2 trará novos desafios e o confronto final com a Exocorp." }], choices: [{ id: "restart", text: "Reiniciar Jogo", desc: "Começar novamente", action: "restart" }, { id: "stats", text: "Ver Estatísticas", desc: "Análise final", action: "showStats" }]}
        };
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
        
        // Ajustar objetivos iniciais
        this.gameState.objectives = [
            "Explorar o Nexus destruído",
            "Encontrar sobreviventes",
            "Descobrir o paradeiro de Lia"
        ];
        
        this.startGame();
    }
    
    // INICIAR JOGO
    startGame() {
        document.getElementById('title-screen').style.display = 'none';
        document.getElementById('character-select').style.display = 'none';
        document.getElementById('game-container').style.display = 'block';
        
        this.updateUI();
        this.loadScene('intro');
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
        
        // Adicionar contexto do personagem
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
                    html += `
                        <div class="dialogue-box">
                            <div class="speaker">${item.speaker}</div>
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
                // Verificar se o personagem atual pode fazer esta escolha
                if (choice.requiresChar && !choice.requiresChar.includes(this.gameState.selectedCharacter)) {
                    return; // Pular escolha não disponível
                }
                
                let choiceClass = 'choice';
                if (choice.type === 'human') choiceClass += ' human';
                if (choice.type === 'pragmatic') choiceClass += ' pragmatic';
                
                let tagColor = 'neutral';
                if (choice.type === 'human') tagColor = 'human';
                if (choice.type === 'pragmatic') tagColor = 'pragmatic';
                
                html += `
                    <div class="${choiceClass}" onclick="game.makeChoice('${choice.id}')">
                        <div class="choice-title">
                            <span class="choice-tag tag-${tagColor}">${choice.type?.toUpperCase() || 'AÇÃO'}</span>
                            ${choice.text}
                        </div>
                        <div class="choice-desc">${choice.desc}</div>
                    </div>
                `;
            });
            html += '</div>';
        }
        
        sceneContainer.innerHTML = html;
        sceneContainer.scrollTop = 0;
        
        // Aplicar background baseado na locação
        this.applySceneBackground(scene);
    }
    
    // APLICAR BACKGROUND DA CENA (SPLIT SCREEN - LADO ESQUERDO)
    applySceneBackground(scene) {
        const gameMain = document.querySelector('.game-main');
        if (!gameMain) return;
        
        // Mapeamento de backgrounds
        const backgrounds = {
            'nexus': 'assets/bg_nexus.png',
            'hospital': 'assets/bg_hospital.png',
            'casino': 'assets/bg_casino.png',
            'factory': 'assets/bg_factory.png',
            'default': 'assets/bg_nexus.png'
        };
        
        // Detectar locação da cena
        let bgKey = 'default';
        const location = scene.location?.toLowerCase() || '';
        
        if (location.includes('nexus')) bgKey = 'nexus';
        else if (location.includes('hospital')) bgKey = 'hospital';
        else if (location.includes('casino')) bgKey = 'casino';
        else if (location.includes('fábrica') || location.includes('factory')) bgKey = 'factory';
        
        const bgUrl = backgrounds[bgKey];
        
        // Criar style inline para ::before
        let styleEl = document.getElementById('dynamic-bg-style');
        if (!styleEl) {
            styleEl = document.createElement('style');
            styleEl.id = 'dynamic-bg-style';
            document.head.appendChild(styleEl);
        }
        styleEl.textContent = `.game-main::before { background-image: url('${bgUrl}'); }`;
    }
    
    // FAZER ESCOLHA
    makeChoice(choiceId) {
        console.log('=== ESCOLHA CLICADA ===' );
        console.log('Choice ID:', choiceId);
        console.log('Cena atual:', this.gameState.currentScene);
        
        const scene = this.currentSceneData;
        if (!scene) {
            console.error('ERRO: Cena atual não encontrada!');
            return;
        }
        
        const choice = scene.choices?.find(c => c.id === choiceId);
        
        if (!choice) {
            console.error('ERRO: Escolha não encontrada!', choiceId);
            console.log('Escolhas disponíveis:', scene.choices);
            return;
        }
        
        console.log('Escolha encontrada:', choice);
        
        // Aplicar mudanças na moralidade
        if (choice.morality) {
            this.gameState.morality = Math.max(0, Math.min(100, this.gameState.morality + choice.morality));
        }
        
        // Aplicar mudanças na reputação
        if (choice.reputation) {
            Object.keys(choice.reputation).forEach(faction => {
                this.gameState.reputation[faction] += choice.reputation[faction];
                this.gameState.reputation[faction] = Math.max(-100, Math.min(100, this.gameState.reputation[faction]));
            });
        }
        
        // Aplicar flags
        if (choice.flags) {
            Object.assign(this.gameState.flags, choice.flags);
        }
        
        // Ações especiais
        if (choice.action) {
            this.executeAction(choice.action);
            return;
        }
        
        // Carregar próxima cena
        if (choice.nextScene) {
            console.log('Carregando próxima cena:', choice.nextScene);
            setTimeout(() => {
                this.loadScene(choice.nextScene);
                this.updateUI();
            }, 500);
        } else {
            console.warn('AVISO: Escolha não tem nextScene definido!');
            alert('Esta escolha ainda não tem continuação implementada.');
        }
    }
    
    // EXECUTAR AÇÕES ESPECIAIS
    executeAction(action) {
        switch(action) {
            case 'restart':
                this.restartGame();
                break;
            case 'showStats':
                this.showFinalStats();
                break;
        }
    }
    
    // ATUALIZAR INTERFACE
    updateUI() {
        // Nome do personagem
        const charName = document.getElementById('char-name');
        if (charName && this.gameState.characterData) {
            charName.textContent = this.gameState.characterData.name;
        }
        
        // Missão atual
        const missionName = document.getElementById('mission-name');
        if (missionName && this.currentSceneData) {
            missionName.textContent = `Ato ${this.gameState.act} - ${this.currentSceneData.mission}`;
        }
        
        // Barra de moralidade
        const moralityFill = document.getElementById('morality-fill');
        if (moralityFill) {
            moralityFill.style.width = this.gameState.morality + '%';
        }
        
        // HP
        const hp = document.getElementById('hp');
        if (hp) {
            hp.textContent = `${this.gameState.hp}/${this.gameState.maxHp}`;
        }
        
        // Reputações
        this.updateReputationDisplay();
    }
    
    // ATUALIZAR DISPLAY DE REPUTAÇÃO
    updateReputationDisplay() {
        const reputationElements = {
            'rep-nexus': 'nexus',
            'rep-sinaloa': 'sinaloa', 
            'rep-dragons': 'dragons'
        };
        
        Object.keys(reputationElements).forEach(elementId => {
            const element = document.getElementById(elementId);
            if (element) {
                const faction = reputationElements[elementId];
                const rep = this.gameState.reputation[faction];
                let status = 'Neutro';
                
                if (rep >= 50) status = 'Aliado';
                else if (rep >= 20) status = 'Amigável';
                else if (rep <= -50) status = 'Inimigo';
                else if (rep <= -20) status = 'Hostil';
                
                element.textContent = status;
                element.style.color = rep >= 20 ? 'var(--green)' : rep <= -20 ? 'var(--red)' : 'var(--cyan)';
            }
        });
    }
    
    // SALVAR JOGO
    saveGame() {
        try {
            localStorage.setItem('novaYorkExocorp_save', JSON.stringify(this.gameState));
            
            // Habilitar botão continuar
            const continueBtn = document.getElementById('continue-btn');
            if (continueBtn) {
                continueBtn.disabled = false;
            }
        } catch (e) {
            console.error('Erro ao salvar:', e);
        }
    }
    
    // CARREGAR JOGO
    loadGame() {
        try {
            const saved = localStorage.getItem('novaYorkExocorp_save');
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
        const saved = localStorage.getItem('novaYorkExocorp_save');
        const continueBtn = document.getElementById('continue-btn');
        if (continueBtn) {
            continueBtn.disabled = !saved;
        }
    }
    
    // REINICIAR JOGO
    restartGame() {
        localStorage.removeItem('novaYorkExocorp_save');
        location.reload();
    }
    
    // MOSTRAR ESTATÍSTICAS FINAIS
    showFinalStats() {
        const moral = this.gameState.morality;
        const moralType = moral > 66 ? 'PRAGMÁTICO EXTREMO' : 
                         moral > 50 ? 'PRAGMÁTICO' :
                         moral < 33 ? 'HUMANO EXTREMO' : 'HUMANO';
        
        alert(`ESTATÍSTICAS FINAIS DO ATO 1:
        
Personagem: ${this.gameState.characterData.name}
Moralidade: ${moral}% (${moralType})

Reputações:
• Resistência/Nexus: ${this.gameState.reputation.nexus}
• Sinaloa: ${this.gameState.reputation.sinaloa}
• Dragões de Jade: ${this.gameState.reputation.dragons}
• Trindade da Chama: ${this.gameState.reputation.trindade}

Destino de Hong Lin: ${this.gameState.flags.hongLinFate || 'Não definido'}
Nyx Resgatada: ${this.gameState.flags.nyxRescued ? 'Sim' : 'Não'}
Aliança com Trindade: ${this.gameState.flags.trindadeAlliance ? 'Sim' : 'Não'}

Obrigado por jogar!`);
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
    if (confirm('Voltar ao menu principal? (Progresso atual será salvo)')) {
        game.saveGame();
        location.reload();
    }
}

function showCredits() {
    alert(`NOVA YORK EXOCORP: O DESPERTAR

Baseado na campanha de RPG criada por você!

Desenvolvimento: AI Assistant
Engine: JavaScript puro
Arte: Pixel Art gerada por IA
Música: Em desenvolvimento

Personagens criados por: Você
História original: Sua campanha cyberpunk

Versão: Ato 1 - Demo Completa
Data: Outubro 2023

Obrigado por criar este universo incrível!`);
}

// INICIALIZAR JOGO
let game;
document.addEventListener('DOMContentLoaded', () => {
    game = new GameEngine();
    game.init();
});