import axios from 'axios';

/*           Utils              */

const formatProducts = (data) => {
  const dataArray = data.split('\n');
  dataArray.pop();
  return dataArray.map((prod) => JSON.parse(prod));
};


/*             Actions         */

// take products, their sort type and trigger add to queue
const addToProductsNext = (products, sortType, dispatch) => (
  { type: 'ADD_TO_PRODUCTS_NEXT', products, sortType, dispatch }
);

// take prodcuts and their sort type and trigger add to viewing
const addToProductsViewing = (products, sortType) => (
  { type: 'ADD_TO_PRODUCTS_VIEWING', products, sortType }
);

// trigger a move of next product batch from queue to viewing
const addToProductsViewingFromNext = (dispatch) => (
  { type: 'ADD_TO_PRODUCTS_VIEWING_FROM_NEXT', dispatch }
);

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
      if (newPage < pageMax) {
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

// trigger change of 'isLoading' flag to false
const doneLoading = () => ({ type: 'DONE_LOADING' });

// trigger increase in current page by #pages
const setPage = (page) => ({ type: 'SET_PAGE', page });


// export all actions
const actions = {
  addToProductsNext,
  addToProductsViewing,
  addToProductsViewingFromNext,
  getNextProducts,
  doneLoading,
  setPage
};

export default actions;
