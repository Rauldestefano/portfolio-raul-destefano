/**
 * Raul Destefano - Portfolio Showcase App
 * Interações, Filtros, Alternador de Visualização e Integração com WhatsApp
 */

document.addEventListener('DOMContentLoaded', () => {
  // Estado da aplicação
  let currentCategory = 'all';
  let currentViewMode = 'cards'; // 'cards' ou 'list'

  const categoriesContainer = document.getElementById('categories-container');
  const projectsContainer = document.getElementById('projects-container');
  const projectCountEl = document.getElementById('project-count-badge');
  const viewToggleCards = document.getElementById('view-toggle-cards');
  const viewToggleList = document.getElementById('view-toggle-list');
  const shareBtn = document.getElementById('share-btn');
  const toast = document.getElementById('toast');

  // Inicializar
  renderCategories();
  renderProjects();
  setupViewSwitcher();
  setupShare();

  /**
   * Renderiza os botões de categorias
   */
  function renderCategories() {
    if (!categoriesContainer) return;
    
    categoriesContainer.innerHTML = CATEGORIES.map(cat => `
      <button 
        class="filter-pill px-4 py-2 rounded-full text-xs font-medium border border-blue-900/40 bg-slate-900/60 text-slate-300 hover:text-white hover:border-indigo-500/50 transition-all flex items-center gap-1.5 ${cat.id === currentCategory ? 'active' : ''}" 
        data-category="${cat.id}">
        <span>${cat.label}</span>
        <span class="text-[10px] px-1.5 py-0.5 rounded-full bg-white/10 text-white/80">${cat.count}</span>
      </button>
    `).join('');

    // Eventos de clique nas categorias
    categoriesContainer.querySelectorAll('.filter-pill').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const catId = btn.getAttribute('data-category');
        currentCategory = catId;
        
        // Atualiza estado visual dos botões
        categoriesContainer.querySelectorAll('.filter-pill').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Re-renderiza projetos
        renderProjects();
      });
    });
  }

  /**
   * Renderiza os projetos de acordo com a categoria e o modo de visualização
   */
  function renderProjects() {
    if (!projectsContainer) return;

    // Filtra dados
    const filtered = currentCategory === 'all' 
      ? PROJECTS_DATA 
      : PROJECTS_DATA.filter(p => p.category === currentCategory);

    // Atualiza badge de contagem
    if (projectCountEl) {
      projectCountEl.textContent = `${filtered.length} ${filtered.length === 1 ? 'projeto' : 'projetos'}`;
    }

    if (filtered.length === 0) {
      projectsContainer.innerHTML = `
        <div class="col-span-full py-16 text-center text-slate-400">
          <p class="text-sm">Nenhum projeto encontrado nesta categoria.</p>
        </div>
      `;
      return;
    }

    if (currentViewMode === 'cards') {
      renderCardsMode(filtered);
    } else {
      renderListMode(filtered);
    }
  }

  /**
   * Renderiza os projetos no Modo Cards (Showcase Visual)
   */
  function renderCardsMode(projects) {
    projectsContainer.className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6';
    
    projectsContainer.innerHTML = projects.map(p => {
      // Mensagem personalizada de WhatsApp para este projeto específico
      const projectWaMsg = encodeURIComponent(
        `Olá Raul! Vi o projeto "${p.title}" no seu portfólio e gostaria de um site semelhante para o meu negócio.`
      );
      const projectWaLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${projectWaMsg}`;

      return `
        <article class="glass-card rounded-2xl overflow-hidden flex flex-col group border border-blue-900/30">
          <!-- Thumbnail / Preview Image -->
          <div class="relative w-full aspect-[16/10] bg-slate-950/80 overflow-hidden">
            <img 
              src="${p.image}" 
              alt="${p.title}" 
              loading="lazy"
              class="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
              onerror="this.src='Minha marca/RD Logo Horizontal (1).png'; this.classList.add('p-8','object-contain')"
            />
            
            <!-- Overlay Gradiente -->
            <div class="absolute inset-0 bg-gradient-to-t from-[#0e0f26] via-transparent to-black/30 pointer-events-none"></div>

            <!-- Categoria Badge -->
            <div class="absolute top-3 left-3 z-10">
              <span class="px-2.5 py-1 text-[11px] font-semibold tracking-wide uppercase rounded-md bg-black/60 backdrop-blur-md text-indigo-300 border border-indigo-500/30">
                ${p.categoryLabel}
              </span>
            </div>

            <!-- Badge de Destaque -->
            ${p.badge ? `
              <div class="absolute top-3 right-3 z-10">
                <span class="px-2.5 py-1 text-[11px] font-medium rounded-md bg-indigo-600/80 backdrop-blur-md text-white shadow-sm">
                  ${p.badge}
                </span>
              </div>
            ` : ''}

            <!-- Logo em sobreposição discreta quando houver -->
            ${p.logo ? `
              <div class="absolute bottom-3 right-3 z-10 max-h-8 max-w-[120px] bg-black/70 backdrop-blur-sm px-2 py-1 rounded border border-white/10 flex items-center">
                <img src="${p.logo}" alt="Logo ${p.title}" class="max-h-6 max-w-full object-contain" />
              </div>
            ` : ''}
          </div>

          <!-- Conteúdo do Card -->
          <div class="p-5 flex-1 flex flex-col justify-between">
            <div>
              <div class="flex items-start justify-between gap-2 mb-1.5">
                <h3 class="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
                  ${p.title}
                </h3>
              </div>
              
              <p class="text-xs font-medium text-indigo-200/80 mb-2.5">
                ${p.subtitle}
              </p>

              <p class="text-xs text-slate-300/90 leading-relaxed mb-4 line-clamp-2">
                ${p.description}
              </p>

              <!-- Tags / Recursos -->
              <div class="flex flex-wrap gap-1.5 mb-5">
                ${p.tags.slice(0, 3).map(tag => `
                  <span class="text-[10px] px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 border border-slate-700/50">
                    ${tag}
                  </span>
                `).join('')}
              </div>
            </div>

            <!-- Ações -->
            <div class="space-y-2 pt-2 border-t border-slate-800/60">
              <a 
                href="${p.url}" 
                target="_blank" 
                rel="noopener noreferrer" 
                class="brand-button w-full py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 group/btn">
                <span>Ver Site ao Vivo</span>
                <svg class="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>

              <a 
                href="${projectWaLink}" 
                target="_blank" 
                rel="noopener noreferrer" 
                class="w-full py-2 px-3 rounded-lg text-[11px] font-medium text-slate-400 hover:text-white bg-slate-900/40 hover:bg-slate-800/60 border border-slate-800 flex items-center justify-center gap-1.5 transition-colors">
                <svg class="w-3 h-3 text-emerald-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.979-.276-.1-.476-.15-.677.15-.2.301-.777.979-.953 1.18-.176.2-.351.226-.652.075-.301-.15-1.27-.468-2.42-1.493-.895-.798-1.5-1.784-1.676-2.085-.175-.301-.019-.464.132-.614.135-.135.301-.351.451-.526.15-.176.2-.301.301-.502.1-.2.05-.376-.025-.526-.075-.15-.677-1.631-.928-2.233-.244-.587-.492-.507-.677-.517-.175-.01-.376-.01-.577-.01-.2 0-.526.075-.802.376-.276.301-1.053 1.028-1.053 2.508 0 1.48 1.078 2.909 1.229 3.11.15.2 2.122 3.24 5.141 4.544.718.31 1.278.496 1.715.635.721.23 1.377.197 1.896.12.578-.087 1.78-.727 2.031-1.43.251-.703.251-1.305.176-1.43-.076-.126-.276-.201-.577-.351z"/>
                </svg>
                <span>Quero um site como esse</span>
              </a>
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  /**
   * Renderiza os projetos no Modo Lista (Linktree Estilizado)
   */
  function renderListMode(projects) {
    projectsContainer.className = 'flex flex-col gap-3 max-w-xl mx-auto w-full';

    projectsContainer.innerHTML = projects.map(p => {
      return `
        <a 
          href="${p.url}" 
          target="_blank" 
          rel="noopener noreferrer" 
          class="list-item-card p-3.5 rounded-xl flex items-center justify-between gap-3 group">
          
          <div class="flex items-center gap-3.5 min-w-0">
            <!-- Mini Thumbnail -->
            <div class="w-12 h-12 rounded-lg bg-slate-800/80 overflow-hidden flex-shrink-0 border border-slate-700/60">
              <img 
                src="${p.image}" 
                alt="${p.title}" 
                class="w-full h-full object-cover"
                onerror="this.src='Minha marca/RD Logo Horizontal (1).png'"
              />
            </div>

            <!-- Textos -->
            <div class="min-w-0">
              <div class="flex items-center gap-2">
                <h3 class="text-sm font-semibold text-white group-hover:text-indigo-300 truncate transition-colors">
                  ${p.title}
                </h3>
                <span class="text-[9px] px-1.5 py-0.5 rounded bg-blue-950/80 text-indigo-300 border border-blue-800/40">
                  ${p.categoryLabel}
                </span>
              </div>
              <p class="text-[11px] text-slate-400 truncate">
                ${p.subtitle}
              </p>
            </div>
          </div>

          <!-- Botão/Ícone -->
          <div class="w-8 h-8 rounded-full bg-slate-800/60 border border-slate-700/50 flex items-center justify-center text-slate-400 group-hover:text-white group-hover:bg-indigo-600 transition-all flex-shrink-0">
            <svg class="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </a>
      `;
    }).join('');
  }

  /**
   * Configuração do alternador de visualização (Cards vs Lista)
   */
  function setupViewSwitcher() {
    if (!viewToggleCards || !viewToggleList) return;

    viewToggleCards.addEventListener('click', () => {
      if (currentViewMode === 'cards') return;
      currentViewMode = 'cards';
      viewToggleCards.classList.add('bg-indigo-600/40', 'text-white', 'border-indigo-500/50');
      viewToggleCards.classList.remove('text-slate-400');
      viewToggleList.classList.remove('bg-indigo-600/40', 'text-white', 'border-indigo-500/50');
      viewToggleList.classList.add('text-slate-400');
      renderProjects();
    });

    viewToggleList.addEventListener('click', () => {
      if (currentViewMode === 'list') return;
      currentViewMode = 'list';
      viewToggleList.classList.add('bg-indigo-600/40', 'text-white', 'border-indigo-500/50');
      viewToggleList.classList.remove('text-slate-400');
      viewToggleCards.classList.remove('bg-indigo-600/40', 'text-white', 'border-indigo-500/50');
      viewToggleCards.classList.add('text-slate-400');
      renderProjects();
    });
  }

  /**
   * Configuração do botão de compartilhar link
   */
  function setupShare() {
    if (!shareBtn) return;

    shareBtn.addEventListener('click', async () => {
      const url = window.location.href;
      const shareData = {
        title: 'Portfólio de Sites | Raul Destefano',
        text: 'Conheça o portfólio de projetos web e sites desenvolvidos por Raul Destefano:',
        url: url
      };

      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        try {
          await navigator.share(shareData);
          return;
        } catch (err) {
          // Usuário cancelou ou navegador não completou o share nativo
        }
      }

      // Fallback para cópia para área de transferência
      try {
        await navigator.clipboard.writeText(url);
        showToast('Link do portfólio copiado para a área de transferência!');
      } catch (err) {
        // Fallback antigo
        const tempInput = document.createElement('input');
        tempInput.value = url;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        showToast('Link do portfólio copiado!');
      }
    });
  }

  /**
   * Exibe notificação Toast
   */
  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }
});
