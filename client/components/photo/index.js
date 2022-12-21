import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Table, Alert } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import Image from 'next/image';

import Loader from '../utilities/Loader';
import {
  getProductPhotosHandler,
  resetNotifications,
  deleteProductPhotoHandler,
} from '../../redux/actions/product';

const ProductPhotoList = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;

  const { loading, error, photos } = useSelector(
    (state) => state.productPhotoList
  );

  const {
    loading: loadingDelete,
    success,
    error: errorDelete,
    message,
  } = useSelector((state) => state.productPhotoDelete);

  useEffect(() => {
    dispatch(getProductPhotosHandler(id));
  }, [dispatch, success, errorDelete]);

  useEffect(() => {
    if (error || errorDelete) {
      toast.error(error || errorDelete);
      dispatch(resetNotifications());
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (success) {
      toast.success(message);
      dispatch(resetNotifications());
    }
  }, [success, dispatch]);

  if (loading || loadingDelete) {
    return <Loader />;
  }

  // delete photo
  function deleteHandler(id, photoId) {
    if (
      window.confirm(
        'Etes vous sur(e) de vouloir supprimer cette photo ? Cette action peut occasionner un dysfonctionnement du site.'
      )
    ) {
      dispatch(deleteProductPhotoHandler(id, photoId));
    }
  }

  return (
    <>
      {photos && photos.length < 1 ? (
        <Alert variant='warning'>
          Vous n'avez pas encore ajouté de photos.
        </Alert>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>PHOTO</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {photos &&
              photos.map((photo) => (
                <tr key={photo.public_id}>
                  <td>
                    <Image
                      src={photo.url}
                      alt={photo.public_id}
                      height={photo.height / 5}
                      width={photo.width / 5}
                    />
                  </td>
                  <td>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(id, photo.public_id)}
                    >
                      <i className='fas fa-trash'></i> Supprimer
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default ProductPhotoList;
