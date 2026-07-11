import { formatCurrency } from '../utils/format.js';
import { escapeHtml } from '../utils/dom.js';

export function renderCartItems(container, items, { onQuantityChange, onRemove }) {
  container.innerHTML = '';
  items.forEach((item) => {
    container.appendChild(buildRow(item, { onQuantityChange, onRemove }));
  });
}

function buildRow(item, { onQuantityChange, onRemove }) {
  const row = document.createElement('div');
  row.className = 'card cart-item';
  row.innerHTML = `
    <img class="cart-item__image" src="${escapeHtml(item.image)}" alt="${escapeHtml(item.name)}" />
    <div class="cart-item__info">
      <div class="cart-item__name">${escapeHtml(item.name)}</div>
      <div class="cart-item__price">${formatCurrency(item.price)} c/u</div>
    </div>
    <div class="qty-control">
      <button type="button" data-action="decrease" aria-label="Disminuir cantidad">−</button>
      <span>${item.quantity}</span>
      <button type="button" data-action="increase" aria-label="Aumentar cantidad">+</button>
    </div>
    <div class="cart-item__subtotal">${formatCurrency(item.price * item.quantity)}</div>
    <button class="btn btn-danger" type="button" data-action="remove" aria-label="Eliminar producto">Eliminar</button>
  `;

  row.querySelector('[data-action="decrease"]').addEventListener('click', () => {
    onQuantityChange(item.productId, item.quantity - 1);
  });
  row.querySelector('[data-action="increase"]').addEventListener('click', () => {
    onQuantityChange(item.productId, item.quantity + 1);
  });
  row.querySelector('[data-action="remove"]').addEventListener('click', () => {
    onRemove(item.productId);
  });

  const img = row.querySelector('.cart-item__image');
  img.addEventListener('error', () => { img.style.visibility = 'hidden'; }, { once: true });

  return row;
}
