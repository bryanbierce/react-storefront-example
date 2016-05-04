import { applyMiddleware, createStore } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducer from './reducers';
import { Map, List } from 'immutable';

const initialState = new Map({
  adViewing: '',
  adNext: '',
  isLoading: true,
  productsAll: new Map(),
  productsNext: new List(),
  productsViewing: new List(),
  page: 0,
  pageViewing: 0,
  pageMax: 100000,
  sortReverse: false,
  sortType: 'id'
});

export default createStore(
  reducer,
  initialState,
  applyMiddleware(ReduxThunk)
);
