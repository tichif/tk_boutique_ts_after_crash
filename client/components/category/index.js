import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Table, Alert } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

import Loader from '../utilities/Loader';
import {
  listCategoriesHandler,
  resetNotifications,
  deleteCategoryHandler,
} from '../../redux/actions/category';
import { convertMultipleWords } from '../../utils/string';
import Paginate from '../utilities/Paginate';

const CategoryList = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { loading, error, pagination, categories } = useSelector(
    (state) => state.categoryList
  );

  const {
    loading: loadingDelete,
    success,
    error: errorDelete,
    message,
  } = useSelector((state) => state.categoryDelete);

  useEffect(() => {
    dispatch(listCategoriesHandler('select=name,productsCount&limit=10', ''));
  }, [dispatch, errorDelete, success]);

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

  function clickHandler(categoryId) {
    router.push(`/admin/categories/${categoryId}/edit`);
  }

  // pagination handler
  function receiveDataHandler(page) {
    dispatch(listCategoriesHandler('select=name,productsCount&limit=10', page));
  }

  // delete currency
  function deleteHandler(id) {
    if (
      window.confirm(
        'Etes vous sur(e) de vouloir supprimer cette categorie ? Cette action peut occasionner un dysfonctionnement du site.'
      )
    ) {
      dispatch(deleteCategoryHandler(id));
    }
  }

  function goTo(categoryId) {
    router.push(`/admin/categories/${categoryId}/articles`);
  }

  return (
    <>
      {categories && categories.length < 1 ? (
        <Alert variant='warning'>
          Vous n'avez pas encore ajouté de catégories.
        </Alert>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NOM</th>
              <th>NBRE ARTICLES</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {categories &&
              categories.map((category) => (
                <tr key={category._id}>
                  <td>{category._id}</td>
                  <td>{convertMultipleWords(category && category.name)}</td>
                  <td>{category.productsCount}</td>

                  <td>
                    {category.productsCount > 0 && (
                      <Button
                        variant='success'
                        className='btn-sm'
                        onClick={() => goTo(category._id)}
                      >
                        <i className='far fa-eye'></i> Voir articles
                      </Button>
                    )}
                    <Button
                      variant='light'
                      className='btn-sm'
                      onClick={() => clickHandler(category._id)}
                    >
                      <i className='fas fa-edit'></i>Editer
                    </Button>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(category._id)}
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

export default CategoryList;
