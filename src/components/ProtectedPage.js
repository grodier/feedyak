import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

const SignIn = dynamic(() => import('./SignIn'));

function ProtectedPage({ loggedIn, children }) {
  const router = useRouter();

  useEffect(() => {
    if (loggedIn) return;
    const { pathname } = router;
    router.replace(pathname, '/signin', { shallow: true });
  }, [loggedIn]);

  if (!loggedIn) return <SignIn />;

  return <>{children}</>;
}

export default ProtectedPage;
