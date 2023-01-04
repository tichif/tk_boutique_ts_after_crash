import { useRouter } from 'next/router';

import Layout from '../components/Layout';
import FormContainer from '../components/utilities/FormContainer';
import LoginForm from '../components/form/login';
import { useMe } from '../context/userContext';

const Login = () => {
  const { user } = useMe();
  const router = useRouter();

  if (user) {
    router.push('/profil');
  }

  return (
    <Layout title='Se connecter'>
      <FormContainer>
        <h1>Se connecter</h1>
        <LoginForm />
      </FormContainer>
    </Layout>
  );
};

export default Login;
