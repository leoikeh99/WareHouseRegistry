import React, { useReducer } from "react";
import NavReducer from "./navReducer";
import NavContext from "./navContext";

import { SET_NAV } from "../types";

const NavState = (props) => {
  const initialState = {
    nav: "activity",
  };

  const [state, dispatch] = useReducer(NavReducer, initialState);

  const setNav = (val) => dispatch({ type: SET_NAV, payload: val });

  return (
    <NavContext.Provider
      value={{
        nav: state.nav,
        setNav,
      }}
    >
      {props.children}
    </NavContext.Provider>
  );
};
export default NavState;
