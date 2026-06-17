import { FirebaseError } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User,
} from 'firebase/auth';
import { auth } from './firebaseConfig';

export function watchAuthState(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}

export async function loginWithEmail(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email.trim(), password);
}

export async function registerWithEmail(
  email: string,
  password: string,
  displayName: string,
) {
  const credential = await createUserWithEmailAndPassword(auth, email.trim(), password);

  if (displayName?.trim()) {
    await updateProfile(credential.user, {
      displayName: displayName.trim(),
    });
  }

  return credential;
}

export async function logout() {
  return signOut(auth);
}

export function getAuthErrorMessage(error: unknown) {
  const messages: Record<string, string> = {
    'auth/email-already-in-use': 'Este e-mail ja esta cadastrado.',
    'auth/invalid-email': 'Digite um e-mail valido.',
    'auth/invalid-credential': 'E-mail ou senha incorretos.',
    'auth/missing-password': 'Digite sua senha.',
    'auth/network-request-failed': 'Falha de conexao. Verifique sua internet.',
    'auth/weak-password': 'A senha precisa ter pelo menos 6 caracteres.',
  };

  const errorCode = error instanceof FirebaseError ? error.code : '';

  return messages[errorCode] || 'Nao foi possivel concluir. Tente novamente.';
}
