import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from 'react-bootstrap';
import { useRouter } from 'next/router';
import Link from 'next/link';

import Layout from '../../../components/Layout';
import Loader from '../../../components/utilities/Loader';
import { activateAccountHandler } from '../../../redux/actions/auth';
import { useMe } from '../../../context/userContext';

const ChildComponent = () => {
  const { loading, success, error } = useSelector(
    (state) => state.userActivateAccount
  );

  const { query } = useRouter();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(activateAccountHandler(query.token));
  }, [dispatch, query]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <>
        <Alert variant='danger'>{error}</Alert>
        <Link href='/auth/email-activation'>Renvoyer le mail d'activation</Link>
      </>
    );
  }

  return (
    success && (
      <Alert variant='success'>
        Compte activé avec succès.{' '}
        <Link href='/se-connecter'>Cliquez ici pour vous connecter</Link>
      </Alert>
    )
  );
};

const ActiveAccountPage = () => {
  const { user } = useMe();
  const router = useRouter();

  if (user) {
    router.push('/profil');
  }

  return (
    <Layout title='Activation de compte'>
      <h1>Activation de compte</h1>
      <ChildComponent />
    </Layout>
  );
};

export default ActiveAccountPage;
