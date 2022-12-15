import Link from 'next/link';

import Layout from '../components/Layout';

const NotFound = () => {
  return (
    <Layout title='Page non trouvée'>
      <div className='jumbotron text-center mt-5'>
        <h1>😥😥 Oops !!!</h1>
        <p>Désolé, cette page n'existe pas ou a été déplacée !!!</p>
        <Link href='/' className='btn btn-primary'>
          <i className='fas fa-arrow-left'></i> Retour à l'accueil
        </Link>
      </div>
    </Layout>
  );
};

export default NotFound;
