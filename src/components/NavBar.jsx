import styles from "./NavBar.module.css";
import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../auth/AuthenticationContext";

function NavBar(props) {
  let role = null;
  if (props.userDetails != null) {
    console.log(props.userDetails);
    role = props.userDetails.role;
    console.log(role);
  }

  var links = [
    {
      id: 1,
      path: "",
      text: "Home",
      accses: "REGULAR",
    },
    {
      id: 2,
      path: "/login",
      text: "Login",
      accses: "REGULAR",
    },
    {
      id: 2,
      path: "/register",
      text: "Register",
      accses: "REGULAR",
    },
  ];
  if (role !== null) {
    links = [
      {
        id: 1,
        path: "",
        text: "Home",
        accses: "REGULAR",
      },
      {
        id: 2,
        path: "/game",
        text: "Game",
        accses: "REGULAR",
      },
      {
        id: 3,
        path: "/profile",
        text: "Profile",
        accses: "REGULAR",
      },
      {
        id: 4,
        path: "/selectGame",
        text: "Select game",
        accses: "REGULAR",
      },
      {
        id: 5,
        path: "/admin",
        text: "Admin page",
        accses: "ADMIN",
      },
    ];
  }

  return (
    <nav className={styles.navBar}>
      <ul className={styles.nav}>
        {links.map((link) => {
          if (
            link.accses === "REGULAR" ||
            (role === "ADMIN" && link.accses === "ADMIN")
          ) {
            return (
              <li key={link.id}>
                <a className={styles.arrow}>
                  <i className="fas fa-arrow-alt-right {styles.arrow}"></i>

                  {
                    <NavLink className={"arrow"} to={link.path}>
                      {link.text}
                    </NavLink>
                  }
                </a>
              </li>
            );
          } /*else {
          }*/
        })}
      </ul>
    </nav>
  );
}

export default NavBar;
