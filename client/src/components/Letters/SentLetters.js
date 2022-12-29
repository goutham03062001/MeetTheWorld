import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProfile } from "../../actions/profile";
const SentLetters = ({ profile: { profile }, getProfile }) => {
  useEffect(() => {
    getProfile();
  }, [getProfile]);
  return (
    <div>
      <div className="container">
        <div className="row">
        {
          profile && profile.sent.length<1 ? 
            <Fragment>
              <p className="text text-center">
                No Letters
              </p>
            </Fragment>
          :
          <>
              {
          profile &&
            profile.sent.map((letter) => {
              return (
                <>
                  <div className="col-lg-8 mt-5">
                    <div className="card">
                      <div className="card-header">
                       <p className="text">sent to :  {letter.user}</p>
                       
                      </div>
                      <div className="card-body">
                        <div className="card-content">
                            <p className="text">{letter.letter}</p>

                            {
                         letter.Date ? <>
                            <p className="text">on : {letter.Date}</p>
                            </>:<></>
                       }
                        </div>
                      </div>
                      
                    </div>
                  </div>
                </>
              );
            })}
          </>
        }
        </div>
      </div>
    </div>
  );
};
SentLetters.propTypes = {
  profile: PropTypes.object.isRequired,
  getProfile: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  profile: state.profile,
});
export default connect(mapStateToProps, { getProfile })(SentLetters);
