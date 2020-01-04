import { useAuth } from '../context/auth-context';
import { useRouter } from 'next/router';

function ProtectedPage({ children }) {
  const router = useRouter();
  const { isPending, user } = useAuth();

  if (isPending) {
    return <div>...isLoading</div>;
  }

  if (!user) {
    router.push('/signin');
  } else {
    return <>{children}</>;
  }
  return '';
}

export default ProtectedPage;
