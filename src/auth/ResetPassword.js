import React, { useState } from "react";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/styles";

import useInput from "../hooks/useInput";
import { resetPassword } from "./auth";
import FormErrors from "../ui/FormErrors";

const useStyles = makeStyles({
  wrapper: {
    display: "grid",
    justifyItems: "center",
  },
  container: {
    alignSelf: "center",
    display: "grid",
    alignItems: "center",
    justifyItems: "center",
    border: "1px solid black",
  },
  form: {
    display: "grid",
    gridGap: "20px",
    margin: "30px",
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

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { token, error } = await resetPassword({ email, password });
    if (token) {
      setToken(token);
    } else {
      setError(error);
    }
  };

  const confirmPasswordError =
    confirmPassword.length > 5 && confirmPassword !== password;

  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
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
              label="New Password"
              type="password"
              onChange={setPassword}
              variant="outlined"
              fullWidth
              required
              helperText="Password should be more than 5 characters"
            />
          </div>
          <div>
            <TextField
              label="Confirm New Password"
              type="password"
              onChange={setConfirmPassword}
              variant="outlined"
              fullWidth
              required
              error={confirmPasswordError}
              helperText={confirmPasswordError && "Passwords do not match"}
            />
          </div>
          <FormErrors text={error} />
          <div>
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
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
