import React from "react";
import { Link } from "react-router-dom";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/styles";

import useInput from "../hooks/useInput";
import { registerUser } from "./auth";

const useStyles = makeStyles({
  form: {
    display: "grid",
    gridRowGap: "1em",
  },
  textField: {
    width: "100%",
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
        <Button
          type="submit"
          disabled={isButtonDisabled}
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Signup
        </Button>
        <Typography component="p">
          Already have an account?{" "}
          <Link to="/account/login" className={classes.link}>
            Sign In
          </Link>
        </Typography>
      </form>
    </div>
  );
};

export default Signup;
