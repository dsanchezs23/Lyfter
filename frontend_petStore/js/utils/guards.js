import { isLoggedIn, hasRole } from '../state/session.js';

function root(path) {
  return window.location.pathname.includes('/admin/') ? `../${path}` : path;
}

export function requireAuth() {
  if (!isLoggedIn()) {
    renderGate('Debes iniciar sesión para continuar', 'Protege tus compras y gestiona tu perfil con facilidad.', 'Ir a iniciar sesión', root('login.html'));
    return false;
  }
  return true;
}

export function requireRole(roles) {
  if (!requireAuth()) return false;
  if (!hasRole(roles)) {
    renderGate('No tienes permiso para ver esta página', 'Esta sección está reservada para el equipo administrativo.', 'Volver al inicio', root('index.html'));
    return false;
  }
  return true;
}

function renderGate(title, message, actionLabel, actionHref) {
  const main = document.querySelector('main');
  if (!main) return;
  main.innerHTML = `
    <div class="container page-section">
      <div class="state-gate">
        <div class="state-gate__icon">🔒</div>
        <h2>${title}</h2>
        <p>${message}</p>
        <a class="btn btn-primary" href="${actionHref}">${actionLabel}</a>
      </div>
    </div>
  `;
}
