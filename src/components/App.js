import React from 'react';
import nextCookie from 'next-cookies';
import absoluteUrl from 'next-absolute-url';
import ProtectedPage from './ProtectedPage';
import { getMeData } from '../utils/userUtils';

const App = ({ loggedIn }) => {
  return (
    <ProtectedPage loggedIn={loggedIn}>
      <div>Hello from my App</div>
    </ProtectedPage>
  );
};

App.getInitialProps = async ctx => {
  const { session } = nextCookie(ctx);
  if (session) {
    const { origin } = absoluteUrl(ctx.req);
    try {
      const user = await getMeData(session, origin);
      return { user, loggedIn: true };
    } catch (error) {
      if (error.code === 'auth/session-cookie-expire') {
        return { user: null, loggedIn: false };
      }
    }
  }
  return { user: null, loggedIn: false };
};

export default App;
