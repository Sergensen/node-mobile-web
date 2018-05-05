import types from '../constants/types';

const initialState = {
  test: "lol",
  addOn: "ol"
};

export default function user (state = initialState, action) {
  switch (action.type) {
    case types.TEST:
      return {
        ...state,
        test: state.test+state.addOn
      }
    default:
      return state;
  }
}
