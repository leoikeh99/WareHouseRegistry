import React, { useReducer } from "react";
import UserReducer from "./userReducer";
import UserContext from "./userContext";
import setAuthToken from "../../functions/setAuthToken";
import axios from "axios";
import {
  ADD_EMPLOYEE,
  EDIT_EMPLOYEE,
  GET_EMPLOYEES,
  SET_LOADER,
  CLEAR_STATUS,
  DELETE_EMPLOYEE,
} from "../types";

export const UserState = (props) => {
  const initialState = {
    employees: [],
    loader: null,
    error: null,
    status: null,
  };

  const [state, dispatch] = useReducer(UserReducer, initialState);

  const setLoader = () => dispatch({ type: SET_LOADER });
  const clearStatus = () => dispatch({ type: CLEAR_STATUS });

  //   add employee
  const addEmployee = async (employeeName) => {
    if (localStorage.getItem("token")) {
      setAuthToken(localStorage.getItem("token"));
    }

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      setLoader();
      const res = await axios.post("/api/employee", { employeeName }, config);
      dispatch({ type: ADD_EMPLOYEE, payload: res.data, employeeName });
    } catch (err) {
      console.error(err);
    }
  };

  //   get employees
  const getEmployees = async () => {
    if (localStorage.getItem("token")) {
      setAuthToken(localStorage.getItem("token"));
    }
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      setLoader();
      const res = await axios.get("/api/employee");
      dispatch({ type: GET_EMPLOYEES, payload: res.data });
    } catch (err) {
      console.error(err);
    }
  };

  // edit an employee/
  const editEmployee = async (id, newName) => {
    if (localStorage.getItem("token")) {
      setAuthToken(localStorage.getItem("token"));
    }

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      setLoader();
      const res = await axios.put(`/api/employee/${id}`, { newName }, config);
      dispatch({
        type: EDIT_EMPLOYEE,
        payload: res.data.update,
        newName,
        id,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const deleteEmployee = async (id) => {
    if (localStorage.getItem("token")) {
      setAuthToken(localStorage.getItem("token"));
    }
    try {
      setLoader();
      const res = await axios.delete(`/api/employee/${id}`);
      dispatch({ type: DELETE_EMPLOYEE, payload: res.data.msg, id });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <UserContext.Provider
      value={{
        employees: state.employees,
        status: state.status,
        loader: state.loader,
        addEmployee,
        getEmployees,
        editEmployee,
        clearStatus,
        deleteEmployee,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
