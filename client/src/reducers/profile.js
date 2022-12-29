/* eslint-disable import/no-anonymous-default-export */
import {GET_PROFILE, PROFILE_ERROR,GET_ALL_PROFILES, GET_PROFILE_BY_ID,SEND_LETTER,SEND_LETTER_ERROR} from "../actions/types";

const initialState = {
    profile : null,
    loading : true,
    profiles:[]
}

export default function(state = initialState,action){
    const {type, payload} = action;
    switch(type){
        case GET_PROFILE:
        case GET_PROFILE_BY_ID:
            return{
                ...state,
                loading:false,
                profile : payload
            }
        case GET_ALL_PROFILES:
            return{
                ...state,
                loading : false,
                profiles: payload
            }
        case SEND_LETTER:
        return{
            ...state,
            ...payload,
            loading:false,
            profile:payload
        }
        case SEND_LETTER_ERROR:
            return{
                ...state,
                loading:false,
                
            }
        case PROFILE_ERROR:
            return{
                ...state,
                loading:false,
                profile:null
            }
        default : return state
    }
}