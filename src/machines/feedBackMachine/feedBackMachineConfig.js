export const feedBackMachineConfig = {
  id: 'feedbackList',
  context: {
    feedback: [],
  },
  initial: 'requesting',
  states: {
    idle: {
      initial: 'noError',
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
