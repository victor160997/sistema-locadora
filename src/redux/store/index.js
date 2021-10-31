import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../reducers/index';

const Store = createStore(rootReducer,
  composeWithDevTools());

export default Store;
