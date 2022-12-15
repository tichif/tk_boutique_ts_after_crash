import Layout from '../components/Layout';
import FormContainer from '../components/utilities/FormContainer';
import LoginForm from '../components/form/login';

const Login = () => {
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
