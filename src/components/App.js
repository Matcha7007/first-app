import React from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";

// components
import Layout from "./Layout";

// pages
import Error from "../pages/error";

// context

export default function App() {
  // global

  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/app/dashboard" />} />
        <Route
          exact
          path="/app"
          render={() => <Redirect to="/app/dashboard" />}
        />
        <PublicRoute path="/app" component={Layout} />
        <Route component={Error} />
      </Switch>
    </HashRouter>
  );

  // #######################################################################

  function PublicRoute({ component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
            React.createElement(component, props)          
        }
      />
    );
  }
}
