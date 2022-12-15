import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useMe } from '../../../context/userContext';

const Admin = ({ children }) => {
  const { user, loading } = useMe();

  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/se-connecter');
      return;
    }

    if (user && user.type !== 'admin') {
      router.push('/profil');
      return;
    }
  }, [loading, router, user]);

  return <>{children}</>;
};

export default Admin;
