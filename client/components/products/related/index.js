import { Row, Alert } from 'react-bootstrap';

import Loader from '../../utilities/Loader';
import Products from '../index';

const ProductRelated = ({ products, currency, loading }) => {
  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {products && products.length < 1 ? (
        <Alert variant='warning'>Il n'y a pas d'articles</Alert>
      ) : (
        <Row>
          <Products products={products} currency={currency} />
        </Row>
      )}
    </>
  );
};

export default ProductRelated;
