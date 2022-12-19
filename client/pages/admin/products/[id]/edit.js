import Link from 'next/link';

import Layout from '../../../../components/Layout';
import ProductForm from '../../../../components/form/product';
import Auth from '../../../../components/auth';
import FormContainer from '../../../../components/Layout/FormContainer';

const ProductUpdatePage = () => {
  return (
    <Auth admin>
      <Layout title='Modifier un article'>
        <FormContainer>
          <h1>Modifier un article</h1>
          <Link className='my-3 btn btn-light' href='/admin/products'>
            <i className='fas fa-arrow-left'></i> Retour
          </Link>
          <ProductForm />
        </FormContainer>
      </Layout>
    </Auth>
  );
};

export default ProductUpdatePage;
