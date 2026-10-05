/**
 * Portfólio de Projetos - Raul Destefano
 * Base de dados modular com prints reais dos 9 projetos desenvolvidos
 */

const WHATSAPP_NUMBER = "5511984286636";

const PROJECTS_DATA = [
  {
    id: "3travel",
    title: "3 Travel Design",
    subtitle: "Consultoria de Viagens & Experiências Exclusivas",
    category: "turismo",
    categoryLabel: "Turismo & Luxo",
    url: "https://3travel.com.br/",
    image: "assets/images/prints/3travel.jpeg",
    logo: null,
    badge: "Exclusivo",
    description: "Plataforma sofisticada para consultoria de viagens de alto padrão e roteiros internacionais sob medida.",
    tags: ["Viagens de Luxo", "Design Premium", "Experiências Personalizadas", "Mobile-First"],
    highlights: ["Identidade Visual Elegante", "Captação de Leads Qualificados", "Design Responsivo"]
  },
  {
    id: "singapura",
    title: "Projeto Singapura",
    subtitle: "A sua guia brasileira oficial em Singapura",
    category: "turismo",
    categoryLabel: "Turismo Internacional",
    url: "https://projetosingapura.com/",
    image: "assets/images/prints/ProjetoSingapura.jpeg",
    logo: null,
    badge: "Internacional",
    description: "Site institucional bilíngue para guia credenciada em Singapura com apresentação de City Tours personalizados.",
    tags: ["Turismo Internacional", "City Tour", "Bilíngue (PT/EN)", "Agendamento WhatsApp"],
    highlights: ["Apresentação de Itinerários", "Contato Direto WhatsApp", "Autoridade & Experiência"]
  },
  {
    id: "amarelas",
    title: "Amarelas Studio",
    subtitle: "Arquitetura & Projetos de Interiores",
    category: "arquitetura",
    categoryLabel: "Arquitetura & Interiores",
    url: "https://amarelasstudio.com.br/",
    image: "assets/images/prints/AmarelasStudio.jpeg",
    logo: null,
    badge: "Design & Interiores",
    description: "Estúdio de arquitetura residencial focado em integrar arquitetura contemporânea, design exclusivo e tecnologia.",
    tags: ["Arquitetura", "Design de Interiores", "Portfólio de Obras", "Experiência Visual"],
    highlights: ["Galeria de Obras e Conceitos", "Estética Minimalista", "SEO Otimizado"]
  },
  {
    id: "ctacademia",
    title: "CT Premium",
    subtitle: "Evolução, Treinamento & Exclusividade",
    category: "fitness",
    categoryLabel: "Fitness & Saúde",
    url: "https://ctacademia.com.br/",
    image: "assets/images/prints/CT_Academia.jpeg",
    logo: "assets/images/projects/ctacademia_logo.png",
    badge: "Alta Performance",
    description: "Centro de treinamento de musculação de alta performance e Studio de Personal Trainer moderno.",
    tags: ["Academia & Fitness", "Personal Trainer", "Tema Dark Impactante", "Alta Conversão"],
    highlights: ["Visual Enérgico e Imersivo", "Agendamento de Avaliação", "Carregamento Rápido"]
  },
  {
    id: "portocafe",
    title: "Porto Café & Co.",
    subtitle: "Cafeteria & Almoço Charmoso no Brás, SP",
    category: "gastronomia",
    categoryLabel: "Gastronomia",
    url: "https://portocafeeco.netlify.app/",
    image: "assets/images/prints/PortoCafe.jpeg",
    logo: "assets/images/projects/portocafe_logo.png",
    badge: "Gastronomia",
    description: "Experiência charmosa e acolhedora no Brás com cafés especiais, almoço executivo e ambiente exclusivo.",
    tags: ["Cafeteria Especial", "Almoço & Lanches", "Menu Interativo", "Localização & Contato"],
    highlights: ["Animação Hero com Canvas", "Estética Acolhedora", "Integração Google Maps"]
  },
  {
    id: "portocatering",
    title: "Porto Café Catering",
    subtitle: "Soluções Gastronômicas & Catering Corporativo",
    category: "gastronomia",
    categoryLabel: "Eventos & Gastronomia",
    url: "https://portocafecatering.netlify.app/",
    image: "assets/images/prints/PortoCafeCatering.jpeg",
    logo: "assets/images/projects/catering_logo.png",
    badge: "B2B / Corporativo",
    description: "Serviço de catering premium e buffet para eventos empresariais, coffee breaks e celebrações corporativas.",
    tags: ["Catering Corporativo", "Buffet de Eventos", "Background em Vídeo", "Formulário de Cotação"],
    highlights: ["Vídeo Hero em Background", "Proposta Comercial B2B", "CTA WhatsApp Permanente"]
  },
  {
    id: "fluxpilates",
    title: "Flux Pilates Studio",
    subtitle: "Pilates Personalizado na Chácara Santo Antônio",
    category: "fitness",
    categoryLabel: "Saúde & Bem-Estar",
    url: "https://fluxpilatesstudio.netlify.app/",
    image: "assets/images/prints/FluxPilates.jpeg",
    logo: "assets/images/projects/flux_logo.png",
    badge: "Saúde & Pilates",
    description: "Estúdio de Pilates focado em saúde, reabilitação postural e turmas reduzidas com atendimento humanizado.",
    tags: ["Pilates Clínico", "Saúde Postural", "Aula Experimental", "Design Limpo"],
    highlights: ["Interface Clara e Acolhedora", "Foco em Agendamento", "Avaliações e Depoimentos"]
  },
  {
    id: "rafaelcaetano",
    title: "Rafael Caetano",
    subtitle: "Chief Revenue Officer, Palestrante & Mentor",
    category: "executivo",
    categoryLabel: "Executivo & Liderança",
    url: "https://rafaelcaetano.netlify.app/",
    image: "assets/images/prints/RafaelCaetano.jpeg",
    logo: "assets/images/projects/rafael_logo.png",
    badge: "Personal Branding",
    description: "Portfólio de autoridade de executivo C-level, palestras corporativas de vendas e liderança empresarial.",
    tags: ["Personal Branding", "Palestras & Aulas", "Cursor Magnético", "Design Ultra Moderno"],
    highlights: ["Efeitos Visuais Interativos", "Prova Social com Grandes Marcas", "Blog & Conteúdo Integrado"]
  },
  {
    id: "merakipilates",
    title: "Movimento Meraki Pilates",
    subtitle: "Estúdio no Jardim Avelino com Aulas Presenciais e Online",
    category: "fitness",
    categoryLabel: "Saúde & Bem-Estar",
    url: "https://merakipilates.netlify.app/",
    image: "assets/images/prints/MovimentoMeraki.png",
    logo: "assets/images/projects/meraki_logo.png",
    badge: "Saúde & Bem-Estar",
    description: "Pilates personalizado presencial e online ao vivo para reconexão corporal, alívio de dores e vitalidade.",
    tags: ["Pilates Especializado", "Presencial & Online", "Turmas Reduzidas", "Aula Experimental"],
    highlights: ["Galeria do Espaço", "Carrossel de Equipe", "Captação de Alunos no WhatsApp"]
  }
];

const CATEGORIES = [
  { id: "all", label: "Todos", count: 9 },
  { id: "fitness", label: "Saúde & Fitness", count: 3 },
  { id: "gastronomia", label: "Gastronomia & Catering", count: 2 },
  { id: "turismo", label: "Turismo & Viagens", count: 2 },
  { id: "arquitetura", label: "Arquitetura", count: 1 },
  { id: "executivo", label: "Executivo & Branding", count: 1 }
];
