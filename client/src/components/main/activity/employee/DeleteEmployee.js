import React, { Fragment, useContext, useEffect } from "react";
import userContext from "../../../../context/user/userContext";
import { Button } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import Spinner from "../../../layout/Spinner";
import Alert from "@material-ui/lab/Alert";
import styles from "../../../../styles";

const DeleteEmployee = ({ details, setAction }) => {
  const UserContext = useContext(userContext);
  const { deleteEmployee, loader, status, clearStatus } = UserContext;

  const classes = styles();

  useEffect(() => {
    if (status) {
      setTimeout(() => {
        clearStatus();
        setAction(null);
      }, 2000);
    }
  }, [status]);

  return (
    <Fragment>
      <div className="cover">
        <h4>{`Delete ${details.name}?`}</h4>
        <i
          onClick={() => {
            setAction(null);
            clearStatus();
          }}
          class="fas fa-times"
        ></i>

        {!status ? (
          <Button
            variant="contained"
            color="primary"
            startIcon={<DeleteIcon />}
            onClick={() => deleteEmployee(details.id)}
            fullWidth
          >
            CONFIRM
          </Button>
        ) : (
          <Alert severity={"success"}>{status}</Alert>
        )}

        {loader && <Spinner />}
      </div>
    </Fragment>
  );
};

export default DeleteEmployee;
