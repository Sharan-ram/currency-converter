import React from "react";
import { Link } from "react-router-dom";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/styles";

import useInput from "../hooks/useInput";
import { loginUser } from "./auth";

const useStyles = makeStyles({
  form: {
    display: "grid",
    gridRowGap: "1em",
  },
  link: {
    textDecoration: "none",
  },
});

const Login = ({ setToken }) => {
  const classes = useStyles();
  const [email, setEmail] = useInput("");
  const [password, setPassword] = useInput("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { token } = await loginUser({ email, password });
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
        <Button
          disabled={!email || !password || password.length < 6}
          variant="contained"
          type="submit"
          color="primary"
        >
          Login
        </Button>
        <Typography component="p">
          Don't have an account?{" "}
          <Link to="/account/signup" className={classes.link}>
            Signup
          </Link>
        </Typography>
      </form>
    </div>
  );
};

export default Login;
