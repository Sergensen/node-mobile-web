import axios from 'axios';
import Auth from './Auth';
import AUTH_API from '../constants/config.js';

export const getUsers = (name) => {
  Auth.getToken().then((response)=>{
    axios({
      method: 'get',
      url: AUTH_API+'/api/user/'+name,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'bearer ' + response
      }
    })
    .then((res) => {
      return res.data.message;
    })
    .catch((error) => alert("1"+error));
  });
}

export const getRequests = (id) => {

}

export const getFriends = (id) => {

}

export const deleteFriend = (from, to) => {

}

export const deleteRequest = (from, to) => {

}
export const addFriend = (from, to) => {

}
