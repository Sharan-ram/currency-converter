import React from "react";
import { Link } from "react-router-dom";
import GoogleLogin from "react-google-login";

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

  const handleGoogleLoginSuccess = (response) => {
    setToken(response.accessToken);
  };

  const handleGoogleLoginFailure = (response) => {
    console.log("response", response);
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
        <Link to="/account/reset-password" className={classes.link}>
          Forgot Password?
        </Link>
        <Typography component="p">
          Don't have an account?{" "}
          <Link to="/account/signup" className={classes.link}>
            Signup
          </Link>
        </Typography>
        <Typography component="p">OR</Typography>
        <div>
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            buttonText="Signin through Google"
            onSuccess={handleGoogleLoginSuccess}
            onFailure={handleGoogleLoginFailure}
            cookiePolicy={"single_host_origin"}
          />
        </div>
      </form>
    </div>
  );
};

export default Login;
