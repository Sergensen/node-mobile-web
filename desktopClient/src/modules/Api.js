import Auth from './Auth';
import axios from 'axios';

export const getUsers = (name, getUsersAction) => {
  if(name){
    axios({
      method: 'get',
      url: 'http://localhost:3000/api/users/'+name,
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
}

export const deleteUser = (id) => {
  const data= "from="+parse(Auth.getToken()).sub+"&to="+id;
  axios({
    method: 'post',
    url: 'http://localhost:3000/api/delete/friend',
    data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'bearer ' + Auth.getToken()
    }
  })
  .then((res) => console.log(res))
  .catch((error) => console.log(error));
}

export const auth = (endpoint, callback, email, password, name, surname, username) => {
  axios({
    method: 'post',
    url: 'http://localhost:3000/auth/'+endpoint,
    data: "email="+email+"&password="+password+"&name="+name+"&surname="+surname+"&username="+username,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
  .then((res) => callback({res}))
  .catch((error) => callback({error}));
}

export const setUser = (setUserAction, logout) => {
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
  .catch((error) => logout());
}
