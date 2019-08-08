import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import './App.css';
import MuiThemeProvide from '@material-ui/core/styles/MuiThemeProvider';
import createTheme from '@material-ui/core/styles/createMuiTheme';

import Navbar from './components/Navbar';
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';
import themeFile from './util/theme';
import jwtDecode from 'jwt-decode';
import AuthRoute from './util/AuthRoute'
import { Provider } from 'react-redux';
import store from './redux/store';

const theme = createTheme(themeFile);

const token = localStorage.FBIdToken;

let authenticated;
if(token){
    const decodedToken = jwtDecode(token);
    if(decodedToken.exp * 1000 < Date.now()){
        window.location.href = '/login';
        authenticated = false;
    }else{
        authenticated = true;
    }
}

function App() {
  return (
      <MuiThemeProvide theme={theme}>
          <Provider store={store}>
                  <Router>
                      <Navbar/>
                      <div className="container">
                          <Switch>
                              <Route exact path="/" component={home} />
                              <AuthRoute exact path="/login" component={login} authenticated={authenticated}/>
                              <AuthRoute exact path="/signup" component={signup} authenticated={authenticated}/>
                          </Switch>
                      </div>
                  </Router>
          </Provider>
      </MuiThemeProvide>
  );
}

export default App;
