import types from '../constants/types';

export function test() {
  return {
    type: types.TEST
  };
}

export function setUser(user){
  return{
    type: types.SET_USER,
    user
  }
}
