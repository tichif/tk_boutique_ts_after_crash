import Link from 'next/link';

import Layout from '../../../../components/Layout';
import CategoryForm from '../../../../components/form/category';
import Auth from '../../../../components/auth';
import FormContainer from '../../../../components/Layout/FormContainer';

const CategoryEditPage = () => {
  return (
    <Auth admin>
      <Layout title='Modifier une catégorie'>
        <FormContainer>
          <h1>Modifier une catégorie</h1>
          <Link className='my-3 btn btn-light' href='/admin/categories'>
            <i className='fas fa-arrow-left'></i> Retour
          </Link>
          <CategoryForm />
        </FormContainer>
      </Layout>
    </Auth>
  );
};

export default CategoryEditPage;
