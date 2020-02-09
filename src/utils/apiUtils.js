import fetch from 'isomorphic-fetch';
import { getUserToken } from './userUtils';
import { pipe } from './functional';

function addGetMethod(requestObj) {
  return { ...requestObj, method: 'GET' };
}

function addPostMethod(requestObj) {
  return { ...requestObj, method: 'POST' };
}

function addPutMethod(requestObj) {
  return { ...requestObj, method: 'PUT' };
}

function addDeleteMethod(requestObj) {
  return { ...requestObj, method: 'DELETE' };
}

function addJSONConent(requestObj) {
  const requestHeaders = requestObj.headers;
  const headers = {
    ...requestHeaders,
    'Content-Type': 'application/json',
  };
  return { ...requestObj, headers };
}

function addAuthentication(token) {
  return function(requestObj) {
    const requestHeaders = requestObj.headers;
    const headers = {
      ...requestHeaders,
      authorization: `Bearer ${token}`,
    };
    return { ...requestObj, headers };
  };
}

function addBodyData(dataObj) {
  return function(requestObj) {
    return { ...requestObj, body: JSON.stringify(dataObj) };
  };
}

export async function getRequest(url) {
  const token = await getUserToken();
  const requestObj = pipe(addGetMethod, addAuthentication(token))({});
  return fetch(url, requestObj);
}

export async function postCookieRequest(url, session) {
  const reqObj = pipe(
    addPostMethod,
    addBodyData({ session }),
    addJSONConent
  )({ credentials: 'same-origin' });
  return fetch(url, reqObj);
}

export async function postRequest(url, data) {
  const token = await getUserToken();
  const requestObj = pipe(
    addAuthentication(token),
    addPostMethod,
    addBodyData(data),
    addJSONConent
  )({});
  return fetch(url, requestObj);
}
