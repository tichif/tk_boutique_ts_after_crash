import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Table, Alert } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

import Loader from '../utilities/Loader';
import {
  getProductVariantsHandler,
  resetNotifications,
  deleteProductVariantHandler,
} from '../../redux/actions/product';

const ProductVariantList = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;

  const { loading, error, variants } = useSelector(
    (state) => state.productVariantList
  );

  const {
    loading: loadingDelete,
    success,
    error: errorDelete,
    message,
  } = useSelector((state) => state.productVariantDelete);

  useEffect(() => {
    if (id) {
      dispatch(getProductVariantsHandler(id));
    }
  }, [dispatch, id, success, errorDelete]);

  useEffect(() => {
    if (error || errorDelete) {
      toast.error(error || errorDelete);
      dispatch(resetNotifications());
    }
  }, [error, dispatch, errorDelete]);

  useEffect(() => {
    if (success) {
      toast.success(message);
      dispatch(resetNotifications());
    }
  }, [success, dispatch]);

  if (loading || loadingDelete) {
    return <Loader />;
  }

  function clickHandler(productId, variantId) {
    router.push(`/admin/products/${productId}/variants/${variantId}/edit`);
  }

  // delete product
  function deleteHandler(productId, variantId) {
    if (
      window.confirm(
        'Etes vous sur(e) de vouloir supprimer cette variante ? Cette action peut occasionner un dysfonctionnement du site.'
      )
    ) {
      dispatch(deleteProductVariantHandler(productId, variantId));
    }
  }

  function goTo(productId, variantId) {
    router.push(`/admin/products/${productId}/${variantId}/photos`);
  }

  return (
    <>
      {variants && variants.length < 1 ? (
        <Alert variant='warning'>
          Vous n'avez pas encore ajouté de variantes.
        </Alert>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>PRIX</th>
              <th>COULEUR</th>
              <th>TAILLE</th>
              <th>QTE</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {variants &&
              variants.map((variant) => (
                <tr key={variant._id}>
                  <td>{variant._id}</td>
                  <td>{variant.price} HTG</td>
                  <td>{variant.color}</td>
                  <td>{variant.size}</td>
                  <td>{variant.qty}</td>
                  <td>
                    <Button
                      variant='success'
                      className='btn-sm'
                      onClick={() => goTo(id, variant._id)}
                    >
                      <i className='far fa-eye'></i> Voir Photos
                    </Button>

                    <Button
                      variant='light'
                      className='btn-sm'
                      onClick={() => clickHandler(id, variant._id)}
                    >
                      <i className='fas fa-edit'></i>Editer
                    </Button>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(id, variant._id)}
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

export default ProductVariantList;
