import React from 'react';
import nextCookie from 'next-cookies';
import ProtectedPage from '../../components/ProtectedPage';
import { getUserData } from '../../utils/userUtils';

const App = ({ loggedIn }) => {
  return (
    <ProtectedPage loggedIn={loggedIn}>
      <div>Hello from my App</div>
    </ProtectedPage>
  );
};

App.getInitialProps = async ctx => {
  const cookies = nextCookie(ctx);
  if (cookies.session) {
    const user = await getUserData('1234', cookies);
  }
  if (!cookies.session) return { loggedIn: false };
  return { loggedIn: true };
};

export default App;
