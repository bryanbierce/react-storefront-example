import { Map, List } from 'immutable';

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
        .set('scrollRetry', false)
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

// reset loading to true
const beginLoading = (state) => state.set('isLoading', true);

// update sort type. clear product list
const changeSort = (state, sortType) => state.set('sortType', sortType);

// reset productsNext to an empty list
const clearProductsNext = (state) => state.set('prodcutsViewing', new List());

// reset productsViewing to empty list
const clearProductsViewing = (state) => state.set('productsViewing', new List());

// change isLoading to false
const doneLoading = (state) => state.set('isLoading', false);

// change 'scrollRetry' to false
const endScrollRetry = (state) => state.set('scrollRetry', false);

// create a list of ads with no two adjacent ads being the same
const prepareAds = (state, pageMax) => {
  let i = Math.floor(pageMax / 20) + 1;
  let adList = new List();

  const firstAdNum = document.getElementById('landingAd').src.split('?r=')[1];
  let lastNum = parseInt(firstAdNum, 10);

  // for every 20 possible products make 1 add not equal to the last
  while (--i) {
    let newNum = Math.floor(Math.random() * 1000);
    while ((newNum % 16) === (lastNum % 16)) {
      newNum = Math.floor(Math.random() * 1000);
    }
    adList = adList.push(`/ad/?r=${newNum}`);
    lastNum = newNum;
  }

  // return state with new adList
  return state.set('adList', adList);
};

// update adLast with the most recently displayed ad
const setAdLast = (state, adLast) => state.set('adLast', adLast);

// update current page by new pages #
const setPage = (state, page) => state.set('page', page);


// reducer reads action types and dispatches data to handlers
const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_PRODUCTS_NEXT':
      return addToProductsNext(
        state,
        action.products,
        action.sortType
      );
    case 'ADD_TO_PRODUCTS_VIEWING':
      return addToProductsViewing(state, action.products, action.sortType);
    case 'ADD_TO_PRODUCTS_VIEWING_FROM_NEXT':
      return addToViewingFromNext(state, action.sortType, action.retry);
    case 'BEGIN_LOADING':
      return beginLoading(state);
    case 'CHANGE_SORT':
      return changeSort(state, action.sortType);
    case 'CLEAR_PRODUCTS_NEXT':
      return clearProductsNext(state);
    case 'CLEAR_PRODUCTS_VIEWING':
      return clearProductsViewing(state);
    case 'DONE_LOADING':
      return doneLoading(state);
    case 'END_SCROLL_RETRY':
      return endScrollRetry(state);
    case 'PREPARE_ADS':
      return prepareAds(state, action.pageMax);
    case 'SET_AD_LAST':
      return setAdLast(state, action.adLast);
    case 'SET_PAGE':
      return setPage(state, action.page);
    default:
      return state;
  }
};


export default reducer;
