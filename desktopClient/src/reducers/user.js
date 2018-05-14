import types from '../constants/actionTypes';

export default (state = {}, action = {}) => {
  switch (action.type) {
    case types.SET_USER:
      return {
        ...state,
        action.user
      }
    default:
      return state;
  }
}
