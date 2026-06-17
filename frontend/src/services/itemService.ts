import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  FirestoreError,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import type { ShoppingItem } from '../types';
import { db } from './firebaseConfig';

type NewShoppingItem = Omit<ShoppingItem, 'id' | 'total'>;

function userItemsCollection(userId: string) {
  return collection(db, 'users', userId, 'items');
}

export function watchUserItems(
  userId: string,
  callback: (items: ShoppingItem[]) => void,
  onError: (error: FirestoreError) => void,
) {
  const itemsQuery = query(userItemsCollection(userId), orderBy('createdAt', 'desc'));

  return onSnapshot(
    itemsQuery,
    (snapshot) => {
      const items = snapshot.docs.map((itemDoc) => ({
        id: itemDoc.id,
        ...itemDoc.data(),
      })) as ShoppingItem[];

      callback(items);
    },
    onError,
  );
}

export async function addShoppingItem(userId: string, item: NewShoppingItem) {
  const unitPrice = Number(item.unitPrice);
  const quantity = Number(item.quantity);

  return addDoc(userItemsCollection(userId), {
    imageUrl: item.imageUrl || '',
    name: item.name.trim(),
    unitPrice,
    quantity,
    total: unitPrice * quantity,
    createdAt: serverTimestamp(),
  });
}

export async function updateItemQuantity(
  userId: string,
  item: ShoppingItem,
  quantity: number,
) {
  const newQuantity = Math.max(1, Number(quantity));
  const itemRef = doc(db, 'users', userId, 'items', item.id);

  return updateDoc(itemRef, {
    quantity: newQuantity,
    total: Number(item.unitPrice) * newQuantity,
  });
}

export async function deleteShoppingItem(userId: string, itemId: string) {
  const itemRef = doc(db, 'users', userId, 'items', itemId);
  return deleteDoc(itemRef);
}

export function getFirestoreErrorMessage(error: unknown) {
  const messages: Record<string, string> = {
    'permission-denied': 'Sem permissao para salvar no Firestore. Confira as regras do banco.',
    unavailable: 'Firestore indisponivel no momento. Verifique sua internet.',
    unauthenticated: 'Entre na conta novamente antes de salvar.',
  };

  const errorCode = error instanceof FirestoreError ? error.code : '';

  return messages[errorCode] || 'Nao foi possivel salvar os dados do produto.';
}
