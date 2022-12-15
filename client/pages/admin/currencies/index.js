import { Row, Col } from 'react-bootstrap';
import Link from 'next/link';

import Layout from '../../../components/Layout';
import CurrencyList from '../../../components/currency';
import Auth from '../../../components/auth';

const CurrenciesPage = () => {
  return (
    <Auth admin>
      <Layout title='Toutes les devises'>
        <Row className='align-items-center'>
          <Col>
            <h1>Devises</h1>
          </Col>
          <Col className='text-right'>
            <Link
              className='my-3 btn btn-primary'
              href='/admin/currencies/create'
            >
              <i className='fas fa-plus'></i> Créer
            </Link>
          </Col>
        </Row>
        <CurrencyList />
      </Layout>
    </Auth>
  );
};

export default CurrenciesPage;
