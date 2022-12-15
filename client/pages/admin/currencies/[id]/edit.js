import Link from 'next/link';

import Layout from '../../../../components/Layout';
import CurrencyForm from '../../../../components/form/currency';
import Auth from '../../../../components/auth';
import FormContainer from '../../../../components/Layout/FormContainer';

const CurrenciesPage = () => {
  return (
    <Auth admin>
      <Layout title='Modifier une devise'>
        <FormContainer>
          <h1>Modifier une devise</h1>
          <Link className='my-3 btn btn-light' href='/admin/currencies'>
            <i className='fas fa-arrow-left'></i> Retour
          </Link>
          <CurrencyForm />
        </FormContainer>
      </Layout>
    </Auth>
  );
};

export default CurrenciesPage;
