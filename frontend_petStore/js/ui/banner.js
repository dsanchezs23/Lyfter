export function showBanner(el, { type = 'error', message }) {
  if (!el) return;
  el.textContent = message;
  el.className = `banner banner-${type}`;
  el.hidden = false;
}

export function hideBanner(el) {
  if (!el) return;
  el.hidden = true;
  el.textContent = '';
}
