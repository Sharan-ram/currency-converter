import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles({
  progress: {
    position: "fixed",
    top: "50%",
    left: "50%",
  },
});

const LoadingScreen = () => {
  const classes = useStyles();
  return <CircularProgress className={classes.progress} />;
};

export default LoadingScreen;
