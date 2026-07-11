import { renderHeader, renderFooter } from '../ui/header.js';
import { requireAuth } from '../utils/guards.js';
import { renderLoading, renderError } from '../ui/states.js';
import { getOrder } from '../api/orderApi.js';
import { formatCurrency } from '../utils/format.js';
import { escapeHtml } from '../utils/dom.js';
import { ApiError } from '../api/http.js';

renderHeader(document.getElementById('site-header'));
renderFooter(document.getElementById('site-footer'));

const content = document.getElementById('confirmation-content');
const orderId = new URLSearchParams(window.location.search).get('orderId');

function getLastOrderSnapshot() {
  const raw = sessionStorage.getItem('petstore_last_order');
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    return String(parsed.orderId) === String(orderId) ? parsed : null;
  } catch {
    return null;
  }
}

function renderConfirmation({ items, total }) {
  const rowsHtml = items
    .map(
      (item) => `
      <tr>
        <td>${escapeHtml(item.name)}</td>
        <td>${item.quantity}</td>
        <td>${formatCurrency(item.price)}</td>
        <td>${formatCurrency(item.price * item.quantity)}</td>
      </tr>`
    )
    .join('');

  content.innerHTML = `
    <div class="confirmation-hero">
      <div class="confirmation-hero__icon">✅</div>
      <h1>Compra Finalizada</h1>
      <p>Tu pedido <strong>#${escapeHtml(orderId)}</strong> fue procesado correctamente. ¡Gracias por comprar en PawStore!</p>
    </div>
    <div class="table-wrap">
      <table>
        <thead>
          <tr><th>Producto</th><th>Cantidad</th><th>Precio unitario</th><th>Subtotal</th></tr>
        </thead>
        <tbody>${rowsHtml}</tbody>
      </table>
    </div>
    <div class="checkout-total">
      <span>Total</span>
      <span>${formatCurrency(total)}</span>
    </div>
    <div class="confirmation-actions">
      <a class="btn btn-primary" href="catalog.html">Volver al catálogo</a>
      <a class="btn btn-secondary" href="index.html">Ir al inicio</a>
    </div>
  `;
}

async function init() {
  if (!orderId) {
    renderError(content, 'No se especificó un pedido.');
    return;
  }

  const snapshot = getLastOrderSnapshot();
  if (snapshot) {
    renderConfirmation(snapshot);
    return;
  }

  renderLoading(content, 'Cargando pedido...');
  try {
    const order = await getOrder(orderId);
    renderConfirmation({
      items: order.cartItems.map((item) => ({
        name: `Producto ${item.productId}`,
        quantity: item.quantity,
        price: item.priceAtTime,
      })),
      total: order.totalPrice,
    });
  } catch (error) {
    const message = error instanceof ApiError ? error.message : 'No se pudo cargar el pedido.';
    renderError(content, message);
  }
}

if (requireAuth()) {
  init();
}
