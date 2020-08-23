import React from "react";
import { Link } from "react-router-dom";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/styles";

import useInput from "../hooks/useInput";
import { registerUser } from "./auth";

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

  const classes = useStyles();

  const isButtonDisabled =
    !name.trim() || password.trim().length < 6 || password !== confirmPassword;

  const addUser = async (e) => {
    e.preventDefault();
    const { token } = await registerUser({ name, email, password });
    if (token) {
      setToken(token);
    }
  };

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
            />
          </div>
          <div>
            <TextField
              label="Confirm Password"
              type="password"
              onChange={setConfirmPassword}
              required
              variant="outlined"
              fullWidth
            />
          </div>
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
