import { createStore, applyMiddleware } from 'redux';
import index from '../reducers/index';
import thunk from 'redux-thunk';

export default function configureStore() {
  let store = createStore(index, applyMiddleware(thunk));
  return store;
}
