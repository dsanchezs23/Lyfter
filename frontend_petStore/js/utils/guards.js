import { isLoggedIn, hasRole } from '../state/session.js';

function root(path) {
  return window.location.pathname.includes('/admin/') ? `../${path}` : path;
}

export function requireAuth() {
  if (!isLoggedIn()) {
    renderGate('You must log in to continue', 'Protect your purchases and manage your profile with ease.', 'Go to login', root('login.html'));
    return false;
  }
  return true;
}

export function requireRole(roles) {
  if (!requireAuth()) return false;
  if (!hasRole(roles)) {
    renderGate('You do not have permission to view this page', 'This section is reserved for the administrative team.', 'Back to home', root('index.html'));
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
