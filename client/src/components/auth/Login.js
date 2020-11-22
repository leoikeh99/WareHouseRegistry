import React, { useState, useContext, useEffect } from "react";
import { Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import styles from "../../styles";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import EmailIcon from "@material-ui/icons/Email";
import * as EmailValidator from "email-validator";
import authContext from "../../context/auth/authContext";
import Alert from "@material-ui/lab/Alert";

const Login = (props) => {
  const AuthContext = useContext(authContext);
  const { loader, error, auth, clearError, isAuthenticated } = AuthContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/");
    }
    if (error) {
      setTimeout(() => {
        clearError();
      }, 4000);
    }
  }, [error, isAuthenticated, props.history]);

  const classes = styles();

  const [validationError, setValidationError] = useState(false);
  const [values, setValues] = useState({
    email: "",
    password: "",
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const submit = (e) => {
    e.preventDefault();
    if (EmailValidator.validate(values.email)) {
      if (values.password.length !== 0) {
        setValidationError(null);
        const data = { email: values.email, password: values.password };
        auth(data, "login");
      } else {
        setValidationError({ type: "password", msg: "Password is required" });
      }
    } else {
      setValidationError({ type: "email", msg: "Invalid email" });
    }
  };

  return (
    <section className="auth">
      <div className="authContainer">
        <p className="bold">
          <i class="far fa-registered"></i> WAREHOUSE REGISTRY
        </p>
        <h2>Sign In</h2>
        {error === "Invalid username or password" && (
          <Alert className={classes.mb2} severity="error">
            {error}
          </Alert>
        )}
        <form onSubmit={submit} noValidate autoComplete="off">
          <TextField
            className={classes.mb2}
            error={
              validationError
                ? validationError.type === "email"
                  ? true
                  : false
                : false
            }
            helperText={
              validationError
                ? validationError.type === "email"
                  ? validationError.msg
                  : false
                : false
            }
            label="Email"
            variant="outlined"
            fullWidth
            size={"small"}
            required
            value={values.email}
            onChange={handleChange("email")}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <EmailIcon style={{ color: "grey" }} />
                </InputAdornment>
              ),
            }}
          />
          <FormControl
            variant="outlined"
            fullWidth
            className={classes.mb2}
            size={"small"}
          >
            <TextField
              id="outlined-adornment-password"
              type={values.showPassword ? "text" : "password"}
              value={values.password}
              required
              label="Password"
              variant="outlined"
              size={"small"}
              onChange={handleChange("password")}
              error={
                validationError
                  ? validationError.type === "password"
                    ? true
                    : false
                  : false
              }
              helperText={
                validationError
                  ? validationError.type === "password"
                    ? validationError.msg
                    : false
                  : false
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>

          <Button
            variant={"contained"}
            color={"primary"}
            fullWidth
            disableElevation
            startIcon={<ExitToAppIcon />}
            className={classes.mb1}
            type="submit"
          >
            Login
          </Button>
        </form>

        <p className="text-left ">
          Don't have an account? <span>sign up</span>
        </p>
      </div>
    </section>
  );
};

export default Login;
