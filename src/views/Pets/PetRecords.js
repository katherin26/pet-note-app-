import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, NavLink, Switch } from "react-router-dom";
import PrivateRoute from "../../components/Router/PrivateRoute";
import PetProfile from "../../components/Pets/PetProfile";
import PetForm from "../../components/Pets/PetForm";
import Vaccinations from "../Vaccinations/Vaccionations";
import Procedures from "../Procedures/Procedures";
import Grooming from "../Grooming/Grooming";
import PetNotes from "../PetNotes/PetNotes";
import Timeline from "../Timeline/Timeline";
import { updatePet } from "../../services/api";
import {
  REQUEST_SENT,
  REQUEST_FINISHED,
  NOTIFY_USER,
  UPDATED_PET,
} from "../../store/actions";

class PetRecords extends React.Component {
  componentWillMount() {
    const { selectedPet, history } = this.props;

    if (!selectedPet) history.replace("/dashboard");
  }

  async handlePetUpdate(pet) {
    const [, petId] = pet.record.split("/");
    const { history, dispatch } = this.props;

    try {
      dispatch({ type: REQUEST_SENT });
      await updatePet(petId, pet);
      dispatch({ type: UPDATED_PET, pet });
      dispatch({
        type: NOTIFY_USER,
        notification: {
          type: "error",
          message: "Pet was successfully updated",
        },
      });
      history.replace("/pet/records/profile");
    } catch (e) {
      dispatch({
        type: NOTIFY_USER,
        notification: {
          type: "error",
          message:
            e.response && e.response.status === 422
              ? `${e.response.data.errors[0].param} ${e.response.data.errors[0].msg}`
              : e.message,
        },
      });
    } finally {
      dispatch({ type: REQUEST_FINISHED });
    }
  }

  render() {
    const { loading, user, selectedPet } = this.props;

    return (
      <div className="mt-5">
        <ul className="flex border-b-2 text-teal-800 overflow-y-auto">
          <li className="mr-1">
            <NavLink
              className="bg-white inline-block border border-gray-400 rounded-t-lg px-4 py-2 font-bold"
              activeClassName="bg-teal-500 text-white shadow-md"
              to="/pet/records/profile"
              style={{ minWidth: "135px" }}
            >
              Pet Profile
            </NavLink>
          </li>
          <li className="mr-1">
            <NavLink
              className="bg-white inline-block border border-gray-400 rounded-t-lg px-4 py-2 font-bold"
              activeClassName="bg-teal-500 text-white shadow-md"
              to="/pet/records/vaccinations"
            >
              Vaccinations
            </NavLink>
          </li>
          <li className="mr-1">
            <NavLink
              className="bg-white inline-block border border-gray-400 rounded-t-lg px-4 py-2 font-bold"
              activeClassName="bg-teal-500 text-white shadow-md"
              to="/pet/records/procedures"
            >
              Procedures
            </NavLink>
          </li>
          <li className="mr-1">
            <NavLink
              className="bg-white inline-block border border-gray-400 rounded-t-lg px-4 py-2 font-bold"
              activeClassName="bg-teal-500 text-white shadow-md"
              to="/pet/records/grooming"
            >
              Grooming
            </NavLink>
          </li>
          <li className="mr-1">
            <NavLink
              className="bg-white inline-block border border-gray-400 rounded-t-lg px-4 py-2 font-bold"
              activeClassName="bg-teal-500 text-white shadow-md"
              to="/pet/records/petnotes"
              style={{ minWidth: "135px" }}
            >
              Pet-Notes
            </NavLink>
          </li>
          <li className="mr-1">
            <NavLink
              className="bg-white inline-block border border-gray-400 rounded-t-lg px-4 py-2 font-bold"
              activeClassName="bg-teal-500 text-white shadow-md"
              to="/pet/records/timeline"
            >
              Timeline
            </NavLink>
          </li>
        </ul>
        <Switch>
          <PrivateRoute path="/pet/records/profile/update">
            {selectedPet ? (
              <PetForm
                pet={selectedPet}
                formHandler={this.handlePetUpdate.bind(this)}
                loading={loading}
              />
            ) : (
              ""
            )}
          </PrivateRoute>
          <PrivateRoute path="/pet/records/profile">
            {selectedPet ? <PetProfile pet={selectedPet} /> : ""}
          </PrivateRoute>
          <PrivateRoute path="/pet/records/vaccinations">
            <Vaccinations />
          </PrivateRoute>
          <PrivateRoute path="/pet/records/procedures">
            <Procedures />
          </PrivateRoute>
          <PrivateRoute path="/pet/records/grooming">
            <Grooming />
          </PrivateRoute>
          <PrivateRoute path="/pet/records/petnotes">
            <PetNotes />
          </PrivateRoute>
          <PrivateRoute path="/pet/records/timeline">
            <Timeline />
          </PrivateRoute>
        </Switch>
      </div>
    );
  }
}

PetRecords.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  user: PropTypes.object,
  selectedPet: PropTypes.object,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  const { loading, user } = state.app;
  const { selectedPet } = state.pets;
  return { loading, user, selectedPet };
}

export default connect(mapStateToProps)(withRouter(PetRecords));
