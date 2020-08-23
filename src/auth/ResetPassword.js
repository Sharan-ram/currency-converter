import React from "react";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/styles";

import useInput from "../hooks/useInput";
import { resetPassword } from "./auth";

const useStyles = makeStyles({
  form: {
    display: "grid",
    gridRowGap: "1em",
  },
  link: {
    textDecoration: "none",
  },
});

const ResetPassword = ({ setToken }) => {
  const classes = useStyles();
  const [email, setEmail] = useInput("");
  const [password, setPassword] = useInput("");
  const [confirmPassword, setConfirmPassword] = useInput("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { token } = await resetPassword({ email, password });
    if (token) {
      setToken(token);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className={classes.form}>
        <div>
          <TextField
            type="email"
            label="Email"
            onChange={setEmail}
            variant="outlined"
            fullWidth
            required
          />
        </div>
        <div>
          <TextField
            label="Password"
            type="password"
            onChange={setPassword}
            variant="outlined"
            fullWidth
            required
          />
        </div>
        <div>
          <TextField
            label="Confirm Password"
            type="password"
            onChange={setConfirmPassword}
            variant="outlined"
            fullWidth
            required
          />
        </div>
        <Button
          disabled={
            !email ||
            !password ||
            password.length < 6 ||
            password !== confirmPassword
          }
          variant="contained"
          type="submit"
          color="primary"
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default ResetPassword;
