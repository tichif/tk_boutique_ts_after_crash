import { Row, Col } from 'react-bootstrap';
import Link from 'next/link';

import Layout from '../../../components/Layout';
import CategoryList from '../../../components/category';
import Auth from '../../../components/auth';

const CategoriesPage = () => {
  return (
    <Auth admin>
      <Layout title='Toutes les catégories'>
        <Row className='align-items-center'>
          <Col>
            <h1>Catégories</h1>
          </Col>
          <Col className='text-right'>
            <Link
              className='my-3 btn btn-primary'
              href='/admin/categories/create'
            >
              <i className='fas fa-plus'></i> Créer
            </Link>
          </Col>
        </Row>
        <CategoryList />
      </Layout>
    </Auth>
  );
};

export default CategoriesPage;
