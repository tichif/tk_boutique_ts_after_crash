import Layout from '../components/Layout';
import Shipping from '../components/shipping';
import Auth from '../components/auth';

const Livraison = () => {
  return (
    <Auth>
      <Layout title='Livraison'>
        <Shipping />
      </Layout>
    </Auth>
  );
};

export default Livraison;
