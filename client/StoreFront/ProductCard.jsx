import React from 'react';
import '../styles/components/productCard';
const { number, string } = React.PropTypes;

const ProductCard = (props) => (
  <div className="productCard">
    <p style={{ fontSize: props.size }}
      className="asciiFace"
    >{ props.face }</p>
    <p className="productId">{ props.id }</p>
    <div>
      <p className="productPrice">{ props.price }</p>
      <p className="productDate">{ props.date }</p>
    </div>
  </div>
);
ProductCard.propTypes = {
  date: string,
  face: string,
  id: string,
  price: string,
  size: number
};

export default ProductCard;
