import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { db } from './firebaseConfig';

function userItemsCollection(userId) {
  return collection(db, 'users', userId, 'items');
}

export function watchUserItems(userId, callback, onError) {
  const itemsQuery = query(userItemsCollection(userId), orderBy('createdAt', 'desc'));

  return onSnapshot(
    itemsQuery,
    (snapshot) => {
      const items = snapshot.docs.map((itemDoc) => ({
        id: itemDoc.id,
        ...itemDoc.data(),
      }));

      callback(items);
    },
    onError,
  );
}

export async function addShoppingItem(userId, item) {
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

export async function updateItemQuantity(userId, item, quantity) {
  const newQuantity = Math.max(1, Number(quantity));
  const itemRef = doc(db, 'users', userId, 'items', item.id);

  return updateDoc(itemRef, {
    quantity: newQuantity,
    total: Number(item.unitPrice) * newQuantity,
  });
}

export async function deleteShoppingItem(userId, itemId) {
  const itemRef = doc(db, 'users', userId, 'items', itemId);
  return deleteDoc(itemRef);
}

export function getFirestoreErrorMessage(error) {
  const messages = {
    'permission-denied': 'Sem permissao para salvar no Firestore. Confira as regras do banco.',
    unavailable: 'Firestore indisponivel no momento. Verifique sua internet.',
    unauthenticated: 'Entre na conta novamente antes de salvar.',
  };

  return messages[error?.code] || 'Nao foi possivel salvar os dados do produto.';
}
