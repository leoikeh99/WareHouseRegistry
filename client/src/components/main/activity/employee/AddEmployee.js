import React, { Fragment, useState, useContext, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AddIcon from "@material-ui/icons/Add";
import { Button } from "@material-ui/core";
import styles from "../../../../styles";
import userContext from "../../../../context/user/userContext";
import Spinner from "../../../layout/Spinner";
import Alert from "@material-ui/lab/Alert";

const AddEmployee = ({ setAction }) => {
  const UserContext = useContext(userContext);
  const { addEmployee, loader, status, clearStatus } = UserContext;

  const [employeeName, setEmployeeName] = useState("");
  const classes = styles();

  useEffect(() => {
    if (status) {
      setTimeout(() => {
        clearStatus();
      }, 2000);
    }
  }, [status]);

  const submit = (e) => {
    e.preventDefault();
    if (employeeName !== "") {
      addEmployee(employeeName);
    }
  };

  return (
    <Fragment>
      <div className="cover">
        <h4>ADD AN EMPLOYEE</h4>
        <i
          onClick={() => {
            setAction(null);
            clearStatus();
          }}
          class="fas fa-times"
        ></i>

        <form onSubmit={submit}>
          <TextField
            label={"EmployeeName"}
            variant="outlined"
            fullWidth
            size={"small"}
            value={employeeName}
            className={classes.mb2}
            onChange={(e) => setEmployeeName(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <AccountCircleIcon style={{ color: "grey" }} />
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant={"contained"}
            color={"primary"}
            fullWidth
            disableElevation
            startIcon={<AddIcon />}
            type="submit"
          >
            ADD
          </Button>
        </form>
        {loader ? (
          <Spinner />
        ) : status ? (
          <Alert className={classes.mt1} severity={"success"}>
            {status}
          </Alert>
        ) : null}
      </div>
    </Fragment>
  );
};
export default AddEmployee;
