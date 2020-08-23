import React from "react";

import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/styles";

const useStyle = makeStyles({
  container: {
    display: "grid",
    alignItems: "center",
    justifyContent: "start",
    paddingLeft: "10px",
    background: "#CA0B00",
    minHeight: 50,
    color: "#ffffff",
  },
});

const FormErrors = ({ text, className }) => {
  const classes = useStyle();
  if (!text) return null;
  return (
    <div className={classes.container}>
      <Typography component="p">{text}</Typography>
    </div>
  );
};

export default FormErrors;
