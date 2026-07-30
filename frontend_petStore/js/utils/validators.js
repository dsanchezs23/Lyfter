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
  if (!isValidEmail(email)) errors.email = 'Enter a valid email address.';
  if (!isRequired(password)) errors.password = 'Password is required.';
  return { valid: Object.keys(errors).length === 0, errors };
}

export function validateRegisterForm({ name, lastName, email, password, confirmPassword, shippingAddress, phoneNumber, birthday }) {
  const errors = {};
  if (!isRequired(name)) errors.name = 'First name is required.';
  if (!isRequired(lastName)) errors.lastName = 'Last name is required.';
  if (!isValidEmail(email)) errors.email = 'Enter a valid email address.';
  if (!isValidPassword(password)) {
    errors.password = `Password must be at least ${MIN_PASSWORD_LENGTH} characters, with letters and numbers.`;
  }
  if (password !== confirmPassword) errors.confirmPassword = 'Passwords do not match.';
  if (!isRequired(shippingAddress)) errors.shippingAddress = 'Shipping address is required.';
  if (!isValidPhone(phoneNumber)) errors.phoneNumber = 'Enter a valid phone number (digits only, 8 to 15 digits).';
  if (!isRequired(birthday)) errors.birthday = 'Date of birth is required.';
  return { valid: Object.keys(errors).length === 0, errors };
}

export function validateProductForm({ name, description, category, image, price, discount, stockQuantity }) {
  const errors = {};
  if (!isRequired(name)) errors.name = 'Name is required.';
  if (!isRequired(description)) errors.description = 'Description is required.';
  if (!isRequired(category)) errors.category = 'Category is required.';
  if (!isRequired(image)) errors.image = 'Image URL is required.';
  if (!isNonNegativeNumber(price)) errors.price = 'Price must be a valid number.';
  if (!isNonNegativeNumber(discount)) errors.discount = 'Discount must be a valid number.';
  if (!isPositiveInteger(stockQuantity)) errors.stockQuantity = 'Stock must be a whole number greater than or equal to 0.';
  return { valid: Object.keys(errors).length === 0, errors };
}

export function validateCheckoutForm({ fullName, email, address, phoneNumber }) {
  const errors = {};
  if (!isRequired(fullName)) errors.fullName = 'Full name is required.';
  if (!isValidEmail(email)) errors.email = 'Enter a valid email address.';
  if (!isRequired(address)) errors.address = 'Address is required.';
  if (!isValidPhone(phoneNumber)) errors.phoneNumber = 'Enter a valid phone number (digits only, 8 to 15 digits).';
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
