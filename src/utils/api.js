import { getCookieRequest, postRequest } from './apiUtils';

export function getUser(userId) {
  const url = `/api/user/${userId}`;
  return getRequest(url).then(response => response.json());
}

export function getMe(session, origin) {
  const url = `${origin || ''}/api/me`;
  return getCookieRequest(url, session).then(response => response.json());
}

export function createUser(userId, name, email) {
  const userObj = {
    uid: userId,
    name,
    email,
  };

  return postRequest(`/api/user`, userObj).then(response => response.json());
}

export function loginSession() {
  return postRequest(`/api/login-session`, {}).then(async response =>
    response.json()
  );
}

export function logoutSession() {
  return postRequest(`/api/logout-session`, {}).then(response =>
    response.json()
  );
}
