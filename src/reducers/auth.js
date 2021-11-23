import { AUTHENTICATE_USER, CLEAR_AUTH_STATE, LOGIN_FAILED, LOGIN_START, LOGIN_SUCCESS, LOGOUT, SIGNUP_FAILED, SIGNUP_START, SIGNUP_SUCCESS } from "../actions/actionTypes"

const initialAuthState = {
    user:{},
    error:null,
    isLoggedin:false,
    inProgress:false
}

export default function auth(state = initialAuthState,action){

    switch(action.type){

    case CLEAR_AUTH_STATE:
        return {
            ...state,
            error:null
        }

    case LOGIN_START:
            return {
                ...state,
                inProgress:true
            }
    
    case LOGIN_SUCCESS:
            return {
                ...state,
                inProgress:false,
                user:action.user,
                isLoggedin:true,
                error:null
            }

        case LOGIN_FAILED:
                return {
                    ...state,
                    inProgress:false,
                    error:action.error
                }

        case SIGNUP_START:
                return {
                    ...state,
                    inProgress:true
                }
        
        case SIGNUP_FAILED: 
                return {
                    ...state,
                    error:action.error,
                    inProgress:false
                }


        case SIGNUP_SUCCESS:
                return {
                    ...state,
                    user:action.user,
                    inProgress:false,
                    isLoggedin:true
                }
        
        case AUTHENTICATE_USER:
            return {
                ...state,
                user:action.user,
                isLoggedin:true
            }

        case LOGOUT:
            return {
                ...state,
                user:{},
                isLoggedin:false
            }

    default: return state;
    }
    
}