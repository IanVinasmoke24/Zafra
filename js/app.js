// ==========================================================================
// ZAFRA · Plataforma Agropecuaria Operativa
// Arquitectura de Software Multirrol (Consumidor, Productor, Servicio Social, Admin)
// ==========================================================================

import { store } from "./data.js";

// Helper de Iconografía Vectorial Limpia (SVG)
const Icons = {
  cart: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>`,
  search: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
  mapPin: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
  calendar: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
  check: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
  clock: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  truck: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>`,
  shield: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
  chevronRight: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>`,
  download: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`,
  trendingUp: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>`,
  user: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
  packageIcon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>`
};

class App {
  constructor() {
    try {
      this.currentRole = localStorage.getItem("rm_current_role") || "consumidor";
    } catch (e) {
      this.currentRole = "consumidor";
    }
    this.consumerTab = "inicio";
    this.selectedMunicipality = "todos";
    this.selectedCategory = "todos";
    this.searchQuery = "";
    this.selectedRegionId = "cuautla";
    this.selectedRouteId = "all";
    this.showAllMunicipalities = false;
    this.leafletMap = null;
    this.markersLayer = null;
    this.routeLineLayer = null;

    try {
      const initialHash = window.location.hash.replace("#", "");
      if (["inicio", "catalogo", "mapa", "ferias", "pedidos", "perfil"].includes(initialHash)) {
        this.consumerTab = initialHash;
      }
    } catch (e) {}
    this.currentTileStyle = "satellite-dark";
    this.currentTileLayer = null;
    this.isMapFullscreen = false;

    this.initElements();
    this.bindEvents();
    this.render();

    if (this.currentRole === "consumidor" && this.consumerTab === "mapa") {
      setTimeout(() => this.setupLeafletMap(), 100);
    }
  }

  initElements() {
    this.appEl = document.getElementById("app");
    this.modalRoot = document.getElementById("modal-root");
    this.toastRoot = document.getElementById("toast-root");
    this.offlineBanner = document.getElementById("offline-banner");
  }

  bindEvents() {
    window.addEventListener("online", () => this.updateOnlineStatus());
    window.addEventListener("offline", () => this.updateOnlineStatus());
    this.updateOnlineStatus();

    window.addEventListener("cart-updated", () => this.updateCartBadge());
    window.addEventListener("chat-updated", () => {
      const chatMessages = document.querySelector(".chat-messages");
      if (chatMessages) {
        this.renderChatMessages(chatMessages);
      }
    });

    window.addEventListener("hashchange", () => {
      const hash = window.location.hash.replace("#", "");
      if (["inicio", "catalogo", "mapa", "ferias", "pedidos", "perfil"].includes(hash)) {
        if (this.currentRole === "consumidor" && this.consumerTab !== hash) {
          this.setConsumerTab(hash, false);
        }
      }
    });
  }

  updateOnlineStatus() {
    if (!this.offlineBanner) return;
    if (!navigator.onLine) {
      this.offlineBanner.hidden = false;
      this.offlineBanner.classList.add("active");
      this.offlineBanner.style.setProperty("display", "flex", "important");
      this.offlineBanner.innerHTML = `${Icons.shield} Modo local activo · Los registros se sincronizarán al restablecer la red institucional.`;
    } else {
      this.offlineBanner.hidden = true;
      this.offlineBanner.classList.remove("active");
      this.offlineBanner.style.setProperty("display", "none", "important");
    }
  }

  setRole(role) {
    this.currentRole = role;
    localStorage.setItem("rm_current_role", role);
    this.showToast(`Vista operacional activa: ${this.getRoleLabel(role)}`, "info");
    this.render();
  }

  getRoleLabel(role) {
    switch (role) {
      case "consumidor": return "Consumidor Final";
      case "productor": return "Productor Agrícola";
      case "joven": return "Servicio Social Universitario";
      case "admin": return "Administración Operativa";
      default: return role;
    }
  }

  setConsumerTab(tab, updateHash = true) {
    this.consumerTab = tab;
    if (updateHash && window.location.hash !== `#${tab}`) {
      window.location.hash = tab;
    }
    this.render();
    if (tab === "mapa") {
      setTimeout(() => this.setupLeafletMap(), 60);
    }
  }

  filterCatalogByMuni(muniName) {
    this.selectedMunicipality = muniName;
    this.setConsumerTab("catalogo");
    this.showToast(`Filtrando cosechas de ${muniName}`, "info");
  }

  showToast(message, type = "success") {
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.innerHTML = `
      <span>${Icons.check}</span>
      <span>${message}</span>
    `;
    this.toastRoot.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateX(16px)";
      toast.style.transition = "all 0.2s ease";
      setTimeout(() => toast.remove(), 250);
    }, 2800);
  }

  updateCartBadge() {
    const badge = document.getElementById("header-cart-count");
    if (badge) {
      const cart = store.getCart();
      const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);
      badge.textContent = totalItems;
      badge.style.display = totalItems > 0 ? "inline-flex" : "none";
    }
  }

  render() {
    const cart = store.getCart();
    const cartCount = cart.reduce((acc, item) => acc + item.qty, 0);

    this.appEl.innerHTML = `
      <!-- Top Operational Header -->
      <header class="top-header">
        <div class="brand-section">
          <a href="#" class="brand-logo-link" id="brand-home-link">
            <img src="assets/icon.svg" alt="Zafra" class="brand-logo-img" />
            <div>
              <div class="brand-name">ZAFRA</div>
              <div class="brand-tag">Plataforma Agropecuaria · Morelos</div>
            </div>
          </a>
          <span class="network-badge">
            <span class="network-dot"></span>
            <span>Red Activa: Valles y Altos</span>
          </span>
        </div>

        <nav class="role-segmented-control" aria-label="Cambiar perfil de usuario">
          <button class="role-tab-btn ${this.currentRole === 'consumidor' ? 'active' : ''}" data-role="consumidor">
            Consumidor
          </button>
          <button class="role-tab-btn ${this.currentRole === 'productor' ? 'active' : ''}" data-role="productor">
            Productor
          </button>
          <button class="role-tab-btn ${this.currentRole === 'joven' ? 'active' : ''}" data-role="joven">
            Servicio Social
          </button>
          <button class="role-tab-btn ${this.currentRole === 'admin' ? 'active' : ''}" data-role="admin">
            Administración
          </button>
        </nav>

        <div class="header-actions">
          <button class="btn-header-cart" id="open-cart-btn">
            ${Icons.cart}
            <span>Canasta</span>
            <span class="cart-counter" id="header-cart-count" style="display: ${cartCount > 0 ? 'inline-flex' : 'none'};">${cartCount}</span>
          </button>
        </div>
      </header>

      ${this.renderSubnav()}

      <main class="main-wrapper" id="main-view">
        ${this.renderActiveRoleView()}
      </main>
    `;

    this.bindRoleBarEvents();
    this.bindRoleViewEvents();
  }

  renderSubnav() {
    if (this.currentRole !== "consumidor") return "";

    return `
      <div class="subnav-bar">
        <div class="subnav-tabs">
          <button class="subnav-item ${this.consumerTab === 'inicio' ? 'active' : ''}" data-tab="inicio">
            Resumen General
          </button>
          <button class="subnav-item ${this.consumerTab === 'catalogo' ? 'active' : ''}" data-tab="catalogo">
            Catálogo & Preventas
          </button>
          <button class="subnav-item ${this.consumerTab === 'mapa' ? 'active' : ''}" data-tab="mapa">
            Rutas & Talleres (Mapa)
          </button>
          <button class="subnav-item ${this.consumerTab === 'ferias' ? 'active' : ''}" data-tab="ferias">
            Ferias & Eventos
          </button>
          <button class="subnav-item ${this.consumerTab === 'pedidos' ? 'active' : ''}" data-tab="pedidos">
            Despacho & Seguimiento
          </button>
          <button class="subnav-item ${this.consumerTab === 'perfil' ? 'active' : ''}" data-tab="perfil">
            Punto de Entrega
          </button>
        </div>
      </div>
    `;
  }

  bindRoleBarEvents() {
    this.appEl.querySelectorAll(".role-tab-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        this.setRole(btn.dataset.role);
      });
    });

    const openCartBtn = document.getElementById("open-cart-btn");
    if (openCartBtn) {
      openCartBtn.addEventListener("click", () => this.openCartModal());
    }

    const brandHomeLink = document.getElementById("brand-home-link");
    if (brandHomeLink) {
      brandHomeLink.addEventListener("click", (e) => {
        e.preventDefault();
        this.setRole("consumidor");
        this.setConsumerTab("inicio");
      });
    }
  }

  renderActiveRoleView() {
    switch (this.currentRole) {
      case "consumidor":
        return this.renderConsumerView();
      case "productor":
        return this.renderProducerView();
      case "joven":
        return this.renderYouthView();
      case "admin":
        return this.renderAdminView();
      default:
        return this.renderConsumerView();
    }
  }

  // ==========================================================================
  // 1. VISTA DEL CONSUMIDOR (PROFESIONAL & DIRECTA)
  // ==========================================================================
  renderConsumerView() {
    switch (this.consumerTab) {
      case "inicio":
        return this.renderConsumerHome();
      case "catalogo":
        return this.renderConsumerCatalog();
      case "mapa":
        return this.renderConsumerMap();
      case "ferias":
        return this.renderConsumerEvents();
      case "pedidos":
        return this.renderConsumerOrders();
      case "perfil":
        return this.renderConsumerProfile();
      default:
        return this.renderConsumerHome();
    }
  }

  renderConsumerHome() {
    const profile = store.getUserProfile();
    const products = store.getProducts();
    const inSeason = products.filter(p => p.tags.includes("De temporada") || p.isPreventa);

    return `
      <!-- Hero Banner Operativo -->
      <section class="hero-banner-pro">
        <div class="hero-pro-text">
          <div class="hero-pro-badge">
            ${Icons.shield} Red de Abastecimiento Directo Morelos
          </div>
          <h2 class="hero-pro-title">Cosechas del campo sin intermediación comercial</h2>
          <p class="hero-pro-desc">
            Abastécete de productores verificados de Cuautla, Tlayacapan, Ayala y la región oriente. Al adquirir en preventa garantizas corte matutino, mermas cero y logística a cargo de estudiantes universitarios.
          </p>
          <div class="hero-pro-actions">
            <button class="btn btn-primary" id="hero-explore-btn">
              ${Icons.packageIcon} Explorar Cosechas en Preventa
            </button>
            <button class="btn btn-secondary" id="hero-map-btn">
              ${Icons.mapPin} Consultar Mapa Regional
            </button>
          </div>
        </div>

        <div style="background: rgba(15, 23, 42, 0.7); border: 1px solid rgba(255, 255, 255, 0.15); border-radius: 10px; padding: 18px 22px; min-width: 260px;">
          <div style="font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.05em; color: #a7f3d0; margin-bottom: 4px;">Ciclo Operativo Actual</div>
          <div style="font-size: 1.15rem; font-weight: 700; color: #ffffff;">Temporada Otoño · 2026</div>
          <div style="font-size: 0.8rem; color: #94a3b8; margin: 6px 0 12px;">Corte programado: Jueves y Viernes</div>
          <div style="display: flex; gap: 8px; font-size: 0.76rem; color: #cbd5e1;">
            <span>${Icons.check} Trazabilidad</span>
            <span>·</span>
            <span>${Icons.check} Cero merma</span>
          </div>
        </div>
      </section>

      <!-- Banner de Acceso Rápido a la Cartografía Satelital (API Activa) -->
      <div style="background: linear-gradient(135deg, #09130e 0%, #0d1e16 100%); border: 1px solid #1f3d2e; border-radius: var(--radius-md); padding: 16px 20px; margin-bottom: 24px; display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap; box-shadow: var(--shadow-xs);">
        <div style="display: flex; align-items: center; gap: 14px;">
          <div style="width: 42px; height: 42px; border-radius: 50%; background: rgba(34, 197, 94, 0.15); border: 1px solid rgba(34, 197, 94, 0.35); display: flex; align-items: center; justify-content: center; color: #22c55e; flex-shrink: 0;">
            ${Icons.mapPin}
          </div>
          <div>
            <div style="font-weight: 700; color: #ffffff; font-size: 0.95rem; display: flex; align-items: center; gap: 8px;">
              <span>Cartografía Satelital Zafra · Estado de Morelos</span>
              <span style="font-size: 0.68rem; background: #064e3b; color: #a7f3d0; border: 1px solid #059669; padding: 2px 7px; border-radius: 12px; font-weight: 600;">API Satelital Activa</span>
            </div>
            <div style="font-size: 0.8rem; color: #94a3b8; margin-top: 2px;">Visualizador topográfico con las 6 rutas productivas, talleres y padrón de 15 municipios con estrellas de calificación.</div>
          </div>
        </div>
        <button class="btn btn-primary btn-sm" id="home-goto-map-quick">
          Abrir Mapa Satelital & Rutas ${Icons.chevronRight}
        </button>
      </div>

      <!-- KPI de Abastecimiento Directo -->
      <section class="program-kpi-strip">
        <div class="program-kpi-left">
          <div class="program-icon-box">
            ${Icons.trendingUp}
          </div>
          <div>
            <div class="program-kpi-title">Programa de Abastecimiento Local Directo</div>
            <div class="program-kpi-desc">
              Has completado <strong>${profile.purchasesThisMonth} de ${profile.goalPurchases}</strong> pedidos mensuales. Alcanza la meta para obtener bonificación logística.
            </div>
          </div>
        </div>

        <div style="display: flex; align-items: center; gap: 16px;">
          <div>
            <div style="font-size: 0.72rem; color: var(--text-muted); text-align: right; margin-bottom: 4px; font-weight: 600;">Progreso mensual: 75%</div>
            <div class="progress-track">
              <div class="progress-bar" style="width: ${(profile.purchasesThisMonth / profile.goalPurchases) * 100}%;"></div>
            </div>
          </div>
          <span class="coupon-pill">${profile.rewardCoupon}</span>
        </div>
      </section>

      <!-- Banners de Feria y Taller -->
      <div class="ops-banner-grid">
        <div class="ops-banner">
          <img src="assets/img/feria.jpg" alt="Feria de Productores" class="ops-banner-img" />
          <div class="ops-banner-body">
            <div>
              <span class="ops-banner-tag">Encuentro Mensual</span>
              <h3 class="ops-banner-title">Feria "Del Campo a tu Mesa"</h3>
              <p class="ops-banner-sub">Zócalo de Cuautla · Domingo 15 de Noviembre. Acopio y punto de encuentro con más de 35 parcelas.</p>
            </div>
            <button class="btn btn-secondary btn-sm" id="home-view-fair-btn" style="align-self: flex-start;">
              Detalles de Convocatoria ${Icons.chevronRight}
            </button>
          </div>
        </div>

        <div class="ops-banner">
          <img src="assets/img/taller_huerto.jpg" alt="Taller Comunitario" class="ops-banner-img" />
          <div class="ops-banner-body">
            <div>
              <span class="ops-banner-tag">Formación Técnica</span>
              <h3 class="ops-banner-title">Taller: Huerto Biointensivo</h3>
              <p class="ops-banner-sub">Impartido por brigadistas de agronomía UAEM en Huerto El Caracol, Yautepec.</p>
            </div>
            <button class="btn btn-secondary btn-sm" id="home-view-workshop-btn" style="align-self: flex-start;">
              Consultar Programa ($180 MXN) ${Icons.chevronRight}
            </button>
          </div>
        </div>
      </div>

      <!-- Sección de Cosechas en Preventa -->
      <div class="page-header" style="margin-bottom: 16px;">
        <div>
          <h3 class="page-title" style="font-size: 1.25rem;">Cosechas Disponibles en Preventa</h3>
          <p class="page-subtitle">Productos asignados para corte esta semana en parcelas aliadas</p>
        </div>
        <button class="btn btn-ghost btn-sm" id="home-see-all-catalog">
          Ver Catálogo Completo ${Icons.chevronRight}
        </button>
      </div>

      <div class="catalog-grid">
        ${inSeason.slice(0, 4).map(prod => this.renderProductCard(prod)).join("")}
      </div>
    `;
  }

  renderConsumerCatalog() {
    const products = store.getProducts();
    const municipalities = ["todos", "Cuautla", "Tlayacapan", "Yecapixtla", "Tetela del Volcán", "Ayala", "Yautepec"];
    const categories = ["todos", "Hortalizas", "Frutas", "Granos y Maíces", "Granos y Transformados", "Flores y Plantas"];

    const filtered = products.filter(p => {
      const matchMuni = this.selectedMunicipality === "todos" || p.municipality === this.selectedMunicipality;
      const matchCat = this.selectedCategory === "todos" || p.category === this.selectedCategory;
      const matchSearch = !this.searchQuery || 
        p.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        p.producerName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        p.municipality.toLowerCase().includes(this.searchQuery.toLowerCase());
      return matchMuni && matchCat && matchSearch;
    });

    return `
      <div class="page-header">
        <div>
          <h2 class="page-title">Catálogo de Cosechas y Preventa</h2>
          <p class="page-subtitle">Pedidos programados antes del corte: el campesino cosecha únicamente el volumen confirmado</p>
        </div>
        <div style="font-size: 0.82rem; color: var(--text-muted); font-weight: 500;">
          ${filtered.length} productos listados
        </div>
      </div>

      <div class="filter-toolbar">
        <div class="search-field-wrap">
          <span class="search-field-icon">${Icons.search}</span>
          <input 
            type="text" 
            class="search-field-input" 
            id="catalog-search-input" 
            placeholder="Buscar cultivo, ej. jitomate riñón, amaranto, arroz morelos o productor..."
            value="${this.searchQuery}"
          />
        </div>

        <div style="display: flex; flex-direction: column; gap: 8px;">
          <div style="display: flex; align-items: center; justify-content: space-between;">
            <span style="font-size: 0.72rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted);">
              Región / Municipio de Origen:
            </span>
            ${this.selectedMunicipality !== 'todos' || this.selectedCategory !== 'todos' ? `
              <button class="btn btn-ghost btn-sm" id="reset-filters-btn" style="padding: 2px 6px; font-size: 0.75rem;">Limpiar filtros</button>
            ` : ''}
          </div>
          <div class="filter-segments-row" id="muni-pills">
            ${municipalities.map(m => `
              <button class="filter-chip ${this.selectedMunicipality === m ? 'active' : ''}" data-muni="${m}">
                ${m === 'todos' ? 'Todo Morelos' : m}
              </button>
            `).join("")}
          </div>
        </div>

        <div style="display: flex; flex-direction: column; gap: 8px;">
          <span style="font-size: 0.72rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted);">
            Categoría Agropecuaria:
          </span>
          <div class="filter-segments-row" id="cat-pills">
            ${categories.map(c => `
              <button class="filter-chip ${this.selectedCategory === c ? 'active' : ''}" data-cat="${c}">
                ${c === 'todos' ? 'Todas las categorías' : c}
              </button>
            `).join("")}
          </div>
        </div>
      </div>

      ${filtered.length === 0 ? `
        <div style="text-align: center; padding: 48px; background: #fff; border-radius: 8px; border: 1px solid var(--ui-border);">
          <p style="font-size: 0.95rem; color: var(--text-muted); margin-bottom: 12px;">No se encontraron lotes activos con los filtros indicados.</p>
          <button class="btn btn-secondary btn-sm" id="reset-filters-btn-empty">Reestablecer Parámetros de Búsqueda</button>
        </div>
      ` : `
        <div class="catalog-grid">
          ${filtered.map(p => this.renderProductCard(p)).join("")}
        </div>
      `}
    `;
  }

  renderProductCard(prod) {
    return `
      <article class="product-item" data-product-id="${prod.id}">
        <div class="product-image-container">
          <img src="${prod.image}" alt="${prod.name}" class="product-img" loading="lazy" />
          ${prod.isPreventa ? `
            <span class="tag-badge">
              ${Icons.clock} Preventa
            </span>
          ` : ''}
          ${prod.tags.includes("Sin agroquímicos") ? `
            <span class="tag-badge organic">Agroecológico</span>
          ` : ''}
          ${prod.tags.includes("Denominación de Origen") ? `
            <span class="tag-badge do">D.O. Morelos</span>
          ` : ''}
        </div>

        <div class="product-content">
          <div class="product-location">
            ${Icons.mapPin} ${prod.municipality}, Morelos
          </div>
          <h4 class="product-heading">${prod.name}</h4>
          
          <button class="product-producer-link" data-producer-id="${prod.producerId}">
            <span>${prod.producerName}</span>
            <span>${Icons.chevronRight}</span>
          </button>

          <div class="product-harvest-info">
            ${Icons.calendar}
            <span>${prod.harvestDate}</span>
          </div>

          <div class="product-card-bottom">
            <div class="product-price-meta">
              <span class="price-figure">$${prod.price.toFixed(2)}</span>
              <span class="price-sub">MXN / ${prod.unit}</span>
            </div>

            <button class="btn btn-primary btn-sm" data-add-id="${prod.id}">
              ${Icons.cart}
              <span>Añadir</span>
            </button>
          </div>
        </div>
      </article>
    `;
  }

  // ==========================================================================
  // MAPA REGIONAL DE SABORES & RUTAS DE MORELOS (ZAFRA)
  // Exact Dark Satellite Theme & 15 Municipalities Telemetry Table
  // ==========================================================================
  renderConsumerMap() {
    const routes = store.getZafraRoutes();
    const municipalities = store.getMapMunicipalities();
    const activeRoute = this.selectedRouteId === "all" ? null : routes.find(r => r.id === this.selectedRouteId);

    return `
      <div class="page-header">
        <div>
          <div style="font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted); font-weight: 700;">
            Cartografía Oficial Zafra · Estado de Morelos
          </div>
          <h2 class="page-title">Rutas Productivas y Ubicaciones para Talleres</h2>
          <p class="page-subtitle">Organización regional para articulación de talleres formativos, búsqueda de productores y acopio directo</p>
        </div>
        <div style="font-size: 0.8rem; color: var(--text-muted); font-weight: 500;">
          15 municipios prioritarios vinculados
        </div>
      </div>

      <!-- Outer Dark Map Module Container (Matches User Image) -->
      <div class="map-module-wrapper">
        <!-- Top Toolbar with 6 Route Pills -->
        <div class="map-control-header">
          <div class="map-route-pills" id="map-route-selector">
            <button class="route-pill-btn ${this.selectedRouteId === 'all' ? 'active' : ''}" data-route-id="all">
              <span>Todas las Rutas (Vista General)</span>
            </button>
            ${routes.map(r => `
              <button class="route-pill-btn ${this.selectedRouteId === r.id ? 'active' : ''}" data-route-id="${r.id}">
                <span class="route-color-dot" style="background: ${r.color};"></span>
                <span>${r.shortName}</span>
              </button>
            `).join("")}
          </div>

          <div style="font-size: 0.75rem; color: #94a3b8; display: flex; align-items: center; gap: 8px;">
            <span>★ Calificación promedio de parcelas</span>
          </div>
        </div>

        <!-- Leaflet Map Canvas (Dark Satellite / CartoDB Dark Matter) -->
        <div class="map-canvas-container" id="map-canvas-wrapper">
          <div id="zafra-leaflet-map" class="${this.currentTileStyle === 'satellite-dark' ? 'satellite-dark-mode' : ''}"></div>

          <!-- Top-Right Fullscreen Expand Button matching Image -->
          <button class="map-overlay-btn map-fullscreen-btn" id="map-fullscreen-toggle" title="Pantalla completa del mapa">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
            </svg>
          </button>

          <!-- Top-Left Tile API Switcher -->
          <div class="map-style-switcher" id="map-style-switcher">
            <button class="map-style-btn ${this.currentTileStyle === 'satellite-dark' ? 'active' : ''}" data-style="satellite-dark">
              <span>Satelital Nocturno</span>
            </button>
            <button class="map-style-btn ${this.currentTileStyle === 'carto-dark' ? 'active' : ''}" data-style="carto-dark">
              <span>Dark Matter</span>
            </button>
            <button class="map-style-btn ${this.currentTileStyle === 'osm' ? 'active' : ''}" data-style="osm">
              <span>Topográfico</span>
            </button>
          </div>

          <!-- Bottom-Right Info Icon matching Image -->
          <div class="map-overlay-info" id="map-info-toggle" title="Cartografía Oficial Zafra · ESRI Satellite / CartoDB / INEGI Morelos">
            <span>i</span>
          </div>
        </div>

        <!-- Route Details Banner Container -->
        <div id="route-detail-banner-container">
          ${this.renderRouteDetailBanner(activeRoute)}
        </div>

        <!-- Dark Data Table Matching the User's Image -->
        <div class="dark-table-section">
          <div class="dark-table-header-title">Principales productos que puede buscar Zafra</div>
          <div class="dark-table-subtitle">Padrón de municipios y vocación agropecuaria identificada en Morelos</div>

          <table class="dark-products-table">
            <thead>
              <tr>
                <th style="width: 220px;">Municipio</th>
                <th>Principales productos que puede buscar Zafra</th>
              </tr>
            </thead>
            <tbody>
              ${(this.showAllMunicipalities ? municipalities : municipalities.slice(0, 15)).map(m => `
                <tr class="dark-table-row" data-muni="${m.name}" style="cursor: pointer;" title="Hacer clic para enfocar en el mapa">
                  <td class="col-muni">
                    ${m.num}. ${m.name}
                  </td>
                  <td class="col-prod">
                    ${m.productsSummary}
                  </td>
                </tr>
              `).join("")}
            </tbody>
          </table>

          <div style="display: flex; justify-content: center; margin-top: 14px;">
            <button class="dark-table-expand-indicator" id="toggle-muni-expand-btn" title="${this.showAllMunicipalities ? 'Ver solo los 15 prioritarios' : 'Desplegar todos los municipios de las 6 rutas'}">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="transform: ${this.showAllMunicipalities ? 'rotate(180deg)' : 'none'}; transition: transform 0.2s ease;">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <polyline points="19 12 12 19 5 12"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </div>
    `;
  }

  // ==========================================================================
  // FERIAS & EVENTOS DE ZAFRA (12 EVENTOS OFICIALES)
  // ==========================================================================
  renderConsumerEvents() {
    const fairs = store.getZafraFairs();

    return `
      <div class="page-header">
        <div>
          <div style="font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted); font-weight: 700;">
            Agenda Estatal de Encuentros Comerciales y Comunitarios
          </div>
          <h2 class="page-title">Ferias y Eventos de Zafra</h2>
          <p class="page-subtitle">Espacios itinerantes de comercialización directa, vinculación comunitaria y exhibición juvenil</p>
        </div>
        <div style="font-size: 0.8rem; color: var(--text-muted); font-weight: 500;">
          12 ferias y mercados programados
        </div>
      </div>

      <div class="fairs-events-grid">
        ${fairs.map((fair, idx) => `
          <div class="fair-event-card">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 4px;">
                <span class="fair-num-badge">Evento ${idx + 1} · ${fair.type}</span>
                <span style="font-size: 0.75rem; color: var(--brand-primary); font-weight: 600;">${fair.date}</span>
              </div>
              <h4 style="font-family: var(--font-heading); font-size: 1.1rem; font-weight: 700; color: var(--text-main); margin-bottom: 6px;">
                ${fair.name}
              </h4>
              <div style="font-size: 0.78rem; color: var(--text-muted); display: flex; align-items: center; gap: 6px; margin-bottom: 10px;">
                ${Icons.mapPin} ${fair.location}
              </div>
              <p style="font-size: 0.84rem; color: var(--text-secondary); line-height: 1.45; margin-bottom: 14px;">
                ${fair.focus}
              </p>
            </div>

            <div style="padding-top: 10px; border-top: 1px solid var(--ui-divider); display: flex; align-items: center; justify-content: space-between;">
              <span style="font-size: 0.75rem; color: var(--status-success); font-weight: 600;">Entrada Libre</span>
              <button class="btn btn-secondary btn-sm fair-rsvp-btn" data-fair-name="${fair.name}">
                Registrar Visita
              </button>
            </div>
          </div>
        `).join("")}
      </div>
    `;
  }

  renderRouteDetailBanner(activeRoute) {
    if (!activeRoute) {
      return `
        <div class="route-detail-banner" style="grid-template-columns: 1fr;">
          <div style="font-size: 0.82rem; color: #94a3b8; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px;">
            <span>Selecciona una de las <strong>6 Rutas de Zafra</strong> en la barra superior para ver sus talleres formativos específicos y trazado en el mapa.</span>
            <span style="color: #cbd5e1; font-size: 0.75rem;">* Ubicaciones sujetas a confirmación con productores anfitriones</span>
          </div>
        </div>
      `;
    }

    return `
      <div class="route-detail-banner">
        <div>
          <div class="route-banner-block-title" style="color: ${activeRoute.color};">
            ${Icons.mapPin} ${activeRoute.name}
          </div>
          <div style="font-size: 0.82rem; color: #cbd5e1; margin-bottom: 6px; line-height: 1.4;">
            ${activeRoute.description}
          </div>
          <div style="font-size: 0.74rem; color: #94a3b8;">
            <strong>Sedes anfitrionas:</strong> ${activeRoute.locations.join(", ")}
          </div>
        </div>

        <div>
          <div class="route-banner-block-title">
            ${Icons.calendar} Talleres que Imparte la Ruta
          </div>
          <div class="route-tags-flex">
            ${activeRoute.workshops.map(w => `
              <span class="route-tag-pill" style="border-left: 2px solid ${activeRoute.color};">
                ${w}
              </span>
            `).join("")}
          </div>
        </div>

        <div>
          <div class="route-banner-block-title">
            ${Icons.packageIcon} Productos Característicos
          </div>
          <div class="route-tags-flex">
            ${activeRoute.products.map(p => `
              <span class="route-tag-pill">
                ${p}
              </span>
            `).join("")}
          </div>
        </div>
      </div>
    `;
  }

  setupLeafletMap() {
    const mapEl = document.getElementById("zafra-leaflet-map");
    if (!mapEl) return;

    if (typeof L === "undefined") {
      mapEl.innerHTML = `
        <div style="color: #94a3b8; padding: 40px; text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%;">
          <div style="font-weight: 600; font-size: 1rem; margin-bottom: 8px; color: #ffffff;">Conectando con la API Cartográfica de Morelos...</div>
          <div style="font-size: 0.8rem; color: #64748b;">Descargando capas satelitales y vectoriales de la red Zafra.</div>
        </div>
      `;
      setTimeout(() => this.setupLeafletMap(), 250);
      return;
    }

    if (this.leafletMap) {
      try {
        this.leafletMap.remove();
      } catch (e) {}
      this.leafletMap = null;
    }

    this.leafletMap = L.map("zafra-leaflet-map", {
      zoomControl: true,
      attributionControl: false
    }).setView([18.80, -99.02], 10);

    this.setMapTileLayer(this.currentTileStyle || "satellite-dark");

    this.markersLayer = L.layerGroup().addTo(this.leafletMap);
    this.routeLineLayer = L.layerGroup().addTo(this.leafletMap);

    this.renderMapEntities();

    // Critical Leaflet resize invalidation to prevent blank or clipped tiles
    this.leafletMap.whenReady(() => {
      this.leafletMap.invalidateSize();
    });
    setTimeout(() => {
      if (this.leafletMap) this.leafletMap.invalidateSize();
    }, 120);
    setTimeout(() => {
      if (this.leafletMap) this.leafletMap.invalidateSize();
    }, 450);
  }

  setMapTileLayer(styleName) {
    if (!this.leafletMap) return;
    this.currentTileStyle = styleName;

    if (this.currentTileLayer) {
      this.leafletMap.removeLayer(this.currentTileLayer);
      this.currentTileLayer = null;
    }

    const mapContainer = document.getElementById("zafra-leaflet-map");

    if (styleName === "satellite-dark") {
      if (mapContainer) mapContainer.classList.add("satellite-dark-mode");
      this.currentTileLayer = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
        maxZoom: 18,
        attribution: "Esri Satellite Imagery"
      });
    } else if (styleName === "carto-dark") {
      if (mapContainer) mapContainer.classList.remove("satellite-dark-mode");
      this.currentTileLayer = L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
        maxZoom: 18,
        subdomains: "abcd",
        attribution: "CartoDB Dark Matter"
      });
    } else {
      if (mapContainer) mapContainer.classList.remove("satellite-dark-mode");
      this.currentTileLayer = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 18,
        attribution: "OpenStreetMap"
      });
    }

    this.currentTileLayer.addTo(this.leafletMap);

    this.currentTileLayer.on("tileerror", () => {
      console.warn("Tile error on " + styleName + ", falling back to CartoDB Dark Matter.");
      if (styleName !== "carto-dark") {
        this.setMapTileLayer("carto-dark");
      }
    });

    document.querySelectorAll("#map-style-switcher .map-style-btn").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.style === styleName);
    });
  }

  renderMapEntities() {
    if (!this.leafletMap || !this.markersLayer || !this.routeLineLayer) return;

    this.markersLayer.clearLayers();
    this.routeLineLayer.clearLayers();

    const municipalities = store.getMapMunicipalities();
    const routes = store.getZafraRoutes();
    const activeRoute = this.selectedRouteId === "all" ? null : routes.find(r => r.id === this.selectedRouteId);

    // Custom dark pill markers matching user screenshot
    municipalities.forEach(m => {
      const isIncluded = !activeRoute || m.routeIds.includes(this.selectedRouteId);

      const customIcon = L.divIcon({
        className: "zafra-marker-wrapper",
        html: `
          <div class="zafra-map-marker ${isIncluded ? 'active' : ''}" style="${!isIncluded ? 'opacity: 0.35; filter: grayscale(0.8);' : ''}" data-muni="${m.name}">
            <span class="star-score">★ ${m.rating.toFixed(1)}</span>
            <span>${m.name}</span>
          </div>
        `,
        iconSize: null,
        iconAnchor: [38, 12]
      });

      const marker = L.marker([m.lat, m.lng], { icon: customIcon }).addTo(this.markersLayer);
      
      marker.bindPopup(`
        <div style="font-family: var(--font-sans); padding: 4px; min-width: 190px;">
          <div style="font-weight: 700; font-size: 13px; color: #ffffff; margin-bottom: 2px;">★ ${m.rating.toFixed(1)} ${m.name}</div>
          <div style="font-size: 11px; color: #94a3b8; line-height: 1.4; margin-bottom: 8px;">${m.productsSummary}</div>
          <button class="btn btn-primary btn-sm" onclick="window.app.filterCatalogByMuni('${m.name}')" style="width: 100%; font-size: 11px; padding: 4px 8px;">
            Ver Cosechas en Catálogo
          </button>
        </div>
      `);
    });

    // Draw route polyline
    if (activeRoute) {
      const routeMunis = municipalities.filter(m => m.routeIds.includes(this.selectedRouteId));
      if (routeMunis.length > 1) {
        const coords = routeMunis.map(m => [m.lat, m.lng]);
        L.polyline(coords, {
          color: activeRoute.color,
          weight: 3.5,
          opacity: 0.9,
          dashArray: "6, 8"
        }).addTo(this.routeLineLayer);

        this.leafletMap.fitBounds(coords, { padding: [40, 40], maxZoom: 12 });
      }
    }
  }

  // ==========================================================================
  // DESPACHO & SEGUIMIENTO (TIMELINE & CHAT)
  // ==========================================================================
  renderConsumerOrders() {
    const orders = store.getConsumerOrders();
    const chat = store.getChat();

    return `
      <div class="page-header">
        <div>
          <h2 class="page-title">Despacho, Trazabilidad y Comunicación</h2>
          <p class="page-subtitle">Monitoreo en tiempo real de cosechas programadas y canal directo con brigadistas y productores</p>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1.3fr 1fr; gap: 24px;">
        <!-- Orders list -->
        <div>
          ${orders.map(order => `
            <div style="background: #fff; border: 1px solid var(--ui-border); border-radius: var(--radius-md); padding: 20px; margin-bottom: 16px; box-shadow: var(--shadow-xs);">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 14px;">
                <div>
                  <div style="font-size: 0.72rem; font-weight: 600; text-transform: uppercase; color: var(--text-muted);">Folio Oficial de Despacho</div>
                  <h4 style="font-family: var(--font-heading); font-size: 1.15rem; font-weight: 700;">${order.id}</h4>
                  <div style="font-size: 0.78rem; color: var(--text-muted);">${order.date}</div>
                </div>
                <span style="background: var(--brand-surface-tint); color: var(--brand-primary); border: 1px solid var(--brand-subtle); font-size: 0.75rem; font-weight: 600; padding: 4px 10px; border-radius: var(--radius-xs);">
                  ${order.deliveryType === 'domicilio' ? 'Entrega Domiciliar' : 'Punto de Acopio'}
                </span>
              </div>

              <!-- Stepper -->
              <div style="background: #f8fafc; border: 1px solid var(--ui-border); border-radius: var(--radius-sm); padding: 14px 16px; margin: 16px 0;">
                <div style="display: grid; grid-template-columns: repeat(4, 1fr); text-align: center; font-size: 0.75rem;">
                  <div>
                    <div style="color: var(--status-success); font-weight: 700;">${Icons.check} Confirmado</div>
                  </div>
                  <div>
                    <div style="color: var(--status-success); font-weight: 700;">${Icons.check} En Cosecha</div>
                  </div>
                  <div>
                    <div style="color: var(--brand-primary); font-weight: 700;">${Icons.truck} En Tránsito</div>
                  </div>
                  <div>
                    <div style="color: var(--text-muted);">Entregado</div>
                  </div>
                </div>
              </div>

              <!-- Brigadista Asignado -->
              <div style="display: flex; align-items: center; justify-content: space-between; background: #fbfcfe; border: 1px solid var(--ui-border); padding: 10px 14px; border-radius: var(--radius-xs); margin-bottom: 14px;">
                <div>
                  <span style="font-size: 0.7rem; font-weight: 600; text-transform: uppercase; color: var(--text-muted);">Brigadista Asignado:</span>
                  <div style="font-size: 0.88rem; font-weight: 600; color: var(--text-main);">${order.assignedYouth}</div>
                </div>
                <button class="btn btn-secondary btn-sm" id="focus-chat-btn">
                  Abrir Mensajes
                </button>
              </div>

              <!-- Content Breakdown -->
              <div style="font-size: 0.82rem; border-top: 1px solid var(--ui-divider); padding-top: 12px;">
                <div style="color: var(--text-muted); font-size: 0.72rem; font-weight: 600; text-transform: uppercase; margin-bottom: 6px;">Contenido del Lote:</div>
                ${order.items.map(it => `
                  <div style="display: flex; justify-content: space-between; margin-bottom: 4px; color: var(--text-secondary);">
                    <span>${it.qty}x ${it.name} (${it.producer})</span>
                    <span style="font-weight: 600;">$${(it.qty * it.price).toFixed(2)}</span>
                  </div>
                `).join("")}
                <div style="display: flex; justify-content: space-between; border-top: 1px solid var(--ui-border); padding-top: 8px; margin-top: 8px; font-weight: 700; font-size: 0.95rem; color: var(--text-main);">
                  <span>Total Liquidado:</span>
                  <span>$${order.total.toFixed(2)} MXN</span>
                </div>
              </div>
            </div>
          `).join("")}
        </div>

        <!-- Chat Panel -->
        <div style="background: #fff; border: 1px solid var(--ui-border); border-radius: var(--radius-md); overflow: hidden; display: flex; flex-direction: column; height: 500px; box-shadow: var(--shadow-xs);">
          <div style="background: #f8fafc; border-bottom: 1px solid var(--ui-border); padding: 12px 16px; display: flex; align-items: center; justify-content: space-between;">
            <div>
              <div style="font-size: 0.88rem; font-weight: 700; color: var(--text-main);">Canal Operativo Directo</div>
              <div style="font-size: 0.72rem; color: var(--text-muted);">Consumidor · Brigadista · Productor</div>
            </div>
            <span class="network-badge" style="background: #ffffff; color: var(--text-secondary);">Activo</span>
          </div>

          <div class="chat-messages" style="flex: 1; overflow-y: auto; padding: 16px; display: flex; flex-direction: column; gap: 10px; background: #ffffff;">
            ${this.renderChatBubbles(chat)}
          </div>

          <form id="consumer-chat-form" style="display: flex; gap: 8px; padding: 12px; border-top: 1px solid var(--ui-border); background: #f8fafc;">
            <input type="text" id="consumer-chat-input" class="form-input-control" placeholder="Escribe un mensaje de coordinación..." required />
            <button type="submit" class="btn btn-primary btn-sm">Enviar</button>
          </form>
        </div>
      </div>
    `;
  }

  renderChatBubbles(chat) {
    return chat.map(m => `
      <div style="align-self: ${m.role === 'consumidor' ? 'flex-end' : 'flex-start'}; max-width: 82%; background: ${m.role === 'consumidor' ? 'var(--brand-primary)' : '#f1f5f9'}; color: ${m.role === 'consumidor' ? '#ffffff' : 'var(--text-main)'}; padding: 8px 12px; border-radius: var(--radius-sm); font-size: 0.84rem; line-height: 1.4;">
        <div style="font-size: 0.7rem; font-weight: 600; opacity: 0.85; margin-bottom: 2px;">${m.sender}</div>
        <div>${m.text}</div>
        <div style="font-size: 0.65rem; opacity: 0.7; text-align: right; margin-top: 4px;">${m.time}</div>
      </div>
    `).join("");
  }

  renderChatMessages(container) {
    const chat = store.getChat();
    container.innerHTML = this.renderChatBubbles(chat);
    container.scrollTop = container.scrollHeight;
  }

  // ==========================================================================
  // PERFIL DE ENTREGA
  // ==========================================================================
  renderConsumerProfile() {
    const profile = store.getUserProfile();

    return `
      <div class="page-header">
        <div>
          <h2 class="page-title">Datos Fiscales y Domicilio de Entrega</h2>
          <p class="page-subtitle">Configuración de recepción para rutas de reparto local y puntos comunitarios</p>
        </div>
      </div>

      <div style="max-width: 640px; background: #fff; border: 1px solid var(--ui-border); border-radius: var(--radius-md); padding: 24px; box-shadow: var(--shadow-xs);">
        <form id="profile-form">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 14px;">
            <div class="form-group-item">
              <label class="form-label-title">Nombre o Razón Social</label>
              <input type="text" class="form-input-control" name="name" value="${profile.name}" required />
            </div>
            <div class="form-group-item">
              <label class="form-label-title">Teléfono Móvil (WhatsApp)</label>
              <input type="tel" class="form-input-control" name="phone" value="${profile.phone}" required />
            </div>
          </div>

          <div class="form-group-item">
            <label class="form-label-title">Correo Electrónico de Notificaciones</label>
            <input type="email" class="form-input-control" name="email" value="${profile.email}" required />
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 14px;">
            <div class="form-group-item">
              <label class="form-label-title">Municipio</label>
              <select class="form-input-control" name="municipality">
                <option value="Cuautla" ${profile.municipality === 'Cuautla' ? 'selected' : ''}>Cuautla</option>
                <option value="Yautepec" ${profile.municipality === 'Yautepec' ? 'selected' : ''}>Yautepec</option>
                <option value="Ayala" ${profile.municipality === 'Ayala' ? 'selected' : ''}>Ayala</option>
                <option value="Tlayacapan" ${profile.municipality === 'Tlayacapan' ? 'selected' : ''}>Tlayacapan</option>
                <option value="Yecapixtla" ${profile.municipality === 'Yecapixtla' ? 'selected' : ''}>Yecapixtla</option>
                <option value="Tetela del Volcán" ${profile.municipality === 'Tetela del Volcán' ? 'selected' : ''}>Tetela del Volcán</option>
              </select>
            </div>
            <div class="form-group-item">
              <label class="form-label-title">Ventana Horaria de Recepción</label>
              <select class="form-input-control" name="preferredTime">
                <option value="Matutino (10:00 - 13:00 hrs)" ${profile.preferredTime.includes('Matutino') ? 'selected' : ''}>Matutino (10:00 - 13:00 hrs)</option>
                <option value="Vespertino (14:00 - 18:00 hrs)" ${profile.preferredTime.includes('Vespertino') ? 'selected' : ''}>Vespertino (14:00 - 18:00 hrs)</option>
              </select>
            </div>
          </div>

          <div class="form-group-item">
            <label class="form-label-title">Dirección de Entrega</label>
            <input type="text" class="form-input-control" name="address" value="${profile.address}" required />
          </div>

          <div class="form-group-item">
            <label class="form-label-title">Referencias de Localización</label>
            <textarea class="form-input-control" name="references" rows="2">${profile.references}</textarea>
          </div>

          <button type="submit" class="btn btn-primary btn-block">
            Guardar Parámetros de Perfil
          </button>
        </form>
      </div>
    `;
  }

  // ==========================================================================
  // 2. VISTA DEL PRODUCTOR (PANEL OPERATIVO AGRÍCOLA)
  // ==========================================================================
  renderProducerView() {
    const producer = store.getProducers()[0]; // Don Chente
    const products = store.getProducts().filter(p => p.producerId === producer.id);

    return `
      <div class="page-header">
        <div>
          <div style="font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted); font-weight: 700;">
            Padrón de Productores · Folio MOR-TLY-004
          </div>
          <h2 class="page-title">${producer.ranchName} · ${producer.name}</h2>
          <div class="page-subtitle">${producer.municipality}, Morelos · ${producer.yearsFarming} años de experiencia agrícola</div>
        </div>
        <div style="display: flex; gap: 8px;">
          <button class="btn btn-primary btn-sm" id="prod-open-add-crop">
            + Registrar Nuevo Lote de Cosecha
          </button>
        </div>
      </div>

      <!-- KPI Summary Cards -->
      <div class="kpi-row">
        <div class="kpi-box">
          <span class="kpi-caption">Ingresos Netos Plataforma</span>
          <div class="kpi-number">$18,450</div>
          <span class="kpi-pill">${Icons.trendingUp} +100% vs intermediario</span>
        </div>

        <div class="kpi-box">
          <span class="kpi-caption">Volumen Comprometido (Corte)</span>
          <div class="kpi-number">92 kg</div>
          <span style="font-size: 0.76rem; color: var(--text-muted);">Corte Jueves 30 de Octubre</span>
        </div>

        <div class="kpi-box">
          <span class="kpi-caption">Retención Directa</span>
          <div class="kpi-number">90%</div>
          <span style="font-size: 0.76rem; color: var(--status-success);">Comisión 10% fija</span>
        </div>

        <div class="kpi-box">
          <span class="kpi-caption">Estatus Fitosanitario</span>
          <div class="kpi-number" style="font-size: 1.4rem; color: var(--status-success);">Verificado</div>
          <span style="font-size: 0.76rem; color: var(--text-muted);">Visita técnica aprobada</span>
        </div>
      </div>

      <!-- Comparativa de Rendimiento Directo -->
      <div class="table-card" style="padding: 20px; margin-bottom: 24px;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px;">
          <div>
            <h4 style="font-family: var(--font-heading); font-size: 1.05rem; font-weight: 700;">
              Análisis Comparativo: Venta Directa en Zafra vs Intermediario Tradicional
            </h4>
            <div style="font-size: 0.8rem; color: var(--text-muted);">
              Cálculo estimado sobre 500 kg de hortalizas cosechadas al mes
            </div>
          </div>
          <div style="background: var(--brand-surface-tint); border: 1px solid var(--brand-subtle); padding: 8px 14px; border-radius: var(--radius-sm); text-align: right;">
            <span style="font-size: 0.72rem; color: var(--brand-primary); font-weight: 600;">Utilidad adicional neta:</span>
            <div style="font-size: 1.15rem; font-weight: 800; color: var(--brand-primary); font-variant-numeric: tabular-nums;">
              +$9,250 MXN
            </div>
          </div>
        </div>

        <!-- Progress Benchmark Bar -->
        <div style="display: flex; flex-direction: column; gap: 10px;">
          <div>
            <div style="display: flex; justify-content: space-between; font-size: 0.84rem; font-weight: 600; margin-bottom: 4px;">
              <span>En Zafra (Comercio Justo con Liquidación Directa)</span>
              <span style="color: var(--status-success);">$18,450 MXN (90% del valor de venta)</span>
            </div>
            <div style="height: 14px; background: #e2e8f0; border-radius: var(--radius-full); overflow: hidden;">
              <div style="height: 100%; width: 90%; background: var(--brand-primary);"></div>
            </div>
          </div>

          <div>
            <div style="display: flex; justify-content: space-between; font-size: 0.84rem; font-weight: 600; margin-bottom: 4px;">
              <span>Intermediario Tradicional (Precios castigados a pie de parcela)</span>
              <span style="color: var(--text-muted);">$9,200 MXN (44% del valor de mercado)</span>
            </div>
            <div style="height: 14px; background: #e2e8f0; border-radius: var(--radius-full); overflow: hidden;">
              <div style="height: 100%; width: 44%; background: #94a3b8;"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Pedidos y Programa de Corte -->
      <div class="table-card">
        <div class="table-card-header">
          <div>
            <div class="table-card-title">Programa de Corte Inmediato (Preventas Validadas)</div>
            <div style="font-size: 0.8rem; color: var(--text-muted);">Corta estrictamente la cantidad comprometida para garantizar cero merma</div>
          </div>
          <button class="btn btn-primary btn-sm" id="btn-mark-harvest-ready">
            Confirmar Lotes Listos para Recolección
          </button>
        </div>

        <div class="data-table-wrapper">
          <table class="data-table">
            <thead>
              <tr>
                <th>Cultivo</th>
                <th>Pedidos Asignados</th>
                <th>Volumen de Corte</th>
                <th>Fecha Límite</th>
                <th>Importe Neto</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="font-weight: 600; color: var(--text-main);">Jitomate Riñón Criollo</td>
                <td>14 órdenes</td>
                <td style="font-weight: 700; color: var(--brand-primary);">46.0 kg</td>
                <td>Jueves 07:30 hrs</td>
                <td>$1,472.00</td>
                <td><span style="background: #fef3c7; color: #92400e; font-size: 0.72rem; padding: 2px 6px; border-radius: 4px; font-weight: 600;">En recolección</span></td>
              </tr>
              <tr>
                <td style="font-weight: 600; color: var(--text-main);">Ejote Criollo Tierno</td>
                <td>8 órdenes</td>
                <td style="font-weight: 700; color: var(--brand-primary);">24.0 kg</td>
                <td>Jueves 08:00 hrs</td>
                <td>$720.00</td>
                <td><span style="background: #fef3c7; color: #92400e; font-size: 0.72rem; padding: 2px 6px; border-radius: 4px; font-weight: 600;">En recolección</span></td>
              </tr>
              <tr>
                <td style="font-weight: 600; color: var(--text-main);">Nopal Cambray Desespinado</td>
                <td>11 órdenes</td>
                <td style="font-weight: 700; color: var(--brand-primary);">22.0 kg</td>
                <td>Jueves 08:30 hrs</td>
                <td>$550.00</td>
                <td><span style="background: #fef3c7; color: #92400e; font-size: 0.72rem; padding: 2px 6px; border-radius: 4px; font-weight: 600;">En recolección</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Catálogo de Lotes del Productor -->
      <div class="page-header" style="margin-top: 28px;">
        <div>
          <h3 class="page-title" style="font-size: 1.15rem;">Lotes Publicados en Catálogo</h3>
          <p class="page-subtitle">Control de precios por unidad y activación o pausa temporal de disponibilidad</p>
        </div>
      </div>

      <div class="catalog-grid">
        ${products.map(p => `
          <div class="product-item">
            <div class="product-image-container">
              <img src="${p.image}" alt="${p.name}" class="product-img" />
              <span class="tag-badge">${p.isPreventa ? 'Preventa' : 'Inmediato'}</span>
            </div>
            <div class="product-content">
              <h4 class="product-heading">${p.name}</h4>
              <div style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 8px;">
                Precio actual: <strong>$${p.price.toFixed(2)} / ${p.unit}</strong>
              </div>
              <div style="display: flex; gap: 8px; margin-top: auto;">
                <button class="btn btn-secondary btn-sm toggle-crop-pause" data-id="${p.id}" style="flex: 1;">
                  Pausar Lote
                </button>
                <button class="btn btn-primary btn-sm edit-crop-btn" data-id="${p.id}" style="flex: 1;">
                  Editar
                </button>
              </div>
            </div>
          </div>
        `).join("")}
      </div>
    `;
  }

  // ==========================================================================
  // 3. VISTA DEL SERVICIO SOCIAL UNIVERSITARIO
  // ==========================================================================
  renderYouthView() {
    const youth = store.getYouth()[0]; // Valeria Soto
    const progressPct = ((youth.hoursCompleted / youth.totalHoursNeeded) * 100).toFixed(1);

    return `
      <div class="page-header">
        <div>
          <div style="font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted); font-weight: 700;">
            Convenio de Vinculación Institucional · UAEM
          </div>
          <h2 class="page-title">${youth.youthName}</h2>
          <div class="page-subtitle">${youth.university} · Matrícula: ${youth.matricula}</div>
        </div>
        <button class="btn btn-secondary btn-sm" id="btn-download-certificate">
          ${Icons.download} Generar Constancia Oficial (PDF)
        </button>
      </div>

      <!-- KPI Horas Card -->
      <div class="kpi-row">
        <div class="kpi-box">
          <span class="kpi-caption">Horas Acreditadas</span>
          <div class="kpi-number">${youth.hoursCompleted} <span style="font-size: 1rem; color: var(--text-muted); font-weight: normal;">/ ${youth.totalHoursNeeded}</span></div>
          <span class="kpi-pill">${progressPct}% completado</span>
        </div>

        <div class="kpi-box">
          <span class="kpi-caption">Entregas Realizadas</span>
          <div class="kpi-number">48</div>
          <span style="font-size: 0.76rem; color: var(--text-muted);">Calificación de servicio: 4.95 ⭐</span>
        </div>

        <div class="kpi-box">
          <span class="kpi-caption">Horas Faltantes</span>
          <div class="kpi-number">${youth.totalHoursNeeded - youth.hoursCompleted} hrs</div>
          <span style="font-size: 0.76rem; color: var(--text-muted);">Estimado: 3 semanas para liberación</span>
        </div>

        <div class="kpi-box">
          <span class="kpi-caption">Rol Asignado</span>
          <div class="kpi-number" style="font-size: 1.35rem;">Logística & Huertos</div>
          <span style="font-size: 0.76rem; color: var(--brand-primary); font-weight: 600;">Zona Cuautla - Yautepec</span>
        </div>
      </div>

      <!-- Manifiesto de Entregas del Día -->
      <div class="table-card">
        <div class="table-card-header">
          <div>
            <div class="table-card-title">Manifiesto de Ruta y Entregas Programadas</div>
            <div style="font-size: 0.8rem; color: var(--text-muted);">Verificación mediante firma digital de recepción o fotografía</div>
          </div>
        </div>

        <div class="data-table-wrapper">
          <table class="data-table">
            <thead>
              <tr>
                <th>Parada</th>
                <th>Cliente / Receptor</th>
                <th>Dirección</th>
                <th>Ventana</th>
                <th>Pedido</th>
                <th>Cobro</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              ${youth.stops.map((stop, index) => `
                <tr>
                  <td style="font-weight: 700; color: var(--text-main);">${index + 1}</td>
                  <td style="font-weight: 600;">${stop.clientName}</td>
                  <td style="font-size: 0.8rem; color: var(--text-secondary);">${stop.address}</td>
                  <td>${stop.window}</td>
                  <td style="font-size: 0.8rem;">${stop.itemsSummary}</td>
                  <td style="font-weight: 600;">${stop.paymentMethod} ($${stop.total})</td>
                  <td>
                    ${stop.status === 'completed' ? `
                      <span style="color: var(--status-success); font-weight: 600; font-size: 0.78rem;">
                        ${Icons.check} Validado (+2 hrs)
                      </span>
                    ` : `
                      <button class="btn btn-primary btn-sm mark-delivered-btn" data-stop-id="${stop.id}">
                        Registrar Firma
                      </button>
                    `}
                  </td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  // ==========================================================================
  // 4. PANEL DE ADMINISTRACIÓN OPERATIVA
  // ==========================================================================
  renderAdminView() {
    const kpis = store.getAdminKPIs();
    const producers = store.getProducers();

    return `
      <div class="page-header">
        <div>
          <div style="font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted); font-weight: 700;">
            Gobierno & Coordinación General
          </div>
          <h2 class="page-title">Tablero de Control e Impacto Estatal</h2>
          <p class="page-subtitle">Indicadores agregados de comercialización directa, volumen de mermas mitigadas y balance universitario</p>
        </div>
      </div>

      <div class="kpi-row">
        <div class="kpi-box">
          <span class="kpi-caption">Productores Activos</span>
          <div class="kpi-number">${kpis.activeProducers}</div>
          <span class="kpi-pill">${Icons.trendingUp} +4 este ciclo</span>
        </div>

        <div class="kpi-box">
          <span class="kpi-caption">Rendimiento Económico Extra</span>
          <div class="kpi-number">$${(kpis.extraIncomeGenerated / 1000).toFixed(1)}k MXN</div>
          <span class="kpi-pill">+85% vs canal mayorista</span>
        </div>

        <div class="kpi-box">
          <span class="kpi-caption">Horas de Servicio Acreditadas</span>
          <div class="kpi-number">${kpis.socialServiceHours} hrs</div>
          <span style="font-size: 0.76rem; color: var(--text-muted);">${kpis.youthTrained} alumnos activos</span>
        </div>

        <div class="kpi-box">
          <span class="kpi-caption">Mermas de Alimento Mitigadas</span>
          <div class="kpi-number">${(kpis.foodWasteAvoidedKg / 1000).toFixed(1)} tons</div>
          <span class="kpi-pill">${Icons.check} Preventa exacta</span>
        </div>
      </div>

      <!-- Padrón de Productores -->
      <div class="table-card">
        <div class="table-card-header">
          <div class="table-card-title">Padrón de Productores y Estatus de Verificación</div>
        </div>

        <div class="data-table-wrapper">
          <table class="data-table">
            <thead>
              <tr>
                <th>Productor</th>
                <th>Parcela</th>
                <th>Municipio</th>
                <th>Años Activo</th>
                <th>Calificación</th>
                <th>Estatus</th>
                <th>Auditoría</th>
              </tr>
            </thead>
            <tbody>
              ${producers.map(p => `
                <tr>
                  <td style="font-weight: 600; color: var(--text-main);">${p.name}</td>
                  <td>${p.ranchName}</td>
                  <td>${p.municipality}</td>
                  <td>${p.yearsFarming} años</td>
                  <td>${p.rating} / 5.0</td>
                  <td>
                    <span style="background: var(--brand-surface-tint); color: var(--brand-primary); font-size: 0.72rem; font-weight: 600; padding: 2px 8px; border-radius: 4px;">
                      ${p.verified ? 'Verificado' : 'En trámite'}
                    </span>
                  </td>
                  <td>
                    <button class="btn btn-secondary btn-sm admin-inspect-producer" data-id="${p.id}">
                      Expediente
                    </button>
                  </td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Configuración Arancelaria y Logística -->
      <div style="background: #fff; border: 1px solid var(--ui-border); border-radius: var(--radius-md); padding: 20px; box-shadow: var(--shadow-xs);">
        <h4 style="font-family: var(--font-heading); font-size: 1.05rem; font-weight: 700; margin-bottom: 12px;">
          Parámetros Financieros y Tarifas Operativas
        </h4>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px;">
          <div class="form-group-item">
            <label class="form-label-title">Retención de Operación Logística (%)</label>
            <input type="number" class="form-input-control" value="10" />
            <span style="font-size: 0.74rem; color: var(--text-muted);">Destinado a seguro contra accidentes de brigadistas y empaque ecológico</span>
          </div>
          <div class="form-group-item">
            <label class="form-label-title">Incentivo Base por Entrega Domiciliar ($ MXN)</label>
            <input type="number" class="form-input-control" value="25" />
            <span style="font-size: 0.74rem; color: var(--text-muted);">Transferencia íntegra al estudiante repartidor</span>
          </div>
        </div>
        <button class="btn btn-primary btn-sm" id="save-admin-settings">
          Actualizar Parámetros
        </button>
      </div>
    `;
  }

  // ==========================================================================
  // EVENT BINDINGS
  // ==========================================================================
  bindRoleViewEvents() {
    this.appEl.querySelectorAll(".subnav-item").forEach(btn => {
      btn.addEventListener("click", () => {
        this.setConsumerTab(btn.dataset.tab);
      });
    });

    const heroExplore = document.getElementById("hero-explore-btn");
    if (heroExplore) heroExplore.addEventListener("click", () => this.setConsumerTab("catalogo"));
    const heroMap = document.getElementById("hero-map-btn");
    if (heroMap) heroMap.addEventListener("click", () => this.setConsumerTab("mapa"));
    const homeSeeAll = document.getElementById("home-see-all-catalog");
    if (homeSeeAll) homeSeeAll.addEventListener("click", () => this.setConsumerTab("catalogo"));
    const homeViewFair = document.getElementById("home-view-fair-btn");
    if (homeViewFair) homeViewFair.addEventListener("click", () => this.setConsumerTab("ferias"));
    const homeViewWorkshop = document.getElementById("home-view-workshop-btn");
    if (homeViewWorkshop) homeViewWorkshop.addEventListener("click", () => this.setConsumerTab("ferias"));

    this.appEl.querySelectorAll("[data-add-id]").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const id = btn.dataset.addId;
        store.addToCart(id, 1);
        this.showToast("Lote agregado a la canasta", "success");
      });
    });

    this.appEl.querySelectorAll("[data-producer-id]").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        this.openProducerModal(btn.dataset.producerId);
      });
    });

    const searchInput = document.getElementById("catalog-search-input");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        this.searchQuery = e.target.value;
        const container = document.getElementById("main-view");
        if (container) container.innerHTML = this.renderConsumerCatalog();
        this.bindRoleViewEvents();
      });
    }

    this.appEl.querySelectorAll("[data-muni]").forEach(pill => {
      pill.addEventListener("click", () => {
        this.selectedMunicipality = pill.dataset.muni;
        const container = document.getElementById("main-view");
        if (container) container.innerHTML = this.renderConsumerCatalog();
        this.bindRoleViewEvents();
      });
    });

    this.appEl.querySelectorAll("[data-cat]").forEach(pill => {
      pill.addEventListener("click", () => {
        this.selectedCategory = pill.dataset.cat;
        const container = document.getElementById("main-view");
        if (container) container.innerHTML = this.renderConsumerCatalog();
        this.bindRoleViewEvents();
      });
    });

    const resetFiltersBtn = document.getElementById("reset-filters-btn") || document.getElementById("reset-filters-btn-empty");
    if (resetFiltersBtn) {
      resetFiltersBtn.addEventListener("click", () => {
        this.selectedMunicipality = "todos";
        this.selectedCategory = "todos";
        this.searchQuery = "";
        const container = document.getElementById("main-view");
        if (container) container.innerHTML = this.renderConsumerCatalog();
        this.bindRoleViewEvents();
      });
    }

    // Map Route Selector Pills (Smooth update without rebuilding map)
    this.appEl.querySelectorAll("#map-route-selector [data-route-id]").forEach(btn => {
      btn.addEventListener("click", () => {
        this.selectedRouteId = btn.dataset.routeId;
        
        // Update pills visual state
        this.appEl.querySelectorAll("#map-route-selector [data-route-id]").forEach(b => {
          b.classList.toggle("active", b.dataset.routeId === this.selectedRouteId);
        });

        // Update Route Details Banner
        const routes = store.getZafraRoutes();
        const activeRoute = this.selectedRouteId === "all" ? null : routes.find(r => r.id === this.selectedRouteId);
        const bannerContainer = document.getElementById("route-detail-banner-container");
        if (bannerContainer) {
          bannerContainer.innerHTML = this.renderRouteDetailBanner(activeRoute);
        }

        // Smoothly update markers and polyline on existing map
        if (this.leafletMap) {
          this.renderMapEntities();
          this.leafletMap.invalidateSize();
        } else {
          this.setupLeafletMap();
        }
      });
    });

    // Map Style Switcher (Satelital Nocturno, Dark Matter, Topográfico)
    this.appEl.querySelectorAll("#map-style-switcher [data-style]").forEach(btn => {
      btn.addEventListener("click", () => {
        const style = btn.dataset.style;
        this.setMapTileLayer(style);
        this.showToast(`Capa activa: ${style === 'satellite-dark' ? 'Satelital Nocturno' : style === 'carto-dark' ? 'Dark Matter' : 'Topográfico'}`, "info");
      });
    });

    // Fullscreen Toggle
    const fsBtn = document.getElementById("map-fullscreen-toggle");
    if (fsBtn) {
      fsBtn.addEventListener("click", () => {
        const wrapper = document.getElementById("map-canvas-wrapper");
        if (wrapper) {
          this.isMapFullscreen = !this.isMapFullscreen;
          wrapper.classList.toggle("is-fullscreen", this.isMapFullscreen);
          document.body.style.overflow = this.isMapFullscreen ? "hidden" : "";
          if (this.leafletMap) {
            setTimeout(() => this.leafletMap.invalidateSize(), 150);
          }
        }
      });
    }

    // Info overlay button
    const infoBtn = document.getElementById("map-info-toggle");
    if (infoBtn) {
      infoBtn.addEventListener("click", () => {
        this.showToast("API Satelital Zafra · Capas ESRI / CartoDB / OSM / INEGI Morelos", "info");
      });
    }

    // Dark Map Table Row Clicks
    this.bindDarkTableRowClicks();

    // Toggle Full Municipalities Table
    const toggleExpandBtn = document.getElementById("toggle-muni-expand-btn");
    if (toggleExpandBtn) {
      toggleExpandBtn.addEventListener("click", () => {
        this.showAllMunicipalities = !this.showAllMunicipalities;
        const municipalities = store.getMapMunicipalities();
        const tbody = document.querySelector(".dark-products-table tbody");
        if (tbody) {
          tbody.innerHTML = (this.showAllMunicipalities ? municipalities : municipalities.slice(0, 15)).map(m => `
            <tr class="dark-table-row" data-muni="${m.name}" style="cursor: pointer;" title="Hacer clic para enfocar en el mapa">
              <td class="col-muni">${m.num}. ${m.name}</td>
              <td class="col-prod">${m.productsSummary}</td>
            </tr>
          `).join("");
          this.bindDarkTableRowClicks();
        }
        toggleExpandBtn.title = this.showAllMunicipalities ? "Ver solo los 15 prioritarios" : "Desplegar todos los municipios de las 6 rutas";
        const svg = toggleExpandBtn.querySelector("svg");
        if (svg) svg.style.transform = this.showAllMunicipalities ? "rotate(180deg)" : "none";
      });
    }

    // Fairs RSVP button
    this.appEl.querySelectorAll(".fair-rsvp-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const fairName = btn.dataset.fairName;
        btn.textContent = "✓ Asistencia Registrada";
        btn.classList.add("btn-primary");
        btn.classList.remove("btn-secondary");
        this.showToast(`¡Visita registrada para ${fairName}! Te enviaremos recordatorio.`, "success");
      });
    });

    const consumerChatForm = document.getElementById("consumer-chat-form");
    if (consumerChatForm) {
      consumerChatForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const input = document.getElementById("consumer-chat-input");
        if (input && input.value.trim()) {
          store.addChatMessage("Laura Romero (Tú)", "consumidor", input.value.trim());
          input.value = "";
          setTimeout(() => {
            store.addChatMessage("Valeria (Brigadista UAEM)", "joven", "Recibido. Me encuentro a 10 minutos de la ubicación.");
          }, 1400);
        }
      });
    }

    const profileForm = document.getElementById("profile-form");
    if (profileForm) {
      profileForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = new FormData(profileForm);
        const currentProfile = store.getUserProfile();
        const updated = {
          ...currentProfile,
          name: formData.get("name"),
          phone: formData.get("phone"),
          email: formData.get("email"),
          municipality: formData.get("municipality"),
          preferredTime: formData.get("preferredTime"),
          address: formData.get("address"),
          references: formData.get("references")
        };
        store.saveUserProfile(updated);
        this.showToast("Parámetros guardados correctamente", "success");
      });
    }

    // Producer triggers
    const openAddCrop = document.getElementById("prod-open-add-crop");
    if (openAddCrop) {
      openAddCrop.addEventListener("click", () => this.openAddCropModal());
    }

    const markHarvestReady = document.getElementById("btn-mark-harvest-ready");
    if (markHarvestReady) {
      markHarvestReady.addEventListener("click", () => {
        this.showToast("Lote marcado como LISTO para recolección de brigadistas.", "success");
      });
    }

    // Youth triggers
    this.appEl.querySelectorAll(".mark-delivered-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const stopId = btn.dataset.stopId;
        this.openSignatureModal(stopId);
      });
    });

    const downloadCert = document.getElementById("btn-download-certificate");
    if (downloadCert) {
      downloadCert.addEventListener("click", () => this.openCertificateModal());
    }

    const saveAdminSettings = document.getElementById("save-admin-settings");
    if (saveAdminSettings) {
      saveAdminSettings.addEventListener("click", () => {
        this.showToast("Configuración guardada exitosamente.", "success");
      });
    }

    const homeQuickMap = document.getElementById("home-goto-map-quick");
    if (homeQuickMap) {
      homeQuickMap.addEventListener("click", () => this.setConsumerTab("mapa"));
    }
  }

  bindDarkTableRowClicks() {
    this.appEl.querySelectorAll(".dark-table-row").forEach(row => {
      row.addEventListener("click", () => {
        const muniName = row.dataset.muni;
        const municipalities = store.getMapMunicipalities();
        const target = municipalities.find(m => m.name === muniName);
        if (target && this.leafletMap) {
          this.leafletMap.flyTo([target.lat, target.lng], 12, { duration: 0.8 });
          this.showToast(`Enfocando municipio: ${target.name} (★ ${target.rating.toFixed(1)})`, "info");
        }
      });
    });
  }

  // ==========================================================================
  // MODALES LIMPIOS (ENTERPRISE)
  // ==========================================================================
  openProducerModal(producerId) {
    const producer = store.getProducers().find(p => p.id === producerId);
    if (!producer) return;
    const products = store.getProducts().filter(p => p.producerId === producer.id);

    this.modalRoot.innerHTML = `
      <div class="modal-overlay" id="modal-bg">
        <div class="modal-dialog">
          <div class="modal-dialog-header">
            <h3 class="modal-dialog-title">Expediente de Productor</h3>
            <button class="modal-dismiss-btn" id="close-modal-x">&times;</button>
          </div>
          <div class="modal-dialog-body">
            <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 16px;">
              <img src="${producer.avatar}" alt="${producer.name}" style="width: 60px; height: 60px; border-radius: var(--radius-xs); object-fit: cover; border: 1px solid var(--ui-border);" />
              <div>
                <h4 style="font-family: var(--font-heading); font-size: 1.15rem; font-weight: 700;">${producer.name}</h4>
                <div style="font-size: 0.85rem; color: var(--brand-primary); font-weight: 600;">${producer.ranchName} · ${producer.municipality}</div>
                <div style="font-size: 0.78rem; color: var(--text-muted);">${producer.yearsFarming} años de cultivo tradicional</div>
              </div>
            </div>

            <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.5; margin-bottom: 16px;">
              "${producer.bio}"
            </p>

            <div style="background: var(--ui-surface-subtle); border: 1px solid var(--ui-border); padding: 12px 16px; border-radius: var(--radius-sm); margin-bottom: 16px; display: flex; justify-content: space-between; align-items: center;">
              <div>
                <div style="font-size: 0.72rem; text-transform: uppercase; font-weight: 600; color: var(--text-muted);">Días habituales de corte:</div>
                <div style="font-weight: 700; color: var(--brand-primary);">${producer.harvestDays}</div>
              </div>
              <button class="btn btn-secondary btn-sm" id="btn-follow-producer">
                + Seguir Alertas (${producer.followersCount})
              </button>
            </div>

            <div style="font-size: 0.76rem; font-weight: 600; text-transform: uppercase; color: var(--text-muted); margin-bottom: 8px;">
              Lotes activos de esta parcela:
            </div>
            <div style="display: flex; flex-direction: column; gap: 8px;">
              ${products.map(p => `
                <div style="display: flex; align-items: center; justify-content: space-between; padding: 8px 12px; background: #fff; border: 1px solid var(--ui-border); border-radius: var(--radius-xs);">
                  <div>
                    <span style="font-weight: 600; font-size: 0.88rem;">${p.name}</span>
                    <span style="font-size: 0.76rem; color: var(--text-muted); display: block;">$${p.price.toFixed(2)} MXN / ${p.unit}</span>
                  </div>
                  <button class="btn btn-primary btn-sm" data-add-id="${p.id}">+ Añadir</button>
                </div>
              `).join("")}
            </div>
          </div>
        </div>
      </div>
    `;

    this.bindModalClose();

    const followBtn = document.getElementById("btn-follow-producer");
    if (followBtn) {
      followBtn.addEventListener("click", () => {
        this.showToast(`Notificaciones activadas para ${producer.name}`, "success");
        followBtn.textContent = "Siguiendo";
      });
    }

    this.modalRoot.querySelectorAll("[data-add-id]").forEach(b => {
      b.addEventListener("click", () => {
        store.addToCart(b.dataset.addId, 1);
        this.showToast("Lote agregado a canasta", "success");
      });
    });
  }

  // ==========================================================================
  // CANASTA Y CHECKOUT PROFESIONAL
  // ==========================================================================
  openCartModal() {
    const cart = store.getCart();
    const profile = store.getUserProfile();
    const subtotal = cart.reduce((acc, it) => acc + (it.price * it.qty), 0);
    const shipping = subtotal > 0 ? (profile.rewardActive ? 0 : 25) : 0;
    const total = subtotal + shipping;

    this.modalRoot.innerHTML = `
      <div class="modal-overlay" id="modal-bg">
        <div class="modal-dialog" style="max-width: 600px;">
          <div class="modal-dialog-header">
            <h3 class="modal-dialog-title">Canasta de Abastecimiento (${cart.length})</h3>
            <button class="modal-dismiss-btn" id="close-modal-x">&times;</button>
          </div>
          <div class="modal-dialog-body">
            ${cart.length === 0 ? `
              <div style="text-align: center; padding: 36px 16px;">
                <p style="font-size: 0.95rem; color: var(--text-muted); margin-bottom: 16px;">No hay cosechas seleccionadas en este momento.</p>
                <button class="btn btn-primary btn-sm" id="cart-go-catalog-btn">Ver Catálogo en Preventa</button>
              </div>
            ` : `
              <div style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 20px;">
                ${cart.map(item => `
                  <div style="display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 10px 12px; border: 1px solid var(--ui-border); border-radius: var(--radius-sm); background: #fff;">
                    <img src="${item.image}" alt="${item.name}" style="width: 44px; height: 44px; border-radius: var(--radius-xs); object-fit: cover;" />
                    <div style="flex: 1;">
                      <div style="font-size: 0.88rem; font-weight: 600;">${item.name}</div>
                      <div style="font-size: 0.74rem; color: var(--text-muted);">${item.producerName} (${item.municipality})</div>
                    </div>

                    <div style="display: flex; align-items: center; gap: 6px;">
                      <button class="btn btn-secondary btn-sm cart-qty-minus" data-id="${item.id}" style="padding: 2px 8px;">-</button>
                      <span style="font-weight: 700; font-size: 0.85rem; min-width: 20px; text-align: center;">${item.qty}</span>
                      <button class="btn btn-secondary btn-sm cart-qty-plus" data-id="${item.id}" style="padding: 2px 8px;">+</button>
                    </div>

                    <div style="font-family: var(--font-heading); font-weight: 700; font-size: 0.95rem; min-width: 70px; text-align: right; color: var(--text-main);">
                      $${(item.price * item.qty).toFixed(2)}
                    </div>
                  </div>
                `).join("")}
              </div>

              <!-- Modalidad de entrega -->
              <div class="form-group-item">
                <label class="form-label-title">Modalidad Logística de Entrega</label>
                <div style="display: flex; flex-direction: column; gap: 8px;">
                  <label style="display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; border: 1px solid var(--ui-border); border-radius: var(--radius-xs); cursor: pointer;">
                    <div style="display: flex; align-items: center; gap: 10px;">
                      <input type="radio" name="deliveryMode" value="domicilio" checked />
                      <div>
                        <div style="font-size: 0.85rem; font-weight: 600;">Despacho Domiciliar con Brigadista UAEM</div>
                        <div style="font-size: 0.74rem; color: var(--text-muted);">Entrega en bicicleta / ruta local coordinada</div>
                      </div>
                    </div>
                    <span style="font-weight: 600; font-size: 0.82rem; color: var(--brand-primary);">${profile.rewardActive ? 'BONIFICADO' : '$25 MXN'}</span>
                  </label>

                  <label style="display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; border: 1px solid var(--ui-border); border-radius: var(--radius-xs); cursor: pointer;">
                    <div style="display: flex; align-items: center; gap: 10px;">
                      <input type="radio" name="deliveryMode" value="acopio" />
                      <div>
                        <div style="font-size: 0.85rem; font-weight: 600;">Punto Comunitario de Acopio Regional</div>
                        <div style="font-size: 0.74rem; color: var(--text-muted);">Recolección en sede comunitaria municipal</div>
                      </div>
                    </div>
                    <span style="font-weight: 600; font-size: 0.82rem; color: var(--status-success);">SIN COSTO</span>
                  </label>
                </div>
              </div>

              <!-- Desglose de totales -->
              <div style="background: var(--ui-surface-subtle); border: 1px solid var(--ui-border); border-radius: var(--radius-sm); padding: 14px; margin: 18px 0;">
                <div style="display: flex; justify-content: space-between; font-size: 0.85rem; margin-bottom: 4px;">
                  <span style="color: var(--text-muted);">Subtotal Cosechas:</span>
                  <span style="font-weight: 600;">$${subtotal.toFixed(2)} MXN</span>
                </div>
                <div style="display: flex; justify-content: space-between; font-size: 0.85rem; margin-bottom: 6px;">
                  <span style="color: var(--text-muted);">Costo Logístico de Despacho:</span>
                  <span style="font-weight: 600; color: var(--status-success);">${shipping === 0 ? 'BONIFICADO' : `$${shipping.toFixed(2)} MXN`}</span>
                </div>
                <div style="display: flex; justify-content: space-between; font-size: 1.1rem; font-weight: 800; border-top: 1px solid var(--ui-border); padding-top: 8px; color: var(--text-main);">
                  <span>Total Liquidación:</span>
                  <span>$${total.toFixed(2)} MXN</span>
                </div>
              </div>

              <button class="btn btn-primary btn-block" id="btn-checkout-confirm">
                Confirmar Orden de Corte & Despacho
              </button>
            `}
          </div>
        </div>
      </div>
    `;

    this.bindModalClose();

    const goCatalog = document.getElementById("cart-go-catalog-btn");
    if (goCatalog) {
      goCatalog.addEventListener("click", () => {
        this.closeModal();
        this.setConsumerTab("catalogo");
      });
    }

    this.modalRoot.querySelectorAll(".cart-qty-plus").forEach(btn => {
      btn.addEventListener("click", () => {
        const item = cart.find(i => i.id === btn.dataset.id);
        if (item) {
          store.updateCartQty(item.id, item.qty + 1);
          this.openCartModal();
        }
      });
    });

    this.modalRoot.querySelectorAll(".cart-qty-minus").forEach(btn => {
      btn.addEventListener("click", () => {
        const item = cart.find(i => i.id === btn.dataset.id);
        if (item) {
          store.updateCartQty(item.id, item.qty - 1);
          this.openCartModal();
        }
      });
    });

    const checkoutConfirm = document.getElementById("btn-checkout-confirm");
    if (checkoutConfirm) {
      checkoutConfirm.addEventListener("click", () => {
        const orders = store.getConsumerOrders();
        const newOrderId = `ORD-${Date.now().toString().slice(-5)}`;
        const newOrder = {
          id: newOrderId,
          date: "Hoy, solicitud procesada",
          status: "confirmado",
          deliveryType: "domicilio",
          deliveryAddress: profile.address,
          assignedYouth: "Carlos Méndez (UPEMOR Logística)",
          youthPhone: "735-999-1234",
          paymentMethod: "Transferencia SPEI",
          items: [...cart],
          subtotal: subtotal,
          shippingCost: shipping,
          total: total
        };

        orders.unshift(newOrder);
        store.saveConsumerOrders(orders);
        store.clearCart();

        profile.purchasesThisMonth += 1;
        store.saveUserProfile(profile);

        this.closeModal();
        this.showToast(`Orden ${newOrderId} confirmada para corte.`, "success");
        this.setConsumerTab("pedidos");
      });
    }
  }

  // ==========================================================================
  // MODAL OFICIAL DE HORAS DE SERVICIO SOCIAL (JOVEN)
  // ==========================================================================
  openCertificateModal() {
    const youth = store.getYouth()[0];
    this.modalRoot.innerHTML = `
      <div class="modal-overlay" id="modal-bg">
        <div class="modal-dialog" style="max-width: 580px;">
          <div class="modal-dialog-header">
            <h3 class="modal-dialog-title">Constancia de Horas de Servicio Social</h3>
            <button class="modal-dismiss-btn" id="close-modal-x">&times;</button>
          </div>
          <div class="modal-dialog-body">
            <div style="border: 1px solid var(--ui-border); border-radius: var(--radius-sm); padding: 24px; background: #fff; text-align: center;">
              <div style="font-size: 0.72rem; font-weight: 700; color: var(--brand-primary); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 6px;">
                Universidad Autónoma del Estado de Morelos · Dirección de Servicio Social
              </div>
              <h3 style="font-family: var(--font-heading); font-size: 1.25rem; font-weight: 700; margin-bottom: 12px;">
                CONSTANCIA DE ACREDITACIÓN DE HORAS
              </h3>
              <p style="font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5; margin-bottom: 16px; text-align: justify;">
                Se certifica que el/la alumno(a) <strong>${youth.youthName}</strong>, con matrícula <strong>${youth.matricula}</strong> de la <strong>${youth.university}</strong>, ha acreditado actividades de logística agropecuaria sustentable y asistencia en parcelas campesinas en la plataforma <strong>Zafra</strong> acumulando:
              </p>
              
              <div style="background: var(--brand-surface-tint); border: 1px solid var(--brand-subtle); padding: 12px; border-radius: var(--radius-xs); display: inline-block; margin-bottom: 16px;">
                <div style="font-size: 0.72rem; font-weight: 600; color: var(--brand-primary); text-transform: uppercase;">Total de Horas Validadas:</div>
                <div style="font-family: var(--font-heading); font-size: 1.8rem; font-weight: 800; color: var(--brand-primary);">
                  ${youth.hoursCompleted} / ${youth.totalHoursNeeded} HORAS
                </div>
              </div>

              <div style="display: flex; justify-content: space-around; margin-top: 18px; font-size: 0.75rem; color: var(--text-muted); border-top: 1px solid var(--ui-divider); padding-top: 14px;">
                <div>
                  <div style="font-weight: 600; color: var(--text-main);">Coordinación de Servicio Social</div>
                  <div>Fac. de Ciencias Agropecuarias UAEM</div>
                </div>
                <div>
                  <div style="font-weight: 600; color: var(--text-main);">Comité Técnico Operativo</div>
                  <div>Plataforma Zafra</div>
                </div>
              </div>
            </div>

            <div style="margin-top: 16px; display: flex; gap: 8px; justify-content: flex-end;">
              <button class="btn btn-secondary btn-sm" id="close-cert-btn">Cerrar</button>
              <button class="btn btn-primary btn-sm" onclick="window.print()">
                ${Icons.download} Imprimir / Exportar PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    this.bindModalClose();
    const closeBtn = document.getElementById("close-cert-btn");
    if (closeBtn) closeBtn.addEventListener("click", () => this.closeModal());
  }

  // ==========================================================================
  // MODAL REGISTRO DE ENTREGA / FIRMA DIGITAL
  // ==========================================================================
  openSignatureModal(stopId) {
    this.modalRoot.innerHTML = `
      <div class="modal-overlay" id="modal-bg">
        <div class="modal-dialog" style="max-width: 480px;">
          <div class="modal-dialog-header">
            <h3 class="modal-dialog-title">Validación de Entrega</h3>
            <button class="modal-dismiss-btn" id="close-modal-x">&times;</button>
          </div>
          <div class="modal-dialog-body">
            <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 14px;">
              Capture la firma de conformidad del cliente en pantalla para concluir la entrega y sumar horas de servicio social.
            </p>

            <div style="background: #f8fafc; border: 1px dashed var(--ui-border-strong); border-radius: var(--radius-sm); height: 140px; display: flex; align-items: center; justify-content: center; cursor: crosshair; margin-bottom: 16px;">
              <span style="font-size: 0.8rem; color: var(--text-muted);">
                Trazar firma digital de recepción aquí
              </span>
            </div>

            <button class="btn btn-primary btn-block" id="btn-submit-delivery-proof">
              ${Icons.check} Validar Entrega & Acreditar +2 Horas
            </button>
          </div>
        </div>
      </div>
    `;

    this.bindModalClose();

    const submitBtn = document.getElementById("btn-submit-delivery-proof");
    if (submitBtn) {
      submitBtn.addEventListener("click", () => {
        const youthRoutes = store.getYouth();
        const route = youthRoutes[0];
        const stop = route.stops.find(s => s.id === stopId);
        if (stop) {
          stop.status = "completed";
          route.hoursCompleted += 2;
          store.saveYouth(youthRoutes);
        }
        this.closeModal();
        this.showToast("Entrega validada y horas sumadas al expediente.", "success");
        this.render();
      });
    }
  }

  // ==========================================================================
  // MODAL REGISTRAR CULTIVO (PRODUCTOR)
  // ==========================================================================
  openAddCropModal() {
    this.modalRoot.innerHTML = `
      <div class="modal-overlay" id="modal-bg">
        <div class="modal-dialog">
          <div class="modal-dialog-header">
            <h3 class="modal-dialog-title">Alta de Nuevo Lote de Cosecha</h3>
            <button class="modal-dismiss-btn" id="close-modal-x">&times;</button>
          </div>
          <div class="modal-dialog-body">
            <form id="new-crop-form">
              <div class="form-group-item">
                <label class="form-label-title">Nombre del Cultivo</label>
                <input type="text" class="form-input-control" name="name" placeholder="Ej. Calabacita criolla, Ciruela..." required />
              </div>

              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 12px;">
                <div class="form-group-item">
                  <label class="form-label-title">Precio Unitario ($ MXN)</label>
                  <input type="number" class="form-input-control" name="price" placeholder="Ej. 28" required />
                </div>
                <div class="form-group-item">
                  <label class="form-label-title">Unidad de Venta</label>
                  <select class="form-input-control" name="unit">
                    <option value="kg">Por kilogramo (kg)</option>
                    <option value="docena">Por docena</option>
                    <option value="bolsa">Por bolsa / manojo</option>
                  </select>
                </div>
              </div>

              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 12px;">
                <div class="form-group-item">
                  <label class="form-label-title">Volumen Estimado de Corte</label>
                  <input type="number" class="form-input-control" name="stock" placeholder="Ej. 60" required />
                </div>
                <div class="form-group-item">
                  <label class="form-label-title">Categoría</label>
                  <select class="form-input-control" name="category">
                    <option value="Hortalizas">Hortalizas</option>
                    <option value="Frutas">Frutas</option>
                    <option value="Granos y Maíces">Granos y Maíces</option>
                  </select>
                </div>
              </div>

              <div class="form-group-item">
                <label class="form-label-title">Fecha Límite Estimada para Corte</label>
                <input type="text" class="form-input-control" name="harvestDate" placeholder="Ej. Lunes 3 de Noviembre" required />
              </div>

              <button type="submit" class="btn btn-primary btn-block">
                Publicar Lote en Plataforma
              </button>
            </form>
          </div>
        </div>
      </div>
    `;

    this.bindModalClose();

    const form = document.getElementById("new-crop-form");
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const products = store.getProducts();
        const newProduct = {
          id: `p-${Date.now()}`,
          name: formData.get("name"),
          producerId: "prod-1",
          producerName: "Don Chente Gómez",
          municipality: "Tlayacapan",
          price: Number(formData.get("price")),
          unit: formData.get("unit"),
          image: "assets/img/prod_ejote.jpg",
          isPreventa: true,
          harvestDate: formData.get("harvestDate"),
          stock: Number(formData.get("stock")),
          category: formData.get("category"),
          tags: ["Sin agroquímicos", "Cosecha fresca"],
          description: "Lote de corte fresco bajo pedido."
        };

        products.unshift(newProduct);
        store.saveProducts(products);
        this.closeModal();
        this.showToast(`Lote ${newProduct.name} registrado con éxito.`, "success");
        this.render();
      });
    }
  }

  bindModalClose() {
    const bg = document.getElementById("modal-bg");
    const closeX = document.getElementById("close-modal-x");
    if (bg) {
      bg.addEventListener("click", (e) => {
        if (e.target === bg) this.closeModal();
      });
    }
    if (closeX) {
      closeX.addEventListener("click", () => this.closeModal());
    }
  }

  closeModal() {
    this.modalRoot.innerHTML = "";
  }
}

function initZafraApp() {
  try {
    if (!window.app) {
      window.app = new App();
    }
  } catch (err) {
    console.error("Error al inicializar Zafra:", err);
    const appEl = document.getElementById("app");
    if (appEl) {
      appEl.innerHTML = `
        <div style="min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; background: #081711; color: #ffffff; font-family: 'Outfit', sans-serif; text-align: center; padding: 24px;">
          <div style="max-width: 440px; background: #0d1e16; border: 1px solid #1f3d2e; border-radius: 12px; padding: 32px 24px; box-shadow: 0 12px 30px rgba(0,0,0,0.5);">
            <div style="width: 52px; height: 52px; border-radius: 14px; background: rgba(34, 197, 94, 0.15); border: 1px solid rgba(34, 197, 94, 0.35); display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; color: #22c55e;">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <h2 style="font-size: 1.3rem; font-weight: 700; margin: 0 0 10px; color: #ffffff;">Actualización del Sistema Zafra</h2>
            <p style="font-size: 0.88rem; color: #94a3b8; line-height: 1.5; margin-bottom: 22px;">
              Se ha detectado una versión previa en la caché del navegador. Haz clic en el botón para sincronizar con los últimos datos de la red de Morelos.
            </p>
            <button id="btn-emergency-reset" style="background: #22c55e; color: #052e16; font-weight: 700; border: none; border-radius: 8px; padding: 12px 20px; font-size: 0.92rem; cursor: pointer; width: 100%; box-shadow: 0 4px 12px rgba(34, 197, 94, 0.3);">
              Sincronizar y Cargar Zafra
            </button>
          </div>
        </div>
      `;
      const btn = document.getElementById("btn-emergency-reset");
      if (btn) {
        btn.addEventListener("click", () => {
          try {
            localStorage.clear();
          } catch(e) {}
          window.location.reload();
        });
      }
    }
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initZafraApp);
} else {
  initZafraApp();
}
