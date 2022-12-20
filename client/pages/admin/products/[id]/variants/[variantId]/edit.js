import Link from 'next/link';
import { useRouter } from 'next/router';

import Layout from '../../../../../../components/Layout';
import VariantForm from '../../../../../../components/form/variant';
import Auth from '../../../../../../components/auth';
import FormContainer from '../../../../../../components/Layout/FormContainer';

const ProductCreatePage = () => {
  const { id } = useRouter().query;

  return (
    <Auth admin>
      <Layout title='Modifier un variant'>
        <FormContainer>
          <h1>Modifier un variant</h1>
          <Link
            className='my-3 btn btn-light'
            href={`/admin/products/${id}/variants`}
          >
            <i className='fas fa-arrow-left'></i> Retour
          </Link>
          <VariantForm />
        </FormContainer>
      </Layout>
    </Auth>
  );
};

export default ProductCreatePage;
