import axios from 'axios';
import Auth from './Auth';
const URL = "http://192.168.178.77:3000/";

export const getUsers = (name) => {
  Auth.getToken().then((response)=>{
    axios({
      method: 'get',
      url: URL+'api/user/'+name,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'bearer ' + response
      }
    })
    .then((res) => {
      return res.data.message;
    })
    .catch((error) => alert(error));
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
