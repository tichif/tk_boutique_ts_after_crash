import Layout from '../../../components/Layout';
import UserDetail from '../../../components/users/userDetail';
import Auth from '../../../components/auth';

const UserDetailPage = () => {
  return (
    <Auth admin>
      <Layout>
        <UserDetail />
      </Layout>
    </Auth>
  );
};

export default UserDetailPage;
