import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProfile } from "../../actions/profile";
const ViewProfile = ({ profile, user, getProfile }) => {
  useEffect(() => {
    getProfile();
  }, [getProfile]);
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-lg-8 card mt-5">
            <div
              className="card-header d-flex flex-row
                        justify-content-between "
            >
              <img
                src={user && user.gravatar}
                alt="profile"
                className="img img-thumbnail "
                style={{ width: "60px", height: "60px", borderRadius: "50%" }}
              />

              <h5>{user && user.name}</h5>

              <h5>{user && user.email}</h5>
            </div>

            <div className="card-content mt-3">
              <p>Id : {profile && profile._id}</p>
              <p>bio : {profile && profile.bio}</p>
              <p>location : {profile && profile.location}</p>
              <p>
                Interests : &nbsp;
                {profile &&
                  profile.interests.map((interest) => {
                    return <span key={interest}>{interest} </span>;
                  })}
              </p>
              <p>sent : {profile && profile.sent.length}</p>
              <p>received : {profile && profile.received.length}</p>
              <p>drafts : {profile && profile.drafts.length}</p>
            </div>

            <div className="card-footer">
              <div className="d-flex flex-row justify-content-between">
                <button className="btn btn-success btn-md" type="submit">
                  Edit Profile
                </button>
                <button className="btn btn-warning btn-md" type="submit">
                  Delete My Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

ViewProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  getProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile.profile,
  user: state.auth.user,
});

export default connect(mapStateToProps, { getProfile })(ViewProfile);
