class Auth {
  static authenticateUser(token) {
    localStorage.setItem('token', token);
  }
  static isUserAuthenticated() {
    const token = localStorage.getItem('token');
    return token!==null&&token!=="undefined"?true:false;
  }
  static deauthenticateUser() {
    localStorage.removeItem('token');
  }
  static getToken() {
    return localStorage.getItem('token');
  }
}
export default Auth;
