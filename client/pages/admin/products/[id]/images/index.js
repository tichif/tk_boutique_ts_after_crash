import { Row, Col } from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Layout from '../../../../../components/Layout';
import ProductPhotoList from '../../../../../components/photo';
import Auth from '../../../../../components/auth';

const ProductPhotoListPage = () => {
  const { id } = useRouter().query;

  return (
    <Auth admin>
      <Layout title='Toutes les photos'>
        <Row className='align-items-center'>
          <Col>
            <h1>Photos</h1>
          </Col>
          <Col className='text-right'>
            <Link
              className='my-3 btn btn-primary'
              href={`/admin/products/${id}/photo/add`}
            >
              <i className='fas fa-plus'></i> Ajouter
            </Link>
          </Col>
        </Row>
        <ProductPhotoList />
      </Layout>
    </Auth>
  );
};

export default ProductPhotoListPage;
