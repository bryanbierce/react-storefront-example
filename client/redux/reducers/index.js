function addToProductsNext(state, products) {
  // clean new products
  // create new state
  // return new state
}

function addToViewingFromNext(state) {
  // length of productsNext
    // if length
      // remove 20 products from the productsNext
      // add these to productsViewing
      // return new state
    // if no length
      // check if loading
        // if yes
          // timeout for 300ms and call self
        // if no
          // return original state
}

function doneLoading(state) {
  // change isLoading to false
  // return new state
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_PRODUCTS_NEXT':
      return addToProductsNext(state, action.products);
    case 'ADD_TO_PRODCUTS_VIEWING':
      return addToViewingFromNext(state);
    case 'DONE_LOADING':
      return doneLoading(state);
    default:
      return state;
  }
};

export default reducer;
