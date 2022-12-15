import Layout from '../../components/Layout';
import FormContainer from '../../components/utilities/FormContainer';
import ActionEmail from '../../components/form/actionEmail';

const Login = () => {
  return (
    <Layout title='Mot de passe oublié'>
      <FormContainer>
        <h1>Mot de passe oublié</h1>
        <ActionEmail resetPassword />
      </FormContainer>
    </Layout>
  );
};

export default Login;
