import types from '../constants/types';
import { getUser } from '../modules/Api';
import Auth from '../modules/Auth';
import axios from 'axios';

export default function user (state = {}, action) {
  switch (action.type) {
    case types.SET_USER:
      return action.user;
    default:
      return state;
  }
}
