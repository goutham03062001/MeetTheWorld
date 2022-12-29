import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getProfile } from "./actions/profile";
const Home = ({ user, getProfile, profile: { profile } }) => {
  useEffect(() => {
    getProfile();
  }, [getProfile]);
  return (
   <>

    
    { !profile && user ? 
      <>
      <p> welcome {user && user.name}</p>
      <button className="btn px-5 btn-warning">
        <Link to="/create-profile">
        Create Prfoile
        </Link>
      </button>
      </>
    :
    <>
    {
    
    profile && user ? 

    <div className="container">
    <div className="row">
      <p className="text text-center">welcome {user && user.name}</p>
    </div>
    
    <div className="row">
      {profile ? (
        <Fragment>
          {/* show stories and incoming letters here */}
          <div className="col-lg-4
          col-12
          col-sm-12
          col-md-6">
            <div className="card">
              <div className="card-header">
    
                <h5 className="text text-left">Clara</h5>
                <div className="card-body">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>
                </div>
              </div>
            </div>
          </div>
    
          <div className="col-lg-4
          col-12
          col-sm-12
          col-md-6">
            <div className="card">
              <div className="card-header">
                  
                <h5 className="text text-left">Camille</h5>
                <div className="card-body">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>
                </div>
              </div>
            </div>
          </div>
    
          <div className="col-lg-4
          col-12
          col-sm-12
          col-md-6">
            <div className="card">
              <div className="card-header">
                  
                <h5 className="text text-left">Aulani</h5>
                <div className="card-body">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>
                </div>
              </div>
            </div>
          </div>
    
          <br/>
          <Fragment>
              <div className="col-lg-9 mt-5">
                  <div className="card">
                      <div className="card-header">
                          <p className="text text-center">Incoming letters</p>
    
                      </div>
                      <div className="card-body">
                          <p className="text text-center">
                            {
                              profile && profile.received.length > 0 ? `your have ${profile.received.length} incoming ${profile && profile.received.length >1 ? 'letters' : 'letter'}` : 'No incoming letters at this moment.'
                            }
                          </p>
                      </div>
                  </div>
              </div>
          </Fragment>
    
          {/* show search options */}
          <Fragment>
              <div className="col-lg-5 mt-5">
                  <button className="btn btn-warning btn-md px-3" type="submit"
                  style={{marginLeft:"100%"}}>
                      <Link to ="/all-profiles" style={{color:"#000" , textDecoration:"none"}}>Search people</Link>
                  </button>
              </div>
          </Fragment>
        </Fragment>
      ) : (
        <Fragment>
          <button className="btn btn-dark btn-md">
            <Link
              to="/create-profile"
              style={{ color: "white", textDecoration: "none" }}
            >
              create profile
            </Link>
          </button>
        </Fragment>
      )}
    </div>
    </div>
        
        :
          <>
          <button className="btn btn-sm btn-dark">
            <Link to="/signup">Signup</Link>
          </button>
          </>
        }
    </>
    }
    
    {/* user authenticated but no profile */}
    
   </>
  );
};

Home.propTypes = {
  user: PropTypes.object.isRequired,
  getProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  user: state.auth.user,
  profile: state.profile,
});
export default connect(mapStateToProps, { getProfile })(Home);
