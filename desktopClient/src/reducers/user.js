import types from '../constants/actionTypes';

export default (state = {}, action = {}) => {
  switch (action.type) {
    case types.SET_USER:
      return {
        ...state,
        user: action.user
      }
    default:
      return state;
  }
}
