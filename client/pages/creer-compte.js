import Layout from '../components/Layout';
import FormContainer from '../components/utilities/FormContainer';
import RegisterForm from '../components/form/register';

const Login = () => {
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
