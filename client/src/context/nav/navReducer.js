import { SET_NAV } from "../types";

export default (state, action) => {
  switch (action.type) {
    case SET_NAV:
      return {
        ...state,
        nav: action.payload,
      };
    default:
      return state;
  }
};
