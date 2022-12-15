import { Row, Col } from 'react-bootstrap';

import Layout from '../../../components/Layout';
import OrderList from '../../../components/orderAdmin';
import Auth from '../../../components/auth';

const OrderListPage = () => {
  return (
    <Auth admin>
      <Layout title='Toutes les commandes'>
        <Row className='align-items-center'>
          <Col>
            <h1>Commandes</h1>
          </Col>
        </Row>
        <OrderList />
      </Layout>
    </Auth>
  );
};

export default OrderListPage;
