import { signUpUser } from '../../utils/userUtils';
import { assign } from 'xstate';

const saveName = assign({ name: (context, event) => event.name });
const saveEmail = assign({ email: (context, event) => event.email });
const savePassword = assign({ password: (context, event) => event.password });

const actions = {
  saveEmail,
  saveName,
  savePassword,
};

const isNoName = (context, event) => context.name.length === 0;
const isNoEmail = (context, event) => context.email.length === 0;
const isNoPassword = (context, event) => context.password.length === 0;
const isEmailInUse = (context, event) =>
  event.data.code === 'auth/email-already-in-use';
const isInvalidEmail = (context, event) =>
  event.data.code === 'auth/invalid-email';
const isWeakPassword = (context, event) =>
  event.data.code === 'auth/weak-password';

const guards = {
  isEmailInUse,
  isInvalidEmail,
  isNoEmail,
  isNoName,
  isNoPassword,
  isWeakPassword,
};

function createServices(updateUser) {
  const services = {
    signUpUser: (context, event) =>
      signUpUser(context.email, context.password, name, updateUser),
  };
  return services;
}

export function initMachineOptions(reroute, updateUser) {
  const machineOptions = {
    actions: { ...actions, reroute },
    guards,
    services: createServices(updateUser),
  };

  return machineOptions;
}
