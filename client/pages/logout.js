import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import { logoutHandler } from '../redux/actions/auth';
import {} from '../context/userContext';

const Logout = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { success, error } = useSelector((state) => state.logout);

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
      router.push('/se-connecter');
    }
  }, [success, router]);

  return (
    <div>Déconnexion en cours. Veuillez patienter s'il vous plait....</div>
  );
};

export default Logout;
