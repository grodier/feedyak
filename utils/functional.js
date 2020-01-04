const _pipe = (f, g) => (...args) => g(f(...args));
export const pipe = (...fns) => fns.reduce(_pipe);

export const asyncPipe = (...functions) => input =>
  functions.reduce((chain, func) => chain.then(func), Promise.resolve(input));
