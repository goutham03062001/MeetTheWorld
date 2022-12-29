import React, { useEffect ,useState} from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getAllProfiles ,getProfileById} from "../../actions/profile";
const DisplayAllUsers = ({ getAllProfiles, profile , getProfileById }) => {
  useEffect(() => {
    getAllProfiles();
  }, [getAllProfiles]);

  const[count, setCount] = useState(1);
  let length = profile.profiles.length;
  return (
    <>
      <div className="col-lg-12 col-12 col-md-12">
      <table class="table">
        <thead class="thead-dark">
          <tr>
            
            <th scope="col">User</th>
            <th scope="col">Location</th>
            <th scope="col">Gender</th>
            <th scope="col">Interests</th>
            <th scope="col">Connect</th>
          </tr>
        </thead>
        <tbody>
          {profile &&
            profile.profiles.map((ele) => {
                
              return (
                <>
                 
                  <tr>
                    
                    <td>{ele.user}</td>
                    <td>{ele.location}</td>
                    <td>{ele.gender}</td>
                    <td>{
                    ele.interests.map(interest =>{
                        return(<>
                        {interest} {" "}
                        </>)
                    })
                    }</td>
                    <td><button className="btn btn-dark btn-md px-3"
                    onClick={ (e) => {getProfileById(ele.user)}}>
                        <Link to={`/profile/view/${ele.user}`}
                        style={{color:"white",textDecoration:"none"}}>connect</Link>
                      </button></td>
                  </tr>
                  
                </>
              );
              
            })}
        </tbody>
      </table>
      </div>
    </>
  );
};

DisplayAllUsers.propTypes = {
  getAllProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  getProfileById:PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});
export default connect(mapStateToProps, { getAllProfiles ,getProfileById})(DisplayAllUsers);
