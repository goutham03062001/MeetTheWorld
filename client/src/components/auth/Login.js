import React,{Fragment, useState} from "react";
import {Navigate} from "react-router-dom";
import { FormControl, InputLabel, Input, Button } from "@mui/material";
import { connect } from "react-redux";
import { login } from "../../actions/auth";
import PropTypes from 'prop-types'
const Login = ({login,auth:{isAuthenticated,user}}) => {
    const[email, setEmail] = useState('');
    const[password,setPassword] = useState('');
    const[alert, setAlert] = useState();

    const onSubmit = (e) =>{
      e.preventDefault();
      if(!email || !password){
        setAlert('Please Fill all your details')
      }
      else{
        login({email,password})
      }
    }
    if(user && isAuthenticated){
      return <Navigate to="/"/>
    }
  return (
    <div>
        
      <div className="container">
        <div className="row">
          <div className="col-lg-8 card p-5 mt-3">
            <form onSubmit={onSubmit}>
              {alert ? <Fragment>{alert}</Fragment> : <Fragment></Fragment>}
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
              <InputLabel htmlFor="standard-adornment-amount">
                Email
              </InputLabel>
              <Input id="standard-adornment-amount"
              onChange={ (e)=>{setEmail(e.target.value)}}
              name="email"/>
            </FormControl>

            <br/>

            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
              <InputLabel htmlFor="standard-adornment-amount">
                Password
              </InputLabel>
              <Input id="standard-adornment-amount" 
              onChange={ (e)=>{setPassword(e.target.value)}}
              name="password"/>
            </FormControl>

            <br/>


           
            <br/>
            <Button variant="contained" color="success" type="submit"
            className="mt-3" size="large">Login</Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  login : PropTypes.func.isRequired,
  auth : PropTypes.object.isRequired
}
const mapStateToProps = (state) =>({
  auth : state.auth
})
export default connect(mapStateToProps,{login})(Login);
