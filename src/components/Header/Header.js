import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logOut } from "../../services/auth";
import { Link, useHistory } from "react-router-dom";
import "./Header.css";
import {
  LOGOUT,
  REQUEST_SENT,
  REQUEST_FINISHED,
  NOTIFY_USER,
} from "../../store/actions";

function Header({ dispatch, user }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [hamburgerMenu, setHamburgerMenu] = useState(false);
  const history = useHistory();
  let headerClasses = "flex items-center justify-between flex-wrap ";
  headerClasses += !user ? "bg-transparent p-6" : "bg-teal-600 p-2";
  let menuClasses =
    "w-full lg:block flex-grow lg:flex lg:items-center lg:w-auto";

  if (!hamburgerMenu) menuClasses += " hidden";

  const logOutClickHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: REQUEST_SENT });
      await logOut();
      dispatch({ type: LOGOUT });
      setShowDropdown(false);
      history.replace("/login");
    } catch (e) {
      dispatch({
        type: NOTIFY_USER,
        notification: { type: "error", message: e.message },
      });
    } finally {
      dispatch({ type: REQUEST_FINISHED });
    }
  };

  return (
    <nav className={headerClasses}>
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <img
          className="fill-current h-10 w-10 mr-2"
          src="https://austinbluffsanimalclinic.com/wp-content/uploads/2019/04/3289786-256.png"
          alt="Hello"
        ></img>
        <span className="font-semibold text-xl tracking-tight">Pet-Note</span>
      </div>
      <div className="block lg:hidden">
        <button
          onClick={() => setHamburgerMenu(!hamburgerMenu)}
          className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
        >
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div className={menuClasses}>
        <div className="text-sm lg:flex-grow">
          {!user ? (
            <Link
              className="block mt-4 mx-2 lg:inline-block lg:mt-0 text-teal-200 hover:text-white"
              to="/"
              onClick={() => setHamburgerMenu(false)}
            >
              Home
            </Link>
          ) : (
            ""
          )}
          {!user ? (
            <Link
              className="block mt-4 mx-2 lg:inline-block lg:mt-0 text-teal-200 hover:text-white"
              to="/about"
              onClick={() => setHamburgerMenu(false)}
            >
              About
            </Link>
          ) : (
            ""
          )}
        </div>
        {!user ? (
          <div className="mx-2">
            <Link
              className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0 font-semibold"
              to="/signup"
              onClick={() => setHamburgerMenu(false)}
            >
              Sign up
            </Link>
          </div>
        ) : (
          ""
        )}
        {!user ? (
          <div className="mx-2">
            <Link
              className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0 font-semibold"
              to="/login"
              onClick={() => setHamburgerMenu(false)}
            >
              Login
            </Link>
          </div>
        ) : (
          ""
        )}

        {user ? (
          <div className="mx-2">
            <Link
              className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0 font-semibold"
              to="/dashboard"
              onClick={() => setHamburgerMenu(false)}
            >
              Dashboard
            </Link>
          </div>
        ) : (
          ""
        )}

        {user ? (
          <div className="mx-2">
            <Link
              className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0 font-semibold"
              to="/pet/add"
              onClick={() => setHamburgerMenu(false)}
            >
              Add Pet
            </Link>
          </div>
        ) : (
          ""
        )}

        {user ? (
          <div className="mx-2">
            <div
              className="dropdown inline-block relative"
              onMouseLeave={() => setShowDropdown(false)}
            >
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0 font-semibold inline-flex items-center"
              >
                <span className="mr-1">{user.attributes.given_name}</span>
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />{" "}
                </svg>
              </button>
              {showDropdown ? (
                <ul className="dropdown-menu absolute text-gray-700 pt-1 right-0 w-full">
                  <li onClick={() => setHamburgerMenu(false)}>
                    <Link
                      onClick={() => setShowDropdown(false)}
                      className="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                      to="/profile"
                    >
                      Profile
                    </Link>
                  </li>
                  <li onClick={() => setHamburgerMenu(false)}>
                    <a
                      onClick={logOutClickHandler}
                      className="rounded-b bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap cursor-pointer"
                    >
                      Logout
                    </a>
                  </li>
                </ul>
              ) : (
                ""
              )}
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </nav>
  );
}

Header.propTypes = {
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.object,
};

function mapStateToProps(state) {
  const { user } = state.app;
  return { user };
}

export default connect(mapStateToProps)(Header);
