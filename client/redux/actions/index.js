import axios from 'axios';

/*           Utils              */

// get object array from JSON response
const formatProducts = (data) => {
  const dataArray = data.split('\n');
  dataArray.pop();
  return dataArray.map((prod) => JSON.parse(prod));
};


/*             Actions         */

// take products, their sort type and trigger add to queue
const addToProductsNext = (products, sortType) => (
  { type: 'ADD_TO_PRODUCTS_NEXT', products, sortType }
);

// take prodcuts and their sort type and trigger add to viewing
const addToProductsViewing = (products, sortType) => (
  { type: 'ADD_TO_PRODUCTS_VIEWING', products, sortType }
);

// trigger a move of next product batch from queue to viewing
const addToProductsViewingFromNext = () => (
  { type: 'ADD_TO_PRODUCTS_VIEWING_FROM_NEXT' }
);


// trigger change of 'isLoading' flag to false
const doneLoading = () => ({ type: 'DONE_LOADING' });

// trigger ad list generation based on max products size
const prepareAds = (pageMax) => ({ type: 'PREPARE_ADS', pageMax });

// set the last ad for later comparison with the next ad
const setAdLast = (adLast) => ({ type: 'SET_AD_LAST', adLast });

// trigger increase in current page by #pages
const setPage = (page) => ({ type: 'SET_PAGE', page });

// thunk which fetches next batch, routes results to next action
// if max data not reached, sends next request
const getNextProducts = (page, sortType, pageMax) => (
  // fetch next 20
  // then add to products next
  (dispatch) => (
    axios.get(`/api/products?sort${sortType}&limit=20&skip=${page}`)
    .then((res) => {
      const newPage = page + 20;
      const products = formatProducts(res.data);

      // update current page
      dispatch(setPage(newPage));

      if (newPage <= 20) {
        // add products straight to viewing
        dispatch(addToProductsViewing(products, sortType));
      } else {
        // add products to queue
        dispatch(addToProductsNext(products, sortType, dispatch));
      }

      // if less than maximum send next request
      if (products.length) {
        dispatch(getNextProducts(newPage, sortType, pageMax));
      } else {
        dispatch(doneLoading());
      }
    })
    .catch(() => {
      // retry request if server responds with error
      dispatch(getNextProducts(page, sortType, pageMax));
    })
  )
);

// export all actions
const actions = {
  addToProductsNext,
  addToProductsViewing,
  addToProductsViewingFromNext,
  getNextProducts,
  doneLoading,
  prepareAds,
  setAdLast,
  setPage
};

export default actions;
