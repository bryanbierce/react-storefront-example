import React from 'react';
import '../styles/components/ad';
const { string } = React.PropTypes;

const Ad = (props) => (
  <div className="adWindow">
    <h1>Discount Ascii Warehouse</h1>

    <p>Here you're sure to find a bargain on some of the finest ascii available to purchase. Be sure to peruse our selection of ascii faces in an exciting range of sizes and prices.</p>

    <p>But first, a word from our sponsors:</p>
    <img class="ad" src={ props.img } />
  </div>
);
Ad.propTypes = {
  img: string
};

export default Ad;
