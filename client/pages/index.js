import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { Alert, Row } from 'react-bootstrap';

import Layout from '../components/Layout';
import { wrapper } from '../redux/store';
import { getPrincipalCurrencyHandler } from '../redux/actions/currency';
import {
  listProductsHandler,
  listCarouselProductsHandler,
  resetNotifications,
} from '../redux/actions/product';
import Carousel from '../components/utilities/Carousel';
import Products from '../components/products';

function Home() {
  const { products, error } = useSelector((state) => state.productList);
  const { currency, error: errorCurrency } = useSelector(
    (state) => state.currencyPrincipal
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (error || errorCurrency) {
      toast.error(error || errorCurrency);
      dispatch(resetNotifications());
    }
  }, [error, dispatch, errorCurrency]);

  return (
    <Layout title='Accueil'>
      <Carousel />
      <h1 className='mt-5'>Nos derniers articles</h1>
      <Row>
        {products && products.length < 1 ? (
          <Alert variant='warning'>Il n'y a pas encore d'articles</Alert>
        ) : (
          <Products products={products} currency={currency} />
        )}
      </Row>
    </Layout>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx) => {
    store.dispatch(
      await listProductsHandler(
        'select=name,price,slug,variant,photoPrincipal,qty&limit=8'
      )
    );
    await store.dispatch(getPrincipalCurrencyHandler());
    await store.dispatch(listCarouselProductsHandler());
  }
);

export default Home;
