import {
  AUTH_FAIL,
  AUTH_SUCCESS,
  CLEAR_ERROR,
  SET_BUTTON_LOADER,
  LOAD_USER,
  USER_FAIL,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case SET_BUTTON_LOADER:
      return {
        ...state,
        buttonLoader: true,
      };

    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    case AUTH_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        token: action.payload.token,
        error: null,
        loader: null,
        isAuthenticated: true,
        buttonLoader: null,
      };
    case USER_FAIL:
    case AUTH_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        error: action.payload,
        loader: null,
        isAuthenticated: null,
        buttonLoader: null,
      };

    case LOAD_USER:
      return {
        ...state,
        user: action.payload,
        error: null,
        loader: null,
        isAuthenticated: true,
      };

    default:
      return state;
  }
};
