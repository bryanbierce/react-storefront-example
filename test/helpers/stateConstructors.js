const { Map, List } = require('immutable');

const getInitialState = () => (
  new Map({
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
  })
);

module.exports = {
  getInitialState
};
