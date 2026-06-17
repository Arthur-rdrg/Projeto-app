import type { User } from 'firebase/auth';
import type { ShoppingItem } from '../types';

export function parseMoney(value: string) {
  return Number(value.replace(',', '.'));
}

export function formatMoney(value: number) {
  return `R$ ${Number(value || 0).toFixed(2)}`;
}

export function getFirstName(user: User) {
  return user.displayName?.split(' ')[0] || user.email?.split('@')[0] || 'Usuario';
}

export function sumItemTotals(items: ShoppingItem[]) {
  return items.reduce((sum, item) => sum + Number(item.total || 0), 0);
}

export function sumItemQuantities(items: ShoppingItem[]) {
  return items.reduce((sum, item) => sum + Number(item.quantity || 0), 0);
}
