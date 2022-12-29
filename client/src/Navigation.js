import React,{useEffect} from 'react';
import {Link} from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import {getProfile} from "./actions/profile";
const Navigation = ({user, auth : {isAuthenticated,loading},getProfile}) => {

  useEffect( ()=>{
    getProfile();
  },[getProfile])
  const authLinks = (
    <>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <Link class="navbar-brand" to='/'>Slowly</Link>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarText">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item">
        <Link class="nav-link" to="/">Home</Link>
      </li>
      <li className="nav-item">
      <Link class="nav-link" to="/sentLetters">Sent</Link>
      </li>

      <li className="nav-item">
      <Link class="nav-link" to="/profile">Profile</Link>
      </li>

      <li className="nav-item">
      <Link class="nav-link" to="/sendLetters">SendLetter</Link>
      </li>

      <li className="nav-item">
      <Link class="nav-link" to="/receivedLetters">Received</Link>
      </li>

      <li className="nav-item">
      <Link class="nav-link" to="/permission">Permission</Link>
      </li>
    </ul>
   
    <div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Personal Info
  </button>
  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
  <Link className='dropdown-item'>
      <p className="text text-primary">Id : {user && user._id}</p>
    </Link>


    <Link className='dropdown-item'>
      <p className="text text-primary">Name : {user && user.name}</p>
    </Link>

    <Link className='dropdown-item'>
      <p className="text text-primary">Name : {user && user.email}</p>
    </Link>
    <Link>
      <div className="d-flex">
        <p className="ml-4">Profile </p> &nbsp;&nbsp;
        <img src={user && user.gravatar} alt="profile"
    style={{width:"35px",height:"35px",borderRadius:"50%"}}/>
      </div>
    </Link>
  </div>
</div>

    
  </div>
</nav>
    </>
  )
  const guestLinks = (<>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <Link class="navbar-brand" to='/'>Slowly</Link>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarText">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <Link class="nav-link" to="/">Home</Link>
      </li>
      <li class="nav-item">
        <Link class="nav-link" to="/signup">signup</Link>
      </li>
      <li class="nav-item">
        <Link class="nav-link" to="/signin">signin</Link>
      </li>
    </ul>
   

    
  </div>
</nav>
  </>)
  return (
    <>
    {isAuthenticated && user ? authLinks : guestLinks}
    </>
    
  )
}

Navigation.propTypes = {
user : PropTypes.object.isRequired,
auth : PropTypes.object.isRequired,
getProfile:PropTypes.func.isRequired,
};
const mapStateToProps = (state)=>({
  user : state.auth.user,
  auth : state.auth
})
export default connect(mapStateToProps,{getProfile})(Navigation)