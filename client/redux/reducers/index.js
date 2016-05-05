import { Map, List } from 'immutable';
import actions from '../actions';

const addToProductsNext = (state, products, sortType) => {
  let newState = state;

  // check if page is still sorted by same type as when fetch was made
  if (state.get('sortType') === sortType) {
    // add new products to end of productsNext queue
    newState = (
      state
        .update('productsNext', (pn) => pn.push(products))
        .update('productNextCount', (count) => count + 1)
    );
  }

  return newState;
};

const addToProductsViewing = (state, products, sortType) => {
  let newState = state;

  // make sure products fetched on current sortType
  if (sortType === state.get('sortType')) {
    // add the new products to the current viewing
    newState = state.update('productsViewing', (pv) => pv.concat(products));
  }

  return newState;
};

const addToViewingFromNext = (state) => {
  const nextQueue = state.get('productsNext');
  let newState = state;

  // check if products are in queue
  if (nextQueue.size) {
    // add next batch of products to productsViewing and remove from productsNext
    newState = (
      state
        .update('productsViewing', (prods) => prods.concat(nextQueue.first()))
        .update('productsNext', (prods) => prods.rest())
        .update('productsNextCount', (count) => count - 1)
      );
  } else {
    // check if still loading
    if (state.get('isLoading')) {
      // retry action
      newState = state.set('scrollRetry', true);
    }
  }

  return newState;
};

// change isLoading to false
const doneLoading = (state) => state.set('isLoading', false);

// update current page by new pages #
const setPage = (state, page) => state.set('page', page);


// reducer reads action types and dispatches data to handlers
const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_PRODUCTS_NEXT':
      return addToProductsNext(
        state,
        action.products,
        action.sortType,
        action.dispatch
      );
    case 'ADD_TO_PRODUCTS_VIEWING':
      return addToProductsViewing(state, action.products, action.sortType);
    case 'ADD_TO_PRODUCTS_VIEWING_FROM_NEXT':
      return addToViewingFromNext(state, action.sortType, action.retry);
    case 'DONE_LOADING':
      return doneLoading(state);
    case 'SET_PAGE':
      return setPage(state, action.page);
    default:
      return state;
  }
};


export default reducer;
