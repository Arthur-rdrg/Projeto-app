export function parseMoney(value) {
  return Number(value.replace(',', '.'));
}

export function formatMoney(value) {
  return `R$ ${Number(value || 0).toFixed(2)}`;
}

export function getFirstName(user) {
  return user.displayName?.split(' ')[0] || user.email?.split('@')[0] || 'Usuario';
}

export function sumItemTotals(items) {
  return items.reduce((sum, item) => sum + Number(item.total || 0), 0);
}

export function sumItemQuantities(items) {
  return items.reduce((sum, item) => sum + Number(item.quantity || 0), 0);
}
