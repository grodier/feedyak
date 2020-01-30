import { getCookieRequest, postRequest } from './apiUtils';

export function getUser(userId, cookies) {
  return getCookieRequest(
    `/api/user/${userId}`,
    cookies.session
  ).then(response => response.json());
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
  console.log('loging call');
  return postRequest(`/api/login-session`, {}).then(async response => {
    console.log('Response', response);
    try {
      const myresponse = await response.json();
      console.log('MYRESPONSE', myresponse);
      return myresponse;
    } catch (error) {
      console.log(error);
      return response;
    }
  });
}

export function logoutSession() {
  return postRequest(`api/logout-session`, {}).then(response =>
    response.json()
  );
}
