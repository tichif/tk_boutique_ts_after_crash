import Layout from '../components/Layout';
import Payment from '../components/payment';
import Auth from '../components/auth';

const Livraison = () => {
  return (
    <Auth>
      <Layout title='Payer'>
        <Payment />
      </Layout>
    </Auth>
  );
};

export default Livraison;
