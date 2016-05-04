import React from 'react';
import '../styles/components/productCard';
const { number, string } = React.PropTypes;

const ProductCard = (props) => (
  <div className="productCard">
    <p style={{ fontSize: props.size }}
      className="asciiFace"
    >{ props.face }</p>
    <p>{ props.id }</p>
    <div>
      <p>{ props.price }</p>
      <p>{ props.date }</p>
    </div>
  </div>
);
ProductCard.propTypes = {
  date: string,
  face: string,
  id: string,
  price: number,
  size: number
};

export default ProductCard;
