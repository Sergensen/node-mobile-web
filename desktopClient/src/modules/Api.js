import Auth from './Auth';
import axios from 'axios';

export const getUsers = (name, getUsersAction) => {
  axios({
    method: 'get',
    url: 'http://localhost:3000/api/user/'+name,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'bearer ' + Auth.getToken()
    }
  })
  .then((res) => {
    getUsersAction(res.data.message);
  })
  .catch((error) => console.log(error));
}

export const setUser = (setUserAction) => {
  axios({
    method: 'post',
    url: 'http://localhost:3000/api/userself/',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'bearer ' + Auth.getToken()
    }
  })
  .then((res) => {
    setUserAction(res.data.message);
  })
  .catch((error) => console.log(error));
}
