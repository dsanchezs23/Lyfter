import { renderHeader, renderFooter } from '../ui/header.js';
import { requireRole } from '../utils/guards.js';
import { renderLoading, renderError } from '../ui/states.js';
import { showBanner, hideBanner } from '../ui/banner.js';
import { validateProductForm, applyFieldErrors } from '../utils/validators.js';
import { getProductById, updateProduct } from '../api/productApi.js';
import { escapeHtml } from '../utils/dom.js';
import { ApiError } from '../api/http.js';

renderHeader(document.getElementById('site-header'));
renderFooter(document.getElementById('site-footer'));

const content = document.getElementById('edit-content');
const productId = new URLSearchParams(window.location.search).get('id');

async function init() {
  if (!productId) {
    renderError(content, 'No se especificó un producto.');
    return;
  }
  renderLoading(content, 'Cargando producto...');
  try {
    const product = await getProductById(productId);
    renderForm(product);
  } catch (error) {
    const message = error instanceof ApiError ? error.message : 'No se pudo cargar el producto.';
    renderError(content, message);
  }
}

function renderForm(product) {
  content.innerHTML = `
    <div class="banner banner-error" id="form-banner" role="alert" hidden></div>
    <form class="form" id="edit-form" novalidate>
      <div class="form-field">
        <label for="name">Nombre</label>
        <input type="text" id="name" name="name" value="${escapeHtml(product.name)}" />
        <span class="field-error" data-for="name"></span>
      </div>
      <div class="form-field">
        <label for="description">Descripción</label>
        <textarea id="description" name="description" rows="3">${escapeHtml(product.description)}</textarea>
        <span class="field-error" data-for="description"></span>
      </div>
      <div class="form-grid">
        <div class="form-field">
          <label for="category">Categoría</label>
          <input type="text" id="category" name="category" value="${escapeHtml(product.category)}" />
          <span class="field-error" data-for="category"></span>
        </div>
        <div class="form-field">
          <label for="image">URL de la imagen</label>
          <input type="text" id="image" name="image" value="${escapeHtml(product.image)}" />
          <span class="field-error" data-for="image"></span>
        </div>
      </div>
      <div class="form-grid form-grid--three">
        <div class="form-field">
          <label for="price">Precio</label>
          <input type="number" id="price" name="price" min="0" step="0.01" value="${escapeHtml(product.price)}" />
          <span class="field-error" data-for="price"></span>
        </div>
        <div class="form-field">
          <label for="discount">Descuento</label>
          <input type="number" id="discount" name="discount" min="0" step="0.01" value="${escapeHtml(product.discount)}" />
          <span class="field-error" data-for="discount"></span>
        </div>
        <div class="form-field">
          <label for="stockQuantity">Inventario</label>
          <input type="number" id="stockQuantity" name="stockQuantity" min="0" step="1" value="${escapeHtml(product.stockQuantity ?? '0')}" />
          <span class="field-error" data-for="stockQuantity"></span>
        </div>
      </div>
      <div class="admin-edit-actions">
        <a class="btn btn-secondary" href="dashboard.html">Cancelar</a>
        <button class="btn btn-primary" type="submit">Guardar cambios</button>
      </div>
    </form>
  `;

  document.getElementById('edit-form').addEventListener('submit', handleSubmit);
}

async function handleSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const banner = document.getElementById('form-banner');
  hideBanner(banner);

  const fields = {
    name: form.name.value.trim(),
    description: form.description.value.trim(),
    category: form.category.value.trim(),
    image: form.image.value.trim(),
    price: form.price.value,
    discount: form.discount.value,
    stockQuantity: form.stockQuantity.value,
  };

  const { valid, errors } = validateProductForm(fields);
  applyFieldErrors(form, errors);
  if (!valid) {
    showBanner(banner, { type: 'error', message: 'Por favor completa todos los campos antes de guardar los cambios.' });
    return;
  }

  const submitBtn = form.querySelector('button[type="submit"]');
  submitBtn.disabled = true;
  try {
    await updateProduct(productId, fields);
    showBanner(banner, { type: 'success', message: 'Producto actualizado correctamente.' });
  } catch (error) {
    const message = error instanceof ApiError ? error.message : 'No se pudo guardar el producto.';
    showBanner(banner, { type: 'error', message });
  } finally {
    submitBtn.disabled = false;
  }
}

if (requireRole(['MANAGER', 'EMPLOYEE'])) {
  init();
}
