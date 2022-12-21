import Link from 'next/link';
import { useRouter } from 'next/router';

import Layout from '../../../../../components/Layout';
import PhotoForm from '../../../../../components/form/photo';
import Auth from '../../../../../components/auth';
import FormContainer from '../../../../../components/Layout/FormContainer';

const ProductPhotoCreatePage = () => {
  const { id } = useRouter().query;
  return (
    <Auth admin>
      <Layout title='Ajouter une photo'>
        <FormContainer>
          <h1>Ajouter une photo</h1>
          <Link
            className='my-3 btn btn-light'
            href={`/admin/products/${id}/images`}
          >
            <i className='fas fa-arrow-left'></i> Retour
          </Link>
          <PhotoForm />
        </FormContainer>
      </Layout>
    </Auth>
  );
};

export default ProductPhotoCreatePage;
