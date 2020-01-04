import { auth } from '../firebase/firebase-client';
import { getUser, createUser } from './api';

export function signUpUser(email, password, name, callback) {
  return auth
    .createUserWithEmailAndPassword(email, password)
    .then(data => callback({ newUser: true, ...data.user }));
}

export function signInUser(email, password) {
  return auth.signInWithEmailAndPassword(email, password);
}

export function getUserData(user) {
  console.log(user);
  return getUser(user.uid);
}

export function createUserData(user, name) {
  return createUser(user.uid, name, user.email);
}

export function handleUserStateChanged(handler) {
  return auth.onAuthStateChanged(handler);
}

export function signOutUser() {
  return auth.signOutUser();
}

export function getCurrentUser() {
  return auth.currentUser;
}

export async function getUserToken() {
  return auth.currentUser.getIdToken();
}
