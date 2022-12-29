import axios from "axios";
import {
  GET_PROFILE,
  PROFILE_ERROR,
  CREATE_PROFILE,
  GET_ALL_PROFILES,
  GET_PROFILE_BY_ID,
  SEND_LETTER,
  SEND_LETTER_ERROR
} from "./types";

//getProfile
export const getProfile = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/profile/");
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
    });
  }
};

//createProfile

export const createProfile =
  ({ bio, gender, interests, location }) =>
  async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify({ bio, gender, interests, location });
      const res = await axios.post("/api/profile", body, config);
      dispatch({
        type: CREATE_PROFILE,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: PROFILE_ERROR,
      });
    }
  };

//get all profiles
export const getAllProfiles = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/profile/all");
    dispatch({
      type: GET_ALL_PROFILES,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
    });
  }
};


//getProfileById
export const getProfileById = (id) => async (dispatch) =>{
    try {
        const res = await axios.get(`/api/profile/${id}`);
        dispatch({
            type : GET_PROFILE_BY_ID,
            payload : res.data
        })
    } catch (error) {
        dispatch({
            type : PROFILE_ERROR
        })
    }
}

//sendLetter
export const sendLetter = ({letterBody,userId}) => async (dispatch) =>{
  try {
    const config = {
      headers:{
        'Content-Type' : 'application/json'
      }
    }
    const body = JSON.stringify({letterBody,userId});
    const res = await axios.post(`/api/letter/${userId}`,body,config);
    dispatch({
      type : SEND_LETTER,
      payload : res.data
    })
  } catch (error) {
    dispatch({
      type : SEND_LETTER_ERROR
    })
  }
}