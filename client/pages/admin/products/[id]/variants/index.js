import { Row, Col } from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Layout from '../../../../../components/Layout';
import VariantList from '../../../../../components/variant';
import Auth from '../../../../../components/auth';

const VariantsPage = () => {
  const { id } = useRouter().query;
  return (
    <Auth admin>
      <Layout title='Tous les variants'>
        <Row className='align-items-center'>
          <Col>
            <h1>Variants</h1>
          </Col>
          <Col className='text-right'>
            <Link
              className='my-3 mr-3 btn btn-light'
              href={`/admin/products/${id}`}
            >
              <i className='fas fa-arrow-left'></i> Retour
            </Link>
            <Link
              className='my-3 btn btn-primary'
              href={`/admin/products/${id}/variants/create`}
            >
              <i className='fas fa-plus'></i> Créer
            </Link>
          </Col>
        </Row>
        <VariantList />
      </Layout>
    </Auth>
  );
};

export default VariantsPage;
