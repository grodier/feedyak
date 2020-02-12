import { Machine } from 'xstate';
import { feedBackMachineConfig } from './feedBackMachineConfig';
import { initMachineOptions } from './feedBackMachineOptions';

export const createFeedBackMachine = () =>
  Machine(feedBackMachineConfig, initMachineOptions());
