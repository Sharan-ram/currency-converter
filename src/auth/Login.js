import React, { useState } from "react";
import { Link } from "react-router-dom";
import GoogleLogin from "react-google-login";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/styles";

import { loginUser } from "./auth";
import useInput from "../hooks/useInput";
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
  orText: {
    justifySelf: "center",
  },
});

const Login = ({ setToken }) => {
  const classes = useStyles();
  const [email, setEmail] = useInput("");
  const [password, setPassword] = useInput("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { token, error } = await loginUser({ email, password });
    if (token) {
      setToken(token);
    } else {
      setError(error);
    }
  };

  const handleGoogleLoginSuccess = (response) => {
    setToken(response.accessToken);
  };

  const handleGoogleLoginFailure = (response) => {
    console.log("response", response);
  };

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
              label="Password"
              type="password"
              onChange={setPassword}
              variant="outlined"
              fullWidth
              required
            />
          </div>
          <FormErrors text={error} />
          <div>
            <Button
              disabled={!email || !password || password.length < 6}
              variant="contained"
              type="submit"
              color="primary"
            >
              Login
            </Button>
          </div>
          <Link to="/account/reset-password" className={classes.link}>
            Forgot Password?
          </Link>
          <Typography component="p">
            Don't have an account?{" "}
            <Link to="/account/signup" className={classes.link}>
              Signup
            </Link>
          </Typography>
          <div className={classes.orText}>
            <Typography component="p">OR</Typography>
          </div>
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
    </div>
  );
};

export default Login;
