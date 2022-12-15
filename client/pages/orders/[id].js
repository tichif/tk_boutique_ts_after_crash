import Layout from '../../components/Layout';
import Auth from '../../components/auth';
import OrderDetail from '../../components/orders/orderDetail';

export default function Profile() {
  return (
    <Auth>
      <Layout title='Profil'>
        <OrderDetail />
      </Layout>
    </Auth>
  );
}
