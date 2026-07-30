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
      <h1>Order Complete</h1>
      <p>Your order <strong>#${escapeHtml(orderId)}</strong> was processed successfully. Thanks for shopping at PawStore!</p>
    </div>
    <div class="table-wrap">
      <table>
        <thead>
          <tr><th>Product</th><th>Quantity</th><th>Unit price</th><th>Subtotal</th></tr>
        </thead>
        <tbody>${rowsHtml}</tbody>
      </table>
    </div>
    <div class="checkout-total">
      <span>Total</span>
      <span>${formatCurrency(total)}</span>
    </div>
    <div class="confirmation-actions">
      <a class="btn btn-primary" href="catalog.html">Back to catalog</a>
      <a class="btn btn-secondary" href="index.html">Go to home</a>
    </div>
  `;
}

async function init() {
  if (!orderId) {
    renderError(content, 'No order was specified.');
    return;
  }

  const snapshot = getLastOrderSnapshot();
  if (snapshot) {
    renderConfirmation(snapshot);
    return;
  }

  renderLoading(content, 'Loading order...');
  try {
    const order = await getOrder(orderId);
    renderConfirmation({
      items: order.cartItems.map((item) => ({
        name: `Product ${item.productId}`,
        quantity: item.quantity,
        price: item.priceAtTime,
      })),
      total: order.totalPrice,
    });
  } catch (error) {
    const message = error instanceof ApiError ? error.message : 'The order could not be loaded.';
    renderError(content, message);
  }
}

if (requireAuth()) {
  init();
}
