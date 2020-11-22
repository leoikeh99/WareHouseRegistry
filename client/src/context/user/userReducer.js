import {
  GET_EMPLOYEES,
  ADD_EMPLOYEE,
  EDIT_EMPLOYEE,
  SET_LOADER,
  CLEAR_STATUS,
  DELETE_EMPLOYEE,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_EMPLOYEES:
      return {
        ...state,
        loader: null,
        employees: action.payload,
      };

    case ADD_EMPLOYEE:
      console.log(action.payload);
      return {
        ...state,
        loader: null,
        status: "Employee added succesfully",
        employees: [...state.employees, action.payload],
      };

    case EDIT_EMPLOYEE:
      return {
        ...state,
        loader: null,
        status: "Edited successfully",
        employees: state.employees.map((employee) =>
          employee._id === action.id ? action.payload : employee
        ),
      };

    case DELETE_EMPLOYEE:
      return {
        ...state,
        loader: null,
        status: action.payload,
        employees: state.employees.filter(
          (employee) => employee._id !== action.id
        ),
      };

    case SET_LOADER:
      return {
        ...state,
        loader: true,
      };

    case CLEAR_STATUS:
      return {
        ...state,
        status: null,
      };

    default:
      return state;
  }
};
