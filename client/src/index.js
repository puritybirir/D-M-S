import 'babel-polyfill';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import React from 'react';
import { render } from 'react-dom';
import configureStore from './store/configureStore';
import routes from './routes';
import { loadDocuments } from './actions/documentActions';

const store = configureStore();

store.dispatch(loadDocuments());

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('app')
);
