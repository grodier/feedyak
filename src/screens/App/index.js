import React from 'react';
import nextCookie from 'next-cookies';
import absoluteUrl from 'next-absolute-url';
import ProtectedPage from '../../components/ProtectedPage';
import { getMeData } from '../../utils/userUtils';

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
    const user = await getMeData(session, origin);
  }
  if (!session) return { loggedIn: false };
  return { loggedIn: true };
};

export default App;
