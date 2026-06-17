import type { User } from 'firebase/auth';

export type ShoppingTab = 'home' | 'list' | 'check';

export type ShoppingItem = {
  id: string;
  imageUrl: string;
  name: string;
  quantity: number;
  total: number;
  unitPrice: number;
};

export type ShoppingItemForm = {
  imageUri: string;
  name: string;
  quantity: string;
  unitPrice: string;
};

export type FormField = keyof ShoppingItemForm;

export type AuthenticatedUser = User;
