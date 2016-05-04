import axios from 'axios';

function getNextProducts(page, pageMax) {
  if(page < pageMax) {
    // fetch next 20
      //then add to products next
      //then increase page by 20 ? maybe not neccessary
      //then call self(page+20, pageMax)
  } else {
    // set done loading
  }
}

const actions = {
  addToProductsNext: (products) => { type: 'ADD_TO_PRODUCTS_NEXT', products }
  getNextProducts,
};

export default actions;
