import { applyMiddleware, createStore, compose } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducer from './reducers';
import { Map, List } from 'immutable';

const initialState = new Map({
  ads: new List(),
  adNext: '',
  isLoading: true,
  productsAll: new Map(),
  productsNext: new List(),
  productsViewing: new List(),
  page: 0,
  pageViewing: 0,
  pageMax: 100,
  sortReverse: false,
  sortType: 'id'
});

export default createStore(
  reducer,
  initialState,
  compose(
    applyMiddleware(ReduxThunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);
