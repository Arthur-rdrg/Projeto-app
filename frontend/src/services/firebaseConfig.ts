import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyA679OvW7VeBGLeRobUfOAqnPm6OuIq9Rc',
  authDomain: 'lista-inteligente-compra-506ed.firebaseapp.com',
  projectId: 'lista-inteligente-compra-506ed',
  messagingSenderId: '797896332323',
  appId: '1:797896332323:web:b650b8710e08bcfd718d96',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
