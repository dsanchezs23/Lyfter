export function formatCurrency(value) {
  const number = Number(value) || 0;
  return `$${number.toLocaleString('en-US')}`;
}

// `discount` is a percentage off `price` (e.g. discount "20" on price "100" → 80).
export function hasDiscount(product) {
  return Number(product?.discount) > 0;
}

export function effectivePrice(product) {
  const price = Number(product?.price) || 0;
  const discount = Number(product?.discount) || 0;
  if (discount <= 0) return price;
  const discounted = price * (1 - Math.min(discount, 100) / 100);
  return Math.round(discounted);
}

export function formatDate(value) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}
