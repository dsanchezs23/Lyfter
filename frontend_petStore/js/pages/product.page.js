import { renderHeader, renderFooter } from '../ui/header.js';
import { renderLoading, renderError } from '../ui/states.js';
import { getProductById } from '../api/productApi.js';
import { addItem } from '../state/cart.js';
import { formatCurrency } from '../utils/format.js';
import { escapeHtml } from '../utils/dom.js';
import { ApiError } from '../api/http.js';

renderHeader(document.getElementById('site-header'));
renderFooter(document.getElementById('site-footer'));

const container = document.getElementById('product-detail');
const productId = new URLSearchParams(window.location.search).get('id');

let quantity = 1;

async function init() {
  if (!productId) {
    renderError(container, 'No se especificó un producto.');
    return;
  }
  renderLoading(container, 'Cargando producto...');
  try {
    const product = await getProductById(productId);
    renderProduct(product);
  } catch (error) {
    const message = error instanceof ApiError ? error.message : 'No se pudo cargar el producto.';
    renderError(container, message);
  }
}

function renderProduct(product) {
  const stock = Number(product.stockQuantity);
  const outOfStock = !Number.isNaN(stock) && stock <= 0;

  container.innerHTML = `
    <div class="product-detail">
      <div class="product-detail__media">
        <img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.name)}" />
      </div>
      <div class="product-detail__info">
        <span class="product-detail__category">${escapeHtml(product.category)}</span>
        <h1>${escapeHtml(product.name)}</h1>
        <div class="product-detail__price">${formatCurrency(product.price)}</div>
        <p>${escapeHtml(product.description)}</p>
        <div id="product-banner" class="banner banner-error" role="alert" hidden></div>
        <div class="product-detail__actions">
          <div class="qty-control">
            <button type="button" data-action="decrease" aria-label="Disminuir cantidad">−</button>
            <span id="quantity-display">1</span>
            <button type="button" data-action="increase" aria-label="Aumentar cantidad">+</button>
          </div>
          <button class="btn btn-primary" type="button" id="add-to-cart-btn" ${outOfStock ? 'disabled' : ''}>
            ${outOfStock ? 'Agotado' : 'Agregar al carrito'}
          </button>
          <a class="btn btn-secondary" href="catalog.html">Volver al catálogo</a>
        </div>
      </div>
    </div>
  `;

  const qtyDisplay = document.getElementById('quantity-display');
  container.querySelector('[data-action="decrease"]').addEventListener('click', () => {
    quantity = Math.max(1, quantity - 1);
    qtyDisplay.textContent = String(quantity);
  });
  container.querySelector('[data-action="increase"]').addEventListener('click', () => {
    quantity = Math.min(outOfStock ? 1 : Number.isNaN(stock) ? quantity + 1 : Math.max(stock, 1), quantity + 1);
    qtyDisplay.textContent = String(quantity);
  });

  document.getElementById('add-to-cart-btn').addEventListener('click', () => {
    addItem(product, quantity);
    const banner = document.getElementById('product-banner');
    banner.className = 'banner banner-success';
    banner.textContent = `${quantity} × ${product.name} agregado al carrito.`;
    banner.hidden = false;
  });
}

init();
