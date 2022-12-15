import { Row, Col } from 'react-bootstrap';

import Layout from '../../../components/Layout';
import UserList from '../../../components/users';
import Auth from '../../../components/auth';

const UserListPage = () => {
  return (
    <Auth admin>
      <Layout title='Toutes les utilisateurs'>
        <Row className='align-items-center'>
          <Col>
            <h1>Utilisateurs</h1>
          </Col>
        </Row>
        <UserList />
      </Layout>
    </Auth>
  );
};

export default UserListPage;
