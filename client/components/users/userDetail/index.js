import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button, Col, ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Head from 'next/head';

import Loader from '../../utilities/Loader';
import {
  getUserHandler,
  changeUserTypeHandler,
  resetNotifications,
} from '../../../redux/actions/user';
import { convertDate } from '../../../utils/date';
import { useMe } from '../../../context/userContext';

const UserDetail = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;

  const { user: userContext } = useMe();

  const { loading, error, user } = useSelector((state) => state.userDetail);

  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success,
  } = useSelector((state) => state.userChangeType);

  useEffect(() => {
    if (error || errorUpdate) {
      toast.error(error || errorUpdate);
      dispatch(resetNotifications());
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (success) {
      toast.success('Type de compte modifié avec succès');
      dispatch(resetNotifications());
    }

    if (id) {
      if (!user || user._id !== id) {
        dispatch(getUserHandler(id));
      }
    }
  }, [id, dispatch, user, errorUpdate, success]);

  if (loading || loadingUpdate) {
    return <Loader />;
  }

  function clickHandler(userId) {
    if (
      window.confirm(
        'Etes vous sur(e) ? Cela peut entrainer un dysfonctionnement du site.'
      )
    ) {
      dispatch(changeUserTypeHandler(userId));
    }
  }

  function goTo(userId) {
    router.push(`/admin/orders/user/${userId}`);
  }

  return (
    <>
      <Head>
        <title>{`Informations de ${user && user.name}`}</title>
      </Head>
      <h1>Information de {user && user.name}</h1>
      <Link href='/admin/users' className='btn btn-light my-3'>
        <i className='fas fa-arrow-left'></i> Retour
      </Link>
      <Col md={8}>
        <ListGroup variant='flush'>
          <ListGroup.Item>
            <h2>Profil</h2>
            <p>
              <strong>Nom:</strong> {user && user.name}
            </p>
            <p>
              <strong>Email:</strong> {user && user.email}
            </p>
            <p>
              <strong>Téléphone:</strong> {`(+509)${user && user.telephone}`}
            </p>
          </ListGroup.Item>
          <ListGroup.Item>
            <h2>Status du compte</h2>
            <p>
              <strong>Type de compte:</strong>{' '}
              {user &&
                user.type &&
                user.type.charAt(0).toUpperCase() + user.type.slice(1)}
            </p>
            <p>
              <strong>Compte actif:</strong>{' '}
              {user && user.isActive ? (
                <i className='fas fa-check' style={{ color: 'green' }}></i>
              ) : (
                <i className='fas fa-times' style={{ color: 'red' }}></i>
              )}
            </p>
            <p>
              <strong>Compte bloqué:</strong>{' '}
              {user && user.isBlock ? (
                <i className='fas fa-check' style={{ color: 'green' }}></i>
              ) : (
                <i className='fas fa-times' style={{ color: 'red' }}></i>
              )}
            </p>
            <p>
              <strong>Compte créé:</strong>{' '}
              {user &&
                user.createdAt &&
                convertDate(user.createdAt, {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                  hour12: true,
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                })}
            </p>
            {user && userContext._id !== user._id && (
              <Button
                variant='success'
                onClick={() => clickHandler(user && user._id)}
              >
                <i className='fas fa-edit'></i> Modifier type compte
              </Button>
            )}
          </ListGroup.Item>
          <ListGroup.Item>
            <h2>Commandes</h2>
            <Button variant='primary' onClick={() => goTo(user && user._id)}>
              <i className='far fa-eye'></i> Voir Commandes
            </Button>
          </ListGroup.Item>
        </ListGroup>
      </Col>
    </>
  );
};

export default UserDetail;
