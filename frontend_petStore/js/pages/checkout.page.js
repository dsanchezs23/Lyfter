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
        <h2>There are no products to process</h2>
        <p>Add products to your cart before continuing to checkout.</p>
        <a class="btn btn-primary" href="catalog.html">View products</a>
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
          <h2>Purchase information</h2>
          <div class="banner banner-error" id="form-banner" role="alert" hidden></div>
          <form class="form" id="checkout-form" novalidate>
            <div class="form-field">
              <label for="fullName">Full name</label>
              <input type="text" id="fullName" name="fullName" value="${escapeHtml(`${session?.name ?? ''} ${session?.lastName ?? ''}`.trim())}" />
              <span class="field-error" data-for="fullName"></span>
            </div>
            <div class="form-field">
              <label for="email">Email address</label>
              <input type="email" id="email" name="email" value="${escapeHtml(session?.email ?? '')}" />
              <span class="field-error" data-for="email"></span>
            </div>
            <div class="form-field">
              <label for="address">Address</label>
              <input type="text" id="address" name="address" value="${escapeHtml(session?.shippingAddress ?? '')}" />
              <span class="field-error" data-for="address"></span>
            </div>
            <div class="form-field">
              <label for="phoneNumber">Phone</label>
              <input type="tel" id="phoneNumber" name="phoneNumber" />
              <span class="field-error" data-for="phoneNumber"></span>
            </div>
            <p>This information will be used to complete the delivery of your order.</p>
          </form>
        </div>
      </div>
      <div class="card">
        <div class="card__body">
          <h2>Order summary</h2>
          ${linesHtml}
          <div class="checkout-total">
            <span>Total</span>
            <span>${formatCurrency(cartTotal())}</span>
          </div>
          <div class="flex flex--gap" style="flex-direction: column;">
            <button class="btn btn-primary btn-block" type="submit" form="checkout-form">Confirm purchase</button>
            <a class="btn btn-secondary btn-block" href="cart.html">Cancel</a>
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
    showBanner(banner, { type: 'error', message: 'Please review the fields highlighted in red.' });
    return;
  }

  const submitBtn = document.querySelector('button[form="checkout-form"]');
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
    const message = error instanceof ApiError ? error.message : 'The purchase could not be processed.';
    showBanner(banner, { type: 'error', message });
    submitBtn.disabled = false;
  }
}

if (requireAuth()) {
  render();
}
