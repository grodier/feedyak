const readyEmailState = {
  initial: 'noError',
  states: {
    noError: {},
    error: {
      initial: 'empty',
      states: {
        empty: {},
        invalid: {},
        userDisabled: {},
        userNotFound: {},
      },
    },
  },
};

const readyPasswordState = {
  initial: 'noError',
  states: {
    noError: {},
    error: {
      initial: 'empty',
      states: {
        empty: {},
        wrong: {},
      },
    },
  },
};

const readyOtherErrorsState = {
  initial: 'noError',
  states: {
    noError: {},
    error: {
      on: {
        SUMBIT: '#signInForm.submitting',
      },
    },
  },
};

const readyState = {
  type: 'parallel',
  on: {
    INPUT_EMAIL: {
      actions: 'saveEmail',
      target: '.email.noError',
    },
    INPUT_PASSWORD: {
      actions: 'savePassword',
      target: '.password.noError',
    },
    SUBMIT: [
      {
        cond: 'isNoEmail',
        target: '.email.error.empty',
      },
      {
        cond: 'isNoPassword',
        target: '.password.error.empty',
      },
      {
        target: 'submitting',
      },
    ],
  },
  states: {
    email: readyEmailState,
    password: readyPasswordState,
    otherErrors: readyOtherErrorsState,
  },
};

const submittingState = {
  on: {
    CANCEL: 'ready',
  },
  invoke: {
    src: 'signInUser',
    onDone: 'success',
    onError: [
      {
        cond: 'isInvalidEmail',
        target: 'ready.email.error.invalid',
      },
      {
        cond: 'isWrongPassword',
        target: 'ready.password.error.wrong',
      },
      {
        cond: 'isUserDisabled',
        target: 'ready.email.error.userDisabled',
      },
      {
        cond: 'isUserNotFound',
        target: 'ready.email.error.userNotFound',
      },
      {
        target: 'ready.otherErrors.error',
      },
    ],
  },
};

export const signInMachineConfig = {
  id: 'signInForm',
  context: {
    email: '',
    password: '',
  },
  initial: 'ready',
  states: {
    ready: readyState,
    submitting: submittingState,
    success: {
      entry: 'reroute',
    },
  },
};
