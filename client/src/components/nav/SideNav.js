import React, { useContext } from "react";
import navContext from "../../context/nav/navContext";

const SideNav = () => {
  const NavContext = useContext(navContext);
  const { nav, setNav } = NavContext;

  return (
    <section className="sideNav">
      <h1>
        <i className="far fa-registered"></i>
        <br />
        WAREHOUSE
        <br />
        REGISTRY
      </h1>
      <hr />
      <ul>
        <li
          onClick={() => setNav("dashboard")}
          className={nav === "dashboard" ? "active" : null}
        >
          <i className="fas fa-home"></i> DASHBOARD
        </li>
        <li
          onClick={() => setNav("activity")}
          className={nav === "activity" ? "active" : null}
        >
          <i className="fas fa-list"></i> ACTIVITY
        </li>
        <li
          onClick={() => setNav("stats")}
          className={nav === "stats" ? "active" : null}
        >
          <i className="fas fa-chart-line"></i> STATISTICS
        </li>
      </ul>
      <hr />
      <ul>
        <li
          onClick={() => setNav("about")}
          className={nav === "about" ? "active" : null}
        >
          <i className="fas fa-book-open"></i> ABOUT
        </li>
        <li className="logout">
          <i className="fas fa-power-off"></i> LOGOUT
        </li>
      </ul>
    </section>
  );
};

export default SideNav;
