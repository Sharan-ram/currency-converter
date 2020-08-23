import React from "react";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  appBar: {
    background: "#343a40",
  },
  container: {
    display: "grid",
  },
  linkWrapper: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridGap: "10px",
  },
  link: {
    textDecoration: "none",
    color: "#ffffff",
  },
  button: {
    justifySelf: "end",
  },
  buttonLabel: {
    color: "#ffffff",
  },
});

const TopNavigation = ({ isAuthenticated, setToken }) => {
  const logoutUser = () => {
    localStorage.removeItem("token");
    setToken(null);
  };
  const classes = useStyles();
  return (
    <AppBar className={classes.appBar}>
      <Toolbar className={classes.container}>
        <div className={classes.button}>
          {!isAuthenticated && (
            <div className={classes.linkWrapper}>
              <div>
                <Link className={classes.link} to="/account/login">
                  LOGIN
                </Link>
              </div>
              <div>
                <Link className={classes.link} to="/account/signup">
                  SIGNUP
                </Link>
              </div>
            </div>
          )}
          {isAuthenticated && (
            <Button
              onClick={logoutUser}
              classes={{ label: classes.buttonLabel }}
            >
              LOGOUT
            </Button>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default TopNavigation;
