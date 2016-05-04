import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import StoreFront from './StoreFront';
import store from './redux/store';

const AppEntry = () => (
  <Provider store={ store }>
    <StoreFront />
  </Provider>
);

ReactDOM.render(<AppEntry />, document.getElementById('AppEntry'));
