import { renderHeader, renderFooter } from '../ui/header.js';
import { renderLoading, renderEmpty, renderError } from '../ui/states.js';
import { renderProductGrid } from '../ui/productCard.js';
import { showBanner, hideBanner } from '../ui/banner.js';
import { getAllProducts } from '../api/productApi.js';
import { addItem } from '../state/cart.js';
import { ApiError } from '../api/http.js';

renderHeader(document.getElementById('site-header'));
renderFooter(document.getElementById('site-footer'));

const grid = document.getElementById('product-grid');
const searchInput = document.getElementById('search');
const onlyAvailableInput = document.getElementById('only-available');

let allProducts = [];

function isAvailable(product) {
  const stock = Number(product.stockQuantity);
  return Number.isNaN(stock) || stock > 0;
}

function applyFilters() {
  const query = searchInput.value.trim().toLowerCase();
  const onlyAvailable = onlyAvailableInput.checked;

  const filtered = allProducts.filter((product) => {
    const matchesQuery = !query || product.name.toLowerCase().includes(query) || product.category.toLowerCase().includes(query);
    const matchesAvailability = !onlyAvailable || isAvailable(product);
    return matchesQuery && matchesAvailability;
  });

  if (filtered.length === 0) {
    renderEmpty(grid, allProducts.length === 0 ? 'Aún no hay productos disponibles en el catálogo.' : 'No se encontraron productos con esos filtros.');
    return;
  }
  renderProductGrid(grid, filtered, { onAddToCart: handleAddToCart });
}

function handleAddToCart(product, quantity) {
  addItem(product, quantity);
  const banner = ensureToast();
  showBanner(banner, { type: 'success', message: `${product.name} se agregó al carrito.` });
  setTimeout(() => hideBanner(banner), 2500);
}

function ensureToast() {
  let toast = document.getElementById('toast-banner');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-banner';
    toast.className = 'toast-banner';
    toast.hidden = true;
    document.body.appendChild(toast);
  }
  return toast;
}

async function init() {
  renderLoading(grid, 'Cargando productos...');
  try {
    allProducts = await getAllProducts();
    applyFilters();
  } catch (error) {
    const message = error instanceof ApiError ? error.message : 'No se pudo cargar el catálogo.';
    renderError(grid, message);
  }
}

searchInput.addEventListener('input', applyFilters);
onlyAvailableInput.addEventListener('change', applyFilters);

init();
