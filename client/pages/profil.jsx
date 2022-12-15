import { Col, Row } from 'react-bootstrap';

import Layout from '../components/Layout';
import Auth from '../components/auth';
import ProfileForm from '../components/form/profil';
import OrderList from '../components/orders';

export default function Profile() {
  return (
    <Auth>
      <Layout title='Profil'>
        <Row>
          <Col md={3}>
            <h2>Profil</h2>
            <ProfileForm />
          </Col>
          <Col md={9}>
            <h2>Mes commandes</h2>
            <OrderList />
          </Col>
        </Row>
      </Layout>
    </Auth>
  );
}
