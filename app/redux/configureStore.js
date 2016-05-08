import {
  applyMiddleware,
  compose,
  createStore
} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './rootReducer'

export default function configureStore(initialState) {
  const middleware = applyMiddleware(thunk);

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
    rootReducer, initialState
  );

  return store;
}
