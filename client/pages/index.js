import Layout from '../components/Layout';
import { wrapper } from '../redux/store';
import { getPrincipalCurrencyHandler } from '../redux/actions/currency';
import {
  listProductsHandler,
  listCarouselProductsHandler,
} from '../redux/actions/product';
import Carousel from '../components/utilities/Carousel';

function Home() {
  return (
    <Layout title='Accueil'>
      <Carousel />
    </Layout>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx) => {
    // store.dispatch(
    //   listProductsHandler(
    //     'select=name,price,slug,variant,photoPrincipal&limit=4'
    //   )
    // );
    await store.dispatch(getPrincipalCurrencyHandler());
    await store.dispatch(listCarouselProductsHandler());
  }
);

export default Home;
