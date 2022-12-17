import { Row, Col } from 'react-bootstrap';
import Link from 'next/link';

import Layout from '../../../../components/Layout';
import ProductList from '../../../../components/productAdmin';
import Auth from '../../../../components/auth';

const ProductsPage = () => {
  return (
    <Auth admin>
      <Layout title='Toutes les articles'>
        <Row className='align-items-center'>
          <Col>
            <h1>Articles</h1>
          </Col>
          <Col className='text-right'>
            <Link
              className='my-3 btn btn-primary'
              href='/admin/products/create'
            >
              <i className='fas fa-plus'></i> Créer
            </Link>
          </Col>
        </Row>
        <ProductList />
      </Layout>
    </Auth>
  );
};

export default ProductsPage;
