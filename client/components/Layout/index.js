import { Container } from 'react-bootstrap';
import Head from 'next/head';

import Navigation from './Navigation';
import Footer from './Footer';

const Layout = ({ children, title, description }) => {
  return (
    <>
      <Head>
        <title>{`${title} | TK Boutique`}</title>
        <meta name='description' content={description} />
        <meta
          name='keyword'
          content='TK Boutique, Haïti, Péguy-Ville, produits en ligne'
        />
      </Head>
      <header>
        <Navigation />
      </header>
      <main className='py-3'>
        <Container>{children}</Container>
      </main>
      <Footer />
    </>
  );
};

Layout.defaultProps = {
  title: 'Bienvenue',
  description: 'Vente de produits en ligne.',
};

export default Layout;
