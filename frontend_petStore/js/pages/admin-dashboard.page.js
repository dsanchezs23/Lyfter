import { renderHeader, renderFooter } from '../ui/header.js';
import { requireRole } from '../utils/guards.js';
import { renderLoading, renderEmpty, renderError } from '../ui/states.js';
import { showBanner, hideBanner } from '../ui/banner.js';
import { validateProductForm, applyFieldErrors } from '../utils/validators.js';
import { getAllProducts, createProduct } from '../api/productApi.js';
import { getAllOrders } from '../api/orderApi.js';
import { formatCurrency, formatDate } from '../utils/format.js';
import { escapeHtml } from '../utils/dom.js';
import { ApiError } from '../api/http.js';

renderHeader(document.getElementById('site-header'));
renderFooter(document.getElementById('site-footer'));

const inventoryContainer = document.getElementById('inventory-container');
const ordersContainer = document.getElementById('orders-container');
const productForm = document.getElementById('product-form');
const productFormBanner = document.getElementById('product-form-banner');

async function loadInventory() {
  renderLoading(inventoryContainer, 'Cargando inventario...');
  try {
    const products = await getAllProducts();
    if (products.length === 0) {
      renderEmpty(inventoryContainer, 'Todavía no hay productos registrados.');
      return;
    }
    renderInventoryTable(products);
  } catch (error) {
    const message = error instanceof ApiError ? error.message : 'No se pudo cargar el inventario.';
    renderError(inventoryContainer, message);
  }
}

function renderInventoryTable(products) {
  const rows = products
    .map(
      (product) => `
      <tr>
        <td>${escapeHtml(product.id)}</td>
        <td>${escapeHtml(product.name)}</td>
        <td>${formatCurrency(product.price)}</td>
        <td>${escapeHtml(product.category)}</td>
        <td>${product.stockQuantity ?? '—'}</td>
        <td><a class="btn btn-secondary" href="product-edit.html?id=${encodeURIComponent(product.id)}">Editar</a></td>
      </tr>`
    )
    .join('');

  inventoryContainer.innerHTML = `
    <div class="table-wrap">
      <table>
        <thead>
          <tr><th>ID</th><th>Nombre</th><th>Precio</th><th>Categoría</th><th>Stock</th><th>Acciones</th></tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  `;
}

async function loadOrders() {
  renderLoading(ordersContainer, 'Cargando ventas...');
  try {
    const orders = await getAllOrders();
    if (orders.length === 0) {
      renderEmpty(ordersContainer, 'Todavía no se han registrado ventas.');
      return;
    }
    renderOrdersTable(orders);
  } catch (error) {
    const message = error instanceof ApiError ? error.message : 'No se pudo cargar el historial de ventas.';
    renderError(ordersContainer, message);
  }
}

function renderOrdersTable(orders) {
  const rows = orders
    .map(
      (order) => `
      <tr>
        <td>${escapeHtml(order.id)}</td>
        <td>${escapeHtml(order.userId)}</td>
        <td>${escapeHtml(order.status)}</td>
        <td>${order.cartItems?.length ?? 0}</td>
        <td>${formatCurrency(order.totalPrice)}</td>
        <td>${formatDate(order.orderDate)}</td>
      </tr>`
    )
    .join('');

  ordersContainer.innerHTML = `
    <div class="table-wrap">
      <table>
        <thead>
          <tr><th>ID</th><th>Cliente</th><th>Estado</th><th>Ítems</th><th>Total</th><th>Fecha</th></tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  `;
}

productForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  hideBanner(productFormBanner);

  const fields = {
    name: productForm.name.value.trim(),
    description: productForm.description.value.trim(),
    category: productForm.category.value.trim(),
    image: productForm.image.value.trim(),
    price: productForm.price.value,
    discount: productForm.discount.value,
    stockQuantity: productForm.stockQuantity.value,
  };

  const { valid, errors } = validateProductForm(fields);
  applyFieldErrors(productForm, errors);
  if (!valid) {
    showBanner(productFormBanner, { type: 'error', message: 'Por favor completa todos los campos correctamente.' });
    return;
  }

  const submitBtn = productForm.querySelector('button[type="submit"]');
  submitBtn.disabled = true;
  try {
    await createProduct(fields);
    showBanner(productFormBanner, { type: 'success', message: 'Producto agregado correctamente.' });
    productForm.reset();
    await loadInventory();
  } catch (error) {
    const message = error instanceof ApiError ? error.message : 'No se pudo agregar el producto.';
    showBanner(productFormBanner, { type: 'error', message });
  } finally {
    submitBtn.disabled = false;
  }
});

if (requireRole(['MANAGER', 'EMPLOYEE'])) {
  loadInventory();
  loadOrders();
}
