import { formatCurrency, hasDiscount, effectivePrice } from '../utils/format.js';
import { escapeHtml } from '../utils/dom.js';

const FALLBACK_IMAGE =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect width="400" height="300" fill="%23e2e8f0"/><text x="50%" y="50%" font-family="sans-serif" font-size="20" fill="%2364748b" text-anchor="middle" dy=".3em">No image</text></svg>'
  );

function stockLabel(product) {
  const stock = product.stockQuantity === null || product.stockQuantity === undefined ? null : Number(product.stockQuantity);
  if (stock === null || Number.isNaN(stock)) return { text: 'Availability not reported', className: '' };
  if (stock <= 0) return { text: 'Out of stock', className: 'product-card__stock--out' };
  if (stock <= 5) return { text: `Only ${stock} left`, className: 'product-card__stock--low' };
  return { text: `${stock} in stock`, className: '' };
}

export function renderProductGrid(container, products, handlers) {
  container.innerHTML = '';
  container.className = 'grid grid--products';
  products.forEach((product) => {
    container.appendChild(buildCard(product, handlers));
  });
}

function buildCard(product, { onAddToCart }) {
  const stock = stockLabel(product);
  const isOutOfStock = stock.className === 'product-card__stock--out';

  const discounted = hasDiscount(product);
  const priceHtml = discounted
    ? `<span class="product-card__price">${formatCurrency(effectivePrice(product))}</span>
       <span class="product-card__price-original">${formatCurrency(product.price)}</span>
       <span class="badge badge-discount">-${Number(product.discount)}%</span>`
    : `<span class="product-card__price">${formatCurrency(product.price)}</span>`;

  const card = document.createElement('article');
  card.className = 'card product-card';
  card.innerHTML = `
    <img class="product-card__image" src="${escapeHtml(product.image)}" alt="${escapeHtml(product.name)}" loading="lazy" />
    <div class="product-card__body">
      <span class="product-card__name">${escapeHtml(product.name)}</span>
      <div class="product-card__price-row">${priceHtml}</div>
      <span class="product-card__stock ${stock.className}">${stock.text}</span>
      <div class="flex flex--gap">
        <a class="btn btn-secondary" href="product.html?id=${encodeURIComponent(product.id)}">View details</a>
        <button class="btn btn-primary" type="button" data-action="add-to-cart" ${isOutOfStock ? 'disabled' : ''}>
          Add
        </button>
      </div>
    </div>
  `;

  const addBtn = card.querySelector('[data-action="add-to-cart"]');
  addBtn.addEventListener('click', () => onAddToCart(product, 1));

  const img = card.querySelector('.product-card__image');
  img.addEventListener('error', () => { img.src = FALLBACK_IMAGE; }, { once: true });

  return card;
}
