import { renderHeader, renderFooter } from '../ui/header.js';
import { showBanner, hideBanner } from '../ui/banner.js';
import { validateRegisterForm, applyFieldErrors } from '../utils/validators.js';
import { register } from '../api/userApi.js';
import { setSession } from '../state/session.js';
import { ApiError } from '../api/http.js';

renderHeader(document.getElementById('site-header'));
renderFooter(document.getElementById('site-footer'));

const form = document.getElementById('register-form');
const banner = document.getElementById('form-banner');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  hideBanner(banner);

  const fields = {
    name: form.name.value.trim(),
    lastName: form.lastName.value.trim(),
    email: form.email.value.trim(),
    password: form.password.value,
    confirmPassword: form.confirmPassword.value,
    phoneNumber: form.phoneNumber.value.trim(),
    birthday: form.birthday.value,
    shippingAddress: form.shippingAddress.value.trim(),
  };

  const { valid, errors } = validateRegisterForm(fields);
  applyFieldErrors(form, errors);
  if (!valid) {
    showBanner(banner, { type: 'error', message: 'Por favor completa todos los campos correctamente.' });
    return;
  }

  const submitBtn = form.querySelector('button[type="submit"]');
  submitBtn.disabled = true;
  try {
    const payload = {
      name: fields.name,
      lastName: fields.lastName,
      email: fields.email,
      password: fields.password,
      phoneNumber: fields.phoneNumber,
      birthday: `${fields.birthday}T00:00:00`,
      shippingAddress: fields.shippingAddress,
    };
    const session = await register('customer', payload);
    setSession(session);
    window.location.href = 'catalog.html';
  } catch (error) {
    const message = error instanceof ApiError ? error.message : 'No se pudo completar el registro.';
    showBanner(banner, { type: 'error', message });
  } finally {
    submitBtn.disabled = false;
  }
});
