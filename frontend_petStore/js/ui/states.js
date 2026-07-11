export function renderLoading(container, message = 'Cargando...') {
  if (!container) return;
  container.innerHTML = `<div class="state state-loading" role="status">${message}</div>`;
}

export function renderEmpty(container, message) {
  if (!container) return;
  container.innerHTML = `<div class="state state-empty">${message}</div>`;
}

export function renderError(container, message = 'Ocurrió un error al cargar la información.') {
  if (!container) return;
  container.innerHTML = `<div class="state state-error" role="alert">${message}</div>`;
}
