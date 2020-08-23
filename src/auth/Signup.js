import React, { useState } from "react";
import { Link } from "react-router-dom";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/styles";

import useInput from "../hooks/useInput";
import { registerUser } from "./auth";
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
    gridRowGap: "20px",
    margin: "30px",
  },
  link: {
    textDecoration: "none",
  },
});

const Signup = ({ setToken }) => {
  const [name, setName] = useInput("");
  const [email, setEmail] = useInput("");
  const [password, setPassword] = useInput("");
  const [confirmPassword, setConfirmPassword] = useInput("");

  const [error, setError] = useState("");

  const classes = useStyles();

  const addUser = async (e) => {
    e.preventDefault();
    const { token, error } = await registerUser({ name, email, password });
    if (token) {
      setToken(token);
    } else {
      setError(error);
    }
  };

  const confirmPasswordError =
    confirmPassword.length > 5 && confirmPassword !== password;

  const isButtonDisabled =
    !name.trim() || password.trim().length < 6 || password !== confirmPassword;

  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        <form onSubmit={addUser} className={classes.form}>
          <div>
            <TextField
              label="Name"
              value={name}
              onChange={setName}
              required
              variant="outlined"
              fullWidth
            />
          </div>
          <div>
            <TextField
              type="email"
              label="Email"
              value={email}
              onChange={setEmail}
              required
              variant="outlined"
              fullWidth
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
              helperText="Password should be more than 5 characters"
            />
          </div>
          <div>
            <TextField
              error={confirmPasswordError}
              label="Confirm Password"
              type="password"
              onChange={setConfirmPassword}
              required
              variant="outlined"
              fullWidth
              helperText={confirmPasswordError && "Passwords do not match"}
            />
          </div>
          <FormErrors text={error} />
          <div>
            <Button
              type="submit"
              disabled={isButtonDisabled}
              variant="contained"
              color="primary"
            >
              Signup
            </Button>
          </div>
          <Typography component="p">
            Already have an account?{" "}
            <Link to="/account/login" className={classes.link}>
              Sign In
            </Link>
          </Typography>
        </form>
      </div>
    </div>
  );
};

export default Signup;
