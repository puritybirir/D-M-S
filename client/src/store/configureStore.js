import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers/rootReducer';

export default function configureStore() {
  return createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
  );
}
