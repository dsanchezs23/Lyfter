import { renderHeader, renderFooter } from '../ui/header.js';
import { requireAuth } from '../utils/guards.js';
import { showBanner, hideBanner } from '../ui/banner.js';
import { validateCheckoutForm, applyFieldErrors } from '../utils/validators.js';
import { getCart, cartTotal, clearCart } from '../state/cart.js';
import { getSession } from '../state/session.js';
import { createOrder } from '../api/orderApi.js';
import { formatCurrency } from '../utils/format.js';
import { escapeHtml } from '../utils/dom.js';
import { ApiError } from '../api/http.js';

renderHeader(document.getElementById('site-header'));
renderFooter(document.getElementById('site-footer'));

const content = document.getElementById('checkout-content');

function render() {
  const cart = getCart();
  const session = getSession();

  if (cart.items.length === 0) {
    content.innerHTML = `
      <div class="state-gate">
        <div class="state-gate__icon">🛒</div>
        <h2>No hay productos para procesar</h2>
        <p>Agrega productos al carrito antes de continuar al checkout.</p>
        <a class="btn btn-primary" href="catalog.html">Ver productos</a>
      </div>
    `;
    return;
  }

  const linesHtml = cart.items
    .map(
      (item) => `
      <div class="order-line">
        <div>
          <div class="order-line__name">${escapeHtml(item.name)}</div>
          <div class="order-line__meta">${item.quantity} × ${formatCurrency(item.price)}</div>
        </div>
        <div>${formatCurrency(item.price * item.quantity)}</div>
      </div>`
    )
    .join('');

  content.innerHTML = `
    <div class="checkout-layout">
      <div class="card">
        <div class="card__body">
          <h2>Información de compra</h2>
          <div class="banner banner-error" id="form-banner" role="alert" hidden></div>
          <form class="form" id="checkout-form" novalidate>
            <div class="form-field">
              <label for="fullName">Nombre completo</label>
              <input type="text" id="fullName" name="fullName" value="${escapeHtml(`${session?.name ?? ''} ${session?.lastName ?? ''}`.trim())}" />
              <span class="field-error" data-for="fullName"></span>
            </div>
            <div class="form-field">
              <label for="email">Correo electrónico</label>
              <input type="email" id="email" name="email" value="${escapeHtml(session?.email ?? '')}" />
              <span class="field-error" data-for="email"></span>
            </div>
            <div class="form-field">
              <label for="address">Dirección</label>
              <input type="text" id="address" name="address" value="${escapeHtml(session?.shippingAddress ?? '')}" />
              <span class="field-error" data-for="address"></span>
            </div>
            <div class="form-field">
              <label for="phoneNumber">Teléfono</label>
              <input type="tel" id="phoneNumber" name="phoneNumber" />
              <span class="field-error" data-for="phoneNumber"></span>
            </div>
            <p>Esta información se utilizará para completar el envío de tu pedido.</p>
          </form>
        </div>
      </div>
      <div class="card">
        <div class="card__body">
          <h2>Resumen del pedido</h2>
          ${linesHtml}
          <div class="checkout-total">
            <span>Total</span>
            <span>${formatCurrency(cartTotal())}</span>
          </div>
          <div class="flex flex--gap" style="flex-direction: column;">
            <button class="btn btn-primary btn-block" type="submit" form="checkout-form">Confirmar compra</button>
            <a class="btn btn-secondary btn-block" href="cart.html">Cancelar</a>
          </div>
        </div>
      </div>
    </div>
  `;

  document.getElementById('checkout-form').addEventListener('submit', handleSubmit);
}

async function handleSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const banner = document.getElementById('form-banner');
  hideBanner(banner);

  const fields = {
    fullName: form.fullName.value.trim(),
    email: form.email.value.trim(),
    address: form.address.value.trim(),
    phoneNumber: form.phoneNumber.value.trim(),
  };

  const { valid, errors } = validateCheckoutForm(fields);
  applyFieldErrors(form, errors);
  if (!valid) {
    showBanner(banner, { type: 'error', message: 'Revisa los campos marcados en rojo.' });
    return;
  }

  const submitBtn = form.querySelector('button[type="submit"]');
  submitBtn.disabled = true;

  const cart = getCart();
  const session = getSession();

  try {
    const order = await createOrder({
      userId: session.id,
      status: 'PENDING',
      cartItems: cart.items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        priceAtTime: item.price,
      })),
      totalPrice: cartTotal(),
    });
    sessionStorage.setItem(
      'petstore_last_order',
      JSON.stringify({ orderId: order.id, items: cart.items, total: cartTotal() })
    );
    clearCart();
    window.location.href = `confirmation.html?orderId=${encodeURIComponent(order.id)}`;
  } catch (error) {
    const message = error instanceof ApiError ? error.message : 'No se pudo procesar la compra.';
    showBanner(banner, { type: 'error', message });
    submitBtn.disabled = false;
  }
}

if (requireAuth()) {
  render();
}
