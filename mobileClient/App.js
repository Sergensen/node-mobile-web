import React from 'react';
import {
  AppRegistry,
  View
} from 'react-native';
import { Provider } from 'react-redux';
import configureStore from './src/store/configureStore';
import App from './src/containers/App';

const store = configureStore();

const ReduxApp = () => (
  <View>
    <Provider store={store}>
      <App />
    </Provider>
  </View>
);

export default ReduxApp;

AppRegistry.registerComponent('mobileClient', () => ReduxApp);
