export function formatCurrency(value) {
  const number = Number(value) || 0;
  return `$${number.toLocaleString('en-US')}`;
}

export function formatDate(value) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}
