import Layout from '../../components/Layout';
import { wrapper } from '../../redux/store';
import { getProductBySlugHandler } from '../../redux/actions/product';
import { getPrincipalCurrencyHandler } from '../../redux/actions/currency';
import ProductDetail from '../../components/products/product/detail';

const ProductDetailPage = () => {
  return (
    <Layout>
      <ProductDetail />
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx) => {
    const {
      params: { slug },
    } = ctx;

    await store.dispatch(getProductBySlugHandler(slug));
    await store.dispatch(getPrincipalCurrencyHandler());
  }
);

export default ProductDetailPage;
