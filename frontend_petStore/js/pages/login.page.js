import { renderHeader, renderFooter } from '../ui/header.js';
import { showBanner, hideBanner } from '../ui/banner.js';
import { validateLoginForm, applyFieldErrors } from '../utils/validators.js';
import { login } from '../api/userApi.js';
import { setSession } from '../state/session.js';
import { ApiError } from '../api/http.js';

renderHeader(document.getElementById('site-header'));
renderFooter(document.getElementById('site-footer'));

const form = document.getElementById('login-form');
const banner = document.getElementById('form-banner');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  hideBanner(banner);

  const payload = {
    email: form.email.value.trim(),
    password: form.password.value,
  };

  const { valid, errors } = validateLoginForm(payload);
  applyFieldErrors(form, errors);
  if (!valid) {
    showBanner(banner, { type: 'error', message: 'Please review the fields highlighted in red.' });
    return;
  }

  const submitBtn = form.querySelector('button[type="submit"]');
  submitBtn.disabled = true;
  try {
    const session = await login(payload.email, payload.password);
    setSession(session);
    window.location.href = 'catalog.html';
  } catch (error) {
    const message =
      error instanceof ApiError && error.status === 401
        ? 'Incorrect credentials. Please try again.'
        : error instanceof ApiError
          ? error.message
          : 'Could not log in.';
    showBanner(banner, { type: 'error', message });
  } finally {
    submitBtn.disabled = false;
  }
});
