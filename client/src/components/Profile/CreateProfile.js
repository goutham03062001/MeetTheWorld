import React,{useState} from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import { createProfile } from "../../actions/profile";

const CreateProfile = ({createProfile,profile}) => {

    const [bio, setBio] = useState('');
    const[gender,setGender] = useState('');
    const[interests,setInterests] = useState('');
    const[location, setLocation] = useState('');

    const onSubmit = (e)=>{
        e.preventDefault();
        console.log(bio,gender,interests,location);
        createProfile({bio,gender,interests,location});
        
    }

    if(profile){return <Navigate to="/" />}
    
   
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-lg-8 card p-5 mt-5">
            <form onSubmit = {onSubmit}>
              <div class="form-group">
                <label for="formGroupExampleInput">Bio</label>
                <input
                  type="text"
                  class="form-control"
                  id="formGroupExampleInput"
                  placeholder="Write something about yourself."
                  onChange = { (e)=>setBio(e.target.value)}
                />
              </div>

              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="gender"
                  id="inlineRadio1"
                  value="male"
                  onChange = { (e)=>setGender(e.target.value)}
                />
                <label class="form-check-label" for="inlineRadio1">
                  Male
                </label>
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="gender"
                  id="inlineRadio2"
                  value="female"
                  onChange = { (e)=>setGender(e.target.value)}
                />
                <label class="form-check-label" for="inlineRadio2">
                  Female
                </label>
              </div>

              <div class="form-group mt-3">
                <label for="formGroupExampleInput">Interests</label>
                <input
                  type="text"
                  class="form-control"
                  name="interests"
                  id="formGroupExampleInput"
                  placeholder="Enter your interests"
                  onChange = { (e)=>setInterests(e.target.value)}
                />
              </div>

              <div class="form-group">
                <label for="formGroupExampleInput">Location</label>
                <input
                  type="text"
                  class="form-control"
                  name="interests"
                  id="formGroupExampleInput"
                  placeholder="where do you live"
                  onChange = { (e)=>setLocation(e.target.value)}
                />
              </div>

                <button className="btn btn-warning btn-md" type="submit">create</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

CreateProfile.propTypes = {
    createProfile:PropTypes.func.isRequired,
    profile : PropTypes.object.isRequired
};

const mapStateToProps = (state) =>({
    profile : state.profile.profile
})

export default connect(mapStateToProps,{createProfile})(CreateProfile);
