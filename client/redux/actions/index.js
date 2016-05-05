import axios from 'axios';

const addToProductsNext = (products, sortType, dispatch) => (
  { type: 'ADD_TO_PRODUCTS_NEXT', products, sortType, dispatch }
);

const addToProductsViewing = (dispatch) => (
  { type: 'ADD_TO_PRODUCTS_VIEWING', dispatch }
);

const getNextProducts = (page, sortType, pageMax) => (
  // fetch next 20
  // then add to products next
  (dispatch) => (
    axios.get(`/api/products?sort${sortType}&limit=20&skip=${page}`)
    .then((res) => {
      // update current page
      console.log('in response');
      dispatch(increasePage(20));
      // add products to queue
      dispatch(addToProductsNext(res.data, sortType, dispatch));
      // set new page number
      const newPage = page + 20;
      // if less than maximum send next request
      if (newPage < pageMax) {
        dispatch(getNextProducts(newPage, sortType, pageMax));
      } else {
        dispatch(doneLoading());
      }
    })
    .catch((err) => {
      console.log(err);
    })
  )
);

const doneLoading = () => ({ type: 'DONE_LOADING' });

// trigger increase in current page by #pages
const increasePage = (pages) => ({ type: 'INCREASE_PAGE', pages });

const actions = {
  addToProductsNext,
  addToProductsViewing,
  getNextProducts,
  doneLoading,
  increasePage
};

export default actions;
