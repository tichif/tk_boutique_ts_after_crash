import Layout from '../../../components/Layout';
import FormContainer from '../../../components/utilities/FormContainer';
import ResetPasswordForm from '../../../components/form/resetPassword';

const Login = () => {
  return (
    <Layout title='Réinitialiser le mot de passe'>
      <FormContainer>
        <h1>Réinitialiser le mot de passe</h1>
        <ResetPasswordForm />
      </FormContainer>
    </Layout>
  );
};

export default Login;
