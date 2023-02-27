import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";
import Logo from "./rare.jpeg";

// Creates and exports NavBar component
// uses Props in the argument defined in Rare.js
export const NavBar = ({ token, setToken }) => {
  //defines navigate variable to use useNavigate hook
  const navigate = useNavigate();
  /*
  •useRefs() hooks are used to reference previous state 
  •Defines variable where useRef is set to an initial value of null
  */
  const navbar = useRef();
  /*
  the mobile icon used for opening a menu
  hidden until user adjusts width
  */
  const hamburger = useRef();
  /*
  •Toggles mobile hamburger icon to active and opens on click (JSX)
  */
  const showMobileNavbar = () => {
    hamburger.current.classList.toggle("is-active");
    navbar.current.classList.toggle("is-active");
  };
  return (
    <nav
      className="navbar"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <a className="navbar-item" href="/">
          {/* <img src={Logo} height="3rem" alt="Rare Logo" />{" "} */}
          <h1 class="title is-3" className="rareHeader">Rare Publishing</h1>
        </a>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a
          role="button"
          className="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExamplef"
          onClick={showMobileNavbar}
          ref={hamburger}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div className="navbar-menu" ref={navbar}>
        <div className="navbar-start">
          {
            // This ternary statement checks to ensure the current user is logged in
            // If true, a link will appear in the nav bar that links to path "/" when clicked
            token ? 
            (<>
                <Link to="/posts" className="navbar-item ">
                  Posts          
                </Link> 
                <span className="padding">/</span>
                <Link to="posts/myposts" className="navbar-item">
                  My Posts
                </Link>
                <span className="padding">/</span>
                <Link to="/categories" className="navbar-item">
                  Category Manager
                </Link>
                <span className="padding">/</span>
                <Link to="/tags" className="navbar-item">
                  Tag Manager
                </Link>
                <span className="padding">/</span>
                <Link to="/users" className="navbar-item">
                  User Management
                </Link>
              </>
            ) : (
              ""
            )
          }
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              {
                // This ternary statement checks if the current user is logged in
                // If true, a logout button will appear and will route back to the "/login" path when clicked
                token ? (
                  <button
                    className="button is-rounded"
                    onClick={() => {
                      setToken("");
                      navigate("/login");
                    }}
                  >
                    Logout
                  </button>
                ) : (
                  <>
                    <Link to="/register" className="button is-rounded is-link">
                      Register
                    </Link>
                    <Link to="/login" className="button is-rounded is-outlined">
                      Login
                    </Link>
                  </>
                )
              }
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
