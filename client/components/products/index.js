import { Col } from 'react-bootstrap';

import Product from './product';

const Products = ({ products, currency }) => {
  return (
    products &&
    products.map((product) => (
      <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
        <Product currency={currency} product={product} />
      </Col>
    ))
  );
};

export default Products;
