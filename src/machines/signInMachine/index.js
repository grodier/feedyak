import { Machine } from 'xstate';
import { signInMachineConfig } from './signInMachineConfig';
import { initMachineOptions } from './signInMachineOptions';

export const createSignInMachine = (reroute, updateUser) =>
  Machine(signInMachineConfig, initMachineOptions(reroute, updateUser));
