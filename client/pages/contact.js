import Image from 'next/image';
import { Col, Row } from 'react-bootstrap';

import ContactForm from '../components/form/contact';
import Layout from '../components/Layout';
import FormContainer from '../components/utilities/FormContainer';

const contact = () => {
  return (
    <Layout title='Contactez-nous'>
      <Row>
        <Col md={8}>
          <FormContainer>
            <h1>Contactez-nous</h1>
            <ContactForm />
          </FormContainer>
        </Col>
        <Col md={4}>
          <h1>Infos</h1>
          <div>
            <p>
              <i className='fas fa-map-marker-alt'></i> 2, rue Saint-Preux,
              Péguy-Ville
            </p>
          </div>
          <div>
            <p>
              <i className='fas fa-phone-alt'></i> (+509) 44362596
            </p>
          </div>
          <div>
            <p>
              <i className='fas fa-envelope'></i> contact@tkboutiquehaiti.com
            </p>
          </div>
          <div>
            <Image
              src='/logo.jpg'
              alt='TK Boutique'
              width={300}
              height={300}
              priority
            />
          </div>
        </Col>
      </Row>
    </Layout>
  );
};

export default contact;
