import { Map, List } from 'immutable';
import actions from '../actions';

const addToProductsNext = (state, products, sortType, dispatch) => {
  let newState = state;
  // check if page is still sorted by same type as when fetch was made
  if(state.get('sortType') === sortType) {
    // clean new products
    products = products.split('\n');
    products.pop();
    products = products.map((prod) => JSON.parse(prod));
    // add new products to end of productsNext queue
    newState = state.update('productsNext', (pn) => pn.push(products));
  }

  return newState;
};

const addToViewingFromNext = (state, dispatch) => {
  const nextQueue = state.get('productsNext');
  let newState = state;
  // check if products are in queue
  if (nextQueue.size) {
      // add next batch of products to productsViewing and remove from productsNext
    newState = (
      state
        .update('productsViewing', (prods) => prods.push(nextQueue.first()))
        .update('productsNext', (prods) => prods.rest())
      );
  } else {
    // check if still loading
    if (state.get('isLoading')) {
      // after 100ms try again
      setTimeout(dispatch, 100, actions.addToProductsViewing(dispatch));
    }
  }
  return newState;
};

// change isLoading to false
const doneLoading = (state) => state.set('isLoading', false);

// update current page by new pages #
const increasePage = (state, pages) => state.update('page', (page) => page + pages);

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_PRODUCTS_NEXT':
      return addToProductsNext(
        state,
        action.products,
        action.sortType,
        action.dispatch
      );
    case 'ADD_TO_PRODCUTS_VIEWING':
      return addToViewingFromNext(state, action.dispatch);
    case 'DONE_LOADING':
      return doneLoading(state);
    case 'INCREASE_PAGE':
      return increasePage(state, action.pages);
    default:
      return state;
  }
};

export default reducer;
