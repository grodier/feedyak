import { useMachine } from '@xstate/react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAuth } from '../context/auth-context';
import { createSignUpMachine } from '../machines/signUpMachine';

function SignUp() {
  const { updateUser } = useAuth();
  const router = useRouter();
  const reroute = () => router.push('/app');

  const [current, send] = useMachine(createSignUpMachine(reroute, updateUser));

  const handleNameChange = event => {
    send({
      type: 'INPUT_NAME',
      name: event.target.value,
    });
  };

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
    console.log('SUMBIT', current);
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
            for="name"
          >
            Name
          </label>
          <input
            id="name"
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${current.matches(
              'ready.name.error'
            ) && 'border-red-500'}`}
            type="text"
            onChange={handleNameChange}
            value={current.context.name}
            disabled={current.matches('submitting')}
            autoFocus
          />
          {current.matches('ready.name.error') && (
            <p class="text-red-500 text-xs italic mt-2">Please enter a name.</p>
          )}
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            for="email"
          >
            Email
          </label>
          <input
            id="email"
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${current.matches(
              'ready.email.error'
            ) && 'border-red-500'}`}
            type="text"
            onChange={handleEmailChange}
            value={current.context.email}
            disabled={current.matches('submitting')}
          />
          {current.matches('ready.email.error') && (
            <p class="text-red-500 text-xs italic mt-2">
              {current.matches('ready.email.error.empty') &&
                'Please enter your email.'}
              {current.matches('ready.email.error.invalid') &&
                'Please enter a valid email address.'}
              {current.matches('ready.email.error.alreadyInUse') &&
                'Email address is already in use. Please try another.'}
            </p>
          )}
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            for="password"
          >
            Password
          </label>
          <input
            id="password"
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${current.matches(
              'ready.password.error'
            ) && 'border-red-500'}`}
            type="password"
            onChange={handlePasswordChange}
            value={current.context.password}
            disabled={current.matches('submitting')}
          />
          {current.matches('ready.password.error') && (
            <p class="text-red-500 text-xs italic mt-2">
              {current.matches('ready.password.error.empty') &&
                'Please enter your password.'}
              {current.matches('ready.password.error.weak') &&
                'Password should be at least 6 characters.'}
            </p>
          )}
        </div>
        {current.matches('ready.otherErrors.error') && (
          <p class="text-red-500 text-xs italic mt-2">
            An unexpected error occurred. Please try again.
          </p>
        )}
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Sign Up
        </button>
        <hr className="my-6"></hr>
        <p>
          Already have an account?{' '}
          <Link href="/signin">
            <a className="inline-block align-baseline font-bold text-blue-500 hover:text-blue-800">
              Sign In
            </a>
          </Link>
        </p>
      </form>
    </div>
  );
}

export default SignUp;
