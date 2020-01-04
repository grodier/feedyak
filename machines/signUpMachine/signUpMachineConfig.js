const readyNameState = {
  initial: 'noError',
  states: {
    noError: {},
    error: {},
  },
};

const readyEmailState = {
  initial: 'noError',
  states: {
    noError: {},
    error: {
      initial: 'empty',
      states: {
        empty: {},
        invalid: {},
        alreadyInUse: {},
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
        weak: {},
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
        SUMBIT: '#signUpForm.submitting',
      },
    },
  },
};

const readyState = {
  type: 'parallel',
  on: {
    INPUT_NAME: {
      actions: 'saveName',
      target: '.name.noError',
    },
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
        cond: 'isNoName',
        target: '.name.error',
      },
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
    name: readyNameState,
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
    src: 'signUpUser',
    onDone: 'success',
    onError: [
      {
        cond: 'isEmailInUse',
        target: 'ready.email.error.alreadyInUse',
      },
      {
        cond: 'isInvalidEmail',
        target: 'ready.email.error.invalid',
      },
      {
        cond: 'isWeakPassword',
        target: 'ready.password.error.weak',
      },
      {
        target: 'ready.otherErrors.error',
      },
    ],
  },
};

export const signUpMachineConfig = {
  id: 'signUpForm',
  context: {
    name: '',
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
