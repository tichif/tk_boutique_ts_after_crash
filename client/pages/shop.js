import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Button, Alert } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

import Layout from '../components/Layout';
import Products from '../components/products';
import Paginate from '../components/utilities/Paginate';
import { listCategoriesHandler } from '../redux/actions/category';
import { getPrincipalCurrencyHandler } from '../redux/actions/currency';
import {
  listProductsHandler,
  listProductsWithCategoryHandler,
  resetNotifications,
} from '../redux/actions/product';
import { wrapper } from '../redux/store';

const Shop = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [categoryId, setCategoryId] = useState();

  const { products, error, pagination } = useSelector(
    (state) => state.productList
  );
  const { categories, error: errorCategories } = useSelector(
    (state) => state.categoryList
  );
  const { currency, error: errorCurrency } = useSelector(
    (state) => state.currencyPrincipal
  );

  useEffect(() => {
    if (error || errorCategories || errorCurrency) {
      toast(error || errorCategories || errorCurrency);
      dispatch(resetNotifications());
    }
  }, [error, errorCategories, errorCurrency, dispatch]);

  function paginateHandler(page) {
    if (categoryId) {
      router.push(`/shop?categoryId=${categoryId}&page=${page}`);
    } else {
      router.push(`/shop?page=${page}`);
    }
  }

  function chooseCategoryHandler(category) {
    setCategoryId(category);
    if (category) {
      router.push(`/shop?categoryId=${category}`);
    } else {
      router.push('/shop');
    }
  }

  return (
    <Layout title='Boutique'>
      <h1 className='mb-3'>Boutique</h1>
      {/* categories button */}
      <Button className='mr-3 mb-3' onClick={() => chooseCategoryHandler('')}>
        Tous les articles
      </Button>
      {categories
        .filter((category) => category.productsCount > 0)
        .map((category) => (
          <Button
            className='mx-3 mb-3'
            key={category._id}
            onClick={() => chooseCategoryHandler(category._id)}
          >
            {category.name}
          </Button>
        ))}

      {/* products */}
      <Row className='mt-3'>
        {products && products.length < 1 ? (
          <Alert variant='warning'>Il n'y a pas d'articles</Alert>
        ) : (
          <Products products={products} currency={currency} />
        )}
      </Row>

      {/* Pagination */}
      <div className='shop'>
        <Paginate pagination={pagination} action={paginateHandler} />
      </div>
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx) => {
    const { query } = ctx;

    const { page, categoryId } = query;

    // load categories
    await store.dispatch(
      listCategoriesHandler('select=name,productsCount&limit=50')
    );
    // load principal currency
    await store.dispatch(getPrincipalCurrencyHandler());

    // load products
    if (categoryId) {
      if (page) {
        await store.dispatch(
          listProductsWithCategoryHandler(
            'select=name,price,slug,variant,photoPrincipal,qty&limit=12',
            page,
            categoryId
          )
        );
      } else {
        await store.dispatch(
          listProductsWithCategoryHandler(
            'select=name,price,slug,variant,photoPrincipal,qty&limit=12',
            '',
            categoryId
          )
        );
      }
    } else {
      if (page) {
        await store.dispatch(
          listProductsHandler(
            'select=name,price,slug,variant,photoPrincipal,qty&limit=12',
            page
          )
        );
      } else {
        await store.dispatch(
          listProductsHandler(
            'select=name,price,slug,variant,photoPrincipal,qty&limit=12',
            ''
          )
        );
      }
    }
  }
);

export default Shop;
