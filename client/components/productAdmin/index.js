import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Table, Alert } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

import Loader from '../utilities/Loader';
import {
  listProductsHandler,
  listProductsWithCategoryHandler,
  resetNotifications,
  deleteProductHandler,
} from '../../redux/actions/product';
import { convertMultipleWords } from '../../utils/string';
import Paginate from '../utilities/Paginate';

const ProductList = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;

  const { loading, error, pagination, products } = useSelector(
    (state) => state.productList
  );

  const {
    loading: loadingDelete,
    success,
    error: errorDelete,
    message,
  } = useSelector((state) => state.productDelete);

  useEffect(() => {
    if (id) {
      dispatch(
        listProductsWithCategoryHandler(
          'select=name,price,variant,qty&limit=10',
          '',
          id
        )
      );
    } else {
      dispatch(
        listProductsHandler('select=name,price,variant,qty&limit=10', '')
      );
    }
  }, [dispatch, id, errorDelete, success]);

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

  function clickHandler(productId) {
    router.push(`/admin/products/${productId}/edit`);
  }

  // pagination handler
  function receiveDataHandler(page) {
    if (id) {
      dispatch(
        listProductsWithCategoryHandler(
          'select=name,price,variant,qty&limit=10',
          page,
          id
        )
      );
    } else {
      dispatch(
        listProductsHandler('select=name,price,variant,qty&limit=10', page)
      );
    }
  }

  // delete product
  function deleteHandler(id) {
    if (
      window.confirm(
        'Etes vous sur(e) de vouloir supprimer cette article ? Cette action peut occasionner un dysfonctionnement du site.'
      )
    ) {
      dispatch(deleteProductHandler(id));
    }
  }

  function goTo(productId) {
    router.push(`/admin/products/${productId}`);
  }

  return (
    <>
      {products && products.length < 1 ? (
        <Alert variant='warning'>
          Vous n'avez pas encore ajouté de products.
        </Alert>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NOM</th>
              <th>CATEGORIE</th>
              <th>PRIX</th>
              <th>QTE</th>
              <th>NBRE VARIANTS</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products &&
              products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{convertMultipleWords(product && product.name)}</td>
                  <td>
                    {product && convertMultipleWords(product.category.name)}
                  </td>
                  <td>
                    {product && product.price ? `${product.price} HTG` : ''}
                  </td>
                  <td>{product && product.qty ? product.qty : ''}</td>
                  <td>{product && product.variant.length}</td>
                  <td>
                    <Button
                      variant='success'
                      className='btn-sm'
                      onClick={() => goTo(product._id)}
                    >
                      <i className='far fa-eye'></i> Voir
                    </Button>

                    <Button
                      variant='light'
                      className='btn-sm'
                      onClick={() => clickHandler(product._id)}
                    >
                      <i className='fas fa-edit'></i>Editer
                    </Button>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(product._id)}
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

export default ProductList;
