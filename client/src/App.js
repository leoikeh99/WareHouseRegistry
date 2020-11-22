import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./css/main.css";
import AuthState from "./context/auth/AuthState";
import NavState from "./context/nav/NavState";
import UserState from "./context/user/UserState";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Home from "./components/pages/Home";
import PrivateRoutes from "./components/routing/PrivateRoutes";

function App() {
  return (
    <AuthState>
      <UserState>
        <NavState>
          <Router>
            <Switch>
              <PrivateRoutes exact path="/" component={Home} />
              <Route exact path={"/login"} component={Login} />
              <Route exact path={"/register"} component={Register} />
            </Switch>
          </Router>
        </NavState>
      </UserState>
    </AuthState>
  );
}

export default App;
