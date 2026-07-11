export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const MIN_PASSWORD_LENGTH = 8;
export const PASSWORD_STRENGTH_RE = /^(?=.*[A-Za-z])(?=.*\d).+$/;
export const PHONE_RE = /^\d{8,15}$/;

export function isRequired(value) {
  return value !== undefined && value !== null && String(value).trim().length > 0;
}

export function isValidEmail(value) {
  return isRequired(value) && EMAIL_RE.test(String(value).trim());
}

export function isValidPassword(value) {
  return typeof value === 'string' && value.length >= MIN_PASSWORD_LENGTH && PASSWORD_STRENGTH_RE.test(value);
}

export function isValidPhone(value) {
  return isRequired(value) && PHONE_RE.test(String(value).trim());
}

export function isPositiveInteger(value) {
  return Number.isInteger(Number(value)) && Number(value) >= 0;
}

export function isNonNegativeNumber(value) {
  return value !== '' && !Number.isNaN(Number(value)) && Number(value) >= 0;
}

export function validateLoginForm({ email, password }) {
  const errors = {};
  if (!isValidEmail(email)) errors.email = 'Ingresa un correo electrónico válido.';
  if (!isRequired(password)) errors.password = 'La contraseña es obligatoria.';
  return { valid: Object.keys(errors).length === 0, errors };
}

export function validateRegisterForm({ name, lastName, email, password, confirmPassword, shippingAddress, phoneNumber, birthday }) {
  const errors = {};
  if (!isRequired(name)) errors.name = 'El nombre es obligatorio.';
  if (!isRequired(lastName)) errors.lastName = 'El apellido es obligatorio.';
  if (!isValidEmail(email)) errors.email = 'Ingresa un correo electrónico válido.';
  if (!isValidPassword(password)) {
    errors.password = `La contraseña debe tener al menos ${MIN_PASSWORD_LENGTH} caracteres, con letras y números.`;
  }
  if (password !== confirmPassword) errors.confirmPassword = 'Las contraseñas no coinciden.';
  if (!isRequired(shippingAddress)) errors.shippingAddress = 'La dirección de envío es obligatoria.';
  if (!isValidPhone(phoneNumber)) errors.phoneNumber = 'Ingresa un teléfono válido (solo números, 8 a 15 dígitos).';
  if (!isRequired(birthday)) errors.birthday = 'La fecha de nacimiento es obligatoria.';
  return { valid: Object.keys(errors).length === 0, errors };
}

export function validateProductForm({ name, description, category, image, price, discount, stockQuantity }) {
  const errors = {};
  if (!isRequired(name)) errors.name = 'El nombre es obligatorio.';
  if (!isRequired(description)) errors.description = 'La descripción es obligatoria.';
  if (!isRequired(category)) errors.category = 'La categoría es obligatoria.';
  if (!isRequired(image)) errors.image = 'La URL de la imagen es obligatoria.';
  if (!isNonNegativeNumber(price)) errors.price = 'El precio debe ser un número válido.';
  if (!isNonNegativeNumber(discount)) errors.discount = 'El descuento debe ser un número válido.';
  if (!isPositiveInteger(stockQuantity)) errors.stockQuantity = 'El inventario debe ser un número entero mayor o igual a 0.';
  return { valid: Object.keys(errors).length === 0, errors };
}

export function validateCheckoutForm({ fullName, email, address, phoneNumber }) {
  const errors = {};
  if (!isRequired(fullName)) errors.fullName = 'El nombre completo es obligatorio.';
  if (!isValidEmail(email)) errors.email = 'Ingresa un correo electrónico válido.';
  if (!isRequired(address)) errors.address = 'La dirección es obligatoria.';
  if (!isValidPhone(phoneNumber)) errors.phoneNumber = 'Ingresa un teléfono válido (solo números, 8 a 15 dígitos).';
  return { valid: Object.keys(errors).length === 0, errors };
}

export function applyFieldErrors(form, errors) {
  form.querySelectorAll('.invalid').forEach((el) => el.classList.remove('invalid'));
  form.querySelectorAll('.field-error').forEach((el) => (el.textContent = ''));
  Object.entries(errors).forEach(([field, message]) => {
    const input = form.querySelector(`[name="${field}"]`);
    const errorEl = form.querySelector(`[data-for="${field}"]`);
    if (input) input.classList.add('invalid');
    if (errorEl) errorEl.textContent = message;
  });
}
