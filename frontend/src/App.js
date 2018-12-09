import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, withRouter, Switch, Router } from 'react-router-dom';
import { createBrowserHistory } from "history";

import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "./assets/scss/paper-dashboard.scss";
import "./assets/demo/demo.css";
import "./assets/css/auth.css";
import './assets/css/App.css';
import Button from "./components/CustomButton/CustomButton";
import Auth from './views/Auth/Auth';

import Dashboard from "./layouts/Dashboard/Dashboard.jsx";

import indexRoutesDashboard from "./routes/indexRoutesDashboard.jsx";
import indexRoutesAdmin from "./routes/indexRoutesAdmin.jsx";

const hist = createBrowserHistory();

export const fakeAuthCentralState = {
  isAuthenticated: false,
  authenticate(callback) {
    this.isAuthenticated = true;
    setTimeout(callback, 300);
  },
  signout(callback) {
    this.isAuthenticated = false;
    setTimeout(callback, 300);
  }
};

const Protected = () => <Dashboard />;

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const user = localStorage.getItem('user');

  if ( user ) {
    return(  
      <Route {...rest} render={(props) => (
        fakeAuthCentralState.isAuthenticated === true
          ? <Router history={hist}>
              <Switch>
                { indexRoutesDashboard.map((prop, key) => {
                return <Route path={prop.path} key={key} component={prop.component} />;
                })}
            </Switch>
          </Router>
          : <Redirect to={{ pathname: '/login', state: { from: props.location }}} />
      )} />
    )
  } else {
    return(  
      <Route {...rest} render={(props) => (
        fakeAuthCentralState.isAuthenticated === true
          ? <Router history={hist}>
              <Switch>
                { indexRoutesAdmin.map((prop, key) => {
                return <Route path={prop.path} key={key} component={prop.component} />;
                })}
            </Switch>
          </Router>
          : <Redirect to={{ pathname: '/login', state: { from: props.location }}} />
      )} />
    )
  }

};

const AuthButton = withRouter(({ history }) => (
  fakeAuthCentralState.isAuthenticated ? (
    <div className="btn-login">
      <Button 
        round
        onClick={() => { fakeAuthCentralState.signout(() => history.push('/'))}}>
        Sign out
      </Button>
    </div>
  ) : <Redirect to={{ pathname: '/protected'}} />
));

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div className="home">
            <AuthButton/>
            <Redirect to={{ pathname: '/protected'}} />
            <Route path="/login" component={withRouter(Auth)}/>
            <ProtectedRoute path='/protected' component={Protected} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;