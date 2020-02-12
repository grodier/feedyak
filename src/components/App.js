import React from 'react';
import { useMachine } from '@xstate/react';
import { useRouter } from 'next/router';
import nextCookie from 'next-cookies';
import absoluteUrl from 'next-absolute-url';
import ProtectedPage from './ProtectedPage';
import { getMeData, signOutUser } from '../utils/userUtils';
import { createFeedBackMachine } from '../machines/feedBackMachine';

const App = ({ loggedIn, session, user }) => {
  const [current, send] = useMachine(createFeedBackMachine());

  const router = useRouter();

  async function logout() {
    signOutUser(session);
    router.push('/signin');
  }

  return (
    <ProtectedPage loggedIn={loggedIn}>
      {loggedIn && (
        <div>
          <header className="p-6 border-b border-gray-300">
            <div className="flex justify-between items-center container mx-auto">
              <div>FeedYak</div>
              <button
                className="border border-blue-600 p-2 rounded"
                onClick={logout}
              >
                Sign Out
              </button>
            </div>
          </header>
          <div>Hello {user.name}!</div>
          {current.matches('requesting') && 'Loading...'}
          <ul>
            {current.matches('idle') &&
              loggedIn &&
              current.context.feedback.map(item => <li key={item}>{item}</li>)}
          </ul>
        </div>
      )}
    </ProtectedPage>
  );
};

App.getInitialProps = async ctx => {
  const { session } = nextCookie(ctx);
  if (session) {
    const { origin } = absoluteUrl(ctx.req);
    try {
      const user = await getMeData(session, origin);
      return { user, loggedIn: true, session };
    } catch (error) {
      if (error.code === 'auth/session-cookie-expire') {
        return { user: null, loggedIn: false, session: null };
      }
    }
  }
  return { user: null, loggedIn: false, session: null };
};

export default App;
