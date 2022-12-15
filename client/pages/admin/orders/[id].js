import { Row, Col } from 'react-bootstrap';

import Layout from '../../../components/Layout';
import OrderDetail from '../../../components/orderAdmin/OrderInfos';
import Auth from '../../../components/auth';

const OrderDetailPage = () => {
  return (
    <Auth admin>
      <Layout>
        <OrderDetail />
      </Layout>
    </Auth>
  );
};

export default OrderDetailPage;
