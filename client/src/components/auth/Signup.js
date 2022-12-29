import React,{useState} from "react";
import {Navigate} from "react-router-dom";
import { FormControl, InputLabel, Input, Button } from "@mui/material";
import { connect } from "react-redux";
import { register } from "../../actions/auth";
import PropTypes from 'prop-types';
import {Alert} from "@mui/material"
const Signup = ({register,message, auth:{isAuthenticated, loading,user}}) => {
    const [name, setName] = useState('');
    const[email, setEmail] = useState('');
    const[password,setPassword] = useState('');
    const[alert,setAlert] = useState('');
    const onSubmit = (e) =>{
      e.preventDefault();
      if(!name || !email || !password){
          setAlert('Please Fill All Details')
      }
      else{
        register({name, email , password});
      }
    }
    if(isAuthenticated && !loading){
      return <Navigate to="/dashboard"/>
    }
  return (
    
    <div>
       
        <h3 className="text text-center">Register Yourself</h3>
      <div className="container">
        <div className="row">
          
          <br/>
         
          <div className="col-lg-8 card p-5 mt-3">
          <p>{!alert ? '' : <Alert severity="error">{alert}</Alert>}</p>
         
            <form onSubmit = {onSubmit}>
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
              <InputLabel htmlFor="standard-adornment-amount">
                Name
              </InputLabel>
              <Input id="standard-adornment-amount" 
              name="name"
              onChange = { (e)=>setName(e.target.value)} />
            </FormControl>

            <br/>

            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
              <InputLabel htmlFor="standard-adornment-amount">
                Email
              </InputLabel>
              <Input id="standard-adornment-amount" 
              name="email"
              onChange = { (e)=>setEmail(e.target.value)} />
            </FormControl>

            <br/>

            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
              <InputLabel htmlFor="standard-adornment-amount">
                Password
              </InputLabel>
              <Input id="standard-adornment-amount" 
              onChange = { (e)=>setPassword(e.target.value)} 
              name="password"/>
            </FormControl>

            <br/>


            
            <br/>
            <Button variant="contained" color="success" type="submit"
            className="mt-3" size="large">Signup</Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

Signup.propTypes = {
  register : PropTypes.func.isRequired,
  message : PropTypes.string,
  auth : PropTypes.object.isRequired
}

const mapStateToProps = (state) =>({
  message : state.auth.Message,
  auth : state.auth
})

export default connect(mapStateToProps, {register})(Signup);
