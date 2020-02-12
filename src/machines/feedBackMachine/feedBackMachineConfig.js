export const feedBackMachineConfig = {
  id: 'feedbackList',
  context: {
    feedback: [],
  },
  initial: 'idle',
  states: {
    idle: {
      initial: 'noError',
      on: {
        LOAD: 'requesting',
      },
      states: {
        error: {},
        noError: {},
      },
    },
    requesting: {
      on: {
        CANCEL: 'idle',
      },
      invoke: {
        src: 'getFeedback',
        onDone: {
          target: 'idle',
          actions: 'addFeedback',
        },
        onError: 'idle.error',
      },
    },
  },
};
