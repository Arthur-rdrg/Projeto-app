import type { User } from 'firebase/auth';
import type { ShoppingItem } from '../types';

export function parseMoney(value: string) {
  const cleanValue = (value || '').replace(/[R$\s]/g, '').replace(/\./g, '');
  return Number(cleanValue.replace(',', '.'));
}

export function formatMoney(value: number) {
  return `R$ ${Number(value || 0).toFixed(2)}`;
}

export function getFirstName(user: User) {
  return user.displayName?.split(' ')[0] || user.email?.split('@')[0] || 'Usuario';
}

export function sumItemTotals(items: ShoppingItem[]) {
  return items.reduce((sum, item) => {
    const price = Number(item.unitPrice) || 0;
    const qty = Number(item.quantity) || 0;
    return sum + (price * qty);
  }, 0);
}

export function sumItemQuantities(items: ShoppingItem[]) {
  return items.reduce((sum, item) => sum + Number(item.quantity || 0), 0);
}
