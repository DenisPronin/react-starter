import {
  applyMiddleware,
  compose,
  createStore
} from 'redux'
import thunk from 'redux-thunk'
import promiseMiddleware from 'redux-promise-middleware';

export default function configureStore (initialState, rootReducers) {
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
