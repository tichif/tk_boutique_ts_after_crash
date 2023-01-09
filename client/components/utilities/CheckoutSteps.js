import { Nav } from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from 'next/router';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  const router = useRouter();

  function clickHandler(path) {
    router.push(path);
  }

  return (
    <Nav className='justify-content-center mb-4'>
      <Nav.Item>
        {step1 ? (
          <Nav.Link onClick={() => clickHandler('/se-connecter')}>
            Se Connecter
          </Nav.Link>
        ) : (
          <Nav.Link disabled>Se Connecter</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step2 ? (
          <Nav.Link onClick={() => clickHandler('/livraison')}>
            Livraison
          </Nav.Link>
        ) : (
          <Nav.Link disabled>Livraison</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step3 ? (
          <Nav.Link onClick={() => clickHandler('/methode-paiement')}>
            Mode de paiement
          </Nav.Link>
        ) : (
          <Nav.Link disabled>Mode de paiement</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step4 ? (
          <Nav.Link onClick={() => clickHandler('/commande')}>
            Commander
          </Nav.Link>
        ) : (
          <Nav.Link disabled>Commander</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
};

export default CheckoutSteps;
