import React from "react";
import { Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

const Logs = () => {
  return (
    <section className="logs">
      <div className="container">
        <Button
          variant="outlined"
          color="default"
          disableElevation
          startIcon={<AddIcon />}
          fullWidth
          color="primary"
        >
          ADD RECORD
        </Button>
      </div>
    </section>
  );
};
export default Logs;
