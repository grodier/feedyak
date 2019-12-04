import { auth } from './firebase';

export function signUpUser(email, password) {
  return auth
    .createUserWithEmailAndPassword(email, password)
    .then(data => ({ data, error: null }))
    .catch(error => ({ data: null, error }));
}

export function signInUser(email, password) {
  return auth
    .signInWithEmailAndPassword(email, password)
    .then(data => ({ data, error: null }))
    .catch(error => ({ data: null, error }));
}

export function signOutUser() {
  return auth
    .signOut()
    .then(() => ({ error: null }))
    .catch(error => ({ error }));
}

export function getCurrentUser() {
  return auth.currentUser;
}

export function handleUserStateChanged(handler) {
  return auth.onAuthStateChanged(handler);
}
