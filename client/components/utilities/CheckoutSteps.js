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
          <Link
            href='/se-connecter'
            onClick={() => clickHandler('/se-connecter')}
          >
            <Nav.Link>Se Connecter</Nav.Link>
          </Link>
        ) : (
          <Nav.Link disabled>Se Connecter</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step2 ? (
          <Link href='/livraison' onClick={() => clickHandler('/livraison')}>
            <Nav.Link>Livraison</Nav.Link>
          </Link>
        ) : (
          <Nav.Link disabled>Livraison</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step3 ? (
          <Link
            href='/methode-paiement'
            onClick={() => clickHandler('/methode-paiement')}
          >
            <Nav.Link>Mode de paiement</Nav.Link>
          </Link>
        ) : (
          <Nav.Link disabled>Mode de paiement</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step4 ? (
          <Link href='/commande' onClick={() => clickHandler('/commande')}>
            <Nav.Link>Commander</Nav.Link>
          </Link>
        ) : (
          <Nav.Link disabled>Commander</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
};

export default CheckoutSteps;
