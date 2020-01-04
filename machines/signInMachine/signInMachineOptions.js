import { signInUser } from '../../utils/userUtils';
import { assign } from 'xstate';

const saveEmail = assign({ email: (context, event) => event.email });
const savePassword = assign({ password: (context, event) => event.password });

const actions = {
  saveEmail,
  savePassword,
};

const isNoEmail = (context, event) => context.email.length === 0;
const isNoPassword = (context, event) => context.password.length === 0;
const isInvalidEmail = (context, event) =>
  event.data.code === 'auth/invalid-email';
const isWrongPassword = (context, event) =>
  event.data.code === 'auth/wrong-password';
const isUserNotFound = (context, event) =>
  event.data.code === 'auth/user-not-found';
const isUserDisabled = (context, event) =>
  event.data.code === 'auth/user-disabled';

const guards = {
  isInvalidEmail,
  isNoEmail,
  isNoPassword,
  isWrongPassword,
  isUserDisabled,
  isUserNotFound,
};

function createServices() {
  const services = {
    signInUser: (context, event) => signInUser(context.email, context.password),
  };
  return services;
}

export function initMachineOptions(reroute) {
  const machineOptions = {
    actions: { ...actions, reroute },
    guards,
    services: createServices(),
  };

  return machineOptions;
}
