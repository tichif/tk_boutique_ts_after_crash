import Layout from '../components/Layout';
import { wrapper } from '../redux/store';
import { getPrincipalCurrencyHandler } from '../redux/actions/currency';
import Cart from '../components/cart';

const Panier = () => {
  return (
    <Layout title='Panier'>
      <Cart />
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx) => {
    await store.dispatch(getPrincipalCurrencyHandler());
  }
);

export default Panier;
