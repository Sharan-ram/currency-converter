import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Signup from "./auth/Signup";
import Home from "./Home";

const Auth = ({ match: { path }, setToken }) => {
  console.log("inside auth");
  return (
    <Switch>
      <Route
        exact
        path={`${path}/signup`}
        component={() => <Signup setToken={setToken} />}
      />
    </Switch>
  );
};

const PageNotFound = () => {
  return <h2>Page not found</h2>;
};

const Layout = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  console.log("token inside App", token);
  return (
    <Router>
      <Switch>
        <Route
          path="/account"
          component={
            token
              ? () => <Redirect to="/" />
              : (props) => <Auth setToken={setToken} {...props} />
          }
        />
        <Route
          exact
          path="/"
          component={!token ? () => <Redirect to="/account/signup" /> : Home}
        />
        <Route component={PageNotFound} />
      </Switch>
    </Router>
  );
};

export default Layout;
