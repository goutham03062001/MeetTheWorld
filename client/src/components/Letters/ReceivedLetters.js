import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProfile } from "../../actions/profile";
const ReceivedLetters = ({ profile: { profile }, getProfile }) => {
  useEffect(() => {
    getProfile();
  }, [getProfile]);

  const [decline, setDecline] = useState("");
  const [declineReason, setDeclineReason] = useState("");
  const [accept, setAccept] = useState(false);
  const [acceptedId, setAcceptedId] = useState('');
  const onClick = (id, reason) => {
    setDecline(id);
    console.log("clicked on profile : ", id);
  };

  const onAcceptClick = (id,user,letter) => {
    setAccept(!accept);
    console.log("accepted", accept);
    setAcceptedId(id);
    console.log("accepted letter id : ", id);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    console.log("reason : ", declineReason);
    setDeclineReason("");
  };

  return (
    <div className="container">
      <div className="row">
        {profile &&
          profile.received.map((letter) => {
            return (
              <>
                <div className="col-lg-8 mt-5">
                  <div className="card">
                    <div className="card-header">From : {letter.user}</div>
                    <div className="card-body">
                      <div className="card-content">{letter.letter}</div>
                    </div>
                    <div className="card-footer">
                      <div className="d-flex flex-row justify-content-between">
                        <button
                          className="btn btn-md btn-success px-5"
                          data-toggle="modal"
                          data-target="#accept"
                          onClick={(e) => {
                            onAcceptClick(letter._id,letter.user,letter.letter);
                          }}
                        >
                          accept
                        </button>
                        <button
                          className="btn btn-md btn-danger px-5"
                          data-toggle="modal"
                          data-target="#decline"
                          onClick={() => {
                            onClick(letter.user);
                          }}
                        >
                          decline
                        </button>

                        <br />
                      </div>
                      <div
                        class="modal fade"
                        id="decline"
                        tabindex="-1"
                        role="dialog"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                      >
                        <form
                          onSubmit={(e) => {
                            onSubmit(e);
                          }}
                        >
                          <div class="modal-dialog" role="document">
                            <div class="modal-content">
                              <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">
                                  From : {decline}
                                </h5>
                                <button
                                  type="button"
                                  class="close"
                                  data-dismiss="modal"
                                  aria-label="Close"
                                >
                                  <span aria-hidden="true">&times;</span>
                                </button>
                              </div>
                              <div class="modal-body">
                                <p>Please write some reason to decline.</p>

                                <input
                                  type="text"
                                  className="form-control"
                                  name="reason"
                                  onChange={(e) => {
                                    setDeclineReason(e.target.value);
                                  }}
                                />
                              </div>
                              <div class="modal-footer">
                                <button
                                  type="button"
                                  class="btn btn-secondary"
                                  data-dismiss="modal"
                                >
                                  Close
                                </button>
                                <button type="submit" class="btn btn-primary">
                                  Submit
                                </button>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
              </>
            );
          })}
      </div>
      <hr />
      
    </div>
  );
};

ReceivedLetters.propTypes = {
  profile: PropTypes.object.isRequired,
  getProfile: PropTypes.func.isRequired,
};
  
const mapStateToProps = (state) => ({
  profile: state.profile,
});
export default connect(mapStateToProps, { getProfile })(ReceivedLetters);
