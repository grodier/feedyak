import { auth } from '../firebase/firebase-client';
import cookie from 'js-cookie';

import { getUser, createUser, loginSession, logoutSession, getMe } from './api';

export function getCookie(name) {
  var re = new RegExp(name + '=([^;]+)');
  var value = re.exec(document.cookie);
  return value != null ? unescape(value[1]) : null;
}

export function signUpUser(email, password, name, callback) {
  return auth
    .createUserWithEmailAndPassword(email, password)
    .then(data => createUserData({ ...data.user, name }))
    .then(user => loginSession())
    .then(data => cookie.set('session', data.sessionToken));
}

export function signInUser(email, password) {
  return auth
    .signInWithEmailAndPassword(email, password)
    .then(user => {
      return loginSession();
    })
    .then(data => {
      cookie.set('session', data.sessionToken);
    });
}

export function getUserData(uid) {
  return getUser(uid);
}

export function getMeData(session, origin) {
  return getMe(session, origin);
}

export function createUserData(user) {
  return createUser(user.uid, user.name, user.email);
}

export function handleUserStateChanged(handler) {
  return auth.onAuthStateChanged(handler);
}

export function signOutUser() {
  return auth.signOutUser().then(user => logoutSession());
}

export function getCurrentUser() {
  return auth.currentUser;
}

export async function getUserToken() {
  return auth.currentUser.getIdToken();
}
