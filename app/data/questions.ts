export type Option = {
  id: number;
  text: string;
  correct: boolean;
  feedback: string;
};

export type Question = {
  id: number;
  phase: number;
  question: string;
  options: Option[];
};

// Função Fisher-Yates (melhor algoritmo de shuffle)
function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Todas as perguntas e respostas
const rawQuestions: Question[] = [
  // ------------------------------
  // FASE 1 — CONCEITOS FUNDAMENTAIS
  // ------------------------------

  {
    id: 1,
    phase: 1,
    question: "Qual é o principal objetivo da ISO/IEC 20000?",
    options: [
      { id: 1, text: "Garantir qualidade na gestão de serviços de TI", correct: true, feedback: "Correto! Esse é o foco principal da ISO 20000." },
      { id: 2, text: "Aumentar a velocidade da internet", correct: false, feedback: "Não — desempenho de rede não é o foco." },
      { id: 3, text: "Determinar protocolos de hardware", correct: false, feedback: "Não — a norma não define hardware." },
      { id: 4, text: "Criar regras para vendas de software", correct: false, feedback: "Não tem relação com vendas." },
      { id: 5, text: "Regulamentar backups em nuvem", correct: false, feedback: "Backups fazem parte de processos, mas não é o objetivo principal." },
    ],
  },

  {
    id: 2,
    phase: 1,
    question: "O que representa um 'serviço' na ISO 20000?",
    options: [
      { id: 1, text: "Um meio de entregar valor ao cliente", correct: true, feedback: "Correto! Serviço entrega valor." },
      { id: 2, text: "Apenas hardware físico", correct: false, feedback: "Não — hardware pode compor o serviço, mas não é um serviço sozinho." },
      { id: 3, text: "Um aplicativo instalado no PC", correct: false, feedback: "Software isolado não define serviço." },
      { id: 4, text: "Qualquer item cadastrado no CMDB", correct: false, feedback: "Itens ajudam, mas não são serviços." },
      { id: 5, text: "Uma equipe de suporte", correct: false, feedback: "Equipe presta parte do serviço, mas não é o serviço em si." },
    ],
  },

  {
    id: 3,
    phase: 1,
    question: "Qual benefício direto a ISO 20000 traz?",
    options: [
      { id: 1, text: "Consistência na entrega de serviços", correct: true, feedback: "Sim! Processos padronizados trazem consistência." },
      { id: 2, text: "Aumento imediato na receita", correct: false, feedback: "Benefícios financeiros são indiretos." },
      { id: 3, text: "Fim de todos os incidentes", correct: false, feedback: "Nenhuma norma elimina 100% dos incidentes." },
      { id: 4, text: "Redução de custos garantida", correct: false, feedback: "Pode ajudar, mas não é garantido." },
      { id: 5, text: "Automação total dos serviços", correct: false, feedback: "Automação não é exigida pela norma." },
    ],
  },

  {
    id: 4,
    phase: 1,
    question: "O que é um processo na ISO 20000?",
    options: [
      { id: 1, text: "Um conjunto de atividades para entregar valor", correct: true, feedback: "Perfeito! Processo = atividades estruturadas." },
      { id: 2, text: "Um documento salvo em PDF", correct: false, feedback: "Documentos ajudam, mas não são processos." },
      { id: 3, text: "A reunião semanal da equipe", correct: false, feedback: "Reuniões podem apoiar, mas não definem processo." },
      { id: 4, text: "Uma política obrigatória", correct: false, feedback: "Política é diretriz, não processo." },
      { id: 5, text: "Um incidente crítico", correct: false, feedback: "Incidente é evento, não processo." },
    ],
  },

  {
    id: 5,
    phase: 1,
    question: "Qual é um componente essencial da gestão de serviços?",
    options: [
      { id: 1, text: "SLA (Acordo de Nível de Serviço)", correct: true, feedback: "Correto — SLAs definem o nível esperado do serviço." },
      { id: 2, text: "Pintura da sala de TI", correct: false, feedback: "Nada a ver." },
      { id: 3, text: "Modelo de vendas", correct: false, feedback: "Não tem relação." },
      { id: 4, text: "Quantidade de funcionários", correct: false, feedback: "Pode influenciar, mas não define serviço." },
      { id: 5, text: "Quantidade de computadores", correct: false, feedback: "Recursos suportam, mas não definem o serviço." },
    ],
  },

  // ------------------------------
  // FASE 2 — INCIDENTES, PROBLEMAS E MUDANÇAS
  // ------------------------------

  {
    id: 6,
    phase: 2,
    question: "Qual processo restaura o serviço após um incidente?",
    options: [
      { id: 1, text: "Gerenciamento de Incidentes", correct: true, feedback: "Isso! Esse processo restaura rapidamente o serviço." },
      { id: 2, text: "Gerenciamento de Mudanças", correct: false, feedback: "Não — mudanças tratam alterações planejadas." },
      { id: 3, text: "Gerenciamento de Configuração", correct: false, feedback: "Esse controla itens de configuração." },
      { id: 4, text: "Gerenciamento de Disponibilidade", correct: false, feedback: "Trata disponibilidade, não resolução imediata." },
      { id: 5, text: "Gerenciamento Financeiro", correct: false, feedback: "Sem relação." },
    ],
  },

  {
    id: 7,
    phase: 2,
    question: "O que é uma RFC?",
    options: [
      { id: 1, text: "Pedido formal de mudança", correct: true, feedback: "Exatamente! RFC é a solicitação oficial de mudança." },
      { id: 2, text: "Um incidente crítico", correct: false, feedback: "Não — incidente não é mudança." },
      { id: 3, text: "Relatório de desempenho", correct: false, feedback: "Nada a ver." },
      { id: 4, text: "Erro no CMDB", correct: false, feedback: "Não — CMDB é base de dados." },
      { id: 5, text: "Checklist de hardware", correct: false, feedback: "Não tem relação." },
    ],
  },

  {
    id: 8,
    phase: 2,
    question: "Qual a função do gerenciamento de problemas?",
    options: [
      { id: 1, text: "Identificar causa raiz e prevenir recorrência", correct: true, feedback: "Correto! Problemas tratam causas profundas." },
      { id: 2, text: "Controlar inventário", correct: false, feedback: "Não — isso é CMDB." },
      { id: 3, text: "Registrar chamados", correct: false, feedback: "Registro é parte de incidentes, não problemas." },
      { id: 4, text: "Gerenciar SLAs", correct: false, feedback: "SLAs são de gestão de nível de serviço." },
      { id: 5, text: "Instalar atualizações", correct: false, feedback: "Atualizações são ações, não o objetivo." },
    ],
  },

  {
    id: 9,
    phase: 2,
    question: "O que deve ser feito antes de executar uma mudança de alto risco?",
    options: [
      { id: 1, text: "Analisar riscos e criar plano de rollback", correct: true, feedback: "Correto! Mudanças críticas exigem plano de retorno." },
      { id: 2, text: "Executar sem avisar para agilizar", correct: false, feedback: "Perigoso e incorreto." },
      { id: 3, text: "Ignorar documentação", correct: false, feedback: "Documentação é essencial." },
      { id: 4, text: "Fazer apenas testes manuais rápidos", correct: false, feedback: "Testes adequados são fundamentais." },
      { id: 5, text: "Executar em horário de pico", correct: false, feedback: "Risco alto!" },
    ],
  },

  {
    id: 10,
    phase: 2,
    question: "Qual processo lida com erros conhecidos?",
    options: [
      { id: 1, text: "Gerenciamento de Problemas", correct: true, feedback: "Exatamente — erros conhecidos pertencem a problemas." },
      { id: 2, text: "Gerenciamento de Incidentes", correct: false, feedback: "Incidentes tratam impactos imediatos." },
      { id: 3, text: "Service Desk", correct: false, feedback: "Atende, mas não gerencia erros conhecidos." },
      { id: 4, text: "Gerenciamento de Mudanças", correct: false, feedback: "Mudanças aplicam correções planejadas." },
      { id: 5, text: "Gerenciamento Financeiro", correct: false, feedback: "Sem relação." },
    ],
  },

  // ------------------------------
  // FASE 3 — ANÁLISE, RISCOS E CONTINUIDADE
  // ------------------------------

  {
    id: 11,
    phase: 3,
    question: "Um incidente afeta 50% dos usuários. O que fazer primeiro?",
    options: [
      { id: 1, text: "Acionar resposta rápida para restaurar o serviço", correct: true, feedback: "Correto! Mitigação imediata é prioridade." },
      { id: 2, text: "Esperar autorização do fornecedor", correct: false, feedback: "Esperar pode piorar o impacto." },
      { id: 3, text: "Abrir RFC antes de agir", correct: false, feedback: "Incidentes urgentes precisam ação imediata." },
      { id: 4, text: "Desabilitar SLAs temporariamente", correct: false, feedback: "Não resolve o problema." },
      { id: 5, text: "Enviar comunicado 1h depois", correct: false, feedback: "Comunicação deve ser rápida." },
    ],
  },

  {
    id: 12,
    phase: 3,
    question: "Após resolver incidente crítico, qual próximo passo?",
    options: [
      { id: 1, text: "Analisar causa raiz e ações preventivas", correct: true, feedback: "Corretíssimo! Aprender com o incidente é essencial." },
      { id: 2, text: "Fechar o ticket imediatamente", correct: false, feedback: "Não sem análise." },
      { id: 3, text: "Ignorar registro", correct: false, feedback: "Registro é essencial." },
      { id: 4, text: "Disparar nova mudança sem análise", correct: false, feedback: "Planejamento é essencial." },
      { id: 5, text: "Criar novo SLA aleatório", correct: false, feedback: "Nada a ver." },
    ],
  },

  {
    id: 13,
    phase: 3,
    question: "Em uma mudança com risco de interrupção, o que é obrigatório?",
    options: [
      { id: 1, text: "Planejar rollback", correct: true, feedback: "Sim! Sempre tenha um plano de retorno." },
      { id: 2, text: "Executar sem testes", correct: false, feedback: "Testes são essenciais." },
      { id: 3, text: "Executar durante horário crítico", correct: false, feedback: "Evite sempre!" },
      { id: 4, text: "Registrar apenas depois", correct: false, feedback: "Documentação deve ser antes." },
      { id: 5, text: "Avisar somente após algum erro", correct: false, feedback: "Aviso deve ser prévio." },
    ],
  },

  {
    id: 14,
    phase: 3,
    question: "Qual elemento ajuda a medir impacto de riscos?",
    options: [
      { id: 1, text: "Matriz de Probabilidade × Impacto", correct: true, feedback: "Correto! Matriz de risco é padrão." },
      { id: 2, text: "Cor da tela do sistema", correct: false, feedback: "Sem relação." },
      { id: 3, text: "Número de funcionários", correct: false, feedback: "Não determina impacto." },
      { id: 4, text: "Quantidade de servidores", correct: false, feedback: "Relevante, mas não é ferramenta de risco." },
      { id: 5, text: "Velocidade da internet", correct: false, feedback: "Nada a ver." },
    ],
  },

  {
    id: 15,
    phase: 3,
    question: "Qual documento descreve como operar após desastre?",
    options: [
      { id: 1, text: "Plano de Continuidade de Serviços", correct: true, feedback: "Correto! Documento fundamental." },
      { id: 2, text: "Guia de Vendas", correct: false, feedback: "Nada a ver." },
      { id: 3, text: "Plano de Marketing", correct: false, feedback: "Sem relação." },
      { id: 4, text: "Política de Segurança Física", correct: false, feedback: "Trata segurança, não continuidade." },
      { id: 5, text: "Checklist de Inventário", correct: false, feedback: "Não cobre continuidade." },
    ],
  },

  // ------------------------------
  // FASE 4 — MELHORIA CONTÍNUA E SLA
  // ------------------------------

  {
    id: 16,
    phase: 4,
    question: "Como medir se o serviço atende níveis acordados?",
    options: [
      { id: 1, text: "Monitorando SLAs e KPIs", correct: true, feedback: "Perfeito! Indicadores mostram desempenho." },
      { id: 2, text: "Apenas por opinião do gestor", correct: false, feedback: "Avaliação deve ser objetiva." },
      { id: 3, text: "Usando relatórios anuais somente", correct: false, feedback: "Deve ser contínuo." },
      { id: 4, text: "Comparando com serviços concorrentes", correct: false, feedback: "Não é medição oficial." },
      { id: 5, text: "Analisando somente incidentes críticos", correct: false, feedback: "Uma métrica só não basta." },
    ],
  },

  {
    id: 17,
    phase: 4,
    question: "Por que gerenciar mudanças formalmente é importante?",
    options: [
      { id: 1, text: "Reduz riscos e interrupções não planejadas", correct: true, feedback: "Exatamente! Controle é fundamental." },
      { id: 2, text: "Garante que testes falhem", correct: false, feedback: "Não faz sentido." },
      { id: 3, text: "Elimina comunicação", correct: false, feedback: "Comunicação é vital." },
      { id: 4, text: "Permite mudanças improvisadas", correct: false, feedback: "Improviso gera risco." },
      { id: 5, text: "Evita documentação", correct: false, feedback: "Documentação é obrigatória." },
    ],
  },

  {
    id: 18,
    phase: 4,
    question: "Como melhorar retenção do aprendizado?",
    options: [
      { id: 1, text: "Dar feedback imediato com explicação", correct: true, feedback: "Correto! Feedback pedagógico ajuda muito." },
      { id: 2, text: "Não explicar erros", correct: false, feedback: "Explicação é crucial." },
      { id: 3, text: "Ignorar resultados anteriores", correct: false, feedback: "Você deve analisar padrões." },
      { id: 4, text: "Apenas repetir exercícios sem revisão", correct: false, feedback: "Revisão é essencial." },
      { id: 5, text: "Estudar somente quando errar", correct: false, feedback: "Prática contínua é necessária." },
    ],
  },

  {
    id: 19,
    phase: 4,
    question: "O que caracteriza melhoria contínua?",
    options: [
      { id: 1, text: "Aperfeiçoamento constante baseado em dados", correct: true, feedback: "Correto! Melhoria vem de métricas." },
      { id: 2, text: "Corrigir apenas incidentes graves", correct: false, feedback: "Melhoria é constante, não pontual." },
      { id: 3, text: "Mudar processos sem medir resultados", correct: false, feedback: "Medir é essencial." },
      { id: 4, text: "Documentar menos", correct: false, feedback: "O oposto! Documentação melhora processos." },
      { id: 5, text: "Nunca revisar SLAs", correct: false, feedback: "SLAs devem ser revisados." },
    ],
  },

  {
    id: 20,
    phase: 4,
    question: "Qual elemento ajuda no alinhamento com o cliente?",
    options: [
      { id: 1, text: "Revisões periódicas de SLA", correct: true, feedback: "Correto! Reuniões mantêm alinhamento." },
      { id: 2, text: "Feedback só anual", correct: false, feedback: "Muito pouco!" },
      { id: 3, text: "Nunca registrar mudanças", correct: false, feedback: "Isso gera riscos." },
      { id: 4, text: "Ignorar métricas de serviço", correct: false, feedback: "Métricas são essenciais." },
      { id: 5, text: "Focar apenas em marketing", correct: false, feedback: "Não resolve problemas." },
    ],
  },
];

// Agora embaralhamos SEMPRE que o arquivo é importado
export const questions: Question[] = rawQuestions.map(q => ({
  ...q,
  options: shuffle(q.options),
}));
