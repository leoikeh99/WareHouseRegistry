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
import BusinessIcon from "@material-ui/icons/Business";
import * as EmailValidator from "email-validator";
import authContext from "../../context/auth/authContext";
import Alert from "@material-ui/lab/Alert";

const Register = (props) => {
  const AuthContext = useContext(authContext);
  const { isAuthenticated, error, auth, clearError } = AuthContext;

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
    companyName: "",
    password: "",
    confirmPassword: "",
    showPassword: false,
    showConfirmPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleClickShowConfirmPassword = () => {
    setValues({ ...values, showConfirmPassword: !values.showConfirmPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseDownConfirmPassword = (event) => {
    event.preventDefault();
  };

  const submit = (e) => {
    e.preventDefault();

    //validate email
    if (EmailValidator.validate(values.email)) {
      //validate password length
      if (values.password.trim().length >= 6) {
        //check if passwords match
        if (values.password === values.confirmPassword) {
          //company name required
          if (values.companyName.trim().length !== 0) {
            setValidationError(null);
            const data = {
              email: values.email,
              companyName: values.companyName,
              password: values.password,
            };
            auth(data, "register");
          } else {
            setValidationError({
              type: "companyName",
              msg: "Company Name is required",
            });
          }
        } else {
          setValidationError({
            type: "passwords",
            msg: "Passwords do not match",
          });
        }
      } else {
        setValidationError({
          type: "password",
          msg: "Password should be at least 6 characters",
        });
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
        <h2>Sign Up</h2>
        {error && (
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
            required
            variant="outlined"
            fullWidth
            size={"small"}
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

          <TextField
            className={classes.mb2}
            error={
              validationError
                ? validationError.type === "companyName"
                  ? true
                  : false
                : false
            }
            helperText={
              validationError
                ? validationError.type === "companyName"
                  ? validationError.msg
                  : false
                : false
            }
            required
            label="Company Name"
            variant="outlined"
            fullWidth
            size={"small"}
            value={values.companyName}
            onChange={handleChange("companyName")}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <BusinessIcon style={{ color: "grey" }} />
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
              variant="outlined"
              required
              size={"small"}
              label="Password"
              type={values.showPassword ? "text" : "password"}
              value={values.password}
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
              labelWidth={70}
            />
          </FormControl>

          <FormControl
            variant="outlined"
            fullWidth
            className={classes.mb2}
            size={"small"}
          >
            <TextField
              id="outlined-adornment-password"
              variant="outlined"
              required
              size={"small"}
              label="Confirm Password"
              error={
                validationError
                  ? validationError.type === "passwords"
                    ? true
                    : false
                  : false
              }
              helperText={
                validationError
                  ? validationError.type === "passwords"
                    ? validationError.msg
                    : false
                  : false
              }
              type={values.showConfirmPassword ? "text" : "password"}
              value={values.confirmPassword}
              onChange={handleChange("confirmPassword")}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowConfirmPassword}
                      onMouseDown={handleMouseDownConfirmPassword}
                      edge="end"
                    >
                      {values.showConfirmPassword ? (
                        <Visibility />
                      ) : (
                        <VisibilityOff />
                      )}
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
            Sign up
          </Button>
        </form>

        <p className="text-left ">
          Already have an account? <span>sign in</span>
        </p>
      </div>
    </section>
  );
};

export default Register;
