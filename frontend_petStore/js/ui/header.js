import { getSession, clearSession, hasRole } from '../state/session.js';
import { clearCart, itemCount, syncBadges } from '../state/cart.js';
import { escapeHtml } from '../utils/dom.js';

function isAdminPage() {
  return window.location.pathname.includes('/admin/');
}

function root(path) {
  return isAdminPage() ? `../${path}` : path;
}

export function renderHeader(container) {
  if (!container) return;
  const session = getSession();
  const count = itemCount();

  const navLinks = [
    { href: root('index.html'), label: 'Inicio' },
    { href: root('catalog.html'), label: 'Productos' },
  ];
  if (session && hasRole(['MANAGER', 'EMPLOYEE'])) {
    navLinks.push({ href: root('admin/dashboard.html'), label: 'Administración' });
  }

  const currentPage = window.location.pathname.split('/').pop();
  const navHtml = navLinks
    .map((link) => {
      const isCurrent = link.href.endsWith(currentPage) && currentPage !== '';
      return `<a href="${link.href}"${isCurrent ? ' aria-current="page"' : ''}>${link.label}</a>`;
    })
    .join('');

  const actionsHtml = session
    ? `
      <a class="cart-link" href="${root('cart.html')}" aria-label="Carrito">
        🛒<span class="cart-badge" data-cart-badge ${count === 0 ? 'hidden' : ''}>${count}</span>
      </a>
      <span class="site-header__user">Hola, ${escapeHtml(session.name)}</span>
      <button class="btn btn-secondary" type="button" data-action="logout">Cerrar sesión</button>
    `
    : `
      <span class="site-header__user">Usuario: Invitado</span>
      <a class="btn btn-primary" href="${root('login.html')}">Iniciar sesión</a>
    `;

  container.innerHTML = `
    <div class="container site-header__bar">
      <a class="site-header__brand" href="${root('index.html')}">
        <span class="site-header__logo">🐾</span>
        PawStore
      </a>
      <nav class="site-header__nav">${navHtml}</nav>
      <div class="site-header__actions">${actionsHtml}</div>
    </div>
  `;

  const logoutBtn = container.querySelector('[data-action="logout"]');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      clearSession();
      clearCart();
      window.location.href = root('index.html');
    });
  }

  syncBadges();
}

export function renderFooter(container) {
  if (!container) return;
  container.innerHTML = `
    <div class="container site-footer__bar">
      <span>&copy; ${new Date().getFullYear()} PawStore — Todos los derechos reservados.</span>
      <div class="site-footer__links">
        <a href="${root('index.html')}">Inicio</a>
        <a href="${root('catalog.html')}">Productos</a>
      </div>
    </div>
  `;
}
