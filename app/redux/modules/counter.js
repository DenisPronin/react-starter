import { createAction, handleActions } from 'redux-actions'

/*
 * Constants
 * */
export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';

/*
 * Actions
 * */
export const increment = createAction(INCREMENT, (value = 1) => value);
export const decrement = createAction(DECREMENT, (value = 1) => value);

export const actions = {
  increment,
  decrement
};

/*
 * State
 * */
export const initialState = {
  value: 0
};

/*
 * Reducers
 * */
export default handleActions({
  [INCREMENT]: (state, { payload: value }) => {
    return {
      ...state,
      value: state.value + value
    }
  },

  [DECREMENT]: (state, { payload: value }) => {
    return {
      ...state,
      value: state.value - value
    }
  }
}, initialState);
