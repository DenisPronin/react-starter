import { combineReducers } from 'redux'
import counter, { actions as counterActions } from './modules/counter'

export const rootReducers = combineReducers({
  counter
});

export const rootActions = Object.assign(
  counterActions
);
