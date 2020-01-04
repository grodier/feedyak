import { getRequest, postRequest } from './apiUtils';

export function getUser(userId) {
  return getRequest(`/api/user/${userId}`).then(response => response.json());
}

export function createUser(userId, name, email) {
  const userObj = {
    uid: userId,
    name,
    email,
  };

  return postRequest(`api/user`, userObj);
}
