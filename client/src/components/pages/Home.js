import React, { useContext, useEffect } from "react";
import authContext from "../../context/auth/authContext";
import userContext from "../../context/user/userContext";
import navContext from "../../context/nav/navContext";
import SideNav from "../../components/nav/SideNav";
import Dashboard from "../../components/main/Dashboard";
import Activity from "../../components/main/Activity";
import Statistics from "../../components/main/Statistics";

const Home = (props) => {
  const AuthContext = useContext(authContext);
  const { user, loadUser, isAuthenticated, loader } = AuthContext;

  const UserContext = useContext(userContext);
  const { getEmployees } = UserContext;

  const NavContext = useContext(navContext);
  const { nav } = NavContext;

  useEffect(() => {
    loadUser();
  }, [isAuthenticated, props.history]);

  useEffect(() => {
    if (user) {
      getEmployees();
    }
  }, [user]);

  return !loader ? (
    <section className="home">
      <div className="overlay"></div>
      <div className="nav">
        <SideNav />
      </div>
      <div className="main">
        {nav === "dashboard" ? (
          <Dashboard />
        ) : nav === "activity" ? (
          <Activity />
        ) : nav === "stats" ? (
          <Statistics />
        ) : null}
      </div>
    </section>
  ) : (
    <div>loading...</div>
  );
};
export default Home;
