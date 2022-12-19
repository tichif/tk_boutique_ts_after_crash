import Link from 'next/link';

import Layout from '../../../../components/Layout';
import ProductPage from '../../../../components/productAdmin/detail';
import Auth from '../../../../components/auth';

const ProductDetailPage = () => {
  return (
    <Auth admin>
      <Layout>
        <ProductPage />
      </Layout>
    </Auth>
  );
};

export default ProductDetailPage;
