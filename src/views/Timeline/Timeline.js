import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { getTimeline } from "../../services/api";
import { convertTimestampToDate } from "../../utils";
import {
  REQUEST_SENT,
  REQUEST_FINISHED,
  NOTIFY_USER,
  LOAD_TIMELINE,
} from "../../store/actions";

class Timeline extends React.Component {
  async componentWillMount() {
    const { selectedPet, timeline, history } = this.props;

    if (!selectedPet) return history.replace("/dashboard");

    if (timeline.length) return;

    await this.fetchTimeline();
  }

  async fetchTimeline() {
    const { dispatch, selectedPet } = this.props;
    const [, petId] = selectedPet.record.split("/");
    try {
      dispatch({ type: REQUEST_SENT });
      const response = await getTimeline(petId);
      dispatch({
        type: LOAD_TIMELINE,
        timeline: response.timeline,
        next: response.next,
      });
    } catch (e) {
      dispatch({
        type: NOTIFY_USER,
        notification: {
          type: "error",
          message: e.message,
        },
      });
    } finally {
      dispatch({ type: REQUEST_FINISHED });
    }
  }

  render() {
    const { loading, timeline } = this.props;

    const timelineCards = timeline.map((event, index) => {
      const [cardTitle] = event.record.split("/");
      return (
        <div className="flex flex-wrap border" key={index}>
          <div className="w-1/2 md:w-1/2 m-8 rounded overflow-hidden shadow-lg">
            <div className="flex w-full pr-2 pl-2 overflow-hidden  bg-orange-100">
              <div className="divide-y divide-gray-400 w-full">
                <div className="flex">
                  <div className="pl-5 pt-2 pr-2 ">
                    <i className="fas fa-syringe"></i>
                  </div>
                  <h1 className="pr-5 pt-2 pb-2 text-teal-800 font-bold uppercase">
                    {cardTitle === "pet" ? `ADDED PET` : cardTitle}
                  </h1>
                </div>

                <div className="flex flex-wrap w-full">
                  <div className="py-2 w-full sm:w-1/2 text-center sm:text-right pr-5  text-teal-800 font-bold">
                    NAME:
                  </div>
                  <div className="py-2 pl-1">
                    {event.name}
                    {event.cost !== undefined ? ` - $${event.cost}` : ""}
                  </div>
                </div>

                <div className="flex justify-between">
                  <div className="flex">
                    <h2 className="pl-5 pt-1  ">
                      {convertTimestampToDate(event.date)}
                    </h2>
                  </div>
                  <div className="flex">
                    <h2 className="pt-1 ">{event.location}</h2>
                    <div className="flex row pl-5 pr-5 pt-2 pb-2 ">
                      <i className="fas fa-map-pin"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });

    return (
      <React.Fragment>
        <div className="flex ">{timelineCards}</div>
      </React.Fragment>
    );
  }
}

Timeline.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  timeline: PropTypes.array,
  selectedPet: PropTypes.object,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  const { loading } = state.app;
  const { timeline } = state.timeline;
  const { selectedPet } = state.pets;
  return { loading, timeline, selectedPet };
}

export default connect(mapStateToProps)(withRouter(Timeline));
