import { getFeedback } from '../../utils/api';
import { assign } from 'xstate';

const addFeedback = assign({
  feedback: (context, event) => {
    console.log('ADD FB', event);
    return event.data.feedback;
  },
});

const actions = { addFeedback };

const services = {
  getFeedback,
};

export function initMachineOptions() {
  const machineOptions = {
    actions,
    services,
  };
  return machineOptions;
}
