import { Row, Col } from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Layout from '../../../../../../../components/Layout';
import ProductPhotoList from '../../../../../../../components/photo';
import Auth from '../../../../../../../components/auth';

const ProductVariantPhotoListPage = () => {
  const { id, variantId } = useRouter().query;

  return (
    <Auth admin>
      <Layout title='Toutes les photos'>
        <Row className='align-items-center'>
          <Col>
            <h1>Photos</h1>
          </Col>
          <Col className='text-right'>
            <Link
              className='my-3 mr-3 btn btn-light'
              href={`/admin/products/${id}/variants/${variantId}`}
            >
              <i className='fas fa-arrow-left'></i> Retour
            </Link>
            <Link
              className='my-3 btn btn-primary'
              href={`/admin/products/${id}/variants/${variantId}/images/add`}
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

export default ProductVariantPhotoListPage;
