import Layout from '../components/Layout';
import Auth from '../components/auth';
import PaymentMethod from '../components/payment/method';

const PaymentMethodPage = () => {
  return (
    <Auth>
      <Layout title='Méthode de paiement'>
        <PaymentMethod />
      </Layout>
    </Auth>
  );
};

export default PaymentMethodPage;
