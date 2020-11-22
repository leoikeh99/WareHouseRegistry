import React, { useContext, useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import AddEmployee from "./AddEmployee";
import EditEmployee from "./EditEmployee";
import DeleteEmployee from "./DeleteEmployee";
import userContext from "../../../../context/user/userContext";

const Employees = () => {
  const [action, setAction] = useState(null);
  const [details, setDetails] = useState(null);
  const UserContext = useContext(userContext);
  const { employees, deleteEmployee } = UserContext;

  useEffect(() => {
    const overlay = document.querySelector(".home .overlay");
    const body = document.querySelector("body");
    if (action) {
      overlay.style.display = "block";
      body.style.overflowY = "hidden";
    } else {
      overlay.style.display = "none";
      body.style.overflowY = "scroll";
    }
  }, [action]);

  return (
    <section className="employees">
      <div className="alert"></div>
      <div className="container">
        <div className="popUp">
          {action && action === "add" ? (
            <AddEmployee setAction={setAction} />
          ) : action === "edit" ? (
            <EditEmployee details={details} setAction={setAction} />
          ) : action === "delete" ? (
            <DeleteEmployee details={details} setAction={setAction} />
          ) : null}
        </div>
        <Button
          variant="outlined"
          color="default"
          disableElevation
          startIcon={<AddIcon />}
          fullWidth
          color="primary"
          onClick={() => {
            setAction("add");
          }}
        >
          ADD EMPLOYEE
        </Button>
        <div className="mb-2"></div>
        {employees.length !== 0 ? (
          <div className="grid-1">
            {employees.map((employee) => (
              <div className="list">
                <div className="name">{employee.employeeName}</div>
                <div className="actions">
                  <i
                    onClick={() => {
                      setAction("edit");
                      setDetails({
                        id: employee._id,
                        name: employee.employeeName,
                      });
                    }}
                    class="color-primary fas fa-edit"
                  ></i>
                  <i
                    onClick={() => {
                      setAction("delete");
                      setDetails({
                        id: employee._id,
                        name: employee.employeeName,
                      });
                    }}
                    class="color-danger fas fa-trash"
                  ></i>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center color-text">
            No employees have been added.
          </div>
        )}
      </div>
    </section>
  );
};
export default Employees;
