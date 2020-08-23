import React from "react";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  container: {
    display: "grid",
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
    <AppBar>
      <Toolbar className={classes.container}>
        <div className={classes.button}>
          {!isAuthenticated && (
            <Link className={classes.link} to="/account/signup">
              SIGN UP
            </Link>
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
