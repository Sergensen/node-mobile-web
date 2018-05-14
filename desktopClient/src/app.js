import React from 'react';
import ReactDOM from 'react-dom';
import Wrapper from './containers/Wrapper';
import Authenticate from './containers/Authenticate';
import { Provider } from 'react-redux';
import store from './store/configureStore';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
     <Switch>
       <Route path="/Authenticate" component={Authenticate} />
       <Route path="/" component={Wrapper}/>
     </Switch>
   </BrowserRouter>
  </Provider>
  , document.getElementById('root'));
