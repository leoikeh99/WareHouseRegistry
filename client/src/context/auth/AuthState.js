import React, { useReducer } from "react";
import AuthReducer from "./authReducer";
import AuthContext from "./authContext";
import axios from "axios";
import setAuthToken from "../../functions/setAuthToken";

import {
  AUTH_FAIL,
  AUTH_SUCCESS,
  CLEAR_ERROR,
  LOAD_USER,
  SET_BUTTON_LOADER,
  USER_FAIL,
} from "../types";

const AuthState = (props) => {
  const initialState = {
    loader: true,
    error: null,
    token: localStorage.getItem("token"),
    user: null,
    isAuthenticated: null,
    buttonLoader: null,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const setButtonLoader = () => dispatch({ type: SET_BUTTON_LOADER });
  const clearError = () => dispatch({ type: CLEAR_ERROR });

  const auth = async (data, type) => {
    if (localStorage.getItem("token")) {
      setAuthToken(localStorage.getItem("token"));
    }

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      setButtonLoader();
      if (type === "register") {
        const res = await axios.post("/api/auth/register", data, config);
        dispatch({ type: AUTH_SUCCESS, payload: res.data });
      } else if (type === "login") {
        const res = await axios.post("/api/auth/login", data, config);
        dispatch({ type: AUTH_SUCCESS, payload: res.data });
      }
    } catch (err) {
      dispatch({ type: AUTH_FAIL, payload: err.response.data.msg });
      console.error(err);
    }
  };

  const loadUser = async () => {
    if (localStorage.getItem("token")) {
      setAuthToken(localStorage.getItem("token"));
    }
    try {
      const res = await axios.get("/api/users");
      dispatch({ type: LOAD_USER, payload: res.data });
    } catch (err) {
      console.error(err);
      dispatch({ type: USER_FAIL, payload: err.response.data.msg });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        loader: state.loader,
        error: state.error,
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        loadUser,
        clearError,
        auth,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
