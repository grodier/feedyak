import { postCookieRequest, postRequest, getRequest } from './apiUtils';
import CustomError from './error';

export function getUser(userId) {
  const url = `/api/user/${userId}`;
  return getRequest(url).then(response => response.json());
}

export function getMe(session, origin) {
  const url = `${origin || ''}/api/me`;
  return postCookieRequest(url, session).then(async response => {
    if (response.status === 401) {
      const jsonResponse = await response.json();
      throw new CustomError(jsonResponse.message, jsonResponse.code);
    }
    const { data } = await response.json();
    return data;
  });
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

export function logoutSession(session) {
  return postCookieRequest(`/api/logout-session`, session).then(response =>
    response.json()
  );
}

export function getFeedback() {
  //const feedback = ['item 1', 'item2', "here's some more feedback"];
  return getRequest(`/api/feedback`)
    .then(response => {
      return response.json();
    })
    .catch(error => {
      console.log(error);
    });
}
