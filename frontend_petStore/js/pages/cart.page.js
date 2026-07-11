import { renderHeader, renderFooter } from '../ui/header.js';
import { requireAuth } from '../utils/guards.js';
import { renderCartItems } from '../ui/cartItemRow.js';
import { getCart, setCart, updateItemQuantity, removeItem, cartTotal } from '../state/cart.js';
import { getSession } from '../state/session.js';
import { createCart } from '../api/cartApi.js';
import { formatCurrency } from '../utils/format.js';

renderHeader(document.getElementById('site-header'));
renderFooter(document.getElementById('site-footer'));

const content = document.getElementById('cart-content');

function render() {
  const cart = getCart();

  if (cart.items.length === 0) {
    content.innerHTML = `
      <div class="state-gate">
        <div class="state-gate__icon">🛒</div>
        <h2>Tu carrito está vacío</h2>
        <p>Agrega productos desde el catálogo para comenzar tu compra.</p>
        <a class="btn btn-primary" href="catalog.html">Ver productos</a>
      </div>
    `;
    return;
  }

  content.innerHTML = `
    <div class="cart-layout">
      <div class="cart-items" id="cart-items"></div>
      <div class="card cart-summary">
        <div class="card__body">
          <div class="cart-summary__total">
            <span>Total</span>
            <span id="cart-total">${formatCurrency(cartTotal())}</span>
          </div>
          <a class="btn btn-primary btn-block" href="checkout.html">Continuar al checkout</a>
        </div>
      </div>
    </div>
  `;

  renderCartItems(document.getElementById('cart-items'), cart.items, {
    onQuantityChange: (productId, quantity) => {
      updateItemQuantity(productId, quantity);
      render();
    },
    onRemove: (productId) => {
      removeItem(productId);
      render();
    },
  });
}

async function syncCartWithBackend() {
  const cart = getCart();
  const session = getSession();
  if (cart.cartId || cart.items.length === 0 || !session) return;

  try {
    const created = await createCart({
      userId: session.id,
      items: cart.items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        priceAtTime: item.price,
      })),
      totalPrice: cartTotal(),
    });
    setCart({ ...cart, cartId: created.id });
  } catch {
    // Best-effort sync only — the local cart remains the source of truth for checkout.
  }
}

if (requireAuth()) {
  render();
  syncCartWithBackend();
}
