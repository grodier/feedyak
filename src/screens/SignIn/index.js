import { useMachine } from '@xstate/react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { createSignInMachine } from '../../machines/signInMachine';

function SignIn() {
  const router = useRouter();
  const reroute = () => router.push('/app');

  const [current, send] = useMachine(createSignInMachine(reroute));

  const handleEmailChange = event => {
    send({
      type: 'INPUT_EMAIL',
      email: event.target.value,
    });
  };

  const handlePasswordChange = event => {
    send({
      type: 'INPUT_PASSWORD',
      password: event.target.value,
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    send({ type: 'SUBMIT' });
  };

  return (
    <div className="min-h-screen bg-gray-300 flex items-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xs mx-auto bg-white shadow-md rounded px-8 py-6"
      >
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            id="email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            onChange={handleEmailChange}
            value={current.context.email}
            disabled={current.matches('submitting')}
            autoFocus
          />
          {current.matches('ready.email.error') && (
            <p className="text-red-500 text-xs italic mt-2">
              {current.matches('ready.email.error.empty') &&
                'Please enter your email.'}
              {current.matches('ready.email.error.invalid') &&
                'Please enter a valid email address.'}
              {current.matches('ready.email.error.userNotFound') &&
                'User not found. Please try another email or sign up.'}
              {current.matches('ready.email.error.userDisabled') &&
                'User has been disabled. Please try another email or try again later.'}
            </p>
          )}
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            id="password"
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${current.matches(
              'ready.password.error'
            ) && 'border-red-500'}`}
            type="text"
            onChange={handlePasswordChange}
            value={current.context.password}
            disabled={current.matches('submitting')}
          />
          {current.matches('ready.password.error') && (
            <p className="text-red-500 text-xs italic mt-2">
              {current.matches('ready.password.error.empty') &&
                'Please enter your email.'}
              {current.matches('ready.password.error.wrong') &&
                'Password is not correct. Please provide a correct password.'}
            </p>
          )}
        </div>
        {current.matches('ready.otherErrors.error') && <div>OTHER ERROR</div>}
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Sign In
        </button>
        <Link href="/">
          <a className="block mt-2 mx-auto text-center align-baseline font-bold text-blue-500 hover:text-blue-800">
            Forgot Password?
          </a>
        </Link>
        <hr className="my-6"></hr>
        <p>
          Don't have an account?{' '}
          <Link href="/signup">
            <a className="inline-block align-baseline font-bold text-blue-500 hover:text-blue-800">
              Sign Up
            </a>
          </Link>
        </p>
      </form>
    </div>
  );
}

export default SignIn;
