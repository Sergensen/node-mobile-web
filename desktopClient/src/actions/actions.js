import types from '../constants/actionTypes';

export const setUser = (user) => ({
  type: types.SET_USER,
  user
});

export const getUsers = (users) => ({
  type: types.GET_USERS,
  users
});
