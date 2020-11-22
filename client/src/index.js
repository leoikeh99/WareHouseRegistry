import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#0E6BA8",
    },
    secondary: {
      main: "#f38181",
    },
  },
  typography: {
    fontFamily: "Itim",
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
