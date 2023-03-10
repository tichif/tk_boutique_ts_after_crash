import { useRouter } from 'next/router';

import Layout from '../../components/Layout';
import FormContainer from '../../components/utilities/FormContainer';
import ActionEmail from '../../components/form/actionEmail';
import { useMe } from '../../context/userContext';

const Login = () => {
  const { user } = useMe();
  const router = useRouter();

  if (user) {
    router.push('/profil');
  }

  return (
    <Layout title="Renvoyer le mail d'activation">
      <FormContainer>
        <h1>Renvoyer le mail d'activation</h1>
        <ActionEmail />
      </FormContainer>
    </Layout>
  );
};

export default Login;
