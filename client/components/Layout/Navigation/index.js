import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';

import { useMe } from '../../../context/userContext';

const style = {
  maxHeight: '42px',
  marginRight: '10px',
  marginTop: '-3px',
  display: 'inline-block',
};

const Navigation = () => {
  const router = useRouter();

  const { user, loading } = useMe();

  function handleClick(path) {
    router.push(path);
  }

  function logoutHandler() {
    router.push('/logout');
  }

  return (
    <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
      <Container>
        <Link href='/'>
          <Navbar.Brand>
            <Image
              src='/logo.jpg'
              alt='logo'
              width={42}
              height={42}
              style={style}
            />{' '}
            TK Boutique
          </Navbar.Brand>
        </Link>

        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='ml-auto'>
            <Nav.Link
              onClick={() => handleClick('/')}
              active={router.pathname === '/' ? true : false}
            >
              <i className='fas fa-home'></i> Accueil
            </Nav.Link>

            <Nav.Link
              onClick={() => handleClick('/shop')}
              active={router.pathname === '/shop' ? true : false}
            >
              <i className='fas fa-shopping-basket'></i> Boutique
            </Nav.Link>

            {/* authenticated && admin*/}
            {!loading && user && user.type === 'admin' && (
              <>
                <NavDropdown id='admin' title='Admin'>
                  <NavDropdown.Item
                    onClick={() => handleClick('/admin/currencies')}
                  >
                    <i className='fas fa-dollar-sign'></i> Devises
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    onClick={() => handleClick('/admin/categories')}
                  >
                    <i className='fas fa-tags'></i> Catégories
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    onClick={() => handleClick('/admin/products')}
                  >
                    <i className='fas fa-tshirt'></i> Articles
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    onClick={() => handleClick('/admin/orders')}
                  >
                    <i className='far fa-money-bill-alt'></i> Commandes
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={() => handleClick('/admin/users')}>
                    <i className='fas fa-users'></i> Utilisateurs
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            )}

            {/* authenticated*/}
            {!loading && user && (
              <NavDropdown
                id='username'
                title={user ? `Hi ${user.name}` : 'Profil'}
              >
                <NavDropdown.Item onClick={() => handleClick('/profil')}>
                  <i className='far fa-user'></i> Profil
                </NavDropdown.Item>
                <NavDropdown.Item onClick={logoutHandler}>
                  <i className='fas fa-sign-out-alt'></i> Déconnexion
                </NavDropdown.Item>
              </NavDropdown>
            )}

            {/* not authenticated */}
            {!loading && !user && (
              <>
                <Nav.Link
                  onClick={() => handleClick('/contact')}
                  active={router.pathname === '/contact' ? true : false}
                >
                  <i className='fas fa-inbox'></i> Contactez-nous
                </Nav.Link>

                <Nav.Link
                  onClick={() => handleClick('/se-connecter')}
                  active={router.pathname === '/se-connecter' ? true : false}
                >
                  <i className='fas fa-sign-in-alt'></i> Se connecter
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
