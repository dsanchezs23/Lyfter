const CART_KEY = 'petstore_cart';

function emptyCart() {
  return { cartId: null, items: [] };
}

export function getCart() {
  const raw = localStorage.getItem(CART_KEY);
  if (!raw) return emptyCart();
  try {
    const parsed = JSON.parse(raw);
    return { cartId: parsed.cartId ?? null, items: Array.isArray(parsed.items) ? parsed.items : [] };
  } catch {
    return emptyCart();
  }
}

export function setCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  syncBadges();
}

export function clearCart() {
  localStorage.setItem(CART_KEY, JSON.stringify(emptyCart()));
  syncBadges();
}

export function itemCount() {
  return getCart().items.reduce((total, item) => total + item.quantity, 0);
}

export function cartTotal() {
  return getCart().items.reduce((total, item) => total + item.price * item.quantity, 0);
}

export function addItem(product, quantity) {
  const cart = getCart();
  const existing = cart.items.find((item) => item.productId === product.id);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.items.push({
      productId: product.id,
      name: product.name,
      image: product.image,
      price: Number(product.price),
      quantity,
    });
  }
  setCart(cart);
  return cart;
}

export function updateItemQuantity(productId, quantity) {
  const cart = getCart();
  const item = cart.items.find((entry) => entry.productId === productId);
  if (!item) return cart;
  if (quantity <= 0) {
    cart.items = cart.items.filter((entry) => entry.productId !== productId);
  } else {
    item.quantity = quantity;
  }
  setCart(cart);
  return cart;
}

export function removeItem(productId) {
  return updateItemQuantity(productId, 0);
}

export function syncBadges() {
  const count = itemCount();
  document.querySelectorAll('[data-cart-badge]').forEach((el) => {
    el.textContent = String(count);
    el.hidden = count === 0;
  });
}

window.addEventListener('storage', (event) => {
  if (event.key === CART_KEY) {
    syncBadges();
  }
});
