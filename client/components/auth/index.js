import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useMe } from '../../context/userContext';
import Admin from './admin';

const Auth = ({ children, admin }) => {
  const { user, error, loading } = useMe();

  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/se-connecter');
      return;
    }
  }, [loading, router, user, error]);

  if (admin) {
    return (
      <>
        <Admin>{children}</Admin>
      </>
    );
  }

  return <>{children}</>;
};

Auth.defaultProps = {
  admin: false,
};

export default Auth;
