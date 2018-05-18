import { AsyncStorage } from "react-native";

class Auth {
  static async authenticateUser(token) {
    try {
      await AsyncStorage.setItem("token", token);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  }
  static async isUserAuthenticated() {
    try {
      const value = await AsyncStorage.getItem("token");
      return value !== null;
    } catch (error) {
      console.log(error);
      alert(error);
    }
  }
  static async deauthenticateUser() {
    try {
      await AsyncStorage.removeItem("token");
    } catch (error) {}
  }
  static async getToken() {
    try {
      const value = await AsyncStorage.getItem("token");
      if (value !== null) {
        return value;
      }
    } catch (error) {}
  }
}
export default Auth;
