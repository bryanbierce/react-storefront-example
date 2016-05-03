import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Store from './Store';
import store from './redux/store';

const AppEntry = () => (
  <Provider store={ store }>
    <Store />
  </Provider>
);

ReactDOM.render(<AppEntry />, document.getElementById('AppEntry'));
