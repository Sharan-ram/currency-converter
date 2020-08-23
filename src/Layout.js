import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import Signup from "./auth/Signup";
import Login from "./auth/Login";
import ResetPassword from "./auth/ResetPassword";
import Home from "./Home";
import TopNavigation from "./ui/TopNavigation";

const Auth = ({ match: { path }, setToken }) => {
  return (
    <Switch>
      <Route
        exact
        path={`${path}/signup`}
        component={() => <Signup setToken={setToken} />}
      />
      <Route
        exact
        path={`${path}/login`}
        component={() => <Login setToken={setToken} />}
      />
      <Route
        exact
        path={`${path}/reset-password`}
        component={() => <ResetPassword setToken={setToken} />}
      />
    </Switch>
  );
};

const PageNotFound = () => {
  return <h2>Page not found</h2>;
};

const useStyles = makeStyles({
  container: {
    margin: "10%",
  },
});

const Layout = () => {
  const classes = useStyles();
  const [token, setToken] = useState(localStorage.getItem("token"));
  return (
    <Router>
      <TopNavigation
        isAuthenticated={token ? true : false}
        setToken={setToken}
      />
      <div className={classes.container}>
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
            component={!token ? () => <Redirect to="/account/login" /> : Home}
          />
          <Route component={PageNotFound} />
        </Switch>
      </div>
    </Router>
  );
};

export default Layout;
