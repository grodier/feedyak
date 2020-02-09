import React from 'react';
import { useRouter } from 'next/router';
import nextCookie from 'next-cookies';
import absoluteUrl from 'next-absolute-url';
import ProtectedPage from './ProtectedPage';
import { getMeData, signOutUser } from '../utils/userUtils';

const App = ({ loggedIn, session, user }) => {
  const router = useRouter();

  async function logout() {
    await signOutUser(session);
    router.push('/signin');
  }

  return (
    <ProtectedPage loggedIn={loggedIn}>
      <div>Hello {user.name}!</div>
      <button onClick={logout}>Sign Out</button>
    </ProtectedPage>
  );
};

App.getInitialProps = async ctx => {
  const { session } = nextCookie(ctx);
  if (session) {
    const { origin } = absoluteUrl(ctx.req);
    try {
      const user = await getMeData(session, origin);
      console.log('USER', user);
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
