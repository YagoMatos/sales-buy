import React from 'react';
import indexRoutes from "./routes/index.jsx";

import { BrowserRouter, Route, Link, Redirect, withRouter, Switch, Router } from 'react-router-dom';
import { createBrowserHistory } from "history";

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

export const ProtectedRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
      fakeAuthCentralState.isAuthenticated === true
        ?  <Router history={hist}>
        <Switch>
          {indexRoutes.map((prop, key) => {
            return <Route path={prop.path} key={key} component={prop.component} />;
          })}
        </Switch>
      </Router>
        : <Redirect to={{
            pathname: '/login',
            state: { from: props.location }
          }} />
    )} />
  );
  
export const AuthButton = withRouter(({ history }) => (
    fakeAuthCentralState.isAuthenticated ? (
      <div className="login">
      <button onClick={() => {
          fakeAuthCentralState.signout(() => history.push('/'))
        }}>Sign out</button>
        </div>
    ) : (
      <div className="login">
  
      <p>You are not logged in.</p>
      </div>
    )
  ));
  