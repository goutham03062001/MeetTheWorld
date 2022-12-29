import axios from "axios";

import { USER_LOADED,AUTH_ERROR, REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL } from "./types";

export const loadUser = () => async (dispatch) =>{
    try {
        const res = await axios.get("/api/user/");
        dispatch({
            type : USER_LOADED,
            payload : res.data

        })
    } catch (error) {
        dispatch({
            type : AUTH_ERROR
        })
    }
}

//register

export const register = ({name,email,password}) => async (dispatch) =>{
    try {
        const config = {
            headers:{
                'Content-Type' : 'application/json'
            }
        }
        const body = JSON.stringify({name,  email, password});
        const res = await axios.post("/api/user/",body, config);
        dispatch({
            type : REGISTER_SUCCESS,
            payload : res.data,
            message : 'Register Success'
        })
    } catch (error) {
        dispatch({
            type : REGISTER_FAIL,
            message : 'This E-mail is already taken'
        })
    }
}

export const login = ({email, password}) => async (dispatch)=>{
    try {
        const config = {
            headers:{
                'Content-Type' :'application/json'
            }
        }
        const body = JSON.stringify({email, password});
        const res = await axios.post("/api/user/login",body,config);
        dispatch({
            type : LOGIN_SUCCESS,
            payload : res.data
        })
        
    } catch (error) {
        dispatch({
            type : LOGIN_FAIL,
            
        })   
    }
}