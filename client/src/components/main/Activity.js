import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Logs from "./activity/logs/Logs";
import Employees from "./activity/employee/Employees";
import Products from "./activity/products/Products";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    boxShadow: "0px 0px 0px 0px",
    background: "transparent",
  },
});

const Activity = () => {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <section className="activity">
      <Paper className={classes.root}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="LOGS" />
          <Tab label="EMPLOYEES" />
          <Tab label="PRODUCTS" />
        </Tabs>
      </Paper>
      <div className="view">
        {value === 0 ? (
          <Logs />
        ) : value === 1 ? (
          <Employees />
        ) : value === 2 ? (
          <Products />
        ) : null}
      </div>
    </section>
  );
};
export default Activity;
