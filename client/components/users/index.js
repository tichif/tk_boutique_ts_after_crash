import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Table, Alert } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

import Loader from '../utilities/Loader';
import {
  listUsersHandler,
  resetNotifications,
  deleteUserHandler,
} from '../../redux/actions/user';
import Paginate from '../utilities/Paginate';

const UserList = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { loading, error, pagination, users } = useSelector(
    (state) => state.userList
  );

  const {
    loading: loadingDelete,
    success,
    error: errorDelete,
  } = useSelector((state) => state.userDelete);

  useEffect(() => {
    dispatch(
      listUsersHandler('select=name,email,type,telephone,isBlock&limit=10', '')
    );
  }, [dispatch, errorDelete]);

  useEffect(() => {
    if (error || errorDelete) {
      toast.error(error || errorDelete);
      dispatch(resetNotifications());
    }
  }, [error, dispatch, errorDelete]);

  useEffect(() => {
    if (success) {
      toast.success('Utilisateur supprimé avec succès');
      dispatch(resetNotifications());
      dispatch(
        listUsersHandler(
          'select=name,email,type,telephone,isBlock&limit=10',
          ''
        )
      );
    }
  }, [success, dispatch]);

  if (loading || loadingDelete) {
    return <Loader />;
  }

  function clickHandler(userId) {
    router.push(`/admin/users/${userId}`);
  }

  function receiveDataHandler(page) {
    dispatch(
      listUsersHandler(
        'select=name,email,type,telephone,isBlock&limit=10',
        page
      )
    );
  }

  function deleteHandler(userId) {
    if (
      window.confirm(
        'Etes vous sur(e) ? Cette action entrainera également la supression de cet utilisateur définitivement du site.'
      )
    ) {
      dispatch(deleteUserHandler(userId));
    }
  }

  return (
    <>
      {users && users.length < 1 ? (
        <Alert variant='warning'>Il n'y a pas encore d'utilisateurs</Alert>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>NOM</th>
              <th>EMAIL</th>
              <th>TELEPHONE</th>
              <th>ADMIN</th>
              <th>COMPTE BLOQUE</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{`(+509)${user.telephone}`}</td>
                  <td>
                    {user.type === 'admin' ? (
                      <i
                        className='fas fa-check'
                        style={{ color: 'green' }}
                      ></i>
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    {user.isBlock ? (
                      <i
                        className='fas fa-check'
                        style={{ color: 'green' }}
                      ></i>
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    <Button
                      variant='success'
                      className='btn-sm'
                      onClick={() => clickHandler(user._id)}
                    >
                      <i className='far fa-eye'></i> Voir infos
                    </Button>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(user._id)}
                    >
                      <i className='fas fa-trash'></i> Supprimer
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      )}
      {pagination && (
        <Paginate pagination={pagination} action={receiveDataHandler} />
      )}
    </>
  );
};

export default UserList;
