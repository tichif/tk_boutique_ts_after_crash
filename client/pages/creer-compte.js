import { useRouter } from 'next/router';

import Layout from '../components/Layout';
import FormContainer from '../components/utilities/FormContainer';
import RegisterForm from '../components/form/register';
import { useMe } from '../context/userContext';

const Login = () => {
  const { user } = useMe();
  const router = useRouter();

  if (user) {
    router.push('/profil');
  }

  return (
    <Layout title='Créer un compte'>
      <FormContainer>
        <h1>Créer un compte</h1>
        <RegisterForm />
      </FormContainer>
    </Layout>
  );
};

export default Login;
