import { Machine } from 'xstate';
import { signUpMachineConfig } from './signUpMachineConfig';
import { initMachineOptions } from './signUpMachineOptions';

export const createSignUpMachine = (reroute, updateUser) =>
  Machine(signUpMachineConfig, initMachineOptions(reroute, updateUser));
