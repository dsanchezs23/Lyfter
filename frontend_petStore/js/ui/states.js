export function renderLoading(container, message = 'Loading...') {
  if (!container) return;
  container.innerHTML = `<div class="state state-loading" role="status">${message}</div>`;
}

export function renderEmpty(container, message) {
  if (!container) return;
  container.innerHTML = `<div class="state state-empty">${message}</div>`;
}

export function renderError(container, message = 'An error occurred while loading the information.') {
  if (!container) return;
  container.innerHTML = `<div class="state state-error" role="alert">${message}</div>`;
}
