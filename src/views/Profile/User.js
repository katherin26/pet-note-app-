import React from "react";
import "./User.css";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, Link, Switch, Route } from "react-router-dom";
import PrivateRoute from "../../components/Router/PrivateRoute";
import UpdateInformation from "./UpdateInformation";
import ChangePassword from "./ChangePassword";
import {
  REQUEST_SENT,
  REQUEST_FINISHED,
  NOTIFY_USER,
} from "../../store/actions";

class User extends React.Component {
  render() {
    const { loading, user, location, match } = this.props;
    return (
      <React.Fragment>
        <div className="flex justify-center items-center w-full h-full mt-1">
          <div className="w-3/4 sm:w-full md:w-2/4 lg:3/4 rounded overflow-hidden shadow-lg ">
            <h1 className="block uppercase tracking-wide text-teal-800 font-bold text-center p-2">
              PROFILE
            </h1>

            <div className="border-t-2 border-gray-300 pt-5 ">
              <div className="w-full flex flex-wrap w-full justify-center items-center">
                <div className="flex-col">
                  <img
                    className=" w-1/3  mx-auto  border shadow-md rounded-full"
                    src="https://media1.tenor.com/images/a403ab437cabe6b1d988cd7a74ffa046/tenor.gif?itemid=14477191"
                  />
                </div>

                <div className="flex w-full p-1 overflow-hidden  ">
                  <div className="divide-y divide-gray-400 w-full">
                    <div className="flex flex-wrap w-full">
                      <div className="py-2 sm:pr-5 w-full sm:w-1/2 text-center sm:text-right text-teal-800 font-bold">
                        First Name:
                      </div>
                      <div className="py-2 sm:pl-5 w-full sm:w-1/2 text-center sm:text-left">
                        {user.attributes.given_name}
                      </div>
                    </div>
                    <div className="flex flex-wrap w-full">
                      <div className="py-2 sm:pr-5 w-full sm:w-1/2 text-center sm:text-right  text-teal-800 font-bold">
                        Last Name:
                      </div>
                      <div className="py-2 sm:pl-5 w-full sm:w-1/2 text-center sm:text-left">
                        {user.attributes.family_name}
                      </div>
                    </div>
                    <div className="flex flex-wrap w-full">
                      <div className="py-2 sm:pr-5 w-full sm:w-1/2 text-center sm:text-right text-teal-800 font-bold">
                        Email:
                      </div>
                      <div className="py-2 sm:pl-5 w-full sm:w-1/2 text-center sm:text-left">
                        {user.attributes.email}
                      </div>
                    </div>
                    <div className="flex">
                      <div className="py-2 w-1/2 text-right pr-5  text-teal-800 font-bold">
                        {" "}
                        <Link
                          className="tooltip mt-2 mr-2 bg-orange-400 hover:bg-orange-500  text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline"
                          type="button"
                          to={`${match.url}/update-information`}
                        >
                          <span className="tooltiptext">
                            Update Information
                          </span>
                          <i className="fas fa-user-edit"></i>
                        </Link>
                      </div>
                      <div className="py-2 pl-5">
                        {" "}
                        <Link
                          className="tooltip mt-2 bg-orange-400 hover:bg-orange-500 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline"
                          type="button"
                          to={`${match.url}/change-password`}
                        >
                          <span className="tooltiptext">Change Password</span>
                          <i className="fas fa-user-lock"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Switch>
          <PrivateRoute path={`${match.path}/update-information`}>
            <UpdateInformation />
          </PrivateRoute>
          <PrivateRoute path={`${match.path}/change-password`}>
            <ChangePassword />
          </PrivateRoute>
        </Switch>
      </React.Fragment>
    );
  }
}

User.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  user: PropTypes.object,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  const { loading, user } = state.app;
  return { loading, user };
}

export default connect(mapStateToProps)(withRouter(User));
