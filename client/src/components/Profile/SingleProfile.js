import React, { useEffect } from "react";
import PlaceIcon from '@mui/icons-material/Place';
import FemaleIcon from '@mui/icons-material/Female';
import InfoIcon from '@mui/icons-material/Info';
import InterestsIcon from '@mui/icons-material/Interests';
import CallReceivedIcon from '@mui/icons-material/CallReceived';
import SendIcon from '@mui/icons-material/Send';
import { Link, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProfileById } from "../../actions/profile";
const SingleProfile = ({ profile: { profile }, getProfileById }) => {
  let { id } = useParams();
  let profileId = id.toString();
  console.log("Your profile id : ", profileId);
  useEffect(() => {
    getProfileById(profileId);
  }, [getProfileById, profileId]);
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-lg-6 mt-5">
            <div className="card">
              <div className="card-header">
                <p className="text">Name : {profile && profile.user}</p>
              </div>

              <div className="card-body">
                <p className="text"> <PlaceIcon style={{height:"18px"}}/> &nbsp; Location   : {profile && profile.location}</p>
                <p className="text"> <FemaleIcon style={{height:"18px"}}/> &nbsp; Gender : {profile && profile.gender}</p>
                <p className="text"> <InfoIcon style={{height:"18px"}}/> &nbsp; Bio : {profile && profile.bio}</p>
                <p className="text">
                  <InterestsIcon style={{height:"18px"}}/> &nbsp;Interests :{" "}
                  {profile &&
                    profile.interests.map((interest) => {
                      return (
                        <>
                          {interest} {","}
                        </>
                      );
                    })}
                </p>
                <p className="text">
                 <CallReceivedIcon style={{height:"18px"}}/> received :{profile && profile.received.length}
                </p>
                <p className="text">
                  <SendIcon style={{height:"18px"}}/> &nbsp; sent :{profile && profile.sent.length}</p>

                
                  <button className="btn btn-warning btn-md px-5  mt-3"
                  style={{marginRight : 0,
                  marginLeft:"auto"}}>
                    <Link to={`/write-letter/${profile&& profile.user}`} style={{color:"white",textDecoration:"none"}}>write letter</Link>
                  </button>
              
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

SingleProfile.propTypes = {
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfileById })(SingleProfile);
