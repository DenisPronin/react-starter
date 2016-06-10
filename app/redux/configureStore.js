import {
  applyMiddleware,
  compose,
  createStore
} from 'redux'
import thunk from 'redux-thunk'
import promiseMiddleware from 'redux-promise-middleware';
import { rootReducers } from './rootReducer'

export default function configureStore(initialState) {
  const middleware = applyMiddleware(thunk, promiseMiddleware());

  let createStoreWithMiddleware;

  if (__DEBUG__) {
    createStoreWithMiddleware = compose(
      middleware,
      require('./utils/DevTools').default.instrument()
    )
  }
  else {
    createStoreWithMiddleware = compose(
      middleware
    )
  }

  const store = createStoreWithMiddleware(createStore)(
    rootReducers, initialState
  );

  return store;
}
