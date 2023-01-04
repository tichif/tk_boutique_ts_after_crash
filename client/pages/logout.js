import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import { logoutHandler } from '../redux/actions/auth';
import { useMe } from '../context/userContext';

const Logout = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { success, error } = useSelector((state) => state.logout);
  const { clearUser } = useMe();

  useEffect(() => {
    dispatch(logoutHandler());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      router.back();
    }
  }, [error, router]);

  useEffect(() => {
    if (success) {
      clearUser();
      router.push('/se-connecter');
    }
  }, [success, router]);

  return (
    <div>Déconnexion en cours. Veuillez patienter s'il vous plait....</div>
  );
};

export default Logout;
